// src/components/auth/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Path to your LS-based AuthContext

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser } = useAuth(); // From LS-based AuthContext
  const location = useLocation();

  if (!currentUser) {
    // User not logged in, redirect them to the login page.
    // Pass the current location so we can redirect them back after login (optional).
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If allowedRoles is specified, check if the currentUser's role is included.
  // If allowedRoles is not specified, just being logged in (currentUser exists) is enough.
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    // User is logged in but does not have the required role.
    // Redirect them to a default page based on their actual role or a generic "unauthorized" page.
    // For simplicity, redirecting to their role's default dashboard.
    if (currentUser.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (currentUser.role === 'employee') {
      return <Navigate to="/employee/dashboard" replace />;
    }
    // Fallback if role is undefined or unexpected (should ideally not happen)
    return <Navigate to="/" replace />; // Or an "Access Denied" page
  }

  // User is authenticated and has the required role (if specified), or no specific role is required.
  return children;
};

export default ProtectedRoute;