import React, { useState, useMemo } from 'react';
import { AddressStatementFormData, FormErrors } from '../types';
import { NIGERIAN_STATES, NIGERIAN_DISCOS } from '../data/nigeriaData';
import { validateAddressStatementForm, formatNigerianPhoneForDisplay } from '../utils/validation';
import { generateAddressStatementPdf, downloadPdfBlob, GeneratedPdfResult } from '../utils/pdfGenerator';
import { GenerationProgressBar } from './GenerationProgressBar';
import { useToast } from './ToastNotification';
import { DocumentPreviewModal, PreviewPresentationMode } from './DocumentPreviewModal';
import { 
  FileText, CheckCircle2, AlertTriangle, ArrowRight, ArrowLeft, 
  Download, RefreshCw, Eye, Lock, Info, ArrowDown, Loader2, Columns, Maximize2,
  ChevronRight, Sparkles, ShieldCheck
} from 'lucide-react';

interface ServiceBProps {
  onBackHome?: () => void;
  onOpenTerms?: () => void;
  onOpenPrivacy?: () => void;
}

const INITIAL_FORM: AddressStatementFormData = {
  fullName: '',
  phoneNumber: '',
  residentialAddress: '',
  state: 'Lagos',
  lga: 'Ikeja',
  electricityProvider: 'Ikeja Electric Plc',
  meterOrAccountNumber: '',
  agreedToTerms: false,
  acknowledgedLimitations: false,
};

