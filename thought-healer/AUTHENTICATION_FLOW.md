# Authentication Flow - ThoughtPro

## 🔐 Complete Authentication Implementation

### Authentication Storage
All authentication data is stored in **localStorage** for persistence across sessions:
- `authToken` - JWT token from backend
- `userEmail` - User's email address
- `userId` - User's ID
- `userName` - User's display name
- `userRole` - User's role (user/admin)
- `isAuthenticated` - Flag indicating authentication status
- `emailVerified` - Flag for email verification status

---

## 📋 User Flows

### 1. **New User Registration**
```
User → Signup Page → Enter Details → OTP Verification → Auto Login → Plans Page
```

**Steps:**
1. User visits `/thoughtpro-signup`
2. Enters username, email, password
3. Backend sends OTP to email
4. Redirects to `/thoughtpro-otp`
5. User enters 6-digit OTP
6. Backend verifies OTP and returns token
7. Token stored in localStorage
8. User redirected to `/thoughtpro-plans`

**API Endpoints Used:**
- `POST /api/users/register` - Create account
- `POST /api/otp/send` - Send OTP
- `POST /api/otp/verify` - Verify OTP and get token

---

### 2. **Existing User Login**
```
User → Signin Page → Enter Credentials → Plans Page
```

**Steps:**
1. User visits `/thoughtpro-signin`
2. Enters email and password
3. Backend validates and returns token
4. Token stored in localStorage
5. User redirected to `/thoughtpro-plans`

**API Endpoints Used:**
- `POST /api/users/login` - Login with email/password

---

### 3. **Plan Selection & Payment (Protected)**
```
Plans Page → Select Plan → Subscribe → [Check Auth] → Payment/Signin
```

**Steps:**
1. User browses plans at `/thoughtpro-plans`
2. Selects a plan (monthly/yearly)
3. Clicks "Subscribe Now"
4. **Authentication Check:**
   - ✅ If logged in → Navigate to `/thoughtpro-payment`
   - ❌ If not logged in → Save plan details → Navigate to `/thoughtpro-signin`
5. After signin → Redirected back to payment page with saved plan

**Protected Route:** `/thoughtpro-payment`

---

### 4. **Payment Process (Protected)**
```
Payment Page → Fill Details → Pay with Razorpay → Success Page
```

**Steps:**
1. User on `/thoughtpro-payment` (requires authentication)
2. Name and email pre-filled from localStorage
3. User enters phone number
4. Clicks "Pay ₹XXX with Razorpay"
5. Backend creates Razorpay order (requires auth token)
6. Razorpay modal opens
7. User completes payment
8. Payment verified by backend
9. Redirected to `/thoughtpro-success`

**Protected Route:** `/thoughtpro-payment`

**API Endpoints Used:**
- `POST /api/subscriptions/create-order` (requires Bearer token)
- `POST /api/subscriptions/verify-payment` (requires Bearer token)

---

### 5. **Subscription Management (Protected)**
```
Success Page → Manage Subscription → View History/Cancel
```

**Protected Route:** `/subscription-management`

**API Endpoints Used:**
- `GET /api/subscriptions/status` (requires Bearer token)
- `GET /api/subscriptions/history` (requires Bearer token)
- `POST /api/subscriptions/cancel/{id}` (requires Bearer token)

---

## 🛡️ Protected Routes

The following routes require authentication:

| Route | Component | Purpose |
|-------|-----------|---------|
| `/thoughtpro-payment` | ThoughtProPayment | Payment processing |
| `/thoughtpro-success` | ThoughtProSuccess | Payment confirmation |
| `/subscription-management` | SubscriptionManagement | Manage subscriptions |

### Protection Mechanism:
- Uses `ProtectedRoute` component
- Checks `localStorage.getItem('isAuthenticated')`
- Checks `localStorage.getItem('authToken')`
- If not authenticated:
  - Saves current location to sessionStorage
  - Saves selected plan to sessionStorage (if applicable)
  - Redirects to `/thoughtpro-signin`
- After successful login:
  - Retrieves saved location and plan
  - Redirects back to original destination

