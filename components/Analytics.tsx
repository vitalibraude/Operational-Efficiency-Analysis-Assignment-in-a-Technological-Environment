import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { geoMetrics, cpuMetrics, capacityMetrics } from '../services/mockData';

const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Real-time Analytics</h2>
        <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-xs text-gray-500">Live via Redis</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Heatmap Approximation */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Regional Utilization Heatmap</h3>
          <div className="grid grid-cols-2 gap-4 h-[300px]">
             {geoMetrics.map((geo, idx) => (
                <div key={idx} className="relative rounded-lg overflow-hidden group cursor-pointer border border-gray-100">
                    <div 
                        className="absolute inset-0 transition-opacity duration-500"
                        style={{ 
                            backgroundColor: `rgba(14, 165, 233, ${geo.utilization / 100})`, // Brand color opacity based on value
                        }}
                    ></div>
                    <div className="absolute inset-0 flex flex-col justify-center items-center z-10 p-4">
                        <span className="text-gray-800 font-bold drop-shadow-sm">{geo.region}</span>
                        <span className="text-sm font-mono bg-white/50 px-2 rounded backdrop-blur-sm">{geo.utilization}%</span>
                    </div>
                </div>
             ))}
          </div>
        </div>

        {/* CPU Histogram */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">CPU Utilization Histogram</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cpuMetrics}>
                <XAxis dataKey="range" tick={{fontSize: 12}} />
                <YAxis hide />
                <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {cpuMetrics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index > 3 ? '#ef4444' : '#3b82f6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Free vs Reserved */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Free vs Reserved Capacity</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={capacityMetrics} layout="vertical" barGap={0} barSize={20}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={80} tick={{fontSize: 14, fontWeight: 500}} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{fill: '#f9fafb'}} />
                    <Bar dataKey="reserved" stackId="a" fill="#0ea5e9" radius={[0, 0, 0, 0]} name="Reserved" />
                    <Bar dataKey="free" stackId="a" fill="#e2e8f0" radius={[0, 4, 4, 0]} name="Free" />
                </BarChart>
            </ResponsiveContainer>
          </div>
      </div>
    </div>
  );
};

export default Analytics;