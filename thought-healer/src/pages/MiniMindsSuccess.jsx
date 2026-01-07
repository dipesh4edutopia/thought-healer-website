import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

const MiniMindsSuccess = () => {
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
    const now = new Date();
    if (plan.planOption?.includes('yearly')) {
      return new Date(now.setFullYear(now.getFullYear() + 1)).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } else {
      return new Date(now.setMonth(now.getMonth() + 1)).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900 flex flex-col justify-center py-8 sm:py-12 px-3 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-3 sm:mb-4">
            <svg className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <div className="flex justify-center items-center space-x-2 mb-3 sm:mb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm sm:text-lg">MM</span>
            </div>
            <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">MiniMinds</span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
            Payment Successful!
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 px-2">
            Welcome to MiniMinds {planNames[plan.planOption] || plan.planOption}
          </p>
        </div>
      </div>

      <div className="mt-6 sm:mt-8 sm:mx-auto sm:w-full sm:max-w-lg px-4 sm:px-0">
        <div className="bg-white dark:bg-gray-800 py-6 sm:py-8 px-4 sm:px-10 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700">
          {/* Subscription Details */}
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-3 sm:p-4">
              <h3 className="text-base sm:text-lg font-medium text-green-800 dark:text-green-200 mb-2 sm:mb-3">
                Subscription Activated
              </h3>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-green-700 dark:text-green-300">Plan:</span>
                  <span className="font-medium text-green-800 dark:text-green-200">
                    {planNames[plan.planOption] || plan.planOption}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700 dark:text-green-300">Amount Paid:</span>
                  <span className="font-medium text-green-800 dark:text-green-200">₹{plan.price}</span>
                </div>
                {paymentId && (
                  <div className="flex justify-between">
                    <span className="text-green-700 dark:text-green-300">Payment ID:</span>
                    <span className="font-medium text-green-800 dark:text-green-200 text-xs">
                      {paymentId.substring(0, 20)}...
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-green-700 dark:text-green-300">Next Billing:</span>
                  <span className="font-medium text-green-800 dark:text-green-200">
                    {getNextBillingDate()}
                  </span>
                </div>
              </div>
            </div>

            {/* Features Unlocked */}
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3 sm:p-4">
              <h3 className="text-base sm:text-lg font-medium text-blue-800 dark:text-blue-200 mb-2 sm:mb-3">
                Features Unlocked
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-blue-700 dark:text-blue-300">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Monitor 50+ Mental Health Issues
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Personalized Interventions for Your Child
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Parent Dashboard & Detailed Reports
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Expert Guidance & Support
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Child-friendly Interface & Games
                </li>
              </ul>
            </div>

            {/* Next Steps */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">What's Next?</h3>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Download MiniMinds App</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Get the app on your device to start monitoring</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Set Up Child Profile</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Create a profile for your child to get started</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">3</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Begin Monitoring</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Start tracking your child's mental health journey</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 sm:space-y-3">
              <a
                href="#" 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 sm:py-3 px-4 rounded-md font-medium text-sm sm:text-base hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 text-center block"
              >
                Download MiniMinds App
              </a>
              
              <Link
                to="/subscription-management"
                className="w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2.5 sm:py-3 px-4 rounded-md font-medium text-sm sm:text-base border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 text-center block"
              >
                Manage Subscription
              </Link>
            </div>

            {/* Support */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
              <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                <p>Need help getting started?</p>
                <a href="#" className="text-blue-600 hover:text-blue-500 dark:text-blue-400 font-medium">
                  Contact our support team
                </a>
              </div>
            </div>

            {/* Home Link */}
            <div className="text-center">
              <Link to="/" className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400">
                ← Back to home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniMindsSuccess;