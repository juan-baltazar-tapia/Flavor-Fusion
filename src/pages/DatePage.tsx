import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface LocationData {
  fullAddress: string;
  city: string;
  state: string;
  date: string;
  goEat: boolean;
  localEvents: boolean;
  preferences: any[]; // Update the type based on your specific requirements
  events: any; // Update the type based on your specific requirements
}

const DatePage = ({
  data,
  setData,
}: {
  data: LocationData;
  setData: React.Dispatch<React.SetStateAction<LocationData>>;
}) => {
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
