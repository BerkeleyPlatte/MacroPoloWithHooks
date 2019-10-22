import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ReportList = () => {
  const [foods, setFoods] = useState([]);
  const abortController = new AbortController([]);
  const signal = abortController.signal;

  const getFoods = () => {
    fetch(
      `http://localhost:5001/foods?userId=${sessionStorage.getItem("userId")}`,
      {
        method: "GET",
        header: "application/json",
        signal: signal
      }
    )
      .then(response => response.json())
      .then(food => {
        setFoods(food);
      });
    return function cleanup() {
      abortController.abort([]);
    };
  };

  useEffect(getFoods(), []);

  return (
    <>
      <section>
        {/* {console.log(foods.filter(food => food.count > 0))} */}
        <p>hey</p>
      </section>
    </>
  );
};

export default ReportList;
