export const RECEIVE_LOCATIONS = 'RECEIVE_LOCATIONS'

export const receiveLocations = locations => {
  return {
    type: RECEIVE_LOCATIONS,
    locations
  }
}