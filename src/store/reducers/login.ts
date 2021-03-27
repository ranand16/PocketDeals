import { Actions } from '../../Interfaces/actions'
import { FAILURE, REQUEST, SUCCESS } from '../../shared/Utils/actions'
import { LOGIN, LOGOUT } from '../constants'

interface Authentication {
  loading: boolean,
  loggedIn: boolean,
  user: any,
}

const initialState = {
  loading: false,
  loggedIn: false,
  user: null,
}

export default (
  state: Authentication = initialState, 
  action: Actions
): Authentication => {
  switch (action.type) {
    case REQUEST(LOGIN):
    case REQUEST(LOGOUT):
      return {
        ...state,
        loading: true,
      }
    case SUCCESS(LOGIN):
      return {
        ...state,
        loading: false,
        loggedIn: true,
        user: action.payload.user,
      }
    case SUCCESS(LOGOUT):
      return initialState
    case FAILURE(LOGIN):
    case FAILURE(LOGOUT):
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}
