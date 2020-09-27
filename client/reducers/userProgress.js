import { SAVE_PROGRESS } from '../actions/scrapbook'

const defaultState = {foundCount: 0, totalBirds: 0}

export default function reducer (state = defaultState, action) {
  switch (action.type) {
    case SAVE_PROGRESS:
      return {foundCount: action.foundCount, totalBirds: action.totalBirds}
    default:
      return state
  }
}
