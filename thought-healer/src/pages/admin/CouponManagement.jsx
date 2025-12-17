import React, { useState, useEffect } from 'react';

const API_BASE_URL = 'https://thoughtprob2c.thoughthealer.org';

const CouponManagement = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showCouponModal, setShowCouponModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [couponDetails, setCouponDetails] = useState(null);
  const [couponRedemptions, setCouponRedemptions] = useState([]);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [redemptionPage, setRedemptionPage] = useState(1);
  const [redemptionLimit] = useState(10);
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discountPercentage: '',
    commissionPercentage: '',
    ownerEmail: '',
    maxRedemptions: '',
    maxPerUser: 1,
    validUntil: ''
  });
  const [editFormData, setEditFormData] = useState({
    discountPercentage: '',
    commissionPercentage: '',
    isActive: true,
    maxRedemptions: '',
    maxPerUser: 1,
    validUntil: ''
  });

  // Fetch coupons from API
  useEffect(() => {
    fetchCoupons();
  }, []);

  const getAuthToken = () => localStorage.getItem('authToken');

  const fetchCouponDetails = async (couponId) => {
    try {
      setLoadingDetails(true);
      const authToken = getAuthToken();
      if (!authToken) {
        setError('Authentication required. Please login again.');
        return;
      }

      const url = `${API_BASE_URL}/api/admin/coupons/${couponId}`;
      console.log('📡 Fetching coupon details from:', url, { couponId });

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
      });

      console.log('📊 Coupon details response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ Coupon details error response:', errorData);
        throw new Error(errorData.error || errorData.message || `Failed to fetch coupon details: ${response.status}`);
      }

      const result = await response.json();
      console.log('📦 Coupon Details API Response:', result);
      
      if (result.success) {
        setCouponDetails(result.data);
        // Fetch redemptions for this coupon
        fetchCouponRedemptions(couponId, 1);
      } else {
        setError(result.message || 'Failed to fetch coupon details');
      }
    } catch (err) {
      setError(err.message);
      console.error('❌ Error fetching coupon details:', err);
    } finally {
      setLoadingDetails(false);
    }
  };

  const fetchCouponRedemptions = async (couponId, page = 1) => {
    try {
      const authToken = getAuthToken();
      if (!authToken) {
        setError('Authentication required. Please login again.');
        return;
      }

      const url = `${API_BASE_URL}/api/admin/coupons/${couponId}/redemptions?page=${page}&limit=${redemptionLimit}`;
      console.log('📡 Fetching redemptions from:', url, { couponId, page, redemptionLimit });

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
      });

      console.log('📊 Redemptions response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ Redemptions error response:', errorData);
        throw new Error(errorData.error || errorData.message || `Failed to fetch redemptions: ${response.status}`);
      }

      const result = await response.json();
      console.log('📦 Redemptions API Response:', result);
      
      // Handle nested data structure
      let redemptionData = result.data;
      if (redemptionData && typeof redemptionData === 'object' && !Array.isArray(redemptionData)) {
        // If data is an object with a data property (pagination wrapper), extract it
        if (redemptionData.data) {
          redemptionData = redemptionData.data;
        } else if (redemptionData.pagination) {
          // If only pagination exists, redemptions might be empty
          redemptionData = [];
        }
      }
      
      if (result.success && Array.isArray(redemptionData)) {
        console.log('✅ Setting redemptions:', redemptionData);
        setCouponRedemptions(redemptionData);
        setRedemptionPage(page);
      } else {
        console.warn('⚠️ API returned success but data is not an array:', typeof redemptionData, redemptionData);
        setCouponRedemptions([]);
        setRedemptionPage(page);
      }
    } catch (err) {
      setError(err.message);
      console.error('❌ Error fetching redemptions:', err);
      setCouponRedemptions([]);
    }
  };

  const handleViewDetails = (coupon) => {
    setCouponDetails(coupon);
    setShowDetailsModal(true);
    fetchCouponDetails(coupon.id);
  };

  const fetchCoupons = async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const authToken = getAuthToken();
      if (!authToken) {
        setError('Authentication required. Please login again.');
        setLoading(false);
        return;
      }
      
      const params = new URLSearchParams();
      if (filters.isActive !== undefined) params.append('isActive', filters.isActive);
      if (filters.ownerEmail) params.append('ownerEmail', filters.ownerEmail);
      if (filters.code) params.append('code', filters.code);
      
      const url = `${API_BASE_URL}/api/admin/coupons${params.toString() ? '?' + params : ''}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to fetch coupons: ${response.status}`);
      }

      const result = await response.json();
      console.log('📦 Coupons API Response:', result);
      
      // Handle nested data structure
      let couponData = result.data;
      if (couponData && typeof couponData === 'object' && !Array.isArray(couponData) && couponData.data) {
        couponData = couponData.data;
      }
      
      if (result.success && Array.isArray(couponData)) {
        console.log('✅ Setting coupons:', couponData);
        setCoupons(couponData);
      } else if (result.success && Array.isArray(couponData)) {
        console.log('✅ Setting coupons:', couponData);
        setCoupons(couponData);
      } else {
        console.warn('⚠️ API returned success but data is not an array:', typeof couponData, couponData);
        setCoupons(Array.isArray(couponData) ? couponData : []);
      }
    } catch (err) {
      setError(err.message);
      console.error('❌ Error fetching coupons:', err);
      setCoupons([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCoupon = async () => {
    try {
      if (!newCoupon.code || !newCoupon.discountPercentage || !newCoupon.commissionPercentage || 
          !newCoupon.ownerEmail || !newCoupon.maxRedemptions || !newCoupon.validUntil) {
        alert('Please fill all required fields');
        return;
      }

      const authToken = getAuthToken();
      if (!authToken) {
        setError('Authentication required. Please login again.');
        return;
      }

      const payload = {
        code: newCoupon.code.toUpperCase(),
        discountPercentage: parseFloat(newCoupon.discountPercentage),
        commissionPercentage: parseFloat(newCoupon.commissionPercentage),
        ownerEmail: newCoupon.ownerEmail,
        maxRedemptions: parseInt(newCoupon.maxRedemptions),
        maxPerUser: parseInt(newCoupon.maxPerUser),
        validUntil: newCoupon.validUntil
      };

      console.log('📤 Creating coupon with payload:', JSON.stringify(payload, null, 2));
      console.log('🔍 Data types:', {
        code: typeof payload.code,
        discountPercentage: typeof payload.discountPercentage,
        commissionPercentage: typeof payload.commissionPercentage,
        ownerEmail: typeof payload.ownerEmail,
        maxRedemptions: typeof payload.maxRedemptions,
        maxPerUser: typeof payload.maxPerUser,
        validUntil: typeof payload.validUntil,
        validUntilValue: payload.validUntil
      });

      const response = await fetch(`${API_BASE_URL}/api/admin/coupons`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ Server error response:', JSON.stringify(errorData, null, 2));
        throw new Error(errorData.error || errorData.message || `Failed to create coupon: ${response.status}`);
      }

      const result = await response.json();
      if (result.success) {
        alert('Coupon created successfully');
        setShowCouponModal(false);
        setNewCoupon({
          code: '',
          discountPercentage: '',
          commissionPercentage: '',
          ownerEmail: '',
          maxRedemptions: '',
          maxPerUser: 1,
          validUntil: ''
        });
        fetchCoupons();
      } else {
        setError(result.message || 'Failed to create coupon');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error creating coupon:', err);
    }
  };

  const handleUpdateCoupon = async (couponId, updates) => {
    try {
      const authToken = getAuthToken();
      if (!authToken) {
        setError('Authentication required. Please login again.');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/admin/coupons/${couponId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(updates)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to update coupon: ${response.status}`);
      }

      const result = await response.json();
      if (result.success) {
        alert('Coupon updated successfully');
        fetchCoupons();
      } else {
        setError(result.message || 'Failed to update coupon');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error updating coupon:', err);
    }
  };

  const handleToggleCouponStatus = (coupon) => {
    handleUpdateCoupon(coupon.id, {
      isActive: !coupon.is_active
    });
  };

  const handleOpenEditModal = (coupon) => {
    setEditingCoupon(coupon);
    setEditFormData({
      discountPercentage: coupon.discount_percentage || '',
      commissionPercentage: coupon.commission_percentage || '',
      isActive: coupon.is_active !== false,
      maxRedemptions: coupon.max_redemptions || '',
      maxPerUser: coupon.max_per_user || 1,
      validUntil: coupon.valid_until || ''
    });
    setShowEditModal(true);
  };

  const handleSaveEditCoupon = async () => {
    try {
      if (!editingCoupon) return;

      if (!editFormData.discountPercentage || !editFormData.commissionPercentage || 
          !editFormData.maxRedemptions || !editFormData.validUntil) {
        alert('Please fill all required fields');
        return;
      }

      const payload = {
        discountPercentage: parseFloat(editFormData.discountPercentage),
        commissionPercentage: parseFloat(editFormData.commissionPercentage),
        isActive: editFormData.isActive,
        maxRedemptions: parseInt(editFormData.maxRedemptions),
        maxPerUser: parseInt(editFormData.maxPerUser),
        validUntil: editFormData.validUntil
      };

      console.log('📤 Updating coupon with payload:', payload);

      await handleUpdateCoupon(editingCoupon.id, payload);
      setShowEditModal(false);
      setEditingCoupon(null);
    } catch (err) {
      console.error('Error saving edit coupon:', err);
    }
  };

  const handleDeleteCoupon = async (couponId) => {
    if (!window.confirm('Are you sure you want to delete this coupon?')) {
      return;
    }

    try {
      const authToken = getAuthToken();
      if (!authToken) {
        setError('Authentication required. Please login again.');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/admin/coupons/${couponId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to delete coupon: ${response.status}`);
      }

      const result = await response.json();
      if (result.success) {
        alert('Coupon deleted successfully');
        fetchCoupons();
      } else {
        setError(result.message || 'Failed to delete coupon');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error deleting coupon:', err);
    }
  };

  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-lg p-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-dark-900 dark:text-white">Coupon Management</h2>
          <button
            onClick={() => setShowCouponModal(true)}
            className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-all flex items-center gap-2"
          >
            <span>➕</span>
            <span>Create Coupon</span>
          </button>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500 rounded-lg p-4">
            <p className="text-red-800 dark:text-red-300">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-dark-600 dark:text-dark-300">Loading coupons...</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-100 dark:bg-dark-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-dark-700 dark:text-dark-300 uppercase tracking-wider">Code</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-dark-700 dark:text-dark-300 uppercase tracking-wider">Discount %</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-dark-700 dark:text-dark-300 uppercase tracking-wider">Commission %</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-dark-700 dark:text-dark-300 uppercase tracking-wider">Owner</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-dark-700 dark:text-dark-300 uppercase tracking-wider">Redemptions</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-dark-700 dark:text-dark-300 uppercase tracking-wider">Valid Until</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-dark-700 dark:text-dark-300 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-dark-700 dark:text-dark-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-dark-800 divide-y divide-dark-200 dark:divide-dark-700">
              {coupons.map((coupon) => (
                <tr key={coupon.id} className="hover:bg-dark-50 dark:hover:bg-dark-700">
                  <td className="px-4 py-4 text-sm font-mono font-bold text-primary-600 dark:text-primary-400">{coupon.code}</td>
                  <td className="px-4 py-4 text-sm text-dark-600 dark:text-dark-300">{coupon.discount_percentage}%</td>
                  <td className="px-4 py-4 text-sm font-semibold text-green-600 dark:text-green-400">{coupon.commission_percentage}%</td>
                  <td className="px-4 py-4 text-sm">
                    <div className="flex items-center gap-1">
                      <span className="text-xs">👤</span>
                      <span className="text-dark-600 dark:text-dark-300 text-xs">{coupon.owner_email}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-dark-600 dark:text-dark-300">
                    {coupon.redemption_count}/{coupon.max_redemptions}
                    <div className="w-full bg-dark-200 dark:bg-dark-600 rounded-full h-1.5 mt-1">
                      <div 
                        className="bg-primary-500 h-1.5 rounded-full" 
                        style={{ width: `${(coupon.redemption_count / coupon.max_redemptions) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-dark-600 dark:text-dark-300">{new Date(coupon.valid_until).toLocaleDateString()}</td>
                  <td className="px-4 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      coupon.is_active 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                    }`}>
                      {coupon.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <button
                      onClick={() => handleViewDetails(coupon)}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mr-4"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleOpenEditModal(coupon)}
                      className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 mr-4"
                    >
                      Edit
                    </button>
                    {/* <button
                      onClick={() => handleToggleCouponStatus(coupon)}
                      className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mr-4"
                    >
                      {coupon.is_active ? 'Deactivate' : 'Activate'}
                    </button> */}
                    <button
                      onClick={() => handleDeleteCoupon(coupon.id)}
                      className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </div>

      {/* Coupon Details Modal */}
      {showDetailsModal && couponDetails && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-dark-900 dark:text-white">Coupon Details - {couponDetails.code}</h2>
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setCouponDetails(null);
                  setCouponRedemptions([]);
                }}
                className="text-dark-500 hover:text-dark-700 dark:text-dark-400 dark:hover:text-dark-300 text-2xl"
              >
                ✕
              </button>
            </div>

            {loadingDetails ? (
              <div className="flex justify-center items-center py-12">
                <div className="text-dark-600 dark:text-dark-300">Loading details...</div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Coupon Information */}
                <div className="bg-dark-50 dark:bg-dark-700 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-4">📋 Coupon Information</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-dark-600 dark:text-dark-400">Coupon Code</p>
                      <p className="text-sm font-bold text-primary-600 dark:text-primary-400">{couponDetails.code}</p>
                    </div>
                    <div>
                      <p className="text-xs text-dark-600 dark:text-dark-400">Discount %</p>
                      <p className="text-sm font-semibold text-dark-900 dark:text-white">{couponDetails.discount_percentage}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-dark-600 dark:text-dark-400">Commission %</p>
                      <p className="text-sm font-semibold text-green-600 dark:text-green-400">{couponDetails.commission_percentage}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-dark-600 dark:text-dark-400">Owner Email</p>
                      <p className="text-sm text-dark-900 dark:text-white">{couponDetails.owner_email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-dark-600 dark:text-dark-400">Status</p>
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        couponDetails.is_active
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                      }`}>
                        {couponDetails.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-dark-600 dark:text-dark-400">Created At</p>
                      <p className="text-sm text-dark-900 dark:text-white">{new Date(couponDetails.created_at).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-dark-600 dark:text-dark-400">Valid From</p>
                      <p className="text-sm text-dark-900 dark:text-white">{new Date(couponDetails.valid_from).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-dark-600 dark:text-dark-400">Valid Until</p>
                      <p className="text-sm text-dark-900 dark:text-white">{new Date(couponDetails.valid_until).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-dark-600 dark:text-dark-400">Redemptions</p>
                      <p className="text-sm font-semibold text-dark-900 dark:text-white">{couponDetails.redemption_count}/{couponDetails.max_redemptions}</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-dark-200 dark:border-dark-600">
                    <div className="w-full bg-dark-200 dark:bg-dark-600 rounded-full h-2">
                      <div 
                        className="bg-primary-500 h-2 rounded-full" 
                        style={{ width: `${(couponDetails.redemption_count / couponDetails.max_redemptions) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Redemption History */}
                <div className="bg-dark-50 dark:bg-dark-700 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-4">📊 Redemption History</h3>
                  
                  {couponRedemptions.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-dark-600 dark:text-dark-400">No redemptions yet</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-dark-100 dark:bg-dark-600">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-dark-700 dark:text-dark-300">User Email</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-dark-700 dark:text-dark-300">Discount Applied</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-dark-700 dark:text-dark-300">Commission Earned</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-dark-700 dark:text-dark-300">Redeemed At</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-dark-700 dark:text-dark-300">Payment Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-dark-200 dark:divide-dark-600">
                          {couponRedemptions.map((redemption, index) => (
                            <tr key={index} className="hover:bg-dark-100 dark:hover:bg-dark-600">
                              <td className="px-4 py-3 text-dark-600 dark:text-dark-300">{redemption.user_email}</td>
                              <td className="px-4 py-3 font-semibold text-dark-900 dark:text-white">{redemption.discount_applied || redemption.discount_percentage || '-'}%</td>
                              <td className="px-4 py-3 font-semibold text-green-600 dark:text-green-400">{redemption.commission_earned || '-'}</td>
                              <td className="px-4 py-3 text-dark-600 dark:text-dark-300">{new Date(redemption.redeemed_at).toLocaleDateString()}</td>
                              <td className="px-4 py-3">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${
                                  redemption.payment_status === 'paid'
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                    : redemption.payment_status === 'pending'
                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                                }`}>
                                  {redemption.payment_status || 'N/A'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Pagination */}
                  {couponRedemptions.length > 0 && (
                    <div className="mt-4 flex justify-between items-center">
                      <p className="text-xs text-dark-600 dark:text-dark-400">
                        Showing page {redemptionPage}
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => fetchCouponRedemptions(couponDetails.id, redemptionPage - 1)}
                          disabled={redemptionPage === 1}
                          className="px-3 py-1 text-sm bg-dark-200 dark:bg-dark-600 text-dark-900 dark:text-white rounded disabled:opacity-50"
                        >
                          Previous
                        </button>
                        <button
                          onClick={() => fetchCouponRedemptions(couponDetails.id, redemptionPage + 1)}
                          className="px-3 py-1 text-sm bg-dark-200 dark:bg-dark-600 text-dark-900 dark:text-white rounded"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-6 pt-6 border-t border-dark-200 dark:border-dark-600">
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setCouponDetails(null);
                  setCouponRedemptions([]);
                }}
                className="flex-1 px-4 py-2 bg-dark-200 dark:bg-dark-600 hover:bg-dark-300 dark:hover:bg-dark-500 text-dark-900 dark:text-white rounded-lg transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Coupon Modal */}
      {showCouponModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-6">Create New Coupon</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Coupon Code *</label>
                <input
                  type="text"
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon({...newCoupon, code: e.target.value})}
                  placeholder="e.g., SUMMER2025"
                  className="w-full px-4 py-2 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                    Discount Percentage (%) *
                  </label>
                  <input
                    type="number"
                    value={newCoupon.discountPercentage}
                    onChange={(e) => setNewCoupon({...newCoupon, discountPercentage: e.target.value})}
                    placeholder="20"
                    min="0"
                    max="100"
                    step="0.1"
                    className="w-full px-4 py-2 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                    Commission Percentage (%) *
                  </label>
                  <input
                    type="number"
                    value={newCoupon.commissionPercentage}
                    onChange={(e) => setNewCoupon({...newCoupon, commissionPercentage: e.target.value})}
                    placeholder="5"
                    min="0"
                    max="100"
                    step="0.1"
                    className="w-full px-4 py-2 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Max Redemptions *</label>
                  <input
                    type="number"
                    value={newCoupon.maxRedemptions}
                    onChange={(e) => setNewCoupon({...newCoupon, maxRedemptions: e.target.value})}
                    placeholder="100"
                    min="1"
                    className="w-full px-4 py-2 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <p className="text-xs text-dark-500 dark:text-dark-400 mt-1">Total number of times coupon can be used</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Max Per User</label>
                  <input
                    type="number"
                    value={newCoupon.maxPerUser}
                    onChange={(e) => setNewCoupon({...newCoupon, maxPerUser: e.target.value})}
                    placeholder="1"
                    min="1"
                    className="w-full px-4 py-2 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <p className="text-xs text-dark-500 dark:text-dark-400 mt-1">How many times each user can use</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Owner Email * <span className="text-xs text-dark-500">(Affiliate who owns this coupon)</span></label>
                <input
                  type="email"
                  value={newCoupon.ownerEmail}
                  onChange={(e) => setNewCoupon({...newCoupon, ownerEmail: e.target.value})}
                  placeholder="affiliate@example.com"
                  className="w-full px-4 py-2 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <p className="text-xs text-dark-500 dark:text-dark-400 mt-1">This email will receive commission</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Valid Until *</label>
                <input
                  type="datetime-local"
                  value={newCoupon.validUntil}
                  onChange={(e) => setNewCoupon({...newCoupon, validUntil: e.target.value})}
                  className="w-full px-4 py-2 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-500 rounded-lg p-3 mt-4">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  <strong>ℹ️ Summary:</strong> Discount <strong>{newCoupon.discountPercentage || '0'}%</strong> with 
                  <strong> {newCoupon.commissionPercentage || '0'}% commission</strong> to <strong>{newCoupon.ownerEmail || 'owner'}</strong>
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleCreateCoupon}
                className="flex-1 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-all"
              >
                Create Coupon
              </button>
              <button
                onClick={() => setShowCouponModal(false)}
                className="flex-1 px-4 py-2 bg-dark-200 dark:bg-dark-600 hover:bg-dark-300 dark:hover:bg-dark-500 text-dark-900 dark:text-white rounded-lg transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Coupon Modal */}
      {showEditModal && editingCoupon && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-6">Edit Coupon: <span className="text-primary-500">{editingCoupon.code}</span></h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                    Discount Percentage (%) *
                  </label>
                  <input
                    type="number"
                    value={editFormData.discountPercentage}
                    onChange={(e) => setEditFormData({...editFormData, discountPercentage: e.target.value})}
                    placeholder="20"
                    min="0"
                    max="100"
                    step="0.1"
                    className="w-full px-4 py-2 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                    Commission Percentage (%) *
                  </label>
                  <input
                    type="number"
                    value={editFormData.commissionPercentage}
                    onChange={(e) => setEditFormData({...editFormData, commissionPercentage: e.target.value})}
                    placeholder="5"
                    min="0"
                    max="100"
                    step="0.1"
                    className="w-full px-4 py-2 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Max Redemptions *</label>
                  <input
                    type="number"
                    value={editFormData.maxRedemptions}
                    onChange={(e) => setEditFormData({...editFormData, maxRedemptions: e.target.value})}
                    placeholder="100"
                    min="1"
                    className="w-full px-4 py-2 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <p className="text-xs text-dark-500 dark:text-dark-400 mt-1">Total number of times coupon can be used</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Max Per User</label>
                  <input
                    type="number"
                    value={editFormData.maxPerUser}
                    onChange={(e) => setEditFormData({...editFormData, maxPerUser: e.target.value})}
                    placeholder="1"
                    min="1"
                    className="w-full px-4 py-2 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <p className="text-xs text-dark-500 dark:text-dark-400 mt-1">How many times each user can use</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Valid Until *</label>
                <input
                  type="datetime-local"
                  value={editFormData.validUntil}
                  onChange={(e) => setEditFormData({...editFormData, validUntil: e.target.value})}
                  className="w-full px-4 py-2 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-500 rounded-lg">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={editFormData.isActive}
                  onChange={(e) => setEditFormData({...editFormData, isActive: e.target.checked})}
                  className="w-4 h-4 rounded accent-primary-500"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-blue-800 dark:text-blue-300 cursor-pointer flex-1">
                  {editFormData.isActive ? '✅ Active - Coupon is available for use' : '⏸️ Inactive - Coupon is disabled'}
                </label>
              </div>

              <div className="bg-dark-50 dark:bg-dark-700 border border-dark-200 dark:border-dark-600 rounded-lg p-3 mt-4">
                <p className="text-sm text-dark-700 dark:text-dark-300">
                  <strong>ℹ️ Updated Details:</strong> Discount <strong>{editFormData.discountPercentage || '0'}%</strong> with 
                  <strong> {editFormData.commissionPercentage || '0'}% commission</strong>
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSaveEditCoupon}
                className="flex-1 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-all"
              >
                Save Changes
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2 bg-dark-200 dark:bg-dark-600 hover:bg-dark-300 dark:hover:bg-dark-500 text-dark-900 dark:text-white rounded-lg transition-all"
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

export default CouponManagement;
