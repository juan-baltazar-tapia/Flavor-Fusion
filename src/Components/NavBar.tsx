import { Outlet, Link } from "react-router-dom";
//import "./NavBar.css";

const NavBar = () => {
  return (
    <div>
      <nav>
        <ul>
          <li className="home-link" key="home-button">
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">View Gallery</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default NavBar;
