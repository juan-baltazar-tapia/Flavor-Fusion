import React from "react";
import { useState } from "react";
import LocationPage from "./LocationPage";
import DatePage from "./DatePage";
import FoodPage from "./FoodPage";
import GenrePage from "./GenrePage";
import Budget from "./Budget";
import DayOverview from "./DayOverview";
import Test from "./test.jsx";

const Form = () => {
  const [page, setPage] = useState(0);
  const formTitles = [
    "Which location are you exploring?",
    "What is your budget?",
    "Select your food preferences",
    "Which genres interest you?",
  ];
  const [data, setData] = useState({
    location: "",
    lat: "",
    lon: "",
    budget: "",
    food: [],
    events: [],
    genres: [],
  });
  const displayPage = () => {
    switch (page) {
      case 0:
        return <LocationPage data={data} setData={setData} />;
      case 1:
        return <Budget data={data} setData={setData} />;
      case 2:
        return <FoodPage data={data} setData={setData} />;
      case 3:
        return <GenrePage data={data} setData={setData} />;
      case 4:
        return <DayOverview data={data} setData={setData} />;
      default:
        return;
    }
  };

  const allFieldsFull = () => {
    if (
      data.location !== "" &&
      data.budget !== "" &&
      data.food.length > 0 &&
      data.genres.length > 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="form">
      <div className="progress-bar"></div>
      <div className="form-container">
        <div className="header">
          <h1>{formTitles[page]}</h1>
        </div>
        <div className="body">{displayPage()}</div>
        <div className="footer">
          {page !== 4 && (
            <button
              disabled={page == 0}
              onClick={() => {
                setPage((currPage) => currPage - 1);
              }}
            >
              Previous
            </button>
          )}
          {page !== 4 && (
            <button
              onClick={() => {
                if (page === 3 && allFieldsFull()) {
                  alert("From Submitted");
                  setPage((currPage) => currPage + 1);
                } else if (page === 3 && !allFieldsFull()) {
                  alert("Please fill out all inputs");
                } else {
                  setPage((currPage) => currPage + 1);
                }
              }}
            >
              {page === 3 ? "Submit" : "Next"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;
