import "./user.css";
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import utils from "../../utils";
import constants from "../constants";
import {
  Grid,
  GridColumn as Column,
  GridToolbar,
} from "@progress/kendo-react-grid";
import Button from "../shared/Button";
import Card from "../shared/Card";

function Users({ history }) {
  const [pageState, setPageState] = useState({ skip: 0, take: 10 });
  const [users, setUsers] = useState([]);

  function onUnauthorized() {
    history.push(constants.home_pages.non_admin);
    document.getElementById("side-menu-users").style.display = "none";
  }

  useEffect(() => {
    utils
      .getdata(constants.backendApi.get_users, onUnauthorized)
      .then((resp) => {
        console.log(resp);
        if (resp.success === true) setUsers(resp.data);
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

  return (
    <div style={{ marginBottom: "10px" }}>
      <Card>
        <Grid
          style={{ height: "500px" }}
          data={users.slice(pageState.skip, pageState.take + pageState.skip)}
          skip={pageState.skip}
          take={pageState.take}
          total={users.length}
          pageable={true}
          onPageChange={pageChange}
        >
          <GridToolbar>
            <div style={{ width: "200px" }}>
              <Button
                onClick={(e) => {
                  history.push("/add-user/");
                }}
                className="primary"
                text="+ Add New User"
              />
            </div>
          </GridToolbar>
          <Column field="fullname" title="Full Name" width="300" />
          <Column field="username" title="Username" width="300" />
          <Column field="roleName" title="Role" width="300" />
          <Column
            width="130px"
            field="details"
            title="Details"
            cell={(props) => (
              <td>
                <Button
                  onClick={async () =>
                    history.push(`/update-user/${props.dataItem.id}`)
                  }
                  className="secondary"
                  text="Update"
                />
              </td>
            )}
          />
        </Grid>
      </Card>
    </div>
  );
}

export default withRouter(Users);
