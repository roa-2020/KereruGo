import { RECEIVE_BADGES } from '../actions/badges'

export default function reducer (state = [], action) {
  switch (action.type) {
    case RECEIVE_BADGES:
            console.log('hello')
      return action.badges
    default:
      return state
  }
}
