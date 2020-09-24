const express = require("express");

const { getAllHabitats, getAllBirdTypes, getAllLocations, getScrapbookEntries } = require('../db/birds')

const router = express.Router();

router.get("/habitats", getHabitats);
router.get("/birdTypes", getBirdTypes);
router.get("/locations", getLocations);
router.get("/scrapbook/:id", getScrapbook);

function getHabitats(req, res) {
  return getAllHabitats().then((habitats) => {
      console.log(habitats, "and anthony is cool")
    return res.json({ body: habitats });
  });
}

function getBirdTypes(req, res) {
  return getAllBirdTypes()
    .then((birdTypes) => {
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
    return res.json(sanitized);
  });
}

function getLocations(req, res) {
  return getAllLocations()
    .then((locations) => {
      const sanitized = locations.map(location => {
        return { 
          locId: location.id,
          lat: location.latitude,
          long: location.longitude
        }
      })
    return res.json(sanitized);
  });
}

function getScrapbook(req, res) {
  const user_id = req.params.id
  return getScrapbookEntries(user_id)
    .then((entries) => {
      const sanitized = entries.map(entry => {
        return { 
          userId: entry.user_id,
          birdId: entry.bird_id,
          dateSpotted: entry.date_spotted
        }
      })
    return res.json(sanitized);
  });
}

module.exports = router;
