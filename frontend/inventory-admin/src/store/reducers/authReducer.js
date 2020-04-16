import actions from '../actions'
import utils from '../../utils'
const initialState = {
  isAuthenticated: false,
  user: {},
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.SET_CURRENT_USER:
      return { ...state, isAuthenticated: !utils.isEmptyObject(payload), user: payload }
    default:
      return state
  }
}

const emptyObject = 