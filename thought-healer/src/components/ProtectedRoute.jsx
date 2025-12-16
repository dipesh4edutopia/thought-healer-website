import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const authToken = localStorage.getItem('authToken');

  if (!isAuthenticated || !authToken) {
    // Save the current location and plan data to redirect back after login
    sessionStorage.setItem('returnUrl', location.pathname);
    if (location.state?.plan) {
      sessionStorage.setItem('selectedPlan', JSON.stringify(location.state.plan));
    }
    
    // Redirect to signin page
    return <Navigate to="/thoughtpro-signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
