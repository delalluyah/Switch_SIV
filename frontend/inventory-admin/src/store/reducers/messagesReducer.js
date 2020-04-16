import actions from '../actions'
const initialState = []
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.SET_MESSAGES:
      return [...state, payload]
    case actions.REMOVE_MESSAGES:
      return [...state.filter((err) => err !== payload)]
    default:
      return state
  }
}
