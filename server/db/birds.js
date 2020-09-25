const connection = require('./connection')

function getAllHabitats (db = connection) {
  return db('habitats').select()
}

function getAllBirdTypes (db = connection) {
  return db('birds').select()
}

function getBirdById (id, db = connection) {
  return db('birds')
    .where('id', id)
    .first()
}

function getAllLocations (db = connection) {
  return db('locations').select()
}

function getScrapbookEntries (user_id, db = connection) {
  return db('scrapbooks')
  .where('user_id', user_id)
  .select()
}

function addScrapbookEntry (entry, db = connection) {
  return db('scrapbooks')
  .insert(entry)
}

module.exports = {
  getAllHabitats,
  getAllBirdTypes,
  getBirdById,
  getAllLocations,
  getScrapbookEntries,
  addScrapbookEntry
}