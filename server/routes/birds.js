const express = require("express");

const { getAllHabitats } = require("../db/birds");

const router = express.Router();

router.get("/habitats", getHabitats);

function getHabitats(req, res) {
  return getAllHabitats().then((habitats) => {
      console.log(habitats, "and anthony is cool")
    return res.json({ body: habitats });
  });
}

module.exports = router;
