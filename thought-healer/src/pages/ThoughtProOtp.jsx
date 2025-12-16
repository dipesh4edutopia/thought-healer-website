import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const API_BASE_URL = 'https://thoughtprob2c.thoughthealer.org';

const ThoughtProOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || sessionStorage.getItem('userEmail') || '';
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!email) {
      navigate('/thoughtpro-signup');
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
    const otpCode = otp.join('');
    
    if (otpCode.length !== 6) {
      setError('Please enter complete OTP code');
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
          otp_code: otpCode
        })
      });
      
      const data = await response.json();
      
      if (data.success && data.data.verified) {
        // Store token after OTP verification
        if (data.data.token) {
          localStorage.setItem('authToken', data.data.token);
          localStorage.setItem('userEmail', email);
          localStorage.setItem('userName', sessionStorage.getItem('username') || email.split('@')[0]);
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('emailVerified', 'true');
        }
        
        // Navigate to plans page after successful verification
        navigate('/thoughtpro-plans');
      } else {
        throw new Error(data.error || data.message || 'OTP verification failed');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      setError(error.message || 'Invalid OTP code. Please try again.');
      setOtp(['', '', '', '', '', '']);
      document.getElementById('otp-0')?.focus();
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (email) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/otp/login/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email })
      });
      
      const data = await response.json();
      if (data.success) {
        sessionStorage.setItem('emailVerified', 'true');
      }
    } catch (error) {
      console.error('Login setup error:', error);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    
    setError('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/otp/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setTimer(60);
        setCanResend(false);
        setOtp(['', '', '', '', '', '']);
        document.getElementById('otp-0')?.focus();
      } else {
        throw new Error(data.error || 'Failed to resend OTP');
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      setError(error.message || 'Error resending OTP. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 via-secondary-500 to-purple-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-dark-800 rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-envelope text-primary-500 dark:text-primary-400 text-2xl"></i>
          </div>
          <h1 className="text-2xl font-bold text-dark-900 dark:text-white mb-2">
            Verify Your Email
          </h1>
          <p className="text-dark-600 dark:text-dark-300">
            We've sent a verification code to
          </p>
          <p className="text-primary-500 dark:text-primary-400 font-medium">
            {email || 'your email'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-500 text-red-700 dark:text-red-400 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        {/* OTP Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-2 justify-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-xl font-bold bg-dark-50 dark:bg-dark-700 border-2 border-dark-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-dark-900 dark:text-white transition-all"
                required
              />
            ))}
          </div>

          {/* Timer */}
          <div className="text-center">
            {!canResend ? (
              <p className="text-dark-600 dark:text-dark-300 text-sm">
                Resend code in <span className="font-semibold text-primary-500">{timer}s</span>
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 font-medium text-sm transition-colors"
              >
                Resend Code
              </button>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={otp.join('').length !== 6 || loading}
            className="w-full py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? 'Verifying...' : 'Verify & Continue'}
          </button>
        </form>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <Link
            to="/thoughtpro-signup"
            className="text-dark-600 dark:text-dark-400 hover:text-primary-500 dark:hover:text-primary-400 text-sm transition-colors inline-flex items-center gap-1"
          >
            <i className="fas fa-arrow-left"></i>
            Back to Sign Up
          </Link>
        </div>

        {/* Info */}
        <div className="mt-8 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
          <p className="text-xs text-dark-600 dark:text-dark-300 text-center">
            <i className="fas fa-info-circle text-primary-500 mr-1"></i>
            Didn't receive the code? Check your spam folder or click resend.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThoughtProOtp;
