import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../config/api';

const PsychologistManagement = () => {
  const [psychologists, setPsychologists] = useState([]);
  const [loadingPsychologists, setLoadingPsychologists] = useState(false);
  const [psychologistError, setPsychologistError] = useState('');
  const [psychologistFilter, setPsychologistFilter] = useState({ type: '', language: '' });
  const [showPsychologistModal, setShowPsychologistModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1 = Create User, 2 = Complete Profile
  const [createdUserId, setCreatedUserId] = useState('');
  const [editingPsychologist, setEditingPsychologist] = useState(null);
  
  // Step 1: User Creation
  const [userData, setUserData] = useState({
    email: '',
    username: '',
    password: ''
  });

  // Step 2: Complete Profile
  const [profileData, setProfileData] = useState({
    name: '',
    degree: '',
    additional_qualification: '',
    mobile_number: '',
    languages: [],
    emergency_call_rate: '',
    session_45_minute_rate: '',
    session_20_minute_rate: '',
    psychologist_type: [],
    about_section: '',
    skills: [],
    banking_name: '',
    bank_name: '',
    branch_name: '',
    branch_code: '',
    account_number: '',
    ifsc_code: ''
  });

  useEffect(() => {
    fetchPsychologists();
  }, []);

  const fetchPsychologists = async (filterType = 'Clinical Psychology', filterLang = '') => {
    setLoadingPsychologists(true);
    setPsychologistError('');
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        setPsychologistError('Authentication required. Please login again.');
        setLoadingPsychologists(false);
        return;
      }

      let url = `${API_BASE_URL}/api/admin/psychologists`;
      
      // if (filterType && !filterLang) {
      //   url += `type=${encodeURIComponent(filterType)}`;
      // } else if (filterLang && !filterType) {
      //   url += `language=${encodeURIComponent(filterLang)}`;
      // } else {
      //   url += `type=Clinical Psychology`;
      // }

      console.log('Fetching psychologists from:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      console.log('Psychologists response:', data.data.data);

      if (response.ok && data.success) {
        const psychologistsList = data?.data.data?.psychologists || [];
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

  // Step 1: Create User with Psychologist Role
  const handleCreateUser = async () => {
    // Validate required fields
    if (!userData.email || !userData.username || !userData.password) {
      alert('Please fill all required fields (Email, Username, Password)');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Username validation (3-50 characters, no spaces)
    if (userData.username.length < 3 || userData.username.length > 50) {
      alert('Username must be between 3 and 50 characters');
      return;
    }

    if (userData.username.includes(' ')) {
      alert('Username cannot contain spaces');
      return;
    }

    // Password validation (minimum 8 characters)
    if (userData.password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        alert('Authentication required. Please login again.');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/admin/users/create-psychologist`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: userData.email,
          username: userData.username,
          password: userData.password,
          role: 'psychologist'
        })
      });

      const data = await response.json();
      console.log('Create user response:', data);

      if (response.ok && data.success) {
        alert('✅ User account created successfully!');
        setCreatedUserId(data.data.user.id);
        setProfileData({ ...profileData, name: userData.username }); // Pre-fill name
        setCurrentStep(2); // Move to Step 2
      } else {
        alert(data.error || data.message || 'Failed to create user account');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Error creating user. Please try again.');
    }
  };

  // Step 2: Update Complete Profile
  const handleUpdateProfile = async () => {
    // Validate required fields
    if (!profileData.name || !profileData.name.trim()) {
      alert('Please enter the psychologist\'s full name');
      return;
    }

    if (profileData.languages.length === 0) {
      alert('Please select at least one language');
      return;
    }

    // Validate mobile number if provided
    if (profileData.mobile_number) {
      const mobileRegex = /^[0-9]{10}$/;
      if (!mobileRegex.test(profileData.mobile_number.replace(/\s/g, ''))) {
        alert('Please enter a valid 10-digit mobile number');
        return;
      }
    }

    // Validate rates if provided
    if (profileData.emergency_call_rate && parseFloat(profileData.emergency_call_rate) < 0) {
      alert('Emergency call rate cannot be negative');
      return;
    }

    if (profileData.session_45_minute_rate && parseFloat(profileData.session_45_minute_rate) < 0) {
      alert('45-minute session rate cannot be negative');
      return;
    }

    if (profileData.session_20_minute_rate && parseFloat(profileData.session_20_minute_rate) < 0) {
      alert('20-minute session rate cannot be negative');
      return;
    }

    // Validate IFSC code if provided
    if (profileData.ifsc_code && profileData.ifsc_code.trim()) {
      const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
      if (!ifscRegex.test(profileData.ifsc_code.trim())) {
        alert('Please enter a valid IFSC code (e.g., HDFC0000185)');
        return;
      }
    }

    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        alert('Authentication required. Please login again.');
        return;
      }

      const userId = editingPsychologist ? editingPsychologist.user_id : createdUserId;

      const response = await fetch(`${API_BASE_URL}/api/psychologists/by-user/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: profileData.name.trim(),
          degree: profileData.degree || null,
          additional_qualification: profileData.additional_qualification || null,
          mobile_number: profileData.mobile_number || null,
          languages: profileData.languages,
          emergency_call_rate: profileData.emergency_call_rate ? parseFloat(profileData.emergency_call_rate) : 0,
          session_45_minute_rate: profileData.session_45_minute_rate ? parseFloat(profileData.session_45_minute_rate) : 0,
          session_20_minute_rate: profileData.session_20_minute_rate ? parseFloat(profileData.session_20_minute_rate) : 0,
          psychologist_type: profileData.psychologist_type,
          about_section: profileData.about_section || null,
          skills: profileData.skills,
          banking_name: profileData.banking_name || null,
          bank_name: profileData.bank_name || null,
          branch_name: profileData.branch_name || null,
          branch_code: profileData.branch_code || null,
          account_number: profileData.account_number || null,
          ifsc_code: profileData.ifsc_code || null
        })
      });

      const data = await response.json();
      console.log('Update profile response:', data);

      if (response.ok && data.success) {
        alert(editingPsychologist ? '✅ Psychologist updated successfully!' : '✅ Psychologist profile completed successfully!');
        handleCloseModal();
        fetchPsychologists(psychologistFilter.type, psychologistFilter.language);
      } else {
        alert(data.error || data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile. Please try again.');
    }
  };

  const handleEditPsychologist = (psychologist) => {
    setEditingPsychologist(psychologist);
    setCreatedUserId(psychologist.user_id);
    setProfileData({
      name: psychologist.name || '',
      degree: psychologist.degree || '',
      additional_qualification: psychologist.additional_qualification || '',
      mobile_number: psychologist.mobile_number || '',
      languages: psychologist.languages || [],
      emergency_call_rate: psychologist.emergency_call_rate || '',
      session_45_minute_rate: psychologist.session_45_minute_rate || '',
      session_20_minute_rate: psychologist.session_20_minute_rate || '',
      psychologist_type: psychologist.psychologist_type || [],
      about_section: psychologist.about_section || '',
      skills: psychologist.skills || [],
      banking_name: psychologist.banking_name || '',
      bank_name: psychologist.bank_name || '',
      branch_name: psychologist.branch_name || '',
      branch_code: psychologist.branch_code || '',
      account_number: psychologist.account_number || '',
      ifsc_code: psychologist.ifsc_code || ''
    });
    setCurrentStep(2); // Skip to profile editing
    setShowPsychologistModal(true);
  };

  const handleCloseModal = () => {
    setShowPsychologistModal(false);
    setCurrentStep(1);
    setCreatedUserId('');
    setEditingPsychologist(null);
    setUserData({ email: '', username: '', password: '' });
    setProfileData({
      name: '',
      degree: '',
      additional_qualification: '',
      mobile_number: '',
      languages: [],
      emergency_call_rate: '',
      session_45_minute_rate: '',
      session_20_minute_rate: '',
      psychologist_type: [],
      about_section: '',
      skills: [],
      banking_name: '',
      bank_name: '',
      branch_name: '',
      branch_code: '',
      account_number: '',
      ifsc_code: ''
    });
  };

  const handleAddPsychologist = async () => {
    // This function is replaced by 2-step flow
    // Kept for compatibility
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
        fetchPsychologists(psychologistFilter.type, psychologistFilter.language);
      } else {
        alert(data.error || data.message || 'Failed to delete psychologist');
      }
    } catch (error) {
      console.error('Error deleting psychologist:', error);
      alert('Error deleting psychologist. Please try again.');
    }
  };

  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-lg p-4 sm:p-6">
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <h2 className="text-lg sm:text-xl font-bold text-dark-900 dark:text-white">Psychologist Management</h2>
          <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-center">
            <select
              value={psychologistFilter.type}
              onChange={(e) => setPsychologistFilter({ type: e.target.value, language: '' })}
              className="w-full sm:w-auto px-3 sm:px-4 py-2 text-sm border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Select Specialization</option>
              <option value="Clinical Psychology">Clinical Psychology</option>
              <option value="Cognitive Behavioral Therapy">Cognitive Behavioral Therapy</option>
              <option value="Child Psychology">Child Psychology</option>
              <option value="Anxiety & Depression">Anxiety & Depression</option>
              <option value="Marriage Counseling">Marriage Counseling</option>
            </select>
            <span className="text-center text-dark-600 dark:text-dark-300 text-sm hidden sm:inline">OR</span>
            <select
              value={psychologistFilter.language}
              onChange={(e) => setPsychologistFilter({ type: '', language: e.target.value })}
              className="w-full sm:w-auto px-3 sm:px-4 py-2 text-sm border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Select Language</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Marathi">Marathi</option>
              <option value="Spanish">Spanish</option>
            </select>
            <button
              onClick={handleFilterPsychologists}
              className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-all text-sm font-medium"
            >
              🔍 <span className="hidden sm:inline">Search</span>
            </button>
            <button
              onClick={() => setShowPsychologistModal(true)}
              className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all flex items-center justify-center gap-2 text-sm font-medium"
            >
              <span>➕</span>
              <span>Add</span>
            </button>
          </div>
        </div>

        {psychologistError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {psychologistError}
          </div>
        )}

        {loadingPsychologists ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading psychologists...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {psychologists.map((psychologist) => (
                <div key={psychologist.id} className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {psychologist.name || 'Psychologist'}
                      </h3>
                      <p className="text-sm text-blue-600">
                        {psychologist.degree || psychologist.psychologist_type?.[0] || 'Professional'}
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      inactive
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>🗣️</span>
                      <span>{psychologist.languages?.join(', ') || 'N/A'}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>👨‍⚕️</span>
                      <span>{psychologist.psychologist_type?.join(', ') || 'N/A'}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>💰</span>
                      <span>₹{psychologist.session_45_minute_rate || psychologist.emergency_call_rate || 0}/session</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>📞</span>
                      <span>{psychologist.mobile_number || 'Not available'}</span>
                    </div>

                    {psychologist.about_section && (
                      <div className="text-sm text-gray-600 mt-3 pt-2 border-t border-gray-200">
                        <p className="line-clamp-2">{psychologist.about_section}</p>
                      </div>
                    )}

                    {psychologist.skills && psychologist.skills.length > 0 && (
                      <div className="text-sm mt-3 pt-2 border-t border-gray-200">
                        <p className="text-gray-700 font-medium mb-1">Skills:</p>
                        <div className="flex flex-wrap gap-1">
                          {psychologist.skills.slice(0, 3).map((skill, idx) => (
                            <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                              {skill}
                            </span>
                          ))}
                          {psychologist.skills.length > 3 && (
                            <span className="px-2 py-1 text-gray-600 text-xs">+{psychologist.skills.length - 3} more</span>
                          )}
                        </div>
                      </div>
                    )}

                    {(psychologist.banking_name || psychologist.bank_name) && (
                      <div className="text-sm text-gray-600 mt-3 pt-2 border-t border-gray-200">
                        <p className="text-gray-700 font-medium">Banking:</p>
                        <p className="text-xs">{psychologist.banking_name || 'N/A'}</p>
                        <p className="text-xs">{psychologist.bank_name || 'N/A'}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditPsychologist(psychologist)}
                      className="flex-1 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all font-medium text-sm"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleRemovePsychologist(psychologist.id)}
                      className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all font-medium text-sm"
                    >
                      🗑️ Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {psychologists.length === 0 && !loadingPsychologists && (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  No psychologists found. Try a different filter.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Add/Edit Psychologist Modal - 2 Step Flow */}
      {showPsychologistModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white dark:bg-dark-800 rounded-2xl p-4 sm:p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            
            {/* Step Indicator */}
            {!editingPsychologist && (
              <div className="flex items-center justify-center mb-6">
                <div className="flex items-center gap-2">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep === 1 ? 'bg-primary-500 text-white' : 'bg-green-500 text-white'}`}>
                    {currentStep === 1 ? '1' : '✓'}
                  </div>
                  <div className={`h-1 w-16 ${currentStep === 2 ? 'bg-primary-500' : 'bg-gray-300'}`}></div>
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep === 2 ? 'bg-primary-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                    2
                  </div>
                </div>
              </div>
            )}

            <h2 className="text-xl sm:text-2xl font-bold text-dark-900 dark:text-white mb-2">
              {editingPsychologist ? 'Edit Psychologist Profile' : currentStep === 1 ? 'Step 1: Create User Account' : 'Step 2: Complete Profile Details'}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              {editingPsychologist ? 'Update psychologist information' : currentStep === 1 ? 'Create login credentials for the psychologist' : 'Fill in professional and banking information'}
            </p>

            {/* Step 1: Create User Account */}
            {currentStep === 1 && !editingPsychologist && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData({...userData, email: e.target.value})}
                    placeholder="dr.smith@example.com"
                    className="w-full px-4 py-3 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Username *</label>
                  <input
                    type="text"
                    value={userData.username}
                    onChange={(e) => setUserData({...userData, username: e.target.value})}
                    placeholder="dr_smith"
                    className="w-full px-4 py-3 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Used for login. Must be 3-50 characters.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Password *</label>
                  <input
                    type="password"
                    value={userData.password}
                    onChange={(e) => setUserData({...userData, password: e.target.value})}
                    placeholder="Minimum 8 characters"
                    className="w-full px-4 py-3 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Minimum 8 characters required.</p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    ℹ️ This will create a user account with psychologist role and auto-verify it. No OTP required.
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Complete Profile */}
            {currentStep === 2 && (
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">📋 Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Full Name *</label>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                        placeholder="Dr. Smita Gosavi"
                        className="w-full px-4 py-2.5 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Degree</label>
                      <input
                        type="text"
                        value={profileData.degree}
                        onChange={(e) => setProfileData({...profileData, degree: e.target.value})}
                        placeholder="Master in Psychology (MA Psychology)"
                        className="w-full px-4 py-2.5 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Additional Qualification</label>
                      <input
                        type="text"
                        value={profileData.additional_qualification}
                        onChange={(e) => setProfileData({...profileData, additional_qualification: e.target.value})}
                        placeholder="PGCCC - MIMH"
                        className="w-full px-4 py-2.5 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Mobile Number</label>
                      <input
                        type="tel"
                        value={profileData.mobile_number}
                        onChange={(e) => setProfileData({...profileData, mobile_number: e.target.value})}
                        placeholder="9011094376"
                        className="w-full px-4 py-2.5 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Languages *</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {['English', 'Hindi', 'Marathi', 'Spanish', 'Bengali', 'Tamil', 'Gujarati', 'Telugu'].map(lang => (
                          <label key={lang} className="flex items-center gap-2 p-2.5 border border-dark-300 dark:border-dark-600 rounded-lg cursor-pointer hover:bg-dark-50 dark:hover:bg-dark-700">
                            <input
                              type="checkbox"
                              checked={profileData.languages.includes(lang)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setProfileData({...profileData, languages: [...profileData.languages, lang]});
                                } else {
                                  setProfileData({...profileData, languages: profileData.languages.filter(l => l !== lang)});
                                }
                              }}
                              className="w-4 h-4 text-primary-500 rounded focus:ring-2 focus:ring-primary-500"
                            />
                            <span className="text-sm text-dark-900 dark:text-white">{lang}</span>
                          </label>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Selected: {profileData.languages.join(', ') || 'None'}</p>
                    </div>
                  </div>
                </div>

                {/* Session Rates */}
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">💰 Session Rates</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Emergency Call Rate (₹)</label>
                      <input
                        type="number"
                        value={profileData.emergency_call_rate}
                        onChange={(e) => setProfileData({...profileData, emergency_call_rate: e.target.value})}
                        placeholder="2500"
                        className="w-full px-4 py-2.5 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">45 Min Session (₹)</label>
                      <input
                        type="number"
                        value={profileData.session_45_minute_rate}
                        onChange={(e) => setProfileData({...profileData, session_45_minute_rate: e.target.value})}
                        placeholder="1200"
                        className="w-full px-4 py-2.5 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">20 Min Session (₹)</label>
                      <input
                        type="number"
                        value={profileData.session_20_minute_rate}
                        onChange={(e) => setProfileData({...profileData, session_20_minute_rate: e.target.value})}
                        placeholder="600"
                        className="w-full px-4 py-2.5 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Specializations */}
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">🎯 Specializations</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {['Child Counselor', 'Depression Specialist', 'Anxiety Specialist', 'Trauma Therapist', 'Addiction Counselor', 'Relationship Counselor', 'Career Counselor', 'Yoga/Meditation Therapist'].map(type => (
                      <label key={type} className="flex items-center gap-2 p-2.5 border border-dark-300 dark:border-dark-600 rounded-lg cursor-pointer hover:bg-dark-50 dark:hover:bg-dark-700">
                        <input
                          type="checkbox"
                          checked={profileData.psychologist_type.includes(type)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setProfileData({...profileData, psychologist_type: [...profileData.psychologist_type, type]});
                            } else {
                              setProfileData({...profileData, psychologist_type: profileData.psychologist_type.filter(t => t !== type)});
                            }
                          }}
                          className="w-4 h-4 text-primary-500 rounded focus:ring-2 focus:ring-primary-500"
                        />
                        <span className="text-sm text-dark-900 dark:text-white">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">🛠️ Therapy Skills</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {['Supportive Therapy', 'Behavior Therapy', 'Cognitive Behavior Therapy', 'Dialectical Behavior Therapy', 'Grief Therapy', 'Marital Therapy', 'Family Therapy', 'Play Therapy', 'Art Therapy', 'Music Therapy', 'Crisis Intervention', 'Mindfulness-Based Therapy'].map(skill => (
                      <label key={skill} className="flex items-center gap-2 p-2.5 border border-dark-300 dark:border-dark-600 rounded-lg cursor-pointer hover:bg-dark-50 dark:hover:bg-dark-700">
                        <input
                          type="checkbox"
                          checked={profileData.skills.includes(skill)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setProfileData({...profileData, skills: [...profileData.skills, skill]});
                            } else {
                              setProfileData({...profileData, skills: profileData.skills.filter(s => s !== skill)});
                            }
                          }}
                          className="w-4 h-4 text-primary-500 rounded focus:ring-2 focus:ring-primary-500"
                        />
                        <span className="text-sm text-dark-900 dark:text-white">{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* About Section */}
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">📝 About</h3>
                  <textarea
                    value={profileData.about_section}
                    onChange={(e) => setProfileData({...profileData, about_section: e.target.value})}
                    placeholder="Experienced Clinical Psychologist specializing in child counseling and depression treatment..."
                    rows="4"
                    className="w-full px-4 py-3 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                {/* Banking Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">🏦 Banking Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Account Holder Name</label>
                      <input
                        type="text"
                        value={profileData.banking_name}
                        onChange={(e) => setProfileData({...profileData, banking_name: e.target.value})}
                        placeholder="Smita Sanjaygiri Gosavi"
                        className="w-full px-4 py-2.5 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Bank Name</label>
                      <input
                        type="text"
                        value={profileData.bank_name}
                        onChange={(e) => setProfileData({...profileData, bank_name: e.target.value})}
                        placeholder="HDFC Bank"
                        className="w-full px-4 py-2.5 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Branch Name</label>
                      <input
                        type="text"
                        value={profileData.branch_name}
                        onChange={(e) => setProfileData({...profileData, branch_name: e.target.value})}
                        placeholder="Nigdi"
                        className="w-full px-4 py-2.5 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Branch Code</label>
                      <input
                        type="text"
                        value={profileData.branch_code}
                        onChange={(e) => setProfileData({...profileData, branch_code: e.target.value})}
                        placeholder="185"
                        className="w-full px-4 py-2.5 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Account Number</label>
                      <input
                        type="text"
                        value={profileData.account_number}
                        onChange={(e) => setProfileData({...profileData, account_number: e.target.value})}
                        placeholder="50100364073333"
                        className="w-full px-4 py-2.5 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">IFSC Code</label>
                      <input
                        type="text"
                        value={profileData.ifsc_code}
                        onChange={(e) => setProfileData({...profileData, ifsc_code: e.target.value})}
                        placeholder="HDFC0000185"
                        className="w-full px-4 py-2.5 border border-dark-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t">
              {currentStep === 1 && !editingPsychologist && (
                <>
                  <button
                    onClick={handleCreateUser}
                    className="flex-1 px-4 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-all font-medium flex items-center justify-center gap-2"
                  >
                    <span>Create User Account</span>
                    <span>→</span>
                  </button>
                  <button
                    onClick={handleCloseModal}
                    className="flex-1 px-4 py-3 bg-gray-200 dark:bg-dark-600 hover:bg-gray-300 dark:hover:bg-dark-500 text-dark-900 dark:text-white rounded-lg transition-all font-medium"
                  >
                    Cancel
                  </button>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <button
                    onClick={handleUpdateProfile}
                    className="flex-1 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all font-medium flex items-center justify-center gap-2"
                  >
                    <span>✓</span>
                    <span>{editingPsychologist ? 'Update Profile' : 'Complete & Save'}</span>
                  </button>
                  {!editingPsychologist && (
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="px-4 py-3 bg-gray-200 dark:bg-dark-600 hover:bg-gray-300 dark:hover:bg-dark-500 text-dark-900 dark:text-white rounded-lg transition-all font-medium"
                    >
                      ← Back
                    </button>
                  )}
                  <button
                    onClick={handleCloseModal}
                    className="px-4 py-3 bg-gray-200 dark:bg-dark-600 hover:bg-gray-300 dark:hover:bg-dark-500 text-dark-900 dark:text-white rounded-lg transition-all font-medium"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PsychologistManagement;
