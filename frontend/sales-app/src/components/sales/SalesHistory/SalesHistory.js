import React, { useState, useEffect } from "react";
//import { DatePicker } from '@progress/kendo-dateinputs-react-wrapper'
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import utils from "../../../utils";
import constants from "../../constants";
import Card from "../../shared/Card";
import Input from "../../shared/Input";
import Button from "../../shared/Button";
import { withRouter } from "react-router";
import { DatePicker } from "@progress/kendo-react-dateinputs";

function SalesHistory({ history }) {
  const [pageState, setPageState] = useState({ skip: 0, take: 10 });
  const [saleshistory, setSalesHistory] = useState([]);
  const [searchForm, setSearchForm] = useState({
    startDate: "",
    endDate: new Date(),
  });

  useEffect(() => {
    utils.getdata(constants.backendApi.get_sales_records).then((resp) => {
      if (resp.success === true) setSalesHistory(resp.data);
    });
    return () => {
      // do nothing
    };
  }, []);

  const pageChange = (event) => {
    setPageState({
      skip: event.page.skip,
      take: event.page.take,
    });
  };

  const onChangeSearch = async (e) => {
    const newForm = { ...searchForm, [e.target.name]: e.target.value };
    setSearchForm(newForm);
    utils
      .postdata(newForm, constants.backendApi.sales_rec_by_date)
      .then((resp) => {
        if (resp.success) setSalesHistory(resp.data);
      });
  };

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <Card subtitle="Filter By Date (Results between Start Date & End Date)">
          <div className="product-form">
            <Input
              name="startDate"
              type="date"
              value={searchForm.startDate}
              label="Start Date"
              onChange={onChangeSearch}
              autoFocus={true}
            />

            <Input
              name="endDate"
              type="date"
              value={searchForm.endDate}
              label="End Date"
              max={new Date()}
              onChange={onChangeSearch}
            />
          </div>
        </Card>
      </div>

      <Grid
        style={{ height: "500px" }}
        data={saleshistory.slice(
          pageState.skip,
          pageState.take + pageState.skip
        )}
        skip={pageState.skip}
        take={pageState.take}
        total={saleshistory.length}
        pageable={true}
        onPageChange={pageChange}
      >
        <Column field="dateStr" title="Date" width="180" />
        <Column field="receiptNumber" title="Receipt #" width="200" />
        <Column field="salesPerson" title="Sales Person" width="200" />
        {/* <Column field="grandTotal" title="Total (GHC)" width="100" format="GHC {0}" /> */}
        <Column field="grandTotal" title="Total (GHC)" width="150" />
        {/* <Column field="amountPaid" title="Paid (GHC)" width="150" /> */}
        {/* <Column field="balance" title="Balance (GHC)" width="150" /> */}
        <Column
          width="130px"
          field="details"
          title="Details"
          cell={(props) => (
            <td>
              <Button
                onClick={async () =>
                  history.push(`/Sales-Details/${props.dataItem.id}`)
                }
                className="secondary"
                text="Details"
              />
            </td>
          )}
        />
      </Grid>
    </div>
  );
}

export default withRouter(SalesHistory);
