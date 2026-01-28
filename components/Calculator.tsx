import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Play } from 'lucide-react';

const Calculator: React.FC = () => {
  const [utilization, setUtilization] = useState(80);
  const [data, setData] = useState<any[]>([]);

  const runSimulation = () => {
    // Mock simulation
    const newData = [];
    let current = 100;
    let optimal = 100;
    for(let i=0; i<12; i++) {
        newData.push({
            month: `M${i+1}`,
            current: current,
            optimal: optimal
        });
        current += 5 + Math.random() * 5;
        optimal += 2 + Math.random() * 2;
    }
    setData(newData);
  };

  return (
    <div className="space-y-6">
       <h2 className="text-2xl font-bold text-gray-800">Savings Calculator</h2>
       
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
             <h3 className="font-semibold text-gray-700">Parameters</h3>
             <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Target Utilization</label>
                <input 
                    type="range" min="50" max="95" 
                    value={utilization} 
                    onChange={(e) => setUtilization(parseInt(e.target.value))}
                    className="w-full mt-2 accent-brand-600"
                />
                <div className="text-right font-mono text-brand-600">{utilization}%</div>
             </div>
             <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Regions</label>
                <select className="w-full border border-gray-300 rounded p-2 mt-1 text-sm">
                    <option>All Regions</option>
                    <option>US & EU Only</option>
                </select>
             </div>
             <button 
                onClick={runSimulation}
                className="w-full bg-brand-600 text-white py-2 rounded-lg font-medium hover:bg-brand-700 transition flex items-center justify-center gap-2"
             >
                <Play size={16} /> Simulate
             </button>
          </div>

          <div className="col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[400px]">
             {data.length > 0 ? (
                <>
                    <h3 className="font-semibold text-gray-700 mb-4">Cost Projection (12 Months)</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Area type="monotone" dataKey="current" stroke="#ef4444" fill="#ef4444" fillOpacity={0.1} name="Current Trajectory" />
                                <Area type="monotone" dataKey="optimal" stroke="#22c55e" fill="#22c55e" fillOpacity={0.1} name="Optimized" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-100 flex justify-between items-center">
                        <span className="text-green-800 font-medium">Estimated Annual ROI</span>
                        <span className="text-2xl font-bold text-green-700">+340%</span>
                    </div>
                </>
             ) : (
                 <div className="h-full flex items-center justify-center text-gray-400">
                     Run simulation to view projections
                 </div>
             )}
          </div>
       </div>
    </div>
  );
};

export default Calculator;