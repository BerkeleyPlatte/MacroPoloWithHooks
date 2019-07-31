import React, { Component } from "react";
import Badge from "react-bootstrap/Badge";
import "bootstrap/dist/css/bootstrap.min.css";
import "./food.css";
import DataManager from "../../module/DataManager";

export default class FoodCard extends Component {
  state = {
    count: Number(this.props.food.count),
    userId: this.props.food.userId,
    name: this.props.food.name,
    fat: this.props.food.fat,
    carb: this.props.food.carb,
    protein: this.props.food.protein,
    date: this.props.food.date
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  updateCount = () => {
      console.log("updateCount")
    // evt.preventDefault();
    let editedFood = {
      id: this.props.food.id,
      userId: Number(sessionStorage.getItem("userId")),
      name: this.state.name,
      fat: this.state.fat,
      carb: this.state.carb,
      protein: this.state.protein,
      date: this.state.date,
      count: this.state.count
    };
    this.props.updateFood(editedFood).then(() => {
      this.props.history.push("/foods");
      this.props.makeMacrosArrs()
    });
  };

  componentDidMount() {
      console.log("foodCardDidMount")
    DataManager.get("foods", this.props.food.id).then(evt => {
      this.setState({
        userId: evt.userId,
        name: evt.name,
        date: evt.date,
        fat: evt.fat,
        carb: evt.carb,
        protein: evt.protein,
        count: evt.count,
        id: this.props.food.id
      });
    });
  }

  increaseCount = () => {
      console.log("increaseCount")
    this.setState({ count: this.state.count + 1 }, () => {
      this.updateCount();
    });
    // console.log(this.state.count + 1);
  };

  decreaseCount = () => {
      console.log("decreaseCount")
    this.setState({ count: this.state.count - 1 }, () => {
      this.updateCount();
    });
    // console.log(this.state.count - 1);
    if (Number(this.state.count < 1)) {
      this.setState({ count: 0 });
    }
  };

  clickParent = () => {
    if (this.props.action === "add") {
      this.increaseCount()
    } else if (this.props.action === "remove") {
      this.decreaseCount()
    } else if (this.props.action === "delete") {
      this.props.deleteFood(this.props.food.id)
      this.props.history.push("/foods");
    }
    // this.props.makeMacrosArrs()
  };

//   grandparentOfClicks = () => {
//       this.clickParent().then(() => {this.props.makeMacrosArrs()} )
//   }
//   clickParent = () => {
//     if (this.props.action === "add") {
//       this.increaseCount().then(() => {
//         this.props.makeMacrosArrs();
//       });
//     } else if (this.props.action === "remove") {
//       this.decreaseCount().then(() => {
//         this.props.makeMacrosArrs();
//       });
//     } else if (this.props.action === "delete") {
//       this.props.deleteFood(this.props.food.id).then(() => {
//         this.props.makeMacrosArrs();
//       });
//       this.props.history.push("/foods");
//     }
//   };
  changeParent = () => {
    this.handleFieldChange();
    this.updateCount();
  };

  render() {
    return (
      <div>
        <div key={this.props.food.id} className="card bg-light w-auto">
          <button variant="primary" onClick={this.clickParent}>
            {this.props.food.name}
            <br />
            <Badge variant="light" onChange={this.changeParent}>
              {this.state.count}
            </Badge>
          </button>
        </div>
      </div>
    );
  }
}
