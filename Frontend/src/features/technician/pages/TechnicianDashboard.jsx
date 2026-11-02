import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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

export default function TechnicianDashboard() {
  useGoogleFonts();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleGetME, handleLogout } = useAuth();

  // Load technician user from Redux store with fallback
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

  const [isOnline, setIsOnline] = useState(true);
  const [visible, setVisible] = useState(false);
  const [acceptedJob, setAcceptedJob] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const onLogout = async () => {
    try {
      setLoggingOut(true);
      if (handleLogout) {
        await handleLogout();
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setLoggingOut(false);
      navigate('/customer/login');
    }
  };

  // Entrance animation
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Fetch real data on mount if not already present
  useEffect(() => {
    let isMounted = true;
    const fetchUser = async () => {
      try {
        let fetched = null;
        if (handleGetME) {
          fetched = await handleGetME();
        }
        if (!fetched) {
          const res = await GetMe();
          fetched = res?.user || res?.data?.user;
        }
        if (isMounted && fetched) {
          setUserData(fetched);
          dispatch(setUser(fetched));
          dispatch(setTechnician(fetched));
        }
      } catch (err) {
        console.warn('Dashboard user fetch note:', err?.message || err);
      }
    };

    fetchUser();
    return () => {
      isMounted = false;
    };
  }, []);

  const firstName = userData?.FullName ? userData.FullName.split(' ')[0] : 'Partner';

  const upcomingJobs = [
    {
      id: 'JOB-9021',
      name: 'Vikram Malhotra',
      phone: '+91 98234 56789',
      service: 'Kitchen Sink Drain Blockage & Trap Cleaning',
      category: 'Blockage Removal',
      icon: '🔧',
      timeSlot: '11:30 AM Today',
      distance: '1.8 km away',
      price: '₹500',
      address: 'Plot 44, MP Nagar Zone-II, Bhopal',
    },
    {
      id: 'JOB-9022',
      name: 'Anita Rao',
      phone: '+91 97112 34567',
      service: 'Overhead Tank Motor & Automatic Float Valve Fitting',
      category: 'Smart Installation',
      icon: '⚙️',
      timeSlot: '02:00 PM Today',
      distance: '3.4 km away',
      price: '₹1,200',
      address: 'B-201, Silver Springs, Hoshangabad Rd, Bhopal',
    },
    {
      id: 'JOB-9023',
      name: 'Deepak Patel',
      phone: '+91 98930 11223',
      service: 'Bathroom Mixer Tap & CPVC Concealed Line Replacement',
      category: 'Sanitary Fitting',
      icon: '🚰',
      timeSlot: '04:30 PM Today',
      distance: '4.1 km away',
      price: '₹850',
      address: 'E-7, Arera Colony, Bhopal',
    },
  ];

  return (
    <div className="min-h-screen bg-[#070E1A] text-white font-['Plus_Jakarta_Sans',sans-serif] selection:bg-cyan-500/30 selection:text-cyan-300 relative overflow-x-hidden">
      
      {/* Background Hero Image matching Home.jsx with smooth entrance */}
      <div
        className={`fixed inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-out pointer-events-none transform ${
          visible ? 'opacity-30 scale-100' : 'opacity-0 scale-105'
        }`}
        style={{ backgroundImage: `url('/images/hero-bg.png')` }}
      />

      {/* Deep Midnight Navy Gradient Overlays matching Home.jsx */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#070E1A]/95 via-[#0A1628]/92 to-[#070E1A]/98 pointer-events-none" />

      {/* Ambient Glowing Spheres matching Home.jsx */}
      <div className="fixed top-24 right-1/4 w-[320px] sm:w-[480px] h-[320px] sm:h-[480px] bg-cyan-500/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />
      <div className="fixed bottom-24 left-6 sm:left-10 w-[280px] sm:w-[420px] h-[280px] sm:h-[420px] bg-orange-500/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />

      {/* ── Top Header Navigation Bar ─────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[#0A1628]/85 backdrop-blur-2xl border-b border-white/10">
        <div className="max-w-6xl mx-auto px-3.5 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_18px_rgba(6,182,212,0.4)] text-white text-base sm:text-lg shrink-0">
              🔧
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h1 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-sm sm:text-lg md:text-xl text-white tracking-tight truncate">
                  Welcome, {firstName}!
                </h1>
                <span className="hidden md:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shrink-0">
                  Master Tech
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-white/50 font-medium truncate">Technician Hub • 24/7 Dispatch</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Online / Offline Toggle */}
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-2xl">
              <span
                className={`w-2 h-2 rounded-full ${
                  isOnline
                    ? 'bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse'
                    : 'bg-white/30'
                }`}
              />
              <span
                className={`hidden md:inline text-xs font-bold ${
                  isOnline ? 'text-emerald-400' : 'text-white/40'
                }`}
              >
                {isOnline ? 'Online' : 'Offline'}
              </span>
              <button
                type="button"
                onClick={() => setIsOnline(!isOnline)}
                className={`relative w-10 sm:w-11 h-5 sm:h-6 rounded-full transition-colors duration-300 cursor-pointer ${
                  isOnline ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.45)]' : 'bg-white/15'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-4 sm:w-5 h-4 sm:h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                    isOnline ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Notification Bell */}
            <button
              onClick={() => navigate('/TechnicianNotification')}
              className="relative p-2 sm:p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-all cursor-pointer"
              title="Notifications"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_6px_#f97316] animate-ping" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full" />
            </button>

            {/* Profile Avatar Button */}
            <button
              onClick={() => navigate('/Technician-Profile')}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl overflow-hidden border-2 border-cyan-500/40 hover:border-cyan-400 ring-2 ring-cyan-500/20 shadow-[0_0_12px_rgba(6,182,212,0.3)] transition-all cursor-pointer"
              title="View Profile"
            >
              <img
                src="https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=120&q=80"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </button>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              disabled={loggingOut}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/25 hover:border-rose-500/40 text-rose-400 hover:text-rose-300 text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
              title="Logout from Partner Session"
            >
              <svg className={`w-4 h-4 ${loggingOut ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="hidden sm:inline">{loggingOut ? 'Logging out...' : 'Logout'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Main Dashboard Body ───────────────────────────────── */}
      <main
        className={`relative z-10 max-w-6xl mx-auto px-3.5 sm:px-6 py-6 sm:py-10 transition-all duration-700 ease-out transform ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        {/* Availability Banner */}
        {!isOnline && (
          <div className="mb-6 bg-orange-500/10 border border-orange-500/30 rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="text-lg sm:text-xl">⏸️</span>
              <p className="text-xs sm:text-sm text-orange-300 font-semibold leading-relaxed">
                You are currently offline. Switch status to <strong>Online</strong> to start receiving high-priority plumbing calls.
              </p>
            </div>
            <button
              onClick={() => setIsOnline(true)}
              className="w-full sm:w-auto text-center px-4 py-2 sm:py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-[0_0_16px_rgba(255,107,53,0.4)] transition-all cursor-pointer whitespace-nowrap"
            >
              Go Online
            </button>
          </div>
        )}

        {/* ── Stats Grid (matching Home.jsx style) ────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-[#0A1628]/85 backdrop-blur-xl border border-white/10 rounded-2xl p-3.5 sm:p-5 hover:border-cyan-500/40 transition-all duration-300 group">
            <p className="text-[10px] sm:text-xs uppercase font-bold text-white/50 tracking-wider mb-1.5 sm:mb-2">Today's Jobs</p>
            <p className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform origin-left">
              4
            </p>
            <p className="text-[10px] sm:text-[11px] text-emerald-400 font-bold mt-1.5 sm:mt-2 flex items-center gap-1">
              <span>⚡ 1 Active</span>
            </p>
          </div>

          <div className="bg-[#0A1628]/85 backdrop-blur-xl border border-white/10 rounded-2xl p-3.5 sm:p-5 hover:border-emerald-500/40 transition-all duration-300 group">
            <p className="text-[10px] sm:text-xs uppercase font-bold text-white/50 tracking-wider mb-1.5 sm:mb-2">Today's Earnings</p>
            <p className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent group-hover:scale-105 transition-transform origin-left">
              ₹1,850
            </p>
            <p className="text-[10px] sm:text-[11px] text-white/40 mt-1.5 sm:mt-2 truncate">Direct deposit</p>
          </div>

          <div className="bg-[#0A1628]/85 backdrop-blur-xl border border-white/10 rounded-2xl p-3.5 sm:p-5 hover:border-orange-500/40 transition-all duration-300 group">
            <p className="text-[10px] sm:text-xs uppercase font-bold text-white/50 tracking-wider mb-1.5 sm:mb-2">Rating Score</p>
            <p className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent group-hover:scale-105 transition-transform origin-left">
              4.95 ★
            </p>
            <p className="text-[10px] sm:text-[11px] text-emerald-400 font-bold mt-1.5 sm:mt-2 truncate">Top 1% rated</p>
          </div>

          <div className="bg-[#0A1628]/85 backdrop-blur-xl border border-white/10 rounded-2xl p-3.5 sm:p-5 hover:border-violet-500/40 transition-all duration-300 group">
            <p className="text-[10px] sm:text-xs uppercase font-bold text-white/50 tracking-wider mb-1.5 sm:mb-2">Response Rate</p>
            <p className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-violet-400 to-purple-300 bg-clip-text text-transparent group-hover:scale-105 transition-transform origin-left">
              100%
            </p>
            <p className="text-[10px] sm:text-[11px] text-white/40 mt-1.5 sm:mt-2 truncate">Zero missed alerts</p>
          </div>
        </div>

        {/* ── Current Assignment (High Priority Emergency Dispatch) ── */}
        <section className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e] animate-ping shrink-0" />
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-lg sm:text-xl md:text-2xl text-white truncate">
                Current Active Assignment
              </h2>
            </div>
            <span className="px-2.5 sm:px-3 py-1 bg-rose-500/15 border border-rose-500/30 text-rose-400 text-[10px] sm:text-xs font-bold rounded-full uppercase tracking-wider shrink-0">
              🚨 Emergency
            </span>
          </div>

          <div className="bg-[#0A1628]/85 backdrop-blur-2xl border border-rose-500/30 hover:border-rose-500/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-5 pb-4 sm:pb-5 border-b border-white/10">
              <div className="min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-lg sm:text-xl text-white">
                    Rahul Sharma
                  </h3>
                  <span className="text-[10px] sm:text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    Verified Customer
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-white/70 mt-1 flex items-center gap-1.5 flex-wrap">
                  <span className="text-cyan-400">📍</span>
                  <span>A-12, Arera Colony, Bhopal</span>
                  <span className="px-2 py-0.5 bg-cyan-500/15 text-cyan-400 text-[10px] sm:text-xs font-bold rounded-lg border border-cyan-500/30">
                    2.5 km away
                  </span>
                </p>
              </div>

              <div className="text-left sm:text-right shrink-0">
                <span className="text-[10px] sm:text-xs text-white/50 uppercase font-semibold">Service Value</span>
                <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xl sm:text-2xl font-black text-cyan-400">
                  ₹450 <span className="text-xs font-normal text-white/50">+ Parts</span>
                </p>
              </div>
            </div>

            {/* Service Details Card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 sm:p-5 mb-5 sm:mb-6">
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs sm:text-sm mb-1.5">
                <span>💧</span>
                <span>CPVC Pipe Concealed Leakage & Flush Tank Repair</span>
              </div>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                Water spraying near main riser line inside bathroom wall. Customer requested emergency isolation and joint sealing under FRRF 30-Day Guarantee.
              </p>
            </div>

            {/* Dispatch Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
              <button
                onClick={() => setAcceptedJob(true)}
                className={`flex-1 flex items-center justify-center gap-2 font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs sm:text-sm py-3 sm:py-3.5 px-5 rounded-xl transition-all duration-200 cursor-pointer text-center ${
                  acceptedJob
                    ? 'bg-emerald-500 text-slate-950 shadow-[0_0_24px_rgba(16,185,129,0.4)]'
                    : 'bg-gradient-to-br from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-white shadow-[0_0_24px_rgba(255,107,53,0.38)]'
                }`}
              >
                {acceptedJob ? '✓ In Progress (Navigating)' : 'Accept & Start Navigation →'}
              </button>

              <a
                href="tel:+919876543210"
                className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/12 text-white font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs sm:text-sm py-3 sm:py-3.5 px-5 rounded-xl transition-all duration-200 cursor-pointer text-center"
              >
                📞 Call Client
              </a>

              <a
                href="https://maps.google.com/?q=Arera+Colony,+Bhopal"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-cyan-500/30 text-cyan-300 font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs sm:text-sm py-3 sm:py-3.5 px-5 rounded-xl transition-all duration-200 cursor-pointer text-center"
              >
                🗺️ View GPS Route
              </a>
            </div>
          </div>
        </section>

        {/* ── Upcoming Jobs Queue ──────────────────────────────── */}
        <section className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 sm:mb-4">
            <div>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-lg sm:text-xl md:text-2xl text-white">
                Upcoming Queue
              </h2>
              <p className="text-[11px] sm:text-xs text-white/50">Scheduled plumbing service orders queued for today</p>
            </div>
            <span className="text-[11px] sm:text-xs font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full self-start sm:self-auto">
              3 Confirmed Leads
            </span>
          </div>

          <div className="space-y-3">
            {upcomingJobs.map((job) => (
              <div
                key={job.id}
                className="bg-[#0A1628]/85 backdrop-blur-xl border border-white/10 hover:border-cyan-500/40 rounded-2xl p-4 sm:p-5 transition-all duration-200 group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                  <div className="flex items-start gap-3 sm:gap-4 min-w-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-lg sm:text-xl shrink-0 group-hover:scale-105 transition-transform">
                      {job.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-bold text-sm sm:text-base text-white">{job.name}</p>
                        <span className="text-[9px] sm:text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-white/5 text-white/60 border border-white/10">
                          {job.category}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-cyan-300 font-medium mt-0.5 truncate">
                        {job.service}
                      </p>
                      <p className="text-[11px] sm:text-xs text-white/40 mt-1 truncate">
                        📍 {job.address} • <strong className="text-white/60">{job.distance}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] sm:text-[11px] text-white/40 font-medium block">{job.timeSlot}</span>
                      <span className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-base sm:text-lg text-emerald-400">
                        {job.price}
                      </span>
                    </div>

                    <a
                      href={`tel:${job.phone}`}
                      className="px-3.5 py-1.5 sm:py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white transition-all cursor-pointer"
                    >
                      Call
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Footer Navigation Hub ────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white/4 border border-white/10 rounded-2xl p-4 sm:p-6 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/25 flex items-center justify-center text-orange-400 text-lg shrink-0">
              🛠️
            </span>
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-bold text-white truncate">Technician Partner Network</h4>
              <p className="text-[11px] sm:text-xs text-white/50 truncate">
                Logged in as <strong>{userData?.FullName || 'Technician'}</strong> ({userData?.contact || '+91 98765 43210'})
              </p>
            </div>
          </div>

          <div className="flex flex-col xs:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={() => navigate('/Technician-Profile')}
              className="flex-1 sm:flex-none text-center bg-gradient-to-br from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-white font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl shadow-[0_0_24px_rgba(255,107,53,0.38)] transition-all duration-200 cursor-pointer"
            >
              My Profile →
            </button>
            <button
              onClick={() => navigate('/TechnicianNotification')}
              className="flex-1 sm:flex-none text-center bg-white/5 hover:bg-white/10 border border-white/12 text-white font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs sm:text-sm px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl transition-all duration-200 cursor-pointer"
            >
              Alerts
            </button>
            <button
              onClick={onLogout}
              disabled={loggingOut}
              className="flex-1 sm:flex-none text-center bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/25 text-rose-400 font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs sm:text-sm px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-50"
            >
              {loggingOut ? 'Logging out...' : 'Logout'}
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}
