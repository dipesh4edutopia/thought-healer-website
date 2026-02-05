# Sub-Admin System - Frontend Implementation Guide

## Overview

Complete frontend implementation for Sub-Admin Management system with two main flows:
1. **Admin Flow**: Create, manage, and assign permissions to sub-admins
2. **Sub-Admin Flow**: Login and perform actions based on assigned permissions

## Files Created/Updated

### New Files Created:

1. **`src/services/subAdminApi.js`**
   - API service for all sub-admin operations
   - Handles authentication, CRUD operations, and permissions

2. **`src/pages/admin/SubAdminManagement.jsx`**
   - Complete admin interface for managing sub-admins
   - Create, edit, delete sub-admins
   - Manage permissions with categorized UI
   - Pagination and filtering

3. **`src/pages/SubAdminLogin.jsx`**
   - Dedicated login page for sub-admins
   - Modern, responsive design
   - Error handling and loading states

### Updated Files:

1. **`src/App.js`**
   - Added `/sub-admin-login` route
   - Added `/admin/sub-admins` protected route
   - Imported new components

2. **`src/pages/admin/AdminLayout.jsx`**
   - Added "Sub-Admin Management" menu item
   - Icon: 👤

3. **`src/components/ProtectedRoute.jsx`**
   - Updated to allow sub_admins to access admin routes
   - Maintains security while enabling sub-admin access

## Features Implemented

### Admin Side Features

#### 1. Sub-Admin List View
- **Table Display**:
  - Name, Email, Status (Active/Inactive)
  - Number of permissions
  - Created by (admin email)
  - Creation date
  - Action buttons (Edit, Permissions, Delete)

- **Filtering**:
  - Search by email or name
  - Filter by status (Active/Inactive)
  - Pagination controls

#### 2. Create Sub-Admin
- **Modal Form**:
  - Name (required)
  - Email (required, validated)
  - Password (required, min 8 chars)
  - Confirm Password (must match)
  - Permissions selector (grouped by category)

- **Permission Categories**:
  - User Management
  - Subscription Management
  - Booking Management
  - Psychologist Management
  - Coupon Management
  - Analytics & Reports
  - System Settings
  - Sub-Admin Management

- **Validation**:
  - Email format check
  - Password strength (min 8 characters)
  - Password confirmation match
  - Duplicate email prevention

#### 3. Edit Sub-Admin
- **Editable Fields**:
  - Name
  - Email
  - Active/Inactive status
  - Password (optional)

- **Cannot Edit**:
  - Permissions (use separate Permissions modal)
  - Created by
  - Creation date

#### 4. Manage Permissions
- **Permission Modal**:
  - Shows all available permissions
  - Grouped by category
  - Checkbox interface
  - Real-time enable/disable
  - Saves all changes at once

- **Permission Display**:
  - Category headers (bold)
  - Permission names (descriptive)
  - Current status (checked/unchecked)

#### 5. Delete Sub-Admin
- Confirmation dialog
- Permanent deletion
- Refreshes list automatically

### Sub-Admin Side Features

#### 1. Login Page
- **Design**:
  - Modern gradient background
  - Responsive layout
  - Professional branding

- **Form Fields**:
  - Email (with icon)
  - Password (with icon)
  - Login button with loading state

- **Features**:
  - Error message display
  - Loading spinner
  - Info section about sub-admin access
  - Back to home link

#### 2. After Login
- **Automatic Redirect**: Goes to `/admin` dashboard
- **Token Storage**: JWT token saved in localStorage
- **User Data**: Role and permissions stored
- **Access Control**: Protected routes based on permissions

## API Integration

### Endpoints Used

```javascript
// Admin endpoints (requires admin token)
POST   /api/admin/sub-admins                      // Create sub-admin
GET    /api/admin/sub-admins                      // List all sub-admins
GET    /api/admin/sub-admins/:id                  // Get one sub-admin
PUT    /api/admin/sub-admins/:id                  // Update sub-admin
DELETE /api/admin/sub-admins/:id                  // Delete sub-admin
PUT    /api/admin/sub-admins/:id/permissions      // Update permissions
GET    /api/admin/sub-admins/permissions/available // Get all permissions

// Sub-admin endpoints
POST   /api/sub-admin/login                       // Sub-admin login
GET    /api/sub-admin/profile                     // Get profile
```

### API Service Methods

