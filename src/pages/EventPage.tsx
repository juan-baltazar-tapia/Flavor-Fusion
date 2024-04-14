import React from "react";


const EventPage = ({ data, setData }) => {
  const events = [
    "Music festivals",
    "Food and wine festivals",
    "Art exhibitions",
    "Farmers markets",
    "Sports tournaments",
    "Cultural celebrations",
    "Parades",
    "Carnival or fairs",
    "Theater performances",
    "Comedy shows",
    "Outdoor movie screenings",
    "Holiday markets",
    "Fireworks displays",
    "Car shows",
    "Craft fairs",
    "Beer or wine tastings",
    "Historical reenactments",
    "Charity events or fundraisers",
    "Fitness or wellness events",
    "Technology or innovation expos",
  ];

  const handleSubmit = () => {
    console.log("DATA", data);
  };

  const handleClick = (event: string) => {
    if (data.events.includes(event)) {
      setData({
        ...data,
        events: data.events.filter((currEvent: string) => currEvent !== event),
      });
    } else {
      setData({
        ...data,
        events: [...data.events, event],
      });
    }
  };
  return (
    <div className="container">
      <button onClick={handleSubmit}>Check Data</button>
      {events.map((event, i) => {
        const isSelected = data.events.includes(event);
        return (
          <button
            key={i}
            onClick={() => handleClick(event)}
            style={{
              backgroundColor: isSelected ? "lightblue" : "white",
            }}
          >
            {event}
          </button>
        );
      })}
    </div>
  );
};

export default EventPage;
