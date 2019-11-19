import React, { Component } from "react";
import DataManager from "../../module/DataManager";
import "./settings.css";

export default class SettingsForm extends Component {
  state = {
    id: 0,
    userName: "",
    weight: 0,
    password: "",
    fatFactor: 0,
    carbFactor: 0,
    proteinFactor: 0,
    sodiumFactor: 0,
    fiberFactor: 0
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  updateExistingUser = evt => {
    evt.preventDefault();

    let editedUser = {
      id: Number(sessionStorage.getItem("userId")),
      userName: this.state.userName,
      weight: Number(this.state.weight),
      password: this.state.password,
      fatFactor: Number(this.state.fatFactor),
      carbFactor: Number(this.state.carbFactor),
      proteinFactor: Number(this.state.proteinFactor),
      sodiumFactor: Number(this.state.sodiumFactor),
      fiberFactor: Number(this.state.fiberFactor)
    };

    this.props.updateUser(editedUser).then(this.props.history.push("/foods"));
  };

  componentDidMount() {
    return DataManager.get("users", this.props.match.params.userId).then(
      user => {
        this.setState({
          id: Number(user.id),
          userName: user.userName,
          weight: Number(user.weight),
          password: user.password,
          fatFactor: Number(user.fatFactor),
          carbFactor: Number(user.carbFactor),
          proteinFactor: Number(user.proteinFactor),
          sodiumFactor: Number(user.sodiumFactor),
          fiberFactor: Number(user.fiberFactor)
        });
      }
    );
  }

  render() {
    return (
      <React.Fragment>
        <form className="userForm">
          <header>Set Your Goals for Each Macro</header>
          <br />
          <div className="form-group">
            <label htmlFor="fat">
              Grams of fat per pound of body weight per day:
            </label>
            <input
              type="number"
              step=".0001"
              required
              placeholder={this.state.fatFactor}
              className="form-control"
              onChange={this.handleFieldChange}
              id="fatFactor"
            />
          </div>
          <div className="form-group">
            <label htmlFor="carb">
              Grams of carbs per pound of body weight per day:
            </label>
            <input
              type="number"
              step=".0001"
              required
              placeholder={this.state.carbFactor}
              className="form-control"
              onChange={this.handleFieldChange}
              id="carbFactor"
            />
          </div>
          <div className="form-group">
            <label htmlFor="protein">
              Grams of protein per pound of body weight per day:
            </label>
            <input
              type="number"
              step=".0001"
              required
              placeholder={this.state.proteinFactor}
              className="form-control"
              onChange={this.handleFieldChange}
              id="proteinFactor"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="fiber">
              Grams of fiber per pound of body weight per day:
            </label>
            <input
              type="number"
              step=".0001"
              required
              placeholder={this.state.fiberFactor}
              className="form-control"
              onChange={this.handleFieldChange}
              id="fiberFactor"
            />
          </div>
          <div className="form-group">
            <label htmlFor="sodium">
              Milligrams of sodium per pound of body weight per day:
            </label>
            <input
              type="number"
              step=".0001"
              required
              placeholder={this.state.sodiumFactor}
              className="form-control"
              onChange={this.handleFieldChange}
              id="sodiumFactor"
            />
          </div>

          <button
            type="submit"
            onClick={this.updateExistingUser}
            className="btn btn-primary"
          >
            Submit
          </button>
          <button
            type="submit"
            onClick={() => this.props.history.push("/foods")}
            className="btn btn-primary"
          >
            Cancel
          </button>
        </form>
      </React.Fragment>
    );
  }
}
