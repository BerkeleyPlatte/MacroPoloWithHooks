import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReportCard from "./ReportCard"

export default class ReportList extends Component {
  render() {
    return (
      <div>
        <ReportCard
          key={Number(sessionStorage.getItem("userId"))}
          {...this.props}
          filteredFoods={this.props.filteredFoods}
        />
      </div>
    );
  }
}
