import request from 'superagent'

import { getEncodedToken } from 'authenticare/client'

const jsonHeader = { Accept: 'application/json' }
const authHeader = { Authorization: `Bearer ${getEncodedToken()}` }

const apiUrl = '/api/v1/birds'

// The following two lines need to be set immediately after the request (get/post/patch/delete) to access secure routes
// .set(jsonHeader)
// .set(authHeader)

export function demoAPIFunction () {
  return request
    .get(apiUrl)
    .set(jsonHeader)
    .set(authHeader)
    .then(res => res)
    .catch(errorHandler)
}

// Global error handler for front end api's
function errorHandler (err) {
  console.error(err)
}
