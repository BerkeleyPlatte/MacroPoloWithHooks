import React, { Component } from "react";

export default class FoodForm extends Component {
  state = {
    name: "",
    fat: 0,
    carb: 0,
    protein: 0,
    sodium: 0,
    fiber: 0,
    id: 0,
    userId: 0,
    foodId: 0,
    count: 0
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  constructNewFood = evt => {
    evt.preventDefault();

    let newFood = {
      name: this.state.name,
      fat: Number(this.state.fat),
      carb: Number(this.state.carb),
      protein: Number(this.state.protein),
      sodium: Number(this.state.sodium),
      fiber: Number(this.state.fiber),
      userId: Number(sessionStorage.getItem("userId")),
      count: Number(this.state.count),
    };
   

    this.props
      .addFood(newFood)
     
      .then(() => this.props.history.push("/foods"))
     
  };
  
  render() {
    return (
      <React.Fragment>
        <form className="foodForm">
          <div className="form-group">
            <label htmlFor="food">Food name</label>
            <input
              autoFocus
              type="text"
              required
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
              className="form-control"
              onChange={this.handleFieldChange}
              id="sodium"
            />
          </div>

          <button
            type="submit"
            onClick={this.constructNewFood}
            className="btn btn-primary"
          >
            Create
          </button>
          &nbsp;
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
