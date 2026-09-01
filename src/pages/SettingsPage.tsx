import React, { useState } from 'react';
import { API_BASE_URL } from '../services/api';
import { Settings, Server, Shield, Bell, Save, Key, Check } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [apiUrl, setApiUrl] = useState(API_BASE_URL);
  const [apiKey, setApiKey] = useState('sentinel_sk_live_89f0293da8201b');
  const [defenseMode, setDefenseMode] = useState('autonomous');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [slackWebhook, setSlackWebhook] = useState('https://hooks.slack.com/services/T00/B00/XXXX');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-sentinel-400" />
          <h1 className="text-xl font-bold font-mono text-white tracking-wide">
            SYSTEM & INTEGRATION SETTINGS
          </h1>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Configure backend connection endpoints, autonomous defense policies, and alerts.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Backend Endpoint Hookup Card */}
        <div className="bg-dark-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Server className="w-4 h-4 text-sentinel-400" />
            <h2 className="text-sm font-semibold font-mono text-white uppercase tracking-wider">
              Backend API Configuration
            </h2>
          </div>

          <p className="text-xs text-slate-400">
            Currently utilizing simulated mock services. Wire up your live production or staging SentinelAI backend below:
          </p>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1">
                API Base URL
              </label>
              <input
                type="url"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                placeholder="https://api.sentinel.ai/v1"
                className="w-full bg-dark-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sentinel-500 font-mono"
              />
              <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                Target endpoint for <code className="text-sentinel-400">src/services/api.ts</code>
              </span>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1">
                Master Sentinel API Secret Key
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full bg-dark-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sentinel-500 font-mono"
                />
                <Key className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>
        </div>

        {/* Defense Policy Modes */}
        <div className="bg-dark-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Shield className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-semibold font-mono text-white uppercase tracking-wider">
              Autonomous Mitigation Policy
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                id: 'autonomous',
                name: 'Full Autonomous',
                desc: 'Auto-isolate IPs & container clusters instantly upon >90% threat certainty.',
              },
              {
                id: 'supervised',
                name: 'Supervised SecOps',
                desc: 'Alert operator first for approval before applying firewall or quarantine rules.',
              },
              {
                id: 'audit-only',
                name: 'Audit / Passive',
                desc: 'Log telemetry without actively intercepting or terminating traffic.',
              },
            ].map((mode) => (
              <div
                key={mode.id}
                onClick={() => setDefenseMode(mode.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  defenseMode === mode.id
                    ? 'bg-sentinel-500/10 border-sentinel-500 text-white shadow-glow-cyan'
                    : 'bg-dark-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono font-semibold">{mode.name}</span>
                  {defenseMode === mode.id && <Check className="w-3.5 h-3.5 text-sentinel-400" />}
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">{mode.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Alert Notifications */}
        <div className="bg-dark-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Bell className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-semibold font-mono text-white uppercase tracking-wider">
              Telemetry Dispatch & Alerts
            </h2>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 rounded bg-dark-950 border-slate-700 text-sentinel-500"
              />
              <span>Send high-severity incident digests via email</span>
            </label>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1">
                Slack / Teams Webhook URL
              </label>
              <input
                type="url"
                value={slackWebhook}
                onChange={(e) => setSlackWebhook(e.target.value)}
                className="w-full bg-dark-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sentinel-500 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-between pt-2">
          {savedSuccess ? (
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
              <Check className="w-4 h-4" /> Settings updated successfully.
            </span>
          ) : (
            <span className="text-xs font-mono text-slate-500">Changes will persist across sessions.</span>
          )}

          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-medium text-dark-950 bg-gradient-to-r from-sentinel-400 to-cyan-400 hover:from-sentinel-300 hover:to-cyan-300 shadow-glow-cyan transition-all"
          >
            <Save className="w-4 h-4" />
            <span>SAVE CONFIGURATION</span>
          </button>
        </div>
      </form>
    </div>
  );
};
