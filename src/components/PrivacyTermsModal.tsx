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
            <span>Service Terms & Privacy Information</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#102A43] leading-tight">
            Terms of Use & Privacy Information
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
                Users are responsible for ensuring that information they enter is accurate and that they have permission to use any personal information supplied. Misrepresenting a customer-prepared statement as a utility-issued, government-issued or independently verified document may cause harm and may have legal consequences depending on the circumstances. This platform does not provide legal advice.
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
              <h2 className="text-2xl font-bold text-slate-900 mt-1">Privacy Policy & Data Handling</h2>
              <p className="text-xs text-slate-500 mt-1">Privacy information for users in Nigeria</p>
            </div>

            {/* Core Architecture Highlight */}
            <div className="p-5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-950">
              <div className="flex items-center gap-2.5 font-bold text-base text-emerald-900 mb-1.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                <span>Browser-Based Document Generation</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-700">
                The Customer-Prepared Address Statement is generated in your browser. The application code does not intentionally send the form fields to an application database or cloud document-storage service. Form values are held in the active page while you use the tool. However, visiting this website involves network requests to its hosting provider, and your browser, device, network provider and any external resources may process technical information. Do not enter information you do not wish to process on your device or share on a network.
              </p>
            </div>

            <section>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                1. What Data Do We Collect or Transmit?
              </h3>
              <ul className="list-disc list-inside space-y-2 pl-2 text-slate-700">
                <li>
                  <strong className="text-slate-900">Form information:</strong> The application uses the details you enter to prepare the PDF in the active browser session. The application does not provide user accounts or a cloud database for these form submissions.
                </li>
                <li>
                  <strong className="text-slate-900">Browser storage:</strong> The current form workflow does not intentionally save the entered form fields to localStorage, sessionStorage or application cookies. Your browser, extensions or device settings may behave independently.
                </li>
                <li>
                  <strong className="text-slate-900">Generated PDFs:</strong> The document is rendered locally using open-source JavaScript (`jsPDF`) and 
                  downloaded directly onto your device's filesystem.
                </li>
                <li>
                  <strong className="text-slate-900">Technical connection data:</strong> The hosting provider and network infrastructure may process technical request information such as IP address, browser/user-agent details, timestamps and requested files. We do not control the provider's independent infrastructure logs.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                2. Document storage and deletion
              </h3>
              <div className="p-4 rounded-lg bg-slate-50 border border-gray-200 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2.5">
                <p>
                  <strong className="text-slate-900">Current service design:</strong> The website does not offer an account-based document vault or cloud backup for generated address statements. The PDF is created in the browser and downloaded by you. Your browser or operating system may retain the downloaded file until you delete it.
                </p>
                <p>
                  <strong className="text-slate-900">Your responsibility:</strong> Save generated files only on a device and in a folder you control. Delete downloaded copies from your device and its recycle bin/trash when they are no longer needed. If cloud storage or account features are introduced later, this policy must be updated before those features launch.
              </div>
            </section>

            <section>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                3. Data Subject Rights under the Nigeria Data Protection Act (NDPA)
              </h3>
              <p>
                Under the Nigeria Data Protection Act, you possess the right to privacy, data minimization, and immediate rectification. 
                The application clears the active form state when you use <strong className="text-slate-900">"Start Again"</strong> or reload/close the page. This does not delete files you have downloaded, information retained by your browser or device, or technical records held by hosting and network providers.
              </p>
            </section>

            <section>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                4. Third-Party Analytics & Advertising Trackers
              </h3>
              <p>
                The current application does not intentionally use advertising or behavioural analytics trackers. The site loads certain third-party resources and links to external electricity providers and payment services. Those third parties may receive technical information when your browser connects to them and operate under their own privacy notices.
              </p>
            </section>

            <section>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                5. Privacy Questions & Inquiries
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
