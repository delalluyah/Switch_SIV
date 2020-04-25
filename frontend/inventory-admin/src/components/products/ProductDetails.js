import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import utils from '../../utils'
import constants from '../constants'
import Button from '../shared/Button'
import { Link } from 'react-router-dom'
import Card from '../shared/Card'

function ProductDetails({ history, match }) {
  const [product, setProduct] = useState({ barcode: '', name: '', id: '' })
  useEffect(() => {
    utils
      .getdata(constants.backendApi.search_product_by_id + match.params.id)
      .then((res) => {
        if (res.success) {
          setProduct(res.data)
        } else {
          history.goBack()
        }
      })
  }, [])
  return (
    <div>
      <Card subtitle={product.name}>
        <div style={{ width: '150px', marginLeft: 'auto' }}>
          <Button
            onClick={() => history.push(`/product/update/${product.id}`)}
            text="Update"
          />
        </div>
        <div className="product-form">
          <div>
            <table className="display-table">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Value</th>
                </tr>
                <tr>
                  <td>Barcode</td>
                  <td>{product.barcode}</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Product Name</td>
                  <td>{product.name}</td>
                </tr>
                <tr>
                  <td>Product Category</td>
                  <td>{product.categoryName}</td>
                </tr>
                <tr>
                  <td>Product Type</td>
                  <td>{product.typeName}</td>
                </tr>
                <tr>
                  <td>Quantity Available</td>
                  <td>{product.quantity} Units</td>
                </tr>
                <tr>
                  <td>Unit Cost</td>
                  <td>GHC {product.cost}</td>
                </tr>
                <tr>
                  <td>Unit Price</td>
                  <td>GHC {product.price}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            {product.description && (
              <>
                {' '}
                <p>
                  <b>Description</b>
                </p>
                <p>{product.description}</p>{' '}
              </>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}

export default connect(null)(withRouter(ProductDetails))
