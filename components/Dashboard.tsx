
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// Added HelpCircle to the imports
import { Server, Trash2, PiggyBank, Cloud, Key, Shield, X, ArrowRight, Check, Copy, ExternalLink, HelpCircle } from 'lucide-react';
import { generateCostData, generateResources, recommendations } from '../services/mockData';
import OptimizationModal from './OptimizationModal';

type ConnectionStep = 'selection' | 'form-api' | 'form-role' | 'success';

const Dashboard: React.FC = () => {
  const [isOrchestratorOpen, setIsOrchestratorOpen] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [activeStep, setActiveStep] = useState<ConnectionStep>('selection');
  
  const costData = generateCostData();
  const resources = generateResources(15); 
  const targetSavings = 38000;
  const currentCost = 41200;
  const isOverBudget = currentCost > targetSavings;

  const formatCurrency = (val: number) => `$${val.toLocaleString()}`;

  const resetModal = () => {
    setShowConnectModal(false);
    setActiveStep('selection');
  };

  return (
    <div className="space-y-8 pb-20 relative">
      
      {/* Connection Button Section - English Only */}
      <div className="max-w-xl">
        <button 
          onClick={() => setShowConnectModal(true)}
          className="w-full bg-white border border-brand-200 text-gray-800 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-brand-500 transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-4">
            <div className="bg-brand-50 p-3 rounded-xl text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors">
              <Cloud size={28} />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-lg">Connect AWS Infrastructure</h3>
              <p className="text-gray-500 text-sm">Sync costs and enable automated rightsizing</p>
            </div>
          </div>
          <ArrowRight className="text-gray-300 group-hover:text-brand-600 group-hover:translate-x-1 transition-all" />
        </button>
      </div>

      {/* Header Stat */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-gray-500 font-medium text-sm uppercase tracking-wider">Current Monthly Cost</h2>
              <div className="flex items-baseline gap-3 mt-1">
                <span className={`text-4xl font-bold ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
                  {formatCurrency(currentCost)}
                </span>
                <span className="text-sm text-gray-400">vs target {formatCurrency(targetSavings)}</span>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-bold ${isOverBudget ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {isOverBudget ? '+8.4%' : '-2.1%'}
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={costData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} tickFormatter={(value) => `${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [`$${value}`, 'Cost']}
                />
                <Area type="monotone" dataKey="actual" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorActual)" />
                <Area type="monotone" dataKey="forecast" stroke="#3b82f6" strokeDasharray="5 5" strokeWidth={3} fillOpacity={1} fill="url(#colorForecast)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <InfoCard title="Active Resources" value="1,248" icon={<Server className="text-blue-600" size={24} />} color="bg-blue-50" />
          <InfoCard title="Orphaned Resources" value="142" subtext="Wasting ~$3.2k/mo" icon={<Trash2 className="text-orange-600" size={24} />} color="bg-orange-50" />
          <InfoCard title="Potential Savings" value="$8,450" subtext="Available via Rightsizing" icon={<PiggyBank className="text-green-600" size={24} />} color="bg-green-50" highlight />
        </div>
      </div>

      {/* Main Grid Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
             <h3 className="font-bold text-gray-800">Top Recommendations</h3>
             <button className="text-brand-600 text-sm hover:underline">View All</button>
          </div>
          <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
            {recommendations.map((rec) => (
              <div key={rec.id} className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors flex justify-between items-center group">
                 <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                        rec.type === 'Spot' ? 'bg-purple-100 text-purple-700' : 
                        rec.type === 'Rightsizing' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>{rec.type}</span>
                      <span className="text-xs text-gray-400 font-mono">{rec.resourceId}</span>
                    </div>
                    <p className="text-sm font-medium text-gray-700">{rec.description}</p>
                 </div>
                 <div className="text-right">
                    <div className="font-bold text-green-600">+${rec.potentialSavings}</div>
                    <div className="text-xs text-gray-400">{rec.confidence}% confidence</div>
                 </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
             <h3 className="font-bold text-gray-800">Recently Scanned Resources</h3>
             <span className="text-xs text-gray-400">Last scan: 2 mins ago</span>
          </div>
           <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="p-3 text-xs font-semibold text-gray-500">Name</th>
                  <th className="p-3 text-xs font-semibold text-gray-500">Provider</th>
                  <th className="p-3 text-xs font-semibold text-gray-500">Status</th>
                  <th className="p-3 text-xs font-semibold text-gray-500 text-right">Cost</th>
                </tr>
              </thead>
              <tbody>
                {resources.map((res) => (
                  <tr key={res.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="p-3 text-sm font-medium text-gray-700">{res.name}</td>
                    <td className="p-3 text-sm text-gray-500">{res.provider}</td>
                    <td className="p-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        res.status === 'Active' ? 'bg-green-100 text-green-700' :
                        res.status === 'Orphaned' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {res.status}
                      </span>
                    </td>
                    <td className="p-3 text-sm text-gray-700 text-right">${res.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <button 
        onClick={() => setIsOrchestratorOpen(true)}
        className="fixed bottom-8 right-8 bg-brand-600 text-white w-16 h-16 rounded-full shadow-lg hover:shadow-brand-500/50 hover:scale-105 transition-all flex items-center justify-center z-40 group"
      >
        <Server size={28} />
      </button>

      <OptimizationModal isOpen={isOrchestratorOpen} onClose={() => setIsOrchestratorOpen(false)} />
      
      {/* Interactive Connection Modal */}
      {showConnectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center text-white">
                  <Cloud size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Connect AWS Account</h2>
                  <p className="text-xs text-gray-500">Infrastructure Onboarding</p>
                </div>
              </div>
              <button onClick={resetModal} className="p-2 hover:bg-gray-200 rounded-full transition">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto">
              {activeStep === 'selection' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <p className="text-gray-600 leading-relaxed">
                    Select your preferred connection method. We recommend <strong>IAM Role Assumption</strong> for enterprise environments as it follows security best practices.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <button 
                      onClick={() => setActiveStep('form-api')}
                      className="border-2 border-gray-100 rounded-xl p-6 text-left hover:border-brand-500 hover:bg-brand-50/30 transition-all group"
                    >
                      <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center text-brand-600 mb-4 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                        <Key size={24} />
                      </div>
                      <h3 className="font-bold text-lg mb-2 text-gray-800">API Key Pair</h3>
                      <p className="text-sm text-gray-500 mb-4">Provide Access Key and Secret Key for direct programmatic access.</p>
                      <span className="text-brand-600 text-sm font-semibold flex items-center gap-1">
                        Use this method <ArrowRight size={14} />
                      </span>
                    </button>

                    <button 
                      onClick={() => setActiveStep('form-role')}
                      className="border-2 border-gray-100 rounded-xl p-6 text-left hover:border-purple-500 hover:bg-purple-50/30 transition-all group"
                    >
                      <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center text-purple-600 mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                        <Shield size={24} />
                      </div>
                      <h3 className="font-bold text-lg mb-2 text-gray-800">IAM Role ARN</h3>
                      <p className="text-sm text-gray-500 mb-4">Grant our platform cross-account access using a secure Role ARN.</p>
                      <span className="text-purple-600 text-sm font-semibold flex items-center gap-1">
                        Use this method <ArrowRight size={14} />
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {activeStep === 'form-api' && (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex gap-3">
                    <HelpCircle className="text-brand-600 shrink-0" size={20} />
                    <div className="text-sm text-blue-800">
                      <strong>Where to get these?</strong> In AWS Console, navigate to <strong>IAM > Users > Security Credentials</strong> and create a new Access Key.
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">AWS Access Key ID</label>
                      <input 
                        type="text" 
                        placeholder="AKIA..." 
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">AWS Secret Access Key</label>
                      <input 
                        type="password" 
                        placeholder="Enter secret..." 
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button onClick={() => setActiveStep('selection')} className="flex-1 border border-gray-300 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-50 transition">Back</button>
                    <button onClick={() => setActiveStep('success')} className="flex-[2] bg-brand-600 text-white py-3 rounded-xl font-bold shadow-lg hover:bg-brand-700 transition">Save & Test Connection</button>
                  </div>
                </div>
              )}

              {activeStep === 'form-role' && (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                   <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 space-y-3">
                    <h4 className="font-bold text-purple-900 text-sm flex items-center gap-2">
                      <Shield size={16} /> Trust Policy Configuration
                    </h4>
                    <p className="text-xs text-purple-800">To allow cross-account access, update your Role's Trust Relationship with our Account ID:</p>
                    <div className="bg-white border border-purple-200 p-2 rounded flex justify-between items-center font-mono text-xs">
                       <span>1234-5678-9012</span>
                       <button className="text-purple-600 hover:text-purple-800"><Copy size={14}/></button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">IAM Role ARN</label>
                    <input 
                      type="text" 
                      placeholder="arn:aws:iam::123456789012:role/CloudOptimaSync" 
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none font-mono"
                    />
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h5 className="text-sm font-bold text-gray-700 mb-2">Next Steps after saving:</h5>
                    <ul className="text-xs text-gray-500 space-y-2 list-decimal ml-4">
                      <li>Our system will attempt to <code>AssumeRole</code>.</li>
                      <li>We verify <code>CostExplorer:GetCostAndUsage</code> permissions.</li>
                      <li>Initial metadata scan will begin (estimated 2-5 mins).</li>
                    </ul>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setActiveStep('selection')} className="flex-1 border border-gray-300 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-50 transition">Back</button>
                    <button onClick={() => setActiveStep('success')} className="flex-[2] bg-brand-600 text-white py-3 rounded-xl font-bold shadow-lg hover:bg-brand-700 transition">Authorize Account</button>
                  </div>
                </div>
              )}

              {activeStep === 'success' && (
                <div className="text-center py-12 space-y-6 animate-in zoom-in-95 duration-500">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto">
                    <Check size={40} strokeWidth={3} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Connection Successful!</h3>
                    <p className="text-gray-500 max-w-sm mx-auto mt-2">Account <code>prod-aws-main</code> is now syncing. You'll see cost data updates in the dashboard within 15 minutes.</p>
                  </div>
                  <button 
                    onClick={resetModal}
                    className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition-colors"
                  >
                    Go to Dashboard
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const InfoCard = ({ title, value, subtext, icon, color, highlight }: any) => (
  <div className={`p-6 rounded-2xl shadow-sm border ${highlight ? 'border-green-200 bg-green-50/30' : 'border-gray-100 bg-white'} cursor-pointer hover:shadow-md transition-shadow`}>
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-xl ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-500 text-xs font-medium uppercase tracking-tight">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
        {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
      </div>
    </div>
  </div>
);

export default Dashboard;
