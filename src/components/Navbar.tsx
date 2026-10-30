import React, { useState, useRef, useEffect } from 'react';
import { ActiveView } from '../types';
import { 
  Menu, X, Heart, ChevronDown, Zap, FileText, 
  MapPin, HelpCircle, Shield, CheckCircle2, ArrowRight, Star
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

interface NavbarProps {
  activeView: ActiveView;
  onNavigate: (view: ActiveView) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeView, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close services dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (view: ActiveView) => {
    onNavigate(view);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    if (activeView !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 animate-header-gradient border-b border-white/15 text-white shadow-md backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-4">
          
          {/* Brand Logo & Name */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg p-1 -ml-1 transition-all cursor-pointer"
            aria-label="Verified Virtual Paddy Homepage"
          >
            {/* Distinctive Document-and-Checkmark Brand Symbol */}
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-slate-800 to-black flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform shrink-0 border border-white/20">
              {/* Document SVG Outline */}
              <svg 
                className="w-5 h-5 text-white" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
              </svg>
              {/* Verified Checkmark Badge */}
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#0D9488] text-white flex items-center justify-center text-[10px] ring-2 ring-black font-bold shadow-xs">
                ✓
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-white group-hover:text-emerald-300 transition-colors leading-tight">
                {SITE_CONFIG.brand.name}
              </span>
              <span className="text-[11px] text-white/90 font-medium hidden sm:block leading-tight">
                Your Digital Buddy for Document Assistance.
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links - All Text White */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-semibold text-white">
            {/* Home */}
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 rounded-lg transition-all cursor-pointer text-white ${
                activeView === 'home'
                  ? 'bg-white/20 text-white font-bold border-b-2 border-emerald-400 shadow-2xs'
                  : 'hover:text-white hover:bg-white/10'
              }`}
            >
              Home
            </button>

            {/* Services Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className={`px-3 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 text-white ${
                  activeView === 'genuine-bill' || activeView === 'address-statement' || activeView === 'directory'
                    ? 'bg-white/20 text-white font-bold border-b-2 border-emerald-400 shadow-2xs'
                    : 'hover:text-white hover:bg-white/10'
                }`}
                aria-expanded={servicesDropdownOpen}
              >
                <span className="text-white">Services</span>
                <ChevronDown className={`w-3.5 h-3.5 text-white transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-76 rounded-2xl bg-[#18181b] border border-white/20 shadow-2xl p-2.5 z-50 animate-toast-slide-in text-white backdrop-blur-xl">
                  <button
                    onClick={() => handleNavClick('genuine-bill')}
                    className="w-full p-3 rounded-xl hover:bg-white/10 text-left transition-colors flex items-start gap-3 group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-[#60a5fa] flex items-center justify-center shrink-0 group-hover:bg-[#2878C8] group-hover:text-white transition-colors border border-blue-500/30">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-emerald-300">
                        Electricity Bill Assistance
                      </div>
                      <div className="text-[11px] text-white/80 leading-snug mt-0.5">
                        Official Nigerian DisCo portals & WhatsApp channels
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('address-statement')}
                    className="w-full p-3 rounded-xl hover:bg-white/10 text-left transition-colors flex items-start gap-3 group cursor-pointer mt-1"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-[#34d399] flex items-center justify-center shrink-0 group-hover:bg-[#0D9488] group-hover:text-white transition-colors border border-emerald-500/30">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-emerald-300">
                        Address Document Generator
                      </div>
                      <div className="text-[11px] text-white/80 leading-snug mt-0.5">
                        Client-side PDF statement synthesis (Free)
                      </div>
                    </div>
                  </button>

                  <div className="border-t border-white/10 my-1.5"></div>

                  <button
                    onClick={() => handleNavClick('directory')}
                    className="w-full p-2.5 rounded-xl hover:bg-white/10 text-left transition-colors flex items-center gap-2.5 text-xs font-semibold text-white cursor-pointer"
                  >
                    <MapPin className="w-4 h-4 text-[#60a5fa]" />
                    <span className="text-white">36 States & DisCos Directory</span>
                  </button>
                </div>
              )}
            </div>

            {/* How It Works */}
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="px-3 py-2 rounded-lg transition-colors cursor-pointer text-white hover:text-white hover:bg-white/10"
            >
              How It Works
            </button>

            {/* Privacy */}
            <button
              onClick={() => handleNavClick('privacy')}
              className={`px-3 py-2 rounded-lg transition-all cursor-pointer text-white ${
                activeView === 'privacy' || activeView === 'terms'
                  ? 'bg-white/20 text-white font-bold border-b-2 border-emerald-400 shadow-2xs'
                  : 'hover:text-white hover:bg-white/10'
              }`}
            >
              Privacy
            </button>

            {/* Testimonials */}
            <button
              onClick={() => scrollToSection('testimonials')}
              className="px-3 py-2 rounded-lg transition-colors cursor-pointer text-white hover:text-white hover:bg-white/10"
            >
              Reviews
            </button>

            {/* FAQs */}
            <button
              onClick={() => scrollToSection('faqs')}
              className="px-3 py-2 rounded-lg transition-colors cursor-pointer text-white hover:text-white hover:bg-white/10 flex items-center gap-1.5"
            >
              <HelpCircle className="w-3.5 h-3.5 text-white" />
              <span className="text-white">FAQs</span>
            </button>

            {/* Support Us */}
            <button
              onClick={() => handleNavClick('support')}
              className={`px-3 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 text-white ${
                activeView === 'support'
                  ? 'bg-rose-500/30 text-white font-bold border-b-2 border-rose-400 shadow-2xs'
                  : 'hover:text-white hover:bg-white/10'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
              <span className="text-white">Support Us</span>
            </button>
          </nav>

          {/* Right Action: Get Started Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => handleNavClick('address-statement')}
              className="px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-extrabold text-white bg-[#0D9488] hover:bg-[#0A736A] active:bg-[#085C55] rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span className="text-white">Get Started — Free</span>
              <ArrowRight className="w-3.5 h-3.5 text-white hidden sm:inline" />
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 text-white hover:text-white hover:bg-white/15 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer - Animated Grey to Black Background with All White Text */}
      {mobileMenuOpen && (
        <div className="lg:hidden animate-header-gradient border-b border-white/20 px-4 pt-3 pb-6 space-y-2 text-white shadow-2xl animate-toast-slide-in backdrop-blur-xl">
          
          {/* Quick Service Direct Access Banners on Mobile */}
          <div className="grid grid-cols-2 gap-2.5 pb-2.5 border-b border-white/15">
            <button
              onClick={() => handleNavClick('address-statement')}
              className="p-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-left cursor-pointer flex flex-col justify-between transition-colors"
            >
              <FileText className="w-5 h-5 text-emerald-400 mb-1.5" />
              <span className="text-xs font-extrabold text-white">Address Document</span>
              <span className="text-[10px] text-emerald-300 font-semibold mt-0.5">Create PDF Free</span>
            </button>

            <button
              onClick={() => handleNavClick('genuine-bill')}
              className="p-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-left cursor-pointer flex flex-col justify-between transition-colors"
            >
              <Zap className="w-5 h-5 text-blue-400 mb-1.5" />
              <span className="text-xs font-extrabold text-white">Electricity Bills</span>
              <span className="text-[10px] text-blue-300 font-semibold mt-0.5">Official DisCos</span>
            </button>
          </div>

          <div className="space-y-1 pt-1 text-white">
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold cursor-pointer text-white ${
                activeView === 'home' ? 'bg-white/20 text-white' : 'hover:bg-white/10'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick('genuine-bill')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold flex items-center justify-between cursor-pointer text-white ${
                activeView === 'genuine-bill' ? 'bg-white/20 text-white' : 'hover:bg-white/10'
              }`}
            >
              <span className="flex items-center gap-2 text-white">
                <Zap className="w-4 h-4 text-blue-400" />
                <span className="text-white">Services: Electricity Bill Assistance</span>
              </span>
              <span className="text-[10px] bg-white/20 text-white font-bold px-2 py-0.5 rounded-full border border-white/30">DisCos</span>
            </button>

            <button
              onClick={() => handleNavClick('address-statement')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold flex items-center justify-between cursor-pointer text-white ${
                activeView === 'address-statement' ? 'bg-white/20 text-white' : 'hover:bg-white/10'
              }`}
            >
              <span className="flex items-center gap-2 text-white">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span className="text-white">Services: Address Document Generator</span>
              </span>
              <span className="text-[10px] bg-white/20 text-white font-bold px-2 py-0.5 rounded-full border border-white/30">PDF</span>
            </button>

            <button
              onClick={() => scrollToSection('how-it-works')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold hover:bg-white/10 cursor-pointer flex items-center gap-2 text-white"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-white">How It Works</span>
            </button>

            <button
              onClick={() => handleNavClick('directory')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold hover:bg-white/10 cursor-pointer flex items-center gap-2 text-white ${
                activeView === 'directory' ? 'bg-white/20 text-white' : ''
              }`}
            >
              <MapPin className="w-4 h-4 text-blue-400" />
              <span className="text-white">36 States & DisCos Directory</span>
            </button>

            <button
              onClick={() => handleNavClick('privacy')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold hover:bg-white/10 cursor-pointer flex items-center gap-2 text-white ${
                activeView === 'privacy' || activeView === 'terms' ? 'bg-white/20 text-white' : ''
              }`}
            >
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-white">Privacy & Legal Standards</span>
            </button>

            <button
              onClick={() => scrollToSection('testimonials')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold hover:bg-white/10 cursor-pointer flex items-center gap-2 text-white"
            >
              <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span className="text-white">User Testimonials & Reviews</span>
            </button>

            <button
              onClick={() => scrollToSection('faqs')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold hover:bg-white/10 cursor-pointer flex items-center gap-2 text-white"
            >
              <HelpCircle className="w-4 h-4 text-white" />
              <span className="text-white">Frequently Asked Questions</span>
            </button>

            <button
              onClick={() => handleNavClick('support')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold flex items-center justify-between cursor-pointer text-white ${
                activeView === 'support' ? 'bg-rose-500/30 text-white' : 'hover:bg-white/10 text-white'
              }`}
            >
              <span className="flex items-center gap-2 text-white">
                <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                <span className="text-white">Support Us (Voluntary)</span>
              </span>
              <span className="text-[10px] bg-white/20 text-white font-bold px-2 py-0.5 rounded-full border border-white/30">OPay / PalmPay / Moniepoint</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
