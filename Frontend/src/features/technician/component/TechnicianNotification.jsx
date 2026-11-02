import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

export default function TechnicianNotification() {
  useGoogleFonts();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const [notificationList, setNotificationList] = useState([
    {
      id: 1,
      type: 'emergency',
      title: 'Emergency Leakage Repair',
      customer: 'Aman Verma',
      phone: '+91 98260 12345',
      serviceType: 'Concealed CPVC Pipe Burst & Bathroom Wall Leak',
      category: 'Leakage Repair',
      icon: '💧',
      location: 'Plot 45, MP Nagar Zone-II, Bhopal',
      distance: '1.8 km away',
      estimatedPrice: '₹450 + Parts',
      time: '8 mins ago',
      urgent: true,
      unread: true,
    },
    {
      id: 2,
      type: 'blockage',
      title: 'High Priority Sewer Blockage',
      customer: 'Rohit Malviya',
      phone: '+91 98931 67890',
      serviceType: 'Kitchen Sink & Trap Line Deep Clog Removal',
      category: 'Blockage Removal',
      icon: '🔧',
      location: 'House 12, Indrapuri Sector C, Bhopal',
      distance: '3.4 km away',
      estimatedPrice: '₹600',
      time: '35 mins ago',
      urgent: true,
      unread: true,
    },
    {
      id: 3,
      type: 'installation',
      title: 'Water Tank & Motor Fitting',
      customer: 'Sneha Patel',
      phone: '+91 97555 44332',
      serviceType: '1000L Overhead Sintex Tank & 1HP Pump Commissioning',
      category: 'Smart Installation',
      icon: '⚙️',
      location: 'Flat 302, Arera Colony, Bhopal',
      distance: '2.1 km away',
      estimatedPrice: '₹1,200',
      time: '2 hours ago',
      urgent: false,
      unread: false,
    },
    {
      id: 4,
      type: 'sanitary',
      title: 'Sanitary & Mixer Tap Repair',
      customer: 'Kavita Joshi',
      phone: '+91 99812 77889',
      serviceType: 'Quarter-Turn Wall Mixer Tap & Flush Valve Replacement',
      category: 'Bathroom Fixtures',
      icon: '🚰',
      location: 'E-3, Shahpura Lake View, Bhopal',
      distance: '4.2 km away',
      estimatedPrice: '₹400',
      time: 'Yesterday',
      urgent: false,
      unread: false,
    },
  ]);

  const markAsRead = (id) => {
    setNotificationList((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const dismissNotification = (id) => {
    setNotificationList((prev) => prev.filter((n) => n.id !== id));
  };

  const markAllRead = () => {
    setNotificationList((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const filtered = notificationList.filter((n) => {
    if (filter === 'unread') return n.unread;
    if (filter === 'urgent') return n.urgent;
    return true;
  });

  const unreadCount = notificationList.filter((n) => n.unread).length;

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

      {/* ── Top Header Bar ───────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[#0A1628]/85 backdrop-blur-2xl border-b border-white/10">
        <div className="max-w-4xl mx-auto px-3.5 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <button
                onClick={() => navigate('/Technician-Dashboard')}
                className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl transition-all cursor-pointer shrink-0"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 19l-7-7 7-7" />
                </svg>
                <span className="hidden xs:inline">Dashboard</span>
              </button>

              <div className="flex items-center gap-2 min-w-0">
                <h1 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-base sm:text-xl md:text-2xl text-white tracking-tight truncate">
                  Dispatch Alerts
                </h1>
                {unreadCount > 0 && (
                  <span className="px-2 sm:px-2.5 py-0.5 bg-orange-500 text-white text-[10px] sm:text-xs font-bold rounded-full shadow-[0_0_12px_rgba(255,107,53,0.5)] shrink-0">
                    {unreadCount} New
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-[11px] sm:text-xs text-cyan-400 hover:text-cyan-300 font-bold px-1.5 sm:px-2 py-1 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Mark All Read
                </button>
              )}
              <button
                onClick={() => navigate('/Technician-Profile')}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden border-2 border-cyan-500/40 ring-2 ring-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.3)] transition-all cursor-pointer shrink-0"
              >
                <img
                  src="https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=100&q=80"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </button>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: 'all', label: 'All Dispatches' },
              { id: 'unread', label: `Unread (${unreadCount})` },
              { id: 'urgent', label: '🚨 Urgent Emergency' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs md:text-sm font-bold rounded-xl transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  filter === tab.id
                    ? 'bg-gradient-to-r from-orange-500 to-orange-700 text-white shadow-[0_0_20px_rgba(255,107,53,0.35)]'
                    : 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ── Main Notifications Content ───────────────────────── */}
      <main
        className={`relative z-10 max-w-4xl mx-auto px-3.5 sm:px-6 py-6 sm:py-8 transition-all duration-700 ease-out transform ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <div className="space-y-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`bg-[#0A1628]/85 backdrop-blur-2xl border rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-200 ${
                item.unread
                  ? 'border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/30'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              {/* Header Card */}
              <div className="p-4 sm:p-5 md:p-6 border-b border-white/10 flex items-start justify-between gap-3 sm:gap-4">
                <div className="flex items-start gap-3 sm:gap-3.5 min-w-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-xl sm:text-2xl shrink-0">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-sm sm:text-base md:text-lg text-white break-words">
                        {item.title}
                      </h3>
                      {item.urgent && (
                        <span className="px-2 py-0.5 bg-rose-500/15 border border-rose-500/30 text-rose-400 text-[9px] sm:text-[10px] font-bold rounded-full tracking-wider uppercase animate-pulse">
                          🚨 IMMEDIATE
                        </span>
                      )}
                      <span className="text-[10px] sm:text-[11px] font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/25 px-2 py-0.5 rounded-full">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-white/50 flex items-center gap-1.5 mt-1 truncate">
                      <span>⏱️</span>
                      <span>Received {item.time}</span>
                      <span className="text-white/20">•</span>
                      <span className="text-cyan-300 font-medium hidden xs:inline">Auto-assigned</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {item.unread && (
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
                  )}
                  <button
                    onClick={() => dismissNotification(item.id)}
                    className="text-white/30 hover:text-white/70 p-1.5 transition-colors cursor-pointer"
                    title="Dismiss notification"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Service & Customer Details */}
              <div className="p-4 sm:p-5 md:p-6 bg-white/[0.02]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-4">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3 sm:p-3.5">
                    <p className="text-[10px] uppercase font-bold text-white/50 tracking-wider mb-1">
                      Customer
                    </p>
                    <p className="font-bold text-white text-xs sm:text-sm">{item.customer}</p>
                    <p className="font-mono text-[11px] sm:text-xs text-white/60 mt-0.5">{item.phone}</p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3 sm:p-3.5">
                    <p className="text-[10px] uppercase font-bold text-white/50 tracking-wider mb-1">
                      Estimated Payout
                    </p>
                    <p className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-emerald-400 text-base sm:text-lg">
                      {item.estimatedPrice}
                    </p>
                    <p className="text-[10px] text-emerald-400/80 font-medium mt-0.5">Instant credit on completion</p>
                  </div>
                </div>

                {/* Service Details Box */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 sm:p-4 mb-4">
                  <p className="text-[10px] uppercase font-bold text-white/50 tracking-wider mb-1">
                    Reported Plumbing Problem
                  </p>
                  <p className="text-xs sm:text-sm text-cyan-300 font-semibold mb-2 leading-relaxed">
                    {item.serviceType}
                  </p>

                  <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1.5 text-xs text-white/60 pt-2.5 border-t border-white/10">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span>📍</span>
                      <span className="truncate">{item.location}</span>
                    </div>
                    <span className="px-2 py-0.5 bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-[11px] sm:text-xs font-bold rounded-lg shrink-0 self-start xs:self-auto">
                      {item.distance}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                  <button
                    onClick={() => {
                      markAsRead(item.id);
                      navigate('/Technician-Dashboard');
                    }}
                    className="flex-1 bg-gradient-to-br from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-white font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs sm:text-sm py-2.5 sm:py-3 px-5 rounded-xl shadow-[0_0_20px_rgba(255,107,53,0.35)] transition-all cursor-pointer text-center"
                  >
                    Accept & Dispatch →
                  </button>

                  <a
                    href={`tel:${item.phone}`}
                    className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs sm:text-sm py-2.5 sm:py-3 px-4 rounded-xl transition-all cursor-pointer text-center"
                  >
                    📞 Call Client
                  </a>

                  {item.unread && (
                    <button
                      onClick={() => markAsRead(item.id)}
                      className="bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white font-bold text-xs sm:text-sm py-2.5 sm:py-3 px-4 rounded-xl transition-all cursor-pointer text-center"
                    >
                      Mark Read
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {filtered.length === 0 && (
            <div className="text-center py-12 sm:py-16 bg-[#0A1628]/80 backdrop-blur-2xl border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3 sm:mb-4 text-2xl sm:text-3xl">
                🔔
              </div>
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-lg sm:text-xl text-white mb-1.5 sm:mb-2">
                No Notifications Found
              </h3>
              <p className="text-xs sm:text-sm text-white/50 max-w-sm mx-auto mb-5 sm:mb-6 leading-relaxed">
                You're all caught up! New emergency plumbing calls and scheduled customer requests will appear here in real time.
              </p>
              <button
                onClick={() => setFilter('all')}
                className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold transition-all cursor-pointer"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
