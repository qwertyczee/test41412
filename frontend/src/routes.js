
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import actual components
import Login from './components/Login';
import Register from './components/Register';
import TaskDashboard from './components/TaskDashboard'; // Import the actual component
import PrivateRoute from './components/PrivateRoute'; // Import the PrivateRoute component

const NotFound = () => <div>404 Not Found</div>; // Basic 404 page

// Helper component for root redirect logic
const RootRedirect = () => {
  const isAuthenticated = !!localStorage.getItem('authToken');
  return <Navigate replace to={isAuthenticated ? "/dashboard" : "/login"} />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes */}
      {/* Wrap TaskDashboard route within PrivateRoute */}
      <Route path="/dashboard" element={<PrivateRoute />}>
        {/* The actual component is rendered via Outlet in PrivateRoute */}
        <Route index element={<TaskDashboard />} />
      </Route>

      {/* Redirect root path based on auth status */}
      <Route path="/" element={<RootRedirect />} />

      {/* Catch-all route for 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
