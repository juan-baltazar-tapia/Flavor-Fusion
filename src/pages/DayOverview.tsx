import React, { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { supabase } from "../client";

const SEAK_GEEK_API_KEY = import.meta.env.VITE_SEAK_GEEK_API_KEY;
const YELP_API_KEY = import.meta.env.VITE_YELP_API_KEY;
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
// work around the CORS issue
// const url =
//   "https://corsproxy.io/?" +
//   encodeURIComponent(
//     "https://api.yelp.com/v3/businesses/search?term=food&location=350 5th Ave, New York, NY 10118"
//   );
const DayOverview = ({ userData, isLoggedIn, userId }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [concerts, setConcerts] = useState([]);
  const [userLocation, setUserLocation] = useState({
    lat: parseFloat(userData.lat),
    lng: parseFloat(userData.lon),
  });
  const [currLocation, setCurrLocation] = useState("");
  console.log("data from day overview", userData);
  console.log("isloggedin", isLoggedIn);
  console.log("userid", userId);

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
        setRestaurants(selectTopFourRestuarants(data.businesses));
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

  const handleSaveRestaurant = async (
    restuarant_id: string,
    name: string,
    price: string,
    rating: number,
    review_count: number,
    location: string
  ) => {
    const { data, error } = await supabase
      .from("restaurants")
      .insert({
        user_id: userId,
        restaurant_id: restuarant_id,
        name: name,
        price: price,
        rating: rating,
        review_count: review_count,
        location: location,
      })
      .select();
    if (error) {
      console.log(error);
    } else {
      alert("Restaurant added");
    }
  };

  const selectTopFourRestuarants = (arr) => {
    const selectedRestaurants = [];
    const randomIndices = new Set();

    while (selectedRestaurants.length < 4) {
      const randomIndex = Math.floor(Math.random() * arr.length);

      if (!randomIndices.has(randomIndex)) {
        randomIndices.add(randomIndex);
        selectedRestaurants.push(arr[randomIndex]);
      }
    }
    setRestaurants(selectedRestaurants)

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
  //name, price, raing, review_count, location_address_1, city, state

  const makeAddress = (address: string, city: string, state: string) => {
    return address + " " + city + " " + state;
  };
  return (
    <div className="flex">
      <div className="w-1/2 p-8">
        <h2 className="text-2xl font-bold mb-4">Recommended Restaurants</h2>
        {restaurants ? (
          <ul className="space-y-4">
            {restaurants.map((item) => (
              <div key={item.id}>
                <li
                  onClick={() => handleCurrLocation(item, "restaurant")}
                  className="bg-white rounded-lg shadow-md p-4 cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                >
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                  <p className="text-gray-500 mb-1">Price: {item.price}</p>
                  <p className="text-gray-500 mb-1">
                    {item.rating.toFixed(1)} ({item.review_count} reviews)
                  </p>
                  <p
                    className={`text-sm ${
                      item.is_closed ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {item.is_closed ? "Closed" : "Open"}
                  </p>
                </li>
                {isLoggedIn && (
                  <button
                    onClick={() =>
                      handleSaveRestaurant(
                        item.id,
                        item.name,
                        item.price,
                        item.rating.toFixed(1),
                        item.review_count,
                        makeAddress(
                          item.location.address1,
                          item.location.city,
                          item.location.state
                        )
                      )
                    }
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-2"
                  >
                    Save Restaurant
                  </button>
                )}
              </div>
            ))}
          </ul>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-2">Loading</h2>
            <p className="text-gray-500">Loading...</p>
          </div>
        )}

        <h2 className="text-2xl font-bold mt-8 mb-4">
          Recommended Music Events
        </h2>
        {concerts ? (
          <ul className="space-y-4">
            {concerts.map((item) => (
              <li
                key={item.id}
                onClick={() => handleCurrLocation(item, "concert")}
                className="bg-white rounded-lg shadow-md p-4 cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="text-lg font-semibold mb-2">{item.title}</p>
                <p className="text-gray-500 mb-2">
                  Price: ${item.stats.average_price}
                </p>
                <button
                  onClick={() => window.open(`${item.url}`)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                >
                  Buy Tickets
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div>
            <p className="text-gray-500">Loading...</p>
          </div>
        )}
      </div>

      <div className="w-1/2">
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
    </div>
  );
};

export default DayOverview;
