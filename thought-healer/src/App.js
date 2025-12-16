import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Home from './pages/Home';
import ThoughtPro from './pages/ThoughtPro';
import ThoughtProPlans from './pages/ThoughtProPlans';
import ThoughtProSignin from './pages/ThoughtProSignin';
import ThoughtProSignup from './pages/ThoughtProSignup';
import ThoughtProOtp from './pages/ThoughtProOtp';
import ThoughtProPayment from './pages/ThoughtProPayment';
import ThoughtProSuccess from './pages/ThoughtProSuccess';
import SubscriptionManagement from './pages/SubscriptionManagement';
import AdminLayout from './pages/admin/AdminLayout';
import UserManagement from './pages/admin/UserManagement';
import CouponManagement from './pages/admin/CouponManagement';
import PsychologistManagement from './pages/admin/PsychologistManagement';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/thoughtpro" element={<ThoughtPro />} />
          <Route path="/thoughtpro-signin" element={<ThoughtProSignin />} />
          <Route path="/thoughtpro-signup" element={<ThoughtProSignup />} />
          <Route path="/thoughtpro-otp" element={<ThoughtProOtp />} />
          
          {/* Public - Can view plans without login */}
          <Route path="/thoughtpro-plans" element={<ThoughtProPlans />} />
          
          {/* Protected Routes - Require Authentication */}
          <Route 
            path="/thoughtpro-payment" 
            element={
              <ProtectedRoute>
                <ThoughtProPayment />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/thoughtpro-success" 
            element={
              <ProtectedRoute>
                <ThoughtProSuccess />
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
          
          {/* Admin Routes with Sidebar Layout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/users" replace />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="coupons" element={<CouponManagement />} />
            <Route path="psychologists" element={<PsychologistManagement />} />
          </Route>
          
          {/* Redirect old admin-dashboard to new route */}
          <Route path="/admin-dashboard" element={<Navigate to="/admin/users" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
