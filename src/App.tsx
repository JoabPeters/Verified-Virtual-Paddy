/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActiveView } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ServiceA_GenuineBill } from './components/ServiceA_GenuineBill';
import { ServiceB_AddressStatement } from './components/ServiceB_AddressStatement';
import { DirectoryView } from './components/DirectoryView';
import { PrivacyTermsView } from './components/PrivacyTermsModal';
import { SupportSection } from './components/SupportSection';
import { VerificationTestSuite } from './components/VerificationTestSuite';
import { ToastProvider } from './components/ToastNotification';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('home');

  const handleNavigate = (view: ActiveView) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Ensure scroll resets when switching views
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeView]);

  return (
    <ToastProvider maxToasts={3}>
      <div className="min-h-screen flex flex-col bg-[#F7F9FC] text-[#172B4D] selection:bg-[#E8F7EF] selection:text-[#0D9488] font-sans">
        {/* Navigation Bar */}
        <Navbar activeView={activeView} onNavigate={handleNavigate} />

        {/* Main Content Area */}
        <main className="flex-1">
          {activeView === 'home' && (
            <HomeView onNavigate={handleNavigate} />
          )}

          {activeView === 'genuine-bill' && (
            <ServiceA_GenuineBill onBackHome={() => handleNavigate('home')} />
          )}

          {activeView === 'address-statement' && (
            <ServiceB_AddressStatement
              onBackHome={() => handleNavigate('home')}
              onOpenTerms={() => handleNavigate('terms')}
              onOpenPrivacy={() => handleNavigate('privacy')}
            />
          )}

          {activeView === 'directory' && (
            <DirectoryView onBackHome={() => handleNavigate('home')} />
          )}

          {activeView === 'terms' && (
            <PrivacyTermsView 
              initialTab="terms" 
              onBackHome={() => handleNavigate('home')} 
            />
          )}

          {activeView === 'privacy' && (
            <PrivacyTermsView 
              initialTab="privacy" 
              onBackHome={() => handleNavigate('home')} 
            />
          )}

          {activeView === 'support' && (
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
              <SupportSection onContinueFree={() => handleNavigate('home')} />
            </div>
          )}

          {activeView === 'tests' && (
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <div className="mb-6">
                <button
                  onClick={() => handleNavigate('home')}
                  className="inline-flex items-center gap-1.5 font-bold text-[#0D9488] hover:text-[#0A736A] hover:underline transition-colors cursor-pointer py-1 text-sm"
                >
                  ← Back to Home
                </button>
              </div>
              <VerificationTestSuite />
            </div>
          )}
        </main>

      {/* Floating WhatsApp Channel Shortcut */}
      <a
        href="https://chat.whatsapp.com/JEEA3cTAWXAHv0MVelmkQk"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Join the Verified Virtual Paddy WhatsApp channel"
        title="Join our WhatsApp channel"
        className="fixed left-3 sm:left-5 bottom-24 sm:bottom-8 z-[60] flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg ring-2 ring-white/80 transition-transform hover:scale-110 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40"
      >
        <svg viewBox="0 0 32 32" className="h-6 w-6" fill="currentColor" aria-hidden="true">
          <path d="M16.02 3.2A12.7 12.7 0 0 0 5.1 22.38L3.4 28.6l6.37-1.67A12.7 12.7 0 1 0 16.02 3.2Zm0 23.1c-1.9 0-3.76-.5-5.4-1.45l-.39-.23-3.78.99 1.01-3.68-.25-.4A10.04 10.04 0 1 1 16.02 26.3Zm5.52-7.52c-.3-.15-1.77-.87-2.05-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.68-2.08-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.02-1.05 2.48s1.08 2.88 1.23 3.08c.15.2 2.12 3.24 5.14 4.55.72.31 1.28.5 1.72.64.72.23 1.37.2 1.89.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.18-1.42-.08-.13-.28-.2-.58-.35Z"/>
        </svg>
      </a>

      {/* Trustworthy Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  </ToastProvider>
  );
}
