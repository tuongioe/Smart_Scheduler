import './assets/App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import SurveyPage from './pages/SurveyPage';
import { AIScheduler, Calendar, LoginPage, RegisterPage } from './pages';

const App = () => {
  return (
    <React.Fragment>
      <div className="container mx-auto md:max-w-[1024px]">
        <div className="flex flex-col md:flex-row md:h-screen">
          <div className="w-full md:w-10/12">
            <Routes>
              <Route path="/login" element={<LoginPage />} index="true" />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/survey" element={<SurveyPage />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/ai" element={<AIScheduler />} />
            </Routes>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
