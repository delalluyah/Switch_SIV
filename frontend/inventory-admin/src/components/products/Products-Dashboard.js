import React, { useState } from 'react'
//import { DatePicker } from '@progress/kendo-dateinputs-react-wrapper'
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid'

export default function ProductsDashboard() {
  const [pageState, setPageState] = useState({ skip: 0, take: 10 })

  const pageChange = (event) => {
    setPageState({
      skip: event.page.skip,
      take: event.page.take,
    })
  }
  const products = [
    {
      ID: 1,
      Name: 'Note Book',
      CategoryName: 'Imported',
      UnitPrice: '30',
      UnitsInStock: 500,
    },
    {
      ID: 1,
      Name: 'Note Book',
      CategoryName: 'Imported',
      UnitPrice: '30',
      UnitsInStock: 500,
    },
    {
      ID: 1,
      Name: 'Note Book',
      CategoryName: 'Imported',
      UnitPrice: '30',
      UnitsInStock: 500,
    },
    {
      ID: 1,
      Name: 'Note Book',
      CategoryName: 'Imported',
      UnitPrice: '30',
      UnitsInStock: 500,
    },
    {
      ID: 1,
      Name: 'Note Book',
      CategoryName: 'Imported',
      UnitPrice: '30',
      UnitsInStock: 500,
    },
    {
      ID: 1,
      Name: 'Note Book',
      CategoryName: 'Imported',
      UnitPrice: '30',
      UnitsInStock: 500,
    },
    {
      ID: 1,
      Name: 'Note Book',
      CategoryName: 'Imported',
      UnitPrice: '30',
      UnitsInStock: 500,
    },
    {
      ID: 1,
      Name: 'Note Book',
      CategoryName: 'Imported',
      UnitPrice: '30',
      UnitsInStock: 500,
    },

    {
      ID: 1,
      Name: 'Note Book',
      CategoryName: 'Imported',
      UnitPrice: '30',
      UnitsInStock: 500,
    },
    {
      ID: 1,
      Name: 'Note Book',
      CategoryName: 'Imported',
      UnitPrice: '30',
      UnitsInStock: 500,
    },
    {
      ID: 1,
      Name: 'Note Book',
      CategoryName: 'Imported',
      UnitPrice: '30',
      UnitsInStock: 500,
    },
    {
      ID: 1,
      Name: 'Note Book',
      CategoryName: 'Imported',
      UnitPrice: '30',
      UnitsInStock: 500,
    },
    {
      ID: 1,
      Name: 'Note Book',
      CategoryName: 'Imported',
      UnitPrice: '30',
      UnitsInStock: 500,
    },
    {
      ID: 1,
      Name: 'Note Book',
      CategoryName: 'Imported',
      UnitPrice: '30',
      UnitsInStock: 500,
    },
    {
      ID: 1,
      Name: 'Note Book',
      CategoryName: 'Imported',
      UnitPrice: '30',
      UnitsInStock: 500,
    },
    {
      ID: 1,
      Name: 'Note Book',
      CategoryName: 'Imported',
      UnitPrice: '30',
      UnitsInStock: 500,
    },
  ]
  return (
    <div>
      <Grid
        style={{ height: '500px' }}
        data={products.slice(pageState.skip, pageState.take + pageState.skip)}
        skip={pageState.skip}
        take={pageState.take}
        total={products.length}
        pageable={true}
        onPageChange={pageChange}
      >
        <Column field="ID" title="ID" width="40px" />
        <Column field="Name" title="Name" width="250px" />
        <Column field="CategoryName" title="CategoryName" />
        <Column field="UnitPrice" title="Price" />
        <Column field="UnitsInStock" title="In stock" />
        <Column
          field="Discontinued"
          cell={(props) => (
            <td>
              <input
                disabled
                type="checkbox"
                checked={props.dataItem[props.field]}
              />
            </td>
          )}
        />
      </Grid>
    </div>
  )
}
