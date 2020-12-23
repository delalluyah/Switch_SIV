import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import utils from "../../utils";
import constants from "../constants";
import Button from "../shared/Button";
import Card from "../shared/Card";

function ProductDetails({ history, match }) {
  const [product, setProduct] = useState({ barcode: "", name: "", id: "" });
  useEffect(() => {
    utils
      .getdata(constants.backendApi.search_product_by_id + match.params.id)
      .then((res) => {
        if (res.success) {
          setProduct(res.data);
        } else {
          history.goBack();
        }
      });
  }, []);
  return (
    <div>
      <Card subtitle={product.name}>
        <div style={{ width: "150px", marginLeft: "auto" }}>
          <Button
            onClick={() => history.goBack()}
            text="Back"
            className="danger"
          />
        </div>
        <div className="two-col">
          <div className="item-details">
            {/* <p>
              <b>Barcode:</b> {product.barcode}
            </p> */}
            <p>
              <b>Product Name:</b> {product.name}
            </p>
            <p>
              <b>Product Category:</b> {product.categoryName}
            </p>
            <p>
              <b>Product Type:</b> {product.typeName}
            </p>
            <p>
              <b>Quantity Available:</b> {product.quantity} Units /{" "}
              {product.bulkQuantity} (in bulk)
            </p>
            <p>
              <b>Unit Price:</b>GHC {product.unitPrice}
            </p>
            <p>
              <b>Bulk Price:</b>GHC {product.bulkPrice}
            </p>
            <p>
              <b>Bulk Units:</b> {product.bulkUnits} Units
            </p>
          </div>
          <div>
            {product.description && (
              <>
                {" "}
                <p>
                  <b>Description</b>
                </p>
                <p>{product.description}</p>{" "}
              </>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default connect(null)(withRouter(ProductDetails));
