import React, { useState } from "react";
import Card from "../../shared/Card";
import Input from "../../shared/Input";
import "./login.css";
import Button from "../../shared/Button";
import constants from "../../constants";
import utils from "../../../utils";
import { connect } from "react-redux";
import { withRouter } from "react-router";

const Login = ({ setError, setMessage, setUser, history }) => {
  const initialState = { username: "", password: "" };
  const [state, setState] = useState(initialState);
  const onTextChange = async (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    if (state.username === "") {
      setError("Username cannot be empty");
      return;
    }
    if (state.password === "") {
      setError("Password cannot be empty");
      return;
    }
    try {
      let resp = await utils.postdata(state, constants.backendApi.login);
      if (resp.success) {
        //setMessage('Login successful')
        localStorage.setItem(constants.user_token_name, resp.token);
        const user = utils.getUserDetails();
        setUser(user);
        history.push("/");
        if (user.fullname) setMessage(`Welcome, ${user.fullname}`);
      } else {
        resp.errors.forEach((err) => setError(err));
      }
    } catch (ex) {
      setError("Sorry an error occured, please try again");
      console.log(ex);
    }
  };
  return (
    <>
      <div className="full-page">
        <div className="login"> </div>
        <div className="login-box">
          <Card
            transparent={true}
            header="Login"
            subtitle="Login with your admin credentials"
          >
            <div style={{ display: "block", margin: "auto" }}>
              <form onSubmit={onSubmit}>
                <Input
                  label="Username"
                  value={state.username}
                  onChange={onTextChange}
                  name="username"
                  type="text"
                  placeholder="johndoe"
                />
                <Input
                  label="Password"
                  value={state.password}
                  onChange={onTextChange}
                  name="password"
                  type="password"
                  placeholder="********"
                />
                <Button type="submit" text="Submit" />
              </form>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = ({ auth }) => ({
  auth,
});
export default connect(mapStateToProps, {
  setError: utils.setError,
  setMessage: utils.setMessage,
  setUser: utils.setUser,
})(withRouter(Login));
