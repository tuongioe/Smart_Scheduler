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
  GetStartedPage,
} from './pages';
import ProfilePage from './pages/Profile';

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
        path: '',
        element: <GetStartedPage />,
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
          {
            path: 'profile',
            element: <ProfilePage />,
          },
        ],
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
