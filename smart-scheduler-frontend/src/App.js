import './assets/App.css';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  AIScheduler,
  Calendar,
  LoginPage,
  RegisterPage,
  SurveyPage,
  HomeLayout,
  DashboardLayout,
} from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'survey',
        element: <SurveyPage />,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Calendar />,
          },
          {
            path: 'generate',
            element: <AIScheduler />,
          },
        ],
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
