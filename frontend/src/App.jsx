import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import TwoFA from "./pages/TwoFA.jsx";
import Nav from "./components/Nav.jsx";
import FinalPage from "./pages/FinalPage.jsx";

const App = () => {
  return (
    <div className="">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/2fa" element={<TwoFA />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          {/* <Route path="/final" element={<FinalPage/>}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
