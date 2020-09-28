const connection = require('./connection')
const { generateHash } = require('authenticare/server')

function createUser (user, db = connection) {
  const newUser = {...user}
  return generateHash(newUser.password)
    .then(passwordHash => {
      newUser.hash = passwordHash
      delete newUser.password
      return db('users').insert(newUser)
    })
}

function userExists (username, db = connection) {
  return db('users')
    .where('username', username)
    .then(users => users.length > 0)
}

function getUserByUsername (username, db = connection) {
  return db('users')
    .where('username', username)
    .first()
}

function getUserBadges (user_id, db = connection) {
  return db('badges_users')
  .where('user_id', user_id)
  .select()
}

function addToCount (newCount, id, db = connection) {
  return db('badges_users')
  .where('id', id)
  .update({current_count: newCount})
}

function addBadge (newBadge, db = connection) {
  console.log(newBadge)
  return db('badges_users')
  .insert(newBadge)
}

module.exports = {
  createUser,
  userExists,
  getUserByUsername,
  getUserBadges,
  addToCount,
  addBadge
}