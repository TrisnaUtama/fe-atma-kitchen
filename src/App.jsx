import React, { lazy, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { themeChange } from "theme-change";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Importing pages
const Layout = lazy(() => import("./containers/Layout"));
const Login = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Register = lazy(() => import("./pages/Register"));
const UbahPassword = lazy(() => import("./pages/ubahPassword"));

function App() {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/forgot-password/change-password/:token"
            element={<UbahPassword />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<Layout />} />
        </Routes>
        <ToastContainer position="bottom-right"/>
      </Router>
    </>
  );
}

export default App;
