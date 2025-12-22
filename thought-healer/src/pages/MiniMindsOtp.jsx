import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MiniMindsOtp = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to unified OTP with product context
    navigate('/otp?product=miniminds', { replace: true });
  }, [navigate]);

  // Show loading while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 dark:from-dark-900 dark:to-dark-800">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Redirecting to verification...</p>
      </div>
    </div>
  );
};

export default MiniMindsOtp;