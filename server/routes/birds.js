const express = require("express");
const { getTokenDecoder } = require("authenticare/server");
const {
  getAllHabitats,
  getAllBirdTypes,
  generateRandomBirdID,
  getBirdCount,
  getAllLocations,
  getScrapbookEntries,
} = require("../db/birds");

const router = express.Router();

router.get("/habitats", getTokenDecoder(), getHabitats);
router.get("/birdTypes", getTokenDecoder(), getBirdTypes);
router.get("/locations", getTokenDecoder(), getLocations);
router.get("/scrapbook/:id", getTokenDecoder(), getScrapbook);

router.use(errorHandler);

function getHabitats(req, res) {
  return getAllHabitats().then((habitats) => {
    const sanitized = habitats.map((habitat) => {
      return {
        habitatId: habitat.id,
        habitatName: habitat.habitat_name,
      };
    });

    return res.json(sanitized);
  });
}

function getBirdTypes(req, res) {
  return getAllBirdTypes().then((birdTypes) => {
    const sanitized = birdTypes.map((bird) => {
      return {
        birdId: bird.id,
        birdName: bird.bird_name,
        birdEnglishName: bird.bird_english_name,
        birdImg: bird.bird_img,
        birdRarity: bird.bird_rarity,
        birdNocturnal: bird.bird_nocturnal,
        birdTag: bird.bird_tag,
        birdInfo: bird.bird_info,
      };
    });
    return res.json(sanitized);
  });
}

function getLocations(req, res) {
  return getAllLocations()
    .then((locations) => {
      generateRandomBirdID()
        .then(randomId => {

          return locations.map((location, i) => {
            return {
              locId: location.id,
              lat: location.latitude,
              long: location.longitude,
              birdId: results[i]
            }
          })
        })
        .then(locations => {
          res.json(locations)
        })
    })
    .catch(err => res.json(err))
}

function getScrapbook(req, res) {
  const user_id = req.params.id;
  return getScrapbookEntries(user_id).then((entries) => {
    const sanitized = entries.map((entry) => {
      return {
        userId: entry.user_id,
        birdId: entry.bird_id,
        dateSpotted: entry.date_spotted,
      };
    });
    return res.json(sanitized);
  });
}

function errorHandler(err, req, res, next) {
  console.log(err);
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: "Access denied." });
  } else {
    res.status(500).json({ message: "Something went RATHER wrong. Shame." });
  }
}
module.exports = router;
