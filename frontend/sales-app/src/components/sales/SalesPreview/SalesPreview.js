import React, { useState } from "react";
import Card from "../../shared/Card";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import "./SalesPreview.css";
import Input from "../../shared/Input";
import Button from "../../shared/Button";
import constants from "../../constants";
import utils from "../../../utils";

function SalesPreview({ sales, setError }) {
  const [amountPaid, setAmountPaid] = useState(0);
  const [balance, setBalance] = useState(0);

  const { grandTotal, products } = sales;
  let retails = products.filter(
    (el) => el.saleTypeId === constants.salesTypeConstants.Retail
  );
  let bulks = products.filter(
    (el) => el.saleTypeId === constants.salesTypeConstants.Bulk
  );

  function onChangeAmountPaid(e) {
    let amount = e.target.value;
    setAmountPaid(amount);
    amount = parseFloat(amount);
    let bal = amount - sales.grandTotal;
    if (bal <= 0) setBalance(0);
    else setBalance(bal);
  }

  function onSubmit(e) {
    document.querySelector("table").print();
    if (amountPaid <= 0 || amountPaid < sales.grandTotal) {
      setError("Amount paid cannot be less than Total");
      return;
    }
  }

  return (
    <Card subtitle="Sales Preview" wide={true}>
      <div className="sales-preview">
        <table>
          {populateProducts(retails, "Retail")}
          {populateProducts(bulks, "Bulk")}
          <thead>
            <tr className="g-total">
              <th colSpan="4">GRAND TOTAL: GHS {grandTotal}</th>
            </tr>
          </thead>
        </table>
        <div className="two-col">
          <Input
            name="paid"
            label="Amount Paid"
            placeholder="Amount Paid"
            type="number"
            value={amountPaid}
            onChange={onChangeAmountPaid}
            min="0"
          />
          <Input
            name="balance"
            label="Balance"
            placeholder="Balance"
            value={balance}
            type="number"
            onChange={(x) => x}
            min="0"
            readOnly
          />
        </div>
        <Button text="Submit & Print" onClick={onSubmit} />
      </div>
    </Card>
  );
}

const mapStateToProps = ({ sales }) => {
  return { sales };
};

function populateProducts(products, topic) {
  if (products != null && products.length > 0)
    return (
      <>
        <thead>
          <tr className="table-top">
            <th colSpan="4">{topic}</th>
          </tr>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((el, index) => (
            <tr key={index}>
              <td>{el.name}</td>
              <td>GHC {el.unitPrice}</td>
              <td>{el.quantity}</td>
              <td>GHC {el.total}</td>
            </tr>
          ))}
        </tbody>
      </>
    );
  return null;
}
export default connect(mapStateToProps, {
  setError: utils.setError,
})(withRouter(SalesPreview));
