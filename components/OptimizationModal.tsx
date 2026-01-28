import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Loader2, Server, ArrowRight } from 'lucide-react';

interface OptimizationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OptimizationModal: React.FC<OptimizationModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const steps = [
    { title: 'Initializing Orchestrator', desc: 'Connecting to AWS SSM & GCP Deployment Manager...' },
    { title: 'Provisioning Spot Instances', desc: 'Acquiring capacity in us-east-1 & eu-central-1...' },
    { title: 'Storage Lifecycle Transition', desc: 'Moving 45TB to Glacier Deep Archive...' },
    { title: 'Application Auto-Scaling', desc: 'Updating scaling policies for 12 ASGs...' },
    { title: 'Finalizing', desc: 'Updating state in PostgreSQL & sending report...' }
  ];

  useEffect(() => {
    if (isOpen) {
      setStep(0);
      setIsComplete(false);
      let currentStep = 0;
      
      const interval = setInterval(() => {
        if (currentStep < steps.length - 1) {
          currentStep++;
          setStep(currentStep);
        } else {
          setIsComplete(true);
          clearInterval(interval);
        }
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-brand-600 to-brand-800 text-white">
          <div>
            <h2 className="text-xl font-bold">Optimization Orchestrator</h2>
            <p className="text-brand-100 text-sm">Executing Rightsizing Batch #4092</p>
          </div>
          <button onClick={onClose} className="hover:bg-brand-700 p-2 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto">
           {/* Progress Bar */}
           <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-brand-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            ></div>
          </div>

          <div className="space-y-4">
            {steps.map((s, idx) => (
              <div key={idx} className={`flex items-start gap-4 p-3 rounded-lg transition-all ${
                idx === step ? 'bg-brand-50 border border-brand-100' : 'opacity-70'
              }`}>
                <div className="mt-1">
                  {idx < step || isComplete ? (
                    <CheckCircle className="text-green-500" size={20} />
                  ) : idx === step ? (
                    <Loader2 className="text-brand-600 animate-spin" size={20} />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                  )}
                </div>
                <div>
                  <h3 className={`font-semibold ${idx === step ? 'text-brand-900' : 'text-gray-700'}`}>
                    {s.title}
                  </h3>
                  <p className="text-sm text-gray-500">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
          {isComplete ? (
            <button 
              onClick={onClose}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium shadow-md transition-all flex items-center gap-2"
            >
              Close & View Report <ArrowRight size={16} />
            </button>
          ) : (
             <button disabled className="bg-gray-300 text-gray-500 px-6 py-2 rounded-lg font-medium cursor-not-allowed">
              Processing...
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OptimizationModal;