import React, { useState, useEffect } from 'react'
import Input from '../shared/Input'
import Card from '../shared/Card'
import Button from '../shared/Button'
import { connect } from 'react-redux'
import utils from '../../utils'
import constants from '../constants'
import { withRouter } from 'react-router'

function UpdateProductType({ setMessage, setError, history, match }) {
  const [state, setState] = useState({ name: '', id: 0 })
  useEffect(() => {
    const returnerror = () => {
      setError('Sorry, an error occured. Please try again')
      history.push('/types')
    }
    utils.getdata(constants.backendApi.get_types).then((response) => {
      if (response.success) {
        let selected = response.data.filter(
          (el) => el.productTypeId == match.params.id
        )[0]
        if (selected)
          setState({ name: selected.name, id: selected.productTypeId })
        else history.push('/types')
      } else returnerror()
    })
    return () => {}
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (state.name.trim() === '') {
      setError('Name field cannot be empty')
      return
    }
    try {
      let resp = await utils.postdata(
        { name: state.name, productTypeId: state.id },
        constants.backendApi.update_type
      )
      if (resp.success) {
        setMessage('Record updated successfully')
        history.push('/types')
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
        header={'Update Product Type'}
        //subtitle="Note: If this type already exists, the record will be updated instead"
      >
        <form onSubmit={handleSubmit}>
          <Input
            value={state.id}
            onChange={onNameChange}
            name="id"
            type="hidden"
            placeholder="Product Id"
          />
          <Input
            label="Name"
            value={state.name}
            onChange={onNameChange}
            name="name"
            type="text"
            placeholder="Product Type Name"
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
})(withRouter(UpdateProductType))
