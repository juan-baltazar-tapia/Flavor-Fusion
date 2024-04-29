import React, { useEffect, useState } from "react";
import { supabase } from "../client";
import { useNavigate } from "react-router-dom";

const ProfilePage = ({ userId, setIsLoggedIn, setUserId, setData }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [render, setRender] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("restaurants")
        .select()
        .eq("user_id", userId);
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        setRestaurants(data);
      }
    };
    fetchData();
  }, [userId, render]);

  const handleDelete = async (id) => {
    const { data, error } = await supabase
      .from("restaurants")
      .delete()
      .eq("restaurant_id", id);

    if (error) {
      console.log(error);
    } else {
      setRender((prev) => prev + 1);
      console.log("Succesfully deleted item");
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    } else {
      setIsLoggedIn(false);
      setUserId("");
      setData({
        location: "",
        lat: "",
        lon: "",
        budget: "",
        food: [],
        genres: [],
      });

      alert("Succesfully signed out");
      navigate("/");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        {restaurants && restaurants.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Saved Restaurants
            </h1>
            {restaurants.map((item, index) => (
              <li
                key={index}
                className="bg-white rounded-lg cursor-pointer shadow-md overflow-hidden transition duration-300 hover:shadow-lg"
              >
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <button
                      onClick={() => handleDelete(item.restaurant_id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                  <p className="text-gray-600 mb-1">Price: {item.price}</p>
                  <p className="text-gray-600 mb-1">
                    {item.rating} ({item.review_count} reviews)
                  </p>
                  <p className="text-gray-800 mb-1">
                    Location: {item.location}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center h-screen">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <p className="text-lg text-gray-600">No restaurants added...</p>
          </div>
        )}
      </div>
      <div className="fixed bottom-4 right-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
