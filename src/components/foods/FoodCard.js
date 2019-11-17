import React, { Component } from "react";
import Badge from "react-bootstrap/Badge";
import "bootstrap/dist/css/bootstrap.min.css";
import "./food.css";
import DataManager from "../../module/DataManager";

export default class FoodCard extends Component {
  state = {
    count: 0,
    userId: "",
    name: "",
    fat: 0,
    carb: 0,
    protein: 0,
    sodium: 0,
    fiber: 0,
    foodId: 0
  };

  createNewEatenFood = () => {

    if (this.props.food.count === 0) {
      let newEatenFood = {
        userId: Number(sessionStorage.getItem("userId")),
        foodId: this.props.food.id,
      };
      this.props.addEatenFood(newEatenFood);
    }
  };

  updateCount = () => {
    let editedFood = {
      id: this.props.food.id,
      userId: Number(sessionStorage.getItem("userId")),
      name: this.state.name,
      fat: this.state.fat,
      carb: this.state.carb,
      protein: this.state.protein,
      sodium: this.state.sodium,
      fiber: this.state.fiber,
      count: this.state.count
    };
    this.props.updateFood(editedFood).then(() => {
      this.props.history.push("/foods");
      this.props.makeMacrosArrs();
    });
  };

  componentDidMount() {
    return DataManager.get("foods", this.props.food.id).then(food => {
      this.setState({
        userId: food.userId,
        name: food.name,
        fat: food.fat,
        carb: food.carb,
        protein: food.protein,
        sodium: food.sodium,
        fiber: food.fiber,
        count: food.count,
        foodId: food.id
      });
    });
  }

  increaseCount = () => {
    this.setState({ count: this.props.food.count + 1 }, () => {
      this.updateCount();
    });
  };

  decreaseCount = () => {
    this.setState({ count: this.props.food.count - 1 }, () => {
      this.updateCount();
    });
    if (Number(this.props.food.count < 1)) {
      this.setState({ count: 0 });
    }
  };

  clickParent = () => {
    if (this.props.action === "add") {
      this.increaseCount();
    } else if (this.props.action === "remove") {
      this.decreaseCount();
    } else if (this.props.action === "delete") {
      this.props.deleteFood(this.props.food.id);
      this.updateCount();
      this.props.history.push("/foods");
    } else if (this.props.action === "edit") {
      this.props.history.push(`/foods/${this.props.food.id}/edit`);
    }
  };

  clickGrandParent = () => {
    // this.createNewEatenFood();
    this.clickParent();
  };

  render() {
    return (
      <div>
        <div key={this.props.food.id} className="thing shadow rounded w-auto">
          <button
            className={
              this.props.food.count === 0
                ? "btn btn-outline-primary"
                : "btn btn-info"
            }
            onClick={this.clickGrandParent}
          >
            {this.props.food.name}
            <br />
            <Badge onChange={this.changeParent}>{this.props.food.count}</Badge>
          </button>
        </div>
      </div>
    );
  }
}
