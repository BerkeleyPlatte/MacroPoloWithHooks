import React, { Component } from "react";
import DataManager from "../../module/DataManager";

export default class Register extends Component {
  state = {
    userName: "",
    userWeight: 0
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  handleRegister = event => {
    event.preventDefault();
    DataManager.getAll("users").then(users => {
      let isMatch = users.find(
        user =>
          user.userName.toLowerCase() === this.state.userName.toLowerCase()
      );
      if (isMatch) {
        window.alert("This user already exists! Please go back to login page.");
      } else if (this.state.userName === "") {
        window.alert("You left a field blank!");
      } else {
        let newUser = {
          userName: this.state.userName,
          userWeight: this.state.userWeight
        };
        this.props.addUser(newUser).then(() =>
          DataManager.getAll("users")
            .then(users =>
              users.find(user => user.userName === this.state.userName)
            )
            .then(foundUser => {
              sessionStorage.setItem("userId", foundUser.id);
            })
            .then(() => this.props.history.push("/foods"))
        );
      }
    });
  };

  render() {
    return (
      <form onSubmit={this.handleRegister}>
        <h1 className="h3 mb-3 font-weight-normal">Please Sign Up</h1>
        <label htmlFor="inputPassword">User Name:&nbsp;</label>
        <input
          onChange={this.handleFieldChange}
          type="userName"
          id="userName"
          placeholder="User Name"
          required=""
        />
        <br />
        <button type="submit" className="btn btn-info btn-sm login-button">
          Register
        </button>
        <br />
        <button
          type="button"
          className="btn btn-link"
          onClick={() => this.props.history.push("/")}
        >
          Back to Login Page
        </button>
      </form>
    );
  }
}