export const ServiceB_AddressStatement: React.FC<ServiceBProps> = ({ 
  onBackHome,
  onOpenTerms, 
  onOpenPrivacy 
}) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<'form' | 'review' | 'result'>('form');
  const [formData, setFormData] = useState<AddressStatementFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [pdfResult, setPdfResult] = useState<GeneratedPdfResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationStatusText, setGenerationStatusText] = useState('Validating details...');
  const [generationSubText, setGenerationSubText] = useState('Checking declared address');
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Read-only modal or side-panel preview state
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState<PreviewPresentationMode>('modal');

  const handleOpenPreview = (mode: PreviewPresentationMode = 'modal') => {
    setPreviewMode(mode);
    setIsPreviewOpen(true);
  };

  // Available LGAs for current selected state
  const selectedStateObj = useMemo(() => {
    return NIGERIAN_STATES.find(s => s.name === formData.state) || NIGERIAN_STATES[0];
  }, [formData.state]);

  const handleFieldChange = (field: keyof AddressStatementFormData, value: any) => {
    setFormData(prev => {
      const next = { ...prev, [field]: value };
      // If state changed, update LGA to first in state
      if (field === 'state') {
        const found = NIGERIAN_STATES.find(s => s.name === value);
        if (found && found.lgas.length > 0) {
          next.lga = found.lgas[0];
          // Suggest primary provider
          if (found.primaryDisCos.length > 0) {
            const disco = NIGERIAN_DISCOS[found.primaryDisCos[0]];
            if (disco) next.electricityProvider = disco.name;
          }
        }
      }
      return next;
    });

    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleProceedToReview = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateAddressStatementForm(formData);
    
    // In step 1, ignore terms agreement errors yet
    delete validationErrors.agreedToTerms;
    delete validationErrors.acknowledgedLimitations;

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstKey = Object.keys(validationErrors)[0];
      const element = document.getElementById(firstKey);
      if (element) element.focus();
      return;
    }

    setErrors({});
    setCurrentStep('review');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleGeneratePdf = async () => {
    // Validate terms & limitations in review step
    const validationErrors: FormErrors = {};
    if (!formData.agreedToTerms) {
      validationErrors.agreedToTerms = 'You must declare that your address details are truthful.';
    }
    if (!formData.acknowledgedLimitations) {
      validationErrors.acknowledgedLimitations = 'You must acknowledge the legal limitations of this customer-prepared document.';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsGenerating(true);
    setGenerationError(null);
    setGenerationProgress(15);
    setGenerationStatusText('Validating declared address details & statutory consent...');
    setGenerationSubText('Checking Nigerian LGA, state formatting, and identity declaration');
    setErrors({});

    try {
      await sleep(350);
      setGenerationProgress(45);
      setGenerationStatusText('Applying official A4 legal layout & statutory disclaimer...');
      setGenerationSubText('Enforcing non-official DisCo notices and customer-prepared legal statement');

      await sleep(400);
      setGenerationProgress(75);
      setGenerationStatusText('Synthesizing high-resolution vector PDF in device memory...');
      setGenerationSubText('Compiling client-side jsPDF document blob with zero cloud upload');

      // Pure in-browser client-side generation
      const result = await generateAddressStatementPdf(formData);

      await sleep(350);
      setGenerationProgress(95);
      setGenerationStatusText('Finalizing encrypted document package...');
      setGenerationSubText('Preparing secure preview iframe and download prompt');

      await sleep(300);
      setGenerationProgress(100);
      setGenerationStatusText('Document Successfully Generated!');
      setGenerationSubText('Your Customer-Prepared Address Statement is ready to download');

      await sleep(250);
      setPdfResult(result);
      setCurrentStep('result');
      toast.success(
        'Document Generated Successfully',
        'Your Customer-Prepared Address Statement is ready for review and download.'
      );
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('PDF Generation failed:', err);
      const errorMsg = 'An unexpected error occurred while generating the document. Please verify your form inputs and try again.';
      setGenerationError(errorMsg);
      setGenerationProgress(0);
      toast.error('Generation Failed', 'Could not synthesize document. Please review your details and try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!pdfResult) return;
    downloadPdfBlob(pdfResult.blob, pdfResult.fileName);
    setDownloadSuccess(true);
    toast.success(
      'Download Started',
      `${pdfResult.fileName} has been saved to your downloads.`
    );
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  const handleStartAgain = () => {
    setFormData(INITIAL_FORM);
    setErrors({});
    setGenerationError(null);
    setGenerationProgress(0);
    setPdfResult(null);
    setCurrentStep('form');
    setDownloadSuccess(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deviceDateString = useMemo(() => {
    return new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }, []);

  return (
    <div className="bg-[#F7F9FC] text-[#172B4D] min-h-[85vh] py-8 sm:py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Aids: Back to Home & Breadcrumbs */}
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
            <span className="text-slate-700 font-semibold">Address Statement</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#0D9488] font-bold">
              {currentStep === 'form' && 'Step 1: Details'}
              {currentStep === 'review' && 'Step 2: Review'}
              {currentStep === 'result' && 'Step 3: Download'}
            </span>
          </nav>
        </div>

        {/* Title & Privacy Badge */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="text-xs font-bold text-[#0D9488] bg-[#E8F7EF] px-3.5 py-1.5 rounded-full inline-flex items-center gap-2 border border-[#0D9488]/20 mb-3 shadow-2xs">
            <Lock className="w-3.5 h-3.5 text-[#0D9488]" />
            <span>Client-Side Private Memory · Zero Cloud Uploads</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#102A43] leading-tight">
            Customer-Prepared Address Statement
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto font-normal">
            Prepare a clean, standard, downloadable PDF containing your own declared residential address and contact details. Built entirely in your browser memory.
          </p>
        </div>

        {/* Multi-Stage Step Indicators */}
        <div className="mb-8 p-3 rounded-2xl bg-white border border-gray-200 shadow-xs flex items-center justify-around text-xs sm:text-sm font-semibold">
          
          <button
            onClick={() => currentStep !== 'form' && setCurrentStep('form')}
            className={`flex items-center gap-2 py-1 px-2.5 rounded-lg transition-colors ${
              currentStep === 'form' 
                ? 'text-[#0D9488] bg-[#E8F7EF] font-bold' 
                : 'text-slate-600 hover:text-slate-900 cursor-pointer'
            }`}
          >
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              currentStep === 'form' ? 'bg-[#0D9488] text-white' : 'bg-slate-200 text-slate-700'
            }`}>
              1
            </span>
            <span className="hidden sm:inline">1. Enter Details</span>
            <span className="sm:hidden">Details</span>
          </button>

          <span className="text-slate-300">→</span>

          <div className={`flex items-center gap-2 py-1 px-2.5 rounded-lg ${
            currentStep === 'review' 
              ? 'text-[#0D9488] bg-[#E8F7EF] font-bold' 
              : 'text-slate-600'
          }`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              currentStep === 'review' ? 'bg-[#0D9488] text-white' : currentStep === 'result' ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-700'
            }`}>
              2
            </span>
            <span className="hidden sm:inline">2. Review & Consent</span>
            <span className="sm:hidden">Review</span>
          </div>

          <span className="text-slate-300">→</span>

          <div className={`flex items-center gap-2 py-1 px-2.5 rounded-lg ${
            currentStep === 'result' 
              ? 'text-[#DC3545] bg-red-50 font-bold' 
              : 'text-slate-600'
          }`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              currentStep === 'result' ? 'bg-[#DC3545] text-white' : 'bg-slate-200 text-slate-700'
            }`}>
              3
            </span>
            <span className="hidden sm:inline">3. Download PDF</span>
            <span className="sm:hidden">Download</span>
          </div>
        </div>

        {/* STEP 1: FORM INPUTS */}
        {currentStep === 'form' && (
          <form onSubmit={handleProceedToReview} className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-10 shadow-sm">
            
            {/* Informational Guidance Banner */}
            <div className="mb-6 p-4 rounded-xl bg-[#E8F7EF] border border-[#0D9488]/20 text-xs sm:text-sm text-emerald-950 leading-relaxed flex items-start gap-3">
              <Info className="w-5 h-5 text-[#0D9488] shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold text-[#102A43]">Self-Declared Verification Standard:</strong> Ensure the details provided below match your valid government identification (NIN, Voter Card, International Passport, or Driver's License) to maintain validity during personal address verification.
              </div>
            </div>

            {/* Field Section 1: Applicant Personal Details */}
            <div className="mb-8">
              <h2 className="text-base font-bold text-[#102A43] pb-2 border-b border-gray-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0D9488]" />
                <span>1. Applicant Identification</span>
              </h2>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Legal Name */}
                <div>
                  <label htmlFor="fullName" className="block text-xs font-bold text-[#102A43] mb-1.5">
                    Full Legal Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleFieldChange('fullName', e.target.value)}
                    placeholder="e.g. Chinedu Emeka Okafor"
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D9488] transition-all ${
                      errors.fullName ? 'border-red-500 bg-red-50/40' : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1 font-medium">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Nigerian Phone Number */}
                <div>
                  <label htmlFor="phoneNumber" className="block text-xs font-bold text-[#102A43] mb-1.5">
                    Nigerian Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => handleFieldChange('phoneNumber', e.target.value)}
                    placeholder="e.g. 0803 123 4567 or +234 803 123 4567"
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D9488] transition-all ${
                      errors.phoneNumber ? 'border-red-500 bg-red-50/40' : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  />
                  {errors.phoneNumber && (
                    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1 font-medium">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>{errors.phoneNumber}</span>
                    </p>
                  )}
                  <p className="mt-1 text-[11px] text-slate-500">
                    Accepts standard Nigerian prefixes (070, 080, 081, 090, 091).
                  </p>
                </div>
              </div>
            </div>

            {/* Field Section 2: Residential Address Details */}
            <div className="mb-8">
              <h2 className="text-base font-bold text-[#102A43] pb-2 border-b border-gray-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0D9488]" />
                <span>2. Residential Address in Nigeria</span>
              </h2>

              <div className="mt-4 space-y-5">
                {/* Street Address */}
                <div>
                  <label htmlFor="residentialAddress" className="block text-xs font-bold text-[#102A43] mb-1.5">
                    Residential Street Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="residentialAddress"
                    rows={2}
                    value={formData.residentialAddress}
                    onChange={(e) => handleFieldChange('residentialAddress', e.target.value)}
                    placeholder="e.g. Flat 4B, Plot 12 Admiralty Way, Lekki Phase 1"
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D9488] transition-all resize-none ${
                      errors.residentialAddress ? 'border-red-500 bg-red-50/40' : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  />
                  {errors.residentialAddress && (
                    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1 font-medium">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>{errors.residentialAddress}</span>
                    </p>
                  )}
                </div>

                {/* State & LGA Dropdowns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="state" className="block text-xs font-bold text-[#102A43] mb-1.5">
                      State / FCT <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="state"
                      value={formData.state}
                      onChange={(e) => handleFieldChange('state', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488] cursor-pointer"
                    >
                      {NIGERIAN_STATES.map((state) => (
                        <option key={state.code} value={state.name}>
                          {state.name} {state.name === 'Federal Capital Territory' ? '(Abuja)' : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="lga" className="block text-xs font-bold text-[#102A43] mb-1.5">
                      Local Government Area (LGA) <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="lga"
                      value={formData.lga}
                      onChange={(e) => handleFieldChange('lga', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488] cursor-pointer"
                    >
                      {selectedStateObj.lgas.map((lga) => (
                        <option key={lga} value={lga}>
                          {lga}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Field Section 3: Utility & Area Context (Optional) */}
            <div className="mb-8">
              <h2 className="text-base font-bold text-[#102A43] pb-2 border-b border-gray-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#2878C8]" />
                <span>3. Utility Affiliation Context</span>
              </h2>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="electricityProvider" className="block text-xs font-bold text-[#102A43] mb-1.5">
                    Operating Electricity Company (DisCo)
                  </label>
                  <input
                    id="electricityProvider"
                    type="text"
                    value={formData.electricityProvider}
                    onChange={(e) => handleFieldChange('electricityProvider', e.target.value)}
                    placeholder="e.g. Ikeja Electric Plc, EKEDC, AEDC"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
                  />
                  <p className="mt-1 text-[11px] text-slate-500">
                    Auto-suggested based on selected state.
                  </p>
                </div>

                <div>
                  <label htmlFor="meterOrAccountNumber" className="block text-xs font-bold text-[#102A43] mb-1.5">
                    Meter Number or Account (Optional Reference)
                  </label>
                  <input
                    id="meterOrAccountNumber"
                    type="text"
                    value={formData.meterOrAccountNumber}
                    onChange={(e) => handleFieldChange('meterOrAccountNumber', e.target.value)}
                    placeholder="e.g. 01011500248 or 45012398711"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
                  />
                  <p className="mt-1 text-[11px] text-slate-500">
                    Optional reference field. Will not simulate consumption or tariff billing.
                  </p>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleStartAgain}
                  className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Reset Form
                </button>

                {/* Pre-submission Preview Button */}
                <button
                  type="button"
                  onClick={() => handleOpenPreview('modal')}
                  className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-[#0D9488] bg-[#E8F7EF] hover:bg-emerald-100/80 border border-[#0D9488]/20 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Eye className="w-4 h-4 text-[#0D9488]" />
                  <span>Preview Statement</span>
                </button>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#0D9488] hover:bg-[#0A736A] active:bg-[#085C55] text-white font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D9488]"
              >
                <span>Review Statement</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        )}

        {/* STEP 2: REVIEW & AFFIRMATION */}
        {currentStep === 'review' && (
          <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-10 shadow-sm">
            
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4">
              <div>
                <span className="text-xs font-bold text-[#0D9488] uppercase tracking-wider">
                  Step 2 of 3 · Verification & Affirmation
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#102A43] mt-0.5">
                  Review Your Entered Information
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setCurrentStep('form')}
                className="text-xs sm:text-sm font-bold text-[#0D9488] hover:text-[#0A736A] flex items-center gap-1 hover:underline cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Edit Details</span>
              </button>
            </div>

            {/* Structured Summary Table */}
            <div className="rounded-xl border border-gray-200 overflow-hidden divide-y divide-gray-100 text-xs sm:text-sm">
              <div className="p-4 bg-slate-50 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                <span className="font-bold text-slate-500 text-xs uppercase tracking-wider">Full Legal Name</span>
                <span className="font-bold text-[#102A43] text-sm sm:text-base">{formData.fullName}</span>
              </div>

              <div className="p-4 bg-white flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                <span className="font-bold text-slate-500 text-xs uppercase tracking-wider">Phone Number</span>
                <span className="font-mono font-semibold text-slate-900">{formatNigerianPhoneForDisplay(formData.phoneNumber)}</span>
              </div>

              <div className="p-4 bg-slate-50 flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                <span className="font-bold text-slate-500 text-xs uppercase tracking-wider shrink-0">Residential Address</span>
                <span className="font-bold text-[#102A43] text-right sm:max-w-md">{formData.residentialAddress}</span>
              </div>

              <div className="p-4 bg-white flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                <span className="font-bold text-slate-500 text-xs uppercase tracking-wider">State & Local Government</span>
                <span className="font-semibold text-slate-900">{formData.state} State · {formData.lga} LGA</span>
              </div>

              <div className="p-4 bg-slate-50 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                <span className="font-bold text-slate-500 text-xs uppercase tracking-wider">Power Provider Context</span>
                <span className="font-medium text-slate-800">{formData.electricityProvider || 'Not specified'}</span>
              </div>

              {formData.meterOrAccountNumber && (
                <div className="p-4 bg-white flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                  <span className="font-bold text-slate-500 text-xs uppercase tracking-wider">Meter Reference</span>
                  <span className="font-mono font-semibold text-slate-800">{formData.meterOrAccountNumber}</span>
                </div>
              )}

              <div className="p-4 bg-slate-50 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                <span className="font-bold text-slate-500 text-xs uppercase tracking-wider">Date of Statement</span>
                <span className="font-semibold text-slate-700">{deviceDateString}</span>
              </div>
            </div>

            {/* Statutory Truthfulness Affirmation Checkboxes */}
            <div className="mt-8 space-y-4 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-bold text-[#102A43] uppercase tracking-wider">
                Statutory Affirmations & Consents
              </h3>

              {/* Checkbox 1: Truthfulness */}
              <label className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 hover:border-gray-300 bg-white cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={formData.agreedToTerms}
                  onChange={(e) => handleFieldChange('agreedToTerms', e.target.checked)}
                  className="w-5 h-5 mt-0.5 rounded text-[#0D9488] focus:ring-[#0D9488] border-gray-300 cursor-pointer"
                />
                <span className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  <strong className="text-[#102A43] font-bold">I declare under affirmance</strong> that the personal name and residential address entered above accurately reflect my actual residence, and I understand this statement is created under my own responsibility.
                </span>
              </label>
              {errors.agreedToTerms && (
                <p className="text-xs text-red-600 flex items-center gap-1 pl-1 font-medium">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{errors.agreedToTerms}</span>
                </p>
              )}

              {/* Checkbox 2: Limitations Notice */}
              <label className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 hover:border-gray-300 bg-white cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={formData.acknowledgedLimitations}
                  onChange={(e) => handleFieldChange('acknowledgedLimitations', e.target.checked)}
                  className="w-5 h-5 mt-0.5 rounded text-[#0D9488] focus:ring-[#0D9488] border-gray-300 cursor-pointer"
                />
                <span className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  <strong className="text-[#102A43] font-bold">I acknowledge the document limitations:</strong> This document is a customer-prepared address statement and NOT an official utility bill issued or validated by an electricity distribution company (DisCo).
                </span>
              </label>
              {errors.acknowledgedLimitations && (
                <p className="text-xs text-red-600 flex items-center gap-1 pl-1 font-medium">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{errors.acknowledgedLimitations}</span>
                </p>
              )}
            </div>

            {/* Generation Progress Bar Component */}
            {isGenerating && (
              <div className="mt-6">
                <GenerationProgressBar
                  progress={generationProgress}
                  statusText={generationStatusText}
                  subText={generationSubText}
                  error={generationError}
                />
              </div>
            )}

            {/* Error Message if Generation Failed */}
            {generationError && (
              <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200 text-xs sm:text-sm text-red-800 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Generation Error:</strong> {generationError}
                </div>
              </div>
            )}

            {/* Review Actions */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep('form')}
                  disabled={isGenerating}
                  className="px-4 py-2.5 rounded-xl border border-gray-300 text-slate-700 hover:bg-slate-50 font-bold text-xs sm:text-sm transition-colors cursor-pointer disabled:opacity-50"
                >
                  Edit Details
                </button>
                
                {/* Preview Document in Modal */}
                <button
                  type="button"
                  onClick={() => handleOpenPreview('modal')}
                  disabled={isGenerating}
                  className="px-4 py-2.5 rounded-xl bg-[#EFF6FF] border border-[#2878C8]/20 text-[#2878C8] hover:bg-blue-100/70 font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-2xs"
                >
                  <Eye className="w-4 h-4 text-[#2878C8]" />
                  <span>Preview Document</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleGeneratePdf}
                disabled={isGenerating}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#0D9488] hover:bg-[#0A736A] active:bg-[#085C55] disabled:bg-slate-400 text-white font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D9488]"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Synthesizing PDF ({generationProgress}%)...</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    <span>Generate PDF Now</span>
                  </>
                )}
              </button>
            </div>

          </div>
        )}

        {/* STEP 3: PREVIEW & DOWNLOAD (Redesigned Download Experience) */}
        {currentStep === 'result' && pdfResult && (
          <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-10 shadow-sm">
            
            {/* Green Success Banner */}
            <div className="mb-6 p-5 rounded-2xl bg-[#E8F7EF] border-2 border-[#0D9488]/30 text-emerald-950 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#0D9488] text-white flex items-center justify-center shrink-0 shadow-xs">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#0D9488]">
                  Document Ready · 100% In-Browser Memory
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold text-[#102A43] mt-0.5">
                  Your Customer-Prepared Address Statement is Ready!
                </h2>
                <p className="text-xs text-slate-600 mt-0.5 font-mono">
                  {pdfResult.fileName}
                </p>
              </div>
            </div>

            {/* Animated Download Prompt & Main Action Card */}
            <div className="mb-8 p-6 sm:p-10 rounded-2xl border-2 border-[#DC3545]/20 bg-gradient-to-b from-red-50/50 via-white to-red-50/20 flex flex-col items-center text-center shadow-xs">
              
              {/* 1. Short message above the button: "Your document is ready!" */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold bg-[#E8F7EF] text-[#0D9488] border border-[#0D9488]/30 shadow-2xs mb-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0" />
                <span>Your document is ready!</span>
              </div>

              {/* 2. Instruction: "Click here to download your document" */}
              <p className="text-sm sm:text-base font-bold text-[#102A43] mb-1">
                Click here to download your document
              </p>

              {/* 3, 4, 5, 6, 7. Animated bouncing arrow pointing down directly toward the RED Download PDF button */}
              <div
                className="animate-gentle-bounce motion-reduce:animate-none flex items-center justify-center text-[#DC3545] my-2.5"
                aria-hidden="true"
              >
                <ArrowDown className="w-7 h-7 stroke-[2.75]" />
              </div>

              {/* Main RED Download PDF Button (#DC3545) with white download icon */}
              <button
                type="button"
                onClick={handleDownload}
                className="w-full sm:w-auto min-w-[280px] min-h-[56px] px-8 py-4 rounded-xl bg-[#DC3545] hover:bg-[#B02A37] active:bg-[#99222E] text-white font-extrabold text-base sm:text-lg transition-all flex items-center justify-center gap-3 cursor-pointer shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-red-200 active:scale-[0.99]"
              >
                <Download className="w-6 h-6 text-white shrink-0" />
                <span>{downloadSuccess ? 'Downloaded!' : 'Download PDF'}</span>
              </button>

              {downloadSuccess && (
                <div className="mt-4 text-xs sm:text-sm font-bold text-emerald-800 bg-[#E8F7EF] px-4 py-2 rounded-full border border-emerald-300 flex items-center gap-2 animate-toast-slide-in">
                  <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0" />
                  <span>PDF successfully saved to your downloads folder.</span>
                </div>
              )}
            </div>

            {/* Privacy reminder on download */}
            <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-gray-200 text-xs text-slate-700 flex items-center gap-2.5">
              <Lock className="w-4 h-4 text-[#0D9488] shrink-0" />
              <span>Zero Server Transmission: The file above was synthesized directly in your device RAM and is not stored on any remote server.</span>
            </div>

            {/* PDF In-Browser Preview Window */}
            <div className="mt-6 rounded-xl border border-gray-200 overflow-hidden bg-white shadow-xs">
              <div className="bg-slate-50 px-4 py-3 text-xs font-bold text-slate-700 flex flex-wrap items-center justify-between gap-2 border-b border-gray-200">
                <span className="flex items-center gap-2 text-[#102A43]">
                  <Eye className="w-4 h-4 text-[#0D9488]" />
                  <span>Document Preview (Standard A4 Format)</span>
                </span>
                
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenPreview('modal')}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white border border-gray-300 text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Expand Modal</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOpenPreview('side-panel')}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white border border-gray-300 text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Columns className="w-3.5 h-3.5" />
                    <span>Side-Panel</span>
                  </button>
                </div>
              </div>

              {pdfResult.dataUrl ? (
                <iframe
                  src={pdfResult.dataUrl}
                  title="PDF Preview"
                  className="w-full h-[480px] bg-slate-100 border-none"
                />
              ) : (
                <div className="p-8 text-center text-xs text-slate-500">
                  Preview not directly rendered in this browser mode. Tap "Download PDF" above to view.
                </div>
              )}
            </div>

            {/* Post-Download Actions */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleStartAgain}
                className="px-5 py-3 rounded-xl border border-gray-300 hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Start New Statement (Wipes Memory)</span>
              </button>

              <button
                type="button"
                onClick={handleDownload}
                className="px-6 py-3 rounded-xl bg-[#DC3545] hover:bg-[#B02A37] text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>Download Again</span>
              </button>
            </div>

          </div>
        )}

      </div>

      {/* Read-Only Modal or Side-Panel Preview */}
      <DocumentPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        documentType="address-statement"
        formData={formData}
        pdfResult={pdfResult}
        initialViewMode={previewMode}
        onTriggerDownload={handleDownload}
        isGenerating={isGenerating}
      />
    </div>
  );
};
