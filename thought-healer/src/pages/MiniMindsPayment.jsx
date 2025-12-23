import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const MiniMindsPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { plan } = location.state || { plan: { planOption: 'premium-monthly', price: 299, tier: 'premium', planId: 'web_premium_monthly' } };

  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: localStorage.getItem('userName') || '',
    email: localStorage.getItem('userEmail') || '',
    phone: '',
    acceptTerms: false
  });

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const createRazorpayOrder = async () => {
    try {
      // Validate user info before creating order
      if (!userInfo.name || !userInfo.email || !userInfo.phone) {
        throw new Error('Please fill in all required fields');
      }

      // Validate phone number format
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(userInfo.phone)) {
        throw new Error('Please enter a valid 10-digit mobile number');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userInfo.email)) {
        throw new Error('Please enter a valid email address');
      }

      const authToken = localStorage.getItem('authToken');
      const isAuthenticated = localStorage.getItem('isAuthenticated');
      
      console.log('Auth check:', { authToken: authToken ? 'exists' : 'missing', isAuthenticated });
      console.log('LocalStorage keys:', Object.keys(localStorage));
      
      if (!authToken || authToken === 'undefined' || authToken === 'null') {
        console.error('❌ No valid auth token found');
        // Try to get from alternative storage or redirect to login
        throw new Error('Please login to continue. Token missing.');
      }

      console.log('Creating order with plan_id:', plan.planId);
      console.log('User info:', { name: userInfo.name, email: userInfo.email, phone: userInfo.phone });
      
      const response = await fetch('https://thoughtprob2c.thoughthealer.org/api/subscriptions/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          plan_id: plan.planId,
          user_name: userInfo.name,
          user_email: userInfo.email,
          user_phone: userInfo.phone,
          user_token: authToken,
          currency: 'INR'
        })
      });

      console.log('Create order response status:', response.status);
      const result = await response.json();
      console.log('Create order response body:', JSON.stringify(result, null, 2));

      if (!response.ok) {
        const errorMsg = result.error || result.message || result.details || `Server error: ${response.status}`;
        console.error('Backend error:', errorMsg);
        throw new Error(errorMsg);
      }

      // Handle different response structures
      let orderData = null;
      
      // Check various possible response structures
      if (result.success && result.data && result.data.order_id) {
        orderData = result.data;
      } else if (result.data && result.data.order_id) {
        orderData = result.data;
      } else if (result.order_id) {
        orderData = result;
      } else if (result.success && result.data && result.data.data && result.data.data.order_id) {
        // Nested data structure
        orderData = result.data.data;
      }

      console.log('Extracted order data:', orderData);

      if (!orderData || !orderData.order_id) {
        console.error('❌ Missing order_id in response');
        console.error('Full response structure:', JSON.stringify(result, null, 2));
        console.error('Available keys:', Object.keys(result));
        if (result.data) {
          console.error('Data keys:', Object.keys(result.data));
        }
        
        throw new Error(
          'Backend response missing order_id. ' +
          'Response: ' + JSON.stringify(result).substring(0, 200)
        );
      }

      return orderData;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  const verifyPayment = async (paymentData) => {
    try {
      const authToken = localStorage.getItem('authToken');
      console.log('Auth token present:', !!authToken);
      
      if (!authToken) {
        throw new Error('Authentication required. Please login again.');
      }

      // Validate payment data
      console.log('Payment data to verify:', paymentData);
      if (!paymentData.razorpay_order_id || !paymentData.razorpay_payment_id || !paymentData.razorpay_signature) {
        console.error('Invalid payment data:', {
          has_order_id: !!paymentData.razorpay_order_id,
          has_payment_id: !!paymentData.razorpay_payment_id,
          has_signature: !!paymentData.razorpay_signature
        });
        throw new Error('Missing required payment data');
      }

      console.log('Sending payment verification request...');
      const response = await fetch('https://thoughtprob2c.thoughthealer.org/api/subscriptions/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(paymentData)
      });

      console.log('Verification response status:', response.status);
      
      const result = await response.json();
      console.log('Verification response body:', result);

      if (!response.ok) {
        throw new Error(result.message || result.error || `Server error: ${response.status}`);
      }

      if (result.success) {
        return result;
      } else {
        throw new Error(result.message || 'Verification failed');
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  };

  const handleRazorpayPayment = async () => {
    if (!userInfo.acceptTerms) {
      setError('Please accept the Terms & Conditions');
      return;
    }

    if (!userInfo.name || !userInfo.email || !userInfo.phone) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log('Creating order for plan:', plan);
      console.log('User info:', userInfo);
      
      // Create order on backend
      const orderData = await createRazorpayOrder();
      console.log('Order created:', orderData);

      // Validate order data
      if (!orderData.order_id) {
        throw new Error('Order ID not received from backend');
      }

      const razorpayKey = orderData.key_id || process.env.REACT_APP_RAZORPAY_KEY_ID;
      if (!razorpayKey) {
        throw new Error('Razorpay key not available');
      }
      console.log('Using Razorpay key:', razorpayKey.substring(0, 15) + '...');

      // Razorpay options
      const options = {
        key: razorpayKey,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'MiniMinds',
        description: `${planNames[plan.planOption]} Subscription`,
        order_id: orderData.order_id,
        prefill: {
          name: userInfo.name,
          email: userInfo.email,
          contact: userInfo.phone
        },
        theme: {
          color: '#3B82F6'
        },
        handler: async function (response) {
          try {
            console.log('Payment handler called');
            console.log('Full Razorpay response:', response);
            console.log('Response keys:', Object.keys(response));
            
            // Validate all required fields are present
            if (!response.razorpay_order_id || !response.razorpay_payment_id || !response.razorpay_signature) {
              console.error('Missing Razorpay response fields:', {
                order_id: response.razorpay_order_id || 'MISSING',
                payment_id: response.razorpay_payment_id || 'MISSING',
                signature: response.razorpay_signature || 'MISSING'
              });
              throw new Error('Incomplete payment response from Razorpay. Please contact support with your payment details.');
            }
            
            // Verify payment on backend - only need 3 Razorpay fields
            const verificationData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            };

            console.log('Sending verification data:', JSON.stringify(verificationData, null, 2));
            const verifyResult = await verifyPayment(verificationData);
            console.log('Verification result:', verifyResult);

            if (verifyResult.success) {
              navigate('/miniminds-success', { 
                state: { 
                  plan,
                  planId: plan.planId,
                  paymentId: response.razorpay_payment_id,
                  orderId: response.razorpay_order_id,
                  subscriptionData: verifyResult.data
                } 
              });
            } else {
              const errorMsg = verifyResult.message || 'Payment verification failed. Please contact support.';
              console.error('Verification failed:', errorMsg);
              setError(errorMsg);
              setLoading(false);
            }
          } catch (error) {
            console.error('Verification error:', error);
            setError(error.message || 'Payment verification failed. Please contact support.');
            setLoading(false);
          }
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
            setError('Payment cancelled');
          }
        }
      };

      // Check if Razorpay is loaded
      if (!window.Razorpay) {
        throw new Error('Razorpay SDK not loaded. Please refresh the page.');
      }

      console.log('Opening Razorpay checkout with options:', {
        key: options.key.substring(0, 15) + '...',
        order_id: options.order_id,
        amount: options.amount
      });

      // Open Razorpay checkout
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment initiation error:', error);
      setError(`Failed to initiate payment: ${error.message}`);
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRazorpayPayment();
  };

  const planNames = {
    'premium-monthly': 'Premium Monthly',
    'premium-yearly': 'Premium Yearly',
    'ultra-monthly': 'Ultra Monthly',
    'ultra-yearly': 'Ultra Yearly'
  };

  const planDescriptions = {
    'premium-monthly': 'Billed monthly',
    'premium-yearly': 'Billed annually',
    'ultra-monthly': 'Billed monthly',
    'ultra-yearly': 'Billed annually'
  };

  const features = {
    premium: [
      '✓ Monitor 50+ Mental Health Issues',
      '✓ Personalized Interventions',
      '✓ Parent Dashboard & Reports'
    ],
    ultra: [
      '✓ Monitor 100+ Mental Health Issues',
      '✓ Advanced Interventions',
      '✓ Expert Guidance & Support',
      '✓ Priority Support'
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-50 to-primary-50 dark:from-dark-900 dark:to-dark-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white/80 dark:bg-dark-800/50 backdrop-blur-xl rounded-2xl p-8 border border-dark-200/50 dark:border-white/10 shadow-xl h-fit">
            <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-6">Order Summary</h2>

            <div className="bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-semibold text-dark-900 dark:text-white mb-2">
                {planNames[plan.planOption]}
              </h3>
              <p className="text-dark-600 dark:text-dark-300">{planDescriptions[plan.planOption]}</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-dark-700 dark:text-dark-300">
                <span>Subtotal</span>
                <span>₹{plan.price}.00</span>
              </div>
              <div className="flex justify-between text-dark-700 dark:text-dark-300">
                <span>Tax</span>
                <span>₹0.00</span>
              </div>
              <div className="border-t border-dark-200 dark:border-dark-700 pt-4 flex justify-between text-lg font-bold text-dark-900 dark:text-white">
                <span>Total</span>
                <span>₹{plan.price}.00</span>
              </div>
            </div>

            <div className="bg-dark-50 dark:bg-dark-900/50 rounded-lg p-4">
              <h4 className="font-semibold text-dark-900 dark:text-white mb-3">What's Included:</h4>
              <ul className="space-y-2 text-sm text-dark-600 dark:text-dark-300">
                {features[plan.tier].map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white/80 dark:bg-dark-800/50 backdrop-blur-xl rounded-2xl p-8 border border-dark-200/50 dark:border-white/10 shadow-xl">
            <h1 className="text-3xl font-bold text-dark-900 dark:text-white mb-6">Complete Your Purchase</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-300">
                  {error}
                </div>
              )}

              {/* Payment Method Info */}
              <div className="bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">💳</span>
                  <h3 className="text-lg font-semibold text-dark-900 dark:text-white">Razorpay Secure Payment</h3>
                </div>
                <p className="text-sm text-dark-600 dark:text-dark-300">
                  Pay securely with Credit/Debit Card, UPI, Net Banking, or Wallet
                </p>
              </div>

              {/* User Details */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={userInfo.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-white dark:bg-dark-700 border border-dark-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-dark-900 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={userInfo.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-white dark:bg-dark-700 border border-dark-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-dark-900 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={userInfo.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    pattern="[0-9]{10}"
                    maxLength="10"
                    className="w-full px-4 py-3 bg-white dark:bg-dark-700 border border-dark-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-dark-900 dark:text-white"
                    required
                  />
                </div>
              </div>

              {/* Terms */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    name="acceptTerms"
                    checked={userInfo.acceptTerms}
                    onChange={handleChange}
                    className="mt-1 w-5 h-5 text-primary-500 border-dark-300 rounded focus:ring-primary-500"
                    required
                  />
                  <span className="text-sm text-dark-600 dark:text-dark-300">
                    I agree to the{' '}
                    <a href="/terms&condition.html" target="_blank" className="text-primary-500 hover:underline">
                      Terms & Conditions
                    </a>{' '}
                    and{' '}
                    <a href="/Privacy_policy.html" target="_blank" className="text-primary-500 hover:underline">
                      Privacy Policy
                    </a>
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>🔒</span>
                    <span>Pay ₹{plan.price} with Razorpay</span>
                  </>
                )}
              </button>

              {/* Security Badges */}
              <div className="text-center text-sm text-dark-500 dark:text-dark-400">
                🔒 Razorpay Secure | 🛡️ SSL Encrypted | ✓ PCI DSS Compliant
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniMindsPayment;