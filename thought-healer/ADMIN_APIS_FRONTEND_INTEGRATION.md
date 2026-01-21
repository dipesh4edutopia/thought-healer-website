# Admin APIs - Frontend Integration Guide

Complete guide for frontend developers to integrate Admin User Creation and Subscription Grant APIs.

---

## 📋 Table of Contents

1. [API Overview](#api-overview)
2. [Authentication](#authentication)
3. [API 1: Create User](#api-1-create-user)
4. [API 2: Grant Subscription](#api-2-grant-subscription)
5. [Error Handling](#error-handling)
6. [Frontend Implementation Examples](#frontend-implementation-examples)
7. [State Management](#state-management)
8. [UI/UX Recommendations](#uiux-recommendations)

---

## 🔍 API Overview

**Base URL (Production):** `https://thoughtprob2c.thoughthealer.org`  
**Base URL (Development):** `http://localhost:3000`

### New Admin Endpoints:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/admin/users/create` | POST | Create new user with credentials |
| `/api/admin/subscriptions/grant` | POST | Grant Premium/Ultra subscription |

---

## 🔐 Authentication

### Required Headers for All Admin APIs:

```javascript
{
  "Authorization": "Bearer YOUR_ADMIN_JWT_TOKEN",
  "Content-Type": "application/json"
}
```

### Getting Admin Token:

**Step 1: Login as Admin**

```javascript
// Login Request
POST /api/users/login
{
  "email": "admin@yourapp.com",
  "password": "admin_password"
}

// Response
{
  "success": true,
  "message": "Admin login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "email": "admin@yourapp.com",
      "role": "admin"
    }
  }
}
```

**Step 2: Store Token**

```javascript
// Store in localStorage or secure cookie
localStorage.setItem('adminToken', response.data.token);
```

**Step 3: Use in Requests**

```javascript
const token = localStorage.getItem('adminToken');
const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
};
```

---

## 📝 API 1: Create User

### Endpoint Details

**URL:** `POST /api/admin/users/create`  
**Auth Required:** Yes (Admin only)  
**Rate Limit:** Standard

### Request Body Schema

```typescript
interface CreateUserRequest {
  username: string;      // Required, 3-50 characters
  email: string;         // Required, valid email format
  password: string;      // Required, 8-128 characters
  role?: string;         // Optional: "user" | "psychologist" | "miniminds"
                        // Default: "user"
}
```

### Field Validations

| Field | Type | Required | Min | Max | Format | Default |
|-------|------|----------|-----|-----|--------|---------|
| `username` | string | ✅ Yes | 3 | 50 | Alphanumeric, underscore | - |
| `email` | string | ✅ Yes | - | 255 | Valid email (xxx@xxx.xxx) | - |
| `password` | string | ✅ Yes | 8 | 128 | Any characters | - |
| `role` | string | ❌ No | - | - | Enum: user, psychologist, miniminds | "user" |

### Example Request

```javascript
// Axios Example
const createUser = async (userData) => {
  try {
    const response = await axios.post(
      'https://thoughtprob2c.thoughthealer.org/api/admin/users/create',
      {
        username: "john_doe",
        email: "john@example.com",
        password: "SecurePass123",
        role: "user"
      },
      {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Fetch Example
const createUser = async (userData) => {
  const response = await fetch(
    'https://thoughtprob2c.thoughthealer.org/api/admin/users/create',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${adminToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: userData.username,
        email: userData.email,
        password: userData.password,
        role: userData.role || 'user'
      })
    }
  );
  
  if (!response.ok) {
    const error = await response.json();
    throw error;
  }
  
  return await response.json();
};
```

### Success Response (201 Created)

```typescript
interface CreateUserResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: number;
      email: string;
      username: string;
      role: string;
      is_verified: boolean;
    };
    email_sent: boolean;
  };
}
```

```json
{
  "success": true,
  "message": "User created successfully and welcome email sent",
  "data": {
    "user": {
      "id": 123,
      "email": "john@example.com",
      "username": "john_doe",
      "role": "user",
      "is_verified": true
    },
    "email_sent": true
  }
}
```

### Error Responses

#### 400 - Validation Error

```json
{
  "success": false,
  "error": "Email 'john@example.com' is already registered",
  "code": "validation_error"
}
```

**Possible Validation Errors:**
- `"username is required"`
- `"email is required"`
- `"password is required"`
- `"Invalid email format"`
- `"Password must be between 8 and 128 characters"`
- `"Username must be between 3 and 50 characters"`
- `"Email 'xxx@xxx.com' is already registered"`
- `"Username 'xxx' is already taken"`
- `"Invalid role. Must be one of: user, psychologist, miniminds"`

#### 403 - Forbidden

```json
{
  "success": false,
  "error": "Access forbidden: admin role required",
  "code": "forbidden"
}
```

#### 500 - Server Error

```json
{
  "success": false,
  "error": "Failed to create user",
  "code": "server_error"
}
```

### Frontend Validation (Before API Call)

```javascript
const validateUserForm = (formData) => {
  const errors = {};
  
  // Username validation
  if (!formData.username) {
    errors.username = "Username is required";
  } else if (formData.username.length < 3) {
    errors.username = "Username must be at least 3 characters";
  } else if (formData.username.length > 50) {
    errors.username = "Username must be less than 50 characters";
  }
  
  // Email validation
  if (!formData.email) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Invalid email format";
  }
  
  // Password validation
  if (!formData.password) {
    errors.password = "Password is required";
  } else if (formData.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  } else if (formData.password.length > 128) {
    errors.password = "Password must be less than 128 characters";
  }
  
  // Role validation
  const validRoles = ['user', 'psychologist', 'miniminds'];
  if (formData.role && !validRoles.includes(formData.role)) {
    errors.role = "Invalid role selected";
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
```

---

## 💎 API 2: Grant Subscription

### Endpoint Details

**URL:** `POST /api/admin/subscriptions/grant`  
**Auth Required:** Yes (Admin only)  
**Rate Limit:** Standard

### Request Body Schema

```typescript
interface GrantSubscriptionRequest {
  user_id?: number;           // Optional: User's ID
  email?: string;             // Optional: User's email
  plan_type: string;          // Required: "premium" | "ultra"
  validity_days?: number;     // Optional: 1-1825, Default: 365
}

// Note: Either user_id OR email is required (at least one)
```

### Field Validations

| Field | Type | Required | Min | Max | Format | Default |
|-------|------|----------|-----|-----|--------|---------|
| `user_id` | number | ⚠️ One required* | - | - | Positive integer | - |
| `email` | string | ⚠️ One required* | - | 255 | Valid email | - |
| `plan_type` | string | ✅ Yes | - | - | Enum: premium, ultra | - |
| `validity_days` | number | ❌ No | 1 | 1825 | Integer (5 years max) | 365 |

**\* Either `user_id` OR `email` must be provided**

### Example Requests

#### Option 1: Using Email

```javascript
const grantSubscription = async (subscriptionData) => {
  try {
    const response = await axios.post(
      'https://thoughtprob2c.thoughthealer.org/api/admin/subscriptions/grant',
      {
        email: "john@example.com",
        plan_type: "premium",
        validity_days: 365
      },
      {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
```

#### Option 2: Using User ID

```javascript
const grantSubscription = async (userId, planType, validityDays = 365) => {
  const response = await fetch(
    'https://thoughtprob2c.thoughthealer.org/api/admin/subscriptions/grant',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${adminToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: userId,
        plan_type: planType,
        validity_days: validityDays
      })
    }
  );
  
  if (!response.ok) {
    const error = await response.json();
    throw error;
  }
  
  return await response.json();
};
```

### Success Response (200 OK)

```typescript
interface GrantSubscriptionResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: number;
      email: string;
      username: string;
    };
    subscription: {
      plan_type: string;
      valid_till: string;        // ISO 8601 format
      validity_days: number;
      license_code: string;      // Format: ADMIN-{PLAN}-{TIMESTAMP}-{RANDOM}
    };
    email_sent: boolean;
  };
}
```

```json
{
  "success": true,
  "message": "Subscription granted successfully and notification email sent",
  "data": {
    "user": {
      "id": 123,
      "email": "john@example.com",
      "username": "john_doe"
    },
    "subscription": {
      "plan_type": "premium",
      "valid_till": "2027-01-21T10:30:00.000Z",
      "validity_days": 365,
      "license_code": "ADMIN-PREMIUM-1737454800000-A3B5C7"
    },
    "email_sent": true
  }
}
```

### Error Responses

#### 400 - Validation Error

```json
{
  "success": false,
  "error": "Either user_id or email is required",
  "code": "validation_error"
}
```

**Possible Validation Errors:**
- `"plan_type is required"`
- `"Either user_id or email is required"`
- `"plan_type must be either \"premium\" or \"ultra\""`
- `"validity_days must be between 1 and 1825 (5 years)"`

#### 404 - User Not Found

```json
{
  "success": false,
  "error": "User with email john@example.com not found",
  "code": "not_found"
}
```

```json
{
  "success": false,
  "error": "User with ID 999 not found",
  "code": "not_found"
}
```

#### 403 - Forbidden

```json
{
  "success": false,
  "error": "Access forbidden: admin role required",
  "code": "forbidden"
}
```

#### 500 - Server Error

```json
{
  "success": false,
  "error": "Failed to grant subscription",
  "code": "server_error"
}
```

### Frontend Validation (Before API Call)

```javascript
const validateSubscriptionForm = (formData) => {
  const errors = {};
  
  // User identifier validation
  if (!formData.user_id && !formData.email) {
    errors.user = "Either User ID or Email is required";
  }
  
  if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Invalid email format";
  }
  
  // Plan type validation
  if (!formData.plan_type) {
    errors.plan_type = "Plan type is required";
  } else if (!['premium', 'ultra'].includes(formData.plan_type.toLowerCase())) {
    errors.plan_type = "Plan type must be Premium or Ultra";
  }
  
  // Validity days validation
  if (formData.validity_days) {
    const days = parseInt(formData.validity_days);
    if (isNaN(days) || days < 1 || days > 1825) {
      errors.validity_days = "Validity must be between 1 and 1825 days";
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
```

---

## ⚠️ Error Handling

### Comprehensive Error Handler

```javascript
const handleApiError = (error) => {
  // Network error
  if (!error.response) {
    return {
      title: "Network Error",
      message: "Unable to connect to server. Please check your internet connection.",
      type: "network"
    };
  }
  
  // Server responded with error
  const { status, data } = error.response;
  
  switch (status) {
    case 400:
      return {
        title: "Validation Error",
        message: data.error || "Invalid input data",
        type: "validation",
        code: data.code
      };
    
    case 401:
      return {
        title: "Unauthorized",
        message: "Your session has expired. Please login again.",
        type: "auth",
        action: "redirect_to_login"
      };
    
    case 403:
      return {
        title: "Access Denied",
        message: "You don't have permission to perform this action.",
        type: "permission"
      };
    
    case 404:
      return {
        title: "Not Found",
        message: data.error || "Resource not found",
        type: "not_found"
      };
    
    case 409:
      return {
        title: "Conflict",
        message: data.error || "Resource already exists",
        type: "conflict"
      };
    
    case 500:
      return {
        title: "Server Error",
        message: "Something went wrong on our end. Please try again later.",
        type: "server"
      };
    
    default:
      return {
        title: "Error",
        message: data.error || "An unexpected error occurred",
        type: "unknown"
      };
  }
};

// Usage
try {
  const result = await createUser(userData);
  // Handle success
} catch (error) {
  const errorInfo = handleApiError(error);
  
  // Show error to user
  showNotification(errorInfo.title, errorInfo.message, "error");
  
  // Handle specific actions
  if (errorInfo.action === "redirect_to_login") {
    redirectToLogin();
  }
}
```

---

## 💻 Frontend Implementation Examples

### React Example

#### 1. Create User Component

```jsx
import React, { useState } from 'react';
import axios from 'axios';

const CreateUserForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user'
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username || formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.password || formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setSuccess(null);
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/admin/users/create`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      setSuccess({
        message: response.data.message,
        user: response.data.data.user,
        emailSent: response.data.data.email_sent
      });
      
      // Reset form
      setFormData({ username: '', email: '', password: '', role: 'user' });
      
    } catch (error) {
      if (error.response) {
        setErrors({ api: error.response.data.error || 'Failed to create user' });
      } else {
        setErrors({ api: 'Network error. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-user-form">
      <h2>Create New User</h2>
      
      {success && (
        <div className="alert alert-success">
          <p>{success.message}</p>
          <p>User ID: {success.user.id}</p>
          <p>Email Status: {success.emailSent ? '✅ Sent' : '❌ Failed'}</p>
        </div>
      )}
      
      {errors.api && (
        <div className="alert alert-error">{errors.api}</div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username *</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="john_doe"
            disabled={loading}
          />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>
        
        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            disabled={loading}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        
        <div className="form-group">
          <label>Password *</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Min 8 characters"
            disabled={loading}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        
        <div className="form-group">
          <label>Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            disabled={loading}
          >
            <option value="user">User</option>
            <option value="psychologist">Psychologist</option>
            <option value="miniminds">MiniMinds</option>
          </select>
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create User'}
        </button>
      </form>
    </div>
  );
};

export default CreateUserForm;
```

#### 2. Grant Subscription Component

```jsx
import React, { useState } from 'react';
import axios from 'axios';

const GrantSubscriptionForm = () => {
  const [formData, setFormData] = useState({
    searchType: 'email', // 'email' or 'user_id'
    email: '',
    user_id: '',
    plan_type: 'premium',
    validity_days: 365
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (formData.searchType === 'email') {
      if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }
    } else {
      if (!formData.user_id || formData.user_id <= 0) {
        newErrors.user_id = 'Valid User ID required';
      }
    }
    
    if (!['premium', 'ultra'].includes(formData.plan_type)) {
      newErrors.plan_type = 'Invalid plan type';
    }
    
    const days = parseInt(formData.validity_days);
    if (isNaN(days) || days < 1 || days > 1825) {
      newErrors.validity_days = 'Must be between 1 and 1825 days';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setSuccess(null);
    
    try {
      const token = localStorage.getItem('adminToken');
      
      const requestData = {
        plan_type: formData.plan_type,
        validity_days: parseInt(formData.validity_days)
      };
      
      if (formData.searchType === 'email') {
        requestData.email = formData.email;
      } else {
        requestData.user_id = parseInt(formData.user_id);
      }
      
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/admin/subscriptions/grant`,
        requestData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      setSuccess({
        message: response.data.message,
        user: response.data.data.user,
        subscription: response.data.data.subscription,
        emailSent: response.data.data.email_sent
      });
      
      // Reset form
      setFormData({
        searchType: 'email',
        email: '',
        user_id: '',
        plan_type: 'premium',
        validity_days: 365
      });
      
    } catch (error) {
      if (error.response) {
        setErrors({ api: error.response.data.error || 'Failed to grant subscription' });
      } else {
        setErrors({ api: 'Network error. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grant-subscription-form">
      <h2>Grant Subscription</h2>
      
      {success && (
        <div className="alert alert-success">
          <p>{success.message}</p>
          <p><strong>User:</strong> {success.user.username} ({success.user.email})</p>
          <p><strong>Plan:</strong> {success.subscription.plan_type.toUpperCase()}</p>
          <p><strong>Valid Till:</strong> {new Date(success.subscription.valid_till).toLocaleDateString()}</p>
          <p><strong>License Code:</strong> {success.subscription.license_code}</p>
          <p><strong>Email:</strong> {success.emailSent ? '✅ Sent' : '❌ Failed'}</p>
        </div>
      )}
      
      {errors.api && (
        <div className="alert alert-error">{errors.api}</div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Search By</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="searchType"
                value="email"
                checked={formData.searchType === 'email'}
                onChange={handleChange}
                disabled={loading}
              />
              Email
            </label>
            <label>
              <input
                type="radio"
                name="searchType"
                value="user_id"
                checked={formData.searchType === 'user_id'}
                onChange={handleChange}
                disabled={loading}
              />
              User ID
            </label>
          </div>
        </div>
        
        {formData.searchType === 'email' ? (
          <div className="form-group">
            <label>User Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="user@example.com"
              disabled={loading}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
        ) : (
          <div className="form-group">
            <label>User ID *</label>
            <input
              type="number"
              name="user_id"
              value={formData.user_id}
              onChange={handleChange}
              placeholder="123"
              disabled={loading}
            />
            {errors.user_id && <span className="error">{errors.user_id}</span>}
          </div>
        )}
        
        <div className="form-group">
          <label>Plan Type *</label>
          <select
            name="plan_type"
            value={formData.plan_type}
            onChange={handleChange}
            disabled={loading}
          >
            <option value="premium">Premium</option>
            <option value="ultra">Ultra</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Validity (Days) *</label>
          <input
            type="number"
            name="validity_days"
            value={formData.validity_days}
            onChange={handleChange}
            placeholder="365"
            min="1"
            max="1825"
            disabled={loading}
          />
          <small>Max: 1825 days (5 years)</small>
          {errors.validity_days && <span className="error">{errors.validity_days}</span>}
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Granting...' : 'Grant Subscription'}
        </button>
      </form>
    </div>
  );
};

export default GrantSubscriptionForm;
```

### Vue.js Example

```vue
<template>
  <div class="admin-panel">
    <h2>Admin: Create User & Grant Subscription</h2>
    
    <!-- Create User Form -->
    <div class="card">
      <h3>Create New User</h3>
      <form @submit.prevent="createUser">
        <input
          v-model="userForm.username"
          type="text"
          placeholder="Username"
          required
        />
        <input
          v-model="userForm.email"
          type="email"
          placeholder="Email"
          required
        />
        <input
          v-model="userForm.password"
          type="password"
          placeholder="Password (min 8 chars)"
          required
        />
        <select v-model="userForm.role">
          <option value="user">User</option>
          <option value="psychologist">Psychologist</option>
          <option value="miniminds">MiniMinds</option>
        </select>
        <button type="submit" :disabled="loading">Create User</button>
      </form>
      
      <div v-if="userResult" class="result success">
        {{ userResult }}
      </div>
      <div v-if="userError" class="result error">
        {{ userError }}
      </div>
    </div>
    
    <!-- Grant Subscription Form -->
    <div class="card">
      <h3>Grant Subscription</h3>
      <form @submit.prevent="grantSubscription">
        <input
          v-model="subForm.email"
          type="email"
          placeholder="User Email"
          required
        />
        <select v-model="subForm.plan_type">
          <option value="premium">Premium</option>
          <option value="ultra">Ultra</option>
        </select>
        <input
          v-model.number="subForm.validity_days"
          type="number"
          placeholder="Validity (days)"
          min="1"
          max="1825"
        />
        <button type="submit" :disabled="loading">Grant Subscription</button>
      </form>
      
      <div v-if="subResult" class="result success">
        {{ subResult }}
      </div>
      <div v-if="subError" class="result error">
        {{ subError }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      loading: false,
      userForm: {
        username: '',
        email: '',
        password: '',
        role: 'user'
      },
      subForm: {
        email: '',
        plan_type: 'premium',
        validity_days: 365
      },
      userResult: null,
      userError: null,
      subResult: null,
      subError: null
    };
  },
  
  computed: {
    adminToken() {
      return localStorage.getItem('adminToken');
    },
    
    apiHeaders() {
      return {
        'Authorization': `Bearer ${this.adminToken}`,
        'Content-Type': 'application/json'
      };
    }
  },
  
  methods: {
    async createUser() {
      this.loading = true;
      this.userResult = null;
      this.userError = null;
      
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_API_URL}/api/admin/users/create`,
          this.userForm,
          { headers: this.apiHeaders }
        );
        
        this.userResult = `User created: ${response.data.data.user.username} (ID: ${response.data.data.user.id})`;
        
        // Reset form
        this.userForm = { username: '', email: '', password: '', role: 'user' };
        
      } catch (error) {
        this.userError = error.response?.data?.error || 'Failed to create user';
      } finally {
        this.loading = false;
      }
    },
    
    async grantSubscription() {
      this.loading = true;
      this.subResult = null;
      this.subError = null;
      
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_API_URL}/api/admin/subscriptions/grant`,
          this.subForm,
          { headers: this.apiHeaders }
        );
        
        const data = response.data.data;
        this.subResult = `${data.subscription.plan_type.toUpperCase()} granted to ${data.user.username} until ${new Date(data.subscription.valid_till).toLocaleDateString()}`;
        
        // Reset form
        this.subForm = { email: '', plan_type: 'premium', validity_days: 365 };
        
      } catch (error) {
        this.subError = error.response?.data?.error || 'Failed to grant subscription';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
```

---

## 🗂️ State Management

### Redux Example

```javascript
// actions/adminActions.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';

export const GRANT_SUBSCRIPTION_REQUEST = 'GRANT_SUBSCRIPTION_REQUEST';
export const GRANT_SUBSCRIPTION_SUCCESS = 'GRANT_SUBSCRIPTION_SUCCESS';
export const GRANT_SUBSCRIPTION_FAILURE = 'GRANT_SUBSCRIPTION_FAILURE';

// Create User Action
export const createUser = (userData) => async (dispatch, getState) => {
  dispatch({ type: CREATE_USER_REQUEST });
  
  try {
    const { auth } = getState();
    const token = auth.adminToken;
    
    const response = await axios.post(
      `${API_URL}/api/admin/users/create`,
      userData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    dispatch({
      type: CREATE_USER_SUCCESS,
      payload: response.data
    });
    
    return response.data;
    
  } catch (error) {
    const errorMessage = error.response?.data?.error || 'Failed to create user';
    
    dispatch({
      type: CREATE_USER_FAILURE,
      payload: errorMessage
    });
    
    throw error;
  }
};

// Grant Subscription Action
export const grantSubscription = (subscriptionData) => async (dispatch, getState) => {
  dispatch({ type: GRANT_SUBSCRIPTION_REQUEST });
  
  try {
    const { auth } = getState();
    const token = auth.adminToken;
    
    const response = await axios.post(
      `${API_URL}/api/admin/subscriptions/grant`,
      subscriptionData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    dispatch({
      type: GRANT_SUBSCRIPTION_SUCCESS,
      payload: response.data
    });
    
    return response.data;
    
  } catch (error) {
    const errorMessage = error.response?.data?.error || 'Failed to grant subscription';
    
    dispatch({
      type: GRANT_SUBSCRIPTION_FAILURE,
      payload: errorMessage
    });
    
    throw error;
  }
};

// reducers/adminReducer.js
const initialState = {
  createUser: {
    loading: false,
    success: null,
    error: null
  },
  grantSubscription: {
    loading: false,
    success: null,
    error: null
  }
};

export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER_REQUEST:
      return {
        ...state,
        createUser: { loading: true, success: null, error: null }
      };
    
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        createUser: { loading: false, success: action.payload, error: null }
      };
    
    case CREATE_USER_FAILURE:
      return {
        ...state,
        createUser: { loading: false, success: null, error: action.payload }
      };
    
    case GRANT_SUBSCRIPTION_REQUEST:
      return {
        ...state,
        grantSubscription: { loading: false, success: null, error: null }
      };
    
    case GRANT_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        grantSubscription: { loading: false, success: action.payload, error: null }
      };
    
    case GRANT_SUBSCRIPTION_FAILURE:
      return {
        ...state,
        grantSubscription: { loading: false, success: null, error: action.payload }
      };
    
    default:
      return state;
  }
};
```

---

## 🎨 UI/UX Recommendations

### Success States

1. **User Created Successfully:**
   - Show success message with user ID
   - Display email status (sent/failed)
   - Option to grant subscription immediately
   - Option to create another user

2. **Subscription Granted Successfully:**
   - Show plan type and expiry date
   - Display license code
   - Email notification status
   - Option to view user details

### Loading States

```jsx
// While creating user
<button disabled>
  <Spinner /> Creating User...
</button>

// While granting subscription
<button disabled>
  <Spinner /> Granting Subscription...
</button>
```

### Error States

```jsx
{errors.email && (
  <div className="field-error">
    <Icon name="alert-circle" />
    <span>{errors.email}</span>
  </div>
)}

{apiError && (
  <div className="alert alert-error">
    <Icon name="x-circle" />
    <div>
      <h4>Error</h4>
      <p>{apiError}</p>
    </div>
    <button onClick={retryAction}>Retry</button>
  </div>
)}
```

### Form Validation Feedback

```jsx
// Real-time validation
<input
  className={errors.email ? 'invalid' : formData.email ? 'valid' : ''}
  onBlur={() => validateField('email')}
/>

// Validation icons
{formData.email && !errors.email && <Icon name="check-circle" color="green" />}
{errors.email && <Icon name="alert-circle" color="red" />}
```

### Confirmation Dialogs

```jsx
// Before creating user
const confirmUserCreation = () => {
  return window.confirm(
    `Create user "${formData.username}" with role "${formData.role}"?`
  );
};

// Before granting subscription
const confirmSubscriptionGrant = () => {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + formData.validity_days);
  
  return window.confirm(
    `Grant ${formData.plan_type.toUpperCase()} subscription to ${formData.email} valid until ${expiryDate.toLocaleDateString()}?`
  );
};
```

### Workflow Combination UI

```jsx
// Combined workflow: Create + Grant
const CreateUserWithSubscription = () => {
  const [step, setStep] = useState(1); // 1: Create User, 2: Grant Subscription
  const [createdUser, setCreatedUser] = useState(null);
  
  const handleUserCreated = (userData) => {
    setCreatedUser(userData);
    setStep(2);
  };
  
  const handleSubscriptionGranted = () => {
    // Success - reset workflow
    setStep(1);
    setCreatedUser(null);
  };
  
  return (
    <div>
      {step === 1 && (
        <CreateUserForm onSuccess={handleUserCreated} />
      )}
      
      {step === 2 && createdUser && (
        <>
          <SuccessMessage user={createdUser} />
          <GrantSubscriptionForm 
            defaultEmail={createdUser.email}
            onSuccess={handleSubscriptionGranted}
          />
        </>
      )}
    </div>
  );
};
```

---

## 📱 Mobile Considerations

### Responsive Form Layout

```css
.admin-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

@media (max-width: 768px) {
  .admin-form {
    padding: 10px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  input, select, button {
    font-size: 16px; /* Prevents zoom on iOS */
    width: 100%;
  }
}
```

---

## 🔄 Complete Workflow Example

```javascript
// Complete workflow: Create VIP user with subscription
const onboardVIPUser = async (vipData) => {
  try {
    // Step 1: Create user
    console.log('Creating user...');
    const userResponse = await axios.post(
      `${API_URL}/api/admin/users/create`,
      {
        username: vipData.username,
        email: vipData.email,
        password: vipData.password,
        role: 'user'
      },
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );
    
    const userId = userResponse.data.data.user.id;
    console.log(`✅ User created: ID ${userId}`);
    
    // Step 2: Grant subscription
    console.log('Granting subscription...');
    const subResponse = await axios.post(
      `${API_URL}/api/admin/subscriptions/grant`,
      {
        user_id: userId,
        plan_type: 'ultra',
        validity_days: 365
      },
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );
    
    console.log(`✅ Subscription granted: ${subResponse.data.data.subscription.license_code}`);
    
    return {
      success: true,
      user: userResponse.data.data.user,
      subscription: subResponse.data.data.subscription,
      emails: {
        welcome: userResponse.data.data.email_sent,
        subscription: subResponse.data.data.email_sent
      }
    };
    
  } catch (error) {
    console.error('❌ VIP onboarding failed:', error.response?.data || error.message);
    throw error;
  }
};

// Usage
const vipData = {
  username: 'vip_user_123',
  email: 'vip@company.com',
  password: 'SecureVIPPass123'
};

onboardVIPUser(vipData)
  .then(result => {
    console.log('VIP onboarding complete!', result);
    showSuccessNotification('VIP user onboarded successfully!');
  })
  .catch(error => {
    showErrorNotification('Failed to onboard VIP user');
  });
```

---

## 📊 Testing Checklist

### API Integration Tests

- [ ] Create user with valid data
- [ ] Create user with duplicate email (should fail)
- [ ] Create user with duplicate username (should fail)
- [ ] Create user with invalid email format (should fail)
- [ ] Create user with short password (should fail)
- [ ] Create user without admin token (should fail 403)
- [ ] Grant subscription by email
- [ ] Grant subscription by user ID
- [ ] Grant subscription to non-existent user (should fail 404)
- [ ] Grant subscription with invalid plan type (should fail 400)
- [ ] Grant subscription without admin token (should fail 403)
- [ ] Verify email notifications are sent
- [ ] Complete workflow: Create + Grant subscription

---

## 🔗 Quick Reference

### Endpoints Summary

| Endpoint | Method | Purpose | Auth |
|----------|--------|---------|------|
| `/api/users/login` | POST | Admin login | None |
| `/api/admin/users/create` | POST | Create user | Admin |
| `/api/admin/subscriptions/grant` | POST | Grant subscription | Admin |

### Response Codes

| Code | Meaning | Action |
|------|---------|--------|
| 200 | Success (Subscription) | Show success message |
| 201 | Created (User) | Show success message |
| 400 | Validation Error | Show field errors |
| 401 | Unauthorized | Redirect to login |
| 403 | Forbidden | Show permission error |
| 404 | Not Found | Show not found error |
| 500 | Server Error | Show retry option |

---

## 📞 Support

For backend issues or questions:
- Check server logs for detailed errors
- Verify admin token is valid
- Ensure SMTP is configured for emails
- Contact backend team with error details

---

**Last Updated:** 21 January 2026  
**API Version:** 1.0  
**Backend:** ThoughtPro Psychology Booking Platform
