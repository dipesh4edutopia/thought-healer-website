import React, { useState } from 'react';

const CouponManagement = () => {
  const [coupons, setCoupons] = useState([
    { id: 1, code: 'WELCOME50', type: 'Percentage', value: '50%', usageLimit: 100, used: 45, status: 'active', validUntil: '2025-12-31', description: 'Welcome discount for new users', ownerEmail: 'partner1@example.com', commission: '₹100', commissionType: 'fixed' },
    { id: 2, code: 'FLAT500', type: 'Fixed Amount', value: '₹500', usageLimit: 50, used: 50, status: 'expired', validUntil: '2024-12-31', description: 'Flat discount on all plans', ownerEmail: 'affiliate@example.com', commission: '10%', commissionType: 'percentage' },
    { id: 3, code: 'ULTRA20', type: 'Percentage', value: '20%', usageLimit: 200, used: 87, status: 'active', validUntil: '2025-06-30', description: 'Discount only for Ultra plans', ownerEmail: 'partner2@example.com', commission: '₹150', commissionType: 'fixed' },
    { id: 4, code: 'NEWYEAR2025', type: 'Fixed Amount', value: '₹1000', usageLimit: 30, used: 12, status: 'active', validUntil: '2025-01-31', description: 'New Year special offer', ownerEmail: 'admin@thoughthealer.com', commission: '5%', commissionType: 'percentage' },
  ]);

  const [showCouponModal, setShowCouponModal] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    value: '',
    usageLimit: '',
    validUntil: '',
    description: '',
    planType: 'premium',
    ownerEmail: '',
    commissionType: 'fixed',
    commissionValue: ''
  });

  const handleCreateCoupon = () => {
    if (newCoupon.code && newCoupon.value && newCoupon.usageLimit && newCoupon.ownerEmail && newCoupon.commissionValue) {
      const coupon = {
        id: coupons.length + 1,
        code: newCoupon.code.toUpperCase(),
        type: 'Fixed Amount',
        value: `₹${newCoupon.value}`,
        usageLimit: parseInt(newCoupon.usageLimit),
        used: 0,
        status: 'active',
        validUntil: newCoupon.validUntil,
        description: newCoupon.description,
        planType: newCoupon.planType,
        ownerEmail: newCoupon.ownerEmail,
        commission: newCoupon.commissionType === 'percentage' ? `${newCoupon.commissionValue}%` : `₹${newCoupon.commissionValue}`,
        commissionType: newCoupon.commissionType
      };
      setCoupons([...coupons, coupon]);
      setShowCouponModal(false);
      setNewCoupon({
        code: '',
        value: '',
        usageLimit: '',
        validUntil: '',
        description: '',
        planType: 'premium',
        ownerEmail: '',
        commissionType: 'fixed',
        commissionValue: ''
      });
    } else {
      alert('Please fill all required fields including Owner Email and Commission');
    }
  };

  const handleToggleCouponStatus = (id) => {
    setCoupons(coupons.map(c => 
      c.id === id ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' } : c
    ));
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

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-100 dark:bg-dark-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-dark-700 dark:text-dark-300 uppercase tracking-wider">Code</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-dark-700 dark:text-dark-300 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-dark-700 dark:text-dark-300 uppercase tracking-wider">Value</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-dark-700 dark:text-dark-300 uppercase tracking-wider">Owner</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-dark-700 dark:text-dark-300 uppercase tracking-wider">Commission</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-dark-700 dark:text-dark-300 uppercase tracking-wider">Usage</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-dark-700 dark:text-dark-300 uppercase tracking-wider">Valid Until</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-dark-700 dark:text-dark-300 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-dark-700 dark:text-dark-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-dark-800 divide-y divide-dark-200 dark:divide-dark-700">
              {coupons.map((coupon) => (
                <tr key={coupon.id} className="hover:bg-dark-50 dark:hover:bg-dark-700">
                  <td className="px-4 py-4 text-sm font-mono font-bold text-primary-600 dark:text-primary-400">{coupon.code}</td>
                  <td className="px-4 py-4 text-sm text-dark-600 dark:text-dark-300">{coupon.type}</td>
                  <td className="px-4 py-4 text-sm font-semibold text-dark-900 dark:text-white">{coupon.value}</td>
                  <td className="px-4 py-4 text-sm">
                    <div className="flex items-center gap-1">
                      <span className="text-xs">👤</span>
                      <span className="text-dark-600 dark:text-dark-300 text-xs">{coupon.ownerEmail}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <span className="font-semibold text-green-600 dark:text-green-400">{coupon.commission}</span>
                    <span className="text-xs text-dark-500 dark:text-dark-400 block">per use</span>
                  </td>
                  <td className="px-4 py-4 text-sm text-dark-600 dark:text-dark-300">
                    {coupon.used}/{coupon.usageLimit}
                    <div className="w-full bg-dark-200 dark:bg-dark-600 rounded-full h-1.5 mt-1">
                      <div 
                        className="bg-primary-500 h-1.5 rounded-full" 
                        style={{ width: `${(coupon.used / coupon.usageLimit) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-dark-600 dark:text-dark-300">{coupon.validUntil}</td>
                  <td className="px-4 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      coupon.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                    }`}>
                      {coupon.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <button
                      onClick={() => handleToggleCouponStatus(coupon.id)}
                      className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                    >
                      {coupon.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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

              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                  Discount Amount (₹) *
                </label>
                <input
                  type="number"
                  value={newCoupon.value}
                  onChange={(e) => setNewCoupon({...newCoupon, value: e.target.value})}
                  placeholder="500"
                  min="0"
                  step="10"
                  className="w-full px-4 py-2 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <p className="text-xs text-dark-500 dark:text-dark-400 mt-1">Fixed amount discount on the plan price</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Usage Limit *</label>
                  <input
                    type="number"
                    value={newCoupon.usageLimit}
                    onChange={(e) => setNewCoupon({...newCoupon, usageLimit: e.target.value})}
                    placeholder="100"
                    min="1"
                    className="w-full px-4 py-2 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <p className="text-xs text-dark-500 dark:text-dark-400 mt-1">Each user can redeem only once</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Valid Until *</label>
                  <input
                    type="date"
                    value={newCoupon.validUntil}
                    onChange={(e) => setNewCoupon({...newCoupon, validUntil: e.target.value})}
                    className="w-full px-4 py-2 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Applicable Plan *</label>
                <select
                  value={newCoupon.planType}
                  onChange={(e) => setNewCoupon({...newCoupon, planType: e.target.value})}
                  className="w-full px-4 py-2 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="premium">Premium Plan</option>
                  <option value="ultra">Ultra Plan</option>
                </select>
                <p className="text-xs text-dark-500 dark:text-dark-400 mt-1">Coupon will be valid for all users on this plan</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Description</label>
                <textarea
                  value={newCoupon.description}
                  onChange={(e) => setNewCoupon({...newCoupon, description: e.target.value})}
                  placeholder="Brief description of this coupon..."
                  rows="3"
                  className="w-full px-4 py-2 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {/* Affiliate System Section */}
              <div className="border-t border-dark-300 dark:border-dark-600 pt-4 mt-2">
                <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-4 flex items-center gap-2">
                  <span>💰</span>
                  <span>Affiliate/Commission Settings</span>
                </h3>

                <div>
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                    Owner Email * <span className="text-xs text-dark-500">(Affiliate/Partner who owns this coupon)</span>
                  </label>
                  <input
                    type="email"
                    value={newCoupon.ownerEmail}
                    onChange={(e) => setNewCoupon({...newCoupon, ownerEmail: e.target.value})}
                    placeholder="partner@example.com"
                    className="w-full px-4 py-2 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <p className="text-xs text-dark-500 dark:text-dark-400 mt-1">
                    This email will receive commission payments for each coupon use
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Commission Type *</label>
                    <select
                      value={newCoupon.commissionType}
                      onChange={(e) => setNewCoupon({...newCoupon, commissionType: e.target.value})}
                      className="w-full px-4 py-2 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="fixed">Fixed Amount (₹)</option>
                      <option value="percentage">Percentage (%)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                      Commission Value * {newCoupon.commissionType === 'percentage' ? '(%)' : '(₹)'}
                    </label>
                    <input
                      type="number"
                      value={newCoupon.commissionValue}
                      onChange={(e) => setNewCoupon({...newCoupon, commissionValue: e.target.value})}
                      placeholder={newCoupon.commissionType === 'percentage' ? '5' : '100'}
                      min="0"
                      step={newCoupon.commissionType === 'percentage' ? '0.1' : '10'}
                      className="w-full px-4 py-2 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-500 rounded-lg p-3 mt-4">
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    <strong>ℹ️ Commission Preview:</strong> Each time this coupon is used, 
                    <strong className="text-blue-900 dark:text-blue-200">
                      {newCoupon.commissionValue && newCoupon.commissionType === 'percentage' 
                        ? ` ${newCoupon.commissionValue}% of the transaction` 
                        : newCoupon.commissionValue 
                        ? ` ₹${newCoupon.commissionValue}` 
                        : ' [amount]'}
                    </strong> will be credited to <strong>{newCoupon.ownerEmail || '[owner email]'}</strong>
                  </p>
                </div>
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
    </div>
  );
};

export default CouponManagement;
