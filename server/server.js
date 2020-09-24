const express = require('express')
const path = require('path')

const authRoutes = require('./routes/auth')
const birdRoutes = require('./routes/birds')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.use('/api/v1', authRoutes)
server.use('/api/v1/birds', birdRoutes)

module.exports = server
