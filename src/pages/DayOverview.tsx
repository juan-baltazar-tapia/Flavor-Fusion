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

  useEffect(() => {
    const makeRequest = async () => {
      const options = {
        headers: {
          Authorization: `Bearer ${YELP_API_KEY}`,
        },
      };
      const response = await fetch(makeYelpURL(), options);
      const data = await response.json();
      if (data.businesses.length > 5) {
        setRestaurants(selectTopFiveRestuarants(data.businesses));
      } else {
        setRestaurants(data.businesses);
      }

      console.log("restaurants data", data.businesses);
    };

    const makeSeatGeekRequest = async () => {
      const response = await fetch(makeSeatGeekURL());
      const data = await response.json();
      if (data.events.length > 3) {
        console.log("RAN IF STATEMTN")
        setConcerts(selectTopThreeEvents(data.events));
      } else {
        setConcerts(data.events);
      }

      console.log("SEAK GEEK data: ", data.events);
    };

    makeSeatGeekRequest();
    makeRequest();
  }, []);

  const selectTopFiveRestuarants = (arr) => {
    const selectedRestaurants = [];
    const randomIndices = new Set();

    while (selectedRestaurants.length < 5) {
      const randomIndex = Math.floor(Math.random() * arr.length);

      if (!randomIndices.has(randomIndex)) {
        randomIndices.add(randomIndex);
        selectedRestaurants.push(arr[randomIndex]);
      }
    }

    return selectedRestaurants;
  };

  const selectTopThreeEvents = (arr) => {
    const selectedEvents = [];
    const randomIndices = new Set();

    while (selectedEvents.length < 3) {
      const randomIndex = Math.floor(Math.random() * arr.length);

      if (!randomIndices.has(randomIndex)) {
        randomIndices.add(randomIndex);
        selectedEvents.push(arr[randomIndex]);
      }
    }
    console.log("LENGTH", selectedEvents.length)
    return selectedEvents;
  };

  const makeYelpURL = () => {
    const base =
      "https://corsproxy.io/?https://api.yelp.com/v3/businesses/search?term=food&";

    const location = `location=${data.location.replace(" ", "")}&`;
    const food = `categories=${makeCategoriesString(data.food)}&`;
    const budget = `price=${makeBudgetString(data.budget)}&`;

    const sort_by = `best_match`;

    const fullURL = base + location + food + budget + sort_by;
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
    const lat = `&lat=${data.lat}`;
    const lon = `&lon=${data.lon}`;
    const fullURL = `${base}${genres}${lat}${lon}&client_id=${SEAK_GEEK_API_KEY}`;

    return fullURL;
  };


  return (
    <div>

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
