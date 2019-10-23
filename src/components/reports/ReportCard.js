import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";

export default class ReportCard extends Component {
  render() {
    let d = new Date();
    let totalFat = Number(localStorage.getItem("fatSoFar"));
    let totalCarb = Number(localStorage.getItem("carbSoFar"));
    let totalProtein = Number(localStorage.getItem("proteinSoFar"));
    return (
      <>
        <div className="table">
          <Table striped bordered hover size="sm">
              <caption>{d.getDate()}</caption>
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
                    <td>{food.fat * food.count}</td>
                    <td>{food.carb * food.count}</td>
                    <td>{food.protein * food.count}</td>
                    <td>
                      {food.fat * food.count * 9 +
                        food.carb * food.count * 4 +
                        food.protein * food.count * 4}
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
                <th>{totalFat * 9 + totalCarb * 4 + totalProtein * 4}</th>
              </tr>
            </tfoot>
          </Table>
        </div>
      </>
    );
  }
}
