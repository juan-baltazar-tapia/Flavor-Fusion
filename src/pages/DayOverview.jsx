import React, { useEffect, useState } from "react";
const apiKey = import.meta.env.VITE_YELP_API_KEY;

const YELP_API_KEY = import.meta.env.VITE_YELP_API_KEY;
// work around the CORS issue
const url =
  "https://corsproxy.io/?" +
  encodeURIComponent(
    "https://api.yelp.com/v3/businesses/search?term=food&location=350 5th Ave, New York, NY 10118"
  );
const DayOverview = ({data}) => {
//   useEffect(() => {
//     const makeYelpRequest = async () => {
//       const options = {
//         headers: {
//           Authorization: `Bearer ${apiKey}`,
//         },
//       };

//       fetch(url, options)
//         .then((response) => response.json())
//         .then((data) => {
//           // Process the response data
//           console.log(data);
//         })
//         .catch((error) => {
//           // Handle any errors
//           console.error("Error:", error);
//         });
//     };

  //   makeYelpRequest();
  // }, []);
  const makeURL = () => {
    const base = "https://api.yelp.com/v3/businesses/search?term=food&"
    const location = `locaton=${data.location}`
    const food = ``
    const budget = ``
    
  }

  return <div></div>;
};

export default DayOverview;
