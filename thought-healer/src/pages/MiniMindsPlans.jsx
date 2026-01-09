import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MiniMindsPlans = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [redeemCode, setRedeemCode] = useState('');
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch plans from API (same as ThoughtPro)
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://thoughtprob2c.thoughthealer.org/api/subscriptions/plans');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success && result.data && result.data.data) {
          // Use same plans as ThoughtPro - no filtering
          const apiPlans = result.data.data;
          const groupedPlans = transformApiPlans(apiPlans);
          setPlans(groupedPlans);
          setError(null);
        } else {
          throw new Error('Invalid API response format');
        }
      } catch (err) {
        console.error('Error fetching plans:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  // Transform API plans data (adapted from ThoughtPro)
  const transformApiPlans = (apiPlans) => {
    const planTypes = {};
    apiPlans.forEach(plan => {
      const type = plan.plan_type?.toLowerCase() || 'unknown';
      if (!planTypes[type]) {
        planTypes[type] = {
          id: type,
          name: type.charAt(0).toUpperCase() + type.slice(1),
          tier: type,
          monthly: null,
          yearly: null
        };
      }
      const isYearly = plan.validity_days >= 365;
      if (isYearly) {
        planTypes[type].yearly = plan;
      } else {
        planTypes[type].monthly = plan;
      }
    });
    return Object.values(planTypes).map((planGroup, index) => {
      const isPremium = planGroup.tier === 'premium';
      const monthly = planGroup.monthly;
      const yearly = planGroup.yearly;
      let yearlySavings = null;
      if (monthly && yearly) {
        const monthlyCost = monthly.price_inr * 12;
        const savings = Math.round(((monthlyCost - yearly.price_inr) / monthlyCost) * 100);
        yearlySavings = `${savings}%`;
      }
      return {
        id: planGroup.id,
        name: planGroup.name,
        description: isPremium ? 'Perfect for child wellness monitoring' : 'Complete child mental health experience',
        tier: planGroup.tier,
        icon: isPremium ? '⭐' : '💎',
        monthlyPrice: monthly ? Math.round(monthly.price_inr) : null,
        yearlyPrice: yearly ? Math.round(yearly.price_inr) : null,
        monthlyOriginalPrice: monthly ? Math.round(monthly.price_inr * 2.5) : null,
        yearlyOriginalPrice: yearly ? Math.round(yearly.price_inr * 2.5) : null,
        monthlyPlanId: monthly ? monthly.plan_id : null,
        yearlyPlanId: yearly ? yearly.plan_id : null,
        yearlySavings: yearlySavings,
        isPopular: !isPremium,
        highlights: isPremium 
          ? ['Child-focused wellness access', '10+ Mental health scans', 'Age-appropriate interventions']
          : ['All Premium features', '100+ Child assessments', 'All Intervention levels'],
        features: isPremium
          ? ['Child-focused wellness access', '10+ Mental health scans for children', 'Age-appropriate Primary & Secondary Interventions', 'Child-friendly video content', 'Parent guidance & support']
          : ['All Premium features', '100+ Comprehensive child assessments', 'All intervention levels', 'Child psychologist consultations', 'Family therapy resources', 'Crisis intervention for children', 'Priority parent support']
      };
    });
  };

  const handlePlanSelect = (planOption, price, tier, planId) => {
    setSelectedPlan({ planOption, price, tier, planId });
    // Scroll to subscribe button
    document.getElementById('main-subscribe-btn')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubscribe = () => {
    if (selectedPlan) {
      // Store plan info for MiniMinds payment
      localStorage.setItem('selectedPlan', JSON.stringify(selectedPlan));
      localStorage.setItem('product', 'miniminds'); // Ensure product context
      
      // Navigate to MiniMinds payment with plan data
      navigate('/miniminds-payment', {
        state: {
          plan: selectedPlan
        }
      });
    } else {
      alert('Please select a plan first!');
    }
  };

  const handleRedeem = () => {
    if (redeemCode.trim()) {
      alert(`Redeeming code: ${redeemCode}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-blue-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-float-reverse"></div>
        <div className="absolute top-40 right-40 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl animate-pulse-slow"></div>
        <div className="absolute text-6xl animate-float" style={{top: '10%', left: '15%'}}>🧠</div>
        <div className="absolute text-5xl animate-float-reverse" style={{top: '20%', right: '20%'}}>✨</div>
        <div className="absolute text-6xl animate-float" style={{bottom: '15%', left: '25%'}}>👨‍👩‍👧‍👦</div>
        <div className="absolute text-5xl animate-float-reverse" style={{bottom: '25%', right: '15%'}}>💫</div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 bg-white/80 dark:bg-dark-900/80 backdrop-blur-xl border-b border-dark-200/50 dark:border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-wrap justify-between items-center gap-2 sm:gap-4">
            <Link to="/miniminds" className="flex items-center space-x-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg sm:text-xl">🧠</span>
              </div>
              <span className="text-lg sm:text-xl font-bold text-dark-900 dark:text-white">MiniMinds</span>
            </Link>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              {localStorage.getItem('isAuthenticated') === 'true' ? (
                <>
                  <span className="hidden md:inline text-dark-700 dark:text-dark-300 text-sm sm:text-base">
                    Hi, {localStorage.getItem('userName')}
                  </span>
                  <Link
                    to="/subscription-management"
                    className="px-2 sm:px-4 py-1.5 sm:py-2 border-2 border-orange-500 text-orange-600 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all text-xs sm:text-sm whitespace-nowrap"
                  >
                    Subscriptions
                  </Link>
                </>
              ) : (
                <Link
                  to="/login?product=miniminds"
                  className="px-2 sm:px-4 py-1.5 sm:py-2 border-2 border-orange-500 text-orange-600 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all text-xs sm:text-sm"
                >
                  Sign In
                </Link>
              )}
              <Link
                to="/miniminds"
                className="px-2 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg hover:shadow-lg transition-all text-xs sm:text-sm whitespace-nowrap"
              >
                <span className="hidden sm:inline">Back to Home</span>
                <span className="sm:hidden">Home</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-16">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-white/80 dark:bg-dark-800/50 rounded-full mb-4 sm:mb-6 backdrop-blur-sm">
            <span className="text-xl sm:text-2xl">👨‍👩‍👧‍👦</span>
            <span className="text-dark-700 dark:text-dark-300 text-xs sm:text-sm lg:text-base text-center">Choose Your Child's Wellness Plan</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold mb-3 sm:mb-4 text-dark-900 dark:text-white px-2">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-yellow-500 to-blue-500">MiniMinds</span> Plan
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-dark-600 dark:text-dark-300 mb-3 sm:mb-4 px-4">
            Same trusted ThoughtPro technology, designed for children's mental wellness
          </p>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 sm:p-4 max-w-2xl mx-auto">
            <p className="text-blue-800 dark:text-blue-200 text-xs sm:text-sm">
              ✨ <strong>Same Plans as ThoughtPro:</strong> Access the same comprehensive mental health monitoring with child-friendly features and parent guidance.
            </p>
          </div>
        </div>


        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent"></div>
            <p className="mt-4 text-dark-600 dark:text-dark-300">Loading plans...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-2xl mx-auto bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-8 text-center">
            <span className="text-5xl mb-4 block">⚠️</span>
            <h3 className="text-xl font-bold text-red-900 dark:text-red-100 mb-2">Error Loading Plans</h3>
            <p className="text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

        {/* Plans Container */}
        {!loading && !error && plans.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {plans.map((plan, index) => {
            const isPremium = plan.tier?.toLowerCase() === 'premium' || plan.name?.toLowerCase().includes('premium');
            const isPopular = plan.isPopular || plan.popular || index === 1;
            const planIcon = isPremium ? '⭐' : '💎';
            const borderClass = isPopular ? 'border-2 border-orange-500 dark:border-orange-400' : 'border border-dark-200/50 dark:border-white/10';
            return (
              <div key={plan.id || plan._id || index} className={`bg-white/80 dark:bg-dark-800/50 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 ${borderClass} shadow-2xl relative`}>
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                    ⭐ MOST POPULAR
                  </div>
                )}

                {/* Plan Header */}
                <div className={`flex items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6 ${isPopular ? 'mt-4' : ''}`}>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl sm:text-3xl">{plan.icon || planIcon}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-dark-900 dark:text-white truncate">{plan.name || plan.title}</h2>
                    <p className="text-sm sm:text-base text-dark-600 dark:text-dark-300">{plan.description || plan.subtitle}</p>
                  </div>
                </div>

                {/* Plan Highlights */}
                {plan.highlights && plan.highlights.length > 0 && (
                  <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    {plan.highlights.slice(0, 3).map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-green-500 text-sm sm:text-base flex-shrink-0 mt-0.5">✓</span>
                        <span className="text-dark-700 dark:text-dark-300 text-xs sm:text-sm lg:text-base">{highlight}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Pricing Options */}
                <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6">
                  {/* Monthly Option */}
                  {plan.monthlyPrice && (
                    <button
                      onClick={() => handlePlanSelect(`${plan.tier || plan.name}-monthly`, plan.monthlyPrice, plan.tier || plan.name, plan.monthlyPlanId)}
                      className={`p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl border-2 transition-all ${
                        selectedPlan?.planOption === `${plan.tier || plan.name}-monthly`
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                          : 'border-dark-200 dark:border-dark-700 hover:border-orange-300'
                      }`}
                    >
                      <div className="text-xs sm:text-sm text-dark-600 dark:text-dark-400">Monthly</div>
                      <div className="flex flex-col items-center">
                        {plan.monthlyOriginalPrice && (
                          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-through">₹{plan.monthlyOriginalPrice}</div>
                        )}
                        <div className="text-lg sm:text-xl lg:text-2xl font-bold text-dark-900 dark:text-white">₹{plan.monthlyPrice}</div>
                        {plan.monthlyOriginalPrice && (
                          <div className="text-[10px] sm:text-xs text-green-600 dark:text-green-400 font-semibold">60% OFF</div>
                        )}
                      </div>
                      <div className="text-[10px] sm:text-xs text-dark-500 dark:text-dark-500">/month</div>
                    </button>
                  )}

                  {/* Yearly Option */}
                  {plan.yearlyPrice && (
                    <button
                      onClick={() => handlePlanSelect(`${plan.tier || plan.name}-yearly`, plan.yearlyPrice, plan.tier || plan.name, plan.yearlyPlanId)}
                      className={`p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl border-2 transition-all relative ${
                        selectedPlan?.planOption === `${plan.tier || plan.name}-yearly`
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                          : 'border-dark-200 dark:border-dark-700 hover:border-orange-300'
                      }`}
                    >
                      {plan.yearlySavings && (
                        <div className="absolute -top-2 -right-2 bg-yellow-500 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full whitespace-nowrap">🎉 Best</div>
                      )}
                      <div className="text-xs sm:text-sm text-dark-600 dark:text-dark-400">Yearly</div>
                      <div className="flex flex-col items-center">
                        {plan.yearlyOriginalPrice && (
                          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-through">₹{plan.yearlyOriginalPrice}</div>
                        )}
                        <div className="text-lg sm:text-xl lg:text-2xl font-bold text-dark-900 dark:text-white">₹{plan.yearlyPrice}</div>
                        {plan.yearlyOriginalPrice && (
                          <div className="text-[10px] sm:text-xs text-green-600 dark:text-green-400 font-semibold">60% OFF</div>
                        )}
                      </div>
                      <div className="text-[10px] sm:text-xs text-dark-500 dark:text-dark-500">/year</div>
                      {plan.yearlySavings && (
                        <div className="mt-1 sm:mt-2 text-[10px] sm:text-xs text-green-600 dark:text-green-400 font-semibold">
                          Save {plan.yearlySavings}
                        </div>
                      )}
                    </button>
                  )}
                </div>

                {/* Plan Features */}
                {plan.features && plan.features.length > 0 && (
                  <div className="bg-dark-50 dark:bg-dark-900/50 rounded-lg p-3 sm:p-4">
                    <h4 className="font-semibold text-dark-900 dark:text-white mb-2 sm:mb-3 text-sm sm:text-base">What you'll get:</h4>
                    <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-dark-600 dark:text-dark-300">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 sm:gap-2">
                          <span className="text-green-500 flex-shrink-0 mt-0.5">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        )}

        {/* Subscribe Button */}
        {selectedPlan && (
          <div id="main-subscribe-btn" className="text-center mb-8 sm:mb-12">
            <button
              onClick={handleSubscribe}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full text-base sm:text-lg font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
            >
              <span>🚀</span>
              <span>Subscribe Now</span>
            </button>
          </div>
        )}

        {/* Redemption Section */}
        <div className="max-w-2xl mx-auto bg-white/80 dark:bg-dark-800/50 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-dark-200/50 dark:border-white/10 shadow-xl text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🎁</div>
          <h3 className="text-xl sm:text-2xl font-bold text-dark-900 dark:text-white mb-1 sm:mb-2">Have a Redeem Code?</h3>
          <p className="text-sm sm:text-base text-dark-600 dark:text-dark-300 mb-4 sm:mb-6">Enter your code below to unlock your plan</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={redeemCode}
              onChange={(e) => setRedeemCode(e.target.value)}
              placeholder="Enter your redemption code"
              className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-white dark:bg-dark-700 border border-dark-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-dark-900 dark:text-white text-sm sm:text-base"
            />
            <button
              onClick={handleRedeem}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap text-sm sm:text-base"
            >
              <span>Redeem</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-12 sm:mt-14 lg:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          <div className="text-center">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🛡️</div>
            <h3 className="text-lg sm:text-xl font-bold text-dark-900 dark:text-white mb-2">Safe & Secure</h3>
            <p className="text-sm sm:text-base text-dark-600 dark:text-dark-300 px-2">Your child's data is encrypted and protected</p>
          </div>
          <div className="text-center">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">👨‍⚕️</div>
            <h3 className="text-lg sm:text-xl font-bold text-dark-900 dark:text-white mb-2">Expert Guidance</h3>
            <p className="text-sm sm:text-base text-dark-600 dark:text-dark-300 px-2">Curated by child psychologists</p>
          </div>
          <div className="text-center">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">📊</div>
            <h3 className="text-lg sm:text-xl font-bold text-dark-900 dark:text-white mb-2">Track Progress</h3>
            <p className="text-sm sm:text-base text-dark-600 dark:text-dark-300 px-2">Monitor your child's mental wellness journey</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniMindsPlans;
