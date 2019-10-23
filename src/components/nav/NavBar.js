import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

class NavBar extends Component {
  clearStorage = () => {
    localStorage.clear();
    sessionStorage.clear();
  };
  render() {
    return (
      <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow">
            <h3>Macro Polo</h3>
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link" to="/foods">
              <h5>Today</h5>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/reports">
              <h5>Days Gone By</h5>
            </Link>
          </li>
        </ul>

        <Link
          className="btn btn-primary btn-sm mr-3"
          onClick={this.clearStorage}
          to="/"
        >
          Logout
        </Link>
      </nav>
    );
  }
}

export default NavBar;
