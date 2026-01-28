import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import Alerts from './components/Alerts';
import Settings from './components/Settings';
import Calculator from './components/Calculator';
import DevOpsConsole from './components/DevOpsConsole';
import { ViewState } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);

  const renderContent = () => {
    switch (currentView) {
      case ViewState.DASHBOARD:
        return <Dashboard />;
      case ViewState.ANALYTICS:
        return <Analytics />;
      case ViewState.ALERTS:
        return <Alerts />;
      case ViewState.SETTINGS:
        return <Settings />;
      case ViewState.CALCULATOR:
        return <Calculator />;
      case ViewState.DEVOPS:
        return <DevOpsConsole />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans text-gray-900">
      <Sidebar currentView={currentView} onNavigate={setCurrentView} />
      
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
            {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;