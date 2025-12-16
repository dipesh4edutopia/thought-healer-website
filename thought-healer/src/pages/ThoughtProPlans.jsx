import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ThoughtProPlans = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [redeemCode, setRedeemCode] = useState('');
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch plans from API
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
          // Transform API data to grouped plans by type
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

  // Transform API plans data
  const transformApiPlans = (apiPlans) => {
    const planTypes = {};
    
    // Group plans by type
    apiPlans.forEach(plan => {
      const type = plan.plan_type.toLowerCase();
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
    
    // Convert to array and format
    return Object.values(planTypes).map((planGroup, index) => {
      const isPremium = planGroup.tier === 'premium';
      const monthly = planGroup.monthly;
      const yearly = planGroup.yearly;
      
      // Calculate savings
      let yearlySavings = null;
      if (monthly && yearly) {
        const monthlyCost = monthly.price_inr * 12;
        const savings = Math.round(((monthlyCost - yearly.price_inr) / monthlyCost) * 100);
        yearlySavings = `${savings}%`;
      }
      
      return {
        id: planGroup.id,
        name: planGroup.name,
        description: isPremium ? 'Perfect for personal wellness' : 'Complete wellness experience',
        tier: planGroup.tier,
        icon: isPremium ? '⭐' : '💎',
        monthlyPrice: monthly ? monthly.price_inr : null,
        yearlyPrice: yearly ? yearly.price_inr : null,
        monthlyPlanId: monthly ? monthly.plan_id : null,
        yearlyPlanId: yearly ? yearly.plan_id : null,
        yearlySavings: yearlySavings,
        isPopular: !isPremium,
        highlights: isPremium 
          ? ['All-in free access', '10+ Scans', 'Primary & Secondary interventions']
          : ['All Premium features', '100+ Scans', 'All Interventions'],
        features: isPremium
          ? ['All-in free access', '10+ Scans', 'Primary & Secondary Interventions', 'Video Tertiary Content', 'Priority Support']
          : ['All Premium features', '100+ Scans', 'All Interventions', 'Professional Sessions', 'Advanced Analytics', 'Priority Support']
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
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
      
      if (!isAuthenticated) {
        // Save plan and redirect to signin
        sessionStorage.setItem('selectedPlan', JSON.stringify(selectedPlan));
        sessionStorage.setItem('returnUrl', '/thoughtpro-payment');
        navigate('/thoughtpro-signin');
      } else {
        navigate('/thoughtpro-payment', { state: { plan: selectedPlan } });
      }
    }
  };

  const handleRedeem = () => {
    if (redeemCode.trim()) {
      alert(`Redeeming code: ${redeemCode}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-float-reverse"></div>
        <div className="absolute top-40 right-40 w-48 h-48 bg-primary-400/10 rounded-full blur-2xl animate-pulse-slow"></div>
        <div className="absolute text-6xl animate-float" style={{top: '10%', left: '15%'}}>💜</div>
        <div className="absolute text-5xl animate-float-reverse" style={{top: '20%', right: '20%'}}>✨</div>
        <div className="absolute text-6xl animate-float" style={{bottom: '15%', left: '25%'}}>🧘</div>
        <div className="absolute text-5xl animate-float-reverse" style={{bottom: '25%', right: '15%'}}>💫</div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 bg-white/80 dark:bg-dark-900/80 backdrop-blur-xl border-b border-dark-200/50 dark:border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link to="/thoughtpro" className="flex items-center space-x-2">
            <span className="text-3xl">🧠</span>
            <span className="text-xl font-bold text-dark-900 dark:text-white">ThoughtPro</span>
          </Link>
          <div className="flex items-center gap-4">
            {localStorage.getItem('isAuthenticated') === 'true' ? (
              <>
                <span className="text-dark-700 dark:text-dark-300">
                  Hi, {localStorage.getItem('userName')}
                </span>
                <Link
                  to="/subscription-management"
                  className="px-4 py-2 border-2 border-primary-500 text-primary-500 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all"
                >
                  My Subscriptions
                </Link>
              </>
            ) : (
              <Link
                to="/thoughtpro-signin"
                className="px-4 py-2 border-2 border-primary-500 text-primary-500 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all"
              >
                Sign In
              </Link>
            )}
            <a
              href="https://play.google.com/store/apps/details?id=com.thoughtpro"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:shadow-lg transition-all"
            >
              Download App
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-dark-800/50 rounded-full mb-6 backdrop-blur-sm">
            <span className="text-2xl">🎯</span>
            <span className="text-dark-700 dark:text-dark-300">Choose Your Path to Wellness</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 text-dark-900 dark:text-white">
            Choose Your <span className="gradient-text">ThoughtPro</span> Plan
          </h1>
          <p className="text-xl text-dark-600 dark:text-dark-300">
            Unlock premium features and take your mental wellness to the next level
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-primary-500 border-t-transparent"></div>
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
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {plans.map((plan, index) => {
            const isPremium = plan.tier?.toLowerCase() === 'premium' || plan.name?.toLowerCase().includes('premium');
            const isPopular = plan.isPopular || plan.popular || index === 1;
            const planIcon = isPremium ? '⭐' : '💎';
            const borderClass = isPopular ? 'border-2 border-secondary-500 dark:border-secondary-400' : 'border border-dark-200/50 dark:border-white/10';
            
            return (
              <div key={plan.id || plan._id || index} className={`bg-white/80 dark:bg-dark-800/50 backdrop-blur-xl rounded-2xl p-8 ${borderClass} shadow-2xl relative`}>
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    ⭐ MOST POPULAR
                  </div>
                )}

                {/* Plan Header */}
                <div className={`flex items-center gap-4 mb-6 ${isPopular ? 'mt-4' : ''}`}>
                  <div className={`w-16 h-16 bg-gradient-to-br ${isPremium ? 'from-primary-500 to-secondary-500' : 'from-secondary-500 to-purple-600'} rounded-xl flex items-center justify-center`}>
                    <span className="text-3xl">{plan.icon || planIcon}</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-dark-900 dark:text-white">{plan.name || plan.title}</h2>
                    <p className="text-dark-600 dark:text-dark-300">{plan.description || plan.subtitle}</p>
                  </div>
                </div>

                {/* Plan Highlights */}
                {plan.highlights && plan.highlights.length > 0 && (
                  <div className="space-y-3 mb-6">
                    {plan.highlights.slice(0, 3).map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        <span className="text-dark-700 dark:text-dark-300">{highlight}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Pricing Options */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {/* Monthly Option */}
                  {plan.monthlyPrice && (
                    <button
                      onClick={() => handlePlanSelect(`${plan.tier || plan.name}-monthly`, plan.monthlyPrice, plan.tier || plan.name, plan.monthlyPlanId)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedPlan?.planOption === `${plan.tier || plan.name}-monthly`
                          ? isPremium ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-secondary-500 bg-secondary-50 dark:bg-secondary-900/20'
                          : 'border-dark-200 dark:border-dark-700 hover:border-primary-300'
                      }`}
                    >
                      <div className="text-sm text-dark-600 dark:text-dark-400">Monthly</div>
                      <div className="text-2xl font-bold text-dark-900 dark:text-white">₹{plan.monthlyPrice}</div>
                      <div className="text-xs text-dark-500 dark:text-dark-500">/month</div>
                    </button>
                  )}

                  {/* Yearly Option */}
                  {plan.yearlyPrice && (
                    <button
                      onClick={() => handlePlanSelect(`${plan.tier || plan.name}-yearly`, plan.yearlyPrice, plan.tier || plan.name, plan.yearlyPlanId)}
                      className={`p-4 rounded-xl border-2 transition-all relative ${
                        selectedPlan?.planOption === `${plan.tier || plan.name}-yearly`
                          ? isPremium ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-secondary-500 bg-secondary-50 dark:bg-secondary-900/20'
                          : 'border-dark-200 dark:border-dark-700 hover:border-primary-300'
                      }`}
                    >
                      {plan.yearlySavings && (
                        <div className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">🎉 Best Value</div>
                      )}
                      <div className="text-sm text-dark-600 dark:text-dark-400">Yearly</div>
                      <div className="text-2xl font-bold text-dark-900 dark:text-white">₹{plan.yearlyPrice}</div>
                      <div className="text-xs text-dark-500 dark:text-dark-500">/year</div>
                      {plan.yearlySavings && (
                        <div className="mt-2 text-xs text-green-600 dark:text-green-400 font-semibold">
                          Save {plan.yearlySavings}
                        </div>
                      )}
                    </button>
                  )}
                </div>

                {/* Plan Features */}
                {plan.features && plan.features.length > 0 && (
                  <div className="bg-dark-50 dark:bg-dark-900/50 rounded-lg p-4">
                    <h4 className="font-semibold text-dark-900 dark:text-white mb-3">What you'll get:</h4>
                    <ul className="space-y-2 text-sm text-dark-600 dark:text-dark-300">
                      {plan.features.map((feature, idx) => (
                        <li key={idx}>
                          <span className="text-green-500">✓</span> {feature}
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
          <div id="main-subscribe-btn" className="text-center mb-12">
            <button
              onClick={handleSubscribe}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
            >
              <span>🚀</span>
              <span>Subscribe Now</span>
            </button>
          </div>
        )}

        {/* Redemption Section */}
        <div className="max-w-2xl mx-auto bg-white/80 dark:bg-dark-800/50 backdrop-blur-xl rounded-2xl p-8 border border-dark-200/50 dark:border-white/10 shadow-xl text-center">
          <div className="text-5xl mb-4">🎁</div>
          <h3 className="text-2xl font-bold text-dark-900 dark:text-white mb-2">Have a Redeem Code?</h3>
          <p className="text-dark-600 dark:text-dark-300 mb-6">Enter your code below to unlock your plan</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={redeemCode}
              onChange={(e) => setRedeemCode(e.target.value)}
              placeholder="Enter your redemption code"
              className="flex-1 px-4 py-3 bg-white dark:bg-dark-700 border border-dark-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-dark-900 dark:text-white"
            />
            <button
              onClick={handleRedeem}
              className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
            >
              <span>Redeem</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThoughtProPlans;
