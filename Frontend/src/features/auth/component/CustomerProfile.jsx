import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';
import Navbar from "../../../App/Navbar.jsx"
import { useOrder } from '../../order/hook/useOrder.jsx';

/* ── Inline Feather/Lucide Icon Components (Zero-Dependency & Pixel-Crisp) ── */
const Calendar = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const MapPin = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const User = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const LogOut = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const Edit2 = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
  </svg>
);

const Trash2 = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

const Wrench = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

const ShieldCheck = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const PhoneCall = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const FileText = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const Sparkles = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);

/* ── Comprehensive Stitch Design System Bookings (7 Items) ── */
const STITCH_BOOKINGS = [
  {
    id: 'FRRF-9842',
    service: 'CPVC High-Pressure Pipe Burst & Valve Repair',
    category: 'Emergency Dispatch',
    icon: '⚡',
    status: 'in-progress',
    statusLabel: 'Technician En Route (ETA 14 Mins)',
    date: 'Today, 31 Oct 2026',
    timeSlot: '11:00 AM – 12:30 PM',
    price: 649,
    address: 'Flat 402, Royal Palms, Palasia, Indore',
    technician: {
      name: 'Marcus Vance',
      badge: 'Master Plumber (Lic. #PL-88421)',
      rating: '4.9 ★',
      eta: '14 Mins Away (2.1 km GPS locked)',
      phone: '+91 98260 99881',
    },
    telemetry: 'Water Pressure: 4.2 Bar • Acoustic Scan: Active',
    warranty: '90-Day Free Service Guarantee',
  },
  {
    id: 'FRRF-8921',
    service: 'Kitchen Sink CPVC Drainage & Blockage De-clogging',
    category: 'Drainage & Clog',
    icon: '🔧',
    status: 'completed',
    statusLabel: 'Completed & Verified',
    date: '12 May 2026',
    timeSlot: '10:30 AM',
    price: 499,
    address: 'Flat 402, Royal Palms, Palasia, Indore',
    technician: {
      name: 'Sunil Parmar',
      badge: 'Certified Technician',
      rating: '4.8 ★',
    },
    warranty: 'Warranty Active (58 Days Remaining)',
  },
  {
    id: 'FRRF-7432',
    service: 'Overhead Tank Booster Pump & CPVC Manifold Installation',
    category: 'Smart Installation',
    icon: '⚙️',
    status: 'completed',
    statusLabel: 'Completed & Verified',
    date: '04 Mar 2026',
    timeSlot: '02:00 PM',
    price: 1299,
    address: 'Suite 305, Corporate Heights, Scheme 54, Indore',
    technician: {
      name: 'Amit Patel',
      badge: 'Senior Motor Specialist',
      rating: '5.0 ★',
    },
    warranty: 'Protected under 90-Day Guarantee',
  },
  {
    id: 'FRRF-6190',
    service: 'Bathroom Mixer Tap & CPVC Riser Line Fitting',
    category: 'Sanitary Fittings',
    icon: '🚰',
    status: 'completed',
    statusLabel: 'Completed & Verified',
    date: '18 Jan 2026',
    timeSlot: '03:15 PM',
    price: 899,
    address: 'Flat 402, Royal Palms, Palasia, Indore',
    technician: {
      name: 'Marcus Vance',
      badge: 'Master Plumber',
      rating: '4.9 ★',
    },
    warranty: 'Warranty Archived',
  },
  {
    id: 'FRRF-5401',
    service: 'Concealed Wall Moisture Scan & Leak Pinpointing',
    category: 'Diagnostic Telemetry',
    icon: '🔍',
    status: 'completed',
    statusLabel: 'Completed & Verified',
    date: '10 Nov 2025',
    timeSlot: '11:45 AM',
    price: 799,
    address: 'Flat 402, Royal Palms, Palasia, Indore',
    technician: {
      name: 'Rameshwar Verma',
      badge: 'Acoustic Diagnostic Tech',
      rating: '4.9 ★',
    },
    warranty: 'Warranty Archived',
  },
  {
    id: 'FRRF-4882',
    service: 'Toilet Flush Tank Float Valve & Jet Spray Overhaul',
    category: 'Sanitary Fittings',
    icon: '🚽',
    status: 'completed',
    statusLabel: 'Completed & Verified',
    date: '28 Aug 2025',
    timeSlot: '04:30 PM',
    price: 349,
    address: 'Suite 305, Corporate Heights, Scheme 54, Indore',
    technician: {
      name: 'Sunil Parmar',
      badge: 'Certified Technician',
      rating: '4.8 ★',
    },
    warranty: 'Warranty Archived',
  },
  {
    id: 'FRRF-3910',
    service: 'Whole House Water Hardness & TDS Inspection',
    category: 'Preventive Audit',
    icon: '🛡️',
    status: 'completed',
    statusLabel: 'Completed & Verified',
    date: '14 May 2025',
    timeSlot: '09:30 AM',
    price: 599,
    address: 'Flat 402, Royal Palms, Palasia, Indore',
    technician: {
      name: 'Amit Patel',
      badge: 'Senior Motor Specialist',
      rating: '5.0 ★',
    },
    warranty: 'Warranty Archived',
  },
];

