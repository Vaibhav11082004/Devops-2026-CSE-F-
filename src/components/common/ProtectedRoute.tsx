import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-950 flex flex-col items-center justify-center text-slate-300">
        <div className="relative mb-4">
          <div className="w-14 h-14 rounded-full border-2 border-sentinel-500/20 border-t-sentinel-400 animate-spin" />
          <ShieldCheck className="w-6 h-6 text-sentinel-400 absolute inset-0 m-auto animate-pulse" />
        </div>
        <p className="text-sm font-mono tracking-wider text-slate-400">AUTHENTICATING SENTINEL SESSION...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
