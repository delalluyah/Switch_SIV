import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import utils from "../../utils";
import { withRouter } from "react-router";
import Button from "../shared/Button";
import Input from "../shared/Input";
import Card from "../shared/Card";
import DropDownList from "../shared/DropDownList";
import constants from "../constants";

function AddUser({ setError, setMessage, history }) {
  const [roles, setRoles] = useState([]);
  const [formState, setformState] = useState({
    username: "",
    fullname: "",
    roleId: "",
    password: "",
    password2: "",
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
    if (formState.password === "") {
      setError("Password field cannot be empty");
      return;
    }
    if (formState.password2 === "") {
      setError("Confirm Password field cannot be empty");
      return;
    }
    if (formState.password2 !== formState.password) {
      setError("The two passwords do not match");
      return;
    }
    if (formState.roleId === "") {
      setError("Please select a Role");
      return;
    }

    formState.roleId = parseInt(formState.roleId);
    const tosend = {
      roleId: formState.roleId,
      username: formState.username,
      password: formState.password,
      fullname: formState.fullname,
    };
    utils
      .postdata(tosend, constants.backendApi.register_user)
      .then((resp) => {
        if (resp.success === true) {
          setMessage("User Created successfully");
          history.push("/users/");
        } else resp.errors.forEach((err) => setError(err));
      })
      .catch(() => setError("Sorry, an error occured. Please try again"));
  };

  useEffect(() => {
    getRoles();
    return () => {};
  }, []);

  return (
    <div>
      <div className="two-col">
        <Card
          header={"Create A New User"}
          //   subtitle="Note: If you provide a password, \it will overwrite this user's existing password"
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
              <Input
                label="Confirm Password"
                value={formState.password2}
                onChange={onFieldChange}
                name="password2"
                type="password"
                placeholder="Confirm Password"
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
})(withRouter(AddUser));
