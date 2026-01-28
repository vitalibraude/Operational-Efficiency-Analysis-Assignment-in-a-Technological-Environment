import React, { useState } from 'react';
import { Terminal, Activity, Zap, ShieldAlert, Cpu } from 'lucide-react';

const DevOpsConsole: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([
    '> Initializing connection to Consul...',
    '> Connected. Watching key /config/thresholds',
    '> Kafka consumer group "analyzer-workers" rebalancing...',
    '> Worker-01 assigned partitions [0, 1, 2]',
  ]);

  const runCommand = (cmd: string) => {
    setLogs(prev => [...prev, `> ${cmd}`, 'Running chaos experiment... SUCCESS', 'Staging DB-02 terminated.']);
  };

  return (
    <div className="bg-slate-900 text-green-400 p-6 rounded-xl min-h-[80vh] font-mono shadow-2xl border border-slate-700">
      <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Terminal className="text-brand-500" /> DevOps Console (Admin)
        </h2>
        <div className="flex gap-4">
            <StatusIndicator label="Kafka" status="healthy" />
            <StatusIndicator label="K8s Cluster" status="healthy" />
            <StatusIndicator label="Watchdog" status="warning" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-slate-800 p-4 rounded border border-slate-700">
            <h3 className="text-white font-bold mb-2 flex items-center gap-2"><Zap size={16}/> Chaos Engineering</h3>
            <p className="text-sm text-slate-400 mb-3">Test resilience by terminating random instances.</p>
            <button 
                onClick={() => runCommand('chaos run --target=staging --intensity=low')}
                className="bg-red-900/50 hover:bg-red-900 text-red-200 border border-red-800 px-3 py-1 text-sm rounded transition"
            >
                Simulate Outage
            </button>
        </div>
         <div className="bg-slate-800 p-4 rounded border border-slate-700">
            <h3 className="text-white font-bold mb-2 flex items-center gap-2"><Activity size={16}/> Service Map</h3>
            <div className="text-center py-4 text-slate-500 text-sm italic">
                [Dependency Graph Rendering...]
            </div>
        </div>
         <div className="bg-slate-800 p-4 rounded border border-slate-700">
            <h3 className="text-white font-bold mb-2 flex items-center gap-2"><Cpu size={16}/> HPA Status</h3>
             <p className="text-sm text-slate-400">Current Replicas: 12</p>
             <p className="text-sm text-slate-400">Queue Depth: 402 msg</p>
        </div>
      </div>

      <div className="bg-black/50 p-4 rounded-lg h-[400px] overflow-y-auto border border-slate-800">
        {logs.map((log, i) => (
            <div key={i} className="mb-1">{log}</div>
        ))}
        <div className="flex items-center gap-2 mt-2">
            <span className="text-brand-500">admin@cloudoptima:~$</span>
            <input type="text" className="bg-transparent border-none focus:ring-0 text-white w-full" autoFocus />
        </div>
      </div>
    </div>
  );
};

const StatusIndicator = ({ label, status }: { label: string, status: 'healthy' | 'warning' | 'error' }) => {
    const color = status === 'healthy' ? 'bg-green-500' : status === 'warning' ? 'bg-yellow-500' : 'bg-red-500';
    return (
        <div className="flex items-center gap-2 text-sm text-slate-300">
            <div className={`w-2 h-2 rounded-full ${color}`}></div> {label}
        </div>
    );
}

export default DevOpsConsole;