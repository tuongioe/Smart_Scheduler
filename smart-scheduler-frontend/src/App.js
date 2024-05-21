import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import CalendarPage from "./route/Calendar.js";
import AISchedulerPage from "./route/AIScheduler.js";
import SettingApp from "./route/SettingApp.js";
import RegisterPage fromm "./RegisterPage.js";
import LoginPage from "./LoginPage.js";
function App() {
  return (
    <React.Fragment>
      <div className="container mx-auto md:max-w-[1024px]">
        <div className="flex flex-col md:flex-row md:h-screen">
          <div className="w-full md:w-2/12 min-w-[100px]">
            <Sidebar />
          </div>
          <div className="w-full md:w-10/12">
            <Routes>
              <Route path="/" element={<CalendarPage />} />
              <Route path="/ai-scheduler" element={<AISchedulerPage />} />
              <Route path="/setting" element={<SettingApp />} />
              <Route path"/register" element={<RegisterPage />} />
              <Route path"/login" element={<LoginPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
