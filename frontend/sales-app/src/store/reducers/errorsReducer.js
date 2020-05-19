import actions from '../actions'
const initialState = []
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.SET_ERROR:
      return [...state, payload]

    case actions.REMOVE_ERROR:
      return [...state.filter((err) => err !== payload)]
    default:
      return state
  }
}
