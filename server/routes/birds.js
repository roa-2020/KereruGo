const express = require('express')

const { getAllHabitats, getAllBirdTypes } = require('../db/birds')

const router = express.Router()

module.exports = router