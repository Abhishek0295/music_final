import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../middleware/useAuth';
import { Triangle } from 'react-loader-spinner';

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-fit">
        <Triangle
          visible={true}
          height="150"
          width="150"
          color="#4fa94d"
          ariaLabel="triangle-loading"
        />
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
