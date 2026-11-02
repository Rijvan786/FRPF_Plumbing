import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from "../../../App/Navbar.jsx"
import { useTechnician } from '../hook/useTechnician.jsx';
import PhoneInputPkg from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const PhoneInput = PhoneInputPkg.default ?? PhoneInputPkg;

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

/* ── Eye Toggle Icon ─────────────────────────────────────────── */
const EyeIcon = ({ open }) =>
  open ? (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
      />
    </svg>
  ) : (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  );

const TECHNICIAN_ROLES = [
  'Senior Master Plumber',
  'CPVC & PVC Pipeline Specialist',
  'Bathroom & Sanitary Expert',
  'Drainage & Blockage Technician',
  'Water Tank & Motor Installer',
  'General Maintenance Plumber',
];

export default function TechnicianRegister() {
  useGoogleFonts();
  const { handleTechRegister } = useTechnician();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    contact: '',
    password: '',
    role: 'Senior Master Plumber',
    experienceYears: '',
    street: '',
    city: '',
    pin_code: '',
    latitude: '',
    longitude: '',
  });

  const [showPw, setShowPw]       = useState(false);
  const [loading, setLoading]     = useState(false);
  const [cooldown, setCooldown]   = useState(0); // 1-minute countdown
  const [locating, setLocating]   = useState(false);
  const [agree, setAgree]         = useState(false);
  const [visible, setVisible]     = useState(false);
  const [errorMsg, setErrorMsg]   = useState('');

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  /* ── 1-minute countdown timer ticker ── */
  useEffect(() => {
    if (cooldown <= 0) return;
    const interval = setInterval(() => {
      setCooldown((c) => (c <= 1 ? 0 : c - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  const set = (k) => (e) => setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const formData = form;
  const handlePhoneChange = (value) => {
    setForm((f) => ({ ...f, contact: value, phone: value }));
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
        setForm((prev) => ({
          ...prev,
          latitude: pos.coords.latitude.toFixed(6),
          longitude: pos.coords.longitude.toFixed(6),
        }));
        setLocating(false);
      },
      (err) => {
        alert('Could not retrieve GPS coordinates: ' + err.message);
        setLocating(false);
      },
      { timeout: 10000 }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading || cooldown > 0) return;
    setErrorMsg('');

    if (form.password.length < 8 || !/(?=.*\d)/.test(form.password) || !/(?=.*[@$!%*?&#])/.test(form.password)) {
      setErrorMsg('Password must be at least 8 characters and include at least one number and one special character (@$!%*?&#).');
      return;
    }

    if (!agree) {
      setErrorMsg('Please agree to the technician partner policy to proceed.');
      return;
    }

    try {
      setLoading(true);
      await handleTechRegister({
        FullName: form.fullName.trim(),
        email: form.email.trim(),
        contact: (form.contact ? (form.contact.startsWith('+') ? form.contact : `+${form.contact}`) : '').trim(),
        password: form.password,
        role: "technician",
        experienceYears: Number(form.experienceYears) || 0,
        street: form.street.trim(),
        city: form.city.trim(),
        pin_code: form.pin_code.trim(),
        longitude: Number(form.longitude) || 0,
        latitude: Number(form.latitude) || 0,
      });

      setCooldown(60); // 1-minute active cooldown
      navigate('/Technician-Dashboard');
    } catch (err) {
      console.error('Technician registration error:', err);
      const apiMsg = err?.response?.data?.message;
      if (Array.isArray(apiMsg)) {
        setErrorMsg(apiMsg.map((m) => m.msg || m.message).join(', '));
      } else if (typeof apiMsg === 'string') {
        setErrorMsg(apiMsg);
      } else {
        setErrorMsg(err?.message || 'Registration failed. Please verify your details.');
      }
    } finally {
      setLoading(false);
    }
  };

  const btnDisabled = loading || cooldown > 0;

  return (
    <div
      className="min-h-screen font-['Inter',sans-serif] bg-[#070E1A] flex flex-col items-center justify-center relative overflow-x-hidden px-3.5 sm:px-6 py-8 sm:py-12 pt-20 sm:pt-24"
      style={{
        backgroundImage: "url('/images/hero-bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#070E1A]/92 backdrop-blur-sm pointer-events-none" />

      {/* Top Navbar */}
      <Navbar />

      {/* Ambient glows */}
      <div className="absolute top-0 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Form Card */}
      <div
        className={`relative z-10 w-full max-w-2xl transition-all duration-700 my-auto ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="bg-white/4 border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-9 shadow-[0_32px_80px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
          {/* Header */}
          <div className="mb-5 sm:mb-6 text-left">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/25 rounded-full px-3 sm:px-3.5 py-1 sm:py-1.5 mb-2.5 sm:mb-3">
              <span className="text-orange-400 text-[10px] sm:text-[11px] font-bold tracking-widest uppercase">
                🛠️ Technician Partner Onboarding
              </span>
            </div>
            <h1 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-xl sm:text-2xl md:text-3xl text-white tracking-tight leading-tight mb-1.5 sm:mb-2">
              Join as Verified Technician
            </h1>
            <p className="text-white/50 text-xs sm:text-sm leading-relaxed">
              Earn regular high-value residential & commercial plumbing jobs in your local city area.
            </p>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="bg-rose-500/10 border border-rose-500/25 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 mb-4 sm:mb-5 text-rose-400 text-xs font-semibold leading-relaxed">
              ⚠️ {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4 text-left">
            {/* 1. Full Name */}
            <div>
              <label className="block text-xs font-bold text-white/60 uppercase tracking-[0.08em] mb-1.5">
                Full Name <span className="text-orange-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ramesh Kumar Verma"
                value={form.fullName}
                onChange={set('fullName')}
                className="w-full bg-white/5 border border-white/12 rounded-xl px-3.5 sm:px-4 py-2.5 text-white text-sm placeholder-white/25 font-medium focus:outline-none focus:border-cyan-500/60 focus:bg-white/8 transition-all"
              />
            </div>

            {/* 2. Email & Contact (2-col grid on sm+) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
              <div>
                <label className="block text-xs font-bold text-white/60 uppercase tracking-[0.08em] mb-1.5">
                  Email Address <span className="text-orange-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="ramesh@example.com"
                  value={form.email}
                  onChange={set('email')}
                  className="w-full bg-white/5 border border-white/12 rounded-xl px-3.5 sm:px-4 py-2.5 text-white text-sm placeholder-white/25 font-medium focus:outline-none focus:border-cyan-500/60 focus:bg-white/8 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-white/60 uppercase tracking-[0.08em] mb-1.5">
                  Contact Number (WhatsApp) <span className="text-orange-400">*</span>
                </label>
                <div className="relative">
                  <PhoneInput
                    country={"in"}
                    value={formData.phone || form.contact}
                    onChange={handlePhoneChange}
                    inputProps={{ name: "phone", id: "phone", required: true, placeholder: "98765 43210" }}
                    containerClass="!w-full"
                    inputClass="!w-full !bg-white/5 !border !border-white/12 !rounded-xl !pl-14 !pr-4 !py-3 !text-sm !text-white !placeholder-white/25 hover:!border-white/20 focus:!border-cyan-500/60 focus:!ring-1 focus:!ring-cyan-500/30 !transition-all !duration-200"
                    buttonClass="!bg-white/5 !border !border-white/12 !border-r-0 !rounded-l-xl hover:!bg-white/10"
                    dropdownClass="!bg-[#0c1a2e] !border !border-white/15 !text-white !rounded-xl !mt-1 !shadow-2xl max-w-[280px] sm:max-w-none"
                    searchClass="!bg-[#070e1a] !border !border-white/10 !text-white !rounded-lg !px-3 !py-2 !text-sm"
                    enableSearch
                  />
                </div>
              </div>
            </div>

            {/* 3. Password (with eye toggle) */}
            <div>
              <label className="block text-xs font-bold text-white/60 uppercase tracking-[0.08em] mb-1.5">
                Account Password <span className="text-orange-400">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  required
                  placeholder="Min 8 chars (e.g. Pass@123)"
                  value={form.password}
                  onChange={set('password')}
                  className="w-full bg-white/5 border border-white/12 rounded-xl px-3.5 sm:px-4 py-2.5 pr-12 text-white text-sm placeholder-white/25 font-medium focus:outline-none focus:border-cyan-500/60 focus:bg-white/8 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((p) => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/35 hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  <EyeIcon open={showPw} />
                </button>
              </div>
              <p className="text-[11px] text-white/40 mt-1">
                Must be at least 8 characters with at least one number and one special symbol (@$!%*?&#).
              </p>
            </div>

            {/* 4. Role & Experience (2-col grid on sm+) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
              <div>
                <label className="block text-xs font-bold text-white/60 uppercase tracking-[0.08em] mb-1.5">
                  Primary Role / Speciality <span className="text-orange-400">*</span>
                </label>
                <select
                  required
                  value={form.role}
                  onChange={set('role')}
                  className="w-full bg-[#0E1A2D] border border-white/12 rounded-xl px-3.5 sm:px-4 py-2.5 text-white text-sm font-medium focus:outline-none focus:border-cyan-500/60 transition-all cursor-pointer"
                >
                  {TECHNICIAN_ROLES.map((r) => (
                    <option key={r} value={r} className="bg-[#0A1628] text-white">
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-white/60 uppercase tracking-[0.08em] mb-1.5">
                  Experience in Years <span className="text-orange-400">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  required
                  placeholder="e.g. 5"
                  value={form.experienceYears}
                  onChange={set('experienceYears')}
                  className="w-full bg-white/5 border border-white/12 rounded-xl px-3.5 sm:px-4 py-2.5 text-white text-sm placeholder-white/25 font-medium focus:outline-none focus:border-cyan-500/60 focus:bg-white/8 transition-all"
                />
              </div>
            </div>

            {/* 5. Address Details (street, city, pin_code, latitude, longitude) */}
            <div className="pt-2 border-t border-white/8">
              <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold text-white/70 uppercase tracking-[0.08em]">
                  Workshop / Operational Area
                </span>
                <button
                  type="button"
                  onClick={detectLocation}
                  disabled={locating}
                  className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 border border-cyan-500/25 px-3 py-1.5 rounded-full cursor-pointer transition-all hover:bg-cyan-500/20 self-start xs:self-auto"
                >
                  <span>📍</span>
                  <span>{locating ? 'Locating…' : 'Detect GPS Location'}</span>
                </button>
              </div>

              {/* Street & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-[11px] font-semibold text-white/50 mb-1">
                    Street Address / Workshop <span className="text-orange-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Shop 12, Plumbing Hub"
                    value={form.street}
                    onChange={set('street')}
                    className="w-full bg-white/5 border border-white/12 rounded-xl px-3.5 py-2.5 text-white text-sm placeholder-white/25 font-medium focus:outline-none focus:border-cyan-500/60 focus:bg-white/8 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-white/50 mb-1">
                    Operating City <span className="text-orange-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bhopal, Indore"
                    value={form.city}
                    onChange={set('city')}
                    className="w-full bg-white/5 border border-white/12 rounded-xl px-3.5 py-2.5 text-white text-sm placeholder-white/25 font-medium focus:outline-none focus:border-cyan-500/60 focus:bg-white/8 transition-all"
                  />
                </div>
              </div>

              {/* PIN Code, Latitude & Longitude (3-col grid on xs+) */}
              <div className="grid grid-cols-1 xs:grid-cols-3 gap-2.5 sm:gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-white/50 mb-1">
                    PIN Code <span className="text-orange-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 462011"
                    value={form.pin_code}
                    onChange={set('pin_code')}
                    className="w-full bg-white/5 border border-white/12 rounded-xl px-3.5 py-2.5 text-white text-sm placeholder-white/25 font-medium focus:outline-none focus:border-cyan-500/60 focus:bg-white/8 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-white/50 mb-1">
                    Latitude
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 23.2599"
                    value={form.latitude}
                    onChange={set('latitude')}
                    className="w-full bg-white/5 border border-white/12 rounded-xl px-3.5 py-2.5 text-white text-sm placeholder-white/25 font-medium focus:outline-none focus:border-cyan-500/60 focus:bg-white/8 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-white/50 mb-1">
                    Longitude
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 77.4126"
                    value={form.longitude}
                    onChange={set('longitude')}
                    className="w-full bg-white/5 border border-white/12 rounded-xl px-3.5 py-2.5 text-white text-sm placeholder-white/25 font-medium focus:outline-none focus:border-cyan-500/60 focus:bg-white/8 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Terms checkbox */}
            <div className="flex items-start gap-2.5 pt-1">
              <input
                id="tech-terms"
                type="checkbox"
                required
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border border-white/20 bg-white/5 accent-orange-500 cursor-pointer shrink-0"
              />
              <label htmlFor="tech-terms" className="text-white/50 text-[11px] sm:text-xs leading-relaxed cursor-pointer">
                I agree to the technician code of conduct, background check verification, and payout terms under the{' '}
                <span className="text-cyan-400 font-semibold">FRRF Plumbing Service Partner Policy</span>.
              </label>
            </div>

            {/* Submit Button with 1-Minute Cooldown */}
            <button
              type="submit"
              disabled={btnDisabled}
              className={`w-full relative flex items-center justify-center gap-2.5 py-3 sm:py-3.5 rounded-xl font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm sm:text-[15px] border-0 transition-all duration-300 mt-2 ${
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
                  Registering Technician…
                </>
              ) : cooldown > 0 ? (
                `Wait ${cooldown}s before retrying`
              ) : (
                'Submit Technician Application 🛠️'
              )}
            </button>

            {/* Loading Bar */}
            {loading && (
              <div className="w-full h-0.5 bg-white/8 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-cyan-400 rounded-full"
                  style={{ animation: 'loadbar 2s ease-in-out forwards' }}
                />
              </div>
            )}
          </form>

          {/* Footer links */}
          <div className="mt-5 pt-4 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40 text-center sm:text-left">
            <span>
              Already a registered partner?{' '}
              <Link to="/customer/login" className="text-cyan-400 font-bold hover:text-cyan-300 transition-colors">
                Sign In
              </Link>
            </span>
            <Link to="/customer/register" className="text-orange-400 font-semibold hover:text-orange-300 transition-colors">
              Looking for Customer Booking? →
            </Link>
          </div>
        </div>
      </div>

      <style>{`@keyframes loadbar { from { width: 0% } to { width: 100% } }`}</style>
    </div>
  );
}
