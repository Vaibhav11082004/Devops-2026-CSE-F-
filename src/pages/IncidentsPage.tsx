import React, { useEffect, useState } from 'react';
import { securityApi } from '../services/api';
import type { Incident } from '../services/mockData';
import { AlertOctagon, Search } from 'lucide-react';

export const IncidentsPage: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchIncidents = async () => {
      setIsLoading(true);
      try {
        const data = await securityApi.getIncidents(filter);
        setIncidents(data);
      } catch (err) {
        console.error('Error fetching incidents:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIncidents();
  }, [filter]);

  const handleMitigate = async (id: string) => {
    await securityApi.resolveIncident(id);
    setIncidents((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'mitigated' } : item))
    );
  };

  const filteredIncidents = incidents.filter(
    (inc) =>
      inc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.sourceIp.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-5 h-5 text-rose-400" />
            <h1 className="text-xl font-bold font-mono text-white tracking-wide">
              SECURITY INCIDENT LEDGER
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time heuristic telemetry log across perimeter firewalls & container clusters.
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-1.5 p-1 bg-dark-900 border border-slate-800 rounded-xl overflow-x-auto">
          {['all', 'critical', 'high', 'medium', 'low'].map((severity) => (
            <button
              key={severity}
              onClick={() => setFilter(severity)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition-colors ${
                filter === severity
                  ? 'bg-sentinel-500/20 text-sentinel-300 border border-sentinel-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {severity}
            </button>
          ))}
        </div>
      </div>

      {/* Search & Stats Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-dark-900 border border-slate-800 p-3 rounded-xl">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search incident ID, IP, or asset..."
            className="w-full bg-dark-950/80 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sentinel-500 font-mono"
          />
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
          <span>Active Events: <strong className="text-rose-400">{filteredIncidents.length}</strong></span>
          <span>Policy: <strong className="text-emerald-400">Zero-Tolerance</strong></span>
        </div>
      </div>

      {/* Incidents Table */}
      <div className="bg-dark-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-dark-950/60 border-b border-slate-800 text-[10px] font-mono uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Threat Type</th>
                <th className="py-3 px-4">Vector Description</th>
                <th className="py-3 px-4">Severity</th>
                <th className="py-3 px-4">Source IP</th>
                <th className="py-3 px-4">Target Resource</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Containment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500 text-xs">
                    Loading incident ledger...
                  </td>
                </tr>
              ) : filteredIncidents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500 text-xs">
                    No incidents matching selected filters.
                  </td>
                </tr>
              ) : (
                filteredIncidents.map((incident) => (
                  <tr key={incident.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-4 text-sentinel-400 font-bold">{incident.id}</td>
                    <td className="py-3.5 px-4 text-slate-300">{incident.type}</td>
                    <td className="py-3.5 px-4 font-sans font-medium text-slate-200 max-w-xs truncate">
                      {incident.title}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] uppercase px-2 py-0.5 rounded border font-bold ${
                          incident.severity === 'critical'
                            ? 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                            : incident.severity === 'high'
                            ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                            : 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30'
                        }`}
                      >
                        {incident.severity}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">{incident.sourceIp}</td>
                    <td className="py-3.5 px-4 text-slate-300">{incident.target}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] uppercase px-2 py-0.5 rounded border ${
                          incident.status === 'blocked'
                            ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                            : incident.status === 'mitigated'
                            ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30'
                            : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                        }`}
                      >
                        {incident.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {incident.status === 'investigating' || incident.status === 'active' ? (
                        <button
                          onClick={() => handleMitigate(incident.id)}
                          className="px-2.5 py-1 text-[11px] bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/40 rounded transition-colors"
                        >
                          Isolate Vector
                        </button>
                      ) : (
                        <span className="text-emerald-400 text-[11px]">Mitigated</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
