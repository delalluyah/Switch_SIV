import React, { useState } from 'react'
import Card from '../../shared/Card'
import Input from '../../shared/Input'
import './login.css'
import Button from '../../shared/Button'
import constants from '../../constants'
import utils from '../../../utils'
import { connect } from 'react-redux'

const Login = ({ setError }) => {
  const initialState = { username: '', password: '' }
  const [state, setState] = useState(initialState)
  const onTextChange = async (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  const onSubmit = async (e) => {
    e.preventDefault()

    if (state.username === '') {
      setError('Username cannot be empty')
    }
    if (state.password === '') {
      setError('Password cannot be empty')
    }
    try {
      let resp = await fetch(constants.backendApi.login, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Username: state.username,
          Password: state.password,
        }),
      })

      resp = await resp.json()
      if (resp.success) localStorage.setItem('inventory_us_cred', resp.token)
      else {
        resp.errors.forEach((err) => setError(err))
      }
    } catch (ex) {
      console.log(ex)
    }
  }
  return (
    <>
      <div className="full-page">
        <div className="login"> </div>
        <div className="login-box">
          <Card
            transparent={true}
            header="Login"
            subtitle="Login with your admin credentials"
          >
            <div style={{ display: 'block', margin: 'auto' }}>
              <form onSubmit={onSubmit}>
                <Input
                  label="Username:"
                  value={state.username}
                  onChange={onTextChange}
                  name="username"
                  type="text"
                  placeholder="johndoe"
                />
                <Input
                  label="Password"
                  value={state.password}
                  onChange={onTextChange}
                  name="password"
                  type="password"
                  placeholder="********"
                />
                <Button type="submit" text="Submit" />
              </form>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
const mapStateToProps = ({ auth }) => ({
  auth,
})
export default connect(mapStateToProps, { setError: utils.setError })(Login)
