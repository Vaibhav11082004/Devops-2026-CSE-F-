import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { securityApi } from '../services/api';
import type { DashboardStats, Incident, AIAgent } from '../services/mockData';
import { StatCard } from '../components/common/StatCard';
import {
  ShieldAlert,
  ShieldCheck,
  Cpu,
  Server,
  RefreshCw,
  Download,
  Crosshair,
  Radio,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [agents, setAgents] = useState<AIAgent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState<string | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [statsData, incidentsData, agentsData] = await Promise.all([
        securityApi.getDashboardStats(),
        securityApi.getIncidents(),
        securityApi.getAgents(),
      ]);
      setStats(statsData);
      setIncidents(incidentsData);
      setAgents(agentsData);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleTriggerScan = async () => {
    setIsScanning(true);
    setScanMessage('AI Sentinel scanning 1,420 endpoints & network edges...');
    setTimeout(() => {
      setIsScanning(false);
      setScanMessage('Full system perimeter scan completed. All threat signatures updated.');
      setTimeout(() => setScanMessage(null), 5000);
    }, 2200);
  };

  const handleIsolate = async (incidentId: string) => {
    await securityApi.resolveIncident(incidentId);
    setIncidents((prev) =>
      prev.map((inc) =>
        inc.id === incidentId ? { ...inc, status: 'mitigated' } : inc
      )
    );
  };

  const getSeverityBadge = (severity: Incident['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
      case 'high':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'medium':
        return 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30';
      case 'low':
      default:
        return 'bg-slate-500/15 text-slate-400 border-slate-500/30';
    }
  };

  const getStatusBadge = (status: Incident['status']) => {
    switch (status) {
      case 'blocked':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'mitigated':
        return 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30';
      case 'investigating':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30 animate-pulse';
      case 'active':
      default:
        return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Trigger */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-gradient-to-r from-dark-900 via-dark-900/90 to-dark-850 rounded-2xl border border-slate-800 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono tracking-widest text-sentinel-400 uppercase bg-sentinel-500/10 px-2 py-0.5 rounded border border-sentinel-500/20">
              Active Session
            </span>
            <span className="text-xs text-slate-400 font-mono">NODE ID: {user?.id}</span>
          </div>
          <h1 className="text-xl lg:text-2xl font-bold text-white tracking-tight">
            Welcome, {user?.name}
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Autonomous threat detection grid active. Real-time telemetry monitoring 1,420 endpoints across distributed multi-cloud nodes.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <button
            onClick={handleTriggerScan}
            disabled={isScanning}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-medium text-dark-950 bg-gradient-to-r from-sentinel-400 to-cyan-400 hover:from-sentinel-300 hover:to-cyan-300 shadow-glow-cyan transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'RUNNING SCAN...' : 'TRIGGER AUDIT SCAN'}</span>
          </button>
        </div>

        {/* Ambient glow decoration */}
        <div className="absolute right-0 top-0 bottom-0 w-64 bg-sentinel-500/5 blur-3xl pointer-events-none" />
      </div>

      {scanMessage && (
        <div className="p-3 bg-sentinel-500/10 border border-sentinel-500/30 rounded-xl flex items-center justify-between text-xs text-sentinel-300 font-mono animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-sentinel-400 animate-pulse" />
            <span>{scanMessage}</span>
          </div>
          <span className="text-[10px] text-slate-400">Zero-Trust Telemetry</span>
        </div>
      )}

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Threats Intercepted"
          value={stats?.threatsBlocked ? stats.threatsBlocked.toLocaleString() : '14,892'}
          change="+12.4%"
          isPositive={true}
          icon={ShieldAlert}
          color="cyan"
          description="Autonomous block rate at 99.8%"
        />
        <StatCard
          title="Security Posture Score"
          value={stats ? `${stats.securityScore}%` : '96%'}
          change="+2.1%"
          isPositive={true}
          icon={ShieldCheck}
          color="emerald"
          description="Compliance: SOC2 & NIST aligned"
        />
        <StatCard
          title="Active AI Sentinel Agents"
          value={stats?.activeAgents || 8}
          icon={Cpu}
          color="indigo"
          description="Ensemble neural models online"
        />
        <StatCard
          title="Monitored Endpoints"
          value={stats?.scannedEndpoints ? stats.scannedEndpoints.toLocaleString() : '1,420'}
          change="99.2%"
          isPositive={true}
          icon={Server}
          color="amber"
          description="Continuous agent heartbeat"
        />
      </div>

      {/* Main Grid: Live Incidents & AI Models */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real-time Threat Activity Feed (2 Cols) */}
        <div className="lg:col-span-2 bg-dark-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <Crosshair className="w-4 h-4 text-rose-400" />
                <h2 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
                  Live Threat Interceptions
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Real-time heuristics & intrusion attempts</p>
            </div>
            <button
              onClick={() => loadData()}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Refresh feed"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-4 flex-1 overflow-x-auto">
            {isLoading ? (
              <div className="py-12 flex flex-col items-center justify-center text-slate-400 text-xs font-mono">
                <div className="w-6 h-6 border-2 border-sentinel-500/20 border-t-sentinel-400 rounded-full animate-spin mb-2" />
                <span>FETCHING TELEMETRY STREAM...</span>
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-[10px] font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800/80">
                    <th className="pb-3 pl-2">Incident / Vector</th>
                    <th className="pb-3">Severity</th>
                    <th className="pb-3 hidden sm:table-cell">Target Asset</th>
                    <th className="pb-3 hidden md:table-cell">Confidence</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right pr-2">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {incidents.slice(0, 5).map((incident) => (
                    <tr key={incident.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 pl-2 max-w-[200px]">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-sentinel-400" />
                          <div className="truncate">
                            <p className="font-sans font-medium text-slate-200 truncate">{incident.title}</p>
                            <p className="text-[10px] text-slate-500 truncate">{incident.sourceIp}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3">
                        <span
                          className={`text-[10px] uppercase px-2 py-0.5 rounded-full border font-bold ${getSeverityBadge(
                            incident.severity
                          )}`}
                        >
                          {incident.severity}
                        </span>
                      </td>

                      <td className="py-3 hidden sm:table-cell text-slate-300 text-[11px] truncate max-w-[120px]">
                        {incident.target}
                      </td>

                      <td className="py-3 hidden md:table-cell text-slate-300 text-[11px]">
                        <span className="text-sentinel-400 font-bold">{incident.aiConfidence}%</span>
                      </td>

                      <td className="py-3">
                        <span
                          className={`text-[10px] uppercase px-2 py-0.5 rounded-md border ${getStatusBadge(
                            incident.status
                          )}`}
                        >
                          {incident.status}
                        </span>
                      </td>

                      <td className="py-3 text-right pr-2">
                        {incident.status === 'investigating' || incident.status === 'active' ? (
                          <button
                            onClick={() => handleIsolate(incident.id)}
                            className="px-2 py-1 text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/40 rounded hover:bg-rose-500/30 transition-colors"
                          >
                            Isolate
                          </button>
                        ) : (
                          <span className="text-[10px] text-emerald-400/80 flex items-center justify-end gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Safe
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400 font-mono text-[11px]">Showing 5 most recent threat events</span>
            <a
              href="/dashboard/incidents"
              className="text-sentinel-400 hover:text-sentinel-300 font-mono text-[11px] flex items-center gap-1"
            >
              <span>View Full Incident Ledger</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* AI Sentinel Agents Health (1 Col) */}
        <div className="bg-dark-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-sentinel-400" />
                <h2 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
                  AI Guardrails
                </h2>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                4/4 Synchronized
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {agents.map((agent) => (
                <div
                  key={agent.id}
                  className="p-3 rounded-xl bg-dark-950/70 border border-slate-800/80 hover:border-slate-700 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-semibold text-slate-200">{agent.name}</h4>
                      <p className="text-[10px] font-mono text-slate-400">{agent.modelType}</p>
                    </div>
                    <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {agent.status}
                    </span>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-800/50">
                    <span>Accuracy: <strong className="text-sentinel-400">{agent.accuracy}%</strong></span>
                    <span>Threats: <strong className="text-slate-200">{agent.threatsDetected.toLocaleString()}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-center">
            <button
              onClick={() => alert('Exporting Sentinel SOC audit bundle...')}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-mono text-slate-300 bg-dark-950 hover:bg-slate-800 border border-slate-800 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Daily SOC Audit Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
