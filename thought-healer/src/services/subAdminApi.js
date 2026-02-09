/**
 * Sub-Admin API Service
 * Handles all API calls for sub-admin management
 */

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://thoughtprob2c.thoughthealer.org';

class SubAdminAPI {
  /**
   * Get auth headers with JWT token
   */
  static getAuthHeaders() {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    };
  }

  /**
   * Create a new sub-admin
   */
  static async createSubAdmin(data) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/sub-admins`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data)
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to create sub-admin');
      }

      return result;
    } catch (error) {
      console.error('Error creating sub-admin:', error);
      throw error;
    }
  }

  /**
   * Get all sub-admins with pagination and filters
   */
  static async getAllSubAdmins(page = 1, perPage = 20, filters = {}) {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        per_page: perPage.toString(),
        ...filters
      });

      const response = await fetch(
        `${API_BASE_URL}/api/admin/sub-admins?${params}`,
        {
          method: 'GET',
          headers: this.getAuthHeaders()
        }
      );

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch sub-admins');
      }

      return result;
    } catch (error) {
      console.error('Error fetching sub-admins:', error);
      throw error;
    }
  }

  /**
   * Get sub-admin by ID
   */
  static async getSubAdminById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/sub-admins/${id}`, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch sub-admin');
      }

      return result;
    } catch (error) {
      console.error('Error fetching sub-admin:', error);
      throw error;
    }
  }

  /**
   * Update sub-admin details
   */
  static async updateSubAdmin(id, updates) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/sub-admins/${id}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(updates)
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to update sub-admin');
      }

      return result;
    } catch (error) {
      console.error('Error updating sub-admin:', error);
      throw error;
    }
  }

  /**
   * Delete sub-admin
   */
  static async deleteSubAdmin(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/sub-admins/${id}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders()
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to delete sub-admin');
      }

      return result;
    } catch (error) {
      console.error('Error deleting sub-admin:', error);
      throw error;
    }
  }

  /**
   * Update sub-admin permissions
   */
  static async updatePermissions(id, permissions) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/sub-admins/${id}/permissions`,
        {
          method: 'PUT',
          headers: this.getAuthHeaders(),
          body: JSON.stringify({ permissions })
        }
      );

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to update permissions');
      }

      return result;
    } catch (error) {
      console.error('Error updating permissions:', error);
      throw error;
    }
  }

  /**
   * Get all available permissions
   */
  static async getAvailablePermissions() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/sub-admins/permissions/available`,
        {
          method: 'GET',
          headers: this.getAuthHeaders()
        }
      );

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch permissions');
      }

      return result;
    } catch (error) {
      console.error('Error fetching permissions:', error);
      throw error;
    }
  }

  /**
   * Sub-admin login
   */
  static async subAdminLogin(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/sub-admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Login failed');
      }

      // Store token and user data
      if (result.data && result.data.token) {
        localStorage.setItem('authToken', result.data.token);
        localStorage.setItem('user', JSON.stringify(result.data.user));
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', 'sub_admin');
      }

      return result;
    } catch (error) {
      console.error('Error during sub-admin login:', error);
      throw error;
    }
  }

  /**
   * Get sub-admin profile
   */
  static async getProfile() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/sub-admin/profile`, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch profile');
      }

      return result;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  }
}

export default SubAdminAPI;
