import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import utils from '../../utils'
import constants from '../constants'
import Button from '../shared/Button'
import { Link } from 'react-router-dom'

function ProductDetails({ history, match }) {
  const [profile, setProfile] = useState({})
  useEffect(() => {
    utils
      .getdata(constants.backendApi.search_product_by_id + match.params.id)
      .then((res) => {
        if (res.success) {
          setProfile(res.data)
        } else {
          history.goBack()
        }
      })
  }, [])
  return (
    <div>
      {profile.name}
      <div>
        <Link to={`/product/update/${profile.id}`}> Update</Link>
      </div>
    </div>
  )
}

export default connect(null)(withRouter(ProductDetails))
