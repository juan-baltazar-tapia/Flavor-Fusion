import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "../components/NavBar";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import Form from "./Form";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import ProfilePage from "./ProfilePage";


const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<NavBar isLoggedIn={isLoggedIn} />}>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/about" element={<AboutPage />}></Route>
        <Route path="/form" element={<Form isLoggedIn={isLoggedIn}/>}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App