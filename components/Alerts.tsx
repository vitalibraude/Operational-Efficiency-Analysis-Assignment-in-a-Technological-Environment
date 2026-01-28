import React from 'react';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';
import { alerts } from '../services/mockData';

const Alerts: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Active Alerts</h2>
        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold">3 Active</span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {alerts.map((alert) => (
            <div key={alert.id} className="p-6 border-b border-gray-50 flex gap-4 hover:bg-gray-50 transition-colors">
                <div className={`mt-1 p-2 rounded-full ${
                    alert.severity === 'Critical' ? 'bg-red-100 text-red-600' :
                    alert.severity === 'Warning' ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'
                }`}>
                    {alert.severity === 'Critical' ? <AlertCircle size={20} /> : 
                     alert.severity === 'Warning' ? <AlertCircle size={20} /> : <Info size={20} />}
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-gray-800">{alert.message}</h3>
                        <span className="text-xs text-gray-400">{alert.timestamp}</span>
                    </div>
                    <div className="flex gap-2 mt-2">
                        {alert.tags.map(tag => (
                            <span key={tag} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded border border-gray-200">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Alerts;