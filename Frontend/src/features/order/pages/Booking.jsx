import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useOrder } from '../hook/useOrder';
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

/* ── Common Service Categories ────────────────────────────────── */
const SERVICE_OPTIONS = [
  { id: 'leakage', label: 'Leakage Repair', icon: '💧' },
  { id: 'blockage', label: 'Blockage Removal', icon: '🔧' },
  { id: 'installation', label: 'Installation', icon: '⚙️' },
  { id: 'maintenance', label: 'Maintenance', icon: '🛡️' },
  { id: 'fullsetup', label: 'Full Renovation', icon: '🏗️' },
  { id: 'inspection', label: 'General Inspection', icon: '🔍' },
];

const ADDRESS_LABELS = ['Home', 'Office', 'Shop', 'Apartment', 'Other'];

export default function Booking() {
  useGoogleFonts();
  const location = useLocation();

  const {handleCreateOrder}=useOrder()

  // Pre-selected service if passed via state
  const initialService = location.state?.service || 'leakage';

  const [serviceCategory, setServiceCategory] = useState(initialService);
  const [issueDescription, setIssueDescription] = useState('');
  const [issueImage, setIssueImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [scheduledDate, setScheduledDate] = useState('');

  // Address fields (6 subfields)
  const [address, setAddress] = useState({
    label: 'Home',
    street: '',
    city: '',
    pin_code: '',
    latitude: '',
    longitude: '',
  });

  const [locating, setLocating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0); // 1 minute cooldown
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [createdOrder, setCreatedOrder] = useState(null);
  const [visible, setVisible] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  /* ── 1-minute countdown ticker ── */
  useEffect(() => {
    if (cooldown <= 0) return;
    const interval = setInterval(() => {
      setCooldown((c) => (c <= 1 ? 0 : c - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  // Handle image upload and preview
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setIssueImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setIssueImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Auto-detect GPS Coordinates
  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setAddress((prev) => ({
          ...prev,
          latitude: pos.coords.latitude.toFixed(6),
          longitude: pos.coords.longitude.toFixed(6),
        }));
        setLocating(false);
      },
      (err) => {
        alert('Could not retrieve location: ' + err.message);
        setLocating(false);
      },
      { timeout: 10000 }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading || cooldown > 0) return;
    setErrorMessage('');

    setLoading(true);
    try {
      const formData = new FormData();
      const sId = location.state?._id || location.state?.serviceId || location.state?.service || serviceCategory;
      formData.append('serviceId', sId);
      formData.append('issueDescription', issueDescription.trim());
      formData.append('label', address.label || 'Home');
      formData.append('street', address.street.trim());
      formData.append('city', address.city.trim());
      formData.append('pin_code', address.pin_code.trim());

      const lat = address.latitude ? String(address.latitude) : '19.0760';
      const lng = address.longitude ? String(address.longitude) : '72.8777';
      formData.append('latitude', lat);
      formData.append('longitude', lng);
      formData.append('scheduleDate', scheduledDate);

      if (issueImage) {
        formData.append('Images', issueImage);
      }

      const res = await handleCreateOrder(formData);

      setSuccess(true);
      setCreatedOrder(res?.order || null);
      setCooldown(60); // 1-minute active cooldown
    } catch (err) {
      console.error('Booking submission error:', err);
      const msg = err?.response?.data?.message || err?.message || 'Failed to submit booking. Please try again.';
      if (Array.isArray(msg)) {
        setErrorMessage(msg.map((m) => m.msg || m.message || JSON.stringify(m)).join(', '));
      } else {
        setErrorMessage(typeof msg === 'string' ? msg : JSON.stringify(msg));
      }
    } finally {
      setLoading(false);
    }
  };

  const btnDisabled = loading || cooldown > 0;

  return (
    <div
      className="min-h-screen font-['Inter',sans-serif] bg-[#070E1A] flex flex-col items-center justify-center relative overflow-x-hidden px-4 py-12 pt-24"
      style={{
        backgroundImage: "url('/images/hero-bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#070E1A]/92 backdrop-blur-sm" />

      {/* Top Navbar with Logo on the top left */}
      <Navbar/>

      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/6 rounded-full blur-3xl pointer-events-none" />

      {/* Booking Form Card */}
      <div
        className={`relative z-10 w-full max-w-2xl transition-all duration-700 my-auto ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="bg-white/4 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-9 shadow-[0_32px_80px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
          {/* Header */}
          <div className="mb-6 text-left">
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/25 rounded-full px-3.5 py-1.5 mb-3">
              <span className="text-cyan-400 text-[11px] font-bold tracking-widest uppercase">
                ⚡ Rapid Technician Dispatch
              </span>
            </div>
            <h1 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-2xl sm:text-3xl text-white tracking-tight leading-tight mb-2">
              Book a Plumbing Service
            </h1>
            <p className="text-white/50 text-xs sm:text-sm leading-relaxed">
              Describe your plumbing issue and our verified CPVC specialist will arrive at your scheduled time.
            </p>
          </div>

          {/* Error Notification */}
          {errorMessage && (
            <div className="flex items-start gap-3 bg-rose-500/10 border border-rose-500/25 rounded-2xl p-4 sm:p-5 mb-6 text-left">
              <span className="text-rose-400 text-xl shrink-0 mt-0.5">⚠️</span>
              <div>
                <div className="text-rose-400 font-bold text-sm">
                  Booking Submission Error
                </div>
                <div className="text-rose-300/80 text-xs mt-1 leading-relaxed">
                  {errorMessage}
                </div>
              </div>
            </div>
          )}

          {/* Success Notification */}
          {success && (
            <div className="flex items-start gap-3 bg-emerald-500/10 border border-emerald-500/25 rounded-2xl p-4 sm:p-5 mb-6 text-left">
              <span className="text-emerald-400 text-2xl shrink-0 mt-0.5">✓</span>
              <div>
                <div className="text-emerald-400 font-bold text-base">
                  Booking Request Confirmed! {createdOrder?._id && `(#${createdOrder._id.slice(-6).toUpperCase()})`}
                </div>
                <div className="text-emerald-400/80 text-xs sm:text-sm mt-1 leading-relaxed">
                  Your appointment has been logged. Our dispatch team is assigning a certified master plumber near you. You will receive an SMS and WhatsApp update shortly.
                </div>
                <div className="mt-3 flex gap-3">
                  <button
                    onClick={() => {
                      setSuccess(false);
                      setIssueDescription('');
                      setCreatedOrder(null);
                      removeImage();
                    }}
                    className="text-xs bg-emerald-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg border-0 cursor-pointer hover:bg-emerald-400"
                  >
                    Book Another Service
                  </button>
                  <Link
                    to="/customer"
                    className="text-xs text-white/70 hover:text-white px-3 py-1.5 rounded-lg border border-white/20 no-underline"
                  >
                    Return to Homepage
                  </Link>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            {/* 1. Service Category Selection */}
            <div>
              <label className="block text-xs font-bold text-white/60 uppercase tracking-[0.08em] mb-2.5">
                Select Service Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
                {SERVICE_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setServiceCategory(opt.id)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all text-left cursor-pointer ${
                      serviceCategory === opt.id
                        ? 'bg-orange-500/15 border-orange-500 text-orange-400 shadow-[0_0_12px_rgba(255,107,53,0.25)]'
                        : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/8 hover:text-white'
                    }`}
                  >
                    <span className="text-base">{opt.icon}</span>
                    <span className="truncate">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Issue Description */}
            <div>
              <label className="block text-xs font-bold text-white/60 uppercase tracking-[0.08em] mb-2">
                Issue Description <span className="text-orange-400">*</span>
              </label>
              <textarea
                rows={3}
                required
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
                placeholder="Describe your issue (e.g. bathroom CPVC tap leaking, kitchen sink drainage blocked, overhead water tank valve repair...)"
                className="w-full bg-white/5 border border-white/12 rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 font-medium focus:outline-none focus:border-cyan-500/60 focus:bg-white/8 focus:shadow-[0_0_0_3px_rgba(0,180,216,0.12)] transition-all duration-200 resize-none"
              />
            </div>

            {/* 3. Issue Image Upload */}
            <div>
              <label className="block text-xs font-bold text-white/60 uppercase tracking-[0.08em] mb-2">
                Upload Photo of the Issue <span className="text-white/40 normal-case">(Optional - Helps Plumber)</span>
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                  id="issueImageUpload"
                />
                <label
                  htmlFor="issueImageUpload"
                  className="w-full sm:flex-1 flex flex-col items-center justify-center p-4 border-2 border-dashed border-white/15 rounded-2xl bg-white/3 hover:bg-white/5 hover:border-cyan-500/40 cursor-pointer transition-all duration-200"
                >
                  <span className="text-2xl mb-1">📷</span>
                  <span className="text-xs font-bold text-white/70">
                    {issueImage ? 'Change Image' : 'Click to Upload or Drag & Drop'}
                  </span>
                  <span className="text-[10px] text-white/35 mt-0.5">PNG, JPG or WEBP up to 10MB</span>
                </label>

                {imagePreview && (
                  <div className="relative w-28 h-24 rounded-xl overflow-hidden border border-white/15 shrink-0 bg-black/40">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-1 right-1 bg-black/70 hover:bg-rose-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs border-0 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* 4. Scheduled Date & Time */}
            <div>
              <label className="block text-xs font-bold text-white/60 uppercase tracking-[0.08em] mb-2">
                Preferred Schedule Date & Time <span className="text-orange-400">*</span>
              </label>
              <input
                type="datetime-local"
                required
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full bg-white/5 border border-white/12 rounded-xl px-4 py-3 text-white text-sm font-medium focus:outline-none focus:border-cyan-500/60 focus:bg-white/8 focus:shadow-[0_0_0_3px_rgba(0,180,216,0.12)] transition-all duration-200 [color-scheme:dark]"
              />
            </div>

            {/* 5. Address Details (6 fields: label, street, city, pin_code, latitude, longitude) */}
            <div className="pt-2 border-t border-white/8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-white/70 uppercase tracking-[0.08em]">
                  Service Address Details
                </span>
                <button
                  type="button"
                  onClick={detectLocation}
                  disabled={locating}
                  className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 border border-cyan-500/25 px-3 py-1.5 rounded-full cursor-pointer transition-all hover:bg-cyan-500/20"
                >
                  <span>📍</span>
                  <span>{locating ? 'Locating…' : 'Detect GPS Coordinates'}</span>
                </button>
              </div>

              {/* Address Label Selection */}
              <div className="mb-4">
                <label className="block text-[11px] font-semibold text-white/50 mb-1.5">
                  Address Label
                </label>
                <div className="flex flex-wrap gap-2">
                  {ADDRESS_LABELS.map((lbl) => (
                    <button
                      key={lbl}
                      type="button"
                      onClick={() => setAddress((p) => ({ ...p, label: lbl }))}
                      className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                        address.label === lbl
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                          : 'bg-white/5 border-white/10 text-white/50 hover:text-white'
                      }`}
                    >
                      {lbl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Street & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-[11px] font-semibold text-white/50 mb-1">
                    Street Address / Flat / Building <span className="text-orange-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Flat 402, Royal Palms, Link Road"
                    value={address.street}
                    onChange={(e) => setAddress((p) => ({ ...p, street: e.target.value }))}
                    className="w-full bg-white/5 border border-white/12 rounded-xl px-3.5 py-2.5 text-white text-sm placeholder-white/25 font-medium focus:outline-none focus:border-cyan-500/60 focus:bg-white/8 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-white/50 mb-1">
                    City <span className="text-orange-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mumbai, Delhi, Bangalore"
                    value={address.city}
                    onChange={(e) => setAddress((p) => ({ ...p, city: e.target.value }))}
                    className="w-full bg-white/5 border border-white/12 rounded-xl px-3.5 py-2.5 text-white text-sm placeholder-white/25 font-medium focus:outline-none focus:border-cyan-500/60 focus:bg-white/8 transition-all"
                  />
                </div>
              </div>

              {/* PIN Code & Lat/Long Coordinates */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-white/50 mb-1">
                    PIN Code <span className="text-orange-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 400001"
                    value={address.pin_code}
                    onChange={(e) => setAddress((p) => ({ ...p, pin_code: e.target.value }))}
                    className="w-full bg-white/5 border border-white/12 rounded-xl px-3.5 py-2.5 text-white text-sm placeholder-white/25 font-medium focus:outline-none focus:border-cyan-500/60 focus:bg-white/8 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-white/50 mb-1">
                    Latitude
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 19.0760"
                    value={address.latitude}
                    onChange={(e) => setAddress((p) => ({ ...p, latitude: e.target.value }))}
                    className="w-full bg-white/5 border border-white/12 rounded-xl px-3.5 py-2.5 text-white text-sm placeholder-white/25 font-medium focus:outline-none focus:border-cyan-500/60 focus:bg-white/8 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-white/50 mb-1">
                    Longitude
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 72.8777"
                    value={address.longitude}
                    onChange={(e) => setAddress((p) => ({ ...p, longitude: e.target.value }))}
                    className="w-full bg-white/5 border border-white/12 rounded-xl px-3.5 py-2.5 text-white text-sm placeholder-white/25 font-medium focus:outline-none focus:border-cyan-500/60 focus:bg-white/8 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button with 1-Minute Anti-spam Cooldown */}
            <button
              type="submit"
              disabled={btnDisabled}
              className={`w-full relative flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[15px] border-0 transition-all duration-300 mt-4 ${
                btnDisabled
                  ? 'bg-white/10 text-white/30 cursor-not-allowed'
                  : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-[0_0_24px_rgba(255,107,53,0.4)] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(255,107,53,0.5)] cursor-pointer'
              }`}
            >
              {loading ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 000 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                    />
                  </svg>
                  Submitting Booking…
                </>
              ) : cooldown > 0 ? (
                `Wait ${cooldown}s before submitting again`
              ) : (
                'Confirm & Dispatch Plumber ⚡'
              )}
            </button>

            {/* Smooth animated load bar */}
            {loading && (
              <div className="w-full h-0.5 bg-white/8 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-cyan-400 rounded-full"
                  style={{ animation: 'loadbar 2s ease-in-out forwards' }}
                />
              </div>
            )}
          </form>

          {/* Guarantee Badges */}
          <div className="mt-7 pt-5 border-t border-white/6 grid grid-cols-3 gap-2 text-center">
            {[
              ['⚡ 18 Min', 'Fast Response'],
              ['🛡️ ₹50,000', 'Damage Insured'],
              ['✓ 30 Days', 'Service Warranty'],
            ].map(([val, lbl]) => (
              <div key={lbl}>
                <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs sm:text-sm text-cyan-400">
                  {val}
                </div>
                <div className="text-white/40 text-[10px] mt-0.5">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`@keyframes loadbar { from { width: 0% } to { width: 100% } }`}</style>
    </div>
  );
}
