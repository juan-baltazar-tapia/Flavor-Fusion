import React, { useEffect, useState } from "react";
const SEAK_GEEK_API_KEY = import.meta.env.VITE_SEAK_GEEK_API_KEY;
const YELP_API_KEY = import.meta.env.VITE_YELP_API_KEY;
// work around the CORS issue
// const url =
//   "https://corsproxy.io/?" +
//   encodeURIComponent(
//     "https://api.yelp.com/v3/businesses/search?term=food&location=350 5th Ave, New York, NY 10118"
//   );
const DayOverview = ({ data }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [concerts, setConcerts] = useState([]);
  const [selectedRestaurants, setSelectedRestaurants] = useState([
    {id:"123"},
    {id:"nam234e"},
    {id:"na345me"},
    {id:"na456me"},
    {id:"na567me"},
  ]);
  const [selectedConcerts, setSelectedConcerts] = useState([]);
  const [miles, setMiles] = useState(25);
  const [radius, setRadius] = useState(36000);
  console.log("data", data);

  useEffect(() => {
    const makeRequest = async () => {
      const options = {
        headers: {
          Authorization: `Bearer ${YELP_API_KEY}`,
        },
      };
      const response = await fetch(makeYelpURL(), options);
      const data = await response.json();
      setRestaurants(data.businesses);
      console.log("restaurants data", restaurants);
      //selectRandomRestaurants();

      //   fetch(makeYelpURL(), options)
      //     .then((response) => response.json())
      //     .then((data) => {
      //       // Process the response data
      //       setRestaurants(data.businesses);
      //       //   if (restaurants.length < 2) {
      //       //     setRadius((prevState) => prevState + 12000);
      //       //   }
      //          console.log("restaurants data: ", restaurants);
      //       //   console.log("Radius", radius);
      //     })
      //     .catch((error) => {
      //       // Handle any errors
      //       console.error("Error:", error);
      //     });
    };
    makeRequest();
  }, [radius]);

  useEffect(() => {
    const makeSeatGeekRequest = async () => {
      fetch(makeSeatGeekURL())
        .then((response) => response.json())
        .then((data) => {
          //process this data
          setConcerts(data.events);
          // I want atleast 2 results for concerts
          // if (concerts.length < 1) {
          //   setMiles((prevState) => prevState + 10);
          // }
          console.log("SEAK GEEK data: ", concerts);
          console.log("MILES", miles);
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    };
    makeSeatGeekRequest();
  }, [miles]);
  const makeYelpURL = () => {
    const base =
      "https://corsproxy.io/?https://api.yelp.com/v3/businesses/search?term=food&";

    const location = `location=${data.location.replace(" ", "")}&`;
    const food = `categories=${makeCategoriesString(data.food)}&`;
    const budget = `price=${makeBudgetString(data.budget)}`;

    //const urlRadius = `radius=${radius}`;
    //Suggestion to the search algorithm that the results be sorted by one of
    //the these modes: best_match, rating, review_count or distance.
    //The default is best_match. Note that specifying the sort_by is a suggestion
    //(not strictly enforced) to Yelp's search, which considers multiple
    //input parameters to return the most relevant results.
    const sort_by = ``;

    // open_at integer
    // An integer representing the Unix time in the timezone of the search location.
    // If specified, it will return businesses open at the given time.
    // Notice that open_at and open_now cannot be used together.
    const open_at = `open_at`;

    const fullURL = base + location + food + budget;
    return fullURL;
  };

  const makeCategoriesString = (arr) => {
    const string = arr.join(",");
    return string;
  };

  const makeBudgetString = (string) => {
    if (string === "$$$") {
      return "1,2,3";
    } else if (string === "$$") {
      return "1,2";
    } else {
      return "1";
    }
  };

  //makeURL();
  const makeSeatGeekURL = () => {
    const base = "https://api.seatgeek.com/2/events?genres.slug=";
    const genres = `${makeCategoriesString(data.genres)}`;
    const range = `&range=25mi`;
    const lat = `&lat=${data.lat}`;
    const lon = `&lon=${data.lon}`;
    const fullURL = `${base}${genres}${range}${lat}${lon}&client_id=${SEAK_GEEK_API_KEY}`;
    console.log(fullURL);
    return fullURL;
  };
  // 3 food 2 events
  const selectRandomRestaurants = () => {
    console.log("select rand rest run");
    const mySet = new Set([]);
    let randomInt = randomInteger(restaurants.length);
    while (!mySet.has(randomInt) && mySet.size < 4) {
      mySet.add(randomInt);
      randomInt = randomInteger(restaurants.length);
    }
    for (const index of mySet) {
      console.log("index", index);
      console.log("rest index", restaurants[index]);
      setSelectedRestaurants((prev) => [...prev, restaurants[index]]);
    }
    // console.log("mySet", mySet.size)
    // for (const index of mySet) {
    //   console.log("index", index);
    // }
    console.log("selected Rest", selectedRestaurants);
  };

  const selectRandomEvents = () => {};

  const randomInteger = (length) => {
    return Math.floor(Math.random() * length + 1);
  };

  return (
    <div>
      <h1>Heres an overview of the info</h1>
      <p>{data.location}</p>
      <p>{data.lat}</p>
      <p>{data.lon}</p>
      <p>{data.budget}</p>
      <div>
        <ul>
          {restaurants &&
            data.food.map((item) => {
              return <li key={item.id}>{item}</li>;
            })}
        </ul>
      </div>
      <div>
        <ul>
          {data.genres.map((item) => {
            return <li key={item}>{item}</li>;
          })}
        </ul>
      </div>
      <h2>Recommended restaurants</h2>
      {restaurants ? (
        restaurants.map((item) => {
          return <li key={item.id}>{item.name}</li>;
        })
      ) : (
        <div>
          <h2>Loading</h2>
          Loading...
        </div>
      )}
      <h2>Recommended music events</h2>
      {concerts ? (
        concerts.map((item) => {
          return <li key={item}>{item.title}</li>;
        })
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default DayOverview;
