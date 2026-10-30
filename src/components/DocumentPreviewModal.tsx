import React, { useState, useEffect } from 'react';
import { 
  X, Download, Eye, ShieldCheck, AlertTriangle, FileText, 
  CheckCircle2, ArrowDown, Maximize2, Columns, Printer, ExternalLink,
  MapPin, User, Phone, Zap, Calendar, Hash, Lock
} from 'lucide-react';
import { AddressStatementFormData } from '../types';
import { ElectricityBillInquiryData, GeneratedPdfResult, downloadPdfBlob } from '../utils/pdfGenerator';

export type PreviewPresentationMode = 'modal' | 'side-panel';
export type PreviewDocumentType = 'address-statement' | 'electricity-bill';

interface DocumentPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentType: PreviewDocumentType;
  addressData?: AddressStatementFormData;
  formData?: AddressStatementFormData;
  billData?: ElectricityBillInquiryData;
  pdfResult?: GeneratedPdfResult | null;
  onDownload?: () => void;
  onTriggerDownload?: () => void;
  defaultMode?: PreviewPresentationMode;
  initialViewMode?: PreviewPresentationMode;
  isGenerating?: boolean;
}

export const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({
  isOpen,
  onClose,
  documentType,
  addressData,
  formData,
  billData,
  pdfResult,
  onDownload,
  onTriggerDownload,
  defaultMode = 'modal',
  initialViewMode,
  isGenerating = false,
}) => {
  const effectiveAddressData = addressData || formData;
  const effectiveMode = initialViewMode || defaultMode || 'modal';
  const effectiveDownload = onTriggerDownload || onDownload;

  const [viewMode, setViewMode] = useState<PreviewPresentationMode>(effectiveMode);
  const [activeTab, setActiveTab] = useState<'document' | 'checklist'>('document');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Keep in sync with mode prop changes
  useEffect(() => {
    setViewMode(effectiveMode);
  }, [effectiveMode]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleExecuteDownload = () => {
    if (effectiveDownload) {
      effectiveDownload();
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
      return;
    }

    if (pdfResult) {
      downloadPdfBlob(pdfResult.blob, pdfResult.fileName);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    }
  };

  const deviceDateString = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const isAddress = documentType === 'address-statement';
  const docTitle = isAddress
    ? 'Customer-Prepared Address Statement'
    : 'Genuine Electricity Bill Inquiry Dossier';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${docTitle} Preview`}
      className={`fixed inset-0 z-50 overflow-hidden ${
        viewMode === 'modal'
          ? 'bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6'
          : 'bg-slate-900/30 flex justify-end'
      }`}
    >
      {/* Backdrop click to close */}
      <div 
        className="fixed inset-0 -z-10" 
        onClick={onClose} 
        aria-hidden="true" 
      />

      {/* Main Container: Modal (Centered) vs Side-Panel (Right Docked Drawer) */}
      <div
        className={`bg-white shadow-2xl flex flex-col transition-all duration-200 border border-slate-300 ${
          viewMode === 'modal'
            ? 'w-full max-w-4xl max-h-[92vh] rounded-xl overflow-hidden'
            : 'w-full sm:max-w-xl md:max-w-2xl h-full border-l border-slate-300'
        }`}
      >
        {/* Top Header Bar */}
        <div className="bg-slate-900 text-white px-4 sm:px-6 py-3.5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="p-1.5 rounded bg-emerald-500/20 text-emerald-400 shrink-0">
              <Eye className="w-4 h-4" />
            </span>
            <div className="truncate">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                  Read-Only Verification Preview
                </span>
                <span className="text-slate-400 text-xs hidden sm:inline">·</span>
                <span className="text-slate-300 text-xs hidden sm:inline font-mono">
                  {viewMode === 'modal' ? 'Modal View' : 'Side-Panel View'}
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-white truncate mt-0.5">
                {docTitle}
              </h2>
            </div>
          </div>

          {/* Mode Switcher & Close Controls */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* View Mode Toggle: Modal vs Side-Panel */}
            <div className="bg-slate-800 p-0.5 rounded-lg flex items-center border border-slate-700">
              <button
                type="button"
                onClick={() => setViewMode('modal')}
                title="Switch to Centered Modal View"
                className={`px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                  viewMode === 'modal'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Modal</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('side-panel')}
                title="Switch to Docked Side-Panel View"
                className={`px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                  viewMode === 'side-panel'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Columns className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Side-Panel</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Verification Subheader & Tab Switcher */}
        <div className="bg-slate-50 px-4 sm:px-6 py-2.5 border-b border-gray-200 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('document')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'document'
                  ? 'bg-white text-slate-900 border border-gray-300 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Standard A4 Document Layout
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('checklist')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'checklist'
                  ? 'bg-white text-slate-900 border border-gray-300 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Verification Data Checklist
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Zero Server Transmission · Device Memory Only</span>
          </div>
        </div>

        {/* Main Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-100/70">
          
          {/* TAB 1: Authentic A4 Visual Layout */}
          {activeTab === 'document' && (
            <div className="max-w-2xl mx-auto bg-white border border-gray-300 shadow-md rounded-lg p-6 sm:p-8 text-slate-900">
              
              {/* Document Header Bar */}
              <div className="h-2 bg-slate-900 rounded-xs mb-4" />
              
              <div className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-1">
                VERIFIED VIRTUAL PADDY · DIGITAL CITIZEN ASSISTANCE
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight mb-1">
                {isAddress ? 'CUSTOMER-PREPARED ADDRESS STATEMENT' : 'GENUINE ELECTRICITY BILL INQUIRY DOSSIER'}
              </h1>

              <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 border-b border-gray-200 pb-3 mb-4 gap-2">
                <span className="font-mono text-slate-600">
                  Ref: {isAddress ? 'VVP-CPAS-2026-VERIFIED' : 'VVP-DISCO-2026-INQUIRY'}
                </span>
                <span>Date: {deviceDateString}</span>
              </div>

              {/* Prominent Statutory Disclaimer Box */}
              <div className="mb-6 p-4 rounded-md bg-amber-50 border border-amber-300 text-amber-950 text-xs leading-relaxed">
                <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-amber-900 mb-1">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Mandatory Statutory Disclaimer & Notice</span>
                </div>
                {isAddress ? (
                  <p>
                    This document contains information supplied entirely by the customer. It is not an electricity bill issued 
                    by a utility provider, and the address has not been independently verified by Verified Virtual Paddy. It must 
                    never be presented as an official utility invoice or government certified record.
                  </p>
                ) : (
                  <p>
                    Direct meter billing records can only be retrieved from licensed DisCos. Verified Virtual Paddy does NOT forge, 
                    fabricate, or simulate meter readings, billing balances, or consumption records. Use the verified official channels 
                    below to access genuine utility bills.
                  </p>
                )}
              </div>

              {/* Address Statement View */}
              {isAddress && effectiveAddressData && (
                <div className="space-y-5 text-xs sm:text-sm">
                  <div>
                    <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs border-b border-gray-200 pb-1 mb-2.5">
                      1. Declarant Information & Physical Residence
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-md border border-gray-200">
                      <div>
                        <span className="text-slate-500 text-xs block">Full Name:</span>
                        <strong className="text-slate-900 font-semibold">{effectiveAddressData.fullName || 'Not specified'}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 text-xs block">Contact Phone:</span>
                        <span className="text-slate-900 font-mono">{effectiveAddressData.phoneNumber || 'Not specified'}</span>
                      </div>
                      <div className="sm:col-span-2">
                        <span className="text-slate-500 text-xs block">Residential Street Address:</span>
                        <span className="text-slate-900 font-medium">{effectiveAddressData.residentialAddress || 'Not specified'}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 text-xs block">Local Government Area (LGA):</span>
                        <span className="text-slate-900">{effectiveAddressData.lga || 'Not specified'}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 text-xs block">State / Territory:</span>
                        <span className="text-slate-900 font-semibold">{effectiveAddressData.state || 'Not specified'}, Nigeria</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs border-b border-gray-200 pb-1 mb-2.5">
                      2. Local Electricity Distribution Context
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-md border border-gray-200">
                      <div>
                        <span className="text-slate-500 text-xs block">Electricity Provider (DisCo):</span>
                        <span className="text-slate-900 font-medium">{effectiveAddressData.electricityProvider || 'Not Specified / Off-grid'}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 text-xs block">Customer / Meter Reference:</span>
                        <span className="font-mono text-slate-900 font-semibold">
                          {effectiveAddressData.meterOrAccountNumber ? `${effectiveAddressData.meterOrAccountNumber} (User Supplied)` : 'None Declared'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs border-b border-gray-200 pb-1 mb-2.5">
                      3. Statement of Truthfulness & Affirmation
                    </h3>
                    <div className="p-3 bg-slate-50 rounded-md border border-gray-200 text-slate-700 text-xs leading-relaxed italic">
                      "I, {effectiveAddressData.fullName || 'the undersigned'}, hereby confirm that the address, telephone contact, 
                      and premise information set out above are true, accurate, and supplied voluntarily by myself. I understand 
                      that presenting false statements or forging utility affiliation is unlawful under Nigerian law."
                    </div>
                  </div>

                  {/* Signature & Audit Columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-gray-200 text-xs">
                    <div className="border border-gray-200 p-3 rounded bg-white">
                      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Declarant Affirmation
                      </div>
                      <div className="border-b border-slate-400 h-8 mb-2" />
                      <div className="text-[11px] text-slate-700">
                        Affirmed by: <strong>{effectiveAddressData.fullName || 'User'}</strong>
                      </div>
                      <div className="text-[10px] text-slate-500">Date: {deviceDateString}</div>
                    </div>

                    <div className="border border-gray-200 p-3 rounded bg-slate-50">
                      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                        System Audit Record
                      </div>
                      <div className="space-y-0.5 text-[10px] text-slate-600 font-mono">
                        <div>Engine: Verified Virtual Paddy (In-Browser)</div>
                        <div>Storage: Zero Server Persistence</div>
                        <div>Encryption: Client-side RAM session only</div>
                        <div>Fee: 100% Free Public Assistance</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Electricity Bill Assistance View */}
              {!isAddress && billData && (
                <div className="space-y-5 text-xs sm:text-sm">
                  <div>
                    <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs border-b border-gray-200 pb-1 mb-2.5">
                      1. Target DisCo Jurisdiction & User Premise
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-md border border-gray-200">
                      <div>
                        <span className="text-slate-500 text-xs block">Electricity Company:</span>
                        <strong className="text-slate-900 font-semibold">{billData.disco.name} ({billData.disco.shortName})</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 text-xs block">Selected State / Territory:</span>
                        <span className="text-slate-900 font-medium">{billData.state.name} ({billData.state.capital})</span>
                      </div>
                      <div>
                        <span className="text-slate-500 text-xs block">Coverage States:</span>
                        <span className="text-slate-700 text-xs">{billData.disco.coverageStates.join(', ')}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 text-xs block">Meter / Account Reference:</span>
                        <span className="font-mono text-slate-900 font-bold">
                          {billData.meterOrAccountNumber ? billData.meterOrAccountNumber : 'None Declared (In-Person / Walk-in)'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs border-b border-gray-200 pb-1 mb-2.5">
                      2. Official Direct Retrieval Channels
                    </h3>
                    <div className="space-y-2 bg-slate-50 p-3.5 rounded-md border border-gray-200 text-xs">
                      <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-gray-200">
                        <span className="text-slate-500 font-semibold">Self-Service Bill & Token Portal:</span>
                        <a
                          href={billData.disco.billPortalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-700 font-bold hover:underline flex items-center gap-1"
                        >
                          <span className="truncate max-w-[280px]">{billData.disco.billPortalUrl}</span>
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-gray-200">
                        <span className="text-slate-500 font-semibold">Customer Support Hotline:</span>
                        <span className="font-mono text-slate-900 font-bold">{billData.disco.customerCarePhone}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-gray-200">
                        <span className="text-slate-500 font-semibold">Official WhatsApp Desk:</span>
                        <span className="font-mono text-slate-900">{billData.disco.whatsappNumber || 'Available via Support'}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between py-1">
                        <span className="text-slate-500 font-semibold">DisCo Website:</span>
                        <a
                          href={billData.disco.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-700 font-medium hover:underline"
                        >
                          {billData.disco.website}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs border-b border-gray-200 pb-1 mb-2.5">
                      3. Official Document Retrieval Checklist
                    </h3>
                    <div className="p-3.5 bg-slate-50 rounded-md border border-gray-200 text-xs space-y-2 text-slate-700 leading-relaxed">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Prepaid Customers:</strong> Download your official recharge receipt with customer name, premise address, and VAT schedule via the self-service portal.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Postpaid Customers:</strong> Present your Account Number at your nearest Business Hub or portal to receive a certified duplicate invoice.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Regulatory Right:</strong> Under NERC regulations, DisCos are required to provide account billing histories free of charge.</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="mt-8 pt-4 border-t border-gray-200 flex items-center justify-between text-[10px] text-slate-400">
                <span>Verified Virtual Paddy Document Preview System</span>
                <span>Page 1 of 1 · Strict Non-Simulation Standards</span>
              </div>
            </div>
          )}

          {/* TAB 2: Verification Checklist & Detail Inspection */}
          {activeTab === 'checklist' && (
            <div className="max-w-2xl mx-auto bg-white border border-gray-300 rounded-lg p-5 sm:p-7 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900">
                  Pre-Download Verification Checklist
                </h3>
              </div>
              <p className="text-xs text-slate-600 mb-5">
                Ensure each detail matches your intended submission before triggering the browser PDF download.
              </p>

              {isAddress && effectiveAddressData && (
                <div className="space-y-3">
                  <div className="p-3 rounded-lg border border-gray-200 bg-slate-50 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <strong className="text-slate-900 block font-semibold">Resident Full Name</strong>
                      <span className="text-slate-700">{effectiveAddressData.fullName || 'Missing or incomplete'}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg border border-gray-200 bg-slate-50 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <strong className="text-slate-900 block font-semibold">Phone Number</strong>
                      <span className="text-slate-700 font-mono">{effectiveAddressData.phoneNumber || 'Missing or incomplete'}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg border border-gray-200 bg-slate-50 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <strong className="text-slate-900 block font-semibold">Declared Physical Address</strong>
                      <span className="text-slate-700">{effectiveAddressData.residentialAddress || 'Missing or incomplete'}</span>
                      <div className="text-slate-500 mt-1">
                        LGA: {effectiveAddressData.lga || 'None'}, State: {effectiveAddressData.state || 'None'}
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg border border-gray-200 bg-slate-50 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <strong className="text-slate-900 block font-semibold">Utility Context / Meter Reference</strong>
                      <span className="text-slate-700">
                        Provider: {effectiveAddressData.electricityProvider || 'None'} · Meter: {effectiveAddressData.meterOrAccountNumber || 'None declared'}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg border border-amber-200 bg-amber-50/50 flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <strong className="text-amber-950 block font-semibold">Statutory Limitations Consent</strong>
                      <span className="text-amber-900">
                        Declared as Customer-Prepared Statement (NOT an official electricity bill).
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {!isAddress && billData && (
                <div className="space-y-3">
                  <div className="p-3 rounded-lg border border-gray-200 bg-slate-50 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <strong className="text-slate-900 block font-semibold">Electricity Provider (DisCo)</strong>
                      <span className="text-slate-700">{billData.disco.name} ({billData.disco.shortName})</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg border border-gray-200 bg-slate-50 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <strong className="text-slate-900 block font-semibold">State / Territory Jurisdiction</strong>
                      <span className="text-slate-700">{billData.state.name} ({billData.state.capital})</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg border border-gray-200 bg-slate-50 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <strong className="text-slate-900 block font-semibold">Meter or Account Reference</strong>
                      <span className="text-slate-700 font-mono">
                        {billData.meterOrAccountNumber || 'None Declared (In-Person Assistance)'}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg border border-amber-200 bg-amber-50/50 flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <strong className="text-amber-950 block font-semibold">Strict NERC Non-Simulation Rule</strong>
                      <span className="text-amber-900">
                        Verified Virtual Paddy provides direct official links and support numbers, avoiding simulated billing lookups.
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Bottom Action Footer with Red Download Button */}
        <div className="bg-white border-t border-gray-200 px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="text-xs text-slate-600 text-center sm:text-left">
            <span className="font-semibold text-slate-800">Ready to download?</span> All details verified above will be compiled into your A4 PDF.
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg border border-gray-300 text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              Close & Edit
            </button>

            {/* Prompt Compliant Red Download PDF Button */}
            <button
              type="button"
              onClick={handleExecuteDownload}
              className="min-h-[46px] px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-red-200"
            >
              <Download className="w-4 h-4 text-white" />
              <span>{downloadSuccess ? 'Downloaded!' : 'Download PDF'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
