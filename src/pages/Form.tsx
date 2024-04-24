import { useState } from "react";
import LocationPage from "./LocationPage";
import FoodPage from "./FoodPage";
import GenrePage from "./GenrePage";
import Budget from "./Budget";
import DayOverview from "./DayOverview";

const Form = () => {
  const [page, setPage] = useState(4);
  const [showPopup, setShowPopup] = useState(false);
  const formTitles = [
    "Which location are you exploring?",
    "Select your budget?",
    "Select your food preferences",
    "Select some music genres",
  ];

  const [data, setData] = useState({
    location: "Willimantic CT, 06226",
    lat: "41.715230",
    lon: "-72.218680",
    budget: "$$",
    food: ["Mexican", "Korean"],
    genres: ["Rock"],
  });

  const displayPage = () => {
    switch (page) {
      case 0:
        return <LocationPage data={data} setData={setData} />;
      case 1:
        return <Budget data={data} setData={setData} />;
      case 2:
        return <FoodPage data={data} setData={setData} />;
      case 3:
        return <GenrePage data={data} setData={setData} />;
      case 4:
        return <DayOverview userData={data} />;
      default:
        return;
    }
  };

  const allFieldsFull = () => {
    if (
      data.location !== "" &&
      data.budget !== "" &&
      data.food.length > 0 &&
      data.genres.length > 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="form">
      <div className="progress-bar bg-gray-200 h-2 mb-8">
        <div
          className={`bg-indigo-600 h-full transition-all duration-500 ease-in-out`}
          style={{ width: `${((page + 1) / formTitles.length) * 100}%` }}
        ></div>
      </div>
      <div className="form-container">
        <div className="header">
          <h1 className="text-4xl font-bold text-black text-center mb-4">
            {formTitles[page]}
          </h1>
        </div>
        <div className="body">{displayPage()}</div>
        <div className="footer flex justify-center space-x-4 mt-8">
          {page !== 4 && (
            <button
              disabled={page === 0}
              onClick={() => {
                setPage((currPage) => currPage - 1);
              }}
              className={`px-6 py-3 rounded-md text-white font-medium ${
                page === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              Previous
            </button>
          )}
          {page !== 4 && (
            <button
              onClick={() => {
                if (page === 3 && allFieldsFull()) {
                  setShowPopup(true);
                } else if (page === 3 && !allFieldsFull()) {
                  setShowPopup(true);
                } else {
                  setPage((currPage) => currPage + 1);
                }
              }}
              className="px-6 py-3 rounded-md text-white font-medium bg-indigo-600 hover:bg-indigo-700"
            >
              {page === 3 ? "Submit" : "Next"}
            </button>
          )}

          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
              <div className="bg-white rounded-lg p-8 z-10 relative">
                <button
                  onClick={() => {
                    setShowPopup(false);
                    if (allFieldsFull()) {
                      setPage((currPage) => currPage + 1);
                    }
                  }}
                  className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 mb-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <h2 className="text-xl font-bold mb-4">
                  {allFieldsFull()
                    ? "Form Submitted"
                    : "Please fill out all inputs"}
                </h2>
                <p className="text-gray-600 mb-4">
                  {allFieldsFull()
                    ? "Thank you for submitting the form!"
                    : "Please ensure that all fields are filled out before submitting."}
                </p>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setShowPopup(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowPopup(false);
                      if (allFieldsFull()) {
                        setPage((currPage) => currPage + 1);
                      }
                    }}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    {allFieldsFull() ? "Continue" : "OK"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;
