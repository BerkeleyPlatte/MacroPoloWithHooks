import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";

export default class ReportCard extends Component {
  render() {
    let todaysDate = `${new Date().getMonth() +
      1}/${new Date().getDate()}/${new Date().getFullYear()}`;
    let totalFat = Number(localStorage.getItem("fatSoFar")).toFixed(1);
    let totalCarb = Number(localStorage.getItem("carbSoFar")).toFixed(1);
    let totalProtein = Number(localStorage.getItem("proteinSoFar")).toFixed(1);
    return (
      <>
        <div className="table" id="divToPrint">
          <Table striped bordered hover size="sm">
            <caption>{todaysDate}</caption>
            <thead>
              <tr>
                <th>Foods</th>
                <th>Fat</th>
                <th>Carbs</th>
                <th>Protein</th>
                <th>Calories</th>
              </tr>
            </thead>
            <tbody>
              {this.props.filteredFoods.map(food => {
                return (
                  <tr key={food.id}>
                    <td>{`${food.name} x ${food.count}`}</td>
                    <td>{(food.fat * food.count).toFixed(1)}</td>
                    <td>{(food.carb * food.count).toFixed(1)}</td>
                    <td>{(food.protein * food.count).toFixed(1)}</td>
                    <td>
                      {(
                        food.fat * food.count * 9 +
                        food.carb * food.count * 4 +
                        food.protein * food.count * 4
                      ).toFixed(1)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <th>Totals</th>
                <th>{totalFat}</th>
                <th>{totalCarb}</th>
                <th>{totalProtein}</th>
                <th>{(totalFat * 9 + totalCarb * 4 + totalProtein * 4).toFixed(1)}</th>
              </tr>
            </tfoot>
          </Table>
        </div>
      </>
    );
  }
}
