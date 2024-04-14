import React from "react";
import { useState } from "react";
import LocationPage from "./LocationPage";
import DatePage from "./DatePage";
import EatOrLocalPage from "./EatOrLocalPage";
import FoodPage from "./FoodPage";
import EventPage from "./EventPage";
import DayOverview from "./DayOverview";
import DatePicker from "react-datepicker";

const Form = () => {
  const [page, setPage] = useState(0);
  const formTitles = [
    "Where are you located?",
    "What day are you planning for?",
    "What would you like to do?",
    "Select your food preferences",
    "Choose events that interest you",
  ];
  const [data, setData] = useState({ 
    fullAddress: '',
    city: '',
    state:'',
    date: '',
    goEat: false,
    localEvents: false,
    preferences: [],
    events: {}
  })
  const displayPage = () => {
    switch (page) {
      case 0:
        return <LocationPage data={data} setData={setData}/>;
      case 1:
        return <DatePage data={data} setData={setData}/>;
      case 2:
        return <EatOrLocalPage data={data} setData={setData}/>;
      case 3:
        return <FoodPage data={data} setData={setData}/>;
      case 4:
        return <EventPage data={data} setData={setData}/>;
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
        <div className="body">
            {displayPage()}
        </div>
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
