import React from 'react';
import { LayoutDashboard, BarChart3, Bell, Settings, Terminal, Cloud } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  const menuItems = [
    { id: ViewState.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: ViewState.ANALYTICS, label: 'Analytics', icon: BarChart3 },
    { id: ViewState.ALERTS, label: 'Alerts', icon: Bell },
    { id: ViewState.CALCULATOR, label: 'Calculator', icon: Cloud },
    { id: ViewState.DEVOPS, label: 'DevOps Console', icon: Terminal },
    { id: ViewState.SETTINGS, label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white h-screen fixed left-0 top-0 flex flex-col shadow-xl z-50">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
          <Cloud className="text-white" size={20} />
        </div>
        <span className="font-bold text-lg tracking-tight">CloudOptima</span>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              currentView === item.id 
                ? 'bg-brand-600 text-white shadow-lg shadow-brand-900/50' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-800">
        <div className="bg-slate-800 p-4 rounded-xl">
           <p className="text-xs text-slate-400 mb-2">Cloud Spend (MoM)</p>
           <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 w-[85%]"></div>
           </div>
           <p className="text-xs text-right mt-1 text-green-400 font-mono">85% of budget</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;