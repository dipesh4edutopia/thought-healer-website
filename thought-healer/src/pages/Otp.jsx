import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';

const Otp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || sessionStorage.getItem('userEmail') || '';
  const [product, setProduct] = useState(location.state?.product || sessionStorage.getItem('selectedProduct') || 'thoughtpro');
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle URL query parameters for product context
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const productFromUrl = searchParams.get('product');
    if (productFromUrl && (productFromUrl === 'thoughtpro' || productFromUrl === 'miniminds' || productFromUrl === 'admin')) {
      setProduct(productFromUrl);
      sessionStorage.setItem('selectedProduct', productFromUrl);
    }
  }, [location]);

  const products = {
    thoughtpro: {
      name: 'ThoughtPro',
      description: 'Professional mental health monitoring',
      icon: '🧠',
      color: 'from-purple-500 to-blue-600',
      bgColor: 'from-purple-50 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30',
      redirectPath: '/thoughtpro-plans'
    },
    miniminds: {
      name: 'MiniMinds',
      description: 'Child mental health support',
      icon: '👶',
      color: 'from-blue-500 to-purple-600',
      bgColor: 'from-blue-50 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30',
      redirectPath: '/miniminds-plans'
    },
    admin: {
      name: 'Admin Panel',
      description: 'Administrative dashboard',
      icon: '⚡',
      color: 'from-red-500 to-orange-600',
      bgColor: 'from-red-50 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30',
      redirectPath: '/admin'
    }
  };

  const currentProduct = products[product] || products.thoughtpro;

  useEffect(() => {
    if (!email) {
      navigate('/signup');
    }
  }, [email, navigate]);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`)?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      setError('Please enter the complete 6-digit OTP');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/otp/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          otp_code: otpString,
          product: product
        }),
      });
      
      const result = await response.json();
      console.log('📥 OTP verification response:', result);
      console.log('📥 Response structure:', JSON.stringify(result, null, 2));
      
      if (response.ok && result.success) {
        // Check token availability - prioritize 'token' field as per API response
        const token = result.data?.token || result.data?.accessToken || result.token || result.data?.access_token;
        const refreshToken = result.data?.refreshToken || result.data?.refresh_token || result.refreshToken;
        
        console.log('🔍 Token extraction:', { 
          dataToken: result.data?.token,
          accessToken: result.data?.accessToken,
          extractedToken: token ? 'found' : 'missing'
        });
        
        if (!token) {
          console.error('❌ No token found in OTP response');
          console.error('Available data keys:', Object.keys(result.data || {}));
          throw new Error('Verification successful but no token received');
        }
        
        // Store auth data
        localStorage.setItem('authToken', token);
        if (refreshToken) {
          localStorage.setItem('refreshToken', refreshToken);
        }
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', result.data?.user?.username || email.split('@')[0]);
        localStorage.setItem('userId', result.data?.user?.id || result.data?.user?.user_id);
        localStorage.setItem('userRole', product === 'admin' ? 'admin' : result.data?.user?.role || 'user');
        localStorage.setItem('product', product);
        localStorage.setItem('isAuthenticated', 'true');
        
        // Store additional user info
        if (result.data?.user) {
          localStorage.setItem('userPlanType', result.data.user.plan_type || '');
          localStorage.setItem('userSubscriptionId', result.data.user.subscription_id || '');
        }
        
        // Verify token was stored
        const storedToken = localStorage.getItem('authToken');
        console.log('✅ Token stored after OTP:', storedToken ? 'success' : 'failed');
        
        // Clear session storage
        sessionStorage.removeItem('userEmail');
        sessionStorage.removeItem('selectedProduct');
        
        console.log(`✅ OTP verification successful, redirecting to ${product}`);
        
        // Navigate based on product
        navigate(products[product].redirectPath);
      } else {
        setError(result.message || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/otp/resend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          product: product
        }),
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        setTimer(60);
        setCanResend(false);
        setOtp(['', '', '', '', '', '']);
        console.log('✅ OTP resent successfully');
      } else {
        setError(result.message || 'Failed to resend OTP. Please try again.');
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentProduct.bgColor} flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-all duration-300`}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="flex justify-center">
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r ${currentProduct.color} rounded-lg flex items-center justify-center`}>
              <span className="text-white font-bold text-base sm:text-lg">{currentProduct.icon}</span>
            </div>
            <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{currentProduct.name}</span>
          </div>
        </div>
        <h2 className="mt-4 sm:mt-6 text-center text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
          Verify your email
        </h2>
        <p className="mt-2 text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400 px-2">
          We've sent a 6-digit code to{' '}
          <span className="font-medium text-blue-600 dark:text-blue-400 break-all">{email}</span>
        </p>
      </div>

      <div className="mt-6 sm:mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white dark:bg-gray-800 py-6 sm:py-8 px-4 sm:px-10 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-md bg-red-50 dark:bg-red-900/50 p-4">
                <div className="text-sm text-red-700 dark:text-red-200">{error}</div>
              </div>
            )}

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 text-center mb-3 sm:mb-4">
                Enter verification code
              </label>
              <div className="flex justify-center space-x-1.5 sm:space-x-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-10 h-10 sm:w-12 sm:h-12 text-center text-base sm:text-lg font-semibold border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="0"
                  />
                ))}
              </div>
            </div>

            <div className="text-center">
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={loading}
                  className="text-blue-600 hover:text-blue-500 dark:text-blue-400 font-medium text-sm disabled:opacity-50"
                >
                  Resend code
                </button>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Resend code in {formatTime(timer)}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={loading || otp.join('').length !== 6}
                className={`group relative w-full flex justify-center py-2.5 sm:py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r ${currentProduct.color} hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200`}
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </div>
                ) : (
                  'Verify email'
                )}
              </button>
            </div>
          </form>

          <div className="mt-4 sm:mt-6 text-center space-y-3 sm:space-y-4">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Didn't receive the code? Check your spam folder or{' '}
              <button
                onClick={handleResend}
                disabled={!canResend || loading}
                className="text-blue-600 hover:text-blue-500 dark:text-blue-400 font-medium disabled:opacity-50"
              >
                try resending
              </button>
            </p>
            
            <div className="text-xs sm:text-sm">
              <Link to="/signup" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
                ← Back to signup
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;