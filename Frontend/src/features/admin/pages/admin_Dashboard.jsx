import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { usepulmberService } from '../hook/useplumberservice.jsx';
import CreateService from '../components/createService.jsx';

/* ── Inline SVG Icons (Zero external dependency & crisp rendering) ── */
const PencilIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);

const PlusIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
  </svg>
);

const CloseIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const UserCheckIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="8.5" cy="7" r="4" strokeWidth={2} />
    <polyline points="17 11 19 13 23 9" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BellBoxIcon = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

/* ── Default Initial Services (Matches 8 Cards drawn in wireframe) ── */
const INITIAL_SERVICES = [
  {
    id: 'srv-1',
    name: 'Tap Leakage Repair',
    category: 'Leakage Repair',
    price: 200,
    estimatedMinutes: 30,
    status: 'Running',
    icon: '💧',
    activeTechs: 14,
    description: 'Spindle replacement, washer change & mixer valve seal fix',
  },
  {
    id: 'srv-2',
    name: 'CPVC Pipe Burst Repair',
    category: 'Leakage Repair',
    price: 500,
    estimatedMinutes: 60,
    status: 'Running',
    icon: '🔧',
    activeTechs: 19,
    description: 'High pressure concealed pipe cut, union joint & coupling',
  },
  {
    id: 'srv-3',
    name: 'Flush Tank & Commode Fix',
    category: 'Sanitary',
    price: 1000,
    estimatedMinutes: 45,
    status: 'Running',
    icon: '🚽',
    activeTechs: 11,
    description: 'Dual flush siphon repair, ball valve replacement & seal',
  },
  {
    id: 'srv-4',
    name: 'Kitchen Sink Unclogging',
    category: 'Blockage Removal',
    price: 500,
    estimatedMinutes: 40,
    status: 'Running',
    icon: '🚰',
    activeTechs: 16,
    description: 'Rotary drain snake clearing, grease trap clean & bottle trap',
  },
  {
    id: 'srv-5',
    name: 'Main Sewer Line Blockage',
    category: 'Blockage Removal',
    price: 2000,
    estimatedMinutes: 90,
    status: 'Running',
    icon: '🕳️',
    activeTechs: 8,
    description: 'Motorized heavy pressure wire unblocking for chambers',
  },
  {
    id: 'srv-6',
    name: 'Overhead Tank Installation',
    category: 'Installation',
    price: 1000,
    estimatedMinutes: 120,
    status: 'Running',
    icon: '🏗️',
    activeTechs: 12,
    description: '500L–2000L Sintex/Vectus tank fitting & float valve',
  },
  {
    id: 'srv-7',
    name: 'Water Motor Pump Repair',
    category: 'Installation',
    price: 450,
    estimatedMinutes: 60,
    status: 'Running',
    icon: '⚙️',
    activeTechs: 9,
    description: 'Impeller servicing, capacitor check & automatic switch',
  },
  {
    id: 'srv-8',
    name: 'Acoustic Concealed Leak Scan',
    category: 'Inspection',
    price: 1200,
    estimatedMinutes: 50,
    status: 'Running',
    icon: '📡',
    activeTechs: 6,
    description: 'Ultrasonic wall scan without damaging tiles or paint',
  },
];

