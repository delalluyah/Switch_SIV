import React from 'react'
import '../styles/alertbox.css'
import { connect } from 'react-redux'
import actions from '../../../store/actions'
import check from './check.svg'
import cancel from './cancel.svg'

const deleteError = (payload) => (dispatch) => {
  dispatch({ type: actions.REMOVE_ERROR, payload })
}
const deleteMessage = (payload) => (dispatch) => {
  dispatch({ type: actions.REMOVE_MESSAGES, payload })
}
const AlertBox = ({ errors, messages, deleteMessage, deleteError }) => {
  let delTime = 5000
  return (
    <div className="alert-box">
      {errors.length > 0
        ? errors.map((err, index) => {
            setTimeout(() => deleteError(err), delTime)
            return <Alert key={index} content={err} type="error" />
          })
        : null}
      {messages.length > 0
        ? messages.map((message, index) => {
            setTimeout(() => deleteMessage(message), delTime)
            return <Alert key={index} content={message} type="message" />
          })
        : null}
    </div>
  )
}

const Alert = ({ content, type = 'message' }) => (
  <div className="alert">
    <span className={type}>{content}</span>{' '}
    <img
      alt=""
      className="alert-image"
      src={type === 'error' ? cancel : check}
    />
  </div>
)

const mapStateToProps = ({ errors, messages }) => {
  return { errors, messages }
}

export default connect(mapStateToProps, { deleteError, deleteMessage })(
  AlertBox
)
