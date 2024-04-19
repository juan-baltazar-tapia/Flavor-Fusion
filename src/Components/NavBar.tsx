import { Outlet, Link } from "react-router-dom";
import { useState } from "react";

const NavBar = () => {
  const [homeSelected, setHomeSelected] = useState(true);
  const [aboutSelected, setAboutSelected] = useState(false);

  const toggleHomeClass = () => {
    setHomeSelected(!homeSelected);
  };

  const toggleAboutClass = () => {
    setAboutSelected(!aboutSelected);
  };

  return (
    <div>
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/">
                <img
                  className="h-8 w-auto"
                  src="/src/assets/logo.png"
                  alt="Logo"
                />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                onClick={() => {
                  if (!homeSelected) {
                    toggleHomeClass();
                    toggleAboutClass();
                  }
                }}
                className={`${
                  homeSelected
                    ? " border-indigo-500 text-gray-900"
                    : " border-none text-gray-400"
                }    hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Home
              </Link>
              <Link
                to="/about"
                onClick={() => {
                  if (!aboutSelected) {
                    toggleAboutClass();
                    toggleHomeClass();
                  }
                }}
                className={` ${
                  aboutSelected
                    ? " border-indigo-500  text-gray-900"
                    : " border-none text-gray-400"
                }   hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                About
              </Link>
            </div>
          </div>
        </div>

        <div className="sm:hidden" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              onClick={() => {
                if (!homeSelected) {
                  toggleHomeClass();
                  toggleAboutClass();
                }
              }}
              className={`${
                homeSelected
                  ? " border-indigo-500 text-gray-900"
                  : "border-none text-gray-400"
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium
              `}
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => {
                if (!aboutSelected) {
                  toggleAboutClass();
                  toggleHomeClass();
                }
              }}
              className={`${
                aboutSelected
                  ? " border-indigo-500 text-gray-900"
                  : "border-none text-gray-400"
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium
              `}
            >
              About
            </Link>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default NavBar;
