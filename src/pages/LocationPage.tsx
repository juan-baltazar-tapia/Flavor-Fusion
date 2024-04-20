import React from "react";
import { useState } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

// Define the LocationData interface

const LocationPage = ({ data, setData }) => {
  const [coordinates, setCoordinates] = useState({
    lat: null,
    long: null,
  });

  const handleSelect = async (value: string) => {
    const results = await geocodeByAddress(value);
    console.log("results", results);
    const fullAddressComponents = results[0].address_components;
    const currCity = fullAddressComponents[0].long_name;
    const currState =
      fullAddressComponents[fullAddressComponents.length - 2].long_name;
    const coords = await getLatLng(results[0]);

    setData({
      ...data,
      city: currCity,
      state: currState,
      location: results[0].formatted_address,
      lat: coords.lat,
      lon: coords.lng,
    });
  };


  return (
    <div className=" bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-6">
              Select Location
            </h2>
            <PlacesAutocomplete
              value={data.location}
              onChange={(value) =>
                setData({
                  ...data,
                  location: value,
                })
              }
              onSelect={handleSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div>
                  <div className="relative">
                    <input
                      {...getInputProps({
                        placeholder: "Search Places ...",
                        className:
                          "w-full py-3 px-4 pr-10 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent",
                      })}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4">
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion) => {
                      const className = suggestion.active
                        ? "bg-indigo-50 text-indigo-900"
                        : "bg-white text-gray-900";
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className: `${className} px-4 py-2 cursor-pointer`,
                          })}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
        
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPage;
