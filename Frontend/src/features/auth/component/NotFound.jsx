import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from "../../../App/Navbar.jsx"


/* ── Google Fonts (matching Home.jsx) ─────────────────────────── */
const useGoogleFonts = () => {
  useEffect(() => {
    if (document.getElementById('pp-gf')) return;
    const l = document.createElement('link');
    l.id = 'pp-gf';
    l.rel = 'stylesheet';
    l.href =
      'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600&display=swap';
    document.head.appendChild(l);
  }, []);
};

export default function NotFound() {
  useGoogleFonts();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="min-h-screen font-['Inter',sans-serif] bg-[#070E1A] text-white flex flex-col relative overflow-hidden select-none"
      style={{
        backgroundImage: "url('/images/hero-bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark gradient overlay & backdrop blur */}
      <div className="absolute inset-0 bg-[#070E1A]/92 backdrop-blur-sm pointer-events-none" />

      {/* Persistent App Header */}
      <Navbar />

      {/* Ambient background glows matching Home.jsx theme */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 py-28">
        <div
          className={`w-full max-w-2xl text-center transition-all duration-700 ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Glassmorphic Container */}
          <div className="bg-white/4 border border-white/10 rounded-3xl p-8 sm:p-14 shadow-[0_32px_80px_rgba(0,0,0,0.65)] backdrop-blur-2xl relative overflow-hidden">
            {/* Top decorative accent bar */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-1.5 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
              404 • Pipeline Disconnected
            </div>

            {/* Big Gradient 404 Headline */}
            <h1 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-8xl sm:text-9xl tracking-tight leading-none bg-gradient-to-r from-cyan-400 via-sky-200 to-orange-400 bg-clip-text text-transparent mb-4">
              404
            </h1>

            {/* Sub-heading */}
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-2xl sm:text-3xl text-white mb-4">
              Looks like this pipe sprang a leak! 🔧💧
            </h2>

            {/* Description */}
            <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-lg mx-auto mb-8 font-normal">
              The page you are looking for doesn’t exist or has been rerouted under FRRF Plumbing maintenance. Don’t worry, our master technicians can guide you back.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8">
              <Link
                to="/customer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-['Plus_Jakarta_Sans',sans-serif] font-bold px-7 py-3.5 rounded-full shadow-[0_0_24px_rgba(255,107,53,0.45)] hover:shadow-[0_0_32px_rgba(255,107,53,0.6)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>Return to Home</span>
                <span>→</span>
              </Link>
              <Link
                to="/customer/booking"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/6 hover:bg-white/10 text-white font-['Plus_Jakarta_Sans',sans-serif] font-semibold border border-white/15 px-6 py-3.5 rounded-full transition-all duration-200 hover:border-white/30"
              >
                <span>Book a Plumber ⚡</span>
              </Link>
            </div>

            {/* Helpful Quick Links */}
            <div className="pt-6 border-t border-white/8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-white/50">
              <span className="font-semibold text-white/70">Popular Shortcuts:</span>
              <button
                type="button"
                onClick={() => navigate('/customer#services')}
                className="hover:text-cyan-400 transition-colors cursor-pointer bg-transparent border-0 p-0"
              >
                Our Services
              </button>
              <span className="text-white/20">•</span>
              <button
                type="button"
                onClick={() => navigate('/customer#about')}
                className="hover:text-cyan-400 transition-colors cursor-pointer bg-transparent border-0 p-0"
              >
                About Us
              </button>
              <span className="text-white/20">•</span>
              <button
                type="button"
                onClick={() => navigate('/Technician-register')}
                className="hover:text-cyan-400 transition-colors cursor-pointer bg-transparent border-0 p-0"
              >
                Join as Technician
              </button>
              <span className="text-white/20">•</span>
              <button
                type="button"
                onClick={() => navigate('/customer/login')}
                className="hover:text-cyan-400 transition-colors cursor-pointer bg-transparent border-0 p-0"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Minimal Footer Stamp */}
      <footer className="relative z-10 py-5 text-center text-xs text-white/35 font-medium border-t border-white/5">
        FRRF Plumbing Services © 2026 • Work 1st Security Guard
      </footer>
    </div>
  );
}
