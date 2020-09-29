const express = require('express')
const { getTokenDecoder } = require('authenticare/server')
const {
  getAllHabitats,
  getAllBirdTypes,
  generateRandomBirdID,
  getBirdCount,
  getBirdById,
  getAllLocations,
  getScrapbookEntries,
  addScrapbookEntry
} = require('../db/birds')
const { getUserBadges, addToCount, addBadge } = require('../db/users')

const router = express.Router()

router.get('/habitats', getTokenDecoder(), getHabitats)
router.get('/birdTypes', getTokenDecoder(), getBirdTypes)
router.get('/bird/:id', getTokenDecoder(), getBird)
router.get('/locations', getTokenDecoder(), getLocations)
router.get('/scrapbook/:id', getTokenDecoder(), getScrapbook)
router.post('/scrapbook', getTokenDecoder(), addEntry)
router.post('/badges/:id', getTokenDecoder(), addCurrentCount)
router.get('/badges/:id', getTokenDecoder(), getBadges)

router.use(errorHandler)

function getHabitats(req, res) {
  return getAllHabitats().then(habitats => {
    const sanitized = habitats.map(habitat => {
      return {
        habitatId: habitat.id,
        habitatName: habitat.habitat_name
      }
    })

    return res.json(sanitized)
  })
}

function getBirdTypes(req, res) {
  return getAllBirdTypes().then(birdTypes => {
    const sanitized = birdTypes.map(bird => {
      return {
        birdId: bird.id,
        birdName: bird.bird_name,
        birdEnglishName: bird.bird_english_name,
        birdImg: bird.bird_img,
        birdRarity: bird.bird_rarity,
        birdNocturnal: bird.bird_nocturnal,
        birdTag: bird.bird_tag,
        birdInfo: bird.bird_info
      }
    })
    return res.json(sanitized)
  })
}

function getBird(req, res) {
  const id = req.params.id
  return getBirdById(id).then(bird => {
    const sanitized = {
      birdId: bird.id,
      birdName: bird.bird_name,
      birdEnglishName: bird.bird_english_name,
      birdImg: bird.bird_img,
      birdRarity: bird.bird_rarity,
      birdNocturnal: bird.bird_nocturnal,
      birdTag: bird.bird_tag,
      birdInfo: bird.bird_info
    }
    return res.json(sanitized)
  })
}

function getLocations(req, res) {
  return getBirdCount().then(({ count }) => {
    return getAllLocations().then(locations => {
      // randomly generate random locations surrounding seed locations
      let randomLocations = []
      let newId = locations.length + 951
      
      // random Lat and Long functions called when making new locations in the for loop
      let randomLat = () => Math.random() * (0.0018 - 0.0009) + 0.0009
      let randomLong = () => Math.random() * (0.0024 - 0.0012) + 0.0012
      // map over locations to make random surrounding locations
      locations.map(location => {
        let randomBirdCount = Math.ceil(Math.random() * (5 - 2) + 2)
        for (i = 0; i < randomBirdCount; i++) {
          newId++
          randomLocations.push({ 
              id: newId,
              latitude: location.latitude + randomLat(),
              longitude: location.longitude + randomLong()
             })
            }
          })
          
        // the fetchBirds function waits for everything to finish (using Promises.all) to 
         //... then execute the 'dot-then' found below it(approx line 110)
        const fetchBirds = async (randomLocations) => {
          const birds = randomLocations.map(() => {
          return getBirdById(generateRandomBirdID(count))
            .then((bird) => {
              return bird
            })
        })
        return Promise.all(birds)
      }
      fetchBirds(randomLocations)
        .then((birds) => {
          const sanitized = randomLocations.map((location, i) => {
            return ({
              locId: location.id,
              lat: location.latitude,
              long: location.longitude,
              birdId: birds[i].id,
              birdName: birds[i].bird_name,
              birdEnglishName: birds[i].bird_english_name,
              birdImg: birds[i].bird_img,
              birdRarity: birds[i].bird_rarity,
              birdNocturnal: birds[i].bird_nocturnal,
              birdTag: birds[i].bird_tag,
              birdInfo: birds[i].bird_info
            })
          })
          res.json(sanitized)
        })
    })
  })
}

function getScrapbook(req, res) {
  const user_id = req.params.id
  return getScrapbookEntries(user_id).then(entries => {
    return getAllBirdTypes()
      .then(birds => {
        const sanitized = birds.map(bird => {
          const foundIndex = entry => {
            return entry.bird_id === bird.id
          }
          if (entries.findIndex(foundIndex) > -1) {
            return {
              birdId: bird.id,
              birdName: bird.bird_name,
              birdEnglishName: bird.bird_english_name,
              birdImg: bird.bird_img,
              birdRarity: bird.bird_rarity,
              birdNocturnal: bird.bird_nocturnal,
              birdTag: bird.bird_tag,
              birdInfo: bird.bird_info
            }
          } else {
            return {
              birdId: bird.id,
              birdName: 'Unknown',
              birdImg: '/images/mystery-bird.png',
              birdTag: 'Look in that bush over there!'
            }
          }
        })
        return res.json(sanitized)
      })
      .catch(errorHandler)
  })
}

function addCurrentCount(req, res) {

  const user_id = parseInt(req.params.id)
  const badgeId = req.body.badgeId

  return getUserBadges(user_id)
    .then(badges => {
      badges.filter(badge => badge.badge_id == badgeId)
      const badge = badges[0]


      if (badge) {
        const newCount = badge.current_count + 1

        return addToCount(newCount, badge.id)
          .then(res.send('add1'))

      } else {

        const newBadge = {
          user_id: user_id,
          badge_id: 1,
          current_count: 1
        }
        return addBadge(newBadge)
          .then(res.send('addbadge'))
      }

    })
    .catch(errorHandler)
}

function getBadges(req, res) {
  const user_id = parseInt(req.params.id)
  return getUserBadges(user_id)
    .then(badges => {
      const sanitized = badges.map(badge => {
        return {
          badgeId: badge.id,
          badgeName: badge.badge_name,
          badgeTag: badge.badge_tag,
          badgeBronze: badge.badge_bronze,
          badgeSilver: badge.badge_silver,
          badgeGold: badge.badge_gold,
          bronzeReq: badge.bronze_req,
          silverReq: badge.silver_req,
          goldReq: badge.gold_req,
          currentCount: badge.current_count
        }
      })
      return res.json(sanitized)
    })
}


function addEntry(req, res) {
  const entry = {
    user_id: req.body.user_id,
    bird_id: req.body.bird_id
  }
  addScrapbookEntry(entry).then(count => res.json(count[0]))
}

function errorHandler(err, req, res, next) {
  console.log(err)
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ message: 'Access denied.' })
  } else {
    res.status(500).json({ message: 'Something went RATHER wrong. Shame.' })
  }
}
module.exports = router
