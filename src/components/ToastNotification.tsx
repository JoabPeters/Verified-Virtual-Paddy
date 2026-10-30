import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X, Download, Copy, ExternalLink } from 'lucide-react';

export type ToastType = 'success' | 'info' | 'warning' | 'error';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastItem {
  id: string;
  title: string;
  message?: string;
  type?: ToastType;
  duration?: number; // milliseconds, default 4500ms
  action?: ToastAction;
  icon?: React.ReactNode;
}

export interface ToastContextValue {
  toasts: ToastItem[];
  showToast: (toast: Omit<ToastItem, 'id'>) => string;
  dismissToast: (id: string) => void;
  clearAllToasts: () => void;
  // Convenience helper methods
  toast: {
    success: (title: string, message?: string, options?: Partial<Omit<ToastItem, 'id' | 'title' | 'message' | 'type'>>) => string;
    info: (title: string, message?: string, options?: Partial<Omit<ToastItem, 'id' | 'title' | 'message' | 'type'>>) => string;
    warning: (title: string, message?: string, options?: Partial<Omit<ToastItem, 'id' | 'title' | 'message' | 'type'>>) => string;
    error: (title: string, message?: string, options?: Partial<Omit<ToastItem, 'id' | 'title' | 'message' | 'type'>>) => string;
  };
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
  maxToasts?: number;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children, maxToasts = 3 }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const showToast = useCallback(
    (item: Omit<ToastItem, 'id'>): string => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      const newToast: ToastItem = {
        id,
        duration: 4500,
        type: 'success',
        ...item,
      };

      setToasts((prev) => {
        // Enforce max count to prevent clutter
        const updated = [newToast, ...prev];
        return updated.slice(0, maxToasts);
      });

      return id;
    },
    [maxToasts]
  );

  const toastHelpers = {
    success: useCallback(
      (title: string, message?: string, options?: Partial<Omit<ToastItem, 'id' | 'title' | 'message' | 'type'>>) =>
        showToast({ title, message, type: 'success', ...options }),
      [showToast]
    ),
    info: useCallback(
      (title: string, message?: string, options?: Partial<Omit<ToastItem, 'id' | 'title' | 'message' | 'type'>>) =>
        showToast({ title, message, type: 'info', ...options }),
      [showToast]
    ),
    warning: useCallback(
      (title: string, message?: string, options?: Partial<Omit<ToastItem, 'id' | 'title' | 'message' | 'type'>>) =>
        showToast({ title, message, type: 'warning', ...options }),
      [showToast]
    ),
    error: useCallback(
      (title: string, message?: string, options?: Partial<Omit<ToastItem, 'id' | 'title' | 'message' | 'type'>>) =>
        showToast({ title, message, type: 'error', ...options }),
      [showToast]
    ),
  };

  return (
    <ToastContext.Provider
      value={{
        toasts,
        showToast,
        dismissToast,
        clearAllToasts,
        toast: toastHelpers,
      }}
    >
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
};

interface ToastContainerProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <aside
      aria-live="polite"
      aria-atomic="false"
      role="status"
      className="fixed z-50 top-4 right-4 left-4 sm:left-auto sm:top-5 sm:right-5 sm:max-w-md w-auto flex flex-col gap-2.5 pointer-events-none"
    >
      {toasts.map((toast) => (
        <ToastNotificationCard key={toast.id} toast={toast} onDismiss={() => onDismiss(toast.id)} />
      ))}
    </aside>
  );
};

interface ToastNotificationCardProps {
  toast: ToastItem;
  onDismiss: () => void;
}

