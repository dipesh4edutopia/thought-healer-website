import React, { useState, useEffect } from 'react';

const MarketingCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1 = Create, 2 = Analytics
  const [activeTab, setActiveTab] = useState('list'); // list, create, analytics
  
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    description: '',
    discountType: 'percentage',
    discountValue: '',
    maxDiscountAmount: '',
    applicableTo: [],
    minPurchaseAmount: '',
    maxTotalRedemptions: '',
    maxPerUser: 1,
    validFrom: '',
    validUntil: '',
    campaignName: '',
    isActive: true
  });

  const [analytics, setAnalytics] = useState(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [couponAnalytics, setCouponAnalytics] = useState(null);
  const [showCouponAnalytics, setShowCouponAnalytics] = useState(false);

  const API_BASE_URL = 'https://thoughtprob2c.thoughthealer.org';

  useEffect(() => {
    if (activeTab === 'list') {
      fetchCoupons();
    }
  }, [activeTab]);

  const fetchCoupons = async () => {
    setLoading(true);
    setError('');
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        setError('Authentication required.');
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/admin/marketing-coupons`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setCoupons(data.data?.data || []);
      } else {
        setError(data.message || 'Failed to fetch coupons');
      }
    } catch (err) {
      console.error('Error fetching coupons:', err);
      setError('Error loading coupons');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCoupon = async () => {
    // Validate required fields
    if (!formData.code || !formData.name || !formData.discountValue || formData.applicableTo.length === 0) {
      alert('Please fill all required fields (Code, Name, Discount Value, Applicable Plans)');
      return;
    }

    // Validate coupon code format
    if (!/^[A-Z0-9]{3,20}$/.test(formData.code)) {
      alert('Coupon code must be 3-20 uppercase letters/numbers');
      return;
    }

    // Validate discount value
    if (formData.discountType === 'percentage') {
      if (formData.discountValue < 1 || formData.discountValue > 100) {
        alert('Percentage discount must be between 1 and 100');
        return;
      }
    }

    if (formData.discountValue < 0) {
      alert('Discount value cannot be negative');
      return;
    }

    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        alert('Authentication required.');
        return;
      }

      const payload = {
        ...formData,
        discountValue: parseFloat(formData.discountValue),
        maxDiscountAmount: formData.maxDiscountAmount ? parseFloat(formData.maxDiscountAmount) : null,
        minPurchaseAmount: formData.minPurchaseAmount ? parseFloat(formData.minPurchaseAmount) : null,
        maxTotalRedemptions: formData.maxTotalRedemptions ? parseInt(formData.maxTotalRedemptions) : null,
        maxPerUser: parseInt(formData.maxPerUser) || 1
      };

      const response = await fetch(`${API_BASE_URL}/api/admin/marketing-coupons`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert('✅ Marketing coupon created successfully!');
        resetForm();
        setShowModal(false);
        fetchCoupons();
      } else {
        alert(data.error || data.message || 'Failed to create coupon');
      }
    } catch (err) {
      console.error('Error creating coupon:', err);
      alert('Error creating coupon');
    }
  };

  const handleDeleteCoupon = async (couponId) => {
    if (!window.confirm('Are you sure you want to delete this coupon?')) return;

    try {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch(`${API_BASE_URL}/api/admin/marketing-coupons/${couponId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert('Coupon deleted successfully');
        fetchCoupons();
      } else {
        alert(data.error || 'Failed to delete coupon');
      }
    } catch (err) {
      console.error('Error deleting coupon:', err);
      alert('Error deleting coupon');
    }
  };

  const fetchAnalytics = async () => {
    setAnalyticsLoading(true);
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch(`${API_BASE_URL}/api/admin/marketing-coupons/analytics/dashboard`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setAnalytics(data.data?.data);
      } else {
        setError(data.message || 'Failed to fetch analytics');
      }
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError('Error loading analytics');
    } finally {
      setAnalyticsLoading(false);
    }
  };

  const fetchCouponAnalytics = async (couponId, couponData) => {
    setSelectedCoupon(couponData);
    setShowCouponAnalytics(true);
    setAnalyticsLoading(true);
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch(`${API_BASE_URL}/api/admin/marketing-coupons/analytics/coupon/${couponId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setCouponAnalytics(data.data?.data);
      } else {
        setError(data.message || 'Failed to fetch coupon analytics');
      }
    } catch (err) {
      console.error('Error fetching coupon analytics:', err);
      setError('Error loading coupon analytics');
    } finally {
      setAnalyticsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      code: '',
      name: '',
      description: '',
      discountType: 'percentage',
      discountValue: '',
      maxDiscountAmount: '',
      applicableTo: [],
      minPurchaseAmount: '',
      maxTotalRedemptions: '',
      maxPerUser: 1,
      validFrom: '',
      validUntil: '',
      campaignName: '',
      isActive: true
    });
  };

  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-lg p-4 sm:p-6">
      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('list')}
          className={`px-4 py-2.5 font-medium border-b-2 transition-all ${
            activeTab === 'list'
              ? 'border-teal-500 text-teal-600 dark:text-teal-400'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
          }`}
        >
          📋 Manage Coupons
        </button>
        <button
          onClick={() => {
            setActiveTab('analytics');
            fetchAnalytics();
          }}
          className={`px-4 py-2.5 font-medium border-b-2 transition-all ${
            activeTab === 'analytics'
              ? 'border-teal-500 text-teal-600 dark:text-teal-400'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
          }`}
        >
          📊 Analytics
        </button>
      </div>

      {/* List Tab */}
      {activeTab === 'list' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Marketing Coupons</h2>
            <button
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              className="px-4 py-2.5 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium transition-all flex items-center gap-2"
            >
              <span>➕</span>
              <span>Create Coupon</span>
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-500 border-t-transparent mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading coupons...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Code</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Discount</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Campaign</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Redemptions</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {coupons.map((coupon) => (
                    <tr key={coupon.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <td className="px-4 py-3 font-mono font-bold text-teal-600 dark:text-teal-400">{coupon.code}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{coupon.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        {coupon.discount_type === 'percentage' ? `${coupon.discount_value}%` : `₹${coupon.discount_value}`}
                        {coupon.max_discount_amount && ` (Max: ₹${coupon.max_discount_amount})`}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{coupon.campaign_name || '-'}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{coupon.total_redemptions || 0}</td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          coupon.is_active
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                        }`}>
                          {coupon.is_active ? '✓ Active' : '✗ Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => fetchCouponAnalytics(coupon.id, coupon)}
                            className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm font-medium transition-all"
                          >
                            📊 Analytics
                          </button>
                          <button
                            onClick={() => handleDeleteCoupon(coupon.id)}
                            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm font-medium transition-all"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {coupons.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No marketing coupons yet. Create one to get started!</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h2>

          {analyticsLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-500 border-t-transparent mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading analytics...</p>
            </div>
          ) : analytics ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Summary Cards */}
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 p-4 rounded-lg border border-teal-200 dark:border-teal-800">
                <p className="text-sm font-medium text-teal-600 dark:text-teal-400">Total Coupons</p>
                <p className="text-2xl font-bold text-teal-900 dark:text-teal-100">{analytics.summary?.total_coupons || 0}</p>
                <p className="text-xs text-teal-600 dark:text-teal-400 mt-1">{analytics.summary?.active_coupons || 0} active</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Redemptions</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{analytics.summary?.total_redemptions || 0}</p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">{analytics.summary?.unique_users || 0} unique users</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Discount Given</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">₹{(analytics.summary?.total_discount_given || 0).toLocaleString()}</p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">Avg: ₹{Math.round(analytics.summary?.average_discount_per_order || 0)}</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Total Revenue</p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">₹{(analytics.summary?.total_revenue || 0).toLocaleString()}</p>
                <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">Conversion: {analytics.summary?.conversion_rate}%</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Avg Discount/Order</p>
                <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">₹{Math.round(analytics.summary?.average_discount_per_order || 0)}</p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 p-4 rounded-lg border border-pink-200 dark:border-pink-800">
                <p className="text-sm font-medium text-pink-600 dark:text-pink-400">ROI</p>
                <p className="text-2xl font-bold text-pink-900 dark:text-pink-100">{analytics.summary?.total_revenue && analytics.summary?.total_discount_given ? (analytics.summary.total_revenue / analytics.summary.total_discount_given).toFixed(2) : 0}x</p>
                <p className="text-xs text-pink-600 dark:text-pink-400 mt-1">Return on discount</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No analytics data available</p>
            </div>
          )}
        </div>
      )}

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white dark:bg-dark-800 rounded-2xl p-4 sm:p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">Create Marketing Coupon</h2>

            <div className="space-y-4">
              {/* Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Coupon Code *</label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
                  placeholder="WELCOME50"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Welcome Offer"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe the offer..."
                  rows="2"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Discount Type & Value */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Type *</label>
                  <select
                    value={formData.discountType}
                    onChange={(e) => setFormData({...formData, discountType: e.target.value})}
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed (₹)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Value *</label>
                  <input
                    type="number"
                    value={formData.discountValue}
                    onChange={(e) => setFormData({...formData, discountValue: e.target.value})}
                    placeholder="50"
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Max Discount (₹)</label>
                  <input
                    type="number"
                    value={formData.maxDiscountAmount}
                    onChange={(e) => setFormData({...formData, maxDiscountAmount: e.target.value})}
                    placeholder="500"
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* Applicable Plans */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Applicable Plans *</label>
                <div className="flex gap-4">
                  {['premium', 'ultra'].map(plan => (
                    <label key={plan} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.applicableTo.includes(plan)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({...formData, applicableTo: [...formData.applicableTo, plan]});
                          } else {
                            setFormData({...formData, applicableTo: formData.applicableTo.filter(p => p !== plan)});
                          }
                        }}
                        className="w-4 h-4 rounded"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">{plan}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Usage Limits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Max Per User</label>
                  <input
                    type="number"
                    value={formData.maxPerUser}
                    onChange={(e) => setFormData({...formData, maxPerUser: e.target.value})}
                    min="1"
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Total Redemptions Limit</label>
                  <input
                    type="number"
                    value={formData.maxTotalRedemptions}
                    onChange={(e) => setFormData({...formData, maxTotalRedemptions: e.target.value})}
                    placeholder="Unlimited if empty"
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* Campaign & Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Campaign Name</label>
                  <input
                    type="text"
                    value={formData.campaignName}
                    onChange={(e) => setFormData({...formData, campaignName: e.target.value})}
                    placeholder="New Year 2026"
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Min Purchase Amount (₹)</label>
                  <input
                    type="number"
                    value={formData.minPurchaseAmount}
                    onChange={(e) => setFormData({...formData, minPurchaseAmount: e.target.value})}
                    placeholder="299"
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* Valid From & Until */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Valid From</label>
                  <input
                    type="datetime-local"
                    value={formData.validFrom}
                    onChange={(e) => setFormData({...formData, validFrom: e.target.value})}
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Valid Until</label>
                  <input
                    type="datetime-local"
                    value={formData.validUntil}
                    onChange={(e) => setFormData({...formData, validUntil: e.target.value})}
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* Active */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                  className="w-4 h-4 rounded"
                />
                <label htmlFor="isActive" className="text-sm text-gray-700 dark:text-gray-300">Active</label>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleCreateCoupon}
                className="flex-1 px-4 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium transition-all"
              >
                Create Coupon
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-900 dark:text-white rounded-lg font-medium transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Individual Coupon Analytics Modal */}
      {showCouponAnalytics && selectedCoupon && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white dark:bg-dark-800 rounded-2xl p-4 sm:p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  Analytics: <span className="font-mono text-teal-600 dark:text-teal-400">{selectedCoupon.code}</span>
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{selectedCoupon.name}</p>
              </div>
              <button
                onClick={() => {
                  setShowCouponAnalytics(false);
                  setSelectedCoupon(null);
                  setCouponAnalytics(null);
                }}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
              >
                ✕
              </button>
            </div>

            {analyticsLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-500 border-t-transparent mx-auto"></div>
                <p className="text-gray-600 mt-4">Loading analytics...</p>
              </div>
            ) : couponAnalytics ? (
              <div className="space-y-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Redemptions</p>
                    <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{couponAnalytics.summary?.total_redemptions || 0}</p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                    <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Unique Users</p>
                    <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">{couponAnalytics.summary?.unique_users || 0}</p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">Total Revenue</p>
                    <p className="text-3xl font-bold text-green-900 dark:text-green-100">₹{(couponAnalytics.summary?.total_revenue || 0).toLocaleString()}</p>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                    <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Total Discount Given</p>
                    <p className="text-3xl font-bold text-orange-900 dark:text-orange-100">₹{(couponAnalytics.summary?.total_discount_given || 0).toLocaleString()}</p>
                  </div>

                  <div className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 p-4 rounded-lg border border-teal-200 dark:border-teal-800">
                    <p className="text-sm font-medium text-teal-600 dark:text-teal-400">Avg Discount/Order</p>
                    <p className="text-3xl font-bold text-teal-900 dark:text-teal-100">₹{Math.round(couponAnalytics.summary?.average_discount_per_order || 0)}</p>
                  </div>

                  <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 p-4 rounded-lg border border-pink-200 dark:border-pink-800">
                    <p className="text-sm font-medium text-pink-600 dark:text-pink-400">ROI</p>
                    <p className="text-3xl font-bold text-pink-900 dark:text-pink-100">
                      {couponAnalytics.summary?.total_revenue && couponAnalytics.summary?.total_discount_given 
                        ? (couponAnalytics.summary.total_revenue / couponAnalytics.summary.total_discount_given).toFixed(2) 
                        : 0}x
                    </p>
                  </div>
                </div>

                {/* Plan Breakdown */}
                {couponAnalytics.plan_breakdown && couponAnalytics.plan_breakdown.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Plan Breakdown</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Plan</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Redemptions</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Revenue</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Discount Given</th>
                          </tr>
                        </thead>
                        <tbody>
                          {couponAnalytics.plan_breakdown.map((plan, index) => (
                            <tr key={index} className="border-b border-gray-100 dark:border-gray-700">
                              <td className="px-4 py-3 font-medium text-gray-900 dark:text-white capitalize">{plan.plan_name}</td>
                              <td className="px-4 py-3 text-gray-900 dark:text-white">{plan.redemptions}</td>
                              <td className="px-4 py-3 text-gray-900 dark:text-white">₹{(plan.revenue || 0).toLocaleString()}</td>
                              <td className="px-4 py-3 text-gray-900 dark:text-white">₹{(plan.discount_given || 0).toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Time Series Data */}
                {couponAnalytics.time_series && couponAnalytics.time_series.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Usage Over Time</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Date</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Redemptions</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Revenue</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Discount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {couponAnalytics.time_series.map((day, index) => (
                            <tr key={index} className="border-b border-gray-100 dark:border-gray-700">
                              <td className="px-4 py-3 text-gray-900 dark:text-white">{new Date(day.date).toLocaleDateString()}</td>
                              <td className="px-4 py-3 text-gray-900 dark:text-white">{day.redemptions}</td>
                              <td className="px-4 py-3 text-gray-900 dark:text-white">₹{(day.revenue || 0).toLocaleString()}</td>
                              <td className="px-4 py-3 text-gray-900 dark:text-white">₹{(day.discount || 0).toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No analytics data available for this coupon</p>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => {
                  setShowCouponAnalytics(false);
                  setSelectedCoupon(null);
                  setCouponAnalytics(null);
                }}
                className="w-full px-4 py-3 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-900 dark:text-white rounded-lg font-medium transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketingCoupons;
