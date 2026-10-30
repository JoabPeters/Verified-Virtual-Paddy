import React, { useState } from 'react';
import { NIGERIAN_STATES, NIGERIAN_DISCOS } from '../data/nigeriaData';
import { DisCoInfo, StateInfo } from '../types';
import { useToast } from './ToastNotification';
import { 
  generateElectricityBillInquiryPdf, 
  downloadPdfBlob, 
  GeneratedPdfResult 
} from '../utils/pdfGenerator';
import { DocumentPreviewModal, PreviewPresentationMode } from './DocumentPreviewModal';
import { 
  ExternalLink, Phone, MessageSquare, AlertTriangle, ShieldCheck, 
  Copy, Check, Globe, HelpCircle, Eye, Download, Columns, FileText,
  ArrowLeft, ChevronRight, Zap, Building2, Mail, Hash
} from 'lucide-react';

interface ServiceAProps {
  onBackHome?: () => void;
}

export const ServiceA_GenuineBill: React.FC<ServiceAProps> = ({ onBackHome }) => {
  const { toast } = useToast();
  const [selectedStateCode, setSelectedStateCode] = useState<string>('LA');
  const [selectedDisCoId, setSelectedDisCoId] = useState<string>('IKEDC');
  const [meterOrAccountInput, setMeterOrAccountInput] = useState<string>('');
  const [copiedMeter, setCopiedMeter] = useState(false);

  // Read-only modal or side-panel preview state
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState<PreviewPresentationMode>('modal');
  const [billPdfResult, setBillPdfResult] = useState<GeneratedPdfResult | null>(null);

  const currentState: StateInfo | undefined = NIGERIAN_STATES.find(s => s.code === selectedStateCode) || NIGERIAN_STATES[0];
  
  // Available DisCos in selected state
  const availableDisCos: DisCoInfo[] = (currentState?.primaryDisCos || [])
    .map(id => NIGERIAN_DISCOS[id])
    .filter(Boolean);

  const currentDisCo: DisCoInfo = NIGERIAN_DISCOS[selectedDisCoId] || availableDisCos[0] || NIGERIAN_DISCOS.IKEDC;

  const handleStateChange = (code: string) => {
    setSelectedStateCode(code);
    const state = NIGERIAN_STATES.find(s => s.code === code);
    if (state && state.primaryDisCos.length > 0) {
      setSelectedDisCoId(state.primaryDisCos[0]);
    }
  };

  const handleCopyMeter = () => {
    if (!meterOrAccountInput) return;
    navigator.clipboard.writeText(meterOrAccountInput);
    setCopiedMeter(true);
    toast.info('Copied to Clipboard', `Meter / Account number "${meterOrAccountInput}" copied.`);
    setTimeout(() => setCopiedMeter(false), 2500);
  };

  const handleOpenPreview = (mode: PreviewPresentationMode = 'modal') => {
    if (!currentState || !currentDisCo) return;
    const pdf = generateElectricityBillInquiryPdf({
      disco: currentDisCo,
      state: currentState,
      meterOrAccountNumber: meterOrAccountInput,
    });
    setBillPdfResult(pdf);
    setPreviewMode(mode);
    setIsPreviewOpen(true);
    toast.info('Preview Ready', `Review official inquiry details for ${currentDisCo.shortName} before downloading.`);
  };

  const handleDownloadBill = () => {
    let pdf = billPdfResult;
    if (!pdf && currentState && currentDisCo) {
      pdf = generateElectricityBillInquiryPdf({
        disco: currentDisCo,
        state: currentState,
        meterOrAccountNumber: meterOrAccountInput,
      });
      setBillPdfResult(pdf);
    }
    if (pdf) {
      downloadPdfBlob(pdf.blob, pdf.fileName);
      toast.success(
        'Download Started',
        `${pdf.fileName} has been saved to your device.`
      );
    }
  };

  return (
    <div className="bg-[#F7F9FC] text-[#172B4D] min-h-[85vh] py-8 sm:py-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation: Back to Home & Breadcrumbs */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          {onBackHome && (
            <button
              onClick={onBackHome}
              className="inline-flex items-center gap-1.5 font-bold text-[#2878C8] hover:text-[#1E62A8] hover:underline transition-colors cursor-pointer py-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
          )}

          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <button 
              onClick={onBackHome} 
              className="hover:text-[#102A43] cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-700 font-semibold">Services</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#2878C8] font-bold">Electricity Bill Assistance</span>
          </nav>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="text-xs font-bold text-[#2878C8] bg-[#EFF6FF] px-4 py-1.5 rounded-full inline-flex items-center gap-2 border border-[#2878C8]/25 mb-3.5 shadow-2xs">
            <Zap className="w-3.5 h-3.5 text-[#2878C8]" />
            <span>Official Distribution Company Directory</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#102A43] leading-tight">
            Genuine Electricity Bill Assistance
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            Access genuine, officially issued utility documents directly from Nigeria's 
            12 licensed Electricity Distribution Companies (DisCos).
          </p>
        </div>

        {/* Selector & Assistance Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-10 shadow-sm">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Step 1: Select State */}
            <div>
              <label htmlFor="state-select" className="block text-sm font-bold text-[#102A43] mb-2 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#2878C8] text-white flex items-center justify-center text-xs font-bold">1</span>
                <span>Select Your State or FCT</span>
              </label>
              <select
                id="state-select"
                value={selectedStateCode}
                onChange={(e) => handleStateChange(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#2878C8] cursor-pointer"
              >
                {NIGERIAN_STATES.map((state) => (
                  <option key={state.code} value={state.code}>
                    {state.name} ({state.capital})
                  </option>
                ))}
              </select>
              {currentState && (
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  {currentState.coverageNotes}
                </p>
              )}
            </div>

            {/* Step 2: Select Provider */}
            <div>
              <label htmlFor="disco-select" className="block text-sm font-bold text-[#102A43] mb-2 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#2878C8] text-white flex items-center justify-center text-xs font-bold">2</span>
                <span>Select Electricity Provider (DisCo)</span>
              </label>
              <select
                id="disco-select"
                value={selectedDisCoId}
                onChange={(e) => setSelectedDisCoId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#2878C8] cursor-pointer"
              >
                {availableDisCos.map((disco) => (
                  <option key={disco.id} value={disco.id}>
                    {disco.name} ({disco.shortName})
                  </option>
                ))}
                <optgroup label="Other Nigerian DisCos">
                  {Object.values(NIGERIAN_DISCOS)
                    .filter(d => !availableDisCos.some(ad => ad.id === d.id))
                    .map(disco => (
                      <option key={disco.id} value={disco.id}>
                        {disco.name} ({disco.shortName})
                      </option>
                    ))}
                </optgroup>
              </select>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Operating DisCo covering this state / concession area.
              </p>
            </div>

          </div>

          {/* Meter Reference Input (Optional, for easy copy to official portal) */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <label htmlFor="meter-input" className="block text-xs font-bold text-[#102A43] mb-1.5">
              Have your Meter or Account Number handy? (Optional)
            </label>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <input
                id="meter-input"
                type="text"
                value={meterOrAccountInput}
                onChange={(e) => setMeterOrAccountInput(e.target.value)}
                placeholder="Enter Meter / Account Number for quick copy to official portal..."
                className="flex-1 px-4 py-3 rounded-xl border border-gray-300 bg-white text-slate-900 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#2878C8]"
              />
              {meterOrAccountInput && (
                <button
                  type="button"
                  onClick={handleCopyMeter}
                  className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#102A43] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  {copiedMeter ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Number</span>
                    </>
                  )}
                </button>
              )}
            </div>
            <p className="mt-1.5 text-[11px] text-slate-500">
              Your meter number stays 100% in local memory and is never transmitted to any cloud database.
            </p>
          </div>

          {/* Pre-Download Verification Dossier Action Card (Blue Accent) */}
          {currentDisCo && currentState && (
            <div className="mt-8 p-5 sm:p-7 rounded-2xl bg-[#EFF6FF] border-2 border-[#2878C8]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-2xs">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#2878C8] bg-white px-3 py-1 rounded-full border border-[#2878C8]/20">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2878C8]" />
                  <span>Official Inquiry Dossier</span>
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-[#102A43]">
                  Verify Inquiry Slip for {currentDisCo.shortName}
                </h3>
                <p className="text-xs text-slate-700 max-w-xl leading-relaxed">
                  Generate an official A4 inquiry dossier containing official portal links, customer care desks, regulatory guidelines, and your entered reference info before leaving this site.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto shrink-0">
                <button
                  type="button"
                  onClick={() => handleOpenPreview('modal')}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-[#2878C8] border border-[#2878C8]/30 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview Dossier</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadBill}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#2878C8] hover:bg-[#1E62A8] text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Dossier (PDF)</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Provider Official Verification Channels Display */}
        {currentDisCo && (
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 sm:p-10 shadow-sm">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
              <div>
                <span className="text-xs font-bold text-[#2878C8] uppercase tracking-wider">
                  Verified Official Channels
                </span>
                <h2 className="text-2xl font-extrabold text-[#102A43] mt-1">
                  {currentDisCo.name} ({currentDisCo.shortName})
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Operating in: {currentDisCo.coverageStates.join(', ')}
                </p>
              </div>

              <a
                href={currentDisCo.billPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#2878C8] hover:bg-[#1E62A8] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <span>Open Official DisCo Portal</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Official Channel Links Grid */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              
              {/* Portal Card */}
              <div className="p-4 rounded-xl border border-gray-200 bg-slate-50/70 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#102A43]">
                  <Globe className="w-4 h-4 text-[#2878C8]" />
                  <span>Official Bill / Payment Portal</span>
                </div>
                <p className="text-xs text-slate-600">
                  Self-service portal for bill view, token reprint, and payment statements.
                </p>
                <a
                  href={currentDisCo.billPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#2878C8] hover:underline pt-1"
                >
                  <span>Go to Self-Service</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Phone Desk Card */}
              <div className="p-4 rounded-xl border border-gray-200 bg-slate-50/70 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#102A43]">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>Customer Support Lines</span>
                </div>
                <p className="text-xs text-slate-600">
                  Official call center for billing queries, meter faults, or payment complaints.
                </p>
                <div className="text-xs font-mono font-bold text-slate-900 pt-1">
                  {currentDisCo.customerCarePhone}
                </div>
              </div>

              {/* WhatsApp Card */}
              <div className="p-4 rounded-xl border border-gray-200 bg-slate-50/70 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#102A43]">
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp Self-Service</span>
                </div>
                <p className="text-xs text-slate-600">
                  Direct WhatsApp bot or agent for quick token receipts and balance checks.
                </p>
                {currentDisCo.whatsappNumber ? (
                  <a
                    href={`https://wa.me/${currentDisCo.whatsappNumber.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline pt-1"
                  >
                    <span>Chat on WhatsApp: {currentDisCo.whatsappNumber}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <div className="text-xs text-slate-500 pt-1">
                    Contact main telephone line above
                  </div>
                )}
              </div>

            </div>

            {/* Statutory Provider Notice */}
            <div className="mt-8 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong className="text-amber-950 font-bold">Anti-Fraud & Transparency Requirement:</strong> Genuine electricity bills in Nigeria reflect actual energy consumption measured through an authorised meter or estimated billing schedule set by the Nigerian Electricity Regulatory Commission (NERC). Verified Virtual Paddy never generates mock DisCo bills.
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Read-Only Modal or Side-Panel Preview */}
      <DocumentPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        documentType="electricity-bill"
        billData={
          currentState && currentDisCo
            ? {
                disco: currentDisCo,
                state: currentState,
                meterOrAccountNumber: meterOrAccountInput,
              }
            : undefined
        }
        pdfResult={billPdfResult}
        initialViewMode={previewMode}
        onTriggerDownload={handleDownloadBill}
      />
    </div>
  );
};
