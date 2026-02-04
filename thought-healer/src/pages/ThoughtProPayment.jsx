import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import API_BASE_URL from '../config/api';

const ThoughtProPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { plan } = location.state || { plan: { planOption: 'premium-monthly', price: 299, tier: 'premium', planId: 'web_premium_monthly' } };

  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponValidating, setCouponValidating] = useState(false);
  const [couponError, setCouponError] = useState(null);
  const [discountInfo, setDiscountInfo] = useState(null);
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

  const validateCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }

    setCouponValidating(true);
    setCouponError(null);

    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        throw new Error('Please login to apply coupon');
      }

      // Validate coupon
      const response = await fetch(`${API_BASE_URL}/api/coupons/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ code: couponCode.trim().toUpperCase() })
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Invalid coupon code');
      }

      // Calculate discount preview
      const discount = Math.round((plan.price * result.data.discountPercentage) / 100);
      const finalPrice = plan.price - discount;

      setDiscountInfo({
        code: couponCode.trim().toUpperCase(),
        discountPercentage: result.data.discountPercentage,
        discountAmount: discount,
        finalPrice: finalPrice,
        originalPrice: plan.price
      });

      setCouponApplied(true);
      setCouponError(null);
    } catch (error) {
      console.error('Coupon validation error:', error);
      setCouponError(error.message);
      setCouponApplied(false);
      setDiscountInfo(null);
    } finally {
      setCouponValidating(false);
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setCouponApplied(false);
    setDiscountInfo(null);
    setCouponError(null);
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
      
      const requestBody = {
        plan_id: plan.planId,
        user_name: userInfo.name,
        user_email: userInfo.email,
        user_phone: userInfo.phone,
        user_token: authToken,
        currency: 'INR'
      };

      // Add coupon code if applied
      if (couponApplied && discountInfo) {
        requestBody.coupon_code = discountInfo.code;
      }

      const response = await fetch(`${API_BASE_URL}/api/subscriptions/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(requestBody)
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

      // Add coupon code if applied
      if (couponApplied && discountInfo) {
        paymentData.coupon_code = discountInfo.code;
      }

      console.log('Sending payment verification request...');
      const response = await fetch(`${API_BASE_URL}/api/subscriptions/verify-payment`, {
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
        name: 'ThoughtPro',
        description: `${planNames[plan.planOption]} Subscription`,
        order_id: orderData.order_id,
        prefill: {
          name: userInfo.name,
          email: userInfo.email,
          contact: userInfo.phone
        },
        theme: {
          color: '#8B5CF6'
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
              navigate('/thoughtpro-success', { 
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
      '✓ 10+ Advanced Scans',
      '✓ Primary & Secondary Interventions',
      '✓ Video Tertiary Content'
    ],
    ultra: [
      '✓ 100+ Advanced Scans',
      '✓ All Interventions',
      '✓ Professional Sessions',
      '✓ Priority Support'
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-50 to-primary-50 dark:from-dark-900 dark:to-dark-800 py-8 sm:py-12 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Order Summary */}
          <div className="bg-white/80 dark:bg-dark-800/50 backdrop-blur-xl rounded-2xl p-4 sm:p-6 lg:p-8 border border-dark-200/50 dark:border-white/10 shadow-xl h-fit">
            <h2 className="text-xl sm:text-2xl font-bold text-dark-900 dark:text-white mb-4 sm:mb-6">Order Summary</h2>

            <div className="bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-semibold text-dark-900 dark:text-white mb-2">
                {planNames[plan.planOption]}
              </h3>
              <p className="text-sm sm:text-base text-dark-600 dark:text-dark-300">{planDescriptions[plan.planOption]}</p>
            </div>

            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
              <div className="flex justify-between text-sm sm:text-base text-dark-700 dark:text-dark-300">
                <span>Subtotal</span>
                <span>₹{plan.price}.00</span>
              </div>
              {couponApplied && discountInfo && (
                <div className="flex justify-between text-sm sm:text-base text-green-600 dark:text-green-400">
                  <span>Coupon Discount ({discountInfo.discountPercentage}%)</span>
                  <span>-₹{discountInfo.discountAmount}.00</span>
                </div>
              )}
              <div className="flex justify-between text-dark-700 dark:text-dark-300">
                <span>Tax</span>
                <span>₹0.00</span>
              </div>
              <div className="border-t border-dark-200 dark:border-dark-700 pt-3 sm:pt-4 flex justify-between text-base sm:text-lg font-bold text-dark-900 dark:text-white">
                <span>Total</span>
                <span>₹{couponApplied && discountInfo ? discountInfo.finalPrice : plan.price}.00</span>
              </div>
              {couponApplied && discountInfo && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                  <p className="text-sm text-green-700 dark:text-green-300">
                    🎉 You save ₹{discountInfo.discountAmount} with coupon <strong>{discountInfo.code}</strong>
                  </p>
                </div>
              )}
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
          <div className="bg-white/80 dark:bg-dark-800/50 backdrop-blur-xl rounded-2xl p-4 sm:p-6 lg:p-8 border border-dark-200/50 dark:border-white/10 shadow-xl">
            <h1 className="text-2xl sm:text-3xl font-bold text-dark-900 dark:text-white mb-4 sm:mb-6">Complete Your Purchase</h1>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-300">
                  {error}
                </div>
              )}

              {/* Payment Method Info */}
              <div className="bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-xl p-4 sm:p-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <span className="text-2xl sm:text-3xl">💳</span>
                  <h3 className="text-base sm:text-lg font-semibold text-dark-900 dark:text-white">Razorpay Secure Payment</h3>
                </div>
                <p className="text-xs sm:text-sm text-dark-600 dark:text-dark-300">
                  Pay securely with Credit/Debit Card, UPI, Net Banking, or Wallet
                </p>
              </div>

              {/* Coupon Code Section */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300">
                  Have a Coupon Code?
                </label>
                {!couponApplied ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="Enter coupon code"
                      className="flex-1 px-4 py-3 bg-white dark:bg-dark-700 border border-dark-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-dark-900 dark:text-white uppercase"
                      disabled={couponValidating}
                    />
                    <button
                      type="button"
                      onClick={validateCoupon}
                      disabled={couponValidating || !couponCode.trim()}
                      className="px-6 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {couponValidating ? 'Validating...' : 'Apply'}
                    </button>
                  </div>
                ) : (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-green-700 dark:text-green-300">
                        ✓ Coupon Applied: {discountInfo.code}
                      </p>
                      <p className="text-xs text-green-600 dark:text-green-400">
                        {discountInfo.discountPercentage}% discount • Save ₹{discountInfo.discountAmount}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-red-500 hover:text-red-600 font-semibold text-sm"
                    >
                      Remove
                    </button>
                  </div>
                )}
                {couponError && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {couponError}
                  </p>
                )}
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
                    <Link to="/terms-and-conditions" target="_blank" className="text-primary-500 hover:underline">
                      Terms & Conditions
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy-policy" target="_blank" className="text-primary-500 hover:underline">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 sm:py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-semibold text-base sm:text-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>🔒</span>
                    <span>Pay ₹{couponApplied && discountInfo ? discountInfo.finalPrice : plan.price} with Razorpay</span>
                  </>
                )}
              </button>

              {/* Security Badges */}
              <div className="text-center text-xs sm:text-sm text-dark-500 dark:text-dark-400">
                🔒 Razorpay Secure | 🛡️ SSL Encrypted | ✓ PCI DSS Compliant
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThoughtProPayment;
