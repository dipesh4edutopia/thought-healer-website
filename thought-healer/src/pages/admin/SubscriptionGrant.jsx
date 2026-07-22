import React, { useState } from 'react';
import { API_BASE_URL } from '../../config/api';

const SubscriptionGrant = () => {
  const [formData, setFormData] = useState({
    searchType: 'email',
    email: '',
    user_id: '',
    product: 'thoughtpro',
    plan_type: 'premium',
    validity_days: 365
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // User identifier validation
    if (formData.searchType === 'email') {
      if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }
    } else {
      if (!formData.user_id || formData.user_id <= 0) {
        newErrors.user_id = 'Valid User ID required';
      }
    }
    
    // Plan type validation
    if (!['premium', 'ultra'].includes(formData.plan_type)) {
      newErrors.plan_type = 'Invalid plan type';
    }
    
    // Validity days validation
    const days = parseInt(formData.validity_days);
    if (isNaN(days) || days < 1 || days > 1825) {
      newErrors.validity_days = 'Must be between 1 and 1825 days';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setSuccess(null);
    setErrors({});
    
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setErrors({ api: 'Authentication required. Please login again.' });
        setLoading(false);
        return;
      }

      const requestData = {
        plan_type: formData.plan_type,
        validity_days: parseInt(formData.validity_days)
      };
      
      if (formData.searchType === 'email') {
        requestData.email = formData.email;
      } else {
        requestData.user_id = parseInt(formData.user_id);
      }

      const response = await fetch(`${API_BASE_URL}/api/admin/subscriptions/grant`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess({
          message: data.message,
          user: data.data.user,
          subscription: data.data.subscription,
          emailSent: data.data.email_sent
        });
        
        // Reset form
        setFormData({
          searchType: 'email',
          email: '',
          user_id: '',
          plan_type: 'premium',
          validity_days: 365
        });
      } else {
        setErrors({ api: data.error || 'Failed to grant subscription' });
      }
    } catch (error) {
      console.error('Error granting subscription:', error);
      setErrors({ api: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      searchType: 'email',
      email: '',
      user_id: '',
      plan_type: 'premium',
      validity_days: 365
    });
    setErrors({});
    setSuccess(null);
  };

  const getValidityPresets = () => [
    { label: '1 Month', days: 30 },
    { label: '3 Months', days: 90 },
    { label: '6 Months', days: 180 },
    { label: '1 Year', days: 365 },
    { label: '2 Years', days: 730 },
    { label: '5 Years', days: 1825 }
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Grant Subscription</h2>
          <p className="text-gray-600 dark:text-gray-400">Grant Premium or Ultra subscription to users</p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div className="flex-1">
                <h3 className="font-semibold text-green-900 dark:text-green-100 mb-3">{success.message}</h3>
                <div className="space-y-2">
                  <div className="p-3 bg-white dark:bg-gray-800 rounded border border-green-200 dark:border-green-700">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">User Details</p>
                    <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <p><strong>ID:</strong> {success.user.id}</p>
                      <p><strong>Username:</strong> {success.user.username}</p>
                      <p><strong>Email:</strong> {success.user.email}</p>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-white dark:bg-gray-800 rounded border border-green-200 dark:border-green-700">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Subscription Details</p>
                    <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <p><strong>Plan:</strong> <span className="uppercase font-semibold text-teal-600 dark:text-teal-400">{success.subscription.plan_type}</span></p>
                      <p><strong>Valid Till:</strong> {new Date(success.subscription.valid_till).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</p>
                      <p><strong>Validity:</strong> {success.subscription.validity_days} days</p>
                      <p className="pt-2 border-t border-green-200 dark:border-green-700">
                        <strong>License Code:</strong> 
                        <code className="block mt-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs font-mono">
                          {success.subscription.license_code}
                        </code>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <strong>Notification Email:</strong>
                    {success.emailSent ? (
                      <span className="text-green-600 dark:text-green-400 flex items-center gap-1">
                        ✅ Successfully Sent
                      </span>
                    ) : (
                      <span className="text-red-600 dark:text-red-400 flex items-center gap-1">
                        ❌ Failed to Send
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {errors.api && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-center gap-3">
              <span className="text-2xl">❌</span>
              <p className="text-red-900 dark:text-red-100">{errors.api}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Search Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Search User By
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="searchType"
                  value="email"
                  checked={formData.searchType === 'email'}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                />
                <span className="text-gray-700 dark:text-gray-300">Email Address</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="searchType"
                  value="user_id"
                  checked={formData.searchType === 'user_id'}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                />
                <span className="text-gray-700 dark:text-gray-300">User ID</span>
              </label>
            </div>
          </div>

          {/* Email or User ID */}
          {formData.searchType === 'email' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                User Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="user@example.com"
                disabled={loading}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.email 
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                } text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
              )}
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                User ID <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="user_id"
                value={formData.user_id}
                onChange={handleChange}
                placeholder="123"
                disabled={loading}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.user_id 
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                } text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all`}
              />
              {errors.user_id && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.user_id}</p>
              )}
            </div>
          )}

          {/* Target Product */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Target Product <span className="text-red-500">*</span>
            </label>
            <select
              name="product"
              value={formData.product}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            >
              <option value="thoughtpro">ThoughtPro</option>
              <option value="miniminds">MiniMinds</option>
              <option value="les">LES (Learning Support)</option>
            </select>
          </div>

          {/* Plan Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Plan Type <span className="text-red-500">*</span>
            </label>
            <select
              name="plan_type"
              value={formData.plan_type}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            >
              <option value="premium">Premium</option>
              <option value="ultra">Ultra</option>
            </select>
          </div>

          {/* Validity Days */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Validity Period <span className="text-red-500">*</span>
            </label>
            
            {/* Quick Presets */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
              {getValidityPresets().map((preset) => (
                <button
                  key={preset.days}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, validity_days: preset.days }))}
                  disabled={loading}
                  className={`px-3 py-2 text-sm rounded border transition-all ${
                    formData.validity_days == preset.days
                      ? 'bg-teal-500 text-white border-teal-500'
                      : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <input
              type="number"
              name="validity_days"
              value={formData.validity_days}
              onChange={handleChange}
              placeholder="365"
              min="1"
              max="1825"
              disabled={loading}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.validity_days 
                  ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                  : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
              } text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all`}
            />
            {errors.validity_days && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.validity_days}</p>
            )}
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Enter days (1-1825). Maximum: 5 years
            </p>
          </div>

          {/* Preview */}
          {formData.validity_days > 0 && (
            <div className="p-4 bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-lg">
              <p className="text-sm text-teal-900 dark:text-teal-100">
                <strong>Preview:</strong> Subscription will expire on{' '}
                <span className="font-semibold">
                  {new Date(Date.now() + formData.validity_days * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Granting Subscription...
                </span>
              ) : (
                'Grant Subscription'
              )}
            </button>
            
            <button
              type="button"
              onClick={handleReset}
              disabled={loading}
              className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionGrant;
