import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole = null, requiredProduct = null }) => {
  const location = useLocation();
  const [isReady, setIsReady] = useState(false);
  
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const authToken = localStorage.getItem('authToken');
  const userRole = localStorage.getItem('userRole');
  const userProduct = localStorage.getItem('product');

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) {
    // Show loading spinner while checking authentication
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          <p className="text-gray-600 dark:text-gray-400">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Check basic authentication
  if (!isAuthenticated || !authToken) {
    // Save the current location and plan data to redirect back after login
    sessionStorage.setItem('returnUrl', location.pathname);
    if (location.state?.plan) {
      sessionStorage.setItem('selectedPlan', JSON.stringify(location.state.plan));
    }
    
    // Redirect to unified login page
    return <Navigate to="/login" replace />;
  }

  // Check role-based access
  if (requiredRole && userRole !== requiredRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Access Denied</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You don't have permission to access this page. Required role: {requiredRole}
          </p>
          <button 
            onClick={() => window.history.back()}
            className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Check product-based access
  if (requiredProduct && userProduct !== requiredProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Wrong Product Access</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            This page is for {requiredProduct} users. You are currently signed in as a {userProduct} user.
          </p>
          <div className="space-y-3">
            <button 
              onClick={() => {
                const dashboardPaths = {
                  thoughtpro: '/thoughtpro-plans',
                  miniminds: '/miniminds-plans',
                  admin: '/admin'
                };
                window.location.href = dashboardPaths[userProduct] || '/';
              }}
              className="block w-full bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors"
            >
              Go to My Dashboard
            </button>
            <button 
              onClick={() => window.history.back()}
              className="block w-full bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
