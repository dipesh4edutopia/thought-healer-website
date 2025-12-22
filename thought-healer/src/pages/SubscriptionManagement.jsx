import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SubscriptionManagement = () => {
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [subscriptionHistory, setSubscriptionHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    fetchSubscriptionData();
  }, []);

  const fetchSubscriptionData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const authToken = localStorage.getItem('authToken');
      console.log('Fetching subscription data with token:', authToken ? 'Token present' : 'No token');
      
      // Fetch current subscription status
      const statusResponse = await fetch('https://thoughtprob2c.thoughthealer.org/api/subscriptions/status', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Subscription status response:', statusResponse.status);
      
      if (statusResponse.ok) {
        const statusResult = await statusResponse.json();
        console.log('Full API Response:', statusResult);
        
        if (statusResult.success && statusResult.data && statusResult.data.data) {
          // Handle nested data structure: response.data.data
          const subscriptionData = statusResult.data.data;
          console.log('Parsed subscription data:', subscriptionData);
          setSubscriptionStatus(subscriptionData);
        } else if (statusResult.success && statusResult.data) {
          // Fallback for direct data structure
          console.log('Using direct data structure:', statusResult.data);
          setSubscriptionStatus(statusResult.data);
        } else {
          console.log('No subscription data found in response');
          setSubscriptionStatus(null);
        }
      } else {
        const errorResult = await statusResponse.json();
        console.error('API Error Response:', errorResult);
        setError(errorResult.message || `HTTP ${statusResponse.status}: Failed to fetch subscription data`);
      }

      // Fetch subscription history
      const historyResponse = await fetch('https://thoughtprob2c.thoughthealer.org/api/subscriptions/history', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('History response status:', historyResponse.status);
      
      if (historyResponse.ok) {
        const historyResult = await historyResponse.json();
        console.log('History API Response:', historyResult);
        
        if (historyResult.success && historyResult.data) {
          // Handle both nested and direct data structures
          const historyData = historyResult.data.data || historyResult.data;
          setSubscriptionHistory(Array.isArray(historyData) ? historyData : []);
        }
      } else {
        const historyErrorResult = await historyResponse.json();
        console.error('History API Error:', historyErrorResult);
      }
    } catch (err) {
      console.error('Error fetching subscription data:', err);
      setError('Failed to load subscription information: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // COMMENTED OUT: Subscription cancellation flow
  /*
  const handleCancelSubscription = async () => {
    if (!subscriptionStatus?.subscription_id) {
      setError('No active subscription found');
      return;
    }

    setCancelLoading(true);
    try {
      const response = await fetch(
        `https://thoughtprob2c.thoughthealer.org/api/subscriptions/cancel/${subscriptionStatus.subscription_id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        }
      );

      const result = await response.json();

      if (result.success) {
        alert('Subscription cancelled successfully');
        setShowCancelModal(false);
        fetchSubscriptionData(); // Refresh data
      } else {
        setError(result.message || 'Failed to cancel subscription');
      }
    } catch (err) {
      console.error('Error cancelling subscription:', err);
      setError('Failed to cancel subscription');
    } finally {
      setCancelLoading(false);
    }
  };
  */

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-primary-500 border-t-transparent"></div>
          <p className="mt-4 text-dark-600 dark:text-dark-300">Loading subscription data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-dark-900/80 backdrop-blur-xl border-b border-dark-200/50 dark:border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link to="/thoughtpro" className="flex items-center space-x-2">
            <span className="text-3xl">🧠</span>
            <span className="text-xl font-bold text-dark-900 dark:text-white">ThoughtPro</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-dark-900 dark:text-white mb-8">Subscription Management</h1>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6 text-red-700 dark:text-red-300">
            {error}
          </div>
        )}

        {/* Current Subscription */}
        <div className="bg-white/80 dark:bg-dark-800/50 backdrop-blur-xl rounded-2xl p-8 border border-dark-200/50 dark:border-white/10 shadow-xl mb-8">
          <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-6">Current Subscription</h2>
          
          {/* Debug Info - Remove in production */}
          {subscriptionStatus && (
            <details className="mb-6 bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
              <summary className="cursor-pointer text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                🐛 Debug: Raw API Data (Click to expand)
              </summary>
              <pre className="text-xs text-gray-600 dark:text-gray-400 overflow-auto max-h-40 bg-gray-100 dark:bg-gray-800 p-2 rounded">
                {JSON.stringify(subscriptionStatus, null, 2)}
              </pre>
            </details>
          )}
          
          {subscriptionStatus ? (
            <>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <p className="text-dark-600 dark:text-dark-400 mb-2">Plan Type</p>
                  <p className="text-xl font-semibold text-dark-900 dark:text-white capitalize">
                    {subscriptionStatus.plan_type || 'Unknown'}
                  </p>
                </div>
                <div>
                  <p className="text-dark-600 dark:text-dark-400 mb-2">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    subscriptionStatus.is_active 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {subscriptionStatus.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div>
                  <p className="text-dark-600 dark:text-dark-400 mb-2">Days Remaining</p>
                  <p className="text-xl font-semibold text-dark-900 dark:text-white">
                    {subscriptionStatus.days_remaining || 0} days
                  </p>
                </div>
                <div>
                  <p className="text-dark-600 dark:text-dark-400 mb-2">Plan ID</p>
                  <p className="text-dark-900 dark:text-white font-mono text-sm">
                    {subscriptionStatus.plan_id || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-dark-600 dark:text-dark-400 mb-2">Subscription ID</p>
                  <p className="text-dark-900 dark:text-white font-mono">
                    #{subscriptionStatus.subscription_id || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-dark-600 dark:text-dark-400 mb-2">Source</p>
                  <p className="text-dark-900 dark:text-white capitalize">
                    {subscriptionStatus.source || 'Unknown'}
                  </p>
                </div>
                <div className="md:col-span-3">
                  <p className="text-dark-600 dark:text-dark-400 mb-2">Expiry Date</p>
                  <p className="text-lg font-semibold text-dark-900 dark:text-white">
                    {subscriptionStatus.expiry_date ? formatDate(subscriptionStatus.expiry_date) : 'Not available'}
                  </p>
                </div>
              </div>
              
              {/* Additional Info Section */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6">
                <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Subscription Details</h3>
                <div className="text-sm text-blue-700 dark:text-blue-400">
                  <p className="mb-1"><strong>Plan:</strong> {subscriptionStatus.plan_type} ({subscriptionStatus.plan_id})</p>
                  <p className="mb-1"><strong>Status:</strong> {subscriptionStatus.is_active ? 'Active' : 'Inactive'}</p>
                  <p className="mb-1"><strong>Time Remaining:</strong> {subscriptionStatus.days_remaining} days</p>
                  <p><strong>Subscription Source:</strong> {subscriptionStatus.source}</p>
                </div>
              </div>

              {/* COMMENTED OUT: Cancel subscription button */}
              {/*
              {subscriptionStatus.is_active && (
                <button
                  onClick={() => setShowCancelModal(true)}
                  className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                >
                  Cancel Subscription
                </button>
              )}
              */}
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-dark-600 dark:text-dark-400 mb-4">No active subscription</p>
              <Link
                to="/thoughtpro-plans"
                className="inline-block px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:shadow-lg transition-all"
              >
                View Plans
              </Link>
            </div>
          )}
        </div>

        {/* Subscription History */}
        <div className="bg-white/80 dark:bg-dark-800/50 backdrop-blur-xl rounded-2xl p-8 border border-dark-200/50 dark:border-white/10 shadow-xl">
          <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-6">Subscription History</h2>
          
          {subscriptionHistory.length > 0 ? (
            <div className="space-y-4">
              {subscriptionHistory.map((item, index) => (
                <div
                  key={index}
                  className="border border-dark-200 dark:border-dark-700 rounded-lg p-4 hover:bg-dark-50 dark:hover:bg-dark-900/50 transition-all"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-dark-900 dark:text-white">
                        {item.plan_name}
                      </h3>
                      <p className="text-sm text-dark-600 dark:text-dark-400">
                        {formatDate(item.start_date)} - {formatDate(item.end_date)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-dark-900 dark:text-white">₹{item.amount}</p>
                      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                        item.status === 'active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : item.status === 'cancelled'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                  {item.payment_id && (
                    <p className="text-xs text-dark-500 dark:text-dark-500">
                      Payment ID: {item.payment_id}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-dark-600 dark:text-dark-400 py-8">
              No subscription history available
            </p>
          )}
        </div>
      </div>

      {/* COMMENTED OUT: Cancel Confirmation Modal */}
      {/*
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-dark-800 rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-dark-900 dark:text-white mb-4">
              Cancel Subscription?
            </h3>
            <p className="text-dark-600 dark:text-dark-300 mb-6">
              Are you sure you want to cancel your subscription? You will lose access to premium features.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowCancelModal(false)}
                disabled={cancelLoading}
                className="flex-1 px-6 py-3 border-2 border-dark-300 dark:border-dark-600 text-dark-900 dark:text-white rounded-lg hover:bg-dark-50 dark:hover:bg-dark-700 transition-all"
              >
                Keep Subscription
              </button>
              <button
                onClick={handleCancelSubscription}
                disabled={cancelLoading}
                className="flex-1 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all disabled:opacity-50"
              >
                {cancelLoading ? 'Cancelling...' : 'Cancel Subscription'}
              </button>
            </div>
          </div>
        </div>
      )}
      */}
    </div>
  );
};

export default SubscriptionManagement;
