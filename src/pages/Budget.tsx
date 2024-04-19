import React, { useState } from "react";

const Budget = ({ data, setData }) => {
  return (
    <div className="flex justify-center space-x-4">
      <button
        className={`px-6 py-3 rounded-md text-white font-medium ${
          data.budget === "$"
            ? "bg-green-700 shadow-lg"
            : "bg-gray-400 hover:bg-green-700"
        }`}
        onClick={() => setData({ ...data, budget: "$" })}
      >
        $
      </button>
      <button
        className={`px-6 py-3 rounded-md text-white font-medium ${
          data.budget === "$$"
            ? "bg-green-700 shadow-lg"
            : "bg-gray-400 hover:bg-green-700"
        }`}
        onClick={() => setData({ ...data, budget: "$$" })}
      >
        $$
      </button>
      <button
        className={`px-6 py-3 rounded-md text-white font-medium ${
          data.budget === "$$$"
            ? "bg-green-700 shadow-lg"
            : "bg-gray-400 hover:bg-green-700"
        }`}
        onClick={() => setData({ ...data, budget: "$$$" })}
      >
        $$$
      </button>
    </div>
  );
};

export default Budget;