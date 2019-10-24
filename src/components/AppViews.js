import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import FoodList from "./foods/FoodList";
import { withRouter } from "react-router";
import DataManager from "../module/DataManager";
import Login from "./auth/Login";
import Register from "./auth/Register";
import FoodEditForm from "./foods/FoodEditForm";
import FoodForm from "./foods/FoodForm";
import ReportList from "./reports/ReportList";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// AppViews is the parent
class AppViews extends Component {
  isAuthenticated = () => sessionStorage.getItem("userId") !== null;

  state = {
    foods: [],
    users: [],
    eatenFoods: [],
    filteredFoods: [],
    fatSoFar: 0,
    carbSoFar: 0,
    proteinSoFar: 0,
    show: false
  };

  revertUserCounts = () => {
    return DataManager.getSorted("foods", sessionStorage.getItem("userId"))
      .then(foods => {
        let newFoodsArr = foods.map(food => {
          food.count = 0;
          return this.updateFood(food);
        });
        return Promise.all(newFoodsArr);
      })
      .then(() => DataManager.getAll("foods"))
      .then(foods => {
        this.setState({ foods: foods });
      })
      .then(() => this.makeMacrosArrs());
  };

  makeMacrosArrs = () => {
    let fatCount = [];
    let carbCount = [];
    let proteinCount = [];
    return DataManager.getSorted(
      "foods",
      sessionStorage.getItem("userId")
    ).then(foods => {
      foods.forEach(food => {
        fatCount.push(food.fat * food.count);
        carbCount.push(food.carb * food.count);
        proteinCount.push(food.protein * food.count);
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
    });
  };

  handleShow = () => {
    this.setState({ show: true });
    console.log("handleShow called", this.state.show);
  };

  exampleAndShow = () => {
    console.log("exampleAndShow called");
    this.example();
    this.handleShow();
  };

  example = () => {
    console.log("example called");
    const handleClose = () => {
      this.setState({ show: false });
    };

    return (
      <>
        <Modal show={this.state.show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  getFilteredFoods = () => {
    console.log(this.state.show);
    return DataManager.getSorted("foods", sessionStorage.getItem("userId"))
      .then(foods => {
        let filteredFoods = foods.filter(food => food.count > 0);
        this.setState({ filteredFoods: filteredFoods });
      })
      .then(this.exampleAndShow());
  };


  componentDidMount() {
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

  addEatenFood = eatenFood => {
    return DataManager.post(eatenFood, "eatenFoods")
      .then(() => DataManager.getAll("eatenFoods"))

      .then(eatenFoods =>
        this.setState({
          eatenFoods: eatenFoods
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
                  addEatenFood={this.addEatenFood}
                  getFilteredFoods={this.getFilteredFoods}
                  filteredFoods={this.state.filteredFoods}
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
        <Route
          path="/foods/:foodId(\d+)/edit"
          render={props => {
            return (
              <FoodEditForm
                {...props}
                fatSoFar={this.state.fatSoFar}
                carbSoFar={this.state.carbSoFar}
                proteinSoFar={this.state.proteinSoFar}
                makeMacrosArrs={this.makeMacrosArrs}
                foods={this.state.foods}
                updateFood={this.updateFood}
              />
            );
          }}
        />
        {/* <Route
          path="/settings/:userId(\d+)/"
          render={props => {
            return (
              <SettingsForm
                {...props}
                fatSoFar={this.state.fatSoFar}
                carbSoFar={this.state.carbSoFar}
                proteinSoFar={this.state.proteinSoFar}
                makeMacrosArrs={this.makeMacrosArrs}
                users={this.state.users}
                updateUser={this.updateUser}
              />
            );
          }}
        /> */}

        <Route
          exact
          path="/reports"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <ReportList
                  {...props}
                  filteredFoods={this.state.filteredFoods}
                />
              );
            } else {
              return <Redirect to="/" />;
            }
          }}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(AppViews);