/* ── Stitch Suggested Preventive Care ── */
const SUGGESTED_SERVICES = [
  {
    title: 'Water Tank Microbial Clean',
    desc: 'Deep chemical-free ultraviolet sterilisation for clean family water.',
    price: '₹499',
    tag: 'Recommended',
    actionText: 'Quick Book',
  },
  {
    title: 'Whole House Pipe Scan',
    desc: 'Digital acoustic scan to uncover micro wall leaks before damage.',
    price: '₹799',
    tag: 'Popular',
    actionText: 'Book Scan',
  },
  {
    title: 'Geyser & Valve Descaling',
    desc: 'Flush hard water scale buildup for 30% faster winter heating.',
    price: '₹349',
    tag: 'Seasonal',
    actionText: 'Book Care',
  },
];

export default function CustomerProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleLogout, handleGetME } = useAuth();
  const {handleGetOrder}=useOrder()
  const reduxUser = useSelector((state) => state.auth?.User);

  // Original User Data from Backend GetMe / Redux with specified fallback
  const [userData, setUserData] = useState({
    FullName: reduxUser?.FullName || 'Raj',
    email: reduxUser?.email || 'Raj@gmail.com',
    contact: reduxUser?.contact || '+917748067975',
    role: reduxUser?.role || 'customer',
    city: reduxUser?.city || 'Indore, MP',
  });


  const [isLoadingApi, setIsLoadingApi] = useState(false);
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookingFilter, setBookingFilter] = useState('all'); // all | active | completed
  const [bookingsList] = useState(STITCH_BOOKINGS);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Address state management
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'Home (Primary Residence)',
      isDefault: true,
      name: userData.FullName,
      phone: userData.contact,
      addressLine: 'Flat 402, Royal Palms, MG Road, Palasia',
      cityState: 'Indore, Madhya Pradesh - 452001',
      landmark: 'Near Apollo Premier Hospital',
    },
    {
      id: 2,
      type: 'Office / Commercial Space',
      isDefault: false,
      name: 'Raj Tech Solutions',
      phone: userData.contact,
      addressLine: 'Suite 305, Corporate Heights, Scheme 54',
      cityState: 'Indore, Madhya Pradesh - 452010',
      landmark: 'Opposite Orbit Mall',
    },
  ]);

  // Form State
  const [profileForm, setProfileForm] = useState({
    name: userData.FullName,
    email: userData.email,
    phone: userData.contact,
    emergencyPhone: '+91 98260 12345',
    city: userData.city,
    preferredTime: 'Morning (09:00 AM – 12:00 PM)',
  });
  const [settingsSuccess, setSettingsSuccess] = useState(false);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [newAddr, setNewAddr] = useState({
    type: 'Home',
    addressLine: '',
    cityState: 'Indore, Madhya Pradesh - 452001',
    landmark: '',
  });

  /* ── Fetch Real Data from GetMe API on Mount ── */
  useEffect(() => {
    let isMounted = true;
    const fetchOriginalUser = async () => {
      try {
        setIsLoadingApi(true);
        // Call backend GetMe API
        const res = await GetMe();
        if (isMounted && res?.data?.user) {
          const u = res.data.user;
          setUserData({
            FullName: u.FullName || 'Raj',
            email: u.email || 'Raj@gmail.com',
            contact: u.contact || '+917748067975',
            role: u.role || 'customer',
            city: u.city || 'Indore, MP',
          });
          setProfileForm((prev) => ({
            ...prev,
            name: u.FullName || 'Raj',
            email: u.email || 'Raj@gmail.com',
            phone: u.contact || '+917748067975',
            city: u.city || 'Indore, MP',
          }));
          dispatch(setUser(u));
        } else if (isMounted && reduxUser) {
          setUserData({
            FullName: reduxUser.FullName || 'Raj',
            email: reduxUser.email || 'Raj@gmail.com',
            contact: reduxUser.contact || '+917748067975',
            role: reduxUser.role || 'customer',
            city: reduxUser.city || 'Indore, MP',
          });
        }
      } catch (err) {
        console.log('GetMe API note (using verified session data):', err?.message);
        if (isMounted && reduxUser) {
          setUserData({
            FullName: reduxUser.FullName || 'Raj',
            email: reduxUser.email || 'Raj@gmail.com',
            contact: reduxUser.contact || '+917748067975',
            role: reduxUser.role || 'customer',
            city: reduxUser.city || 'Indore, MP',
          });
        }
      } finally {
        if (isMounted) setIsLoadingApi(false);
      }
    };

    fetchOriginalUser();
    return () => {
      isMounted = false;
    };
  }, []);
