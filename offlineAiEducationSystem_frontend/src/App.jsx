import React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar.jsx';
import OfflineIndicator from './components/offlineIndicator/OfflineIndicator.jsx';
import Home from './routes/Home';
import About from './routes/About';
import Contact from './routes/Contact';
import Features from './routes/Features';
import LoginSignup from './routes/AuthPage.jsx';
import SelectRolePage from './routes/SelectRolePage';
import { Routes, Route } from 'react-router-dom';
import { RequireAuth, RequireFullAuth } from './routes/ProtectedRoute';
// Import dashboards
import StudentDashboard from './routes/dashboards/StudentDashboard.jsx';
import TeacherDashboard from './routes/dashboards/TeacherDashboard.jsx';
import AdminDashboard from './routes/dashboards/AdminDashboard.jsx';

const App = () => {
  return (
    <div className='app'>
      <Navbar />
      <OfflineIndicator />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/loginsignup" element={<LoginSignup />} />

        {/* Protected Routes */}
        <Route path="/selectrole" element={
          <RequireAuth>
            <SelectRolePage />
          </RequireAuth>
        } />

        {/* Role-based Dashboards */}
        <Route path="/student" element={
          <RequireFullAuth>
            <StudentDashboard />
          </RequireFullAuth>
        } />
        <Route path="/teacher" element={
          <RequireFullAuth>
            <TeacherDashboard />
          </RequireFullAuth>
        } />
        <Route path="/admin" element={
          <RequireFullAuth>
            <AdminDashboard />
          </RequireFullAuth>
        } />

        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
};

export default App;