```javascript
SubAdminAPI.createSubAdmin(data)              // Create new sub-admin
SubAdminAPI.getAllSubAdmins(page, perPage, filters) // Get list with pagination
SubAdminAPI.getSubAdminById(id)               // Get one sub-admin
SubAdminAPI.updateSubAdmin(id, updates)       // Update details
SubAdminAPI.deleteSubAdmin(id)                // Delete sub-admin
SubAdminAPI.updatePermissions(id, permissions) // Update permissions
SubAdminAPI.getAvailablePermissions()         // Get all permissions
SubAdminAPI.subAdminLogin(email, password)    // Login
SubAdminAPI.getProfile()                      // Get profile
```

## How to Use

### For Admins

#### Step 1: Access Sub-Admin Management
1. Login as admin
2. Navigate to Admin Dashboard
3. Click "Sub-Admin Management" in sidebar (👤 icon)

#### Step 2: Create New Sub-Admin
1. Click "+ Create Sub-Admin" button
2. Fill in required information:
   - Name
   - Email
   - Password
   - Confirm Password
3. Select permissions (check boxes)
4. Click "Create Sub-Admin"

#### Step 3: Manage Existing Sub-Admins
**To Edit:**
1. Click "Edit" button on any sub-admin
2. Modify name, email, or active status
3. Click "Update"

**To Manage Permissions:**
1. Click "Permissions" button
2. Check/uncheck permissions
3. Click "Update Permissions"

**To Delete:**
1. Click "Delete" button
2. Confirm deletion
3. Sub-admin is permanently removed

### For Sub-Admins

#### Step 1: Login
1. Go to `/sub-admin-login`
2. Enter your email and password
3. Click "Login"

#### Step 2: Access Dashboard
- Automatically redirected to `/admin`
- Can access features based on permissions
- Menu shows only allowed features

#### Step 3: Perform Actions
- Access features based on assigned permissions
- If permission denied, error message shown
- Contact main admin for additional permissions

## Environment Variables

Add to `.env` file:

```env
REACT_APP_API_BASE_URL=http://localhost:8080
```

For production:
```env
REACT_APP_API_BASE_URL=https://your-api-domain.com
```

## Permission System

### How Permissions Work

1. **Main Admin**: Full access to everything (bypasses permission checks)
2. **Sub-Admin**: Access based on enabled permissions only

### Permission Keys & Categories

**User Management:**
- `users_view` - View all users
- `users_create` - Create new users
- `users_edit` - Edit user details
- `users_delete` - Delete users
- `users_verify` - Verify user accounts

**Subscription Management:**
- `subscriptions_view` - View subscriptions
- `subscriptions_grant` - Grant subscriptions
- `subscriptions_revoke` - Revoke subscriptions

**Booking Management:**
- `bookings_view` - View all bookings
- `bookings_edit` - Edit bookings
- `bookings_delete` - Delete bookings

**Psychologist Management:**
- `psychologists_view` - View psychologists
- `psychologists_create` - Create psychologists
- `psychologists_edit` - Edit psychologists
- `psychologists_delete` - Delete psychologists

**Coupon Management:**
- `coupons_view` - View coupons
- `coupons_create` - Create coupons
- `coupons_edit` - Edit coupons
- `coupons_delete` - Delete coupons

**Analytics & Reports:**
- `analytics_view` - View analytics and stats
- `reports_generate` - Generate reports

**System Settings:**
- `settings_view` - View system settings
- `settings_edit` - Edit system settings

**Sub-Admin Management (Admin Only):**
- `subadmins_view` - View sub-admins
- `subadmins_create` - Create sub-admins
- `subadmins_edit` - Edit sub-admins
- `subadmins_delete` - Delete sub-admins

## UI Components

### SubAdminManagement Component

**State Management:**
```javascript
- subAdmins: Array of sub-admin objects
- availablePermissions: All available permissions
- loading: Loading state
- showCreateModal: Create modal visibility
- showEditModal: Edit modal visibility
- showPermissionsModal: Permissions modal visibility
- selectedSubAdmin: Currently selected sub-admin
- pagination: Page, perPage, total, totalPages
- filters: search, is_active
- message: {type, text} for alerts
- createForm: New sub-admin form data
- editForm: Edit sub-admin form data
- permissionsForm: Permissions form data
```

