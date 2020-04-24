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
    categoryId: '',
    typeId: '',
    quantity: '',
    cost: '',
    price: '',
    description: '',
  })
  const onFieldChange = async (e) => {
    setformState({ ...formState, [e.target.name]: e.target.value })
    if (e.target.name === 'barcode') {
      utils
        .postdata(e.target.value, constants.backendApi.search_products_by_code)
        .then((resp) => {
          if (resp.success) {
            //update form here
            const {
              name,
              description,
              categoryId,
              typeId,
              cost,
              price,
              barcode,
            } = resp.data
            setformState({
              ...formState,
              name,
              description,
              categoryId,
              typeId,
              cost,
              price,
              barcode,
            })
          }
        })
    }
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
    if (formState.categoryId === '') {
      setError('Please select a Product Category')
      return
    }
    if (formState.typeId === '') {
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
    formState.categoryId = parseInt(formState.categoryId)
    formState.typeId = parseInt(formState.typeId)
    formState.quantity = parseInt(formState.quantity)
    formState.cost = parseFloat(formState.cost)
    formState.price = parseFloat(formState.price)
    if (formState.quantity < 0) {
      setError('Product Quantity must be at least 0')
      return
    }
    utils
      .postdata(formState, constants.backendApi.add_product)
      .then((resp) => {
        if (resp.success === true) {
          setMessage('Stock updated successfully')
          history.push('/products')
        } else setError('Sorry, an error occured. Please try again')
      })
      .catch(() => setError('Sorry, an error occured. Please try again'))
  }

  useEffect(() => {
    getCategories()
    getTypes()
    return () => {}
  }, [])

  return (
    <div>
      <Card
        header={'Add New Stock Items'}
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
                name="categoryId"
                value={formState.categoryId}
              />
              <DropDownList
                label="Product Type"
                optionLabel="-- SELECT PRODUCT TYPE --"
                data={types}
                onChange={onFieldChange}
                valueFieldName="productTypeId"
                textFieldName="name"
                name="typeId"
                value={formState.typeId}
              />
              <Input
                label="Quantity"
                value={formState.quantity}
                onChange={onFieldChange}
                name="quantity"
                type="number"
                placeholder="New Quantity to be Added"
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
