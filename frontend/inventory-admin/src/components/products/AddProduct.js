import React, { useState, useEffect } from 'react'
import Input from '../shared/Input'
import TextArea from '../shared/TextArea'
import Card from '../shared/Card'
import DropDownList from '../shared/DropDownList'
import Button from '../shared/Button'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import utils from '../../utils'
import constants from '../constants'

function AddProduct({ setError, history, setMessage }) {
  const [categories, setCategoriesState] = useState([])
  const [types, setTypesState] = useState([])
  const [formState, setformState] = useState({
    barcode: '',
    name: '',
    productCategoryId: '',
    productTypeId: '',
    quantity: '',
    cost: '',
    price: '',
    description: '',
  })
  const onFieldChange = (e) => {
    setformState({ ...formState, [e.target.name]: e.target.value })
  }
  const getCategories = () => {
    utils
      .getdata(constants.backendApi.get_categories)
      .then((response) =>
        response.success
          ? setCategoriesState(response.data)
          : setCategoriesState([])
      )
  }

  const getTypes = () => {
    utils
      .getdata(constants.backendApi.get_types)
      .then((response) =>
        response.success ? setTypesState(response.data) : setTypesState([])
      )
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (formState.barcode === '') {
      setError('Barcode field cannot be empty')
      return
    }
    if (formState.name === '') {
      setError('Product Name field cannot be empty')
      return
    }
    if (formState.productCategoryId === '') {
      setError('Please select a Product Category')
      return
    }
    if (formState.productTypeId === '') {
      setError('Please select a Product Type')
      return
    }
    if (formState.quantity === '') {
      setError('Please add Product Quantity')
      return
    }
    if (formState.cost === '') {
      setError('Please add Unit Cost')
      return
    }
    if (formState.price === '') {
      setError('Please add Unit Price')
      return
    }
    setMessage('validation passed')
  }

  useEffect(() => {
    getCategories()
    getTypes()
    return () => {}
  }, [])

  return (
    <div>
      <Card
        header={'Add New Product'}
        subtitle="Note: If the product already exists, the record will be updated instead"
        //transparent={true}
      >
        <form onSubmit={onSubmit}>
          <div className="product-form">
            <div>
              <Input
                label="Barcode"
                value={formState.barcode}
                onChange={onFieldChange}
                name="barcode"
                type="text"
                placeholder="Barcode"
              />
              <Input
                label="Name"
                value={formState.name}
                onChange={onFieldChange}
                name="name"
                type="text"
                placeholder="Product Name"
              />
              <DropDownList
                label="Product Category"
                optionLabel="-- SELECT CATEGORY --"
                data={categories}
                onChange={onFieldChange}
                valueFieldName="productCategoryId"
                textFieldName="name"
                name="productCategoryId"
                value={formState.productCategoryId}
              />
              <DropDownList
                label="Product Type"
                optionLabel="-- SELECT PRODUCT TYPE --"
                data={types}
                onChange={onFieldChange}
                valueFieldName="productTypeId"
                textFieldName="name"
                name="productTypeId"
                value={formState.productTypeId}
              />
              <Input
                label="Quantity"
                value={formState.quantity}
                onChange={onFieldChange}
                name="quantity"
                type="number"
                placeholder="Quantity of Product"
              />
            </div>
            <div>
              <Input
                label="Unit Cost"
                value={formState.cost}
                onChange={onFieldChange}
                name="cost"
                type="number"
                placeholder="Unit Cost of Product"
              />
              <Input
                label="Unit Price"
                value={formState.price}
                onChange={onFieldChange}
                name="price"
                type="number"
                placeholder="Unit Price of Product"
              />
              <TextArea
                label="Description"
                value={formState.description}
                onChange={onFieldChange}
                name="description"
                placeholder="Product Description (optional)"
              />
            </div>
          </div>
          <div style={{ maxWidth: '500px', margin: 'auto' }}>
            <Button text="Submit" onClick={(x) => x} />
          </div>
        </form>
      </Card>
    </div>
  )
}

export default connect(null, {
  setError: utils.setError,
  setMessage: utils.setMessage,
})(withRouter(AddProduct))
