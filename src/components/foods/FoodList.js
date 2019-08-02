import React, { Component } from "react";
import FoodCard from "./FoodCard";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import DataManager from "../../module/DataManager";

export default class FoodList extends Component {
  state = {
    action: "add",
    weight: 0,
    userName: "",
    count: 0
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  updateExistingUser = () => {
    // evt.preventDefault();

    let editedUser = {
      id: Number(sessionStorage.getItem("userId")),
      userName: this.state.userName,
      weight: this.state.weight
    };

    this.props
      .updateUser(editedUser)
      .then(() => this.props.history.push("/foods"));
  };

  activateIncrease = () => {
    this.setState({ action: "add" });
  };

  activateDecrease = () => {
    this.setState({ action: "remove" });
  };
  activateDelete = () => {
    this.setState({ action: "delete" });
  };
  activateEdit = () => {
    this.setState({ action: "edit" });
  };

  componentDidMount() {
    return DataManager.get("users", sessionStorage.getItem("userId")).then(
      user => {
        this.setState({
          userName: user.userName,
          weight: user.weight
        });
      }
    );
  }

  render() {
    let weight = this.state.weight;
    let fatGoal = (weight * 0.3).toFixed(1);
    let carbGoal = (weight * 0.6).toFixed(1);
    let proteinGoal = (weight * 1.4).toFixed(1);
    return (
      <div>
        <label>Weight:</label>
        <input
          type="text"
          id="weight"
          placeholder={weight}
          onChange={this.handleFieldChange}
        />
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => {
            // localStorage.setItem("weight", this.state.weight);
            this.updateExistingUser().then(() =>
              this.props.history.push("/foods")
            );
          }}
        >
          Save Weight
        </button>
        <div>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Macros</th>
                <th>So Far</th>
                <th>To Go</th>
                <th>Goal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Fat</td>
                <td>{localStorage.getItem("fatSoFar")}</td>
                <td>
                  {(fatGoal - localStorage.getItem("fatSoFar")).toFixed(1)}
                </td>
                {fatGoal}
              </tr>
              <tr>
                <td>Carbs</td>
                <td>{localStorage.getItem("carbSoFar")}</td>
                <td>
                  {(carbGoal - localStorage.getItem("carbSoFar")).toFixed(1)}
                </td>
                <td>{carbGoal}</td>
              </tr>
              <tr>
                <td>Protein</td>
                <td>{localStorage.getItem("proteinSoFar")}</td>
                <td>
                  {(proteinGoal - localStorage.getItem("proteinSoFar")).toFixed(
                    1
                  )}
                </td>
                <td>{proteinGoal}</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <React.Fragment>
          <div className="d-flex flex-column" />
          <div className="foodsButton">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                this.props.history.push("/foods/new");
              }}
            >
              Add Food
            </button>
            <ButtonGroup toggle className="mt-3">
              <ToggleButton
                onClick={this.activateIncrease}
                type="radio"
                name="radio"
                defaultChecked
                value="1"
              >
                Add
              </ToggleButton>
              <ToggleButton
                onClick={this.activateDecrease}
                type="radio"
                name="radio"
                value="2"
              >
                Remove
              </ToggleButton>
              <ToggleButton
                onClick={this.activateDelete}
                type="radio"
                name="radio"
                value="3"
              >
                Delete
              </ToggleButton>
              {/* <ToggleButton
                onClick={this.activateEdit}
                type="radio"
                name="radio"
                value="4"
              >
                Edit
              </ToggleButton> */}
            </ButtonGroup>
          </div>
          <section className="foods block-example border border-dark">
            {this.props.foods
              .filter(
                food =>
                  Number(food.userId) ===
                  Number(sessionStorage.getItem("userId"))
              )
              .map(food => (
                <FoodCard
                  key={food.id}
                  food={food}
                  action={this.state.action}
                  {...this.props}
                  fatSoFar={this.props.fatSoFar}
                  carbSoFar={this.props.carbSoFar}
                  proteinSoFar={this.props.proteinSoFar}
                  makeMacrosArrs={this.props.makeMacrosArrs}
                  revertUserCounts={this.props.revertUserCounts}
                />
              ))}
          </section>
          <section>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                // localStorage.setItem("weight", this.state.weight);
                this.props.revertUserCounts();
              }}
            >
              Clear
            </button>
          </section>
        </React.Fragment>
      </div>
    );
  }
}
