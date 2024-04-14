import React, { useState } from "react";
import info from "../data.json";

const EventPage = ({ data, setData }) => {
  const [musicSelected, setMusicSelected] = useState(false);
  const events = info.events;
  const genres = info.genres;

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

    if (event === "Music" && !data.events.includes(event)) {
      setMusicSelected(true);
    } else if (event === "Music" && data.events.includes(event)) {
      setMusicSelected(false);
    } else {
      return;
    }
  };

  const handleGenreClick = (genre: string) => {
    if (data.genres.includes(genre)) {
      setData({
        ...data,
        genres: data.genres.filter((currGenre: string) => currGenre != genre),
      });
    } else {
      setData({
        ...data,
        genres: [...data.genres, genre],
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
      {musicSelected ? (
        genres.map((genre, i) => {
          const isSelected = data.genres.includes(genre);
          return (
            <button
              key={i}
              onClick={() => handleGenreClick(genre)}
              style={{
                backgroundColor: isSelected ? "lightblue" : "white",
              }}
            >
              {genre}
            </button>
          );
        })
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default EventPage;
