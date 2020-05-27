import React from "react";
import Card from "../../shared/Card";

export default function SalesPreview() {
  return (
    <div>
      <Card header="Sales Preview">
        <div>
          <div className="four-col" style={{ textDecoration: "underline" }}>
            <div>
              <b>Product</b>
            </div>
            <div>
              <b>Price</b>
            </div>
            <div>
              <b>Quantity</b>
            </div>
            <div>
              <b>Total Price</b>
            </div>
          </div>
          <div className="four-col">
            <div>Bluetooth Speaker</div>
            <div>GHC 25</div>
            <div>35</div>
            <div>GHC 2500</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
