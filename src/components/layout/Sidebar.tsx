import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  ShieldAlert,
  LayoutDashboard,
  AlertOctagon,
  Cpu,
  Settings,
  LogOut,
  Activity,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onCloseMobile }) => {
  const { user, logout } = useAuth();

  const navigation = [
    { name: 'Threat Monitor', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Live Incidents', href: '/dashboard/incidents', icon: AlertOctagon, badge: '3' },
    { name: 'AI Sentinel Agents', href: '/dashboard/agents', icon: Cpu, badge: '4' },
    { name: 'System Settings', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-dark-950/80 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-dark-900 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Logo Header */}
        <div className="h-16 px-6 flex items-center gap-3 border-b border-slate-800 bg-dark-950/40">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-sentinel-500/20 to-sentinel-700/10 border border-sentinel-500/30 text-sentinel-400 shadow-glow-cyan">
            <ShieldAlert className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sentinel-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sentinel-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-bold text-base tracking-wider text-white">SENTINEL</span>
              <span className="font-mono text-xs font-semibold px-1.5 py-0.5 rounded bg-sentinel-500/20 text-sentinel-400 border border-sentinel-500/30">
                AI
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-400 tracking-wider">CYBER OPS COMMAND</p>
          </div>
        </div>

        {/* Navigation items */}
        <div className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          <div className="px-3 mb-2 text-[10px] font-mono uppercase tracking-widest text-slate-500">
            Operations
          </div>

          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                end={item.href === '/dashboard'}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `group flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-sentinel-500/15 text-sentinel-300 border border-sentinel-500/30 shadow-glow-cyan'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive ? 'text-sentinel-400' : 'text-slate-500 group-hover:text-slate-300'
                        }`}
                      />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                          isActive
                            ? 'bg-sentinel-500/30 text-sentinel-200'
                            : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}

          {/* Telemetry quick stats widget */}
          <div className="pt-6 px-3">
            <div className="p-3 rounded-xl bg-dark-950/60 border border-slate-800/80">
              <div className="flex items-center justify-between text-[11px] mb-2 text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span className="font-mono">Engine Latency</span>
                </div>
                <span className="font-mono text-emerald-400">14 ms</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full w-[28%]" />
              </div>
              <div className="mt-2 text-[10px] text-slate-500 flex justify-between font-mono">
                <span>Threat Load</span>
                <span>Normal (28%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* User Card & Logout Footer */}
        <div className="p-3 border-t border-slate-800 bg-dark-950/30">
          <div className="flex items-center justify-between p-2 rounded-lg bg-dark-950/50 border border-slate-800">
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={user?.avatarUrl || 'https://api.dicebear.com/7.x/bottts/svg?seed=sentinel'}
                alt={user?.name || 'Operator'}
                className="w-8 h-8 rounded-lg border border-slate-700 shrink-0"
              />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-200 truncate">{user?.name || 'SecOps Agent'}</p>
                <p className="text-[10px] font-mono text-slate-500 truncate">{user?.organization}</p>
              </div>
            </div>

            <button
              onClick={() => logout()}
              title="Sign Out"
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-md transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
