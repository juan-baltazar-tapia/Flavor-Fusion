import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  DirectionsService,
  DirectionsRenderer,
  
} from "@react-google-maps/api";
const SEAK_GEEK_API_KEY = import.meta.env.VITE_SEAK_GEEK_API_KEY;
const YELP_API_KEY = import.meta.env.VITE_YELP_API_KEY;
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
// work around the CORS issue
// const url =
//   "https://corsproxy.io/?" +
//   encodeURIComponent(
//     "https://api.yelp.com/v3/businesses/search?term=food&location=350 5th Ave, New York, NY 10118"
//   );
const DayOverview = ({ userData }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [concerts, setConcerts] = useState([]);
  const [directions, setDirections] = useState(null);
  const [userLocation, setUserLocation] = useState({
    lat: parseFloat(userData.lat),
    lng: parseFloat(userData.lon)
  });
  const [currLocation, setCurrLocation] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: `${GOOGLE_API_KEY}`,
  });

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
      console.log("USER DATA", userData);
    };

    const makeSeatGeekRequest = async () => {
      const response = await fetch(makeSeatGeekURL());
      const data = await response.json();
      if (data.events.length > 3) {
        setConcerts(selectTopThreeEvents(data.events));
      } else {
        setConcerts(data.events);
      }

      console.log("SEAK GEEK data: ", data.events);
    };

    makeSeatGeekRequest();
    makeRequest();
    //handleUserLocation();
  }, []);

  // const handleUserLocation = () => {
  //   setUserLocation({
  //     lat: parseFloat(userData.lat),
  //     lng: parseFloat(userData.lon),
  //   });
  // };

  const handleCurrLocation = (coordinates, type) => {
    if (type === "restaurant") {
      setCurrLocation({
        lat: coordinates.latitude,
        lng: coordinates.longitude,
      });
    } else {
      setCurrLocation({ lat: coordinates.lat, lng: coordinates.lon });
    }
  };

  const handleDirections = (response) => {
    if (response !== null) {
      setDirections(response);
    }
  };

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

    return selectedEvents;
  };

  const makeYelpURL = () => {
    const base =
      "https://corsproxy.io/?https://api.yelp.com/v3/businesses/search?term=food&";

    const location = `location=${userData.location.replace(" ", "")}&`;
    const food = `categories=${makeCategoriesString(userData.food)}&`;
    const budget = `price=${makeBudgetString(userData.budget)}&`;

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
    console.log("DEBUG", userData.genres);
    const genres = `${makeCategoriesString(userData.genres)}`;
    const lat = `&lat=${userData.lat}`;
    const lon = `&lon=${userData.lon}`;
    const fullURL = `${base}${genres}${lat}${lon}&client_id=${SEAK_GEEK_API_KEY}`;

    return fullURL;
  };

  return (
    <div>
      <h2>Recommended restaurants</h2>
      {restaurants ? (
        restaurants.map((item) => {
          return (
            <li
              onClick={() => handleCurrLocation(item.coordinates, "restaurant")}
              key={item.id}
            >
              {item.name}
            </li>
          );
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
          return (
            <li
              onClick={() => handleCurrLocation(item.venue.location, "concert")}
              key={item.id}
            >
              {item.title}
            </li>
          );
        })
      ) : (
        <div>Loading...</div>
      )}
     <div>

    {isLoaded && (
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={userLocation || { lat: 0, lng: 0 }}
        zoom={12}
      >
        {userLocation && <Marker position={userLocation} />}
        {/* {concerts.map((concert) => (
          <Marker
            key={concert.id}
            position={{ lat: concert.venue.location.lat, lng: concert.venue.location.lon }}
            
            
          />
        ))} */}
        {userLocation && currLocation && (
          <DirectionsService
            options={{
              destination: currLocation,
              origin: userLocation,
              travelMode: "DRIVING",
            }}
            callback={handleDirections}
          />
        )}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    )}
    {/* {selectedConcert && (
      <div>
        <h3>Selected Concert:</h3>
        <p>Name: {selectedConcert.name}</p>
        <p>Latitude: {selectedConcert.latitude}</p>
        <p>Longitude: {selectedConcert.longitude}</p>
      </div>
    )} */}
  </div>
    </div>
  );
};

export default DayOverview;
