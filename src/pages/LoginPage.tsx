import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, ShieldAlert, Lock, Mail, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('alex.rivera@sentinel.ai');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed. Please verify credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = async () => {
    setError(null);
    setIsSubmitting(true);
    try {
      await login('operator@sentinel.ai', 'sentinel-secure-pass');
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Demo access error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-sentinel-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {/* Logo and branding */}
        <div className="flex justify-center">
          <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-sentinel-500/20 to-sentinel-800/20 border border-sentinel-500/40 shadow-glow-cyan">
            <ShieldAlert className="w-8 h-8 text-sentinel-400" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sentinel-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sentinel-500" />
            </span>
          </div>
        </div>

        <h2 className="mt-4 text-center text-2xl font-bold font-mono tracking-tight text-white">
          SENTINEL<span className="text-sentinel-400">AI</span>
        </h2>
        <p className="mt-1 text-center text-xs font-mono text-slate-400 uppercase tracking-widest">
          Autonomous SecOps Command Platform
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="bg-dark-900/90 border border-slate-800 backdrop-blur-xl py-8 px-6 sm:px-10 shadow-2xl rounded-2xl">
          {error && (
            <div className="mb-6 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-start gap-2.5 text-rose-300 text-xs">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                Corporate Email Address
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="analyst@agency.corp"
                  className="block w-full pl-10 pr-3 py-2.5 bg-dark-950/80 border border-slate-800 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sentinel-500 focus:ring-1 focus:ring-sentinel-500 font-mono transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
                  Passcode / API Key
                </label>
                <a href="#forgot" className="text-[11px] font-mono text-sentinel-400 hover:text-sentinel-300">
                  Reset Key?
                </a>
              </div>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="block w-full pl-10 pr-3 py-2.5 bg-dark-950/80 border border-slate-800 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sentinel-500 focus:ring-1 focus:ring-sentinel-500 font-mono transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-300">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 rounded bg-dark-950 border-slate-700 text-sentinel-500 focus:ring-0 focus:ring-offset-0"
                />
                <span>Enforce Zero-Trust Session</span>
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium text-dark-950 bg-gradient-to-r from-sentinel-400 to-cyan-400 hover:from-sentinel-300 hover:to-cyan-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-950 focus:ring-sentinel-400 shadow-glow-cyan transition-all disabled:opacity-50 font-mono"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-dark-950/30 border-t-dark-950 rounded-full animate-spin" />
                    <span>AUTHENTICATING...</span>
                  </>
                ) : (
                  <>
                    <span>AUTHENTICATE & ENTER</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Demo Access Button */}
          <div className="mt-6 pt-5 border-t border-slate-800/80">
            <button
              onClick={handleDemoLogin}
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-mono text-sentinel-300 bg-sentinel-500/10 hover:bg-sentinel-500/20 border border-sentinel-500/30 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-sentinel-400" />
              <span>One-Click Quick Demo Login</span>
            </button>
          </div>

          <div className="mt-6 text-center text-xs text-slate-400">
            <span>Don't have an enterprise credential? </span>
            <Link to="/register" className="text-sentinel-400 hover:text-sentinel-300 font-medium">
              Register Node
            </Link>
          </div>
        </div>

        {/* Developer Integration Tip */}
        <div className="mt-6 p-3 rounded-xl bg-dark-900/40 border border-slate-800/60 text-center">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-slate-400">
            <Shield className="w-3.5 h-3.5 text-sentinel-400" />
            <span>Mock API Active • Ready for backend hookup</span>
          </div>
        </div>
      </div>
    </div>
  );
};
