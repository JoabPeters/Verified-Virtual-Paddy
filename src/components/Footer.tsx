import React from 'react';
import { ActiveView } from '../types';
import { SITE_CONFIG } from '../config/siteConfig';
import { ShieldCheck, Heart, Lock, Mail, FileText, Zap, ChevronRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: ActiveView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#102A43] text-white border-t border-slate-800 pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-700/80">
          
          {/* Col 1: Wordmark & Mission */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0D9488] flex items-center justify-center text-white font-bold shadow-xs">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-white text-lg tracking-tight">
                {SITE_CONFIG.brand.name}
              </span>
            </div>
            <p className="text-xs text-white leading-relaxed">
              {SITE_CONFIG.brand.tagline} A free, transparent civic digital platform helping Nigerians navigate official utility channels and draft customer-prepared address statements.
            </p>
            <div className="text-[11px] text-white font-semibold flex items-center gap-1.5 pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>100% Free · Client-Side Only · No Paywalls</span>
            </div>
          </div>

          {/* Col 2: Services & Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#2878C8]" />
              <span>Services & Tools</span>
            </h4>
            <ul className="space-y-2 text-xs text-white">
              <li>
                <button
                  onClick={() => onNavigate('genuine-bill')}
                  className="hover:text-emerald-300 hover:underline transition-colors text-white text-left cursor-pointer flex items-center gap-1"
                >
                  <ChevronRight className="w-3 h-3 text-white" />
                  <span>Genuine Electricity Bill Directory</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('address-statement')}
                  className="hover:text-emerald-300 hover:underline transition-colors text-white text-left cursor-pointer flex items-center gap-1"
                >
                  <ChevronRight className="w-3 h-3 text-white" />
                  <span>Customer-Prepared Address Statement</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('directory')}
                  className="hover:text-emerald-300 hover:underline transition-colors text-white text-left cursor-pointer flex items-center gap-1"
                >
                  <ChevronRight className="w-3 h-3 text-white" />
                  <span>Nigerian 36 States & DisCos Directory</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tests')}
                  className="hover:text-emerald-300 hover:underline transition-colors text-white text-left cursor-pointer flex items-center gap-1"
                >
                  <ChevronRight className="w-3 h-3 text-white" />
                  <span>Automated QA Test Suite</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Governance */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>Legal & Privacy</span>
            </h4>
            <ul className="space-y-2 text-xs text-white">
              <li>
                <button
                  onClick={() => onNavigate('privacy')}
                  className="hover:text-emerald-300 hover:underline transition-colors text-white text-left cursor-pointer flex items-center gap-1"
                >
                  <ChevronRight className="w-3 h-3 text-white" />
                  <span>Privacy Policy & Deletion Standards</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('terms')}
                  className="hover:text-emerald-300 hover:underline transition-colors text-white text-left cursor-pointer flex items-center gap-1"
                >
                  <ChevronRight className="w-3 h-3 text-white" />
                  <span>Terms and Conditions</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('support')}
                  className="hover:text-emerald-300 hover:underline transition-colors text-white text-left flex items-center gap-1.5 cursor-pointer pt-1"
                >
                  <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                  <span>Voluntary Project Support</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Disclaimers */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Civic Inquiries & Help
            </h4>
            <p className="text-xs text-white leading-relaxed mb-2.5">
              Questions, directory corrections, or consumer assistance:
            </p>
            <div className="space-y-2 text-xs text-white">
              <div className="flex items-center gap-2 text-white">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="text-white hover:text-emerald-300 hover:underline transition-colors break-all"
                >
                  {SITE_CONFIG.contact.email}
                </a>
              </div>
              <div className="text-[11px] text-white pl-5.5">
                Complaints:{" "}
                <a
                  href={`mailto:${SITE_CONFIG.contact.complaintsEmail}`}
                  className="text-white hover:text-emerald-300 hover:underline transition-colors break-all"
                >
                  {SITE_CONFIG.contact.complaintsEmail}
                </a>
              </div>
            </div>
            <div className="mt-3 text-[11px] text-white">
              {SITE_CONFIG.contact.physicalAddress}
            </div>
          </div>

        </div>

        {/* Concise Statutory Reminder */}
        <div className="py-3.5 my-6 rounded-xl bg-slate-900/80 border border-slate-700 px-4 text-center">
          <p className="text-xs text-white leading-relaxed">
            <strong className="text-white font-bold">Statutory Notice:</strong> Customer-prepared address statements generated on this platform are self-declared personal documents. They are not official electricity bills issued or verified by electricity distribution companies (DisCos).
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white">
          <div className="text-white">
            © {new Date().getFullYear()} {SITE_CONFIG.brand.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5 text-white">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-white">Browser-side synthesis. Zero personal files stored on remote servers.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
