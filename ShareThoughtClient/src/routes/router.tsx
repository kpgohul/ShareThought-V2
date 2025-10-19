import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';

// Lazy load components for better performance
const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const LandingPage = lazy(() => import('../pages/LandingPage'));

export const createRouter = (isAuthenticated: boolean) => createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: isAuthenticated ? <Home /> : <LandingPage />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'app',
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <Home />,
          },
        ],
      },
    ],
  },
]);
