import React from "react";
import { Outlet, Link } from "react-router-dom";

const HomePage = () => {
  
  return (
    <div className="parent-container">
      <h2>Take the decision-making out of your day, and go on a adventure</h2>
      <Link to="/form">
        <button>Get Started</button>
      </Link>
    </div>
  );
};

export default HomePage;
