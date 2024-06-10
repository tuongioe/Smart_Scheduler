import './assets/App.css';
import React from 'react';
import axios from 'axios';
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import {
  AIScheduler,
  Calendar,
  LoginPage,
  RegisterPage,
  SurveyPage,
  HomeLayout,
  DashboardLayout,
} from './pages';
import ProfilePage from './pages/Profile';
import GetStartedPage from './pages/GetStartedPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
        loader: () => {
          const token = localStorage.getItem('token');
          if (token) {
            return redirect('/dashboard');
          } else {
            return null;
          }
        },
      },
      {
        path: 'register',
        element: <RegisterPage />,
        loader: () => {
          const token = localStorage.getItem('token');
          if (token) {
            return redirect('/dashboard');
          } else {
            return null;
          }
        },
      },
      {
        path: 'survey',
        element: <SurveyPage />,
        loader: async () => {
          const token = localStorage.getItem('token');
          if (!token) {
            return redirect('/');
          } else {
            try {
              const response = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}api/user`,
                {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              if (response.data.data.surveyTasks.length > 0) {
                return redirect('/dashboard');
              }
              return null;
            } catch (e) {
              console.log(e);
            }
          }
        },
      },
      {
        path: '/getstarted',
        element: <GetStartedPage />,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        loader: () => {
          const token = localStorage.getItem('token');
          if (!token) {
            return redirect('/');
          } else {
            return null;
          }
        },
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