/* Get Order from hook */

useEffect(() => {
handleGetOrder()
}, [])

  const filteredBookings = bookingsList.filter((b) => {
    if (bookingFilter === 'active') return b.status === 'in-progress' || b.status === 'pending';
    if (bookingFilter === 'completed') return b.status === 'completed';
    return true;
  });

  const activeCount = bookingsList.filter((b) => b.status === 'in-progress').length;
  const completedCount = bookingsList.filter((b) => b.status === 'completed').length;

  const onLogoutClick = async () => {
    try {
      if (handleLogout) await handleLogout();
    } catch {
      // ignore
    }
    navigate('/customer');
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setUserData((prev) => ({
      ...prev,
      FullName: profileForm.name,
      contact: profileForm.phone,
    }));
    dispatch(
      setUser({
        ...reduxUser,
        FullName: profileForm.name,
        contact: profileForm.phone,
        email: profileForm.email,
        role: userData.role,
      })
    );
    setSettingsSuccess(true);
    setTimeout(() => setSettingsSuccess(false), 3500);
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newAddr.addressLine.trim()) return;
    const item = {
      id: Date.now(),
      type: newAddr.type || 'Home',
      isDefault: false,
      name: profileForm.name,
      phone: profileForm.phone,
      addressLine: newAddr.addressLine,
      cityState: newAddr.cityState,
      landmark: newAddr.landmark || 'Not specified',
    };
    setAddresses((prev) => [...prev, item]);
    setNewAddr({ type: 'Home', addressLine: '', cityState: 'Indore, Madhya Pradesh - 452001', landmark: '' });
    setShowAddAddressModal(false);
  };

  const handleDeleteAddress = (id) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#070E1A] text-white font-['Plus_Jakarta_Sans',sans-serif] selection:bg-cyan-500/30 selection:text-cyan-300 relative overflow-x-hidden">
      {/* Background Hero Image matching Home.jsx with smooth entrance animation */}
      <div
        className={`fixed inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-out pointer-events-none transform ${
          visible ? 'opacity-35 scale-100' : 'opacity-0 scale-105'
        }`}
        style={{ backgroundImage: `url('/images/hero-bg.png')` }}
      />

      {/* Deep Midnight Navy Gradient Overlays matching Home.jsx */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#070E1A]/95 via-[#0A1628]/92 to-[#070E1A]/98 pointer-events-none" />

      {/* Ambient Glowing Spheres matching Home.jsx */}
      <div className="fixed top-24 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-24 left-10 w-[450px] h-[450px] bg-orange-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Persistent Navbar (untouched) */}
     

      {/* ── Main Container (Comfortable spacing below fixed Navbar) ── */}
      <div
        className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-16 pt-28 sm:pt-32 md:pt-36 transition-all duration-700 ease-out transform ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        
        {/* ── Top Identity & Telemetry Overview Bar ── */}
        <div className="mb-6 bg-[#0A1628]/85 backdrop-blur-2xl border border-white/12 rounded-3xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Cartoon avatar with glasses & purple rim */}
            <div className="relative">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#E5D768] border-3 border-purple-500 flex items-center justify-center shadow-[0_0_18px_rgba(168,85,247,0.35)] overflow-hidden">
                <svg className="w-12 h-12 sm:w-13 sm:h-13 text-slate-800" viewBox="0 0 36 36" fill="none">
                  <circle cx="12" cy="15" r="5" stroke="#1f2937" strokeWidth="2" fill="white" fillOpacity="0.4" />
                  <circle cx="24" cy="15" r="5" stroke="#1f2937" strokeWidth="2" fill="white" fillOpacity="0.4" />
                  <path d="M17 15h2" stroke="#1f2937" strokeWidth="2" />
                  <path d="M7 14l-2 1M29 14l2 1" stroke="#1f2937" strokeWidth="1.5" />
                  <circle cx="12" cy="15" r="1.5" fill="#111827" />
                  <circle cx="24" cy="15" r="1.5" fill="#111827" />
                  <path d="M14 24c1.5 1.5 6.5 1.5 8 0" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-[#070E1A] shadow-[0_0_8px_#34d399]" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white">{userData.FullName}</h2>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                  {userData.role}
                </span>
              </div>
              <p className="text-xs text-white/60 font-mono mt-0.5">
                {userData.email} • {userData.contact}
              </p>
              <p className="text-xs text-cyan-300 font-medium mt-0.5">
                Priority Home Infrastructure • Verified Resident
              </p>
            </div>
          </div>

          {/* Quick KPI stats row from Stitch System */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 md:pt-0 border-t md:border-t-0 border-white/8">
            <div className="bg-[#070E1A]/80 border border-white/8 rounded-2xl px-3 py-2.5 text-center">
              <p className="text-[10px] text-white/40 font-semibold uppercase">Active Dispatch</p>
              <p className="text-base sm:text-lg font-black text-orange-400">{activeCount}</p>
            </div>
            <div className="bg-[#070E1A]/80 border border-white/8 rounded-2xl px-3 py-2.5 text-center">
              <p className="text-[10px] text-white/40 font-semibold uppercase">Completed Repairs</p>
              <p className="text-base sm:text-lg font-black text-cyan-400">{completedCount}</p>
            </div>
            <div className="bg-[#070E1A]/80 border border-white/8 rounded-2xl px-3 py-2.5 text-center">
              <p className="text-[10px] text-white/40 font-semibold uppercase">Warranties Active</p>
              <p className="text-base sm:text-lg font-black text-emerald-400">2 Protected</p>
            </div>
            <div className="bg-[#070E1A]/80 border border-white/8 rounded-2xl px-3 py-2.5 text-center">
              <p className="text-[10px] text-white/40 font-semibold uppercase">Fleet Savings</p>
              <p className="text-base sm:text-lg font-black text-yellow-400">₹18,500</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          
          {/* ================= LEFT: SIDEBAR ================= */}
          <aside className="w-full lg:w-[300px] bg-[#0A1628]/85 backdrop-blur-2xl border border-white/12 rounded-3xl p-5 shrink-0 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
            <nav className="flex flex-col gap-1.5">
              <TabButton
                icon={<Calendar size={18} />}
                label="My Bookings & Services"
                badge={activeCount > 0 ? `${activeCount} Live` : null}
                isActive={activeTab === 'bookings'}
                onClick={() => setActiveTab('bookings')}
              />
              <TabButton
                icon={<MapPin size={18} />}
                label="Saved Addresses"
                badge={`${addresses.length}`}
                isActive={activeTab === 'addresses'}
                onClick={() => setActiveTab('addresses')}
              />
              <TabButton
                icon={<User size={18} />}
                label="Profile Settings"
                isActive={activeTab === 'settings'}
                onClick={() => setActiveTab('settings')}
              />

              <div className="h-px bg-white/10 my-2" />

              {/* Verified Identity card in sidebar */}
              <div className="bg-[#070E1A]/80 border border-white/8 rounded-xl p-3.5 mb-2">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs mb-1">
                  <ShieldCheck size={14} />
                  <span>Work 1st Security Guard</span>
                </div>
                <p className="text-[11px] text-white/60 leading-relaxed font-mono">
                  ID: {userData.FullName.toUpperCase()}-FRRF-09
                </p>
                <p className="text-[11px] text-emerald-400 mt-1">
                  ✓ Verified Resident Protocol
                </p>
              </div>

              {/* Emergency Callout Card in sidebar */}
              <div className="bg-gradient-to-br from-orange-500/10 to-red-500/5 border border-orange-500/20 rounded-xl p-3.5 mb-2">
                <div className="flex items-center gap-2 text-orange-400 font-bold text-xs mb-1">
                  <PhoneCall size={14} />
                  <span>24/7 Leakage SOS</span>
                </div>
                <p className="text-[11px] text-white/60 leading-relaxed">
                  Severe CPVC burst or backflow? Master technician dispatched in 14 mins.
                </p>
                <a
                  href="tel:18001237733"
                  className="mt-2 inline-block text-xs font-bold text-orange-400 hover:text-orange-300 underline"
                >
                  Call Helpline: 1800-123-7733
                </a>
              </div>

              {/* Logout Button */}
              <button
                type="button"
                onClick={onLogoutClick}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-left text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all font-semibold text-sm w-full cursor-pointer"
              >
                <LogOut size={18} />
                <span>Sign Out Account</span>
              </button>
            </nav>
          </aside>

          {/* ================= RIGHT: MAIN CONTENT ================= */}
          <main className="flex-1 w-full bg-[#0A1628]/85 backdrop-blur-2xl border border-white/12 rounded-3xl p-5 sm:p-7 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] min-h-[600px] flex flex-col">
            
            {/* ══════════════════════════════════════════════════
                TAB 1: MY BOOKINGS & ADDED SERVICES (PRIMARY FOCUS)
               ══════════════════════════════════════════════════ */}
            {activeTab === 'bookings' && (
              <div className="animate-in fade-in duration-300 space-y-6">
                
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
                      <span>My Bookings & Added Services</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
                        {bookingsList.length} Total Records
                      </span>
                    </h1>
                    <p className="text-xs sm:text-sm text-white/50 mt-1">
                      Track active dispatches, view digital warranty cards, or rebook trusted plumbers for {userData.FullName}.
                    </p>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex items-center bg-[#070E1A]/90 p-1 rounded-xl border border-white/10 shrink-0 self-start sm:self-auto">
                    <button
                      type="button"
                      onClick={() => setBookingFilter('all')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        bookingFilter === 'all'
                          ? 'bg-cyan-500 text-[#070E1A] shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      All ({bookingsList.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setBookingFilter('active')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        bookingFilter === 'active'
                          ? 'bg-orange-500 text-white shadow-[0_0_10px_rgba(249,115,22,0.4)]'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      Active ({activeCount})
                    </button>
                    <button
                      type="button"
                      onClick={() => setBookingFilter('completed')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        bookingFilter === 'completed'
                          ? 'bg-emerald-500 text-[#070E1A] shadow-[0_0_10px_rgba(16,185,129,0.4)]'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      Completed ({completedCount})
                    </button>
                  </div>
                </div>

                {/* ── HIGH VISUAL FOCUS: ACTIVE SERVICE SHOWCASE (Stitch Design) ── */}
                {bookingFilter !== 'completed' && activeCount > 0 && (
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0c1e38] via-[#0A1628] to-[#070E1A] border-2 border-cyan-500/40 p-5 sm:p-6 shadow-[0_10px_35px_rgba(6,182,212,0.18)]">
                    <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-cyan-400 via-orange-400 to-cyan-500" />

                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pl-2">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500" />
                        </span>
                        <span className="font-bold text-xs uppercase tracking-wider text-cyan-400">
                          Active Priority Dispatch • Assigned & Moving
                        </span>
                      </div>
                      <span className="text-xs text-white/50 font-mono bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                        Work Order #FRRF-9842
                      </span>
                    </div>

                    <div className="pl-2 flex flex-col md:flex-row md:items-center justify-between gap-5">
                      <div>
                        <h2 className="text-lg sm:text-xl font-black text-white mb-1">
                          CPVC High-Pressure Pipe Burst & Valve Repair
                        </h2>
                        <p className="text-xs sm:text-sm text-white/60 flex flex-wrap items-center gap-2 mb-1">
                          <Calendar size={14} className="text-cyan-400" />
                          <span>Slot: Today, 11:00 AM – 12:30 PM</span>
                          <span>•</span>
                          <MapPin size={14} className="text-orange-400" />
                          <span>Palasia, Indore (Primary Residence)</span>
                        </p>
                        <p className="text-xs font-mono text-cyan-300/80">
                          Telemetry: Water Line Pressure 4.2 Bar • Acoustic Scan: Active
                        </p>

                        {/* Assigned Plumber Card */}
                        <div className="mt-4 flex items-center gap-3 bg-white/4 border border-white/8 rounded-xl p-3 max-w-md">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-sm text-white shrink-0">
                            MV
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <p className="text-xs font-bold text-white truncate">Marcus Vance</p>
                              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded font-bold">
                                4.9 ★
                              </span>
                            </div>
                            <p className="text-[11px] text-cyan-300 font-medium">
                              Master Plumber (Lic. #PL-88421) • ETA: 14 Mins
                            </p>
                          </div>
                          <a
                            href="tel:9826099881"
                            className="p-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/30 transition-colors"
                            title="Call Technician"
                          >
                            <PhoneCall size={16} />
                          </a>
                        </div>
                      </div>

                      {/* Right: Pricing & CTA */}
                      <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 border-white/10 pt-4 md:pt-0">
                        <div className="text-left md:text-right">
                          <p className="text-xs text-white/50 uppercase font-semibold">Fixed Estimate</p>
                          <p className="text-2xl sm:text-3xl font-black text-white">₹649</p>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            type="button"
                            onClick={() =>
                              alert(
                                'Live GPS tracking: Van is 2.1 km away on MG Road, approaching Royal Palms in approx 14 minutes!'
                              )
                            }
                            className="bg-cyan-500 hover:bg-cyan-400 text-[#070E1A] font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.35)] transition-all cursor-pointer hover:scale-105"
                          >
                            Track Live 🚐
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Progress steps mini bar */}
                    <div className="mt-5 pl-2 pt-4 border-t border-white/8">
                      <div className="flex items-center justify-between text-[11px] text-white/70 font-semibold mb-2">
                        <span className="text-cyan-400 font-bold">✓ Booking Confirmed</span>
                        <span className="text-cyan-400 font-bold">✓ Technician Dispatched</span>
                        <span className="text-orange-400 font-bold animate-pulse">● En Route (14m)</span>
                        <span className="text-white/30">○ Diagnostic & Repair</span>
                        <span className="text-white/30">○ Tested & Warranty</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-cyan-500 to-orange-400 w-3/5 rounded-full" />
                      </div>
                    </div>
                  </div>
                )}

                {/* ── BOOKING CARDS LIST ── */}
                <div className="space-y-4">
                  <h3 className="text-sm sm:text-base font-bold text-white/80 flex items-center justify-between">
                    <span>Service History & Records ({filteredBookings.length})</span>
                    <span className="text-xs font-normal text-white/40">FRRF Digital Guarantee Protected</span>
                  </h3>

                  {filteredBookings.length === 0 ? (
                    <div className="bg-[#070E1A]/85 border border-white/8 rounded-2xl p-10 text-center">
                      <p className="text-4xl mb-3">💧</p>
                      <h4 className="font-bold text-white text-base">No bookings found in this filter</h4>
                      <p className="text-xs text-white/50 max-w-sm mx-auto mt-1 mb-4">
                        You don't have any matching plumbing appointments. Need a quick fix?
                      </p>
                      <Link
                        to="/customer/booking"
                        className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-[#070E1A] font-bold text-xs px-5 py-2.5 rounded-full transition-all"
                      >
                        Book a Plumber Now ⚡
                      </Link>
                    </div>
                  ) : (
                    filteredBookings.map((b) => (
                      <div
                        key={b.id}
                        className={`bg-[#070E1A]/85 border rounded-2xl p-4 sm:p-5 transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] ${
                          b.status === 'in-progress'
                            ? 'border-cyan-500/30 hover:border-cyan-500/60'
                            : 'border-white/8 hover:border-white/20'
                        }`}
                      >
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          {/* Service Details */}
                          <div className="flex items-start gap-3.5">
                            <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl shrink-0">
                              {b.icon}
                            </div>
                            <div>
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <h4 className="font-bold text-base sm:text-lg text-white">
                                  {b.service}
                                </h4>
                                <span className="text-[10px] text-white/40 font-mono bg-white/5 px-2 py-0.5 rounded">
                                  {b.id}
                                </span>
                              </div>

                              <p className="text-xs text-white/50 flex flex-wrap items-center gap-2">
                                <span className="text-white/70 font-medium">Date: {b.date}</span>
                                <span>•</span>
                                <span>Slot: {b.timeSlot}</span>
                                <span>•</span>
                                <span className="text-cyan-400/90 font-medium">{b.category}</span>
                              </p>

                              {/* Badges: Status + Warranty */}
                              <div className="flex flex-wrap items-center gap-2 mt-3">
                                {b.status === 'in-progress' ? (
                                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-500/15 text-orange-400 border border-orange-500/30">
                                    <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                                    {b.statusLabel}
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                                    {b.statusLabel}
                                  </span>
                                )}

                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/5 text-white/70 border border-white/10">
                                  <ShieldCheck size={12} className="text-cyan-400" />
                                  <span>{b.warranty}</span>
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Price & Action Area */}
                          <div className="w-full md:w-auto flex md:flex-col justify-between items-center md:items-end border-t md:border-t-0 border-white/8 pt-3 md:pt-0">
                            <div>
                              <p className="font-black text-xl sm:text-2xl text-white text-right">
                                ₹{b.price}
                              </p>
                              <p className="text-[10px] text-white/40 text-right">Taxes & Parts Included</p>
                            </div>

                            <div className="flex items-center gap-2 mt-2">
                              <button
                                type="button"
                                onClick={() =>
                                  alert(
                                    `Downloading verified tax invoice PDF for ${b.id} issued to ${userData.FullName} with 90-Day Unconditional Guarantee.`
                                  )
                                }
                                className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-semibold px-2.5 py-1.5 rounded-lg hover:bg-cyan-500/10 transition-colors cursor-pointer"
                              >
                                <FileText size={13} />
                                <span>Invoice PDF</span>
                              </button>

                              <Link
                                to="/customer/booking"
                                className="inline-flex items-center gap-1 text-xs text-[#070E1A] bg-white hover:bg-cyan-400 font-bold px-3 py-1.5 rounded-lg transition-all shadow-sm"
                              >
                                <span>Book Again ⚡</span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* ── SUGGESTED SERVICES FOR CUSTOMER RETENTION (Stitch Design) ── */}
                <div className="pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <Sparkles size={16} className="text-cyan-400" />
                        <span>Recommended Preventive Plumbing for {userData.FullName}</span>
                      </h3>
                      <p className="text-xs text-white/50">
                        Keep your pipelines leak-free with regular maintenance routines.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    {SUGGESTED_SERVICES.map((s, idx) => (
                      <div
                        key={idx}
                        className="bg-[#070E1A]/85 border border-white/8 rounded-xl p-4 flex flex-col justify-between hover:border-cyan-500/40 transition-all group"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                              {s.tag}
                            </span>
                            <span className="text-sm font-bold text-white">{s.price}</span>
                          </div>
                          <h4 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors mb-1">
                            {s.title}
                          </h4>
                          <p className="text-[11px] text-white/50 leading-relaxed mb-4">
                            {s.desc}
                          </p>
                        </div>
                        <Link
                          to="/customer/booking"
                          className="w-full text-center text-xs font-bold py-2 rounded-lg bg-white/5 group-hover:bg-cyan-500 text-white group-hover:text-[#070E1A] transition-all"
                        >
                          {s.actionText} →
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* ══════════════════════════════════════════════════
                TAB 2: SAVED ADDRESSES
               ══════════════════════════════════════════════════ */}
            {activeTab === 'addresses' && (
              <div className="animate-in fade-in duration-300 space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/10 pb-4 gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Saved Service Addresses
                    </h2>
                    <p className="text-xs sm:text-sm text-white/50 mt-0.5">
                      Plumbers are dispatched directly to these pre-saved locations for {userData.FullName}.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAddAddressModal(true)}
                    className="inline-flex items-center gap-1.5 bg-cyan-500 hover:bg-cyan-400 text-[#070E1A] px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-pointer"
                  >
                    <span>+ Add New Address</span>
                  </button>
                </div>

                {/* Add Address Mini Form */}
                {showAddAddressModal && (
                  <form
                    onSubmit={handleAddAddress}
                    className="bg-[#070E1A]/95 border border-cyan-500/40 rounded-2xl p-5 space-y-4 animate-in fade-in"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-cyan-400">Add New Service Location</h4>
                      <button
                        type="button"
                        onClick={() => setShowAddAddressModal(false)}
                        className="text-white/40 hover:text-white text-xs"
                      >
                        ✕ Close
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-white/70 mb-1">Address Label</label>
                        <select
                          value={newAddr.type}
                          onChange={(e) => setNewAddr({ ...newAddr, type: e.target.value })}
                          className="w-full bg-[#0A1628] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                        >
                          <option value="Home">Home (Flat / Villa)</option>
                          <option value="Office">Office / Commercial Space</option>
                          <option value="Parent's House">Parent's House</option>
                          <option value="Rental Property">Rental Property</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-white/70 mb-1">City & Pincode</label>
                        <input
                          type="text"
                          value={newAddr.cityState}
                          onChange={(e) => setNewAddr({ ...newAddr, cityState: e.target.value })}
                          className="w-full bg-[#0A1628] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-white/70 mb-1">
                        Street Address / Flat / Floor
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Flat 301, Silver Crest, AB Road"
                        value={newAddr.addressLine}
                        onChange={(e) => setNewAddr({ ...newAddr, addressLine: e.target.value })}
                        className="w-full bg-[#0A1628] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-white/70 mb-1">Nearby Landmark</label>
                      <input
                        type="text"
                        placeholder="e.g. Near Geeta Bhawan Square"
                        value={newAddr.landmark}
                        onChange={(e) => setNewAddr({ ...newAddr, landmark: e.target.value })}
                        className="w-full bg-[#0A1628] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAddAddressModal(false)}
                        className="px-4 py-2 rounded-lg bg-white/5 text-xs text-white/70 hover:bg-white/10"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-[#070E1A] font-bold text-xs"
                      >
                        Save Address
                      </button>
                    </div>
                  </form>
                )}

                {/* Addresses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.map((a) => (
                    <div
                      key={a.id}
                      className="bg-[#070E1A]/85 p-5 rounded-2xl border border-white/8 relative group hover:border-cyan-500/40 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="inline-flex items-center gap-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/25 px-2.5 py-0.5 rounded-full text-xs font-bold">
                            <MapPin size={12} />
                            {a.type}
                          </span>
                          {a.isDefault && (
                            <span className="text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                              Primary Location
                            </span>
                          )}
                        </div>

                        <p className="font-bold text-base text-white mb-1">
                          {a.name}
                        </p>
                        <p className="text-xs text-white/65 leading-relaxed pr-6 mb-2">
                          {a.addressLine}
                          <br />
                          {a.cityState}
                        </p>
                        <p className="text-[11px] text-white/45">
                          <span className="text-white/60 font-semibold">Landmark:</span> {a.landmark}
                        </p>
                      </div>

                      <div className="flex items-center justify-between border-t border-white/8 pt-3.5 mt-4">
                        <Link
                          to="/customer/booking"
                          className="text-xs font-bold text-cyan-400 hover:text-cyan-300 underline"
                        >
                          Book at this Location →
                        </Link>
                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              alert(`Editing address for ${a.type}`)
                            }
                            className="flex items-center gap-1 text-white/60 hover:text-cyan-400 text-xs transition-colors cursor-pointer"
                          >
                            <Edit2 size={13} />
                            <span>Edit</span>
                          </button>
                          {!a.isDefault && (
                            <button
                              type="button"
                              onClick={() => handleDeleteAddress(a.id)}
                              className="flex items-center gap-1 text-rose-400 hover:text-rose-300 text-xs transition-colors cursor-pointer"
                            >
                              <Trash2 size={13} />
                              <span>Delete</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ══════════════════════════════════════════════════
                TAB 3: PROFILE SETTINGS
               ══════════════════════════════════════════════════ */}
            {activeTab === 'settings' && (
              <div className="animate-in fade-in duration-300 space-y-6">
                <div className="border-b border-white/10 pb-4">
                  <h2 className="text-2xl font-bold text-white">
                    Profile & Infrastructure Settings
                  </h2>
                  <p className="text-xs sm:text-sm text-white/50 mt-0.5">
                    Original verified customer record for {userData.FullName} ({userData.role}).
                  </p>
                </div>

                {settingsSuccess && (
                  <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                    <span>✓</span>
                    <span>Profile settings updated successfully! Synchronized with FRRF Plumbing cloud.</span>
                  </div>
                )}

                <form className="max-w-xl flex flex-col gap-5" onSubmit={handleSaveSettings}>
                  <div>
                    <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full bg-[#070E1A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
                      Registered Email Address
                    </label>
                    <input
                      type="email"
                      value={profileForm.email}
                      disabled
                      className="w-full bg-[#070E1A]/50 border border-white/5 rounded-xl px-4 py-3 text-sm text-white/40 cursor-not-allowed font-mono"
                    />
                    <p className="text-[11px] text-white/40 mt-1.5 flex items-center gap-1">
                      <ShieldCheck size={12} className="text-cyan-400" />
                      <span>Email is protected under Work 1st Security Guard & cannot be altered.</span>
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
                        Primary Contact Phone
                      </label>
                      <input
                        type="text"
                        required
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        className="w-full bg-[#070E1A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
                        Emergency Plumbing Contact
                      </label>
                      <input
                        type="text"
                        value={profileForm.emergencyPhone}
                        onChange={(e) => setProfileForm({ ...profileForm, emergencyPhone: e.target.value })}
                        className="w-full bg-[#070E1A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
                      Preferred Plumbing Time Window
                    </label>
                    <select
                      value={profileForm.preferredTime}
                      onChange={(e) => setProfileForm({ ...profileForm, preferredTime: e.target.value })}
                      className="w-full bg-[#070E1A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 transition-all"
                    >
                      <option>Morning (09:00 AM – 12:00 PM)</option>
                      <option>Afternoon (12:00 PM – 04:00 PM)</option>
                      <option>Evening (04:00 PM – 08:00 PM)</option>
                      <option>24/7 Any Emergency Slot</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="bg-cyan-500 hover:bg-cyan-400 text-[#070E1A] font-bold text-sm px-7 py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] cursor-pointer"
                    >
                      Save Profile Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
}

/* ── Reusable Tab Button Component ── */
function TabButton({ icon, label, badge, isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-between px-4 py-3 rounded-xl text-left font-semibold text-sm transition-all duration-200 w-full cursor-pointer group ${
        isActive
          ? 'bg-cyan-500 text-[#070E1A] shadow-[0_0_15px_rgba(6,182,212,0.35)] font-bold'
          : 'text-white/70 hover:bg-white/6 hover:text-white'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className={isActive ? 'text-[#070E1A]' : 'text-cyan-400 group-hover:text-white transition-colors'}>
          {icon}
        </span>
        <span>{label}</span>
      </div>
      {badge && (
        <span
          className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
            isActive
              ? 'bg-[#0A1628] text-cyan-300'
              : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
          }`}
        >
          {badge}
        </span>
      )}
    </button>
  );
}
