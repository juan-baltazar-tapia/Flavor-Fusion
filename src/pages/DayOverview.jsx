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
  let miles = 35;
  useEffect(() => {
    const makeYelpRequest = async () => {
      const options = {
        headers: {
          Authorization: `Bearer ${YELP_API_KEY}`,
        },
      };

      fetch(makeYelpURL(), options)
        .then((response) => response.json())
        .then((data) => {
          // Process the response data
          console.log(data);
        })
        .catch((error) => {
          // Handle any errors
          console.error("Error:", error);
        });
    };

    const makeSeatGeekRequest = async () => {
      fetch(makeSeatGeekURL())
        .then((response) => response.json())
        .then((data) => {
          //process this data
          console.log("SEAK GEEK", data);
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    };
    // makeYelpRequest();
    // makeSeatGeekRequest();
  }, []);
  const makeYelpURL = () => {
    const base =
      "https://corsproxy.io/?https://api.yelp.com/v3/businesses/search?term=food&";
    const location = `location=${data.location}&`;
    const food = `categories=${makeCategoriesString(data.food)}&`;
    const budget = `price=${makeBudgetString(data.budget)}`;

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
    const base = "https://api.seatgeek.com/2/events?genres[primary].slug=";
    const genres = `${makeCategoriesString(data.genres)}`;
    const range = `&range=${miles}mi`;
    const lat = `&lat=${data.lat}`;
    const lon = `&lon=${data.lon}`;
    const fullURL = `${base}${genres}${range}${lat}${lon}&client_id=${SEAK_GEEK_API_KEY}`;
    console.log(fullURL);
    return fullURL;
  };

  return <div></div>;
};

export default DayOverview;