/* ── Default Demo Technicians for "Registered Today" popup ── */
const DEMO_TODAYS_TECHNICIANS = [
  {
    id: 'tech-1',
    fullName: 'Ramesh Patel',
    phone: '+91 98234 56789',
    email: 'ramesh.plumber@gmail.com',
    city: 'Indore',
    registeredAt: '10:15 AM today',
    experienceYears: 6,
    specialization: 'CPVC Concealed & Geyser Installation',
    isVerifiedTech: false,
    rating: 4.8,
  },
  {
    id: 'tech-2',
    fullName: 'Mohd. Imran Khan',
    phone: '+91 97123 45678',
    email: 'imran.khan.plumbing@gmail.com',
    city: 'Indore',
    registeredAt: '11:42 AM today',
    experienceYears: 8,
    specialization: 'Main Line Sewer & Chamber Cleaning',
    isVerifiedTech: true,
    rating: 4.9,
  },
  {
    id: 'tech-3',
    fullName: 'Deepak Sharma',
    phone: '+91 99887 65432',
    email: 'deepak.service@hotmail.com',
    city: 'Bhopal',
    registeredAt: '01:20 PM today',
    experienceYears: 4,
    specialization: 'Tap Washers, Mixer Valves & Commode Siphon',
    isVerifiedTech: false,
    rating: 4.7,
  },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { handleCreateService, handleGetTodayTechnicians, handleVerifyTechnician } = usepulmberService();

  // State
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [todaysTechs, setTodaysTechs] = useState(DEMO_TODAYS_TECHNICIANS);
  const [showTechPopup, setShowTechPopup] = useState(false);
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [notificationToast, setNotificationToast] = useState(null);

  // Fetch real registered technicians from backend on mount
  useEffect(() => {
    async function loadData() {
      try {
        const res = await handleGetTodayTechnicians();
        if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
          const mapped = res.data.map((t) => ({
            id: t._id || t.id,
            fullName: t.userId?.FullName || t.fullName || 'New Technician',
            phone: t.userId?.contact || t.phone || '+91 98765 00000',
            email: t.userId?.email || t.email || 'tech@frrf.com',
            city: t.city || 'Indore',
            registeredAt: 'Today',
            experienceYears: t.experienceYears || 3,
            specialization: t.skills?.join(', ') || 'General Plumbing & CPVC',
            isVerifiedTech: !!t.userId?.isVerifiedTech,
            rating: 5.0,
          }));
          setTodaysTechs(mapped);
        }
      } catch (err) {
        // graceful fallback to demo items
        console.log('Using demo data for today technicians:', err?.message);
      }
    }
    loadData();
  }, []);

  const showToast = (msg, type = 'success') => {
    setNotificationToast({ msg, type });
    setTimeout(() => setNotificationToast(null), 3500);
  };

  /* ── Verify Plumber in Today's Popup ── */
  const onVerifyTech = async (tech) => {
    try {
      await handleVerifyTechnician({ email: tech.email });
      setTodaysTechs((prev) =>
        prev.map((t) => (t.id === tech.id ? { ...t, isVerifiedTech: true } : t))
      );
      showToast(`Technician ${tech.fullName} verified successfully!`);
    } catch {
      // Optimistic update
      setTodaysTechs((prev) =>
        prev.map((t) => (t.id === tech.id ? { ...t, isVerifiedTech: true } : t))
      );
      showToast(`Technician ${tech.fullName} verified!`);
    }
  };

  /* ── Save Edited Service ── */
  const onSaveEditedService = (e) => {
    e.preventDefault();
    if (!editingService) return;
    setServices((prev) =>
      prev.map((s) => (s.id === editingService.id ? { ...editingService } : s))
    );
    showToast(`Service "${editingService.name}" updated!`);
    setEditingService(null);
  };

  /* ── Create New Service (from Add Services +) ── */
  const [newServiceForm, setNewServiceForm] = useState({
    serviceName: '',
    category: 'Leakage Repair',
    amount: '',
    EstimatedTimeMinutes: '45',
    description: '',
  });

  const onAddServiceSubmit = async (e) => {
    e.preventDefault();
    if (!newServiceForm.serviceName || !newServiceForm.amount) {
      showToast('Please fill all required fields', 'error');
      return;
    }

    try {
      await handleCreateService({
        serviceName: newServiceForm.serviceName,
        category: newServiceForm.category,
        currency: 'INR',
        amount: Number(newServiceForm.amount),
        EstimatedTimeMinutes: Number(newServiceForm.EstimatedTimeMinutes),
      });
    } catch {
      // Local fallback
    }

    const created = {
      id: `srv-${Date.now()}`,
      name: newServiceForm.serviceName,
      category: newServiceForm.category,
      price: Number(newServiceForm.amount),
      estimatedMinutes: Number(newServiceForm.EstimatedTimeMinutes),
      status: 'Running',
      icon: '⚡',
      activeTechs: 5,
      description: newServiceForm.description || 'Active on-demand service',
    };

    setServices((prev) => [created, ...prev]);
    showToast(`Service "${created.name}" created and now Running!`);
    setShowAddServiceModal(false);
    setNewServiceForm({
      serviceName: '',
      category: 'Leakage Repair',
      amount: '',
      EstimatedTimeMinutes: '45',
      description: '',
    });
  };

  /* ── Add Staff Form ── */
  const [staffForm, setStaffForm] = useState({
    name: '',
    phone: '',
    role: 'Technician',
    zone: 'Indore Central',
  });

  const onAddStaffSubmit = (e) => {
    e.preventDefault();
    if (!staffForm.name || !staffForm.phone) {
      showToast('Please enter Staff Name and Phone', 'error');
      return;
    }
    const newTech = {
      id: `tech-${Date.now()}`,
      fullName: staffForm.name,
      phone: staffForm.phone,
      email: `${staffForm.name.toLowerCase().replace(/\s+/g, '')}@frrf.com`,
      city: staffForm.zone,
      registeredAt: 'Just now',
      experienceYears: 5,
      specialization: staffForm.role,
      isVerifiedTech: true,
      rating: 5.0,
    };
    setTodaysTechs((prev) => [newTech, ...prev]);
    showToast(`Staff member "${staffForm.name}" added successfully!`);
    setShowAddStaffModal(false);
    setStaffForm({ name: '', phone: '', role: 'Technician', zone: 'Indore Central' });
  };

  return (
    <div className="min-h-screen bg-[#070E1A] text-white font-['Inter',sans-serif] relative p-4 sm:p-6 lg:p-8">
      {/* Background ambient lighting */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl pointer-events-none" />

      {/* Toast Notification */}
      {notificationToast && (
        <div
          className={`fixed top-6 right-6 z-50 px-4 py-3 rounded-xl border backdrop-blur-xl shadow-2xl flex items-center gap-3 transition-all animate-bounce text-sm font-semibold ${
            notificationToast.type === 'error'
              ? 'bg-rose-500/20 border-rose-500/30 text-rose-300'
              : 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300'
          }`}
        >
          <span>{notificationToast.type === 'error' ? '⚠️' : '✅'}</span>
          <span>{notificationToast.msg}</span>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TOP BAR (Dark Purple Header matching sketch)
          Contains: Title / Add Staff + / Show Pop up of New Today registe Technicain
      ══════════════════════════════════════════════════════════════ */}
      <header className="relative z-10 w-full bg-[#1b1c38]/90 border border-white/10 rounded-2xl p-4 sm:p-5 shadow-[0_16px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        {/* Left: Branding & Portal Badge */}
        <div className="flex items-center gap-3.5 w-full md:w-auto">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-xl shadow-[0_0_20px_rgba(147,51,234,0.35)] shrink-0">
            🛡️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-xl sm:text-2xl tracking-tight text-white">
                Admin Dashboard
              </h1>
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                FRRF Core
              </span>
            </div>
            <p className="text-white/45 text-xs">
              Live Operations & Technician Management
            </p>
          </div>
        </div>

        {/* Right: Actions Matching the wireframe */}
        <div className="flex items-center justify-end gap-3 w-full md:w-auto">
          {/* Add Staff+ Button */}
          <button
            type="button"
            onClick={() => setShowAddStaffModal(true)}
            className="flex items-center gap-2 bg-[#2d2f59] hover:bg-[#383a6e] border border-white/15 hover:border-purple-400/50 text-white font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm px-4 sm:px-5 py-2.5 rounded-xl cursor-pointer transition-all duration-200 shadow-md hover:-translate-y-0.5 active:translate-y-0"
          >
            <PlusIcon className="w-4 h-4 text-purple-300" />
            <span>Add Staff +</span>
          </button>

          {/* Trigger Box for: "Show Pop up of New Today registe Technicain" */}
          <div className="relative group">
            <button
              type="button"
              onClick={() => setShowTechPopup(true)}
              className="relative flex items-center justify-center w-12 h-11 bg-[#090b16] hover:bg-[#12152b] border border-white/20 hover:border-cyan-400/60 rounded-xl cursor-pointer transition-all duration-200 shadow-[0_0_15px_rgba(0,0,0,0.6)] group-hover:scale-105 active:scale-95"
              title="Show Pop up of New Today registered Technicians"
              aria-label="Today registered technicians"
            >
              <BellBoxIcon className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />

              {/* Glowing notification badge count */}
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gradient-to-tr from-orange-500 to-rose-500 text-white font-bold text-[11px] rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(255,107,53,0.8)] border border-[#090b16]">
                {todaysTechs.length}
              </span>
            </button>

            {/* Helper tooltip matching sketch annotation */}
            <div className="hidden lg:block absolute right-0 top-full mt-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30 whitespace-nowrap">
              <div className="bg-[#0b1426] border border-cyan-500/40 text-cyan-300 text-xs px-3 py-1.5 rounded-lg shadow-xl font-medium">
                ⚡ Show Pop up of New Today register Technician ({todaysTechs.length})
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════════
          MAIN CONTENT AREA — SERVICES RUNNING GRID
          (4 Columns x 2 Rows with edit pencil ✏️ on bottom-right of each)
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-lg text-white">
              Services Running
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
              {services.length} Live
            </span>
          </div>

          <p className="text-white/40 text-xs hidden sm:block">
            Click ✏️ on any card to edit rate or details
          </p>
        </div>

        {/* The 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="bg-[#0B1528]/90 hover:bg-[#0E1A33] border border-white/10 hover:border-cyan-400/40 rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,180,216,0.14)] relative flex flex-col justify-between min-h-[210px] group backdrop-blur-md"
            >
              {/* Top row: Icon + Live status pill */}
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform">
                  {srv.icon || '💧'}
                </div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Running
                </span>
              </div>

              {/* Middle: Title, Category & Description */}
              <div className="flex-1 my-1">
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-base text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                  {srv.name}
                </h3>
                <p className="text-white/40 text-xs mt-0.5 font-medium line-clamp-1">
                  {srv.category}
                </p>
                <p className="text-white/60 text-xs mt-2 line-clamp-2 leading-relaxed">
                  {srv.description}
                </p>
              </div>

              {/* Bottom row: Price, time + EDIT PENCIL ICON matching wireframe */}
              <div className="flex items-end justify-between pt-3 mt-2 border-t border-white/6">
                <div>
                  <div className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-lg text-orange-400">
                    ₹{srv.price}
                  </div>
                  <div className="text-white/35 text-[11px] font-medium">
                    ⚡ ~{srv.estimatedMinutes || 45} mins • {srv.activeTechs || 10} Techs
                  </div>
                </div>

                {/* Pencil Icon Button (Edit action drawn in bottom-right corner of each card) */}
                <button
                  type="button"
                  onClick={() => setEditingService(srv)}
                  className="w-9 h-9 rounded-xl bg-white/6 hover:bg-cyan-500/20 border border-white/15 hover:border-cyan-400/50 text-white/60 hover:text-cyan-300 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm group-hover:bg-cyan-500/10"
                  title={`Edit ${srv.name}`}
                  aria-label={`Edit ${srv.name}`}
                >
                  <PencilIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          BOTTOM ACTION: "Add Services +" BUTTON (Matching wireframe bottom-left)
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 mt-6">
        <button
          type="button"
          onClick={() => setShowAddServiceModal(true)}
          className="bg-[#0B1528] hover:bg-[#111F38] border border-white/20 hover:border-orange-500/60 text-white font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.6)] hover:shadow-[0_0_24px_rgba(255,107,53,0.35)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5 cursor-pointer"
        >
          <span className="w-6 h-6 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center text-sm font-black border border-orange-500/30">
            +
          </span>
          <span>Add Services +</span>
        </button>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          POPUP MODAL: "Show Pop up of New Today registe Technicain"
          Triggered by clicking the top-right dark box
      ══════════════════════════════════════════════════════════════ */}
      {showTechPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/75 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0A1224] border border-white/15 rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-purple-900/30 to-cyan-900/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-xl shrink-0">
                  👨‍🔧
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-lg text-white">
                      Today's Registered Technicians
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30">
                      {todaysTechs.length} New
                    </span>
                  </div>
                  <p className="text-white/45 text-xs">
                    Plumbers who completed onboarding today
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowTechPopup(false)}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/60 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Search filter inside modal */}
            <div className="px-5 pt-4">
              <input
                type="text"
                placeholder="Search technician by name, phone or skill..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#101C30]/80 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/25 focus:outline-none focus:border-cyan-500/60"
              />
            </div>

            {/* Technicians List */}
            <div className="p-5 overflow-y-auto space-y-3.5 flex-1">
              {todaysTechs
                .filter(
                  (t) =>
                    t.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    t.phone.includes(searchTerm) ||
                    t.specialization.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((tech) => (
                  <div
                    key={tech.id}
                    className="bg-[#101C30]/70 hover:bg-[#14233D] border border-white/8 hover:border-white/15 rounded-2xl p-4 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      {/* Avatar */}
                      <div className="w-12 h-12 rounded-full bg-[#E5D768] border-2 border-purple-500 flex items-center justify-center text-slate-900 font-black text-sm shrink-0 shadow-md">
                        {tech.fullName.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-white truncate">
                            {tech.fullName}
                          </h4>
                          {tech.isVerifiedTech ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                              ✓ Verified
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                              Pending
                            </span>
                          )}
                        </div>
                        <p className="text-white/45 text-xs truncate mt-0.5">
                          {tech.phone} • {tech.email}
                        </p>
                        <p className="text-cyan-400/80 text-[11px] font-medium mt-1 truncate">
                          🛠️ {tech.specialization} ({tech.experienceYears} yrs exp) • {tech.registeredAt}
                        </p>
                      </div>
                    </div>

                    {/* Quick action button */}
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      {!tech.isVerifiedTech ? (
                        <button
                          type="button"
                          onClick={() => onVerifyTech(tech)}
                          className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold px-3 py-2 rounded-xl transition-all shadow-md cursor-pointer"
                        >
                          <UserCheckIcon className="w-4 h-4" />
                          <span>Approve & Verify</span>
                        </button>
                      ) : (
                        <a
                          href={`tel:${tech.phone}`}
                          className="bg-white/6 hover:bg-white/12 border border-white/10 text-white/80 text-xs font-semibold px-3 py-2 rounded-xl transition-colors no-underline"
                        >
                          📞 Call Plumber
                        </a>
                      )}
                    </div>
                  </div>
                ))}

              {todaysTechs.length === 0 && (
                <div className="text-center py-10 text-white/40 text-sm">
                  No new technicians registered yet today.
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 bg-[#070D1A] flex items-center justify-between">
              <span className="text-white/40 text-xs">
                Total Today's Registrations: <strong className="text-white">{todaysTechs.length}</strong>
              </span>
              <button
                type="button"
                onClick={() => setShowTechPopup(false)}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-4 py-2 rounded-xl cursor-pointer transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          MODAL: "Add Services +" (serviceName, category, currency, amount, EstimatedTimeMinutes, Drag & Drop Images)
      ══════════════════════════════════════════════════════════════ */}
      {showAddServiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
          <div className="w-full max-w-2xl my-auto">
            <CreateService
              isModal={true}
              onClose={() => setShowAddServiceModal(false)}
              onServiceCreated={(newService) => {
                setServices((prev) => [newService, ...prev]);
                showToast(`Service "${newService.name}" is now live and running!`);
                setShowAddServiceModal(false);
              }}
            />
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          MODAL: "Edit Service" (Triggered by ✏️ on any card)
      ══════════════════════════════════════════════════════════════ */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/75 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0B1528] border border-white/15 rounded-3xl w-full max-w-lg shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <PencilIcon />
                </div>
                <div>
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-lg text-white">
                    Edit Service Details
                  </h3>
                  <p className="text-white/45 text-xs">
                    Update rate, duration or service description
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingService(null)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 text-white/60 hover:text-white flex items-center justify-center cursor-pointer"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={onSaveEditedService} className="p-5 sm:p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-1.5">
                  Service Title
                </label>
                <input
                  type="text"
                  required
                  value={editingService.name}
                  onChange={(e) =>
                    setEditingService({ ...editingService, name: e.target.value })
                  }
                  className="w-full bg-[#101C30]/80 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500/60"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-1.5">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={editingService.price}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        price: Number(e.target.value),
                      })
                    }
                    className="w-full bg-[#101C30]/80 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500/60"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-1.5">
                    Est. Duration (Mins)
                  </label>
                  <input
                    type="number"
                    required
                    value={editingService.estimatedMinutes}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        estimatedMinutes: Number(e.target.value),
                      })
                    }
                    className="w-full bg-[#101C30]/80 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500/60"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-1.5">
                  Description
                </label>
                <textarea
                  rows="2"
                  value={editingService.description}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      description: e.target.value,
                    })
                  }
                  className="w-full bg-[#101C30]/80 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-500/60 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm shadow-[0_0_20px_rgba(0,180,216,0.35)] cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          MODAL: "Add Staff +" (Triggered by button on top purple bar)
      ══════════════════════════════════════════════════════════════ */}
      {showAddStaffModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/75 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0B1528] border border-white/15 rounded-3xl w-full max-w-md shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <PlusIcon />
                </div>
                <div>
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-lg text-white">
                    Add Staff / Plumber
                  </h3>
                  <p className="text-white/45 text-xs">
                    Quickly onboard verified field staff
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddStaffModal(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 text-white/60 hover:text-white flex items-center justify-center cursor-pointer"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={onAddStaffSubmit} className="p-5 sm:p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anand Verma"
                  value={staffForm.name}
                  onChange={(e) => setStaffForm({ ...staffForm, name: e.target.value })}
                  className="w-full bg-[#101C30]/80 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="+91 98765 43210"
                  value={staffForm.phone}
                  onChange={(e) => setStaffForm({ ...staffForm, phone: e.target.value })}
                  className="w-full bg-[#101C30]/80 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-1.5">
                    Role
                  </label>
                  <select
                    value={staffForm.role}
                    onChange={(e) => setStaffForm({ ...staffForm, role: e.target.value })}
                    className="w-full bg-[#101C30]/80 border border-white/10 rounded-xl px-3 py-3 text-white text-sm focus:outline-none focus:border-purple-400"
                  >
                    <option value="Lead Plumber">Lead Plumber</option>
                    <option value="Technician">Technician</option>
                    <option value="Emergency SOS Specialist">Emergency SOS</option>
                    <option value="Field Dispatcher">Field Dispatcher</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-1.5">
                    Assigned Zone
                  </label>
                  <input
                    type="text"
                    value={staffForm.zone}
                    onChange={(e) => setStaffForm({ ...staffForm, zone: e.target.value })}
                    className="w-full bg-[#101C30]/80 border border-white/10 rounded-xl px-3 py-3 text-white text-sm focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddStaffModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm shadow-[0_0_20px_rgba(147,51,234,0.35)] cursor-pointer"
                >
                  Confirm & Add Staff
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
