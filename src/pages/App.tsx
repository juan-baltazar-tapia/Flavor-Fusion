import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "../components/NavBar";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import Form from "./Form";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import ProfilePage from "./ProfilePage";
import DayOverview from "./DayOverview";


const App = () => {
  const [data, setData] = useState({
    location: "",
    lat: "",
    lon: "",
    budget: "",
    food: [],
    genres: [],
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('')

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<NavBar isLoggedIn={isLoggedIn} />}>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/about" element={<AboutPage isLoggedIn={isLoggedIn} />}></Route>
        <Route path="/form" element={<Form isLoggedIn={isLoggedIn} data={data} setData={setData}/>}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/login" element={<LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserId={setUserId}/>}></Route>
        <Route path="/profile" element={<ProfilePage userId={userId} setIsLoggedIn={setIsLoggedIn} setUserId={setUserId} setData={setData}/>}></Route>
        <Route path="/recommendations" element={<DayOverview userData={data} isLoggedIn={isLoggedIn} userId={userId}/>}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App