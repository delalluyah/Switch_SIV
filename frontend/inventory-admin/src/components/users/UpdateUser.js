import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import utils from "../../utils";
import constants from "../constants";
import Card from "../shared/Card";
import Input from "../shared/Input";
import Button from "../shared/Button";
import DropDownList from "../shared/DropDownList";
import { connect } from "react-redux";

function UpdateUser({ history, match, setError, setMessage }) {
  const [roles, setRoles] = useState([]);
  const [formState, setformState] = useState({
    username: "",
    fullname: "",
    roleId: "",
    password: "",
    id: "",
  });
  const onFieldChange = async (e) => {
    setformState({ ...formState, [e.target.name]: e.target.value });
  };

  function onUnauthorized() {
    history.push(constants.home_pages.non_admin);
    document.getElementById("side-menu-users").style.display = "none";
  }

  const getRoles = () => {
    utils
      .getdata(constants.backendApi.get_roles, onUnauthorized)
      .then((response) =>
        response.success ? setRoles(response.data) : setRoles([])
      );
  };

  const getUser = () => {
    utils
      .getdata(constants.backendApi.get_user_by_id + match.params.id)
      .then((response) => {
        if (response.success) setformState(response.data);
        else history.goBack();
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (formState.fullname === "") {
      setError("Full Name field cannot be empty");
      return;
    }
    if (formState.username === "") {
      setError("Username field cannot be empty");
      return;
    }
    if (formState.roleId === "") {
      setError("Please select a Role");
      return;
    }

    formState.roleId = parseInt(formState.roleId);

    utils
      .postdata(formState, constants.backendApi.update_user)
      .then((resp) => {
        if (resp.success === true) {
          setMessage("User updated successfully");
          history.push("/users/");
        } else setError("Sorry, an error occured. Please try again");
      })
      .catch(() => setError("Sorry, an error occured. Please try again"));
  };

  useEffect(() => {
    getUser();
    getRoles();
    return () => {};
  }, []);

  return (
    <div>
      <div className="two-col">
        <Card
          header={"Update User Details"}
          subtitle="Note: If you provide a password, it will overwrite this user's existing password"
          //transparent={true}
        >
          <form onSubmit={onSubmit}>
            <div>
              <Input
                label="Full Name"
                value={formState.fullname}
                name="fullname"
                type="text"
                placeholder="Full Name"
                onChange={onFieldChange}
              />
              <Input
                label="Username"
                value={formState.username}
                onChange={onFieldChange}
                name="username"
                type="text"
                placeholder="Username"
              />
              <DropDownList
                label="User Role"
                optionLabel="-- SELECT ROLE --"
                data={roles}
                onChange={onFieldChange}
                valueFieldName="roleId"
                textFieldName="name"
                name="roleId"
                value={formState.roleId}
              />
              <Input
                label="Password"
                value={formState.password}
                onChange={onFieldChange}
                name="password"
                type="password"
                placeholder="Password"
              />
              <Button text="Submit" />
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default connect(null, {
  setError: utils.setError,
  setMessage: utils.setMessage,
})(withRouter(UpdateUser));
