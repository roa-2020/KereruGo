import { RECEIVE_LOCATIONS } from '../actions/locations'
import { REMOVE_LOCATIONS } from '../actions/locations'

export default function reducer (state = [], action) {
  switch (action.type) {
    case RECEIVE_LOCATIONS:
      return action.locations
    
    case REMOVE_LOCATIONS:
      console.log("reducer:", location, locId)
      // return state.filter((task) => task.id !==  action.task)
      return state.filter((location) => location.locId !== action.locId)

    default:
      return state
  }
}
