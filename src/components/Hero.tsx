import React from 'react';
import { ActiveView } from '../types';
import { ArrowRight, CheckCircle2, Lock, Building2, HelpCircle, FileCheck, Zap, ShieldCheck } from 'lucide-react';
import heroImg from '../assets/images/hero_nigerian_smartphone_1793356558895.jpg';

interface HeroProps {
  onNavigate: (view: ActiveView) => void;
  onScrollToHowItWorks?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onScrollToHowItWorks }) => {
  return (
    <div className="relative bg-black text-white pt-12 pb-16 sm:pt-16 sm:pb-24 overflow-hidden border-b border-zinc-800 shadow-sm">
      
      {/* Subtle Background Glows */}
      <div 
        className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/[0.03] blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#0D9488]/15 blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />
      
      {/* Light Geometric SVG Grid Pattern in Background */}
      <div 
        className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 text-center lg:text-left">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 text-xs font-bold text-white bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#0D9488] ring-2 ring-emerald-400 animate-pulse" />
              <span className="text-white">Free Nigerian Document Assistance · No Sign-Up · 100% Client-Side</span>
            </div>

            {/* Exact Required Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] text-balance">
              Your Documents, Made Easier.
            </h1>

            {/* Supporting Text */}
            <p className="mt-4 sm:mt-5 text-base sm:text-lg text-white leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              Paddy helps Nigerians with electricity bill assistance and address documents. Fast, secure, completely free, and processed safely in your browser memory.
            </p>

            {/* Call to Actions */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              
              {/* Primary Green Action Button */}
              <button
                onClick={() => onNavigate('address-statement')}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#0D9488] hover:bg-[#0A736A] active:bg-[#085C55] text-white font-bold text-base flex items-center justify-center gap-2.5 cursor-pointer shadow-lg hover:shadow-xl transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-white"
              >
                <FileCheck className="w-5 h-5 text-white" />
                <span className="text-white">Get Started — Free</span>
                <ArrowRight className="w-4 h-4 ml-0.5 text-white" />
              </button>

              {/* Secondary Electricity Bill Action */}
              <button
                onClick={() => onNavigate('genuine-bill')}
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/15 text-white border border-white/25 backdrop-blur-sm font-semibold text-base flex items-center justify-center gap-2 cursor-pointer transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Zap className="w-5 h-5 text-amber-300" />
                <span className="text-white">Electricity Bill Help</span>
              </button>

              {/* Tertiary How It Works Button */}
              <button
                onClick={onScrollToHowItWorks}
                className="w-full sm:w-auto px-4 py-4 text-white hover:text-emerald-300 font-semibold text-sm flex items-center justify-center gap-1.5 cursor-pointer transition-colors focus:outline-none focus-visible:underline"
              >
                <HelpCircle className="w-4 h-4 text-white" />
                <span className="text-white">How It Works</span>
              </button>
            </div>

            {/* Key Trust Signals Bar */}
            <div className="mt-10 pt-6 border-t border-white/20 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2.5 text-xs sm:text-sm text-white">
              <div className="flex items-center gap-2 text-white">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-semibold text-white">100% Free Forever</span>
              </div>
              <span aria-hidden="true" className="text-white/40 hidden sm:inline">·</span>
              <div className="flex items-center gap-2 text-white">
                <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-semibold text-white">In-Browser RAM Synthesis Only</span>
              </div>
              <span aria-hidden="true" className="text-white/40 hidden sm:inline">·</span>
              <div className="flex items-center gap-2 text-white">
                <Building2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-semibold text-white">All 36 States + FCT DisCos</span>
              </div>
            </div>

          </div>

          {/* Right Column: High Quality Realistic Nigerian Hero Photograph */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div className="relative mx-auto max-w-md lg:max-w-none w-full">
              
              {/* Outer Glow & Gradient Framing (Navy, Royal Blue, and Emerald Green) */}
              <div className="relative rounded-3xl p-2 sm:p-2.5 bg-gradient-to-br from-[#2878C8]/40 via-[#0D9488]/30 to-[#102A43] border border-white/20 shadow-2xl backdrop-blur-sm group">
                
                {/* Ambient glow effect */}
                <div 
                  className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-[#2878C8]/30 to-[#0D9488]/30 blur-xl opacity-75 -z-10 group-hover:opacity-100 transition-opacity" 
                  aria-hidden="true"
                />

                {/* Hero Photograph Container */}
                <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-zinc-900 border border-white/10 shadow-inner">
                  <img
                    src={heroImg}
                    alt="Happy smiling young Nigerian adult holding and using a smartphone for document assistance in a bright modern home"
                    loading="eager"
                    className="w-full h-full object-cover object-top hover:scale-[1.03] transition-transform duration-700 ease-out"
                  />
                  
                  {/* Subtle dark gradient overlay at base for high-contrast badge legibility */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" 
                    aria-hidden="true"
                  />

                  {/* Trust overlay badges */}
                  <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2">
                    <div className="bg-black/70 backdrop-blur-md border border-white/20 rounded-xl px-3 py-1.5 flex items-center gap-2 shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-[#0D9488] ring-2 ring-emerald-300 animate-pulse" />
                      <span className="text-xs font-semibold text-white tracking-wide">Instant In-Browser Synthesis</span>
                    </div>

                    <div className="bg-[#0D9488]/90 backdrop-blur-md border border-emerald-300/30 rounded-xl px-2.5 py-1.5 flex items-center gap-1.5 shadow-lg">
                      <ShieldCheck className="w-3.5 h-3.5 text-white shrink-0" />
                      <span className="text-[11px] font-bold text-white">Zero Server Upload</span>
                    </div>
                  </div>
                </div>

                {/* Bottom interactive helper bar */}
                <div className="mt-3 pt-2.5 pb-1 border-t border-white/15 flex items-center justify-between px-2 text-xs text-zinc-300">
                  <span className="font-medium text-[11px] text-zinc-300">
                    Takes under 2 minutes · 100% Free
                  </span>
                  <button
                    onClick={() => onNavigate('address-statement')}
                    className="font-bold text-emerald-300 hover:text-emerald-200 inline-flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>Create statement</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
