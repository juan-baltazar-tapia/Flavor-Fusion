import React, { useState } from "react";

const FoodPage = ({ data, setData }) => {
  const culturalFoods = [
    "Mexican",
    "Japanese",
    "Italian",
    "Chinese",
    "Indian",
    "Thai",
    "Greek",
    "French",
    "Spanish",
    "Lebanese",
    "Korean",
    "Vietnamese",
    "Moroccan",
    "Turkish",
    "Ethiopian",
    "Peruvian",
    "Jamaican",
    "German",
    "Russian",
    "Indonesian",
  ];

  const handleClick = (item: string) => {
    if (data.food.includes(item)) {
      setData({
        ...data,
        food: data.food.filter((food: string) => food !== item),
      });
    } else {
      setData({
        ...data,
        food: [...data.food, item],
      });
    }
  };

  const handleSubmit = () => {
    console.log("DATA", data);
  };

  return (
    <div className="container">
      <button onClick={handleSubmit}>Check Data</button>

      {culturalFoods.map((item, i) => {
        const isSelected = data.food.includes(item);
        return (
          <button
            key={i}
            onClick={() => handleClick(item)}
            style={{
              backgroundColor: isSelected ? "lightblue" : "white",
            }}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
};

export default FoodPage;
