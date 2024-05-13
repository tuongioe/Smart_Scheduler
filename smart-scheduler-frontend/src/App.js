import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { getMonth } from "./util.js";
import Sidebar from "./components/Sidebar";
import CalendarPage from "./route/Calendar.js";
import AISchedulerPage from "./route/AIScheduler.js";
import SettingApp from "./route/SettingApp.js";
function App() {
  console.table(getMonth());
  return (
    <React.Fragment>
      <div className=" bg-[#262525] text-white">
        <div className="w-[1024px] m-auto">
          <div className="mx-6 h-screen">
            <div className="flex h-full">
              <div className="w-2/12">
                <Sidebar />
              </div>
              <div className="w-10/12">
                <Routes>
                  <Route path="/" element={<CalendarPage />} />
                  <Route path="/ai-scheduler" element={<AISchedulerPage />} />
                  <Route path="/setting" element={<SettingApp />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
