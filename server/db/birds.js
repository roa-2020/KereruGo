const connection = require('./connection')

function getAllHabitats (db = connection) {
  return db('habitats').select()
}

module.exports = {
  getAllHabitats
}