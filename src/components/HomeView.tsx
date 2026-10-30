import React, { useState } from 'react';
import { ActiveView } from '../types';
import { Hero } from './Hero';
import { SupportSection } from './SupportSection';
import { TestimonialSection } from './TestimonialSection';
import { SITE_CONFIG } from '../config/siteConfig';
import { 
  Zap, FileText, ArrowRight, CheckCircle2, Lock, 
  ChevronDown, ShieldCheck, Eye, Download, Edit3, HelpCircle, 
  AlertTriangle, Shield, Check
} from 'lucide-react';
import manPhoneImg from '../assets/images/man_checking_phone_1793356574465.jpg';
import womanPhoneImg from '../assets/images/woman_using_phone_1793356589112.jpg';
import reviewDocImg from '../assets/images/person_reviewing_document_1793356603478.jpg';

interface HomeViewProps {
  onNavigate: (view: ActiveView) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const handleScrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#F7F9FC] text-[#172B4D]">
      {/* 1. Hero Section */}
      <Hero 
        onNavigate={onNavigate} 
        onScrollToHowItWorks={handleScrollToHowItWorks} 
      />

      {/* 2. Visual Service Cards Section (Two Visually Distinct Service Cards) */}
      <section id="services" className="py-14 sm:py-20 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0D9488] bg-[#E8F7EF] px-3.5 py-1.5 rounded-full border border-[#0D9488]/20 inline-block">
              Dedicated Civic Services
            </span>
            <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold tracking-tight text-[#102A43]">
              Choose Your Assistance Pathway
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              We separate genuine utility bill retrieval from customer-prepared personal statements 
              to ensure absolute legal transparency, zero fraud, and complete user confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* CARD ONE: ELECTRICITY BILL ASSISTANCE (Blue background accents) */}
            <div className="bg-[#EFF6FF] rounded-2xl border-2 border-[#2878C8]/30 p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-[#2878C8]/60 transition-all">
              <div>
                {/* Photo Banner */}
                <div className="relative rounded-xl overflow-hidden aspect-[16/10] mb-6 border border-[#2878C8]/25 bg-slate-200 shadow-xs group">
                  <img
                    src={manPhoneImg}
                    alt="Nigerian man comfortably checking electricity DisCo portal details on his smartphone"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#102A43]/85 via-black/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white">
                    <span className="text-xs font-bold flex items-center gap-1.5 drop-shadow-sm">
                      <Zap className="w-3.5 h-3.5 text-amber-300" />
                      <span>Official DisCo Channels</span>
                    </span>
                    <span className="text-[10px] bg-[#2878C8]/90 backdrop-blur-xs px-2.5 py-0.5 rounded-full font-bold text-white shadow-xs">
                      12 DisCos Covered
                    </span>
                  </div>
                </div>

                {/* Header Icon & Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white text-[#2878C8] flex items-center justify-center shadow-xs border border-[#2878C8]/25">
                    <Zap className="w-6 h-6 text-[#2878C8]" />
                  </div>
                  <span className="text-[11px] font-bold text-[#2878C8] bg-white px-3 py-1 rounded-full border border-[#2878C8]/25 uppercase tracking-wider shadow-2xs">
                    Official DisCo Channels
                  </span>
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] tracking-tight">
                  Electricity Bill Assistance
                </h3>

                <p className="mt-3 text-sm text-slate-700 leading-relaxed">
                  Need a genuine utility bill for your premises? We connect you directly to the verified self-service portals, customer service desks, WhatsApp support lines, and payment receipt systems of all 12 licensed Nigerian Electricity Distribution Companies (DisCos).
                </p>

                {/* Explicit Legal Transparency Notice */}
                <div className="mt-5 p-4 rounded-xl bg-white border border-[#2878C8]/20 text-xs text-slate-700 leading-relaxed shadow-xs">
                  <strong className="text-[#102A43] font-bold flex items-center gap-1.5 mb-1">
                    <ShieldCheck className="w-4 h-4 text-[#2878C8]" />
                    <span>Authorised Provider Rule:</span>
                  </strong>
                  Genuine utility bills can ONLY be issued by licensed electricity companies (e.g. Ikeja Electric, Eko DisCo, AEDC, IBEDC). We do not fabricate or simulate electricity bills — we link you directly to the authentic source for free.
                </div>

