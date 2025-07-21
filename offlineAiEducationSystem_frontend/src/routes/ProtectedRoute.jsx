// components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

export const RequireAuth = ({ children }) => {
  const user = localStorage.getItem('userName');
  return user ? children : <Navigate to="/loginsignup" replace />;
};

export const RequireFullAuth = ({ children }) => {
  const user = localStorage.getItem('userName');
  const role = localStorage.getItem('userRole');
  if (!user) return <Navigate to="/loginsignup" replace />;
  if (!role) return <Navigate to="/selectrole" replace />;
  return children;
};
