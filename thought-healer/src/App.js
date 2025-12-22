import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Otp from './pages/Otp';
import ThoughtPro from './pages/ThoughtPro';
import ThoughtProPlans from './pages/ThoughtProPlans';
import ThoughtProSignin from './pages/ThoughtProSignin';
import MiniMinds from './pages/MiniMinds';
import MiniMindsSignin from './pages/MiniMindsSignin';
import MiniMindsSignup from './pages/MiniMindsSignup';
import MiniMindsOtp from './pages/MiniMindsOtp';
import MiniMindsPlans from './pages/MiniMindsPlans';
import MiniMindsPayment from './pages/MiniMindsPayment';
import MiniMindsSuccess from './pages/MiniMindsSuccess';

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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/thoughtpro" element={<ThoughtPro />} />
           <Route path="/miniminds" element={<MiniMinds />} />
          <Route path="/thoughtpro-signin" element={<ThoughtProSignin />} />
          <Route path="/thoughtpro-signup" element={<ThoughtProSignup />} />
          <Route path="/thoughtpro-otp" element={<ThoughtProOtp />} />
          <Route path="/miniminds-signin" element={<MiniMindsSignin />} />
          <Route path="/miniminds-signup" element={<MiniMindsSignup />} />
          <Route path="/miniminds-otp" element={<MiniMindsOtp />} />
          
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
            <Route 
              path="users" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <UserManagement />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="coupons" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <CouponManagement />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="psychologists" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <PsychologistManagement />
                </ProtectedRoute>
              } 
            />
          </Route>
          
          {/* Redirect old admin-dashboard to new route */}
          <Route path="/admin-dashboard" element={<Navigate to="/admin/users" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
