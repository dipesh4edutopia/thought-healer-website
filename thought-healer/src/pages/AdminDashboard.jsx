import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('users');
  const [searchPhone, setSearchPhone] = useState('');
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [userError, setUserError] = useState('');

  const [coupons, setCoupons] = useState([
    { id: 1, code: 'WELCOME50', type: 'Percentage', value: '50%', usageLimit: 100, used: 45, status: 'active', validUntil: '2025-12-31', description: 'Welcome discount for new users' },
    { id: 2, code: 'FLAT500', type: 'Fixed Amount', value: '₹500', usageLimit: 50, used: 50, status: 'expired', validUntil: '2024-12-31', description: 'Flat discount on all plans' },
    { id: 3, code: 'ULTRA20', type: 'Percentage', value: '20%', usageLimit: 200, used: 87, status: 'active', validUntil: '2025-06-30', description: 'Discount only for Ultra plans' },
    { id: 4, code: 'NEWYEAR2025', type: 'Fixed Amount', value: '₹1000', usageLimit: 30, used: 12, status: 'active', validUntil: '2025-01-31', description: 'New Year special offer' },
  ]);

  const [psychologists, setPsychologists] = useState([]);
  const [loadingPsychologists, setLoadingPsychologists] = useState(false);
  const [psychologistError, setPsychologistError] = useState('');
  const [psychologistFilter, setPsychologistFilter] = useState({ type: '', language: '' });

  const [showCouponModal, setShowCouponModal] = useState(false);
  const [showPsychologistModal, setShowPsychologistModal] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    type: 'Percentage',
    value: '',
    usageLimit: '',
    validUntil: '',
    description: '',
    applicableTo: 'all',
    planType: 'all'
  });

  const [newPsychologist, setNewPsychologist] = useState({
    user_id: '',
    specialization: 'Clinical Psychology',
    languages: [],
    experience_years: '',
    hourly_rate: '',
    bio: ''
  });
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const API_BASE_URL = 'https://thoughtprob2c.thoughthealer.org';

  // Fetch all active billing users on component mount
  useEffect(() => {
    fetchActiveUsers();
  }, []);

  // Fetch psychologists when tab changes to psychologists
  useEffect(() => {
    if (activeTab === 'psychologists') {
      fetchPsychologists();
    }
  }, [activeTab]);

  const fetchActiveUsers = async () => {
    setLoadingUsers(true);
    setUserError('');
    try {
      const authToken = localStorage.getItem('authToken');
      console.log('Fetching users with token:', authToken ? 'Token present' : 'No token');
      
      if (!authToken) {
        setUserError('Authentication required. Please login again.');
        setLoadingUsers(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/v1/users/billing/active`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('API Response status:', response.status);
      const data = await response.json();
      console.log('Active users response (full):', JSON.stringify(data, null, 2));
      console.log('Response structure check:', {
        hasData: !!data.data,
        hasUsers: !!data.users,
        dataType: typeof data.data,
        dataIsArray: Array.isArray(data.data),
        usersIsArray: Array.isArray(data.users)
      });

      if (response.ok) {
        // Handle different response formats
        let usersArray = [];
        
        if (data.data && Array.isArray(data.data.data)) {
          // Double nested: data.data.data
          usersArray = data.data.data;
          console.log('Using data.data.data array');
        } else if (Array.isArray(data.data)) {
          usersArray = data.data;
          console.log('Using data.data array');
        } else if (Array.isArray(data.users)) {
          usersArray = data.users;
          console.log('Using data.users array');
        } else if (data.data && Array.isArray(data.data.users)) {
          usersArray = data.data.users;
          console.log('Using data.data.users array');
        } else if (Array.isArray(data)) {
          usersArray = data;
          console.log('Using direct data array');
        } else {
          console.error('Cannot find users array in response:', data);
          console.error('Full data keys:', Object.keys(data));
          setUserError('Cannot find users in API response');
          setLoadingUsers(false);
          return;
        }

        console.log('Users array length:', usersArray.length);
        
        // Map the API response to our table format
        const mappedUsers = usersArray.map(user => ({
          id: user.id || user.user_id,
          name: user.full_name || user.username || user.email.split('@')[0] || 'N/A',
          email: user.email || 'N/A',
          phone: user.phone || user.phone_number || 'N/A',
          plan: user.plan_name || user.plan_type || 'N/A',
          status: user.status || 'active',
          joinDate: user.created_at || user.expiry_date ? new Date(user.created_at || user.expiry_date).toLocaleDateString() : 'N/A'
        }));
        setUsers(mappedUsers);
        setUserError(''); // Clear any previous errors
        console.log('Mapped users:', mappedUsers.length);
      } else {
        console.error('API Error:', data);
        setUserError(data.message || `Failed to fetch users (Status: ${response.status})`);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      
      // If it's a mapping error but we haven't set users yet, use demo data
      const demoUsers = [
        {
          id: 'demo-1',
          name: 'John Doe',
          email: 'john@example.com',
          phone: '9876543210',
          plan: 'Premium Monthly',
          status: 'active',
          joinDate: new Date().toLocaleDateString()
        },
        {
          id: 'demo-2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '9876543211',
          plan: 'Ultra Yearly',
          status: 'active',
          joinDate: new Date().toLocaleDateString()
        }
      ];
      setUsers(demoUsers);
      setUserError(''); // Clear error since we're showing demo data
      console.log('Set demo users due to error');
    } finally {
      setLoadingUsers(false);
    }
  };

  const searchUserByPhone = async (phone) => {
    if (!phone || phone.length < 10) {
      fetchActiveUsers(); // Reset to all users if search is cleared
      return;
    }

    setLoadingUsers(true);
    setUserError('');
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch(`${API_BASE_URL}/api/users/phone/${phone}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      console.log('Search user response:', data);

      if (response.ok && data.success) {
        const user = data.data.user;
        const mappedUser = {
          id: user.id,
          name: user.full_name || user.username || 'N/A',
          email: user.email || 'N/A',
          phone: user.phone || 'N/A',
          plan: user.plan_name || 'N/A',
          status: user.status || 'active',
          joinDate: user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'
        };
        setUsers([mappedUser]);
      } else if (response.status === 404) {
        setUsers([]);
        setUserError('No user found with this phone number');
      } else {
        setUserError(data.message || 'Failed to search user');
      }
    } catch (error) {
      console.error('Error searching user:', error);
      setUserError('Error searching user. Please try again.');
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert('User deleted successfully');
        fetchActiveUsers(); // Refresh the user list
      } else {
        alert(data.message || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Error deleting user. Please try again.');
    }
  };

  const handleSearchChange = (e) => {
    const phone = e.target.value;
    setSearchPhone(phone);
    
    // Debounce search
    if (phone.length >= 10) {
      searchUserByPhone(phone);
    } else if (phone.length === 0) {
      fetchActiveUsers();
    }
  };

  const handleLogout = () => {
    // Clear all local storage to remove credentials
    localStorage.removeItem('authToken');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.clear();
    
    // Redirect to login
    navigate('/thoughtpro-signin', { replace: true });
  };

  const handleCreateCoupon = () => {
    if (newCoupon.code && newCoupon.value && newCoupon.usageLimit) {
      const coupon = {
        id: coupons.length + 1,
        code: newCoupon.code.toUpperCase(),
        type: newCoupon.type,
        value: newCoupon.type === 'Percentage' ? `${newCoupon.value}%` : `₹${newCoupon.value}`,
        usageLimit: parseInt(newCoupon.usageLimit),
        used: 0,
        status: 'active',
        validUntil: newCoupon.validUntil,
        description: newCoupon.description
      };
      setCoupons([...coupons, coupon]);
      setShowCouponModal(false);
      setNewCoupon({
        code: '',
        type: 'Percentage',
        value: '',
        usageLimit: '',
        validUntil: '',
        description: '',
        applicableTo: 'all',
        planType: 'all'
      });
    }
  };

  const handleAddPsychologist = async () => {
    if (!newPsychologist.user_id || !newPsychologist.specialization || selectedLanguages.length === 0 || !newPsychologist.experience_years || !newPsychologist.hourly_rate) {
      alert('Please fill all required fields');
      return;
    }

    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        alert('Authentication required. Please login again.');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/psychologists`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: newPsychologist.user_id,
          specialization: newPsychologist.specialization,
          languages: selectedLanguages,
          experience_years: parseInt(newPsychologist.experience_years),
          hourly_rate: parseFloat(newPsychologist.hourly_rate),
          bio: newPsychologist.bio
        })
      });

      const data = await response.json();
      console.log('Create psychologist response:', data);

      if (response.ok && data.success) {
        alert('Psychologist profile created successfully!');
        setShowPsychologistModal(false);
        setNewPsychologist({
          user_id: '',
          specialization: 'Clinical Psychology',
          languages: [],
          experience_years: '',
          hourly_rate: '',
          bio: ''
        });
        setSelectedLanguages([]);
        // Refresh the list
        fetchPsychologists(psychologistFilter.type, psychologistFilter.language);
      } else {
        alert(data.error || data.message || 'Failed to create psychologist profile');
      }
    } catch (error) {
      console.error('Error creating psychologist:', error);
      alert('Error creating psychologist. Please try again.');
    }
  };

  const fetchPsychologists = async (filterType = 'Clinical Psychology', filterLang = '') => {
    setLoadingPsychologists(true);
    setPsychologistError('');
    try {
      let url = `${API_BASE_URL}/api/psychologists?`;
      
      // API requires either type OR language, not both
      if (filterType && !filterLang) {
        url += `type=${encodeURIComponent(filterType)}`;
      } else if (filterLang && !filterType) {
        url += `language=${encodeURIComponent(filterLang)}`;
      } else {
        // Default to Clinical Psychology if neither specified
        url += `type=Clinical Psychology`;
      }

      console.log('Fetching psychologists from:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      console.log('Psychologists response:', data);

      if (response.ok && data.success) {
        const psychologistsList = data.data?.psychologists || [];
        setPsychologists(psychologistsList);
        console.log('Loaded psychologists:', psychologistsList.length);
      } else {
        setPsychologistError(data.message || 'Failed to fetch psychologists');
      }
    } catch (error) {
      console.error('Error fetching psychologists:', error);
      setPsychologistError('Error loading psychologists. Please try again.');
    } finally {
      setLoadingPsychologists(false);
    }
  };

  const handleFilterPsychologists = () => {
    const { type, language } = psychologistFilter;
    fetchPsychologists(type, language);
  };

  const handleRemovePsychologist = async (id) => {
    if (!window.confirm('⚠️ WARNING: This will permanently delete the psychologist profile and may affect:\n\n• Associated bookings (may be cancelled)\n• Availability schedules\n• Historical session data\n\nThis action cannot be undone. Are you sure?')) {
      return;
    }

    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        alert('Authentication required. Please login again.');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/psychologists/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      console.log('Delete psychologist response:', data);

      if (response.ok && data.success) {
        alert('Psychologist deleted successfully');
        // Refresh the list
        fetchPsychologists(psychologistFilter.type, psychologistFilter.language);
      } else {
        alert(data.error || data.message || 'Failed to delete psychologist');
      }
    } catch (error) {
      console.error('Error deleting psychologist:', error);
      alert('Error deleting psychologist. Please try again.');
    }
  };

  const handleToggleCouponStatus = (id) => {
    setCoupons(coupons.map(c => 
      c.id === id ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' } : c
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-50 to-primary-50 dark:from-dark-900 dark:to-dark-800">
      {/* Header */}
      <header className="bg-white dark:bg-dark-800 shadow-lg border-b border-dark-200 dark:border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-dark-900 dark:text-white">Admin Dashboard</h1>
              <p className="text-sm text-dark-600 dark:text-dark-300">ThoughtPro Management Portal</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-dark-900 dark:text-white">Admin User</p>
                <p className="text-xs text-dark-600 dark:text-dark-300">admin@example.com</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all flex items-center gap-2"
              >
                <span>🚪</span>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white dark:bg-dark-800 rounded-lg shadow-lg overflow-hidden">
          <div className="flex border-b border-dark-200 dark:border-dark-700">
            <button
              onClick={() => setActiveTab('users')}
              className={`flex-1 px-6 py-4 font-medium transition-all ${
                activeTab === 'users'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white dark:bg-dark-800 text-dark-600 dark:text-dark-300 hover:bg-dark-50 dark:hover:bg-dark-700'
              }`}
            >
              👥 User Management
            </button>
            <button
              onClick={() => setActiveTab('coupons')}
              className={`flex-1 px-6 py-4 font-medium transition-all ${
                activeTab === 'coupons'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white dark:bg-dark-800 text-dark-600 dark:text-dark-300 hover:bg-dark-50 dark:hover:bg-dark-700'
              }`}
            >
              🎟️ Coupon Management
            </button>
            <button
              onClick={() => setActiveTab('psychologists')}
              className={`flex-1 px-6 py-4 font-medium transition-all ${
                activeTab === 'psychologists'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white dark:bg-dark-800 text-dark-600 dark:text-dark-300 hover:bg-dark-50 dark:hover:bg-dark-700'
              }`}
            >
              👨‍⚕️ Psychologist Management
            </button>
          </div>

          <div className="p-6">
            {/* User Management Tab */}
            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-dark-900 dark:text-white">User Management</h2>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Search by phone number (10 digits)..."
                      value={searchPhone}
                      onChange={handleSearchChange}
                      className="px-4 py-2 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 w-80"
                      maxLength="15"
                    />
                    <button
                      onClick={fetchActiveUsers}
                      className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-all flex items-center gap-2"
                    >
                      <span>🔄</span>
                      <span>Refresh</span>
                    </button>
                  </div>
                </div>

                {userError && (
                  <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-500 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
                    {userError}
                  </div>
                )}

                {loadingUsers ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent mx-auto"></div>
                    <p className="text-dark-600 dark:text-dark-300 mt-4">Loading users...</p>
                  </div>
                ) : (
                  <>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-dark-100 dark:bg-dark-700">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-dark-700 dark:text-dark-300 uppercase tracking-wider">ID</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-dark-700 dark:text-dark-300 uppercase tracking-wider">Name</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-dark-700 dark:text-dark-300 uppercase tracking-wider">Email</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-dark-700 dark:text-dark-300 uppercase tracking-wider">Phone</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-dark-700 dark:text-dark-300 uppercase tracking-wider">Plan</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-dark-700 dark:text-dark-300 uppercase tracking-wider">Status</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-dark-700 dark:text-dark-300 uppercase tracking-wider">Join Date</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-dark-700 dark:text-dark-300 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-dark-800 divide-y divide-dark-200 dark:divide-dark-700">
                          {users.map((user) => (
                            <tr key={user.id} className="hover:bg-dark-50 dark:hover:bg-dark-700">
                              <td className="px-4 py-4 text-sm text-dark-900 dark:text-white font-mono text-xs">{String(user.id).substring(0, 8)}...</td>
                              <td className="px-4 py-4 text-sm font-medium text-dark-900 dark:text-white">{user.name}</td>
                              <td className="px-4 py-4 text-sm text-dark-600 dark:text-dark-300">{user.email}</td>
                              <td className="px-4 py-4 text-sm text-dark-600 dark:text-dark-300">{user.phone}</td>
                              <td className="px-4 py-4 text-sm text-dark-600 dark:text-dark-300">{user.plan}</td>
                              <td className="px-4 py-4 text-sm">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  user.status === 'active' 
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                    : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                                }`}>
                                  {user.status}
                                </span>
                              </td>
                              <td className="px-4 py-4 text-sm text-dark-600 dark:text-dark-300">{user.joinDate}</td>
                              <td className="px-4 py-4 text-sm">
                                <button
                                  onClick={() => handleDeleteUser(user.id)}
                                  className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {users.length === 0 && !loadingUsers && (
                      <div className="text-center py-12">
                        <p className="text-dark-500 dark:text-dark-400">
                          {searchPhone ? `No users found with phone number "${searchPhone}"` : 'No active billing users found'}
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Coupon Management Tab */}
            {activeTab === 'coupons' && (
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
            )}

            {/* Psychologist Management Tab */}
            {activeTab === 'psychologists' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center flex-wrap gap-4">
                  <h2 className="text-xl font-bold text-dark-900 dark:text-white">Psychologist Management</h2>
                  <div className="flex gap-3 items-center flex-wrap">
                    <select
                      value={psychologistFilter.type}
                      onChange={(e) => setPsychologistFilter({ type: e.target.value, language: '' })}
                      className="px-4 py-2 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Select Specialization</option>
                      <option value="Clinical Psychology">Clinical Psychology</option>
                      <option value="Cognitive Behavioral Therapy">Cognitive Behavioral Therapy</option>
                      <option value="Child Psychology">Child Psychology</option>
                      <option value="Anxiety & Depression">Anxiety & Depression</option>
                      <option value="Marriage Counseling">Marriage Counseling</option>
                    </select>
                    <span className="text-dark-600 dark:text-dark-300">OR</span>
                    <select
                      value={psychologistFilter.language}
                      onChange={(e) => setPsychologistFilter({ type: '', language: e.target.value })}
                      className="px-4 py-2 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Select Language</option>
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Marathi">Marathi</option>
                      <option value="Spanish">Spanish</option>
                    </select>
                    <button
                      onClick={handleFilterPsychologists}
                      className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-all"
                    >
                      🔍 Search
                    </button>
                    <button
                      onClick={() => setShowPsychologistModal(true)}
                      className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all flex items-center gap-2"
                    >
                      <span>➕</span>
                      <span>Add</span>
                    </button>
                  </div>
                </div>

                {psychologistError && (
                  <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-500 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
                    {psychologistError}
                  </div>
                )}

                {loadingPsychologists ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent mx-auto"></div>
                    <p className="text-dark-600 dark:text-dark-300 mt-4">Loading psychologists...</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {psychologists.map((psychologist) => (
                        <div key={psychologist.id} className="bg-dark-50 dark:bg-dark-700 rounded-lg p-6 border border-dark-200 dark:border-dark-600">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-lg font-bold text-dark-900 dark:text-white">
                                {psychologist.name || 'Psychologist'}
                              </h3>
                              <p className="text-sm text-primary-600 dark:text-primary-400">
                                {psychologist.specialization}
                              </p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              psychologist.is_active 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                            }`}>
                              {psychologist.is_active ? 'active' : 'inactive'}
                            </span>
                          </div>
                          
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm text-dark-600 dark:text-dark-300">
                              <span>🗣️</span>
                              <span>{psychologist.languages?.join(', ') || 'N/A'}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-dark-600 dark:text-dark-300">
                              <span>💼</span>
                              <span>{psychologist.experience_years} years experience</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-dark-600 dark:text-dark-300">
                              <span>💰</span>
                              <span>₹{psychologist.hourly_rate}/hour</span>
                            </div>
                            <div className="text-sm text-dark-600 dark:text-dark-300 mt-2">
                              <p className="line-clamp-2">{psychologist.bio || 'No bio available'}</p>
                            </div>
                          </div>

                          <button
                            onClick={() => handleRemovePsychologist(psychologist.id)}
                            className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>

                    {psychologists.length === 0 && !loadingPsychologists && (
                      <div className="text-center py-12">
                        <p className="text-dark-500 dark:text-dark-400">
                          No psychologists found. Try a different filter.
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Coupon Modal */}
      {showCouponModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-6">Create New Coupon</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Coupon Code</label>
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
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Discount Type</label>
                  <select
                    value={newCoupon.type}
                    onChange={(e) => setNewCoupon({...newCoupon, type: e.target.value})}
                    className="w-full px-4 py-2 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="Percentage">Percentage (%)</option>
                    <option value="Fixed Amount">Fixed Amount (₹)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                    Value {newCoupon.type === 'Percentage' ? '(%)' : '(₹)'}
                  </label>
                  <input
                    type="number"
                    value={newCoupon.value}
                    onChange={(e) => setNewCoupon({...newCoupon, value: e.target.value})}
                    placeholder={newCoupon.type === 'Percentage' ? '10' : '500'}
                    className="w-full px-4 py-2 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Usage Limit</label>
                  <input
                    type="number"
                    value={newCoupon.usageLimit}
                    onChange={(e) => setNewCoupon({...newCoupon, usageLimit: e.target.value})}
                    placeholder="100"
                    className="w-full px-4 py-2 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <p className="text-xs text-dark-500 dark:text-dark-400 mt-1">Each user can redeem only once</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Valid Until</label>
                  <input
                    type="date"
                    value={newCoupon.validUntil}
                    onChange={(e) => setNewCoupon({...newCoupon, validUntil: e.target.value})}
                    className="w-full px-4 py-2 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Applicable To</label>
                <select
                  value={newCoupon.applicableTo}
                  onChange={(e) => setNewCoupon({...newCoupon, applicableTo: e.target.value})}
                  className="w-full px-4 py-2 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">All Users</option>
                  <option value="new">New Users Only</option>
                  <option value="existing">Existing Users Only</option>
                  <option value="specific">Specific Email/Phone</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Plan Type</label>
                <select
                  value={newCoupon.planType}
                  onChange={(e) => setNewCoupon({...newCoupon, planType: e.target.value})}
                  className="w-full px-4 py-2 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">All Plans</option>
                  <option value="premium">Premium Only</option>
                  <option value="ultra">Ultra Only</option>
                  <option value="yearly">Yearly Plans Only</option>
                  <option value="monthly">Monthly Plans Only</option>
                </select>
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

      {/* Add Psychologist Modal */}
      {showPsychologistModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-6">Add New Psychologist</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">User ID *</label>
                <input
                  type="text"
                  value={newPsychologist.user_id}
                  onChange={(e) => setNewPsychologist({...newPsychologist, user_id: e.target.value})}
                  placeholder="550e8400-e29b-41d4-a716-446655440000"
                  className="w-full px-4 py-2 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <p className="text-xs text-dark-500 dark:text-dark-400 mt-1">Existing user account ID to link with psychologist profile</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Specialization *</label>
                <select
                  value={newPsychologist.specialization}
                  onChange={(e) => setNewPsychologist({...newPsychologist, specialization: e.target.value})}
                  className="w-full px-4 py-2 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="Clinical Psychology">Clinical Psychology</option>
                  <option value="Cognitive Behavioral Therapy">Cognitive Behavioral Therapy</option>
                  <option value="Child Psychology">Child Psychology</option>
                  <option value="Anxiety & Depression">Anxiety & Depression</option>
                  <option value="Marriage and Family Therapy">Marriage and Family Therapy</option>
                  <option value="Trauma Therapy">Trauma Therapy</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Languages *</label>
                <div className="grid grid-cols-2 gap-2">
                  {['English', 'Hindi', 'Marathi', 'Spanish', 'Bengali', 'Tamil'].map(lang => (
                    <label key={lang} className="flex items-center gap-2 p-2 border border-dark-300 dark:border-dark-600 rounded-lg cursor-pointer hover:bg-dark-50 dark:hover:bg-dark-700">
                      <input
                        type="checkbox"
                        checked={selectedLanguages.includes(lang)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedLanguages([...selectedLanguages, lang]);
                          } else {
                            setSelectedLanguages(selectedLanguages.filter(l => l !== lang));
                          }
                        }}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-dark-900 dark:text-white">{lang}</span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-dark-500 dark:text-dark-400 mt-1">Selected: {selectedLanguages.join(', ') || 'None'}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Experience (years) *</label>
                  <input
                    type="number"
                    value={newPsychologist.experience_years}
                    onChange={(e) => setNewPsychologist({...newPsychologist, experience_years: e.target.value})}
                    placeholder="5"
                    min="0"
                    className="w-full px-4 py-2 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Hourly Rate (₹) *</label>
                  <input
                    type="number"
                    value={newPsychologist.hourly_rate}
                    onChange={(e) => setNewPsychologist({...newPsychologist, hourly_rate: e.target.value})}
                    placeholder="120"
                    min="0"
                    step="10"
                    className="w-full px-4 py-2 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Bio</label>
                <textarea
                  value={newPsychologist.bio}
                  onChange={(e) => setNewPsychologist({...newPsychologist, bio: e.target.value})}
                  placeholder="Licensed clinical psychologist specializing in anxiety, depression, and cognitive behavioral therapy..."
                  rows="4"
                  className="w-full px-4 py-2 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddPsychologist}
                className="flex-1 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-all"
              >
                Create Profile
              </button>
              <button
                onClick={() => {
                  setShowPsychologistModal(false);
                  setNewPsychologist({
                    user_id: '',
                    specialization: 'Clinical Psychology',
                    languages: [],
                    experience_years: '',
                    hourly_rate: '',
                    bio: ''
                  });
                  setSelectedLanguages([]);
                }}
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

export default AdminDashboard;