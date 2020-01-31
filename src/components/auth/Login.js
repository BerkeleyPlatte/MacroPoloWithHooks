import React, { useRef } from "react";
import DataManager from "../../module/DataManager";

function Login() {
 const [userName, setUserName] = useState('');
 const [password, setPassword] = useState('');

  const handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  const handleLogin = e => {
    e.preventDefault();
    DataManager.getAll("users").then(users => {
      const singleUser = users.find(
        element =>
          element.userName.toLowerCase() ===
            this.state.userName.toLowerCase() &&
          element.password.toLowerCase() === this.state.password.toLowerCase()
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

    return (
      <form className="d-flex flex-column" onSubmit={this.handleLogin}>
        <h1 className="d-flex h4 mb-3 font-weight-normal justify-content-center">
          Please Sign In
        </h1>
        <div className="d-flex justify-content-center">
          <label htmlFor="inputUserName">User Name:&nbsp;</label>
          <input
            onChange={this.handleFieldChange}
            type="text"
            id="userName"
            placeholder="User Name"
            required=""
          />
        </div>
        &nbsp;
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
        &nbsp;
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-info btn-sm login-button">
            Sign in
          </button>
          &nbsp;
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => this.props.history.push("/register")}
          >
            Register New Account
          </button>
        </div>
      </form>
    );
}

export default Login