---

## 🔄 Return URL Flow

When unauthenticated user tries to access protected route:

```javascript
// 1. Save current location and plan
sessionStorage.setItem('returnUrl', '/thoughtpro-payment');
sessionStorage.setItem('selectedPlan', JSON.stringify(plan));

// 2. Redirect to signin
navigate('/thoughtpro-signin');

// 3. After successful signin
const returnUrl = sessionStorage.getItem('returnUrl');
const selectedPlan = JSON.parse(sessionStorage.getItem('selectedPlan'));

// 4. Clear saved data
sessionStorage.removeItem('returnUrl');

// 5. Redirect back with plan data
navigate(returnUrl, { state: { plan: selectedPlan } });
```

---

## 🔑 API Authentication

All protected API endpoints require Bearer token authentication:

```javascript
headers: {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('authToken')}`
}
```

### Endpoints Requiring Auth:
- `/api/subscriptions/create-order`
- `/api/subscriptions/verify-payment`
- `/api/subscriptions/status`
- `/api/subscriptions/history`
- `/api/subscriptions/cancel/{id}`

---

## 👤 User Display

### Navigation Bar (Plans Page)
Shows different options based on authentication status:

**Authenticated:**
```
Hi, {userName} | My Subscriptions | Download App
```

**Not Authenticated:**
```
Sign In | Download App
```

### Payment Page Pre-fill
When user reaches payment page:
- Name: Pre-filled from `localStorage.getItem('userName')`
- Email: Pre-filled from `localStorage.getItem('userEmail')`
- Phone: User must enter

---

## 🚪 Logout (To Be Implemented)

Add logout functionality:

```javascript
const handleLogout = () => {
  // Clear all auth data
  localStorage.removeItem('authToken');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userId');
  localStorage.removeItem('userName');
  localStorage.removeItem('userRole');
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('emailVerified');
  
  // Redirect to home or signin
  navigate('/thoughtpro-signin');
};
```

---

## ✅ Testing Authentication Flow

### Test Scenario 1: New User
1. Go to `/thoughtpro-signup`
2. Register with email
3. Verify OTP
4. Should redirect to `/thoughtpro-plans`
5. Select a plan → Should go directly to payment

### Test Scenario 2: Existing User
1. Go to `/thoughtpro-signin`
2. Login with credentials
3. Should redirect to `/thoughtpro-plans`
4. Select a plan → Should go directly to payment

### Test Scenario 3: Unauthenticated User
1. Go to `/thoughtpro-plans`
2. Select a plan and click Subscribe
3. Should redirect to `/thoughtpro-signin`
4. After login → Should return to payment with selected plan

### Test Scenario 4: Direct Access to Protected Route
1. Go directly to `/thoughtpro-payment`
2. Should redirect to `/thoughtpro-signin`
3. After login → Should return to payment

---

## 🐛 Error Handling

### Missing Token Error
```
Error: "Please login to continue"
```
**Solution:** User must signin first

### Invalid Token Error
```
Error: "Missing or invalid Authorization header"
```
**Solution:** Token expired or invalid, user must signin again

### Network Error
```
Error: "Failed to create order"
```
**Solution:** Check backend API availability

---

## 📝 Files Modified

1. ✅ `ThoughtProSignin.jsx` - Store token in localStorage
2. ✅ `ThoughtProSignup.jsx` - Already configured
3. ✅ `ThoughtProOtp.jsx` - Store token after verification
4. ✅ `ThoughtProPlans.jsx` - Auth check before subscribe
5. ✅ `ThoughtProPayment.jsx` - Require auth token, pre-fill user info
6. ✅ `App.js` - Add protected routes
7. ✅ `ProtectedRoute.jsx` - New component for route protection
8. ✅ `SubscriptionManagement.jsx` - Already using auth headers

---

## 🎯 Next Steps

1. **Test the complete flow** from signup to payment
2. **Add logout button** in navigation/user menu
3. **Handle token expiration** - Add token refresh logic
4. **Add loading states** during authentication
5. **Improve error messages** for better UX
6. **Add "Remember Me"** functionality if needed
