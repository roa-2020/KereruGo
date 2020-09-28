import { RECEIVE_BIRDPROFILE } from '../actions/bird_profile'

export default function reducer (state = [], action) {
  switch (action.type) {
    case RECEIVE_BIRDPROFILE:
      return action.bird_profile
    default:
      return state
  }
}

