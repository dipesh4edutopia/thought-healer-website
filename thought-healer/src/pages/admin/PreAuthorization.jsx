import React, { useState, useEffect, useCallback } from 'react';
import { API_BASE_URL } from '../../config/api';

const PreAuthorization = () => {
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    plan_type: 'premium',
    validity_days: 365,
    notes: ''
  });

  // List state
  const [preAuths, setPreAuths] = useState([]);
  const [total, setTotal] = useState(0);
  const [listLoading, setListLoading] = useState(false);

  // Form state
  const [formLoading, setFormLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);
  const [apiError, setApiError] = useState('');

  // Delete state
  const [deletingId, setDeletingId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null); // { id, email }

  const getAuthHeaders = () => {
    const token = localStorage.getItem('authToken');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };

  const fetchPreAuths = useCallback(async () => {
    setListLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/pre-authorizations`, {
        method: 'GET',
        headers: getAuthHeaders()
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setPreAuths(data.data.pre_authorizations || []);
        setTotal(data.data.total || 0);
      }
    } catch (err) {
      console.error('Error fetching pre-authorizations:', err);
    } finally {
      setListLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPreAuths();
  }, [fetchPreAuths]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Valid email address required';
    }
    if (!['premium', 'ultra'].includes(formData.plan_type)) {
      newErrors.plan_type = 'Invalid plan type';
    }
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

    setFormLoading(true);
    setSuccess(null);
    setApiError('');

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setApiError('Authentication required. Please login again.');
        setFormLoading(false);
        return;
      }

      const requestData = {
        email: formData.email.trim().toLowerCase(),
        plan_type: formData.plan_type,
        validity_days: parseInt(formData.validity_days)
      };
      if (formData.notes.trim()) {
        requestData.notes = formData.notes.trim();
      }

      const response = await fetch(`${API_BASE_URL}/api/admin/pre-authorizations`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(requestData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(data.data.pre_authorization);
        setFormData({ email: '', plan_type: 'premium', validity_days: 365, notes: '' });
        fetchPreAuths();
      } else {
        setApiError(data.error || 'Failed to save pre-authorization');
      }
    } catch (err) {
      console.error('Error saving pre-authorization:', err);
      setApiError('Network error. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteClick = (preAuth) => {
    setDeleteConfirm({ id: preAuth.id, email: preAuth.email });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm) return;
    setDeletingId(deleteConfirm.id);
    setDeleteConfirm(null);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/pre-authorizations/${deleteConfirm.id}`,
        {
          method: 'DELETE',
          headers: getAuthHeaders()
        }
      );
      const data = await response.json();
      if (response.ok && data.success) {
        fetchPreAuths();
      } else {
        setApiError(data.error || 'Failed to delete pre-authorization');
      }
    } catch (err) {
      console.error('Error deleting pre-authorization:', err);
      setApiError('Network error. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleReset = () => {
    setFormData({ email: '', plan_type: 'premium', validity_days: 365, notes: '' });
    setErrors({});
    setSuccess(null);
    setApiError('');
  };

  const getValidityPresets = () => [
    { label: '1 Month', days: 30 },
    { label: '3 Months', days: 90 },
    { label: '6 Months', days: 180 },
    { label: '1 Year', days: 365 },
    { label: '2 Years', days: 730 },
    { label: '5 Years', days: 1825 }
  ];

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
  };

  const getPlanBadge = (plan) => {
    if (plan === 'ultra') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
          Ultra
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300">
        Premium
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Pre-Authorization</h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Pre-authorize subscriptions for users before they sign up. When the user registers with the specified email, they will automatically receive the subscription.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* ── Create Form ── */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-xl">
              🔑
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Pre-Authorization</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Creates or updates existing entry for this email</p>
            </div>
          </div>

          {/* Success Banner */}
          {success && (
            <div className="mb-5 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">✅</span>
                <div>
                  <p className="font-semibold text-green-900 dark:text-green-100 text-sm">
                    Pre-authorization saved successfully!
                  </p>
                  <div className="mt-2 text-sm text-green-800 dark:text-green-200 space-y-0.5">
                    <p><strong>Email:</strong> {success.email}</p>
                    <p><strong>Plan:</strong> <span className="capitalize">{success.plan_type}</span></p>
                    <p><strong>Validity:</strong> {success.validity_days} days</p>
                    {success.notes && <p><strong>Notes:</strong> {success.notes}</p>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error Banner */}
          {apiError && (
            <div className="mb-5 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-xl">❌</span>
                <p className="text-red-900 dark:text-red-100 text-sm">{apiError}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="user@example.com"
                disabled={formLoading}
                className={`w-full px-4 py-2.5 rounded-lg border ${
                  errors.email
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                } text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Plan Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Plan Type <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['premium', 'ultra'].map((plan) => (
                  <label
                    key={plan}
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      formData.plan_type === plan
                        ? plan === 'ultra'
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                          : 'border-teal-500 bg-teal-50 dark:bg-teal-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <input
                      type="radio"
                      name="plan_type"
                      value={plan}
                      checked={formData.plan_type === plan}
                      onChange={handleChange}
                      disabled={formLoading}
                      className="sr-only"
                    />
                    <span className="text-xl">{plan === 'ultra' ? '💎' : '⭐'}</span>
                    <div>
                      <p className={`text-sm font-semibold capitalize ${
                        formData.plan_type === plan
                          ? plan === 'ultra' ? 'text-purple-700 dark:text-purple-300' : 'text-teal-700 dark:text-teal-300'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}>
                        {plan}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Validity Days */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Validity Period <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2 mb-2.5">
                {getValidityPresets().map((preset) => (
                  <button
                    key={preset.days}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, validity_days: preset.days }))}
                    disabled={formLoading}
                    className={`px-2 py-2 text-xs rounded-md border transition-all font-medium ${
                      parseInt(formData.validity_days) === preset.days
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
                disabled={formLoading}
                className={`w-full px-4 py-2.5 rounded-lg border ${
                  errors.validity_days
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                } text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm`}
              />
              {errors.validity_days && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.validity_days}</p>
              )}
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Custom days (1–1825 days max)</p>
            </div>

            {/* Expiry Preview */}
            {parseInt(formData.validity_days) > 0 && (
              <div className="p-3 bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-lg">
                <p className="text-xs text-teal-900 dark:text-teal-100">
                  <strong>Subscription will start on signup and expire on:</strong>{' '}
                  <span className="font-semibold">
                    {new Date(Date.now() + parseInt(formData.validity_days) * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
                      day: '2-digit', month: 'long', year: 'numeric'
                    })}
                  </span>
                </p>
              </div>
            )}

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Notes <span className="text-gray-400 text-xs font-normal">(optional)</span>
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Reason for pre-authorization, campaign name, etc."
                rows={3}
                disabled={formLoading}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm resize-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-1">
              <button
                type="submit"
                disabled={formLoading}
                className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-2.5 px-5 rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {formLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Saving...
                  </span>
                ) : (
                  'Save Pre-Authorization'
                )}
              </button>
              <button
                type="button"
                onClick={handleReset}
                disabled={formLoading}
                className="px-5 py-2.5 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* ── Info Card ── */}
        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-5">
            <div className="flex items-start gap-3">
              <span className="text-2xl">ℹ️</span>
              <div>
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">How Pre-Authorization Works</h4>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1.5 list-disc list-inside">
                  <li>Enter the user's email address before they sign up</li>
                  <li>Select the plan type (Premium or Ultra) and duration</li>
                  <li>When the user registers with that email, the subscription is automatically activated</li>
                  <li>If the email already has a pre-authorization, it will be updated</li>
                  <li>You can delete a pre-authorization before the user signs up</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-5">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Important Notes</h4>
                <ul className="text-sm text-amber-800 dark:text-amber-200 space-y-1.5 list-disc list-inside">
                  <li>Pre-authorization only applies to users who haven't signed up yet</li>
                  <li>To grant subscription to an existing user, use <strong>Grant Subscription</strong> instead</li>
                  <li>Saving a pre-auth for an existing email will overwrite the previous entry</li>
                  <li>Validity countdown starts from the day the user signs up</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Pre-Auth List ── */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-base">
              📋
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Pending Pre-Authorizations</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {listLoading ? 'Loading...' : `${total} total entries`}
              </p>
            </div>
          </div>
          <button
            onClick={fetchPreAuths}
            disabled={listLoading}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-teal-600 dark:text-teal-400 border border-teal-300 dark:border-teal-700 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all disabled:opacity-50"
          >
            <svg className={`w-4 h-4 ${listLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>

        {listLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="flex flex-col items-center gap-3">
              <svg className="animate-spin h-8 w-8 text-teal-500" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <p className="text-sm text-gray-500 dark:text-gray-400">Loading pre-authorizations...</p>
            </div>
          </div>
        ) : preAuths.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="text-5xl mb-4 opacity-40">🔑</div>
            <p className="text-gray-500 dark:text-gray-400 font-medium">No pre-authorizations yet</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              Add one using the form above
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Plan</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Validity</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Created By</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Notes</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {preAuths.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="font-medium text-gray-900 dark:text-white">{item.email}</span>
                      </td>
                      <td className="px-4 py-4">
                        {getPlanBadge(item.plan_type)}
                      </td>
                      <td className="px-4 py-4 text-gray-700 dark:text-gray-300">
                        {item.validity_days} days
                      </td>
                      <td className="px-4 py-4 text-gray-600 dark:text-gray-400 text-xs">
                        {item.created_by || '—'}
                      </td>
                      <td className="px-4 py-4 text-gray-600 dark:text-gray-400 text-xs whitespace-nowrap">
                        {formatDate(item.created_at)}
                      </td>
                      <td className="px-4 py-4 text-gray-500 dark:text-gray-400 text-xs max-w-[200px] truncate">
                        {item.notes || <span className="italic text-gray-400">—</span>}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <button
                          onClick={() => handleDeleteClick(item)}
                          disabled={deletingId === item.id}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {deletingId === item.id ? (
                            <>
                              <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              Deleting...
                            </>
                          ) : (
                            <>
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Delete
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-gray-100 dark:divide-gray-700">
              {preAuths.map((item) => (
                <div key={item.id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white text-sm truncate">{item.email}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{formatDate(item.created_at)}</p>
                    </div>
                    {getPlanBadge(item.plan_type)}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded p-2">
                      <p className="text-gray-500 dark:text-gray-400">Validity</p>
                      <p className="font-medium text-gray-900 dark:text-white mt-0.5">{item.validity_days} days</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded p-2">
                      <p className="text-gray-500 dark:text-gray-400">Created By</p>
                      <p className="font-medium text-gray-900 dark:text-white mt-0.5 truncate">{item.created_by || '—'}</p>
                    </div>
                  </div>
                  {item.notes && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 italic">📝 {item.notes}</p>
                  )}
                  <button
                    onClick={() => handleDeleteClick(item)}
                    disabled={deletingId === item.id}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {deletingId === item.id ? 'Deleting...' : '🗑️ Delete Pre-Authorization'}
                  </button>
                </div>
              ))}
            </div>

            <div className="px-6 py-3 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Showing {preAuths.length} of {total} pre-authorization{total !== 1 ? 's' : ''}
              </p>
            </div>
          </>
        )}
      </div>

      {/* ── Delete Confirmation Modal ── */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-sm w-full p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-xl flex-shrink-0">
                🗑️
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Delete Pre-Authorization</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Are you sure you want to delete the pre-authorization for:
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg px-4 py-2.5 mb-5">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{deleteConfirm.email}</p>
            </div>
            <p className="text-xs text-amber-600 dark:text-amber-400 mb-5">
              ⚠️ This action cannot be undone. If you delete this, the user will not receive the subscription upon signup.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2.5 rounded-lg transition-all text-sm"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreAuthorization;
