import React, { useState, useEffect } from 'react';

const PsychologistManagement = () => {
  const [psychologists, setPsychologists] = useState([]);
  const [loadingPsychologists, setLoadingPsychologists] = useState(false);
  const [psychologistError, setPsychologistError] = useState('');
  const [psychologistFilter, setPsychologistFilter] = useState({ type: '', language: '' });
  const [showPsychologistModal, setShowPsychologistModal] = useState(false);
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

  useEffect(() => {
    fetchPsychologists();
  }, []);

  const fetchPsychologists = async (filterType = 'Clinical Psychology', filterLang = '') => {
    setLoadingPsychologists(true);
    setPsychologistError('');
    try {
      let url = `${API_BASE_URL}/api/psychologists?`;
      
      if (filterType && !filterLang) {
        url += `type=${encodeURIComponent(filterType)}`;
      } else if (filterLang && !filterType) {
        url += `language=${encodeURIComponent(filterLang)}`;
      } else {
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
        fetchPsychologists(psychologistFilter.type, psychologistFilter.language);
      } else {
        alert(data.error || data.message || 'Failed to create psychologist profile');
      }
    } catch (error) {
      console.error('Error creating psychologist:', error);
      alert('Error creating psychologist. Please try again.');
    }
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
    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-lg p-6">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <span>₹{psychologist.session_45_minute_rate || psychologist.emergency_call_rate}/hour</span>
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

                  <button
                    onClick={() => handleRemovePsychologist(psychologist.id)}
                    className="w-full px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all font-medium"
                  >
                    Remove
                  </button>
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

export default PsychologistManagement;
