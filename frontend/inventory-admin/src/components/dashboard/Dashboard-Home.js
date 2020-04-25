import React, { useState, useEffect } from 'react'
import './dashboard-home.css'
import MiniCard from '../shared/MiniCard'
import box from './box.svg'
import product from './product.svg'
import price from './price.svg'
import utils from '../../utils'
import constants from '../constants'

export default function DashboardHome() {
  const [state, setState] = useState({
    totalProducts: 0,
    totalCost: 0,
    totalPrice: 0,
    weekly: {
      productsAdded: 0,
      quantityAdded: 0,
      amount: 0,
    },
    monthly: {
      productsAdded: 0,
      quantityAdded: 0,
      amount: 0,
    },
    annual: {
      productsAdded: 0,
      quantityAdded: 0,
      amount: 0,
    },
  })

  useEffect(() => {
    utils.getdata(constants.backendApi.get_dashboard_summary).then((res) => {
      if (res.success) setState(res.data)
    })
  }, [])
  return (
    <div className="dashboard-home">
      <Summary title="Summary">
        <MiniCard
          title="Total Products"
          value={state.totalProducts}
          theme="secondary"
          icon={product}
        />
        <MiniCard icon={box} title="Total Cost" value={state.totalCost} />
        <MiniCard
          theme="danger"
          icon={price}
          title="Total Price"
          value={state.totalPrice}
        />
      </Summary>
      <Summary
        title={`Weekly Summary (${new Date(
          new Date().setDate(new Date().getDate() - 7)
        )
          .toString()
          .split(' ')
          .slice(0, 4)
          .join(' ')} - ${new Date()
          .toString()
          .split(' ')
          .slice(0, 4)
          .join(' ')})`}
      >
        <MiniCard
          theme="orange"
          icon={product}
          title="Total Products Added"
          value={state.weekly.productsAdded}
        />
        <MiniCard
          icon={box}
          theme="secondary"
          title="Total Quantity Added"
          value={state.weekly.quantityAdded}
        />
        <MiniCard
          theme="orange2"
          icon={price}
          title="Total Amount"
          value={state.weekly.amount}
        />
      </Summary>
      <Summary
        title={`Monthly Summary (${new Date(
          new Date().setDate(new Date().getDate() - 30)
        )
          .toString()
          .split(' ')
          .slice(0, 4)
          .join(' ')} - ${new Date()
          .toString()
          .split(' ')
          .slice(0, 4)
          .join(' ')})`}
      >
        <MiniCard
          theme="secondary"
          icon={product}
          title="Total Products Added"
          value={state.monthly.productsAdded}
        />
        <MiniCard
          icon={box}
          title="Total Quantity Added"
          value={state.monthly.quantityAdded}
        />
        <MiniCard
          theme="danger"
          icon={price}
          title="Total Amount"
          value={state.monthly.amount}
        />
      </Summary>
      <Summary
        title={`Annual Summary (${new Date(
          new Date().setDate(new Date().getDate() - 365)
        )
          .toString()
          .split(' ')
          .slice(0, 4)
          .join(' ')} - ${new Date()
          .toString()
          .split(' ')
          .slice(0, 4)
          .join(' ')})`}
      >
        <MiniCard
          theme="orange"
          icon={product}
          title="Total Products Added"
          value={state.annual.productsAdded}
        />
        <MiniCard
          icon={box}
          theme="secondary"
          title="Total Quantity Added"
          value={state.annual.quantityAdded}
        />
        <MiniCard
          theme="orange2"
          icon={price}
          title="Total Amount"
          value={state.annual.amount}
        />
      </Summary>
    </div>
  )
}

const titleStyle = {
  textAlign: 'center',
  fontSize: '1.1em',
  fontWeight: '500',
}
const summaryStyle = {
  marginBottom: '20px',
}
const Summary = ({ title, children }) => {
  return (
    <div className="summary" style={summaryStyle}>
      <p className="summary-title" style={titleStyle}>
        {title}
      </p>
      <div className="three-col">{children}</div>
    </div>
  )
}
