import actions from './store/actions'
export default {
  isEmptyObject: (obj) => Object.keys(obj).length < 1,
  setError: (err) => (dispatch) => {
    if (err !== null && err !== undefined && err.trim() !== '')
      dispatch({ type: actions.SET_ERROR, payload: err.trim() })
  },
  setMessage: (message) => (dispatch) => {
    if (message !== null && message !== undefined && message.trim() !== '')
      dispatch({ type: actions.setMessage, payload: message.trim() })
  },
}
