
import { Routes, Route } from 'react-router-dom';
import PublicRoute from '../routesConfig/PublicRoute';
import PrivateRoute from '../routesConfig/PrivateRoute';
import RegisterForm from '../pages/RegisterPage';
import LoginForm from '../pages/LoginPage';
import MainLayout from './MainLayout/MainLayout';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { refreshThunk } from '../redux/auth/operations';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <RegisterForm />
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginForm />
          </PublicRoute>
        }
      />
    </Routes>
  );
};
