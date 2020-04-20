import React, { useState } from 'react'
import Input from '../shared/Input'
import Card from '../shared/Card'
import Button from '../shared/Button'
import { connect } from 'react-redux'
import utils from '../../utils'
import constants from '../constants'
import { withRouter } from 'react-router'

function AddProductCategory({ setMessage, setError, history }) {
  const [state, setState] = useState({ name: '', id: 0 })
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (state.name === '') {
      setError('Category name cannot be empty')
    }
    try {
      let resp = await utils.postdata(state, constants.backendApi.add_category)
      if (resp.success) {
        setMessage('Record added successfully')
        history.push('/categories')
      } else {
        setError(resp.error)
      }
    } catch (e) {
      setMessage('Sorry, an error occured. Please try again')
    }
  }

  const onNameChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  return (
    <div style={{ width: '400px' }}>
      <Card
        header={'Add New Product Category'}
        subtitle="Note: If this category already exists, the record will be updated instead"
      >
        <form onSubmit={handleSubmit}>
          <Input
            label="Name"
            value={state.name}
            onChange={onNameChange}
            name="name"
            type="text"
            placeholder="Category Name"
          />
          <Button type="submit" text="Submit" />
        </form>
      </Card>
    </div>
  )
}

export default connect(null, {
  setMessage: utils.setMessage,
  setError: utils.setError,
})(withRouter(AddProductCategory))
