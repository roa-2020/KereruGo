const express = require('express')

const { getAllHabitats } = require('../db/birds')

const router = express.Router()

module.exports = router