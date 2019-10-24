import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Export from "../Export";

export default class ReportList extends Component {
  render() {
    return (
      <div>
        <Export {...this.props} filteredFoods={this.props.filteredFoods} />
      </div>
    );
  }
}
