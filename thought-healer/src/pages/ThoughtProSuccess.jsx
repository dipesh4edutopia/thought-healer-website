import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

const ThoughtProSuccess = () => {
  const location = useLocation();
  const { plan, paymentId, orderId, subscriptionData } = location.state || { 
    plan: { planOption: 'premium-monthly', price: 299 },
    paymentId: null,
    orderId: null,
    subscriptionData: null
  };
  
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  const planNames = {
    'premium-monthly': 'Premium Monthly',
    'premium-yearly': 'Premium Yearly',
    'ultra-monthly': 'Ultra Monthly',
    'ultra-yearly': 'Ultra Yearly'
  };

  // Fetch subscription status
  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      try {
        if (subscriptionData?.subscription_id) {
          const response = await fetch(`https://thoughtprob2c.thoughthealer.org/api/subscriptions/status?subscription_id=${subscriptionData.subscription_id}`);
          
          if (response.ok) {
            const result = await response.json();
            if (result.success && result.data) {
              setSubscriptionStatus(result.data);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching subscription status:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionStatus();
  }, [subscriptionData]);

  const getNextBillingDate = () => {
    // Use subscription status data if available
    if (subscriptionStatus?.end_date) {
      return new Date(subscriptionStatus.end_date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
    
    // Fallback calculation
    const today = new Date();
    const isYearly = plan.planOption?.includes('yearly');
    const nextDate = new Date(today);
    
    if (isYearly) {
      nextDate.setFullYear(today.getFullYear() + 1);
    } else {
      nextDate.setMonth(today.getMonth() + 1);
    }
    
    return nextDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 via-secondary-500 to-purple-600 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-dark-800 rounded-2xl shadow-2xl p-8 md:p-12 text-center">
        {/* Success Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center animate-bounce">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-500">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9 12l2 2 4-4"></path>
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-dark-900 dark:text-white mb-2">
          Subscription Activated! 🎉
        </h1>
        <p className="text-xl text-dark-600 dark:text-dark-300 mb-8">
          Welcome to ThoughtPro {plan.planOption.includes('ultra') ? 'Ultra' : 'Premium'}
        </p>

        {/* Subscription Details */}
        <div className="bg-dark-50 dark:bg-dark-900/50 rounded-xl p-6 mb-8 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-dark-600 dark:text-dark-400">Plan:</span>
            <span className="font-semibold text-dark-900 dark:text-white">
              {subscriptionStatus?.plan_name || planNames[plan.planOption] || 'Premium'}
            </span>
          </div>
          {paymentId && (
            <div className="flex justify-between items-center">
              <span className="text-dark-600 dark:text-dark-400">Payment ID:</span>
              <span className="font-semibold text-dark-900 dark:text-white text-sm">{paymentId}</span>
            </div>
          )}
          {subscriptionData?.subscription_id && (
            <div className="flex justify-between items-center">
              <span className="text-dark-600 dark:text-dark-400">Subscription ID:</span>
              <span className="font-semibold text-dark-900 dark:text-white text-sm">
                {subscriptionData.subscription_id}
              </span>
            </div>
          )}
          <div className="flex justify-between items-center">
            <span className="text-dark-600 dark:text-dark-400">Status:</span>
            <span className="font-semibold text-green-600 dark:text-green-400">
              {subscriptionStatus?.status || 'Active'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-dark-600 dark:text-dark-400">Next Billing Date:</span>
            <span className="font-semibold text-dark-900 dark:text-white">{getNextBillingDate()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-dark-600 dark:text-dark-400">Amount:</span>
            <span className="font-semibold text-dark-900 dark:text-white">
              ₹{subscriptionStatus?.amount || plan.price}.00
            </span>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-semibold text-dark-900 dark:text-white mb-4">What's Next?</h3>
          <ul className="space-y-3 text-left text-dark-700 dark:text-dark-300">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>All premium features are now unlocked</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Check your email for the receipt</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Start your journey to better mental wellness</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <Link
            to="/subscription-management"
            className="py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all text-center"
          >
            Manage Subscription
          </Link>
          <a
            href="https://play.google.com/store/apps/details?id=com.thoughtpro"
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 border-2 border-primary-500 text-primary-500 rounded-lg font-semibold hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all text-center"
          >
            Download App
          </a>
        </div>

        {/* Support Text */}
        <div className="text-sm text-dark-600 dark:text-dark-400">
          Need help?{' '}
          <a href="#" className="text-primary-500 hover:underline font-medium">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default ThoughtProSuccess;
