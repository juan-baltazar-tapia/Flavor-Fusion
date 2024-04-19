import React, { useState } from "react";
import info from "../data.json";

const FoodPage = ({ data, setData }) => {
  const culturalFoods = info.culturalFoods;

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
    <div className="container mx-auto">
      <div className="grid grid-cols-5 gap-4">
        {culturalFoods.map((item, i) => {
          const isSelected = data.food.includes(item);
          return (
            <button
              key={i}
              onClick={() => handleClick(item)}
              className={`px-6 py-3 rounded-md text-white font-medium ${
                isSelected
                  ? "bg-indigo-600 shadow-lg"
                  : "bg-gray-400 hover:bg-indigo-600"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FoodPage;
