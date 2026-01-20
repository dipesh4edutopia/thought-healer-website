import React, { useState, useEffect } from 'react';

const UserManagement = () => {
  const [searchPhone, setSearchPhone] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [userError, setUserError] = useState('');

  const API_BASE_URL = 'https://thoughtprob2c.thoughthealer.org';

  useEffect(() => {
    fetchActiveUsers();
  }, [currentPage, perPage, roleFilter, searchEmail]);

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

      // Build query parameters
      const params = new URLSearchParams();
      params.append('page', currentPage);
      params.append('per_page', perPage);
      if (roleFilter) {
        params.append('role', roleFilter);
      }
      if (searchEmail) {
        params.append('search', searchEmail);
      }

      const response = await fetch(`${API_BASE_URL}/api/admin/users?${params.toString()}`, {
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
        let pagination = null;
        
        if (data.data && data.data.data && Array.isArray(data.data.data.users)) {
          usersArray = data.data.data.users;
          pagination = data.data.data.pagination;
          console.log('Using data.data.data.users array');
        } else if (data.data && Array.isArray(data.data.users)) {
          usersArray = data.data.users;
          pagination = data.data.pagination;
          console.log('Using data.data.users array');
        } else if (data.data && Array.isArray(data.data.data)) {
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

        // Update pagination info
        if (pagination) {
          setTotalPages(pagination.total_pages || 1);
          setTotalUsers(pagination.total || 0);
        }
        
        const mappedUsers = usersArray.map(user => ({
          id: user.id || user.user_id,
          name: user.full_name || user.username || user.email.split('@')[0] || 'N/A',
          email: user.email || 'N/A',
          phone: user.phone || user.phone_number || 'N/A',
          plan: user.plan_name || user.plan_type || 'N/A',
          status: user.status || 'active',
          role: user.role || 'user',
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

  const handleEmailSearch = (e) => {
    const email = e.target.value;
    setSearchEmail(email);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleRoleFilter = (e) => {
    setRoleFilter(e.target.value);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handlePerPageChange = (e) => {
    setPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to first page when changing per page
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 sm:p-4 lg:p-6">
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">User Management</h2>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total Users: <span className="font-bold text-gray-900 dark:text-white">{totalUsers}</span>
          </div>
        </div>

        {/* Filters Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <input
            type="text"
            placeholder="Search by email..."
            value={searchEmail}
            onChange={handleEmailSearch}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
          />
          
          <input
            type="text"
            placeholder="Search by phone..."
            value={searchPhone}
            onChange={handleSearchChange}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            maxLength="15"
          />

          <select
            value={roleFilter}
            onChange={handleRoleFilter}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
          >
            <option value="">All Roles</option>
            <option value="user">User</option>
            <option value="psychologist">Psychologist</option>
            <option value="miniminds">MiniMinds</option>
            <option value="admin">Admin</option>
          </select>

          <select
            value={perPage}
            onChange={handlePerPageChange}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
          >
            <option value="10">10 per page</option>
            <option value="25">25 per page</option>
            <option value="50">50 per page</option>
            <option value="100">100 per page</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => {
              setSearchEmail('');
              setSearchPhone('');
              setRoleFilter('');
              setCurrentPage(1);
            }}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-all flex items-center gap-2 text-sm"
          >
            <span>🔄</span>
            <span>Reset Filters</span>
          </button>
        </div>

        {userError && (
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg">
            {userError}
          </div>
        )}

        {loadingUsers ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-500 border-t-transparent mx-auto"></div>
            <p className="text-gray-600 dark:text-gray-300 mt-4">Loading users...</p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
              <table className="w-full min-w-[800px]">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">Phone</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">Role</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">Plan</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">Join Date</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-4 py-3 text-xs text-gray-900 dark:text-gray-100 font-mono">{user.id}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">{user.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{user.email}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">{user.phone}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap capitalize ${
                          user.role === 'admin' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' :
                          user.role === 'psychologist' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                          user.role === 'miniminds' ? 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300' :
                          'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 capitalize">{user.plan}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                          user.status === 'active' 
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">{user.joinDate}</td>
                      <td className="px-4 py-3 text-sm">
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium whitespace-nowrap"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-3">
              {users.map((user) => (
                <div key={user.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 space-y-3 border border-gray-200 dark:border-gray-600">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1 flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-base">{user.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-mono break-all">ID: {user.id}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap flex-shrink-0 ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                    }`}>
                      {user.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 dark:text-gray-400 min-w-[60px]">Email:</span>
                      <span className="text-gray-900 dark:text-white break-all">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 dark:text-gray-400 min-w-[60px]">Phone:</span>
                      <span className="text-gray-900 dark:text-white">{user.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 dark:text-gray-400 min-w-[60px]">Plan:</span>
                      <span className="text-gray-900 dark:text-white capitalize">{user.plan}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 dark:text-gray-400 min-w-[60px]">Joined:</span>
                      <span className="text-gray-900 dark:text-white">{user.joinDate}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="w-full mt-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all font-medium text-sm"
                  >
                    Delete User
                  </button>
                </div>
              ))}
            </div>

            {users.length === 0 && !loadingUsers && (
              <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  {searchPhone || searchEmail ? `No users found` : 'No active billing users found'}
                </p>
              </div>
            )}

            {/* Pagination Controls */}
            {!loadingUsers && users.length > 0 && (
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Showing page <span className="font-bold text-gray-900 dark:text-white">{currentPage}</span> of <span className="font-bold text-gray-900 dark:text-white">{totalPages}</span>
                  {' '}({users.length} users on this page)
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-600 transition-all text-sm"
                  >
                    ⏮️ First
                  </button>
                  
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-600 transition-all text-sm"
                  >
                    ◀️ Prev
                  </button>
                  
                  <div className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm font-medium">
                    {currentPage}
                  </div>
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-600 transition-all text-sm"
                  >
                    Next ▶️
                  </button>
                  
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-600 transition-all text-sm"
                  >
                    Last ⏭️
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
