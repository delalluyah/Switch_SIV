import React from 'react'
import Input from '../shared/Input'
import TextArea from '../shared/TextArea'
import Card from '../shared/Card'
import DropDownList from '../shared/DropDownList'
//import { DropDownList } from '@progress/kendo-react-dropdowns'

export default function AddProduct() {
  const categories = [
    { Id: 1, Name: 'Beverages' },
    { Id: 2, Name: 'Food' },
    { Id: 20, Name: 'Clothing' },
    { Id: 22, Name: 'Phone Accessories' },
  ]
  // const types = ['']
  return (
    <div style={{ width: '400px' }}>
      <Card
        header={'Add New Product'}
        subtitle="Note: If the product already exists, the record will be updated instead"
      >
        <Input
          label="Barcode"
          value=""
          onChange={(x) => x}
          name="barcode"
          type="text"
          placeholder="Barcode"
        />
        <Input
          label="Name"
          value=""
          onChange={(x) => x}
          name="name"
          type="text"
          placeholder="Product Name"
        />
        <DropDownList
          label="Product Category"
          data={categories}
          onChange={(x) => x}
          value={22}
          valueFieldName="Id"
          textFieldName="Name"
          name="categoryId"
        />
        {/* <select>
          {categories.map((el, index) => (
            <option value={index}>{el}</option>
          ))}
        </select> */}
        {/* <DropDownList data={types} defaultValue="Basketball" /> */}
        <TextArea
          label="Description"
          value=""
          onChange={(x) => x}
          name="description"
          placeholder="Product Description (optional)"
        />
        <Input
          label="Quantity"
          value="0"
          onChange={(x) => x}
          name="quantity"
          type="number"
          placeholder="Quantity of Product"
        />
        <Input
          label="Cost"
          value="0"
          onChange={(x) => x}
          name="cost"
          type="number"
          placeholder="Unit Cost of Product"
        />
        <Input
          label="Price"
          value="0"
          onChange={(x) => x}
          name="price"
          type="number"
          placeholder="Unit Price of Product"
        />
      </Card>
    </div>
  )
}
