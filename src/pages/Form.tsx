import React from "react";
import { useState } from "react";
import LocationPage from "./LocationPage";
import DatePage from "./DatePage";
import FoodPage from "./FoodPage";
import EventPage from "./EventPage";
import Budget from "./Budget";
import DayOverview from "./DayOverview";

const Form = () => {
  const [page, setPage] = useState(3);
  const formTitles = [
    "Where are you located?",
    "What day are you planning for?",
    "What is your budget?",
    "Select your food preferences",
    "Choose events that interest you",
  ];
  const [data, setData] = useState({
    fullAddress: "",
    city: "",
    state: "",
    date: "",
    budget: "",
    food: [],
    events: [],
  });
  const displayPage = () => {
    switch (page) {
      case 0:
        return <LocationPage data={data} setData={setData} />;
      case 1:
        return <DatePage data={data} setData={setData} />;
      case 2:
        return <Budget data={data} setData={setData} />;
      case 3:
        return <FoodPage data={data} setData={setData} />;
      case 4:
        return <EventPage data={data} setData={setData} />;

      default:
        alert("OH OH");
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
          <button
            disabled={page == 0}
            onClick={() => {
              setPage((currPage) => currPage - 1);
            }}
          >
            Previous
          </button>
          <button
            disabled={page == formTitles.length - 1}
            onClick={() => setPage((currPage) => currPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
