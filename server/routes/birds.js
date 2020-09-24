const express = require("express");

const { getAllHabitats, getAllBirdTypes } = require('../db/birds')

const router = express.Router();

router.get("/habitats", getHabitats);
router.get("/birdTypes", getBirdTypes);

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

module.exports = router;
