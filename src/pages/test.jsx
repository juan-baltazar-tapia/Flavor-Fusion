import React, { useEffect } from "react";
import { useState } from "react";

const Test = () => {
  const [restaurants, setRestaurants] = useState([
    { id: "123" },
    { id: "234e" },
    { id: "345me" },
    { id: "456me" },
    { id: "567me" },
  ]);

  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const randomInteger = (length) => {
    return Math.floor(Math.random() * length );
  };
  const selectRandomRestaurants = () => {
    const mySet = new Set([]);
    let randomInt = randomInteger(restaurants.length);
    while (!mySet.has(randomInt) && mySet.size < 4) {
      mySet.add(randomInt);
      randomInt = randomInteger(restaurants.length);
    }
    for (const index of mySet) {
      console.log("index", index);
      console.log("RESTAURANT TO ADD", restaurants[index]);
    
    }
    const selectedRestaurants = Array.from(mySet)
    //.map(index => restaurants[index]);
    console.log("sel res", selectedRestaurants)
    // console.log("mySet", mySet.size)
    // for (const index of mySet) {
    //   console.log("index", index);
    // }
    console.log("Filtered Restaurants", filteredRestaurants);
  };

  useEffect(() => {
    selectRandomRestaurants();

  },[])



  return <div>test</div>;
};

export default Test;
