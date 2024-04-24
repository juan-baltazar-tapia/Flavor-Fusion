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
    <div className="flex">
      <div className="w-1/2 p-8">
        <h2 className="text-2xl font-bold mb-4">Recommended Restaurants</h2>
        {restaurants ? (
          <ul className="space-y-4">
            {restaurants.map((item) => (
              <li
                key={item.id}
                onClick={() => handleCurrLocation(item, 'restaurant')}
                className="bg-white rounded-lg shadow-md p-4 cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-500 mb-1">Price: {item.price}</p>
                <p className="text-gray-500 mb-1">
                  {item.rating.toFixed(1)} ({item.review_count} reviews)
                </p>
                <p className={`text-sm ${item.is_closed ? 'text-red-500' : 'text-green-500'}`}>
                  {item.is_closed ? 'Closed' : 'Open'}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-2">Loading</h2>
            <p className="text-gray-500">Loading...</p>
          </div>
        )}

        <h2 className="text-2xl font-bold mt-8 mb-4">Recommended Music Events</h2>
        {concerts ? (
          <ul className="space-y-4">
            {concerts.map((item) => (
              <li
                key={item.id}
                onClick={() => handleCurrLocation(item, 'concert')}
                className="bg-white rounded-lg shadow-md p-4 cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="text-lg font-semibold mb-2">{item.title}</p>
                <p className="text-gray-500 mb-2">Price: ${item.stats.average_price}</p>
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
        <div style={{ height: '100vh' }}>
          <APIProvider apiKey={GOOGLE_API_KEY}>
            <Map defaultCenter={userLocation} defaultZoom={14} fullscreenControl={false}>
              <Directions />
            </Map>
          </APIProvider>
        </div>
      </div>
{/* 
      {selectedLocation && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          <div className="bg-white rounded-lg shadow-lg p-6 z-10">
            <h2 className="text-2xl font-bold mb-4">
              {selectedLocation.type === 'restaurant' ? selectedLocation.name : selectedLocation.title}
            </h2>
            {selectedLocation.type === 'restaurant' && (
              <>
                <p className="text-gray-500 mb-1">Price: {selectedLocation.price}</p>
                <p className="text-gray-500 mb-1">
                  {selectedLocation.rating.toFixed(1)} ({selectedLocation.review_count} reviews)
                </p>
                <p className={`text-sm ${selectedLocation.is_closed ? 'text-red-500' : 'text-green-500'}`}>
                  {selectedLocation.is_closed ? 'Closed' : 'Open'}
                </p>
              </>
            )}
            {selectedLocation.type === 'concert' && (
              <>
                <p className="text-gray-500 mb-2">Price: ${selectedLocation.stats.average_price}</p>
                <button
                  onClick={() => window.open(`${selectedLocation.url}`)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                >
                  Buy Tickets
                </button>
              </>
            )}
            <button
              onClick={() => setSelectedLocation(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default DayOverview;
