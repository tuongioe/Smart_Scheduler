import './assets/App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AIScheduler, Calendar, LoginPage, RegisterPage } from './pages';

const App = () => {
  return (
    <React.Fragment>
      <div className="container-fluid mx-auto">
        <div className="flex flex-col md:flex-row">
          <div className="w-full">
            <Routes>
              <Route element={<LoginPage />} index="true" />
              <Route path="/register" element={<RegisterPage />} />
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
