import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#070E1A] text-white flex items-center justify-center p-4 relative overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
          {/* Ambient Glows */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Toast / Popup card matching image */}
          <div className="relative z-10 max-w-lg w-full bg-[#0A1628]/90 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
            {/* Top pill status */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div className="inline-flex items-center gap-2.5 bg-rose-500/15 border border-rose-500/30 text-rose-400 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                Application Notice
              </div>
              <button
                onClick={this.handleGoHome}
                className="text-white/40 hover:text-white transition-colors p-1"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white mb-2 tracking-tight">
              Something went wrong
            </h2>
            <p className="text-white/60 text-sm mb-6 leading-relaxed">
              We encountered an unexpected glitch. Our 24/7 technical team has been alerted under our Work 1st Policy.
            </p>

            {this.state.error?.message && (
              <div className="bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-rose-300 font-mono mb-6 break-all">
                {this.state.error.message}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={this.handleReload}
                className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-sm shadow-[0_0_20px_rgba(255,107,53,0.4)] hover:shadow-[0_4px_25px_rgba(255,107,53,0.6)] transition-all cursor-pointer"
              >
                Try Again ↻
              </button>
              <button
                onClick={this.handleGoHome}
                className="flex-1 py-3 px-5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/15 transition-all cursor-pointer"
              >
                Return to Home →
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
