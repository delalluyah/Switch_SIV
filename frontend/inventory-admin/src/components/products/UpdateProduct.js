import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import Card from "../shared/Card";
import Input from "../shared/Input";
import TextArea from "../shared/TextArea";
import Button from "../shared/Button";
import DropDownList from "../shared/DropDownList";
import utils from "../../utils";
import constants from "../constants";
import { connect } from "react-redux";

function UpdateProduct({ setError, setMessage, history, match }) {
  const [categories, setCategoriesState] = useState([]);
  const [types, setTypesState] = useState([]);
  const [formState, setformState] = useState({
    barcode: "",
    name: "",
    categoryId: "",
    typeId: "",
    cost: "",
    price: "",
    description: "",
    id: "",
  });
  const onFieldChange = async (e) => {
    setformState({ ...formState, [e.target.name]: e.target.value });
  };
  const getCategories = () => {
    utils
      .getdata(constants.backendApi.get_categories)
      .then((response) =>
        response.success
          ? setCategoriesState(response.data)
          : setCategoriesState([])
      );
  };
  const getTypes = () => {
    utils
      .getdata(constants.backendApi.get_types)
      .then((response) =>
        response.success ? setTypesState(response.data) : setTypesState([])
      );
  };
  const getProduct = () => {
    utils
      .getdata(constants.backendApi.search_product_by_id + match.params.id)
      .then((response) => {
        if (response.success) setformState(response.data);
        else history.goBack();
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (formState.barcode === "") {
      setError("Barcode field cannot be empty");
      return;
    }
    if (formState.name === "") {
      setError("Product Name field cannot be empty");
      return;
    }
    if (formState.categoryId === "") {
      setError("Please select a Product Category");
      return;
    }
    if (formState.typeId === "") {
      setError("Please select a Product Type");
      return;
    }
    if (formState.unitPrice === "") {
      setError("Please add Unit Price");
      return;
    }
    if (formState.bulkUnits === "") {
      setError("Bulk Units field is required");
      return;
    }
    if (formState.bulkPrice === "") {
      setError("Bulk Price field is required");
      return;
    }
    formState.categoryId = parseInt(formState.categoryId);
    formState.typeId = parseInt(formState.typeId);
    formState.quantity = 0;
    formState.cost = 0;
    formState.unitPrice = parseFloat(formState.unitPrice);
    formState.bulkPrice = parseFloat(formState.bulkPrice);
    formState.bulkUnits = parseFloat(formState.bulkUnits);
    utils
      .postdata(formState, constants.backendApi.update_product)
      .then((resp) => {
        if (resp.success === true) {
          setMessage("Product updated successfully");
          history.push("/product/details/" + match.params.id);
        } else setError("Sorry, an error occured. Please try again");
      })
      .catch(() => setError("Sorry, an error occured. Please try again"));
  };

  useEffect(() => {
    getProduct();
    getCategories();
    getTypes();
    return () => {};
  }, []);

  return (
    <div>
      <Card
        header={"Update Product Details"}
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

              {/* <Input
                label="Quantity"
                value={formState.quantity}
                onChange={onFieldChange}
                name="quantity"
                type="number"
                placeholder="New Quantity to be Added"
              /> */}

              <Input
                label="Bulk Price"
                value={formState.bulkPrice}
                onChange={onFieldChange}
                name="bulkPrice"
                type="number"
                placeholder="Bulk Price of Product"
              />
              <Input
                label="Description"
                value={formState.description}
                onChange={onFieldChange}
                name="description"
                placeholder="Product Description (optional)"
              />
            </div>
            <div>
              <Input
                label="Name"
                value={formState.name}
                onChange={onFieldChange}
                name="name"
                type="text"
                placeholder="Product Name"
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
                label="Units Per Bulk Quantity"
                value={formState.bulkUnits}
                onChange={onFieldChange}
                name="bulkUnits"
                type="number"
                placeholder="Bulk Units"
              />

              <Input
                label="Unit Price"
                value={formState.unitPrice}
                onChange={onFieldChange}
                name="unitPrice"
                type="number"
                placeholder="Unit Price of Product"
              />
            </div>
          </div>
          <div style={{ maxWidth: "500px", margin: "auto" }}>
            <Button text="Submit" onClick={(x) => x} />
          </div>
        </form>
      </Card>
    </div>
  );
}

export default connect(null, {
  setError: utils.setError,
  setMessage: utils.setMessage,
})(withRouter(UpdateProduct));
