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

function getBirdCount(db= connection) {
  return db('birds')
  .count('id as count')
  .first()
  .catch(err => err)
}

function generateRandomBirdID(db = connection) {
 return getBirdCount(db)
  .then(({count})=>{
    return Math.ceil(Math.random()*count)
  })
  .catch(err => err)
}

module.exports = {
  getAllHabitats,
  getAllBirdTypes,
  getAllLocations,
  getScrapbookEntries,
  getBirdCount,
  generateRandomBirdID
}