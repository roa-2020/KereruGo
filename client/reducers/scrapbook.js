import { RECEIVE_SCRAPBOOK } from '../actions/scrapbook'

export default function reducer (state = [], action) {
  switch (action.type) {
    case RECEIVE_SCRAPBOOK:
      return action.scrapbook
    default:
      return state
  }
}
