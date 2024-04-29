import React, { useEffect, useState } from "react";
import { supabase } from "../client";
import { useNavigate } from "react-router-dom";

const ProfilePage = ({ userId }) => {
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
      console.log(error)
    } else {
      alert("Succesfully signed out")
      navigate('/')
    }
  };

  return (
    <div>
      <ul className="space-y-4">
        {restaurants &&
          restaurants.map((item, index) => (
            <div key={index}>
              <li className="bg-white rounded-lg shadow-md p-4 cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <button
                    onClick={() => handleDelete(item.restaurant_id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </div>
                <p className="text-gray-500 mb-1">Price: {item.price}</p>
                <p className="text-gray-500 mb-1">
                  {item.rating} ({item.review_count} reviews)
                </p>
                <p className="text-gray-800 mb-1">Location: {item.location}</p>
              </li>
            </div>
          ))}
      </ul>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ProfilePage;
