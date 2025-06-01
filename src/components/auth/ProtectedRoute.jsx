// src/components/auth/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Adjust path if needed

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    // User not logged in, redirect them to the login page.
    // Pass the current location so we can redirect them back after login (optional).
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    // User is logged in but does not have the required role.
    // Redirect them to a default page based on their role or an "unauthorized" page.
    // For simplicity, redirecting to their role's default or home.
    if (currentUser.role === 'admin') {
      return <Navigate to="/admin/employees" replace />;
    } else if (currentUser.role === 'employee') {
      return <Navigate to="/employee/tasks" replace />;
    }
    // Fallback if role is undefined or unexpected (should ideally not happen with predefined users)
    return <Navigate to="/" replace />;
  }

  // User is authenticated and has the required role (if specified)
  return children;
};

export default ProtectedRoute;