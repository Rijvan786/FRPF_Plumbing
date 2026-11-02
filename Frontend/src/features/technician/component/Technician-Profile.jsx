import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../../auth/hook/useAuth.jsx';
import { GetMe } from '../../auth/service/auth.api.jsx';
import { setUser } from '../../auth/state/auth.slice.jsx';
import { setTechnician } from '../state/technician.slice.jsx';

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

export default function TechnicianProfile() {
  useGoogleFonts();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleGetME } = useAuth();

  // Redux user states
  const reduxAuthUser = useSelector((state) => state.auth?.User);
  const reduxTechUser = useSelector((state) => state.technician?.technician);
  const initialUser = reduxAuthUser || reduxTechUser || null;

  const [userData, setUserData] = useState(() => {
    if (initialUser) return initialUser;
    try {
      const saved = localStorage.getItem('user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [loadingApi, setLoadingApi] = useState(!userData);
  const [isAvailable, setIsAvailable] = useState(true);
  const [visible, setVisible] = useState(false);

  // Entrance animation
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Fetch real data from GetMe API
  const fetchGetMeData = async () => {
    try {
      setLoadingApi(true);
      let fetchedUser = null;

      if (handleGetME) {
        fetchedUser = await handleGetME();
      }

      if (!fetchedUser) {
        const res = await GetMe();
        fetchedUser = res?.user || res?.data?.user;
      }

      if (fetchedUser) {
        setUserData(fetchedUser);
        dispatch(setUser(fetchedUser));
        dispatch(setTechnician(fetchedUser));
      }
    } catch (err) {
      console.warn('GetMe API fetch in Technician-Profile:', err?.message || err);
    } finally {
      setLoadingApi(false);
    }
  };

  useEffect(() => {
    fetchGetMeData();
  }, []);

  // Resolve user fields with sensible defaults
  const fullName = userData?.FullName || 'Technician Partner';
  const email = userData?.email || 'technician@example.com';
  const contact = userData?.contact || '+91 98765 43210';
  const role = userData?.role || 'Senior Master Plumber';
  const city = userData?.city || 'MP Nagar, Bhopal';
  const experienceYears = userData?.experienceYears || 6;
  const isVerified = userData?.isVerifiedTech ?? userData?.verified ?? true;

  const weeklyEarnings = [
    { day: 'Mon', amount: 3800, height: '55%' },
    { day: 'Tue', amount: 5600, height: '78%' },
    { day: 'Wed', amount: 3100, height: '42%' },
    { day: 'Thu', amount: 6400, height: '88%' },
    { day: 'Fri', amount: 5100, height: '70%' },
    { day: 'Sat', amount: 4200, height: '60%' },
    { day: 'Sun', amount: 7500, height: '100%' },
  ];

  const totalWeekly = weeklyEarnings.reduce((acc, curr) => acc + curr.amount, 0);

  const specializations = [
    { name: 'CPVC & PVC Pipeline Specialist', icon: '💧' },
    { name: 'Concealed Leakage Repair', icon: '🔧' },
    { name: 'Bathroom & Sanitary Expert', icon: '🚰' },
    { name: 'Water Tank & Motor Installer', icon: '⚙️' },
    { name: 'Kitchen Drain & Blockage Removal', icon: '🚿' },
    { name: 'Pressure Testing & Pipe Auditing', icon: '🔍' },
  ];

  return (
    <div className="min-h-screen bg-[#070E1A] text-white font-['Plus_Jakarta_Sans',sans-serif] selection:bg-cyan-500/30 selection:text-cyan-300 relative overflow-x-hidden">
      
      {/* Background Hero Image matching Home.jsx with entrance animation */}
      <div
        className={`fixed inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-out pointer-events-none transform ${
          visible ? 'opacity-30 scale-100' : 'opacity-0 scale-105'
        }`}
        style={{ backgroundImage: `url('/images/hero-bg.png')` }}
      />

      {/* Deep Midnight Navy Gradient Overlays matching Home.jsx */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#070E1A]/95 via-[#0A1628]/92 to-[#070E1A]/98 pointer-events-none" />

      {/* Ambient Glowing Spheres matching Home.jsx */}
      <div className="fixed top-24 right-1/4 w-[480px] h-[480px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-24 left-10 w-[420px] h-[420px] bg-orange-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* ── Top Header Navigation Bar ─────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[#0A1628]/80 backdrop-blur-2xl border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3.5 py-2 rounded-xl transition-all duration-200 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
            <h1 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-base sm:text-lg text-white tracking-tight">
              Technician Partner Profile
            </h1>
            {loadingApi && (
              <span className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin ml-1" />
            )}
          </div>

          {/* Availability Toggle */}
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-3 py-1.5 rounded-2xl">
            <div className="flex items-center gap-1.5">
              <span
                className={`w-2 h-2 rounded-full ${
                  isAvailable
                    ? 'bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse'
                    : 'bg-white/30'
                }`}
              />
              <span
                className={`text-xs font-bold ${
                  isAvailable ? 'text-emerald-400' : 'text-white/40'
                }`}
              >
                {isAvailable ? 'Active Duty' : 'Offline'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsAvailable(!isAvailable)}
              className={`relative w-11 h-6 rounded-full transition-colors duration-300 cursor-pointer ${
                isAvailable ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.45)]' : 'bg-white/15'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                  isAvailable ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* ── Main Content Container ────────────────────────────── */}
      <main
        className={`relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 transition-all duration-700 ease-out transform ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        {/* Profile Hero Card */}
        <div className="bg-[#0A1628]/85 backdrop-blur-2xl border border-white/12 rounded-3xl p-6 sm:p-8 mb-8 shadow-[0_20px_60px_rgba(0,0,0,0.6)] relative overflow-hidden">
          {/* Subtle gradient accent bar along the top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-orange-500 to-blue-500" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=260&q=80"
                alt="Profile Avatar"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-cyan-500/40 ring-4 ring-cyan-500/10 shadow-[0_0_24px_rgba(6,182,212,0.3)]"
              />
              <span className="absolute -bottom-2 -right-2 bg-emerald-500 text-slate-950 p-1 rounded-full border-2 border-[#0A1628] shadow-[0_0_10px_#10b981]">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                <div>
                  <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-2xl sm:text-3xl text-white tracking-tight">
                    {fullName}
                  </h2>
                  <p className="text-cyan-400 font-semibold text-sm sm:text-base mt-0.5">
                    {role} • CPVC & Sanitary Specialist
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={fetchGetMeData}
                    title="Refresh data from server"
                    className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition-all cursor-pointer"
                  >
                    <svg className={`w-4 h-4 ${loadingApi ? 'animate-spin text-cyan-400' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wider rounded-full shadow-[0_0_12px_rgba(52,211,153,0.15)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {isVerified ? 'CERTIFIED MASTER' : 'PARTNER'}
                  </span>
                </div>
              </div>

              {/* Rating & Location & Contact (Real Data from GetMe) */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-5 mt-3 pt-3 border-t border-white/10 text-xs sm:text-sm">
                <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-3 py-1 rounded-xl">
                  <div className="flex text-amber-400">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-1 font-bold text-white">4.95</span>
                  <span className="text-white/40 font-medium">(214 Verified Jobs)</span>
                </div>

                <div className="flex items-center gap-1.5 text-white/70">
                  <span>📍</span>
                  <span className="font-medium text-white/80">
                    {city}
                  </span>
                  <span className="text-white/30">•</span>
                  <span className="text-cyan-300 font-semibold">
                    {experienceYears}+ Years Experience
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-white/60">
                  <span>📞</span>
                  <span className="font-mono text-white/80">{contact}</span>
                </div>

                <div className="flex items-center gap-1.5 text-white/60">
                  <span>✉️</span>
                  <span className="font-mono text-white/80">{email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Metric Performance Cards (matching Home.jsx style) ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#0A1628]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-cyan-500/40 transition-all duration-300 group">
            <p className="text-xs uppercase font-bold text-white/50 tracking-wider mb-2">Total Jobs</p>
            <p className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl sm:text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform origin-left">
              1,248
            </p>
            <p className="text-[11px] text-emerald-400 font-bold mt-2 flex items-center gap-1">
              <span>↑ 18%</span>
              <span className="text-white/40 font-normal">from last month</span>
            </p>
          </div>

          <div className="bg-[#0A1628]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-emerald-500/40 transition-all duration-300 group">
            <p className="text-xs uppercase font-bold text-white/50 tracking-wider mb-2">Completion Rate</p>
            <p className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl sm:text-4xl font-black bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent group-hover:scale-105 transition-transform origin-left">
              99.2%
            </p>
            <p className="text-[11px] text-white/40 mt-2">Zero unaddressed callbacks</p>
          </div>

          <div className="bg-[#0A1628]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-orange-500/40 transition-all duration-300 group">
            <p className="text-xs uppercase font-bold text-white/50 tracking-wider mb-2">This Month</p>
            <p className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl sm:text-4xl font-black bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent group-hover:scale-105 transition-transform origin-left">
              ₹48.5k
            </p>
            <p className="text-[11px] text-emerald-400 font-bold mt-2">Payout verified</p>
          </div>

          <div className="bg-[#0A1628]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-violet-500/40 transition-all duration-300 group">
            <p className="text-xs uppercase font-bold text-white/50 tracking-wider mb-2">Avg Response</p>
            <p className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl sm:text-4xl font-black bg-gradient-to-r from-violet-400 to-purple-300 bg-clip-text text-transparent group-hover:scale-105 transition-transform origin-left">
              18m
            </p>
            <p className="text-[11px] text-white/40 mt-2">Top 5% across network</p>
          </div>
        </div>

        {/* ── Weekly Earnings Chart ─────────────────────────────── */}
        <div className="bg-[#0A1628]/85 backdrop-blur-2xl border border-white/12 rounded-3xl p-6 sm:p-8 mb-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-lg text-white">
                Weekly Earnings Overview
              </h3>
              <p className="text-xs text-white/50 mt-0.5">
                Calculated on real-time plumbing and emergency dispatch payouts
              </p>
            </div>
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-xl">
              <span className="text-xs text-white/50 font-bold uppercase">7-Day Total:</span>
              <span className="text-sm font-black text-cyan-400">₹{totalWeekly.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Bar Chart Bars */}
          <div className="flex items-end gap-2.5 sm:gap-4 h-40 pt-4 px-2">
            {weeklyEarnings.map((item, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[11px] font-bold text-white/0 group-hover:text-cyan-300 transition-all duration-200">
                  ₹{item.amount}
                </span>
                <div
                  className="w-full bg-gradient-to-t from-cyan-600/80 via-cyan-500 to-blue-400 rounded-xl transition-all duration-300 group-hover:scale-y-105 group-hover:shadow-[0_0_16px_rgba(6,182,212,0.5)] cursor-pointer"
                  style={{ height: item.height }}
                  title={`${item.day}: ₹${item.amount}`}
                />
                <span className="text-xs font-bold text-white/60 group-hover:text-white transition-colors">
                  {item.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Specializations & Services (matching Home.jsx) ────── */}
        <div className="bg-[#0A1628]/85 backdrop-blur-2xl border border-white/12 rounded-3xl p-6 sm:p-8 mb-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-lg text-white">
                Certified Specializations
              </h3>
              <p className="text-xs text-white/50 mt-0.5">
                Qualified CPVC plumbing capabilities and service categories
              </p>
            </div>
            <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full">
              6 Active Badges
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {specializations.map((spec, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-3.5 hover:bg-white/8 hover:border-cyan-500/40 transition-all duration-200"
              >
                <span className="text-2xl p-2 bg-white/5 rounded-xl">{spec.icon}</span>
                <div>
                  <p className="text-sm font-bold text-white">{spec.name}</p>
                  <p className="text-[11px] text-emerald-400 font-semibold">ISO 9001 Certified</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Footer Navigation Actions ─────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/4 border border-white/10 rounded-2xl p-4 sm:p-6 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/25 flex items-center justify-center text-orange-400 text-lg">
              🛠️
            </span>
            <div>
              <h4 className="text-sm font-bold text-white">Technician Portal Hub</h4>
              <p className="text-xs text-white/50">Manage your duty status, job history, and dispatch alerts</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => navigate('/Technician-Dashboard')}
              className="flex-1 sm:flex-none bg-gradient-to-br from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-white font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm px-6 py-3 rounded-xl shadow-[0_0_24px_rgba(255,107,53,0.38)] transition-all duration-200 cursor-pointer"
            >
              Go to Dashboard →
            </button>
            <button
              onClick={() => navigate('/TechnicianNotification')}
              className="flex-1 sm:flex-none bg-white/5 hover:bg-white/10 border border-white/12 text-white font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm px-5 py-3 rounded-xl transition-all duration-200 cursor-pointer"
            >
              Notifications
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}
