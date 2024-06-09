import "./assets/App.css";
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { AIScheduler, Calendar, LoginPage, RegisterPage } from "./pages";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (username, password) => {
    if (username === "admin" && password === "admin") {
      setIsAuthenticated(true);
    }
  };

  return (
    <React.Fragment>
      <div className="w-screen h-screen relative">
        <svg
          style={{ position: "absolute", top: 0, left: 0 }}
          width="236"
          height="227"
          viewBox="0 0 236 227"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_f_17_104)">
            <path
              d="M76 16C76 44.1665 49.5848 67 17 67C-15.5848 67 -42 44.1665 -42 16C-42 -12.1665 -15.5848 -35 17 -35C49.5848 -35 76 -12.1665 76 16Z"
              fill="#00A9BF"
              fill-opacity="0.8"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_17_104"
              x="-202"
              y="-195"
              width="438"
              height="422"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="80"
                result="effect1_foregroundBlur_17_104"
              />
            </filter>
          </defs>
        </svg>

        <div className="container mx-auto md:max-w-[1024px]">
          <div className="flex flex-col md:flex-row md:h-screen">
            {/* Render Sidebar if authenticated */}
            {isAuthenticated && (
              <div className="w-full md:w-2/12">
                <Sidebar />
              </div>
            )}

            <div
              className={
                isAuthenticated ? "w-full md:w-10/12" : "w-full relative"
              }
            >
              <Routes>
                <Route
                  path="/"
                  element={
                    isAuthenticated ? (
                      <Navigate to="/ai" />
                    ) : (
                      <LoginPage onLogin={handleLogin} />
                    )
                  }
                />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                  path="/calendar"
                  element={isAuthenticated ? <Calendar /> : <Navigate to="/" />}
                />
                <Route
                  path="/ai"
                  element={
                    isAuthenticated ? <AIScheduler /> : <Navigate to="/" />
                  }
                />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
