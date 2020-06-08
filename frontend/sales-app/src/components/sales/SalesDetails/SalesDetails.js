import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import utils from "../../../utils";
import constants from "../../constants";
import Button from "../../shared/Button";
import Card from "../../shared/Card";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";

function SalesDetails({ history, match }) {
  const [salesRecord, setSalesRecord] = useState({ products: [] });
  const [gridState, setGridState] = useState({ skip: 0, take: 10 });

  const gridPageChange = (event) => {
    setGridState({
      skip: event.page.skip,
      take: event.page.take,
    });
  };
  useEffect(() => {
    utils
      .getdata(constants.backendApi.sales_rec_by_id + match.params.id)
      .then((res) => {
        if (res.success === true) {
          console.log(res.data);
          setSalesRecord(res.data);
        } else {
          history.goBack();
        }
      });
  }, []);
  return (
    <div>
      <Card header="Sales record details" subtitle={salesRecord.receiptNumber}>
        <div style={{ width: "150px", marginLeft: "auto" }}>
          <Button
            onClick={() => history.goBack()}
            text="Back"
            className="danger"
          />
        </div>
        <div className="two-col">
          <div className="item-details">
            <p>
              <b>Receipt Number:</b> {salesRecord.receiptNumber}
            </p>
            <p>
              <b>Sales Person Name:</b> {salesRecord.salesPerson}
            </p>
            <p>
              <b>Date:</b> {salesRecord.dateStr}
            </p>
            <p>
              <b>Total Amount:</b> GHC {salesRecord.grandTotal}
            </p>
            <p>
              <b>Amount Paid:</b> GHC {salesRecord.amountPaid}
            </p>
            <p>
              <b>Balance:</b> GHC {salesRecord.balance}
            </p>
          </div>
        </div>
        <Grid
          style={{ height: "500px" }}
          data={salesRecord.products.slice(
            gridState.skip,
            gridState.take + gridState.skip
          )}
          skip={gridState.skip}
          take={gridState.take}
          total={salesRecord.products.length}
          pageable={true}
          onPageChange={gridPageChange}
        >
          <Column field="productName" title="Name" width="200" />
          <Column field="saleType" title="Sale Type" width="200" />
          <Column field="quantity" title="Quantity" width="200" />
          <Column
            field="singleItemAmount"
            title="Cost of One (GHC)"
            width="150"
            // format="GHC {0}"
          />
          <Column field="totalAmount" title="Total (GHC)" width="150" />
        </Grid>
      </Card>
    </div>
  );
}

export default connect(null)(withRouter(SalesDetails));
