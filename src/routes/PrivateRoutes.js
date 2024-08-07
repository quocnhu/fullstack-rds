import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
  const session = sessionStorage.getItem("account");
  return session ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;

