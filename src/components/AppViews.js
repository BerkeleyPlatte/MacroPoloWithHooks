import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import FoodList from "./foods/FoodList";
import { withRouter } from "react-router";
import DataManager from "../module/DataManager";
import Login from "./auth/Login";
import Register from "./auth/Register";
// import FoodEditForm from "./foods/FoodEditForm";
import FoodForm from "./foods/FoodForm";

class AppViews extends Component {
  isAuthenticated = () => sessionStorage.getItem("userId") !== null;

  state = {
    foods: [],
    users: [],
    fatSoFar: 0,
    carbSoFar: 0,
    proteinSoFar: 0
  };

  revertUserCounts = () => {
    return DataManager.getSorted("foods", sessionStorage.getItem("userId"))
      .then(foods => {
        let newFoodsArr = foods.map(food => {
          // console.log("beforeRevert", this.food.count)
          food.count = 0;
          // console.log("afterRevert", this.food.count)
          return this.updateFood(food);
        });
        console.log("newfoodsarr", newFoodsArr)
        return Promise.all(newFoodsArr);
      })
      .then(() => DataManager.getAll("foods"))
      .then(foods => {
        this.setState({ foods: foods });
        // this.props.Phistory.push("/foods")
      })
      .then(() => console.log(this.state.foods))
      .then(() => this.makeMacrosArrs());
  };

  makeMacrosArrs = () => {
    // console.log("makeMacrosArrs");
    let fatCount = [];
    let carbCount = [];
    let proteinCount = [];
    return DataManager.getSorted(
      "foods",
      sessionStorage.getItem("userId")
    ).then(foods => {
      foods.forEach(food => {
        // console.log("makeMacrosArrs", this.food.count);
        fatCount.push(food.fat * food.count);
        carbCount.push(food.carb * food.count);
        proteinCount.push(food.protein * food.count);
        // console.log(fatCount);
      });
      let fatSum = fatCount.reduce((curr, next) => curr + next, 0);
      let carbSum = carbCount.reduce((curr, next) => curr + next, 0);
      let proteinSum = proteinCount.reduce((curr, next) => curr + next, 0);
      localStorage.setItem("fatSoFar", fatSum);
      localStorage.setItem("carbSoFar", carbSum);
      localStorage.setItem("proteinSoFar", proteinSum);
      this.setState({
        fatSoFar: fatSum,
        carbSoFar: carbSum,
        proteinSoFar: proteinSum
      });
      //   console.log(this.state.fatSoFar);
    });
  };

  componentDidMount() {
    // console.log("appViewsDidMount");
    // this.makeMacrosArrs();
    // console.log("comp did mount");
    const newState = {};

    DataManager.getAll("users")
      .then(users => (newState.users = users))
      .then(() => DataManager.getAll("foods"))
      .then(foods => {
        newState.foods = foods;
        this.setState(newState);
      });
  }

  addUser = user => {
    return DataManager.post(user, "users")
      .then(() => DataManager.getAll("users"))
      .then(users =>
        this.setState({
          users: users
        })
      );
  };

  deleteFood = id => {
    return DataManager.delete("foods", id)
      .then(() => DataManager.getAll("foods"))
      .then(foods => {
        this.setState({
          foods: foods
        });
      });
  };

  addFood = food => {
    return DataManager.post(food, "foods")
      .then(() => DataManager.getAll("foods"))

      .then(foods =>
        this.setState({
          foods: foods
        })
      );
  };

  updateFood = changedFood => {
    return DataManager.put(changedFood, "foods")
      .then(() => DataManager.getAll("foods"))

      .then(foods =>
        this.setState({
          foods: foods
        })
      );
  };

  updateUser = changedUser => {
    return DataManager.put(changedUser, "users")
      .then(() => DataManager.getAll("users"))

      .then(users =>
        this.setState({
          users: users
        })
      );
  };

  patchFood = patchedFood => {
    return DataManager.patch(patchedFood, "foods")
      .then(() => DataManager.getAll("foods"))

      .then(foods =>
        this.setState({
          foods: foods
        })
      );
  };

  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path="/"
          render={props => {
            return <Login makeMacrosArrs={this.makeMacrosArrs} {...props} />;
          }}
        />

        <Route
          exact
          path="/register"
          render={props => {
            return <Register {...props} addUser={this.addUser} />;
          }}
        />

        <Route
          exact
          path="/foods"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <FoodList
                  {...props}
                  foods={this.state.foods}
                  deleteFood={this.deleteFood}
                  makeMacrosArrs={this.makeMacrosArrs}
                  updateFood={this.updateFood}
                  fatSoFar={this.state.fatSoFar}
                  carbSoFar={this.state.carbSoFar}
                  proteinSoFar={this.state.proteinSoFar}
                  users={this.state.users}
                  updateUser={this.updateUser}
                  revertUserCounts={this.revertUserCounts}
                />
              );
            } else {
              return <Redirect to="/" />;
            }
          }}
        />

        <Route
          exact
          path="/foods/new"
          render={props => {
            return (
              <FoodForm
                {...props}
                foods={this.state.foods}
                addFood={this.addFood}
              />
            );
          }}
        />
        {/* <Route
          path="/foods/:foodId(\d+)/edit"
          render={props => {
            return (
              <FoodEditForm
                {...props}
                foods={this.state.foods}
                updateFood={this.updateFood}
              />
            );
          }}
        /> */}
{/* 
        <Route
          exact
          path="/foods"
          render={props => {
            if (this.isAuthenticated()) {
              return null;
            } else {
              return <Redirect to="/" />;
            }
          }}
        /> */}
      </React.Fragment>
    );
  }
}

export default withRouter(AppViews);
