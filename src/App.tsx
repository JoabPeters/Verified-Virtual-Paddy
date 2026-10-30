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

      {/* Trustworthy Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  </ToastProvider>
  );
}
