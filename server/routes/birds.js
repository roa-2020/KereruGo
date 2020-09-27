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

const router = express.Router()

router.get('/habitats', getTokenDecoder(), getHabitats)
router.get('/birdTypes', getTokenDecoder(), getBirdTypes)
router.get('/bird/:id', getTokenDecoder(), getBird)
router.get('/locations', getTokenDecoder(), getLocations)
router.get('/scrapbook/:id', getTokenDecoder(), getScrapbook)
router.post('/scrapbook', getTokenDecoder(), addEntry)

router.use(errorHandler)

function getHabitats (req, res) {
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

function getBirdTypes (req, res) {
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

function getBird (req, res) {
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

function getLocations (req, res) {
  return getBirdCount().then(({ count }) => {
    return getAllLocations().then(locations => {
      const fetchBirds = async (locations) => {
        const birds = locations.map(() => {
              return getBirdById(generateRandomBirdID(count))
                .then((bird) => {
                return bird
                })
            })
        return Promise.all(birds)
      }
      fetchBirds(locations)
        .then(birds => {
          const sanitized = locations.map((location, i) => {
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

function getScrapbook (req, res) {
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

function addEntry (req, res) {
  const entry = {
    user_id: req.body.user_id,
    bird_id: req.body.bird_id
  }
  addScrapbookEntry(entry).then(count => res.json(count[0]))
}

function errorHandler (err, req, res, next) {
  console.log(err)
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ message: 'Access denied.' })
  } else {
    res.status(500).json({ message: 'Something went RATHER wrong. Shame.' })
  }
}
module.exports = router
