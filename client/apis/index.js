import request from "superagent";

import { getEncodedToken } from "authenticare/client";

const headers = {
  Accept: "application/json",
  Authorization: `Bearer ${getEncodedToken()}`,
};


const apiUrl = "/api/v1/birds";

// The following two lines need to be set immediately after the request (get/post/patch/delete) to access secure routes
// .set(jsonHeader)
// .set(authHeader)

export function apiGetAllBirds() {
  return request
    .get(apiUrl + "/birdTypes")
    .set(prepHeaders())
    .then((res) => res.body)
    .catch(errorHandler);
}

export function apiGetOneBird (id) {
  return request
    .get(apiUrl + '/bird/' + id)
    .set(prepHeaders())
    .then(res => res.body)
    .catch(errorHandler);
}

export function apiGetAllLocations () {  
  return request
    .get(apiUrl + "/locations")
    .set(prepHeaders())
    .then((res) => res.body)
    .catch(errorHandler);
}

export function apiGetUserScrapbook(user_id) {
  return request
    .get(apiUrl + "/scrapbook/" + user_id)
    .set(prepHeaders())
    .then((res) => res.body)
    .catch(errorHandler);
}

export function apiAddScrapbookEntry (user_id, bird_id) {
  return request
    .post(apiUrl + '/scrapbook')
    .set(prepHeaders())
    .send({user_id: user_id, bird_id: bird_id})
    .then(res => res.body)
    .catch(errorHandler)
}

function prepHeaders(){
  return {
    Accept: "application/json",
    Authorization: `Bearer ${getEncodedToken()}`,
  }
}

// Global error handler for front end api's
function errorHandler(err) {
  console.error(err);
}
