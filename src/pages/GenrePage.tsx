import React, { useState } from "react";
import info from "../data.json";

const GenrePage = ({ data, setData }) => {
  const [musicSelected, setMusicSelected] = useState(false);
  const events = info.events;
  const genres = info.genres;

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
    <div className="container mx-auto">
      <div className="grid grid-cols-4 gap-4">
        {genres.map((genre, i) => {
          const isSelected = data.genres.includes(genre);
          return (
            <button
              key={i}
              onClick={() => handleGenreClick(genre)}
              className={`px-6 py-3 rounded-md text-white font-medium ${
                isSelected
                  ? "bg-indigo-600 shadow-lg"
                  : "bg-gray-400 hover:bg-indigo-600"
              }`}
            >
              {genre}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default GenrePage;
