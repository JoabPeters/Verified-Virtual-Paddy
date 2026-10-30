import React, { useState } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { useToast } from './ToastNotification';
import { Check, Copy, Heart, AlertCircle, ArrowRight, Shield, Wallet } from 'lucide-react';

interface SupportSectionProps {
  onContinueFree?: () => void;
  isModal?: boolean;
}

export const SupportSection: React.FC<SupportSectionProps> = ({ onContinueFree, isModal = false }) => {
  const { toast } = useToast();
  const [copiedProvider, setCopiedProvider] = useState<string | null>(null);

  const handleCopy = (provider: string, accountNumber: string) => {
    navigator.clipboard.writeText(accountNumber);
    setCopiedProvider(provider);
    toast.success(
      'Account Number Copied',
      `${provider} account number ${accountNumber} copied to clipboard.`
    );
    setTimeout(() => {
      setCopiedProvider(null);
    }, 3000);
  };

  return (
    <section 
      id="support" 
      className={`rounded-2xl border border-gray-200 bg-white ${
        isModal ? 'p-6' : 'p-6 sm:p-10 shadow-sm'
      } relative overflow-hidden`}
    >
      {/* Decorative subtle background tint */}
      <div 
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-rose-50/60 blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Section Header */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-rose-800 bg-rose-50 px-3.5 py-1.5 rounded-full mb-3.5 border border-rose-200">
          <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
          <span>Voluntary Support</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#102A43]">
          Support Verified Virtual Paddy
        </h2>
        
        {/* Exact Prompt Message Required */}
        <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
          Verified Virtual Paddy is completely free. If our service has helped you, you can voluntarily support its development. Contributions are never required to use our services.
        </p>
      </div>

      {/* Mandatory Notice / Disclaimer */}
      <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-amber-950 font-bold">Voluntary Transfer Reminder:</strong> Before transferring, open your chosen banking app and confirm the recipient details shown by your payment provider. Transfers are 100% optional. Verified Virtual Paddy will never require a fee or donation to generate any document.
        </p>
      </div>

      {/* 3 Distinct Recognisable Support Cards: OPay, PalmPay, Moniepoint */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* CARD 1: OPAY (Emerald Green Accent) */}
        <div className="rounded-2xl border-2 border-[#0D9488]/30 bg-gradient-to-b from-[#E8F7EF] via-white to-white p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#0D9488] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  O
                </div>
                <span className="font-extrabold text-[#102A43] text-xl">OPay</span>
              </div>
              <span className="text-[11px] text-[#0D9488] font-bold px-2 py-0.5 rounded-full bg-white border border-[#0D9488]/30 shadow-2xs">
                Nigeria
              </span>
            </div>
            
            <p className="mt-3 text-xs text-slate-600 leading-relaxed">
              Open OPay app → Tap "Send Money" or "Transfer" → Enter Account Number.
            </p>

            {/* Account Number Box */}
            <div className="mt-5 p-3.5 rounded-xl bg-white border border-[#0D9488]/20 shadow-xs">
              <div className="text-[10px] uppercase tracking-wider font-bold text-slate-500">
                Account Number
              </div>
              <div className="mt-1 font-mono text-2xl font-extrabold tracking-wider text-[#102A43] select-all">
                8167224874
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Bank / Provider: <span className="font-semibold text-slate-700">OPay</span>
              </div>
            </div>
          </div>

          {/* Copy Account Button */}
          <button
            type="button"
            onClick={() => handleCopy('OPay', '8167224874')}
            className={`mt-5 w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D9488] ${
              copiedProvider === 'OPay'
                ? 'bg-[#0A736A] text-white'
                : 'bg-[#0D9488] hover:bg-[#0A736A] active:bg-[#085C55] text-white'
            }`}
          >
            {copiedProvider === 'OPay' ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied 8167224874</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Account Number</span>
              </>
            )}
          </button>
        </div>

        {/* CARD 2: PALMPAY (Soft Purple Accent #8064C2) */}
        <div className="rounded-2xl border-2 border-[#8064C2]/30 bg-gradient-to-b from-[#F3E8FF] via-white to-white p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#8064C2] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  P
                </div>
                <span className="font-extrabold text-[#102A43] text-xl">PalmPay</span>
              </div>
              <span className="text-[11px] text-[#8064C2] font-bold px-2 py-0.5 rounded-full bg-white border border-[#8064C2]/30 shadow-2xs">
                Nigeria
              </span>
            </div>
            
            <p className="mt-3 text-xs text-slate-600 leading-relaxed">
              Open PalmPay app → Tap "Send Money" → To Bank or PalmPay Account.
            </p>

            {/* Account Number Box */}
            <div className="mt-5 p-3.5 rounded-xl bg-white border border-[#8064C2]/20 shadow-xs">
              <div className="text-[10px] uppercase tracking-wider font-bold text-slate-500">
                Account Number
              </div>
              <div className="mt-1 font-mono text-2xl font-extrabold tracking-wider text-[#102A43] select-all">
                8167224874
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Bank / Provider: <span className="font-semibold text-slate-700">PalmPay</span>
              </div>
            </div>
          </div>

          {/* Copy Account Button */}
          <button
            type="button"
            onClick={() => handleCopy('PalmPay', '8167224874')}
            className={`mt-5 w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8064C2] ${
              copiedProvider === 'PalmPay'
                ? 'bg-[#673AB7] text-white'
                : 'bg-[#8064C2] hover:bg-[#6D51AF] active:bg-[#5E429E] text-white'
            }`}
          >
            {copiedProvider === 'PalmPay' ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied 8167224874</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Account Number</span>
              </>
            )}
          </button>
        </div>

        {/* CARD 3: MONIEPOINT (Royal Blue Accent #2878C8) */}
        <div className="rounded-2xl border-2 border-[#2878C8]/30 bg-gradient-to-b from-[#EFF6FF] via-white to-white p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#2878C8] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  M
                </div>
                <span className="font-extrabold text-[#102A43] text-xl">Moniepoint</span>
              </div>
              <span className="text-[11px] text-[#2878C8] font-bold px-2 py-0.5 rounded-full bg-white border border-[#2878C8]/30 shadow-2xs">
                MFB
              </span>
            </div>
            
            <p className="mt-3 text-xs text-slate-600 leading-relaxed">
              Open your bank app or Moniepoint → Transfer to Moniepoint MFB.
            </p>

            {/* Account Number Box */}
            <div className="mt-5 p-3.5 rounded-xl bg-white border border-[#2878C8]/20 shadow-xs">
              <div className="text-[10px] uppercase tracking-wider font-bold text-slate-500">
                Account Number
              </div>
              <div className="mt-1 font-mono text-2xl font-extrabold tracking-wider text-[#102A43] select-all">
                8167224874
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Bank / Provider: <span className="font-semibold text-slate-700">Moniepoint MFB</span>
              </div>
            </div>
          </div>

          {/* Copy Account Button */}
          <button
            type="button"
            onClick={() => handleCopy('Moniepoint', '8167224874')}
            className={`mt-5 w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2878C8] ${
              copiedProvider === 'Moniepoint'
                ? 'bg-[#1E62A8] text-white'
                : 'bg-[#2878C8] hover:bg-[#1E62A8] active:bg-[#154E88] text-white'
            }`}
          >
            {copiedProvider === 'Moniepoint' ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied 8167224874</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Account Number</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* Security Clarity & Continue For Free Option */}
      <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs sm:text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#0D9488] shrink-0" />
          <span>No card details, PINs, or BVN will ever be requested. Completely optional.</span>
        </div>

        {onContinueFree && (
          <button
            type="button"
            onClick={onContinueFree}
            className="inline-flex items-center gap-1.5 font-bold text-[#0D9488] hover:text-[#0A736A] hover:underline transition-colors py-2 px-3 rounded-lg cursor-pointer shrink-0"
          >
            <span>Continue for Free</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </section>
  );
};
