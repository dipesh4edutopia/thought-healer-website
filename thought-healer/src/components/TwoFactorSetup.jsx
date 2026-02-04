import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api';

const TwoFactorSetup = () => {
  const [loading, setLoading] = useState(false);
  const [setupData, setSetupData] = useState(null);
  const [verifyToken, setVerifyToken] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    checkTwoFactorStatus();
  }, []);

  const checkTwoFactorStatus = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_BASE_URL}/api/admin/2fa/status`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setTwoFAEnabled(result.data.enabled);
      }
    } catch (error) {
      console.error('Error checking 2FA status:', error);
    } finally {
      setCheckingStatus(false);
    }
  };

  const handleSetup = async () => {
    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        setError('Please login first');
        setLoading(false);
        return;
      }
      
      console.log('🔐 2FA Setup Request - Token:', token ? 'Present' : 'Missing');
      console.log('🔐 User Role:', localStorage.getItem('userRole'));
      
      const response = await fetch(`${API_BASE_URL}/api/admin/2fa/setup`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();
      console.log('🔐 2FA Setup Response:', result);

      if (response.ok && result.success) {
        setSetupData(result.data);
      } else {
        setError(result.message || result.error || 'Failed to setup 2FA');
      }
    } catch (error) {
      console.error('2FA setup error:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndEnable = async (e) => {
    e.preventDefault();
    
    if (verifyToken.length !== 6) {
      setError('Please enter a valid 6-digit code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_BASE_URL}/api/admin/2fa/verify`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: verifyToken })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccess('2FA enabled successfully!');
        setTwoFAEnabled(true);
        setSetupData(null);
        setVerifyToken('');
      } else {
        setError(result.message || 'Invalid token. Please try again.');
      }
    } catch (error) {
      console.error('2FA verification error:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDisable = async () => {
    const token = prompt('Enter your 6-digit authentication code to disable 2FA:');
    
    if (!token || token.length !== 6) {
      setError('Invalid token');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch(`${API_BASE_URL}/api/admin/2fa/disable`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccess('2FA disabled successfully');
        setTwoFAEnabled(false);
      } else {
        setError(result.message || 'Failed to disable 2FA');
      }
    } catch (error) {
      console.error('2FA disable error:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (checkingStatus) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Two-Factor Authentication
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Add an extra layer of security to your admin account
        </p>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 px-4 py-3 rounded">
          {success}
        </div>
      )}

      {!twoFAEnabled && !setupData && (
        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Enhance your security
                </h3>
                <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                  <p>Two-factor authentication adds an extra layer of security by requiring a code from your phone in addition to your password.</p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleSetup}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white py-2 px-4 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Setting up...' : 'Enable Two-Factor Authentication'}
          </button>
        </div>
      )}

      {setupData && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Step 1: Scan QR Code
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Scan this QR code with Google Authenticator, Authy, or any other TOTP authenticator app:
            </p>
            <div className="flex justify-center bg-white p-4 rounded-lg">
              <img src={setupData.qrCode} alt="QR Code" className="w-64 h-64" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Manual Entry
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Or enter this code manually:
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded font-mono text-sm break-all">
              {setupData.secret}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Backup Codes
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Save these backup codes in a safe place. Each code can be used once if you lose access to your authenticator:
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded grid grid-cols-2 gap-2 font-mono text-sm">
              {setupData.backupCodes?.map((code, index) => (
                <div key={index} className="text-gray-900 dark:text-white">{code}</div>
              ))}
            </div>
          </div>

          <form onSubmit={handleVerifyAndEnable} className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Step 2: Verify Setup
              </h3>
              <label htmlFor="verifyToken" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Enter the 6-digit code from your authenticator app:
              </label>
              <input
                id="verifyToken"
                type="text"
                maxLength="6"
                value={verifyToken}
                onChange={(e) => setVerifyToken(e.target.value.replace(/\D/g, ''))}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-center text-2xl tracking-widest"
                placeholder="000000"
                disabled={loading}
              />
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setSetupData(null)}
                disabled={loading}
                className="flex-1 bg-white dark:bg-gray-700 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || verifyToken.length !== 6}
                className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Verifying...' : 'Verify and Enable'}
              </button>
            </div>
          </form>
        </div>
      )}

      {twoFAEnabled && !setupData && (
        <div className="space-y-4">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
                  Two-factor authentication is enabled
                </h3>
                <p className="mt-2 text-sm text-green-700 dark:text-green-300">
                  Your account is protected with an additional layer of security.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleDisable}
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white py-2 px-4 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
          >
            {loading ? 'Disabling...' : 'Disable Two-Factor Authentication'}
          </button>
        </div>
      )}
    </div>
  );
};

export default TwoFactorSetup;