**Key Functions:**
```javascript
loadSubAdmins()              // Fetch sub-admins list
loadAvailablePermissions()   // Fetch all permissions
handleCreateSubmit()         // Create new sub-admin
handleEditSubmit()           // Update sub-admin
handlePermissionsSubmit()    // Update permissions
handleDelete()               // Delete sub-admin
openEditModal()              // Open edit modal
openPermissionsModal()       // Open permissions modal
togglePermissionInCreate()   // Toggle permission in create form
togglePermissionInEdit()     // Toggle permission in edit form
groupPermissionsByCategory() // Group permissions by category
```

### SubAdminLogin Component

**State Management:**
```javascript
- formData: {email, password}
- loading: Loading state
- error: Error message
```

**Key Functions:**
```javascript
handleChange()   // Handle input changes
handleSubmit()   // Handle login submission
```

## Styling

### Design System

**Colors:**
- Primary: Blue (#3B82F6, #2563EB)
- Success: Green (#10B981, #059669)
- Error: Red (#EF4444, #DC2626)
- Warning: Yellow (#F59E0B, #D97706)
- Info: Purple (#8B5CF6, #7C3AED)

**Components:**
- Rounded corners: `rounded-lg` (8px)
- Shadows: `shadow-lg`, `shadow-xl`
- Transitions: `transition-all`, `transition-colors`
- Hover effects on all interactive elements

**Responsive:**
- Mobile: Full width, stacked layout
- Tablet: 2-column layout
- Desktop: 3-column layout, fixed sidebar

## Testing Checklist

### Admin Flow
- [ ] Create sub-admin with permissions
- [ ] Create sub-admin without permissions
- [ ] View sub-admin list
- [ ] Search sub-admins by email
- [ ] Search sub-admins by name
- [ ] Filter by Active status
- [ ] Filter by Inactive status
- [ ] Edit sub-admin name
- [ ] Edit sub-admin email
- [ ] Toggle sub-admin active status
- [ ] Update permissions (add new)
- [ ] Update permissions (remove existing)
- [ ] Delete sub-admin
- [ ] Pagination (next page)
- [ ] Pagination (previous page)
- [ ] Password validation (min 8 chars)
- [ ] Password match validation
- [ ] Email format validation
- [ ] Duplicate email prevention

### Sub-Admin Flow
- [ ] Login with correct credentials
- [ ] Login with wrong password
- [ ] Login with wrong email
- [ ] Login with inactive account
- [ ] Access dashboard after login
- [ ] Token stored in localStorage
- [ ] User data stored correctly
- [ ] Redirect to /admin after login
- [ ] Access allowed features
- [ ] Access denied for unauthorized features
- [ ] Logout functionality

## Security Considerations

1. **Password Security:**
   - Minimum 8 characters enforced
   - Password never shown in responses
   - Confirm password validation

2. **Authentication:**
   - JWT tokens stored in localStorage
   - Token sent with every API request
   - Token validated on backend

3. **Authorization:**
   - Permission checks on every action
   - Main admin bypasses all checks
   - Sub-admin limited by permissions

4. **Data Validation:**
   - Email format validation
   - Required field validation
   - Client-side + server-side validation

## Troubleshooting

### Common Issues

**Issue: "Network Error"**
- Solution: Check `REACT_APP_API_BASE_URL` in `.env`
- Ensure backend is running
- Check CORS settings

**Issue: "Unauthorized"**
- Solution: Login again
- Check token in localStorage
- Verify admin role

**Issue: "Permissions not updating"**
- Solution: Refresh the page
- Re-fetch sub-admin data
- Check backend response

**Issue: "Modal not closing"**
- Solution: Click outside modal
- Press ESC key
- Click Cancel button

## Next Steps

### Future Enhancements

1. **Bulk Operations:**
   - Select multiple sub-admins
   - Bulk delete
   - Bulk activate/deactivate

2. **Advanced Filtering:**
   - Filter by permissions
   - Filter by creation date
   - Filter by last login

3. **Activity Logs:**
   - Track sub-admin actions
   - Login history
   - Permission change history

4. **Permission Presets:**
   - Save common permission combinations
   - Quick apply presets
   - Custom role templates

5. **Email Notifications:**
   - Welcome email on creation
   - Password reset
   - Permission change notifications

6. **2FA Support:**
   - Two-factor authentication for sub-admins
   - QR code setup
   - Backup codes

## Support

For issues or questions:
- Check browser console for errors
- Verify API responses in Network tab
- Test with Postman first
- Check backend logs

---

**System Ready! 🎉**

Admin can now create sub-admins and sub-admins can login and perform actions based on their permissions!
