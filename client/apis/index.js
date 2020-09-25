import request from 'superagent'

import { getEncodedToken } from 'authenticare/client'

const headers = { 
  Accept: 'application/json' ,
  Authorization: `Bearer ${getEncodedToken()}`
}

const apiUrl = '/api/v1/birds'

// The following two lines need to be set immediately after the request (get/post/patch/delete) to access secure routes
// .set(jsonHeader)
// .set(authHeader)

export function apiGetAllBirds () {
  return request
    .get(apiUrl + '/birdTypes')
    .set(headers)
    .then(res => res.body)
    .catch(errorHandler)
}

export function apiGetAllLocations () {
  return request
    .get(apiUrl + '/locations')
    .set(headers)
    .then(res => res.body)
    .catch(errorHandler)
}

export function apiGetUserScrapbook (user_id) {
  return request
    .get(apiUrl + '/scrapbook/' + user_id)
    .set(headers)
    .then(res => res.body)
    .catch(errorHandler)
}

export function apiAddScrapbookEntry (user_id, bird_id) {
  return request
    .post(apiUrl + '/scrapbook')
    .set(headers)
    .send({user_id: user_id, bird_id: bird_id})
    .then(res => res.body)
    .catch(errorHandler)
}

// Global error handler for front end api's
function errorHandler (err) {
  console.error(err)
}
