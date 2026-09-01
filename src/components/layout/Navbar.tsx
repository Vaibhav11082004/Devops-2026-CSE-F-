import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Bell,
  Search,
  Shield,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Sliders,
  CheckCircle2,
} from 'lucide-react';

interface NavbarProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar, isSidebarOpen }) => {
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-30 h-16 bg-dark-900/90 backdrop-blur-md border-b border-slate-800 px-4 lg:px-6 flex items-center justify-between">
      {/* Left side: Mobile menu toggle & Breadcrumb / search */}
      <div className="flex items-center gap-3 lg:gap-6 flex-1">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Toggle Navigation"
        >
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Global Search */}
        <div className="relative max-w-md w-full hidden sm:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search threats, IPs, endpoints, or rules... (Press / to focus)"
            className="w-full bg-dark-950/80 border border-slate-800 rounded-lg pl-9 pr-12 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sentinel-500 focus:ring-1 focus:ring-sentinel-500 transition-all"
          />
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-500 bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-700">
            /
          </span>
        </div>
      </div>

      {/* Right side: Operational status, Alerts, User Profile */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Real-time Sentinel Status */}
        <div className="hidden md:flex items-center gap-2 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-mono text-emerald-400 font-medium tracking-wide">
            AI SENTINEL ONLINE
          </span>
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors relative"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-dark-900 animate-pulse" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-dark-900 border border-slate-800 rounded-xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-sentinel-400" />
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                    Live Threat Alerts
                  </h4>
                </div>
                <span className="text-[10px] bg-rose-500/20 text-rose-400 px-2 py-0.5 rounded-full font-mono font-medium">
                  3 Critical
                </span>
              </div>

              <div className="mt-3 space-y-2.5">
                <div className="p-2.5 rounded-lg bg-dark-950/70 border border-slate-800/80 hover:border-slate-700 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs font-medium text-slate-200">SSH Credential Stuffing Attack</p>
                    <span className="text-[10px] font-mono text-slate-500">2m ago</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">Automated firewall rule deployed to isolate 185.220.101.5</p>
                </div>
                <div className="p-2.5 rounded-lg bg-dark-950/70 border border-slate-800/80 hover:border-slate-700 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs font-medium text-slate-200">Exfiltration Alert: S3 Vault</p>
                    <span className="text-[10px] font-mono text-slate-500">14m ago</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">Anomalous high-bandwidth egress throttled</p>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/80 text-center">
                <span className="text-[11px] text-sentinel-400 hover:text-sentinel-300 cursor-pointer font-medium">
                  View All Telemetry Events →
                </span>
              </div>
            </div>
          )}
        </div>

        {/* User Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-800/80 transition-colors"
          >
            <img
              src={user?.avatarUrl || 'https://api.dicebear.com/7.x/bottts/svg?seed=sentinel'}
              alt={user?.name || 'User'}
              className="w-7 h-7 rounded-lg border border-slate-700 object-cover"
            />
            <div className="hidden lg:block text-left">
              <p className="text-xs font-medium text-slate-200 leading-tight">{user?.name || 'Operator'}</p>
              <p className="text-[10px] font-mono text-sentinel-400">{user?.role || 'SecOps'}</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-dark-900 border border-slate-800 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-2 border-b border-slate-800">
                <p className="text-xs font-semibold text-slate-200">{user?.name}</p>
                <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
                <p className="text-[10px] font-mono text-slate-500 mt-1 uppercase">
                  {user?.organization || 'Sentinel Node'}
                </p>
              </div>

              <div className="py-1">
                <div className="flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 rounded-lg cursor-pointer">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Role: {user?.role}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 rounded-lg cursor-pointer">
                  <Sliders className="w-3.5 h-3.5 text-slate-400" />
                  <span>Preferences</span>
                </div>
              </div>

              <div className="pt-1 border-t border-slate-800">
                <button
                  onClick={() => logout()}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
