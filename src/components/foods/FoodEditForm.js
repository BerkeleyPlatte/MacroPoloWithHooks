import React, { Component } from "react";
import DataManager from "../../module/DataManager";

export default class FoodEditForm extends Component {
  state = {
    userId: "",
    name: "",
    carb: 0,
    fat: 0,
    protein: 0,
    sodium: 0,
    fiber: 0,
    count: 0
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
      name: this.state.name,
      fat: Number(this.state.fat),
      carb: Number(this.state.carb),
      protein: Number(this.state.protein),
      sodium: Number(this.state.sodium),
      fiber: Number(this.state.fiber),
      count: this.state.count,
    };
    DataManager.get("foods", this.props.match.params.foodId)
      .then(food => {
        localStorage.setItem(
          "fatSoFar",
          localStorage.getItem("fatSoFar") -
            food.fat * food.count +
            editedFood.fat * editedFood.count
        );
        localStorage.setItem(
          "carbSoFar",
          localStorage.getItem("carbSoFar") -
            food.carb * food.count +
            editedFood.carb * editedFood.count
        );
        localStorage.setItem(
          "proteinSoFar",
          localStorage.getItem("proteinSoFar") -
            food.protein * food.count +
            editedFood.protein * editedFood.count
        );
        localStorage.setItem(
          "sodiumSoFar",
          localStorage.getItem("sodiumSoFar") -
            food.sodium * food.count +
            editedFood.sodium * editedFood.count
        );
        localStorage.setItem(
          "fiberSoFar",
          localStorage.getItem("fiberSoFar") -
            food.fiber * food.count +
            editedFood.fiber * editedFood.count
        );
      })
      .then(() =>
        this.props
          .updateFood(editedFood)

          .then(() => this.props.history.push("/foods"))
      );
  };

  componentDidMount() {
    return DataManager.get("foods", this.props.match.params.foodId).then(
      food => {
        this.setState({
          userId: food.userId,
          name: food.name,
          fat: food.fat,
          carb: food.carb,
          protein: food.protein,
          sodium: food.sodium,
          fiber: food.fiber,
          count: food.count
        });
      }
    );
  }

  render() {
    return (
      <React.Fragment>
        <form className="foodForm">
          <div className="form-group">
            <label htmlFor="food">Food name</label>
            <input
              type="text"
              required
              placeholder={this.state.name}
              className="form-control"
              onChange={this.handleFieldChange}
              id="name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="fat">Fat</label>
            <input
              type="text"
              required
              placeholder={this.state.fat}
              className="form-control"
              onChange={this.handleFieldChange}
              id="fat"
            />
          </div>
          <div className="form-group">
            <label htmlFor="carb">Carbs</label>
            <input
              type="text"
              required
              placeholder={this.state.carb}
              className="form-control"
              onChange={this.handleFieldChange}
              id="carb"
            />
          </div>
          <div className="form-group">
            <label htmlFor="protein">Protein</label>
            <input
              type="text"
              required
              placeholder={this.state.protein}
              className="form-control"
              onChange={this.handleFieldChange}
              id="protein"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="fiber">Fiber</label>
            <input
              type="text"
              required
              placeholder={this.state.fiber}
              className="form-control"
              onChange={this.handleFieldChange}
              id="fiber"
            />
          </div>
          <div className="form-group">
            <label htmlFor="sodium">Sodium (mg)</label>
            <input
              type="text"
              required
              placeholder={this.state.sodium}
              className="form-control"
              onChange={this.handleFieldChange}
              id="sodium"
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
