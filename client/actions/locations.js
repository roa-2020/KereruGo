export const RECEIVE_LOCATIONS = 'RECEIVE_LOCATIONS'
export const REMOVE_LOCATIONS = 'REMOVE_LOCATIONS'

export const receiveLocations = locations => {
  return {
    type: RECEIVE_LOCATIONS,
    locations
  }
}

export const removeLocations = (locId) => {
  console.log("action:", locId)
  return {
    type: REMOVE_LOCATIONS,
    locId
  }
}
