import React, { useEffect, useState } from 'react';
import { securityApi } from '../services/api';
import type { AIAgent } from '../services/mockData';
import { Cpu, RefreshCw, Zap, Activity } from 'lucide-react';

export const AgentsPage: React.FC = () => {
  const [agents, setAgents] = useState<AIAgent[]>([]);
  const [loading, setLoading] = useState(true);
  const [retrainingId, setRetrainingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchAgents = async () => {
      setLoading(true);
      try {
        const data = await securityApi.getAgents();
        setAgents(data);
      } catch (err) {
        console.error('Failed to load agents:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAgents();
  }, []);

  const handleRetrain = (id: string) => {
    setRetrainingId(id);
    setTimeout(() => {
      setRetrainingId(null);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-sentinel-400" />
            <h1 className="text-xl font-bold font-mono text-white tracking-wide">
              AI SENTINEL NEURAL MODELS
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Autonomous threat detection algorithms actively classifying inbound packets and anomalous process executions.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-900 border border-slate-800 rounded-xl text-xs font-mono text-emerald-400">
          <Activity className="w-4 h-4 animate-pulse" />
          <span>Distributed Inference Cluster Online</span>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-2 py-16 text-center text-slate-500 font-mono text-xs">
            Loading neural telemetry...
          </div>
        ) : (
          agents.map((agent) => (
            <div
              key={agent.id}
              className="bg-dark-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-sentinel-500/10 text-sentinel-400 border border-sentinel-500/20">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white tracking-wide">{agent.name}</h3>
                      <p className="text-xs font-mono text-slate-400">{agent.version} • {agent.modelType}</p>
                    </div>
                  </div>

                  <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {agent.status}
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="bg-dark-950/70 p-3 rounded-xl border border-slate-800/80">
                    <span className="text-[10px] font-mono text-slate-500 uppercase">Detection Accuracy</span>
                    <p className="text-lg font-mono font-bold text-sentinel-400 mt-1">{agent.accuracy}%</p>
                  </div>
                  <div className="bg-dark-950/70 p-3 rounded-xl border border-slate-800/80">
                    <span className="text-[10px] font-mono text-slate-500 uppercase">Threats Neutralized</span>
                    <p className="text-lg font-mono font-bold text-slate-200 mt-1">
                      {agent.threatsDetected.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Heartbeat: <strong className="text-slate-300">{agent.lastActive}</strong></span>
                  <span>Checkpoint: <strong className="text-slate-300">PyTorch 2.4 GPU</strong></span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500">Autonomous Quarantine Enabled</span>
                <button
                  onClick={() => handleRetrain(agent.id)}
                  disabled={retrainingId === agent.id}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-dark-950 hover:bg-slate-800 border border-slate-700 text-slate-300 rounded-lg transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`w-3 h-3 ${retrainingId === agent.id ? 'animate-spin' : ''}`} />
                  <span>{retrainingId === agent.id ? 'Fine-Tuning...' : 'Sync Weights'}</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
