import React from "react";
import { useState } from "react";
import LocationPage from "./LocationPage";
import DatePage from "./DatePage";
import FoodPage from "./FoodPage";
import EventPage from "./EventPage";
import Budget from "./Budget";
import DayOverview from "./DayOverview";

const Form = () => {
  const [page, setPage] = useState(5);
  const formTitles = [
    "Where are you located?",
    "What day are you planning for?",
    "What is your budget?",
    "Select your food preferences",
    "Choose events that interest you",
  ];
  const [data, setData] = useState({
    location: "Willimantic CT",
    lat: '41.715839',
    lon: '-72.221840',
    date: "01-14-200",
    budget: "$$",
    food: ["mexican",'italian'],
    events: ['food','music'],
    genres: ['electronic','rock'],
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
      case 5:
        return <DayOverview data={data} />;
    }
  };

  const allFieldsFull = () => {
    if (
      data.location !== "" &&
      data.date !== "" &&
      data.budget !== "" &&
      data.food.length > 0 &&
      data.events.length > 0
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
          {page !== 5 && (
            <button
              disabled={page == 0}
              onClick={() => {
                setPage((currPage) => currPage - 1);
              }}
            >
              Previous
            </button>
          )}
          {page !== 5 && (
            <button
              onClick={() => {
                if (page === 4 && allFieldsFull()) {
                  alert("From Submitted");
                  setPage((currPage) => currPage + 1);
                } else if (page === 4 && !allFieldsFull()) {
                  alert("Please fill out all inputs");
                } else {
                  setPage((currPage) => currPage + 1);
                }
              }}
            >
              {page === 4 ? "Submit" : "Next"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;
