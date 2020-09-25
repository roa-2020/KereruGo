import { RECEIVE_LOCATIONS } from '../actions/locations'

export default function reducer (state = [], action) {
  switch (action.type) {
    case RECEIVE_LOCATIONS:
      return action.locations
    default:
      return state
  }
}
