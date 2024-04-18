import React from "react";
import { Outlet, Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="parent-container">
      <h2>
        Welcome to Flavor Fusion, an application that recommends food options
        and music venues based on your preferences, budget, and location!
      </h2>
      <Link to="/form">
        <button>Get Started</button>

      </Link>
    </div>
  );
};

export default HomePage;
