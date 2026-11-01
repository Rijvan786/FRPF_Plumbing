import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(({ type = 'success', message, actionText, onAction, duration = 4500 }) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    const newToast = { id, type, message, actionText, onAction };
    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      {/* Toast container — fixed safely below navbar at top right */}
      <div className="fixed top-24 right-4 sm:right-8 z-[99999] flex flex-col gap-3 pointer-events-none max-w-md w-full px-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto transform transition-all duration-300 ease-out flex items-center justify-between gap-3 px-4 py-3.5 rounded-2xl backdrop-blur-2xl shadow-[0_16px_40px_rgba(0,0,0,0.7)] border ${
              toast.type === 'error'
                ? 'bg-[#150a10]/95 border-rose-500/40 text-white'
                : 'bg-[#081510]/95 border-emerald-500/40 text-white'
            }`}
            style={{
              boxShadow: toast.type === 'error'
                ? '0 0 25px rgba(244,63,94,0.3), 0 8px 30px rgba(0,0,0,0.7)'
                : '0 0 25px rgba(16,185,129,0.3), 0 8px 30px rgba(0,0,0,0.7)',
            }}
          >
            {/* Left accent bar & rounded circle icon matching design */}
            <div className="flex items-center gap-3 min-w-0">
              <span
                className={`w-1.5 self-stretch rounded-full ${
                  toast.type === 'error'
                    ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.8)]'
                    : 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]'
                }`}
              />
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border ${
                  toast.type === 'error'
                    ? 'border-rose-400 text-rose-400 bg-rose-500/10'
                    : 'border-emerald-400 text-emerald-400 bg-emerald-500/10'
                }`}
              >
                {toast.type === 'error' ? (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>

              {/* Message text */}
              <div className="text-sm font-semibold text-white/95">
                {toast.message}
              </div>
            </div>

            {/* Right side: optional action pill + Close button */}
            <div className="flex items-center gap-2 shrink-0">
              {toast.actionText && (
                <button
                  type="button"
                  onClick={() => {
                    toast.onAction?.();
                    removeToast(toast.id);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FF6B35]/20 border border-[#FF6B35]/40 text-[#FF6B35] hover:bg-[#FF6B35]/30 transition-colors cursor-pointer"
                >
                  {toast.actionText}
                </button>
              )}

              {/* Close icon */}
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="text-white/40 hover:text-white transition-colors p-1"
                aria-label="Dismiss"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
