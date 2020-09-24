const express = require("express");

const { getAllHabitats } = require("../db/birds");

const router = express.Router();

router.get("/habitats", getHabitats);

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

module.exports = router;
