import React from "react";
import { useState } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

// Define the LocationData interface


const LocationPage =({data,setData}) => {

  //   const [coordinates, setCoordinates] = useState({
  //     lat: null,
  //     long: null,
  //   });

  const handleSelect = async (value: string) => {
    const results = await geocodeByAddress(value);
    console.log("results", results);
    const fullAddressComponents = results[0].address_components;
    const currCity = fullAddressComponents[0].long_name;
    const currState =
      fullAddressComponents[fullAddressComponents.length - 2].long_name;

    setData({
      ...data,
      city: currCity,
      state: currState,
      fullAddress: results[0].formatted_address,
    });

    // const coords = await getLatLng(results[0]);
    // setCoordinates(coords);
  };

  const handleSubmit = () => {
    console.log("DATA", data);
  };

  return (
    <div>
      <button onClick={handleSubmit}>Check Data</button>
      <PlacesAutocomplete
        value={data.fullAddress}
        onChange={(value) => setData( {
            ...data, fullAddress: value
        }) }
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: "Search Places ...",
                className: "location-search-input",
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
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
  );
};

export default LocationPage;
