import React from 'react'
import Input from '../shared/Input'
import Button from '../shared/Button'
import remove from './remove.svg'

export default function SalesRow({
  product,
  onFormChange = (x) => x,
  onCancel = (x) => x,
}) {
  return (
    <div className="four-col" style={{ position: 'relative' }}>
      <Input
        name="name"
        value={product.name}
        label="Product Name"
        placeholder="Product Name"
        onChange={onFormChange}
        readOnly
      />
      <Input
        name="quantity"
        label="Quantity"
        value={product.quantity}
        placeholder="Quantity"
        type="number"
        onChange={onFormChange}
      />
      <Input
        name="price"
        value={product.price}
        label="Price"
        placeholder="Price"
        type="number"
        onChange={onFormChange}
        readOnly
      />
      <div style={{ display: 'inline' }}>
        <Input
          name="total"
          value={(product.price * product.quantity).toFixed(2)}
          label="Total"
          placeholder="Total"
          type="number"
          readOnly
          onChange={onFormChange}
        />
        <div
          style={{
            width: '35px',
            position: 'absolute',
            right: '0px',
            bottom: '20px',
          }}
        >
          <Button
            image={remove}
            tooltip="Remove"
            text=""
            onClick={onCancel}
            className="danger"
          />
        </div>
      </div>
    </div>
  )
}
