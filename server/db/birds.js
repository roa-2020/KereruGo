const connection = require('./connection')

function getAllHabitats (db = connection) {
  return db('habitats').select()
}

function getAllBirdTypes (db = connection) {
  return db('birds').select()
}

module.exports = {
  getAllHabitats,
  getAllBirdTypes
}