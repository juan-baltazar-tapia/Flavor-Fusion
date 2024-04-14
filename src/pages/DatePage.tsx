import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const DatePage = ({data,setData}) => {
  const [startDate, setStartDate] = useState(new Date());

  const handleClick = () => {
    //console.log("DATA", data)
    console.log("DATA", data);
  };

  const handleDateSelect = () => {
    const currDate = startDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setData({ ...data, date: currDate });
  };

  return (
    <div className="container">
      <button onClick={handleClick}>Get Data</button>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        onSelect={handleDateSelect}
      />
    </div>
  );
};

export default DatePage;