                <div className="mt-5 space-y-2.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2878C8] shrink-0" />
                    <span>Official portal download links & token receipt verification</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2878C8] shrink-0" />
                    <span>Full coverage for all 36 Nigerian states & FCT Abuja</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2878C8] shrink-0" />
                    <span>Zero simulated or fabricated utility bills</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#2878C8]/20">
                <button
                  onClick={() => onNavigate('genuine-bill')}
                  className="w-full py-3.5 px-5 rounded-xl bg-[#2878C8] hover:bg-[#1E62A8] active:bg-[#154E88] text-white font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2878C8]"
                >
                  <span>Explore Electricity Bill Assistance</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* CARD TWO: ADDRESS DOCUMENT GENERATOR (Green background accents) */}
            <div className="bg-[#E8F7EF] rounded-2xl border-2 border-[#0D9488]/30 p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-[#0D9488]/60 transition-all">
              <div>
                {/* Photo Banner */}
                <div className="relative rounded-xl overflow-hidden aspect-[16/10] mb-6 border border-[#0D9488]/25 bg-slate-200 shadow-xs group">
                  <img
                    src={womanPhoneImg}
                    alt="Smiling Nigerian woman comfortably preparing her address document on her smartphone"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#102A43]/85 via-black/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white">
                    <span className="text-xs font-bold flex items-center gap-1.5 drop-shadow-sm">
                      <FileText className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Client-Side Generation</span>
                    </span>
                    <span className="text-[10px] bg-[#0D9488]/90 backdrop-blur-xs px-2.5 py-0.5 rounded-full font-bold text-white shadow-xs">
                      100% In-RAM
                    </span>
                  </div>
                </div>

                {/* Header Icon & Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white text-[#0D9488] flex items-center justify-center shadow-xs border border-[#0D9488]/25">
                    <FileText className="w-6 h-6 text-[#0D9488]" />
                  </div>
                  <span className="text-[11px] font-bold text-[#0D9488] bg-white px-3 py-1 rounded-full border border-[#0D9488]/25 uppercase tracking-wider shadow-2xs">
                    Client-Side PDF Synthesis
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] tracking-tight">
                  Address Document Generator
                </h3>

                <p className="mt-3 text-sm text-slate-700 leading-relaxed">
                  Prepare a clean, standard, downloadable PDF containing your own declared residential address and contact details. Built entirely in your browser memory without uploading personal information to any server.
                </p>

                {/* Explicit Legal Transparency Notice */}
                <div className="mt-5 p-4 rounded-xl bg-white border border-[#0D9488]/20 text-xs text-slate-700 leading-relaxed shadow-xs">
                  <strong className="text-[#102A43] font-bold flex items-center gap-1.5 mb-1">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Customer-Prepared Statement Notice:</span>
                  </strong>
                  Customer-prepared statements are personal self-affirmations. They are NOT official electricity bills and carry prominent legal watermarks and disclaimers stating they must never be misrepresented as utility bills.
                </div>

                <div className="mt-5 space-y-2.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0" />
                    <span>Standardized A4 PDF with client-side timestamp</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0" />
                    <span>100% private: Never uploaded to cloud or stored on server</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0" />
                    <span>Strict anti-fraud layout with no fake utility charges</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#0D9488]/20">
                <button
                  onClick={() => onNavigate('address-statement')}
                  className="w-full py-3.5 px-5 rounded-xl bg-[#0D9488] hover:bg-[#0A736A] active:bg-[#085C55] text-white font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D9488]"
                >
                  <span>Create Address Document</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Three-Step Process ("How It Works") */}
      <section id="how-it-works" className="py-14 sm:py-20 bg-[#F7F9FC] border-b border-gray-200 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-white px-3 py-1.5 rounded-full border border-gray-200 inline-block shadow-2xs">
              Simple & Transparent
            </span>
            <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold tracking-tight text-[#102A43]">
              How Verified Virtual Paddy Works
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Three simple steps engineered for speed, low data usage, and absolute personal privacy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Step 1 */}
            <div className="p-7 rounded-2xl border border-gray-200 bg-white shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-[#102A43] text-white font-extrabold flex items-center justify-center text-sm mb-5 shadow-xs">
                01
              </div>
              <h3 className="text-lg font-bold text-[#102A43] mb-2">
                Enter your details
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Provide your legal name, valid Nigerian phone number, and residential address 
                including your State and Local Government Area.
              </p>
              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs text-slate-600 font-medium">
                <Edit3 className="w-4 h-4 text-[#0D9488]" />
                <span>Format validation for 36 States & LGAs</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-7 rounded-2xl border border-gray-200 bg-white shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-[#2878C8] text-white font-extrabold flex items-center justify-center text-sm mb-5 shadow-xs">
                02
              </div>
              <h3 className="text-lg font-bold text-[#102A43] mb-2">
                Review your information
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Check all entered information on the summary screen. Acknowledge the statutory 
                truthfulness declaration and explicit document limitations before rendering.
              </p>
              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs text-slate-600 font-medium">
                <Eye className="w-4 h-4 text-[#2878C8]" />
                <span>Interactive read-only modal/side-panel preview</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-7 rounded-2xl border border-gray-200 bg-white shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-[#0D9488] text-white font-extrabold flex items-center justify-center text-sm mb-5 shadow-xs">
                03
              </div>
              <h3 className="text-lg font-bold text-[#102A43] mb-2">
                Download your PDF
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Synthesize your document instantly inside your browser memory. Tap the prominent 
                red Download PDF button to save it directly to your device.
              </p>
              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs text-slate-600 font-medium">
                <Download className="w-4 h-4 text-[#0D9488]" />
                <span>Instant local download · Zero server storage</span>
              </div>
            </div>

          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('address-statement')}
              className="px-7 py-3.5 rounded-xl bg-[#0D9488] hover:bg-[#0A736A] text-white font-bold text-sm sm:text-base transition-all inline-flex items-center gap-2 cursor-pointer shadow-xs hover:shadow-md"
            >
              <span>Start Preparing Your Statement Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* 4. Privacy & Trust Section (Green & Blue Accents) */}
      <section id="privacy-trust" className="py-14 sm:py-20 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0D9488] bg-[#E8F7EF] px-3.5 py-1.5 rounded-full border border-[#0D9488]/20 mb-4">
                <Lock className="w-3.5 h-3.5 text-[#0D9488]" />
                <span>Zero-Cloud Document Synthesis</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#102A43] leading-tight">
                Your Personal Information Never Leaves Your Device
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                Unlike commercial document portals that upload and store your sensitive address records in cloud databases, 
                Verified Virtual Paddy runs 100% of its PDF rendering engine directly in your smartphone or computer browser.
              </p>

              <div className="mt-6 space-y-3.5 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0D9488] shrink-0 mt-0.5" />
                  <span><strong className="text-[#102A43] font-bold">Browser-Based PDF Generation:</strong> Names, phone numbers, and addresses are processed in temporary browser memory only.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#2878C8] shrink-0 mt-0.5" />
                  <span><strong className="text-[#102A43] font-bold">Minimal Personal-Data Collection:</strong> Zero advertising tracking, no account registration required, and zero analytics pixels.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0D9488] shrink-0 mt-0.5" />
                  <span><strong className="text-[#102A43] font-bold">Seven-Day Deletion Commitment:</strong> In the event that server-assisted storage is ever enabled in the future, all files will be automatically purged within 7 days, subject to clearly disclosed legal exceptions. Today, zero server storage exists.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#2878C8] shrink-0 mt-0.5" />
                  <span><strong className="text-[#102A43] font-bold">Clear Document Distinction:</strong> Customer-prepared statements state their nature plainly. We never generate fabricated utility bills or mock DisCo billing stamps.</span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate('privacy')}
                  className="text-xs sm:text-sm font-bold text-[#0D9488] hover:text-[#0A736A] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Read full Privacy Policy & Standards</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <span className="text-slate-300">·</span>
                <button
                  onClick={() => onNavigate('terms')}
                  className="text-xs sm:text-sm font-bold text-[#2878C8] hover:text-[#1E62A8] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>View Terms & Conditions</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Privacy Architecture & Document Reviewer (Green & Blue Accents) */}
            <div className="lg:col-span-5 space-y-5">
              
              {/* Strategic Document Review Photo */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] border-2 border-slate-200 shadow-md group bg-slate-200">
                <img
                  src={reviewDocImg}
                  alt="Nigerian professional reviewing a legal PDF document on laptop with total data privacy"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102A43]/90 via-[#102A43]/30 to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-xs font-bold text-white drop-shadow-sm">Direct Document Verification</span>
                  </div>
                  <p className="text-[11px] text-slate-200 mt-0.5 font-medium line-clamp-1">
                    Every document statement is generated and verified directly in local device RAM.
                  </p>
                </div>
              </div>

              {/* Privacy Architecture Audit Box (Green & Blue Accents) */}
              <div className="bg-gradient-to-br from-[#EFF6FF] to-[#E8F7EF] rounded-2xl border-2 border-slate-200 p-5 sm:p-6 space-y-3 shadow-xs">
                <h3 className="text-xs font-bold text-[#102A43] uppercase tracking-wider flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#0D9488]" />
                  <span>Verified Privacy Specifications</span>
                </h3>

                <div className="p-3.5 rounded-xl bg-white border border-gray-200/80 flex items-center justify-between text-xs shadow-2xs">
                  <span className="text-slate-600 font-medium">User Identity Storage</span>
                  <span className="font-mono text-[#0D9488] font-bold">0 Bytes (Local RAM)</span>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-gray-200/80 flex items-center justify-between text-xs shadow-2xs">
                  <span className="text-slate-600 font-medium">Server Archiving</span>
                  <span className="font-mono text-[#0D9488] font-bold">Disabled (Client-Side)</span>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-gray-200/80 flex items-center justify-between text-xs shadow-2xs">
                  <span className="text-slate-600 font-medium">Third-Party Tracking</span>
                  <span className="font-mono text-[#2878C8] font-bold">0 Cookies / 0 Trackers</span>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-gray-200/80 flex items-center justify-between text-xs shadow-2xs">
                  <span className="text-slate-600 font-medium">Mandatory Fees</span>
                  <span className="font-mono text-[#0D9488] font-bold">100% Free Forever</span>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-gray-200/80 flex items-center justify-between text-xs shadow-2xs">
                  <span className="text-slate-600 font-medium">Server Retention Policy</span>
                  <span className="font-mono text-[#2878C8] font-bold">7-Day Maximum Deletion</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. User Testimonials Section */}
      <TestimonialSection />

      {/* 6. Frequently Asked Questions Section */}
      <section id="faqs" className="py-14 sm:py-20 bg-[#F7F9FC] border-b border-gray-200 scroll-mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-white px-3.5 py-1.5 rounded-full border border-gray-200 inline-block shadow-2xs">
              Help & Answers
            </span>
            <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold tracking-tight text-[#102A43]">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Clear information about our free platform, legal principles, and document guidelines.
            </p>
          </div>

          <div className="space-y-3.5">
            {SITE_CONFIG.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-gray-200 bg-white overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 text-left font-bold text-[#102A43] text-sm sm:text-base flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D9488] cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-[#0D9488]' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-gray-100 pt-3.5 font-normal">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. Voluntary Support Us Section */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SupportSection onContinueFree={() => onNavigate('address-statement')} />
        </div>
      </section>

    </div>
  );
};
