import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

// ─── Eagerly loaded (Home renders immediately — no lazy for critical path)
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';

// ─── Lazy-loaded product pages (split into separate JS chunks)
const Login         = React.lazy(() => import('./pages/Login'));
const Signup        = React.lazy(() => import('./pages/Signup'));
const Otp           = React.lazy(() => import('./pages/Otp'));
const ThoughtPro    = React.lazy(() => import('./pages/ThoughtPro'));
const ThoughtProB2B = React.lazy(() => import('./pages/ThoughtProB2B'));
const ThoughtProPlans   = React.lazy(() => import('./pages/ThoughtProPlans'));
const ThoughtProSignin  = React.lazy(() => import('./pages/ThoughtProSignin'));
const ThoughtProSignup  = React.lazy(() => import('./pages/ThoughtProSignup'));
const ThoughtProOtp     = React.lazy(() => import('./pages/ThoughtProOtp'));
const ThoughtProPayment = React.lazy(() => import('./pages/ThoughtProPayment'));
const ThoughtProSuccess = React.lazy(() => import('./pages/ThoughtProSuccess'));
const MiniMinds     = React.lazy(() => import('./pages/MiniMinds'));
const MiniMindsSignin   = React.lazy(() => import('./pages/MiniMindsSignin'));
const MiniMindsSignup   = React.lazy(() => import('./pages/MiniMindsSignup'));
const MiniMindsOtp      = React.lazy(() => import('./pages/MiniMindsOtp'));
const MiniMindsPlans    = React.lazy(() => import('./pages/MiniMindsPlans'));
const MiniMindsPayment  = React.lazy(() => import('./pages/MiniMindsPayment'));
const MiniMindsSuccess  = React.lazy(() => import('./pages/MiniMindsSuccess'));
const HerMind       = React.lazy(() => import('./pages/HerMind'));
const LES           = React.lazy(() => import('./pages/LES'));
const SubAdminLogin = React.lazy(() => import('./pages/SubAdminLogin'));
const SubscriptionManagement = React.lazy(() => import('./pages/SubscriptionManagement'));

// ─── Legal pages (low priority, always lazy)
const PrivacyPolicy      = React.lazy(() => import('./pages/PrivacyPolicy'));
const TermsAndConditions = React.lazy(() => import('./pages/TermsAndConditions'));
const Cookies            = React.lazy(() => import('./pages/Cookies'));
const Disclaimer         = React.lazy(() => import('./pages/Disclaimer'));

// ─── Admin pages (never in initial bundle)
const AdminLayout           = React.lazy(() => import('./pages/admin/AdminLayout'));
const UserManagement        = React.lazy(() => import('./pages/admin/UserManagement'));
const CouponManagement      = React.lazy(() => import('./pages/admin/CouponManagement'));
const PsychologistManagement = React.lazy(() => import('./pages/admin/PsychologistManagement'));
const MarketingCoupons      = React.lazy(() => import('./pages/admin/MarketingCoupons'));
const UserCreation          = React.lazy(() => import('./pages/admin/UserCreation'));
const SubscriptionGrant     = React.lazy(() => import('./pages/admin/SubscriptionGrant'));
const TwoFactorSettings     = React.lazy(() => import('./pages/admin/TwoFactorSettings'));
const SubAdminManagement    = React.lazy(() => import('./pages/admin/SubAdminManagement'));
const PreAuthorization      = React.lazy(() => import('./pages/admin/PreAuthorization'));

// ─── Loading fallback (lightweight — no external deps)
const PageLoader = () => (
  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a' }}>
    <div style={{ width: 48, height: 48, border: '4px solid #14b8a6', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

function App() {
  useEffect(() => {
    // Initialize AOS with optimized settings
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      // Disable AOS on mobile to improve LCP
      disable: window.innerWidth < 768 ? 'mobile' : false,
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/otp" element={<Otp />} />
            <Route path="/thoughtpro" element={<ThoughtPro />} />
            <Route path="/thoughtpro-b2b" element={<ThoughtProB2B />} />
            <Route path="/miniminds" element={<MiniMinds />} />
            <Route path="/hermind" element={<HerMind />} />
            <Route path="/les" element={<LES />} />
            <Route path="/thoughtpro-signin" element={<ThoughtProSignin />} />
            <Route path="/thoughtpro-signup" element={<ThoughtProSignup />} />
            <Route path="/thoughtpro-otp" element={<ThoughtProOtp />} />
            <Route path="/miniminds-signin" element={<MiniMindsSignin />} />
            <Route path="/miniminds-signup" element={<MiniMindsSignup />} />
            <Route path="/miniminds-otp" element={<MiniMindsOtp />} />

            {/* Sub-Admin Login */}
            <Route path="/sub-admin-login" element={<SubAdminLogin />} />

            {/* Legal Pages */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/disclaimer" element={<Disclaimer />} />

            {/* Public - Can view plans without login */}
            <Route path="/thoughtpro-plans" element={<ThoughtProPlans />} />
            <Route path="/miniminds-plans" element={<MiniMindsPlans />} />

            {/* Protected Routes - Require Authentication */}
            <Route
              path="/thoughtpro-payment"
              element={
                <ProtectedRoute requiredProduct="thoughtpro">
                  <ThoughtProPayment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/thoughtpro-success"
              element={
                <ProtectedRoute requiredProduct="thoughtpro">
                  <ThoughtProSuccess />
                </ProtectedRoute>
              }
            />
            <Route
              path="/miniminds-payment"
              element={
                <ProtectedRoute requiredProduct="miniminds">
                  <MiniMindsPayment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/miniminds-success"
              element={
                <ProtectedRoute requiredProduct="miniminds">
                  <MiniMindsSuccess />
                </ProtectedRoute>
              }
            />
            <Route
              path="/subscription-management"
              element={
                <ProtectedRoute>
                  <SubscriptionManagement />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes with Sidebar Layout - Protected */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/admin/users" replace />} />
              <Route path="users" element={<ProtectedRoute requiredRole="admin"><UserManagement /></ProtectedRoute>} />
              <Route path="coupons" element={<ProtectedRoute requiredRole="admin"><CouponManagement /></ProtectedRoute>} />
              <Route path="psychologists" element={<ProtectedRoute requiredRole="admin"><PsychologistManagement /></ProtectedRoute>} />
              <Route path="marketing-coupons" element={<ProtectedRoute requiredRole="admin"><MarketingCoupons /></ProtectedRoute>} />
              <Route path="2fa-setup" element={<ProtectedRoute requiredRole="admin"><TwoFactorSettings /></ProtectedRoute>} />
              <Route path="create-user" element={<ProtectedRoute requiredRole="admin"><UserCreation /></ProtectedRoute>} />
              <Route path="grant-subscription" element={<ProtectedRoute requiredRole="admin"><SubscriptionGrant /></ProtectedRoute>} />
              <Route path="sub-admins" element={<ProtectedRoute requiredRole="admin"><SubAdminManagement /></ProtectedRoute>} />
              <Route path="pre-authorizations" element={<ProtectedRoute requiredRole="admin"><PreAuthorization /></ProtectedRoute>} />
            </Route>

            {/* Redirect old admin-dashboard to new route */}
            <Route path="/admin-dashboard" element={<Navigate to="/admin/users" replace />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
