import { createBrowserRouter, Navigate } from 'react-router';
import Login from './pages/Login';
import Layout from './pages/Layout';
import Convenios from './pages/Convenios';
import Carnet from './pages/Carnet';
import Puntos from './pages/Puntos';
import AdminDashboard from './pages/AdminDashboard';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: '/convenios',
        element: <Convenios />,
      },
      {
        path: '/carnet',
        element: <Carnet />,
      },
      {
        path: '/puntos',
        element: <Puntos />,
      },
      {
        path: '/admin',
        element: <AdminDashboard />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
