import React, { Component } from "react";
import ReportCard from "../components/reports/ReportCard";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default class Export extends Component {
  printDocument() {
    const input = document.getElementById("divToPrint");
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(
        imgData,
        "JPEG",
        -45,
        5,
        300,
        Number(document.getElementById("divToPrint").style.height)
      );
      // pdf.output('dataurlnewwindow');
      pdf.save("download.pdf");
    });
  }

  render() {
    return (
      <div>
        <div className="mb5">
          <button onClick={this.printDocument}>Download</button>
        </div>
        <div
          id="divToPrint"
          className="mt4"
          backgroundcolor="#f5f5f5"
          width="21mm"
          minheight="29.7mm"
          marginleft="auto"
          marginright="auto"
        >
          <div>
            <ReportCard
              {...this.props}
              filteredFoods={this.props.filteredFoods}
            />
          </div>
        </div>
      </div>
    );
  }
}
