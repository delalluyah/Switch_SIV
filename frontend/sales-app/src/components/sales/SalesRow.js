import React from "react";
import Input from "../shared/Input";
import DropDownList from "../shared/DropDownList";
import Button from "../shared/Button";
import remove from "./remove.svg";
import constants from "../constants";

export default function SalesRow({
  product,
  onFormChange = (x) => x,
  onCancel = (x) => x,
}) {
  return (
    <>
      <div className="three-col" style={{ position: "relative" }}>
        <Input
          name="name"
          value={product.name}
          label="Product Name"
          placeholder="Product Name"
          onChange={onFormChange}
          readOnly
        />
        <Input
          name="price"
          label="Price"
          value={
            product.saleTypeId === "1" ? product.bulkPrice : product.unitPrice
          }
          placeholder="Price"
          type="number"
          onChange={onFormChange}
          readOnly
          min="0"
        />

        <Input
          name="bulkUnits"
          label="Bulk Quantity Units"
          value={product.bulkUnits}
          placeholder="Bulk Quantity Units"
          type="number"
          onChange={onFormChange}
          readOnly
          min="0"
        />
      </div>
      <div className="three-col" style={{ position: "relative" }}>
        <DropDownList
          label="Sale Type"
          optionLabel="-- SELECT SALE TYPE --"
          data={constants.salesTypes}
          onChange={onFormChange}
          valueFieldName="id"
          textFieldName="name"
          name="saleTypeId"
          value={product.saleTypeId}
        />
        <Input
          name="quantity"
          label="Quantity"
          value={product.quantity}
          placeholder="Quantity"
          type="number"
          onChange={onFormChange}
          min="0"
        />
        <Input
          name="total"
          value={
            product.saleTypeId === "1"
              ? (
                  parseFloat(product.bulkPrice) * parseFloat(product.quantity)
                ).toFixed(2)
              : (
                  parseFloat(product.unitPrice) * parseFloat(product.quantity)
                ).toFixed(2)
          }
          label="Total"
          placeholder="Total"
          type="number"
          readOnly
          onChange={onFormChange}
          min="0"
        />
        <div
          style={{
            width: "35px",
            position: "absolute",
            right: "0px",
            bottom: "20px",
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
    </>
  );
}
