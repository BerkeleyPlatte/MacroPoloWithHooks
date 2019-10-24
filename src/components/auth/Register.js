import React, { Component } from "react";
import DataManager from "../../module/DataManager";

export default class Register extends Component {
  state = {
    userName: "",
    weight: 0,
    password: "",
    fatFactor: 0,
    carbFactor: 0,
    proteinFactor: 0,
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
          weight: Number(this.state.weight),
          password: this.state.password,
          fatFactor: 0.2,
          carbFactor: 1,
          proteinFactor: 1.2
        };
        this.props.addUser(newUser).then(() =>
          DataManager.getAll("users")
            .then(users =>
              users.find(user => user.password === this.state.password)
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
      <form className="d-flex flex-column" onSubmit={this.handleRegister}>
        <h1 className="d-flex justify-content-center h3 mb-3 font-weight-normal">
          Please Sign Up
        </h1>
        <div className="d-flex justify-content-center">
          <label htmlFor="inputUserName">User Name:&nbsp;</label>
          <input
            onChange={this.handleFieldChange}
            type="userName"
            id="userName"
            placeholder="User Name"
            required=""
          />
        </div>
        <br />
        <div className="d-flex justify-content-center">
          <label htmlFor="inputPassword">Password:&nbsp;</label>
          <input
            onChange={this.handleFieldChange}
            type="password"
            id="password"
            placeholder="Password"
            required=""
          />
        </div>
        <br />
        <div className="d-flex justify-content-center">
          <label htmlFor="inputPassword">Weight:&nbsp;</label>
          <input
            onChange={this.handleFieldChange}
            type="number"
            id="weight"
            placeholder="Weight"
            required=""
          />
        </div>
        <br />
        <div className="d-flex justify-content-center">
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
        </div>
      </form>
    );
  }
}
