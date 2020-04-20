import actions from './store/actions'
import jwt_decode from 'jwt-decode'
import { createBrowserHistory } from 'history'

export default {
  isEmptyObject: (obj) => Object.keys(obj).length < 1,
  setError: (err) => (dispatch) => {
    if (err !== null && err !== undefined && err.trim() !== '')
      dispatch({ type: actions.SET_ERROR, payload: err.trim() })
  },
  setMessage: (message) => (dispatch) => {
    if (message !== null && message !== undefined && message.trim() !== '')
      dispatch({ type: actions.SET_MESSAGES, payload: message.trim() })
  },
  postdata: async (data, url) => {
    try {
      let token = localStorage.getItem('inventory_us_cred')
      if (!token) token = ''
      let resp = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'bearer ' + token,
        },
        body: JSON.stringify(data),
      })
      return await resp.json()
    } catch (e) {
      //this.setError('Sorry, an error occured. Please try again')
    }
  },
  getdata: async (url) => {
    try {
      let token = localStorage.getItem('inventory_us_cred')
      if (!token) token = ''
      let resp = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'bearer ' + token,
        },
      })
      return await resp.json()
    } catch (e) {
      //this.setError('Sorry, an error occured. Please try again')
    }
  },
  deletedata: async (url) => {
    try {
      let token = localStorage.getItem('inventory_us_cred')
      if (!token) token = ''
      let resp = await fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'bearer ' + token,
        },
      })
      return await resp.json()
    } catch (e) {
      //this.setError('Sorry, an error occured. Please try again')
    }
  },

  getUserDetails: () => {
    if (localStorage.inventory_us_cred) {
      const decoded = jwt_decode(localStorage.inventory_us_cred)
      const user = {
        id: decoded.Id,
        fullname: decoded.given_name,
        username: decoded.unique_name,
        role: decoded.Role,
        expiry: decoded.exp,
      }
      return user
    } else return {}
  },
  setUser: (user) => (dispatch) => {
    if (!user) user = this.getUserDetails()
    dispatch({ type: actions.SET_CURRENT_USER, payload: user })
  },
  history: createBrowserHistory(),
  userTokenExpired: (user) => {
    if (Object.keys(user) < 1) return false
    const currDate = Date.now() / 1000
    return user.expiry <= currDate
  },
}
