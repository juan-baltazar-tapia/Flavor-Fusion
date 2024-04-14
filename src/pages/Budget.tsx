import React, { useState } from 'react';
import './Button.css';

const Budget = ({data, setData}) => {

  const handleSubmit = () => {
    console.log("data", data)
  }

  return (
    <div className="button-group">
        <button onClick={handleSubmit}> See Data</button>
      <button
        className={data.budget === '$' ? 'selected' : ''}
        onClick={() => setData({...data, budget: "$"})}
      >
        $
      </button>
      <button
        className={data.budget === '$$'  ? 'selected' : ''}
        onClick={() => setData({...data, budget: "$$"})}
      >
        $$
      </button>
      <button
        className={data.budget === '$$$'  ? 'selected' : ''}
        onClick={() => setData({...data, budget: "$$$"})}
      >
        $$$
      </button>
    </div>
  );
};

export default Budget;