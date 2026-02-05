import React, { useState, useEffect } from 'react';
import SubAdminAPI from '../../services/subAdminApi';

const SubAdminManagement = () => {
  const [subAdmins, setSubAdmins] = useState([]);
  const [availablePermissions, setAvailablePermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [selectedSubAdmin, setSelectedSubAdmin] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 20,
    total: 0,
    total_pages: 0
  });
  const [filters, setFilters] = useState({
    search: '',
    is_active: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  // Form state for creating sub-admin
  const [createForm, setCreateForm] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    permissions: []
  });

  // Form state for editing sub-admin
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    is_active: true
  });

  // Permissions state
  const [permissionsForm, setPermissionsForm] = useState([]);

  useEffect(() => {
    loadSubAdmins();
    loadAvailablePermissions();
  }, [pagination.page, filters]);

  const loadSubAdmins = async () => {
    try {
      setLoading(true);
      const response = await SubAdminAPI.getAllSubAdmins(
        pagination.page,
        pagination.per_page,
        {
          ...(filters.search && { search: filters.search }),
          ...(filters.is_active !== '' && { is_active: filters.is_active })
        }
      );

      if (response.success) {
        setSubAdmins(response.data.sub_admins);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      showMessage('error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const loadAvailablePermissions = async () => {
    try {
      const response = await SubAdminAPI.getAvailablePermissions();
      if (response.success) {
        setAvailablePermissions(response.data.permissions);
      }
    } catch (error) {
      console.error('Error loading permissions:', error);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (createForm.password !== createForm.confirmPassword) {
      showMessage('error', 'Passwords do not match');
      return;
    }

    if (createForm.password.length < 8) {
      showMessage('error', 'Password must be at least 8 characters');
      return;
    }

    try {
      const response = await SubAdminAPI.createSubAdmin({
        email: createForm.email,
        name: createForm.name,
        password: createForm.password,
        permissions: createForm.permissions.map(key => ({
          permission_key: key,
          is_enabled: true
        }))
      });

      if (response.success) {
        showMessage('success', 'Sub-admin created successfully');
        setShowCreateModal(false);
        setCreateForm({
          email: '',
          name: '',
          password: '',
          confirmPassword: '',
          permissions: []
        });
        loadSubAdmins();
      }
    } catch (error) {
      showMessage('error', error.message);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await SubAdminAPI.updateSubAdmin(
        selectedSubAdmin.id,
        editForm
      );

      if (response.success) {
        showMessage('success', 'Sub-admin updated successfully');
        setShowEditModal(false);
        setSelectedSubAdmin(null);
        loadSubAdmins();
      }
    } catch (error) {
      showMessage('error', error.message);
    }
  };

  const handlePermissionsSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await SubAdminAPI.updatePermissions(
        selectedSubAdmin.id,
        permissionsForm.map(p => ({
          permission_key: p.permission_key,
          is_enabled: p.is_enabled
        }))
      );

      if (response.success) {
        showMessage('success', 'Permissions updated successfully');
        setShowPermissionsModal(false);
        setSelectedSubAdmin(null);
        loadSubAdmins();
      }
    } catch (error) {
      showMessage('error', error.message);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete sub-admin: ${name}?`)) {
      return;
    }

    try {
      const response = await SubAdminAPI.deleteSubAdmin(id);
      if (response.success) {
        showMessage('success', 'Sub-admin deleted successfully');
        loadSubAdmins();
      }
    } catch (error) {
      showMessage('error', error.message);
    }
  };

  const openEditModal = (subAdmin) => {
    setSelectedSubAdmin(subAdmin);
    setEditForm({
      name: subAdmin.name,
      email: subAdmin.email,
      is_active: subAdmin.is_active
    });
    setShowEditModal(true);
  };

  const openPermissionsModal = async (subAdmin) => {
    setSelectedSubAdmin(subAdmin);
    
    try {
      const response = await SubAdminAPI.getSubAdminById(subAdmin.id);
      if (response.success) {
        // Create permissions form with all available permissions
        const allPerms = availablePermissions.map(perm => {
          const existingPerm = response.data.permissions.find(
            p => p.permission_key === perm.permission_key
          );
          return {
            permission_key: perm.permission_key,
            permission_name: perm.permission_name,
            is_enabled: existingPerm ? existingPerm.is_enabled : false
          };
        });
        setPermissionsForm(allPerms);
        setShowPermissionsModal(true);
      }
    } catch (error) {
      showMessage('error', error.message);
    }
  };

  const togglePermissionInCreate = (permKey) => {
    setCreateForm(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permKey)
        ? prev.permissions.filter(k => k !== permKey)
        : [...prev.permissions, permKey]
    }));
  };

  const togglePermissionInEdit = (permKey) => {
    setPermissionsForm(prev =>
      prev.map(p =>
        p.permission_key === permKey
          ? { ...p, is_enabled: !p.is_enabled }
          : p
      )
    );
  };

  const groupPermissionsByCategory = (permissions) => {
    const categories = {
      'User Management': [],
      'Subscription Management': [],
      'Booking Management': [],
      'Psychologist Management': [],
      'Coupon Management': [],
      'Analytics & Reports': [],
      'System Settings': [],
      'Sub-Admin Management': []
    };

    permissions.forEach(perm => {
      const key = perm.permission_key;
      if (key.startsWith('users_')) categories['User Management'].push(perm);
      else if (key.startsWith('subscriptions_')) categories['Subscription Management'].push(perm);
      else if (key.startsWith('bookings_')) categories['Booking Management'].push(perm);
      else if (key.startsWith('psychologists_')) categories['Psychologist Management'].push(perm);
      else if (key.startsWith('coupons_')) categories['Coupon Management'].push(perm);
      else if (key.startsWith('analytics_') || key.startsWith('reports_')) categories['Analytics & Reports'].push(perm);
      else if (key.startsWith('settings_')) categories['System Settings'].push(perm);
      else if (key.startsWith('subadmins_')) categories['Sub-Admin Management'].push(perm);
    });

    return categories;
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Sub-Admin Management</h1>
        <p className="text-gray-600 mt-2">
          Create and manage sub-admins with customizable permissions
        </p>
      </div>

      {/* Message Alert */}
      {message.text && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-100 text-green-800 border border-green-300'
              : 'bg-red-100 text-red-800 border border-red-300'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Filters and Actions */}
      <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-4 flex-1">
          <input
            type="text"
            placeholder="Search by email or name..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <select
            value={filters.is_active}
            onChange={(e) => setFilters({ ...filters, is_active: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Status</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          + Create Sub-Admin
        </button>
      </div>

      {/* Sub-Admins Table */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading sub-admins...</p>
        </div>
      ) : subAdmins.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-lg">No sub-admins found</p>
          <p className="text-gray-500 mt-2">Create your first sub-admin to get started</p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Permissions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subAdmins.map((subAdmin) => (
                  <tr key={subAdmin.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{subAdmin.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{subAdmin.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          subAdmin.is_active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {subAdmin.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {subAdmin.enabled_permissions?.length || 0} permissions
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{subAdmin.created_by || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(subAdmin.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => openEditModal(subAdmin)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => openPermissionsModal(subAdmin)}
                        className="text-purple-600 hover:text-purple-900 mr-3"
                      >
                        Permissions
                      </button>
                      <button
                        onClick={() => handleDelete(subAdmin.id, subAdmin.name)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.total_pages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {((pagination.page - 1) * pagination.per_page) + 1} to{' '}
                {Math.min(pagination.page * pagination.per_page, pagination.total)} of{' '}
                {pagination.total} results
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                  disabled={pagination.page === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                  disabled={pagination.page === pagination.total_pages}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Create Sub-Admin</h2>
            </div>
            <form onSubmit={handleCreateSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={createForm.name}
                    onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={createForm.email}
                    onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password * (min 8 characters)
                  </label>
                  <input
                    type="password"
                    required
                    value={createForm.password}
                    onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={createForm.confirmPassword}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, confirmPassword: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Permissions
                  </label>
                  <div className="space-y-4 border border-gray-200 rounded-lg p-4 max-h-64 overflow-y-auto">
                    {Object.entries(groupPermissionsByCategory(availablePermissions)).map(
                      ([category, perms]) =>
                        perms.length > 0 && (
                          <div key={category}>
                            <h4 className="font-semibold text-gray-900 mb-2">{category}</h4>
                            <div className="space-y-2 ml-4">
                              {perms.map((perm) => (
                                <label
                                  key={perm.permission_key}
                                  className="flex items-center space-x-2 cursor-pointer"
                                >
                                  <input
                                    type="checkbox"
                                    checked={createForm.permissions.includes(
                                      perm.permission_key
                                    )}
                                    onChange={() => togglePermissionInCreate(perm.permission_key)}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                  />
                                  <span className="text-sm text-gray-700">
                                    {perm.permission_name}
                                  </span>
                                </label>
                              ))}
                            </div>
                          </div>
                        )
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setCreateForm({
                      email: '',
                      name: '',
                      password: '',
                      confirmPassword: '',
                      permissions: []
                    });
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create Sub-Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedSubAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Edit Sub-Admin</h2>
            </div>
            <form onSubmit={handleEditSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editForm.is_active}
                      onChange={(e) => setEditForm({ ...editForm, is_active: e.target.checked })}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Active</span>
                  </label>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedSubAdmin(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Permissions Modal */}
      {showPermissionsModal && selectedSubAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                Manage Permissions - {selectedSubAdmin.name}
              </h2>
            </div>
            <form onSubmit={handlePermissionsSubmit} className="p-6">
              <div className="space-y-4">
                {Object.entries(groupPermissionsByCategory(permissionsForm)).map(
                  ([category, perms]) =>
                    perms.length > 0 && (
                      <div key={category} className="border-b border-gray-200 pb-4 last:border-0">
                        <h4 className="font-semibold text-gray-900 mb-3">{category}</h4>
                        <div className="space-y-2 ml-4">
                          {perms.map((perm) => (
                            <label
                              key={perm.permission_key}
                              className="flex items-center space-x-2 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={perm.is_enabled}
                                onChange={() => togglePermissionInEdit(perm.permission_key)}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                              <span className="text-sm text-gray-700">{perm.permission_name}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )
                )}
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowPermissionsModal(false);
                    setSelectedSubAdmin(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Update Permissions
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubAdminManagement;
