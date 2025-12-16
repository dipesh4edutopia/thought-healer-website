import React, { useState, useEffect } from 'react';

const UserManagement = () => {
  const [searchPhone, setSearchPhone] = useState('');
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [userError, setUserError] = useState('');

  const API_BASE_URL = 'https://thoughtprob2c.thoughthealer.org';

  useEffect(() => {
    fetchActiveUsers();
  }, []);

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

      if (response.ok) {
        let usersArray = [];
        
        if (data.data && Array.isArray(data.data.data)) {
          usersArray = data.data.data;
          console.log('Using data.data.data array');
        } else if (Array.isArray(data.data)) {
          usersArray = data.data;
          console.log('Using data.data array');
        } else if (Array.isArray(data.users)) {
          usersArray = data.users;
          console.log('Using data.users array');
        } else if (Array.isArray(data)) {
          usersArray = data;
          console.log('Using direct data array');
        }

        console.log('Users array length:', usersArray.length);
        
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
        setUserError('');
        console.log('Mapped users:', mappedUsers.length);
      } else {
        console.error('API Error:', data);
        setUserError(data.message || `Failed to fetch users (Status: ${response.status})`);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setUserError(`Error loading users: ${error.message}`);
    } finally {
      setLoadingUsers(false);
    }
  };

  const searchUserByPhone = async (phone) => {
    if (!phone || phone.length < 10) {
      fetchActiveUsers();
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
        fetchActiveUsers();
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
    
    if (phone.length >= 10) {
      searchUserByPhone(phone);
    } else if (phone.length === 0) {
      fetchActiveUsers();
    }
  };

  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-lg p-6">
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
    </div>
  );
};

export default UserManagement;
