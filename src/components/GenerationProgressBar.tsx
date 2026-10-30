import React from 'react';
import { CheckCircle2, Shield, Loader2, Sparkles, AlertCircle } from 'lucide-react';

export interface GenerationStage {
  id: string;
  label: string;
  description: string;
  minProgress: number;
}

export const DEFAULT_GENERATION_STAGES: GenerationStage[] = [
  {
    id: 'validation',
    label: 'Address Validation',
    description: 'Verifying declared address & statutory consent',
    minProgress: 20,
  },
  {
    id: 'disclaimer',
    label: 'Legal Formatting',
    description: 'Applying official A4 structure & statutory disclaimer',
    minProgress: 50,
  },
  {
    id: 'synthesis',
    label: 'PDF Synthesis',
    description: 'Compiling high-resolution vector PDF in memory',
    minProgress: 80,
  },
  {
    id: 'finalizing',
    label: 'Memory Finalization',
    description: 'Preparing secure client-side download package',
    minProgress: 100,
  },
];

interface GenerationProgressBarProps {
  progress: number; // 0 to 100
  statusText?: string;
  subText?: string;
  stages?: GenerationStage[];
  error?: string | null;
  onRetry?: () => void;
}

export const GenerationProgressBar: React.FC<GenerationProgressBarProps> = ({
  progress,
  statusText = 'Generating your document in browser memory...',
  subText = 'Synthesizing client-side A4 PDF with legal disclaimers',
  stages = DEFAULT_GENERATION_STAGES,
  error = null,
  onRetry,
}) => {
  const clampedProgress = Math.min(100, Math.max(0, Math.round(progress)));
  const isComplete = clampedProgress >= 100;

  return (
    <div
      className="w-full bg-slate-50 border border-emerald-200 rounded-xl p-5 sm:p-7 shadow-xs transition-all duration-300"
      role="region"
      aria-label="Document Generation Progress"
    >
      {/* Top Header: Title, Progress % and Icon */}
      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
              error
                ? 'bg-rose-100 text-rose-700'
                : isComplete
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-100 text-emerald-800'
            }`}
          >
            {error ? (
              <AlertCircle className="w-5 h-5 text-rose-600" />
            ) : isComplete ? (
              <CheckCircle2 className="w-5 h-5 text-white" />
            ) : (
              <Loader2 className="w-5 h-5 animate-spin text-emerald-700" />
            )}
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
              {error
                ? 'Generation Interrupted'
                : isComplete
                ? 'Document Successfully Synthesized!'
                : statusText}
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">{subText}</p>
          </div>
        </div>

        {/* Numeric Percentage Badge */}
        <div className="text-right shrink-0">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-extrabold font-mono transition-colors ${
              error
                ? 'bg-rose-100 text-rose-700'
                : isComplete
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-100 text-emerald-900'
            }`}
          >
            {clampedProgress}%
          </span>
        </div>
      </div>

      {/* The Visual Progress Bar Track */}
      <div
        className="w-full h-3 sm:h-3.5 bg-gray-200 rounded-full overflow-hidden p-0.5 border border-gray-300 mb-4"
        role="progressbar"
        aria-valuenow={clampedProgress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Document generation status"
      >
        <div
          className={`h-full rounded-full transition-all duration-300 ease-out ${
            error
              ? 'bg-rose-600'
              : isComplete
              ? 'bg-emerald-600'
              : 'bg-emerald-600'
          }`}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>

      {/* Stage Milestones Checklist */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 border-t border-gray-200">
        {stages.map((stage) => {
          const isStageComplete = clampedProgress >= stage.minProgress;
          const isStageActive =
            !isStageComplete &&
            clampedProgress >= (stage.minProgress - 30);

          return (
            <div
              key={stage.id}
              className={`p-2 rounded-lg border text-left transition-colors ${
                isStageComplete
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                  : isStageActive
                  ? 'bg-white border-emerald-400 shadow-xs text-slate-900'
                  : 'bg-white/50 border-gray-200 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                {isStageComplete ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                ) : isStageActive ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-700 shrink-0" />
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full border border-gray-300 shrink-0" />
                )}
                <span className="text-[11px] sm:text-xs font-bold truncate">
                  {stage.label}
                </span>
              </div>
              <p className="text-[10px] leading-tight text-slate-500 hidden sm:block truncate">
                {stage.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Bottom Privacy & Security Reassurance Note */}
      <div className="mt-4 pt-3 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-500">
        <div className="flex items-center gap-1.5 text-emerald-800">
          <Shield className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span className="font-semibold">
            In-Browser Security: Zero personal data is transmitted over the network.
          </span>
        </div>
        <div className="flex items-center gap-1 text-slate-400 font-mono text-[10px]">
          <Sparkles className="w-3 h-3 text-emerald-600" />
          <span>Client-Side jsPDF Engine</span>
        </div>
      </div>

      {/* Error state retry button */}
      {error && onRetry && (
        <div className="mt-4 pt-3 border-t border-rose-200 flex items-center justify-between">
          <span className="text-xs text-rose-700 font-medium">{error}</span>
          <button
            type="button"
            onClick={onRetry}
            className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Retry Generation
          </button>
        </div>
      )}
    </div>
  );
};
