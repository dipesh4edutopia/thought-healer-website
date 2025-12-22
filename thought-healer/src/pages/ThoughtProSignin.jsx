import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ThoughtProSignin = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to unified login with product preselection
    navigate('/login?product=thoughtpro', { replace: true });
  }, [navigate]);

  // Show loading while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 dark:from-dark-900 dark:to-dark-800">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Redirecting to login...</p>
      </div>
    </div>
  );
};

export default ThoughtProSignin;
