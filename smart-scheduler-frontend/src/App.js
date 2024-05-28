import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import RegisterPage from "./RegisterPage.js";
import LoginPage from "./LoginPage.js";
function App() {
  return (
    <React.Fragment>
      <div className="container mx-auto md:max-w-[1024px]">
        <div className="flex flex-col md:flex-row md:h-screen">
          <div className="w-full md:w-10/12">
            <Routes>
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/" element={<LoginPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
