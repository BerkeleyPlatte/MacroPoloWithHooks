import React, { Component } from "react";
import FoodCard from "./FoodCard";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
// import MacrosTable from "../macros/MacrosTable";
import Table from "react-bootstrap/Table";

export default class FoodList extends Component {
  state = {
    action: "add"
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

  componentDidMount() {
    //   this.makeMacrosArrs()
  }
  render() {
    return (
      <div>
        <div>
          {/* <MacrosTable
            makeMacrosArrs={this.props.makeMacrosArrs}
            foods={this.props.foods}
            {...this.props}
            fatSoFar={this.props.fatSoFar}
            carbSoFar={this.props.carbSoFar}
            proteinSoFar={this.props.proteinSoFar}
          /> */}
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
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Carbs</td>
                <td>{localStorage.getItem("carbSoFar")}</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Protein</td>
                <td>{localStorage.getItem("proteinSoFar")}</td>
                <td>0</td>
                <td>0</td>
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
            </ButtonGroup>
          </div>
          <section className="foods">
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
                />
              ))}
          </section>
        </React.Fragment>
      </div>
    );
  }
}
