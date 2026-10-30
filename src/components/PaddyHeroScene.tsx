import React, { useState } from 'react';
import { ActiveView } from '../types';
import { NIGERIAN_STATES, NIGERIAN_DISCOS } from '../data/nigeriaData';
import { FileText, Zap, ExternalLink, Phone, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface PaddyHeroSceneProps {
  onNavigate?: (view: ActiveView) => void;
}

export const PaddyHeroScene: React.FC<PaddyHeroSceneProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'sample' | 'lookup'>('sample');
  const [selectedState, setSelectedState] = useState<string>('Lagos');

  const stateData = NIGERIAN_STATES.find((s) => s.name === selectedState);
  const primaryDisCoId = stateData?.primaryDisCos[0] || 'EKEDC';
  const discoInfo = NIGERIAN_DISCOS[primaryDisCoId];

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Container with sharp contrast against the gradient hero */}
      <div className="bg-white rounded-2xl shadow-2xl border border-white/20 overflow-hidden text-[#172B4D]">
        
        {/* Card Header & Interactive Tabs */}
        <div className="bg-slate-100/80 px-4 py-3 border-b border-gray-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0D9488]" />
            <span className="text-xs font-bold text-[#102A43]">Live Document Preview</span>
          </div>

          <div className="flex bg-gray-200/80 p-0.5 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setActiveTab('sample')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'sample'
                  ? 'bg-white text-[#102A43] shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-[#0D9488]" />
              <span>Sample Statement</span>
            </button>
            <button
              onClick={() => setActiveTab('lookup')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'lookup'
                  ? 'bg-white text-[#102A43] shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-[#2878C8]" />
              <span>DisCo Lookup</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Document Sample */}
        {activeTab === 'sample' && (
          <div className="p-5 sm:p-6 bg-white">
            {/* Document Paper Preview */}
            <div className="bg-[#F7F9FC] text-[#172B4D] rounded-xl p-4 sm:p-5 border border-slate-200 shadow-inner">
              
              {/* Document Header */}
              <div className="border-b border-gray-200 pb-3 text-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#0D9488] bg-[#E8F7EF] px-2.5 py-0.5 rounded-md border border-[#0D9488]/30 inline-block mb-1">
                  Verified Virtual Paddy · Client Document
                </span>
                <h4 className="text-xs sm:text-sm font-extrabold text-[#102A43] tracking-tight">
                  CUSTOMER-PREPARED ADDRESS STATEMENT
                </h4>
                <p className="text-[10px] text-slate-500 mt-0.5 font-medium">
                  Standard Format A4 · Synthesized Locally in Device RAM
                </p>
              </div>

              {/* Sample Data Fields */}
              <div className="mt-3.5 space-y-2 text-xs">
                <div className="flex justify-between items-baseline border-b border-gray-200/60 pb-1.5">
                  <span className="text-slate-500 font-medium text-[11px]">Applicant Name:</span>
                  <span className="font-bold text-[#102A43]">Adewale B. Adeleke</span>
                </div>
                <div className="flex justify-between items-baseline border-b border-gray-200/60 pb-1.5">
                  <span className="text-slate-500 font-medium text-[11px]">Phone Number:</span>
                  <span className="font-mono font-semibold text-slate-800">+234 803 123 4567</span>
                </div>
                <div className="flex justify-between items-baseline border-b border-gray-200/60 pb-1.5">
                  <span className="text-slate-500 font-medium text-[11px]">Residential Address:</span>
                  <span className="font-semibold text-[#102A43] text-right max-w-[210px] truncate">
                    14 Ogunlana Dr, Surulere, Lagos
                  </span>
                </div>
                <div className="flex justify-between items-baseline border-b border-gray-200/60 pb-1.5">
                  <span className="text-slate-500 font-medium text-[11px]">State / LGA:</span>
                  <span className="text-slate-800 font-medium">Lagos State · Surulere LGA</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-slate-500 font-medium text-[11px]">Utility Area:</span>
                  <span className="text-slate-800 font-medium">Eko Electricity (EKEDC)</span>
                </div>
              </div>

              {/* Visible Statutory Disclaimer Badge */}
              <div className="mt-3.5 p-2 rounded-lg bg-amber-50 border border-amber-200 text-[10px] text-amber-900 flex items-start gap-1.5 leading-snug">
                <span className="text-amber-600 font-bold shrink-0">⚠️</span>
                <span>
                  <strong>Disclaimer:</strong> Self-declared personal address statement under applicant affirmance. Not an official electricity bill.
                </span>
              </div>
            </div>

            {/* Quick Action below preview */}
            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Takes less than 2 minutes to generate</span>
              {onNavigate && (
                <button
                  onClick={() => onNavigate('address-statement')}
                  className="font-bold text-[#0D9488] hover:text-[#0A736A] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Create yours free</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Quick DisCo Lookup */}
        {activeTab === 'lookup' && (
          <div className="p-5 sm:p-6 bg-white">
            <div>
              <label className="block text-xs font-bold text-[#102A43] mb-1.5">
                Select Your Nigerian State or FCT:
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-xl text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488] cursor-pointer"
              >
                {NIGERIAN_STATES.map((state) => (
                  <option key={state.name} value={state.name}>
                    {state.name} {state.name === 'Federal Capital Territory' ? '(Abuja)' : 'State'}
                  </option>
                ))}
              </select>
            </div>

            {discoInfo ? (
              <div className="mt-4 p-4 rounded-xl bg-[#EFF6FF] border border-[#2878C8]/25 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#2878C8] uppercase tracking-wider">
                      Official DisCo Provider
                    </span>
                    <h5 className="text-sm font-extrabold text-[#102A43] mt-0.5">
                      {discoInfo.name}
                    </h5>
                  </div>
                  <span className="text-xs font-bold text-[#2878C8] bg-white px-2.5 py-1 rounded-md border border-[#2878C8]/30 shadow-xs">
                    {discoInfo.id}
                  </span>
                </div>

                <div className="text-xs text-slate-700 leading-relaxed font-normal">
                  {discoInfo.notes}
                </div>

                <div className="pt-2 border-t border-[#2878C8]/20 flex flex-wrap items-center gap-3 text-xs">
                  <a
                    href={discoInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#2878C8] hover:text-[#1E62A8] font-bold"
                  >
                    <span>Official Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <span className="text-slate-300">·</span>
                  <span className="text-slate-700 flex items-center gap-1 font-medium">
                    <Phone className="w-3 h-3 text-[#2878C8]" />
                    <span>{discoInfo.customerCarePhone.split('/')[0].trim()}</span>
                  </span>
                </div>
              </div>
            ) : null}

            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">All 12 licensed DisCos indexed</span>
              {onNavigate && (
                <button
                  onClick={() => onNavigate('genuine-bill')}
                  className="font-bold text-[#2878C8] hover:text-[#1E62A8] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Open Full Provider Directory</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Footer Guarantee Bar */}
        <div className="bg-slate-50 px-4 py-3 border-t border-gray-200 flex items-center justify-between text-[11px] text-slate-600">
          <div className="flex items-center gap-1.5 text-[#0D9488] font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0D9488]" />
            <span>Private · 0 Bytes Sent to Server</span>
          </div>
          <div className="flex items-center gap-1 text-slate-700 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9488]" />
            <span>100% Free Forever</span>
          </div>
        </div>

      </div>
    </div>
  );
};
