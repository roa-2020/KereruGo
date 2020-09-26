import {combineReducers} from 'redux'

import auth from './auth'
import locations from './locations'
import scrapbook from './scrapbook'

export default combineReducers({
  auth,
  locations,
  scrapbook
})
