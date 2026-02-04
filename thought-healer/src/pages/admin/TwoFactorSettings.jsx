import React from 'react';
import TwoFactorSetup from '../../components/TwoFactorSetup';

const TwoFactorSettingsPage = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Security Settings</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage your two-factor authentication settings
        </p>
      </div>
      
      <TwoFactorSetup />
      
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h3 className="text-lg font-medium text-blue-900 dark:text-blue-200 mb-3">
          About Two-Factor Authentication
        </h3>
        <div className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
          <p>
            • Two-factor authentication (2FA) adds an extra layer of security to your account
          </p>
          <p>
            • You'll need both your password and a code from your authenticator app to sign in
          </p>
          <p>
            • Supported apps: Google Authenticator, Authy, Microsoft Authenticator, and more
          </p>
          <p>
            • Keep your backup codes in a safe place - they can be used if you lose access to your authenticator app
          </p>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorSettingsPage;