export const ToastNotificationCard: React.FC<ToastNotificationCardProps> = ({ toast, onDismiss }) => {
  const duration = toast.duration ?? 4500;
  const [isPaused, setIsPaused] = useState(false);
  const [progressPercent, setProgressPercent] = useState(100);
  const startTimeRef = useRef<number>(Date.now());
  const remainingTimeRef = useRef<number>(duration);

  useEffect(() => {
    if (duration <= 0) return;

    if (isPaused) {
      return;
    }

    startTimeRef.current = Date.now();
    const intervalTime = 50;

    const interval = setInterval(() => {
      const elapsedSinceResume = Date.now() - startTimeRef.current;
      const timeLeft = Math.max(0, remainingTimeRef.current - elapsedSinceResume);
      const percent = (timeLeft / duration) * 100;
      setProgressPercent(percent);

      if (timeLeft <= 0) {
        clearInterval(interval);
        onDismiss();
      }
    }, intervalTime);

    return () => {
      clearInterval(interval);
      // Update remaining time when unpausing or pausing
      const elapsed = Date.now() - startTimeRef.current;
      remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);
    };
  }, [duration, isPaused, onDismiss]);

  const typeConfig = {
    success: {
      borderClass: 'border-emerald-300',
      bgClass: 'bg-white',
      iconBg: 'bg-emerald-100 text-emerald-700',
      progressBarBg: 'bg-emerald-600',
      badgeClass: 'text-emerald-800 bg-emerald-50 border-emerald-200',
      defaultIcon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
      tag: 'Completed',
    },
    info: {
      borderClass: 'border-blue-300',
      bgClass: 'bg-white',
      iconBg: 'bg-blue-100 text-blue-700',
      progressBarBg: 'bg-blue-600',
      badgeClass: 'text-blue-800 bg-blue-50 border-blue-200',
      defaultIcon: <Info className="w-5 h-5 text-blue-600" />,
      tag: 'Notice',
    },
    warning: {
      borderClass: 'border-amber-300',
      bgClass: 'bg-white',
      iconBg: 'bg-amber-100 text-amber-800',
      progressBarBg: 'bg-amber-500',
      badgeClass: 'text-amber-800 bg-amber-50 border-amber-200',
      defaultIcon: <AlertTriangle className="w-5 h-5 text-amber-600" />,
      tag: 'Caution',
    },
    error: {
      borderClass: 'border-rose-300',
      bgClass: 'bg-white',
      iconBg: 'bg-rose-100 text-rose-700',
      progressBarBg: 'bg-rose-600',
      badgeClass: 'text-rose-800 bg-rose-50 border-rose-200',
      defaultIcon: <AlertCircle className="w-5 h-5 text-rose-600" />,
      tag: 'Error',
    },
  };

  const style = typeConfig[toast.type || 'success'];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`pointer-events-auto overflow-hidden rounded-xl border ${style.borderClass} ${style.bgClass} shadow-lg shadow-slate-900/5 transition-all duration-200 animate-toast-slide-in relative flex flex-col`}
      role="alert"
    >
      <div className="p-4 flex items-start gap-3">
        {/* Type / Custom Icon */}
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${style.iconBg}`}>
          {toast.icon || style.defaultIcon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center gap-2 mb-0.5">
            <h4 className="text-sm font-bold text-slate-900 leading-snug truncate">
              {toast.title}
            </h4>
            <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${style.badgeClass}`}>
              {style.tag}
            </span>
          </div>
          {toast.message && (
            <p className="text-xs text-slate-600 leading-relaxed mt-0.5 break-words">
              {toast.message}
            </p>
          )}

          {toast.action && (
            <div className="mt-2.5">
              <button
                type="button"
                onClick={() => {
                  toast.action?.onClick();
                  onDismiss();
                }}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>{toast.action.label}</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Dismiss Button */}
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss notification"
          className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1 rounded-md transition-colors shrink-0 cursor-pointer -mr-1 -mt-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Subtle Progress Bar */}
      {duration > 0 && (
        <div className="w-full h-1 bg-slate-100 overflow-hidden">
          <div
            className={`h-full ${style.progressBarBg} transition-all ease-linear`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}
    </div>
  );
};
