import React, { useState, useEffect, Fragment } from "react";
import Card from "../shared/Card";
import Input from "../shared/Input";
import utils from "../../utils";
import constants from "../constants";
import plus from "./sign.svg";
import save from "./save.svg";
import Button from "../shared/Button";
import DropDownList from "../shared/DropDownList";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import SalesRow from "./SalesRow";
import actions from "../../store/actions";

function SalesRecords({ setMessage, setError, history, setSalesRecord }) {
  const [searchForm, setSearchForm] = useState({ code: "", name: "" });
  const [productsState, setProductsState] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const onChangeSearch = async (e) => {
    const newForm = { ...searchForm, [e.target.name]: e.target.value };
    setSearchForm(newForm);
    if (productsState.some((el) => el.barcode === newForm.code)) {
      const selected = productsState.filter(
        (el) => el.barcode === newForm.code
      )[0];
      selected.quantity = 1;
      setSelectedProducts([{ ...selected }, ...selectedProducts]);
      setMessage("Product selected");
      setSearchForm({ code: "" });
    }
  };
  useEffect(() => {
    utils.getdata(constants.backendApi.get_products).then((res) => {
      if (res.success) setProductsState(res.data);
    });
  }, []);
  function onSelectProduct(e) {
    let selected = productsState.filter(
      (el) => el.id == parseInt(e.target.value)
    )[0];
    selected.quantity = 1;
    setSelectedProducts([{ ...selected }, ...selectedProducts]);
    setMessage("Product selected");
  }

  function onChangeSelected(e, index) {
    setSelectedProducts(
      selectedProducts.map((product, mapIndex) => {
        if (mapIndex !== index) return product;
        product[e.target.name] = e.target.value;
        return product;
      })
    );
  }

  function getSalesSummary() {
    console.log(selectedProducts);
    return selectedProducts.map(
      ({
        id,
        name,
        barcode,
        typeName,
        categoryName,
        bulkPrice,
        unitPrice,
        quantity,
        saleTypeId,
      }) => {
        let product = {
          productId: id,
          name,
          barcode,
          typeName,
          categoryName,
          bulkPrice: parseFloat(bulkPrice),
          unitPrice: parseFloat(unitPrice),
          quantity: parseFloat(quantity),
          saleTypeId: parseInt(saleTypeId),
        };
        product.saleTypeName = constants.salesTypes.find(
          (x) => x.id == saleTypeId
        ).name;
        product.total =
          product.saleTypeId === constants.salesTypeConstants.Bulk
            ? (product.bulkPrice * product.quantity).toFixed(2)
            : (product.unitPrice * product.quantity).toFixed(2);

        return product;
      }
    );
  }

  function onSubmitSales() {
    let salesData = {
      grandTotal: calculateGrandtotal(),
      products: getSalesSummary(),
    };
    // if (window.confirm("Are you sure you want to save?")) {
    //   const toSend = selectedProducts.map((prod) => {
    //     prod.quantity = parseInt(prod.quantity);
    //     return prod;
    //   });
    //   utils
    //     .postdata({ products: toSend }, constants.backendApi.record_sales)
    //     .then((res) => {
    //       if (res.success) {
    //         setMessage("Sales Record Saved Successfully");
    //         document.getElementById("btn_box").style.display = "none";
    //       } else {
    //         res.errors.forEach((d) => {
    //           setError(d);
    //         });
    //       }
    //     });
    // }
    setSalesRecord({ type: actions.ADD_SALES_RECORD, payload: salesData });
    history.push("/preview-sales");
  }
  function onCancelProduct(index) {
    setSelectedProducts(
      selectedProducts.filter((product, filterIndex) => index !== filterIndex)
    );
  }
  function calculateGrandtotal() {
    let total = selectedProducts
      .reduce((prev, curr) => {
        if (curr.saleTypeId === "1") {
          return prev + parseFloat(curr.quantity) * parseFloat(curr.bulkPrice);
        }
        return prev + parseFloat(curr.quantity) * parseFloat(curr.unitPrice);
      }, 0)
      .toFixed(2);
    return parseFloat(total);
  }
  return (
    <>
      <Card subtitle="Search By Barcode Or Select product from dropdown">
        <div className="two-col">
          <Input
            name="code"
            value={searchForm.code}
            label="Barcode"
            placeholder="Barcode"
            onChange={onChangeSearch}
            autoFocus={true}
          />
          <DropDownList
            label="Select Product"
            optionLabel="-- SELECT PRODUCT --"
            data={productsState}
            onChange={onSelectProduct}
            valueFieldName="id"
            textFieldName="name"
            name="id"
          />
        </div>
      </Card>
      <br />
      <Card subtitle="Selected products">
        {/* <div style={{ width: '200px' }}>
          <Button image={plus} text="Add New Record" />{' '}
        </div> */}
        {selectedProducts.map((p, index) => {
          p.saleTypeId = p.saleTypeId ? p.saleTypeId : 2;
          return (
            <Fragment key={index}>
              <SalesRow
                key={index}
                product={p}
                onFormChange={(e) => onChangeSelected(e, index)}
                onCancel={() => onCancelProduct(index)}
              />
              <hr className="hr" />
            </Fragment>
          );
        })}
        {selectedProducts.length > 0 ? (
          <>
            {" "}
            <hr className="deepline" />
            <div className="four-col">
              <div></div>
              <div></div>
              <div>
                <h3>Grand Total</h3>
                <h3>GHC {calculateGrandtotal()}</h3>
              </div>
              <div id="btn_box">
                <br />
                <Button
                  image={save}
                  text="Save"
                  onClick={onSubmitSales}
                  className="secondary"
                />
              </div>
            </div>
          </>
        ) : null}
        <div></div>
      </Card>
    </>
  );
}

function setSalesRecord(data) {
  return function (dispatch) {
    dispatch(data);
  };
}

export default connect(null, {
  setError: utils.setError,
  setMessage: utils.setMessage,
  setSalesRecord,
})(withRouter(SalesRecords));
