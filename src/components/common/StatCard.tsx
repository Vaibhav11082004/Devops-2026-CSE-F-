import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  color?: 'cyan' | 'emerald' | 'rose' | 'amber' | 'indigo';
  description?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  isPositive,
  icon: Icon,
  color = 'cyan',
  description,
}) => {
  const colorMap = {
    cyan: {
      bg: 'bg-cyan-500/10',
      text: 'text-cyan-400',
      border: 'hover:border-cyan-500/40',
      glow: 'group-hover:shadow-glow-cyan',
    },
    emerald: {
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-400',
      border: 'hover:border-emerald-500/40',
      glow: 'group-hover:shadow-glow-emerald',
    },
    rose: {
      bg: 'bg-rose-500/10',
      text: 'text-rose-400',
      border: 'hover:border-rose-500/40',
      glow: 'group-hover:shadow-glow-rose',
    },
    amber: {
      bg: 'bg-amber-500/10',
      text: 'text-amber-400',
      border: 'hover:border-amber-500/40',
      glow: '',
    },
    indigo: {
      bg: 'bg-indigo-500/10',
      text: 'text-indigo-400',
      border: 'hover:border-indigo-500/40',
      glow: '',
    },
  };

  const scheme = colorMap[color];

  return (
    <div
      className={`group relative bg-dark-900/80 backdrop-blur-sm border border-slate-800 rounded-xl p-5 transition-all duration-300 ${scheme.border} ${scheme.glow}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono uppercase tracking-wider text-slate-400">{title}</span>
        <div className={`p-2.5 rounded-lg ${scheme.bg} ${scheme.text}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-2xl lg:text-3xl font-bold font-mono tracking-tight text-white">{value}</span>
        {change && (
          <span
            className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
              isPositive ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'
            }`}
          >
            {isPositive ? '↑' : '↓'} {change}
          </span>
        )}
      </div>

      {description && (
        <p className="mt-2 text-xs text-slate-400 leading-relaxed truncate">{description}</p>
      )}

      {/* Subtle indicator bottom bar */}
      <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-slate-700 group-hover:via-cyan-500/50 to-transparent transition-all duration-300 opacity-0 group-hover:opacity-100" />
    </div>
  );
};
