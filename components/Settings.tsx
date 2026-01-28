import React, { useState } from 'react';
import { Save, AlertTriangle } from 'lucide-react';

const Settings: React.FC = () => {
  const [savingsTarget, setSavingsTarget] = useState(25);
  const [riskLevel, setRiskLevel] = useState('Low');

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Policy Configuration</h2>
        <button className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm transition-colors">
            <Save size={18} /> Save Changes
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-8">
        
        {/* Savings Target */}
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Savings Target (%)</label>
            <div className="flex items-center gap-4">
                <input 
                    type="range" 
                    min="5" 
                    max="50" 
                    value={savingsTarget} 
                    onChange={(e) => setSavingsTarget(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
                />
                <span className="font-bold text-brand-600 text-lg w-16 text-right">{savingsTarget}%</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">Targeting higher savings may require more aggressive rightsizing.</p>
        </div>

        {/* Risk Level */}
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Spot Instance Risk Tolerance</label>
            <div className="grid grid-cols-3 gap-4">
                {['Low', 'Medium', 'High'].map((level) => (
                    <div 
                        key={level}
                        onClick={() => setRiskLevel(level)}
                        className={`cursor-pointer border-2 rounded-lg p-4 text-center transition-all ${
                            riskLevel === level ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                        <h4 className="font-bold">{level}</h4>
                        <p className="text-xs text-gray-400 mt-1">
                            {level === 'Low' ? 'Dev/Test only' : level === 'Medium' ? 'Stateless Prod' : 'All workloads'}
                        </p>
                    </div>
                ))}
            </div>
        </div>

        {/* Maintenance Windows */}
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Maintenance Windows (UTC)</label>
            <div className="grid grid-cols-2 gap-4">
                <input type="time" className="border border-gray-300 rounded-md p-2" defaultValue="02:00" />
                <input type="time" className="border border-gray-300 rounded-md p-2" defaultValue="04:00" />
            </div>
        </div>

        {/* Protected Tags */}
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Protected Resource Tags</label>
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex flex-wrap gap-2">
                    <span className="bg-white border border-gray-300 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                        env:production <button className="text-gray-400 hover:text-red-500">×</button>
                    </span>
                    <span className="bg-white border border-gray-300 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                        role:master-db <button className="text-gray-400 hover:text-red-500">×</button>
                    </span>
                    <input 
                        type="text" 
                        placeholder="Add tag..." 
                        className="bg-transparent border-none focus:ring-0 text-sm min-w-[100px]"
                    />
                </div>
            </div>
            <div className="flex items-center gap-2 mt-2 text-yellow-600 text-xs">
                <AlertTriangle size={14} />
                <span>Resources with these tags will be excluded from all automated actions.</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;