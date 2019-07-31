import React, { Component } from "react";
import DataManager from "../../module/DataManager";

export default class FoodEditForm extends Component {
  state = {
    userId: "",
    name: "",
    fat: "",
    carb: "",
    protein: ""
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  updateExistingFood = evt => {
    evt.preventDefault();

    const editedFood = {
      id: this.props.match.params.foodId,
      userId: parseInt(sessionStorage.getItem("userId")),
    };

    this.props
      .updateFood(editedFood)
      .then(() => this.props.history.push("/foods"));
  };

  componentDidMount() {
    return DataManager.get("foods", this.props.match.params.foodId).then(
    );
  }


  render() {
    return (
      <React.Fragment>
        <form className="foodForm">
          <div className="form-group">
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="date"
              value={this.state.date}
            />
          </div>

          <button
            type="submit"
            onClick={this.updateExistingFood}
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
