import React, { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
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
  const [userLocation, setUserLocation] = useState({
    lat: parseFloat(userData.lat),
    lng: parseFloat(userData.lon),
  });
  const [currLocation, setCurrLocation] = useState("");

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

  const handleCurrLocation = (item, type) => {
    let location = "";
    if (type === "restaurant") {
      location = `${item.name}${item.location?.address1}${item.location.city}`;
      console.log("restaurant location", location);
    } else {
      location = `${item.venue.address}${item.venue.extended_address}`;
      console.log("concert location", location);
    }
    setCurrLocation(location);
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

  function Directions() {
    const map = useMap();
    const routesLibrary = useMapsLibrary("routes");
    const [directionsService, setDirectionsService] =
      useState<google.maps.DirectionsService>();
    const [directionsRenderer, setDirectionsRenderer] =
      useState<google.maps.DirectionsRenderer>();
    const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
    const [routeIndex, setRouteIndex] = useState(0);
    const selected = routes[routeIndex];
    const leg = selected?.legs[0];

    useEffect(() => {
      if (!routesLibrary || !map) {
        return;
      }
      setDirectionsService(new routesLibrary.DirectionsService());
      setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
    }, [routesLibrary, map, currLocation]);

    useEffect(() => {
      if (!directionsRenderer || !directionsService) {
        return;
      }
      

      directionsService
        .route({
          origin: userData.location,
          destination: currLocation,
          travelMode: google.maps.TravelMode.DRIVING,
          provideRouteAlternatives: true,
        })
        .then((response) => {
          console.log("RESPONSE", response);
          directionsRenderer.setDirections(response);
          setRoutes(response.routes);
        });
    }, [directionsService, directionsRenderer, currLocation]);

    return (
      <>
        {leg && (
          <div className="bg-white shadow-md rounded-lg p-4 mb-4">
            <h2 className="text-xl font-bold mb-2">{selected.summary}</h2>
            <p className="text-gray-600">
              {leg.start_address.split(",")[0]} to{" "}
              {leg.end_address.split(",")[0]}
            </p>
            <p className="text-gray-600 mt-2">Distance: {leg.distance?.text}</p>
            <p className="text-gray-600">Duration: {leg.duration?.text}</p>
          </div>
        )}
      </>
    );
  }

  return (
    <div>
      <h2>Recommended restaurants</h2>
      {restaurants ? (
        restaurants.map((item) => {
          return (
            <li
              onClick={() => handleCurrLocation(item, "restaurant")}
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
              onClick={() => handleCurrLocation(item, "concert")}
              key={item.id}
            >
              {item.title}
            </li>
          );
        })
      ) : (
        <div>Loading...</div>
      )}
      <div style={{ height: "100vh" }}>
        <APIProvider apiKey={GOOGLE_API_KEY}>
          <Map
            defaultCenter={userLocation}
            defaultZoom={14}
            fullscreenControl={false}
          >
            <Directions />
          </Map>
        </APIProvider>
      </div>
    </div>
  );
};

export default DayOverview;
