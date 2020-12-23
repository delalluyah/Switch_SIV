import React, { useState, useEffect, useRef } from "react";
//import { DatePicker } from '@progress/kendo-dateinputs-react-wrapper'
import {
  Grid,
  GridColumn as Column,
  GridToolbar as Toolbar,
} from "@progress/kendo-react-grid";
import utils from "../../utils";
import constants from "../constants";
import Card from "../shared/Card";
import Input from "../shared/Input";
import Button from "../shared/Button";
import { withRouter } from "react-router";
import { ExcelExport } from "@progress/kendo-react-excel-export";

function ProductsDashboard({ history }) {
  const [pageState, setPageState] = useState({ skip: 0, take: 10 });
  const [products, setProducts] = useState([]);
  const [searchForm, setSearchForm] = useState({ code: "", name: "" });

  let _export = useRef({});
  const gridExport = () => {
    _export.save();
  };

  useEffect(() => {
    utils.getdata(constants.backendApi.get_products).then((resp) => {
      if (resp.success === true) setProducts(resp.data);
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
      .postdata(newForm, constants.backendApi.search_product_by_name_and_code)
      .then((resp) => {
        if (resp.success) setProducts(resp.data);
      });
  };

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <Card subtitle="Search By Barcode & Product Name">
          <div className="product-form">
            {/* <Input
              name="code"
              value={searchForm.code}
              label="Barcode"
              placeholder="Barcode"
              onChange={onChangeSearch}
              autoFocus={true}
            /> */}
            <Input
              name="name"
              value={searchForm.name}
              label="Product Name"
              placeholder="Product Name"
              onChange={onChangeSearch}
            />
          </div>
        </Card>
      </div>
      <ExcelExport
        fileName={`Inventory_Report_${new Date().getMonth()}_${new Date().getDate()}_${new Date().getHours()}:${new Date().getMinutes()}.xlsx`}
        data={products}
        ref={(exporter) => (_export = exporter)}
      >
        <Grid
          style={{ height: "500px" }}
          data={products.slice(pageState.skip, pageState.take + pageState.skip)}
          skip={pageState.skip}
          take={pageState.take}
          total={products.length}
          pageable={true}
          onPageChange={pageChange}
        >
          <Toolbar>
            <div style={{ width: "150px" }}>
              <Button
                text="Export to Excel"
                className="primary btn-sm"
                onClick={gridExport}
              ></Button>
            </div>
          </Toolbar>
          {/* <Column field="barcode" title="Barcode" width="120" /> */}
          <Column field="name" title="Name" width="400" />
          <Column field="categoryName" title="Category" width="200" />
          <Column
            field="unitPrice"
            title="Price"
            width="150"
            format="GHC {0}"
          />
          <Column field="quantity" title="Quantity" width="150" />
          <Column field="bulkQuantity" title="In stock" width="140" />
          <Column
            width="130"
            field="details"
            title="Details"
            cell={(props) => (
              <td>
                <Button
                  onClick={async () =>
                    history.push(`/product/Details/${props.dataItem.id}`)
                  }
                  className="secondary"
                  text="Details"
                />
              </td>
            )}
          />
        </Grid>
      </ExcelExport>
    </div>
  );
}

export default withRouter(ProductsDashboard);
