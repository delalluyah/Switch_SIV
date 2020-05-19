import React, { useState, useEffect } from 'react'
import {
  Grid,
  GridColumn as Column,
  GridToolbar,
} from '@progress/kendo-react-grid'
import Card from '../shared/Card'
import utils from '../../utils'
import constants from '../constants'
import Button from '../shared/Button'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

function ProductTypes({ setMessage, setError, history }) {
  const [pageState, setPageState] = useState({ skip: 0, take: 10 })
  const [typesState, settypesState] = useState([])
  function fetchGridData() {
    utils
      .getdata(constants.backendApi.get_types)
      .then((response) =>
        response.success ? settypesState(response.data) : settypesState([])
      )
  }
  useEffect(() => {
    fetchGridData()
    return () => {}
  }, [])
  const pageChange = (event) => {
    setPageState({
      skip: event.page.skip,
      take: event.page.take,
    })
  }
  const deleteType = async (id) => {
    const resp = await utils.deletedata(constants.backendApi.delete_type + id)
    if (resp.success) {
      fetchGridData()
      setMessage('Record deleted successfully')
    } else setError('Sorry, an error occured. Please try again')
  }

  return (
    <div style={{ width: '100%' }}>
      <Card>
        <Grid
          style={{ height: '500px' }}
          data={typesState.slice(
            pageState.skip,
            pageState.take + pageState.skip
          )}
          skip={pageState.skip}
          take={pageState.take}
          total={typesState.length}
          pageable={true}
          onPageChange={pageChange}
        >
          <GridToolbar>
            <div style={{ width: '200px' }}>
              <Button
                onClick={(e) => {
                  history.push('/add-type/')
                }}
                className="primary"
                text="+ Add New Type"
              />
            </div>
          </GridToolbar>
          <Column field="name" title="Name" />
          <Column
            width="130px"
            field="producTypeId"
            title="Update"
            cell={(props) => (
              <td>
                <Button
                  onClick={(e) => {
                    history.push('/update-type/' + props.dataItem.productTypeId)
                  }}
                  className="secondary"
                  text="Update"
                />
              </td>
            )}
          />
          <Column
            width="130px"
            field="delete"
            title="Delete"
            cell={(props) => (
              <td>
                <Button
                  onClick={async () => {
                    if (
                      window.confirm(
                        'Are you sure you want to delete this item?'
                      )
                    )
                      await deleteType(props.dataItem.productTypeId)
                  }}
                  className="danger"
                  text="Delete"
                />
              </td>
            )}
          />
        </Grid>
      </Card>
    </div>
  )
}

export default connect(null, {
  setError: utils.setError,
  setMessage: utils.setMessage,
})(withRouter(ProductTypes))
