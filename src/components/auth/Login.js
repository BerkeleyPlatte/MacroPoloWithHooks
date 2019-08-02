import React, { Component } from "react";
import DataManager from "../../module/DataManager";

export default class Login extends Component {
  // Set initial state
  state = {
    userName: ""
  };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  // Simplistic handler for login submit
  handleLogin = e => {
    e.preventDefault();
    DataManager.getAll("users").then(users => {
      const singleUser = users.find(
        element =>
          element.userName.toLowerCase() === this.state.userName.toLowerCase()
      );
      if (singleUser) {
        sessionStorage.setItem("userId", singleUser.id);
        this.props.history.push("/foods");
        this.props.makeMacrosArrs();
      } else {
        window.alert(
          "Invalid login information. Please try again or register a new account."
        );
      }
    });
  };

  render() {
    return (
      <form onSubmit={this.handleLogin}>
        <h1 className="h4 mb-3 font-weight-normal">Please Sign In</h1>
        <label htmlFor="inputUserName">User Name:&nbsp;</label>
        <input
          onChange={this.handleFieldChange}
          type="text"
          id="userName"
          placeholder="User Name"
          required=""
        />
        &nbsp;
        <button type="submit" className="btn btn-info btn-sm login-button">
          Sign in
        </button>
        <br />
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => this.props.history.push("/register")}
        >
          Register New Account
        </button>
      </form>
    );
  }
}
