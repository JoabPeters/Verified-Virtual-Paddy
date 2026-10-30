import React, { useState } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { Scale, CheckCircle2, ArrowLeft, ChevronRight, ShieldCheck, Lock } from 'lucide-react';

interface PrivacyTermsProps {
  initialTab?: 'terms' | 'privacy';
  onBackHome?: () => void;
}

export const PrivacyTermsView: React.FC<PrivacyTermsProps> = ({ initialTab = 'terms', onBackHome }) => {
  const [tab, setTab] = useState<'terms' | 'privacy'>(initialTab);

  return (
    <div className="bg-[#F7F9FC] text-[#172B4D] min-h-[85vh] py-8 sm:py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation: Back to Home & Breadcrumbs */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          {onBackHome && (
            <button
              onClick={onBackHome}
              className="inline-flex items-center gap-1.5 font-bold text-[#0D9488] hover:text-[#0A736A] hover:underline transition-colors cursor-pointer py-1"
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
            <span className="text-[#102A43] font-bold">
              {tab === 'terms' ? 'Terms & Conditions' : 'Privacy Policy'}
            </span>
          </nav>
        </div>

        {/* Header & Tab Selector */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-bold text-[#0D9488] bg-[#E8F7EF] px-3.5 py-1.5 rounded-full inline-flex items-center gap-2 border border-[#0D9488]/20 mb-3 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0D9488]" />
            <span>Civic Governance & Privacy Standards</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#102A43] leading-tight">
            Legal & Privacy Governance
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 font-normal">
            Full transparency on client-side document processing, user responsibilities, and data privacy.
          </p>

          {/* Tab switch */}
          <div className="mt-6 inline-flex p-1 rounded-xl bg-slate-200/70 border border-gray-200">
            <button
              onClick={() => setTab('terms')}
              className={`px-5 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                tab === 'terms'
                  ? 'bg-white text-[#102A43] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Terms & Conditions
            </button>
            <button
              onClick={() => setTab('privacy')}
              className={`px-5 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                tab === 'privacy'
                  ? 'bg-white text-[#102A43] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Privacy Policy & Deletion Standards
            </button>
          </div>
        </div>

        {/* TERMS AND CONDITIONS */}
        {tab === 'terms' && (
          <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-10 shadow-xs space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
            
            <div className="border-b border-gray-200 pb-4">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Document Agreement</span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">Terms of Service & Usage Agreement</h2>
              <p className="text-xs text-slate-500 mt-1">Last Updated: October 2026 · Governed by Nigerian Law</p>
            </div>

            <section>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 mb-2">
                <Scale className="w-5 h-5 text-emerald-600" />
                <span>1. Fundamental Nature of Service: Official Utility Bills vs Customer-Prepared Statements</span>
              </h3>
              <p>
                Verified Virtual Paddy provides two distinct digital pathways:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1.5 pl-2 text-slate-700">
                <li>
                  <strong className="text-slate-900">Service A (Official DisCo Directory):</strong> An educational and navigation directory connecting users 
                  to official, licensed Nigerian Electricity Distribution Companies (DisCos) such as Ikeja Electric, Eko DisCo, AEDC, IBEDC, 
                  and others. Official utility bills are issued exclusively by these authorized companies.
                </li>
                <li>
                  <strong className="text-slate-900">Service B (Customer-Prepared Address Statement):</strong> A client-side PDF document generator that formats 
                  the user's own self-declared residential address and personal details. 
                  <strong className="text-emerald-800"> This document is NOT an electricity bill, NOT a fiscal utility invoice, and NOT a government-certified proof of address.</strong> 
                  It has not been independently surveyed or audited by Verified Virtual Paddy.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                2. User Truthfulness & Criminal Liability for Fraud
              </h3>
              <p>
                Users agree under solemn affirmation to provide only genuine, factual, and lawful residential information. 
                Using false names, fictitious addresses, or unauthorized third-party credentials to create documents for fraudulent 
                financial, bank account opening, or official identity purposes is strictly illegal under Nigerian statutory laws, 
                including the Cybercrimes (Prohibition, Prevention, etc.) Act and the Criminal Code.
              </p>
            </section>

            <section>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                3. Mandatory On-Document Disclaimer Notice
              </h3>
              <p>
                Every Customer-Prepared Address Statement generated through this platform prominently displays the mandatory non-utility disclosure:
              </p>
              <div className="mt-3 p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm font-medium">
                "This document contains information supplied by the user. It is not an electricity bill issued by a utility provider, 
                and the address has not been independently verified by Verified Virtual Paddy."
              </div>
            </section>

            <section>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                4. Voluntary Community Support & Absolute Free Access
              </h3>
              <p>
                Verified Virtual Paddy is 100% free. No user is ever obligated to pay, subscribe, or donate. 
                Any voluntary transfers sent to the designated support account numbers (OPay, PalmPay, Moniepoint: 8167224874) 
                are non-refundable civic gifts that grant no preferential access or additional features.
              </p>
            </section>

            <section>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                5. Third-Party Provider Links & Independent Operations
              </h3>
              <p>
                External links to Nigerian Electricity Distribution Companies (DisCos) and banking channels are provided solely for user convenience. 
                Verified Virtual Paddy is an independent digital civic initiative and is not an agent, affiliate, subsidiary, or franchise of any 
                electricity distribution company, the Federal Ministry of Power, or the Nigerian Electricity Regulatory Commission (NERC).
              </p>
            </section>

            <section>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                6. Dispute Resolution, Governing Law & Complaint Escalation
              </h3>
              <p>
                These terms are governed by and construed in accordance with the laws of the Federal Republic of Nigeria. 
                For complaints, corrections, or consumer inquiries, contact our digital desk at:
              </p>
              <div className="mt-3 p-3.5 rounded-lg bg-slate-50 border border-gray-200 text-xs font-mono text-slate-800">
                Email:{" "}
                <a
                  href={`mailto:${SITE_CONFIG.contact.complaintsEmail}`}
                  className="text-emerald-700 underline hover:text-emerald-800"
                >
                  {SITE_CONFIG.contact.complaintsEmail}
                </a>
              </div>
            </section>

          </div>
        )}

        {/* PRIVACY POLICY */}
        {tab === 'privacy' && (
          <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-10 shadow-xs space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
            
            <div className="border-b border-gray-200 pb-4">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Privacy & Data Architecture</span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">Privacy Policy & 7-Day Storage Disclosure</h2>
              <p className="text-xs text-slate-500 mt-1">Aligned with Nigeria Data Protection Act (NDPA) Principles</p>
            </div>

            {/* Core Architecture Highlight */}
            <div className="p-5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-950">
              <div className="flex items-center gap-2.5 font-bold text-base text-emerald-900 mb-1.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                <span>Zero-Cloud, Client-Side Architecture (Active Implementation)</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-700">
                Verified Virtual Paddy implements an absolute client-side architecture. 
                When you enter your name, address, phone number, and meter reference, 
                <strong className="text-slate-900"> all processing occurs inside your device's browser memory (RAM)</strong>. 
                Your personal information is NEVER transmitted across the internet to our servers, 
                never recorded in remote databases, and never persisted to browser cookies or local storage.
              </p>
            </div>

            <section>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                1. What Data Do We Collect or Transmit?
              </h3>
              <ul className="list-disc list-inside space-y-2 pl-2 text-slate-700">
                <li>
                  <strong className="text-slate-900">Personal Identity Data:</strong> 0% collected on servers. Your name, address, and phone number 
                  exist only in temporary React component memory on your phone or computer.
                </li>
                <li>
                  <strong className="text-slate-900">Browser Storage:</strong> We do NOT write your form data to `localStorage`, `sessionStorage`, or tracking cookies.
                </li>
                <li>
                  <strong className="text-slate-900">Generated PDFs:</strong> The document is rendered locally using open-source JavaScript (`jsPDF`) and 
                  downloaded directly onto your device's filesystem.
                </li>
                <li>
                  <strong className="text-slate-900">Telecommunication & Network Logs:</strong> Standard web requests for static JavaScript/CSS assets 
                  produce ephemeral HTTP server routing logs, but contain no user-entered document text.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                2. Seven-Day Document Storage Policy Disclosure
              </h3>
              <div className="p-4 rounded-lg bg-slate-50 border border-gray-200 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2.5">
                <p>
                  <strong className="text-slate-900">Honest Architecture Statement:</strong> We do NOT operate a cloud-storage backend or server database for generated files. 
                  Because no documents are uploaded to our servers, there are zero server-side files to retain or delete. 
                  Your files remain strictly under your personal control on your own device.
                </p>
                <p>
                  <strong className="text-slate-900">Seven-Day Server Retention Policy:</strong> Should a future feature require optional cloud backup or temporary server-side 
                  link sharing, Verified Virtual Paddy commits strictly to:
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-700">
                  <li>Strict end-to-end access controls with private authentication.</li>
                  <li>An automated hard-expiry timestamp permanently deleting all documents within a maximum of seven (7) days of creation.</li>
                  <li>Complete automated cryptographic purge of associated metadata upon expiry.</li>
                  <li>Zero public URL indexing or search engine crawling of private user records.</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                3. Data Subject Rights under the Nigeria Data Protection Act (NDPA)
              </h3>
              <p>
                Under the Nigeria Data Protection Act, you possess the right to privacy, data minimization, and immediate rectification. 
                Because we store zero personal records on our servers, your personal data is automatically "forgotten" the moment you click 
                <strong className="text-slate-900"> "Start Again"</strong> or close your browser tab.
              </p>
            </section>

            <section>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                4. Third-Party Analytics & Advertising Trackers
              </h3>
              <p>
                We do not embed third-party surveillance scripts, cross-site trackers, or commercial advertising networks. 
                External links to DisCos and payment applications operate under the independent privacy policies of those respective entities.
              </p>
            </section>

            <section>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                5. Privacy Officer & Inquiries
              </h3>
              <p>
                For data protection questions or inquiries regarding our open-source client-side privacy architecture, reach us at:
              </p>
              <div className="mt-3 p-3.5 rounded-lg bg-slate-50 border border-gray-200 text-xs font-mono text-slate-800">
                Email:{" "}
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="text-emerald-700 underline hover:text-emerald-800"
                >
                  {SITE_CONFIG.contact.email}
                </a>
              </div>
            </section>

          </div>
        )}

      </div>
    </div>
  );
};
