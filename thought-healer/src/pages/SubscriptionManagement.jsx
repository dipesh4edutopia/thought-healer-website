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
      
      // Fetch current subscription status
      const statusResponse = await fetch('https://thoughtprob2c.thoughthealer.org/api/subscriptions/status', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Add auth token
        }
      });

      if (statusResponse.ok) {
        const statusResult = await statusResponse.json();
        if (statusResult.success && statusResult.data) {
          setSubscriptionStatus(statusResult.data);
        }
      }

      // Fetch subscription history
      const historyResponse = await fetch('https://thoughtprob2c.thoughthealer.org/api/subscriptions/history', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Add auth token
        }
      });

      if (historyResponse.ok) {
        const historyResult = await historyResponse.json();
        if (historyResult.success && historyResult.data) {
          setSubscriptionHistory(historyResult.data);
        }
      }
    } catch (err) {
      console.error('Error fetching subscription data:', err);
      setError('Failed to load subscription information');
    } finally {
      setLoading(false);
    }
  };

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
          
          {subscriptionStatus ? (
            <>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-dark-600 dark:text-dark-400 mb-2">Plan</p>
                  <p className="text-xl font-semibold text-dark-900 dark:text-white">
                    {subscriptionStatus.plan_name || 'Premium'}
                  </p>
                </div>
                <div>
                  <p className="text-dark-600 dark:text-dark-400 mb-2">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    subscriptionStatus.status === 'active' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                  }`}>
                    {subscriptionStatus.status || 'Active'}
                  </span>
                </div>
                <div>
                  <p className="text-dark-600 dark:text-dark-400 mb-2">Start Date</p>
                  <p className="text-dark-900 dark:text-white">
                    {formatDate(subscriptionStatus.start_date)}
                  </p>
                </div>
                <div>
                  <p className="text-dark-600 dark:text-dark-400 mb-2">End Date</p>
                  <p className="text-dark-900 dark:text-white">
                    {formatDate(subscriptionStatus.end_date)}
                  </p>
                </div>
                <div>
                  <p className="text-dark-600 dark:text-dark-400 mb-2">Amount</p>
                  <p className="text-xl font-semibold text-dark-900 dark:text-white">
                    ₹{subscriptionStatus.amount}
                  </p>
                </div>
              </div>

              {subscriptionStatus.status === 'active' && (
                <button
                  onClick={() => setShowCancelModal(true)}
                  className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                >
                  Cancel Subscription
                </button>
              )}
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

      {/* Cancel Confirmation Modal */}
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
    </div>
  );
};

export default SubscriptionManagement;
