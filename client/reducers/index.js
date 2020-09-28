import { combineReducers } from 'redux'

import auth from './auth'
import locations from './locations'
import scrapbook from './scrapbook'
import progress from './userProgress'

export default combineReducers({
  auth,
  locations,
  scrapbook,
  progress
})
