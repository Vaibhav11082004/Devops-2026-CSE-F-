import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldX, Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-950 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-md">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 shadow-glow-rose">
            <ShieldX className="w-12 h-12" />
          </div>
        </div>

        <span className="text-xs font-mono uppercase tracking-widest text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
          HTTP 404 // UNREACHABLE ENDPOINT
        </span>

        <h1 className="mt-4 text-3xl font-bold font-mono text-white tracking-tight">
          SECTOR NOT FOUND
        </h1>
        <p className="mt-2 text-xs font-mono text-slate-400">
          The requested coordinate does not exist or has been quarantined by SentinelAI autonomous defense rules.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/dashboard"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-medium text-dark-950 bg-gradient-to-r from-sentinel-400 to-cyan-400 hover:from-sentinel-300 hover:to-cyan-300 shadow-glow-cyan transition-all"
          >
            <Home className="w-4 h-4" />
            <span>RETURN TO DASHBOARD</span>
          </Link>
          <Link
            to="/login"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono text-slate-300 bg-dark-900 hover:bg-slate-800 border border-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>LOGIN TERMINAL</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
