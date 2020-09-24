const connection = require('./connection')

function getAllHabitats (db = connection) {
  return db('habitats').select()
}

function getAllBirdTypes (db = connection) {
  return db('birds').select()
}

function getAllLocations (db = connection) {
  return db('locations').select()
}

function getScrapbookEntries (user_id, db = connection) {
  return db('scrapbooks')
  .where('user_id', user_id)
  .select()
}

module.exports = {
  getAllHabitats,
  getAllBirdTypes,
  getAllLocations,
  getScrapbookEntries
}