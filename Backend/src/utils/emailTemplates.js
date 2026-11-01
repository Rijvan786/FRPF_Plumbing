// ============================================================
//  emailTemplates.js — FRRF Plumbing Services
//  Tailwind CSS Email System (<15KB)
//  Optimized for EmailJS (strict 50KB variable size limit)
//  Brand: FRRF Plumbing Services · "Work 1st Policy"
//  Colors: Navy (#070E1A, #0A1628, #0F1F38) · Cyan (#00B4D8) · Orange (#FF6B35)
// ============================================================

export const BRAND = {
  name: "FRRF Plumbing Services",
  title: "FRRF Plumbing",
  tagline: "Work 1st Policy · 24/7 Rapid Emergency & CPVC Pipeline Infrastructure",
  badge: "WORK 1ST POLICY",
  primaryColor: "#00B4D8",       // Electric Cyan
  accentColor: "#FF6B35",        // Safety Orange
  darkBg: "#070E1A",             // Deep Midnight Navy
  surfaceBg: "#0A1628",          // Abyssal Slate
  cardBg: "#0F1F38",             // Executive Card Navy
  cardBorder: "rgba(0, 180, 216, 0.25)",
  lightGray: "#94A3B8",
  white: "#F8FAFC",
  website: process.env.FRONTEND_URL || "https://frpf-plumbing.onrender.com",
  supportEmail: "support@frrfplumbing.com",
  emergencyPhone: "+91 98765 43210",
  // Hosted logo URL — kept lightweight (NO heavy Base64 data URIs) to respect EmailJS 50KB limit
  logoUrl: 'https://ik.imagekit.io/Rizwan786/FRRF_Plumbing_Services/frrf-logo.png',
};

// Returns clean URL (ensures email payload stays under 15KB, well below EmailJS 50KB limit)
export function getLogoSrc() {
  return BRAND.logoUrl;
}

/* ─────────────────────────────────────────────────────────────
   HEADER HELPER (Styled with Tailwind CSS)
───────────────────────────────────────────────────────────── */
function renderHeader(tag = "SECURITY VERIFICATION") {
  return `
  <!-- Header with Tailwind CSS -->
  <div class="bg-gradient-to-b from-[#070E1A] to-[#0F1F38] pt-6 pb-5 px-7 border-b border-[#00B4D8]/20 text-center" style="background:linear-gradient(180deg, #070E1A 0%, #0F1F38 100%); padding:26px 28px 20px; border-bottom:1px solid rgba(0, 180, 216, 0.2); text-align:center;">
    <div class="inline-block px-3 py-1 bg-[#00B4D8]/10 border border-[#00B4D8]/30 rounded-full text-[10px] font-bold tracking-widest text-[#00B4D8] uppercase mb-3" style="display:inline-block; padding:4px 12px; background:rgba(0, 180, 216, 0.12); border:1px solid rgba(0, 180, 216, 0.3); border-radius:100px; font-size:10px; font-weight:700; letter-spacing:0.8px; text-transform:uppercase; color:#00B4D8; margin-bottom:12px;">
      🛡️ ${tag}
    </div>
    <div class="flex flex-col items-center justify-center text-center" style="text-align:center;">
      <img
        src="${BRAND.logoUrl}"
        alt="FRRF Plumbing"
        class="w-28 h-28 sm:w-30 sm:h-30 mx-auto object-contain shrink-0"
        style="margin:0 auto 4px; display:block; width:112px; height:112px; object-fit:contain; filter:brightness(1.15) contrast(1.05);"
      />
      <div class="font-['Plus_Jakarta_Sans',sans-serif] text-xl font-extrabold tracking-tight text-white leading-tight" style="font-family:'Plus Jakarta Sans', Arial, sans-serif; font-size:22px; font-weight:800; letter-spacing:-0.4px; color:#FFFFFF; line-height:1.2;">
        FRRF <span class="text-[#00B4D8]" style="color:#00B4D8;">PLUMBING</span>
      </div>
      <div class="font-['Plus_Jakarta_Sans',sans-serif] text-[10px] font-bold text-[#FF6B35] tracking-widest uppercase mt-1" style="font-family:'Plus Jakarta Sans', Arial, sans-serif; font-size:10px; font-weight:700; color:#FF6B35; letter-spacing:1.5px; text-transform:uppercase; margin-top:3px;">
        🛡️ WORK 1ST POLICY · EMERGENCY INFRASTRUCTURE
      </div>
    </div>
  </div>`;
}

/* ─────────────────────────────────────────────────────────────
   HTML BASE WRAPPER (Tailwind CSS Browser v4 CDN)
───────────────────────────────────────────────────────────── */
function buildBase(content) {
  const year = new Date().getFullYear();
  return `<!doctype html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${BRAND.name}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800;900&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
</head>
<body class="bg-[#070E1A] font-['Plus_Jakarta_Sans',sans-serif] text-slate-100 m-0 p-0 w-full antialiased" style="background-color:#070E1A; margin:0; padding:0; font-family:'Plus Jakarta Sans',sans-serif;">
  <div class="bg-[#070E1A] w-full min-h-screen py-6 px-2 flex justify-center items-center" style="background-color:#070E1A; width:100%;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#070E1A; width:100%;">
      <tr>
        <td align="center" style="padding:16px 8px;">
          <div class="max-w-[580px] w-full mx-auto my-5 bg-[#0A1628] rounded-[18px] overflow-hidden border border-[#00B4D8]/25 shadow-2xl" style="max-width:580px; width:100%; margin:20px auto; background-color:#0A1628; border-radius:18px; overflow:hidden; border:1px solid rgba(0, 180, 216, 0.25);">
            ${content}
            
            <!-- Footer with Tailwind CSS -->
            <div class="bg-[#070E1A] p-6 text-center border-t border-white/5 text-xs text-slate-500 leading-relaxed" style="background-color:#070E1A; padding:22px 24px 20px; text-align:center; border-top:1px solid rgba(255,255,255,0.06); font-size:11px; color:#64748B;">
              <div class="font-bold text-white mb-1 text-sm tracking-wide" style="font-weight:700; color:#FFFFFF; margin-bottom:4px;">
                FRRF <span class="text-[#00B4D8]" style="color:#00B4D8;">PLUMBING</span> SERVICES
              </div>
              <div class="text-[#00B4D8] text-[10px] font-bold tracking-widest uppercase mb-3" style="color:#00B4D8; font-size:10px; font-weight:700; letter-spacing:1px; margin-bottom:12px;">
                WORK 1ST POLICY · 24/7 RAPID DISPATCH
              </div>
              <div class="space-x-3 text-xs mb-3" style="margin-bottom:10px;">
                <a href="${BRAND.website}" class="text-[#00B4D8] hover:text-cyan-300 transition-colors no-underline font-medium" style="color:#00B4D8; text-decoration:none;">Home</a> · 
                <a href="${BRAND.website}/booking" class="text-[#00B4D8] hover:text-cyan-300 transition-colors no-underline font-medium" style="color:#00B4D8; text-decoration:none;">Book Plumber</a> · 
                <a href="mailto:${BRAND.supportEmail}" class="text-[#00B4D8] hover:text-cyan-300 transition-colors no-underline font-medium" style="color:#00B4D8; text-decoration:none;">24/7 Support</a>
              </div>
              <div class="text-[11px] text-slate-500 mt-2.5" style="margin-top:10px; font-size:11px; color:#64748B;">
                © ${year} FRRF Plumbing Services Pvt Ltd. Helpline: <strong class="text-slate-300" style="color:#CBD5E1;">${BRAND.emergencyPhone}</strong><br/>
                <span class="text-[10px] text-slate-600 block mt-1" style="font-size:10px; color:#475569;">Automated notification for registered account holders under Work 1st Policy.</span>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>`;
}

/* ═══════════════════════════════════════════════════════════
   ① CLIENT / CUSTOMER WELCOME EMAIL (Tailwind CSS, <12KB)
═══════════════════════════════════════════════════════════ */
export function clientWelcomeEmail(arg1, arg2) {
  let FullName, email, verifyUrl;
  if (typeof arg1 === "object" && arg1 !== null) {
    ({ FullName, email, verifyUrl } = arg1);
  } else {
    FullName = arg1;
    verifyUrl = arg2;
  }

  const firstName = FullName?.split(" ")[0] || "Customer";

  const content = `
  ${renderHeader("ACCOUNT VERIFICATION")}

  <!-- Hero Section (Tailwind CSS) -->
  <div class="bg-gradient-to-br from-[#0F1F38]/90 to-[#0A1628]/95 px-7 py-6 text-center border-b border-white/5" style="padding:24px 28px 18px; background:linear-gradient(135deg, rgba(15, 31, 56, 0.85), rgba(10, 22, 40, 0.95)); border-bottom:1px solid rgba(255, 255, 255, 0.06); text-align:center;">
    <div class="inline-block px-3 py-1 bg-[#00B4D8]/15 rounded-full text-[10px] font-bold text-[#00B4D8] uppercase mb-2 tracking-wide" style="display:inline-block; padding:4px 10px; background:rgba(0,180,216,0.15); border-radius:100px; font-size:10px; font-weight:700; color:#00B4D8; text-transform:uppercase; margin-bottom:8px;">
      🎉 Account Ready
    </div>
    <h1 class="text-xl sm:text-2xl font-extrabold text-white leading-tight mb-2 tracking-tight" style="font-size:22px; font-weight:800; color:#FFFFFF; line-height:1.25; margin-bottom:8px;">
      Welcome, <span class="text-[#00B4D8]" style="color:#00B4D8;">${firstName}!</span>
    </h1>
    <p class="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md mx-auto" style="font-size:13px; color:#94A3B8; line-height:1.5;">
      Your account is created. Experience our signature <strong class="text-white" style="color:#FFFFFF;">Work 1st Policy</strong>: certified plumbers with zero advance risk.
    </p>
  </div>

  <!-- Body Content (Tailwind CSS) -->
  <div class="p-6 sm:p-7" style="padding:26px 28px;">
    <!-- CTA Button -->
    <div class="text-center my-3 sm:my-5" style="text-align:center; margin:8px 0 20px;">
      <a
        href="${verifyUrl}"
        class="inline-block px-8 py-3.5 bg-gradient-to-r from-[#FF6B35] to-[#FA5A1E] text-white font-bold text-sm rounded-xl shadow-[0_8px_20px_-3px_rgba(255,107,53,0.45)] hover:shadow-orange-500/50 hover:-translate-y-0.5 transition-all text-center no-underline tracking-wide"
        style="display:inline-block; padding:14px 36px; background:linear-gradient(135deg, #FF6B35 0%, #FA5A1E 100%); color:#FFFFFF !important; text-decoration:none; border-radius:10px; font-size:14px; font-weight:700; letter-spacing:0.3px; box-shadow:0 8px 20px -3px rgba(255, 107, 53, 0.45); text-align:center;"
        target="_blank"
      >
        ✅ &nbsp;Verify Email & Activate Account
      </a>
      <p class="text-xs text-slate-400 mt-2.5" style="font-size:11px; color:#94A3B8; margin-top:10px;">
        Link expires in <strong class="text-slate-200" style="color:#E2E8F0;">7 days</strong>.
      </p>
    </div>

    <!-- Guarantee Box -->
    <div class="bg-gradient-to-r from-[#FF6B35]/10 to-[#0F1F38]/60 border border-[#FF6B35]/35 rounded-xl p-3.5 my-4 text-xs text-slate-200 leading-relaxed" style="background:linear-gradient(135deg, rgba(255, 107, 53, 0.12), rgba(15, 31, 56, 0.6)); border:1px solid rgba(255, 107, 53, 0.35); border-radius:10px; padding:14px 16px; margin:18px 0; font-size:12px; color:#E2E8F0; line-height:1.5;">
      <strong class="text-[#FF6B35] uppercase" style="color:#FF6B35; text-transform:uppercase;">🛡️ Work 1st Policy:</strong>
      We fix your pipeline, blockage, or water tank first. You test and pay only after 100% satisfaction.
    </div>

    <!-- Card Summary -->
    <div class="bg-[#0F1F38] border border-[#00B4D8]/20 rounded-xl p-4 sm:p-5 my-4" style="background:#0F1F38; border:1px solid rgba(0, 180, 216, 0.22); border-radius:12px; padding:18px 20px; margin:18px 0;">
      <div class="text-[11px] font-extrabold text-[#00B4D8] uppercase tracking-wider mb-2" style="font-size:11px; font-weight:800; color:#00B4D8; text-transform:uppercase; margin-bottom:8px;">
        📋 Account Summary
      </div>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td class="text-slate-400 text-xs font-semibold uppercase tracking-wider py-1.5" style="color:#94A3B8; font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.5px; padding:5px 0;">Customer Name</td>
          <td class="text-white text-xs font-semibold py-1.5 text-right" style="color:#FFFFFF; font-size:13px; font-weight:600; padding:5px 0; text-align:right;">${FullName}</td>
        </tr>
        <tr>
          <td class="text-slate-400 text-xs font-semibold uppercase tracking-wider py-1.5" style="color:#94A3B8; font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.5px; padding:5px 0;">Email</td>
          <td class="text-[#00B4D8] text-xs font-semibold py-1.5 text-right" style="color:#00B4D8; font-size:13px; font-weight:600; padding:5px 0; text-align:right;">${email}</td>
        </tr>
        <tr>
          <td class="text-slate-400 text-xs font-semibold uppercase tracking-wider py-1.5" style="color:#94A3B8; font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.5px; padding:5px 0;">Guarantee</td>
          <td class="text-[#FF6B35] text-xs font-semibold py-1.5 text-right" style="color:#FF6B35; font-size:13px; font-weight:600; padding:5px 0; text-align:right;">Work 1st Active</td>
        </tr>
      </table>
    </div>

    <!-- Metrics Box -->
    <div class="bg-[#070E1A] border border-white/10 rounded-xl p-3.5 my-4 text-center" style="background:#070E1A; border:1px solid rgba(255, 255, 255, 0.08); border-radius:12px; padding:14px 10px; margin:18px 0; text-align:center;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td width="33%">
            <div class="text-lg font-extrabold text-[#00B4D8] leading-tight" style="font-size:18px; font-weight:800; color:#00B4D8; line-height:1.2;">10k+</div>
            <div class="text-[9px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5" style="font-size:9px; font-weight:600; color:#94A3B8; text-transform:uppercase; letter-spacing:0.5px; margin-top:2px;">Plumbers</div>
          </td>
          <td width="34%" style="border-left:1px solid rgba(255,255,255,0.08); border-right:1px solid rgba(255,255,255,0.08);">
            <div class="text-lg font-extrabold text-[#00B4D8] leading-tight" style="font-size:18px; font-weight:800; color:#00B4D8; line-height:1.2;">20 Min</div>
            <div class="text-[9px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5" style="font-size:9px; font-weight:600; color:#94A3B8; text-transform:uppercase; letter-spacing:0.5px; margin-top:2px;">Avg Dispatch</div>
          </td>
          <td width="33%">
            <div class="text-lg font-extrabold text-[#00B4D8] leading-tight" style="font-size:18px; font-weight:800; color:#00B4D8; line-height:1.2;">4.9 ★</div>
            <div class="text-[9px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5" style="font-size:9px; font-weight:600; color:#94A3B8; text-transform:uppercase; letter-spacing:0.5px; margin-top:2px;">Rating</div>
          </td>
        </tr>
      </table>
    </div>

    <!-- Direct Link -->
    <div class="bg-white/[0.02] border border-dashed border-[#00B4D8]/30 rounded-lg p-2.5 my-3.5 break-all text-left" style="background:rgba(255,255,255,0.02); border:1px dashed rgba(0,180,216,0.3); border-radius:8px; padding:10px 12px; margin:14px 0; word-break:break-all;">
      <div class="text-[10px] font-bold text-[#00B4D8] uppercase mb-1" style="font-size:10px; font-weight:700; color:#00B4D8; text-transform:uppercase; margin-bottom:4px;">🔗 Direct Link:</div>
      <a href="${verifyUrl}" class="text-xs text-slate-400 underline hover:text-cyan-400" style="font-size:11px; color:#94A3B8; text-decoration:underline;">${verifyUrl}</a>
    </div>

    <!-- Notice -->
    <div class="bg-white/[0.02] border border-white/10 rounded-lg p-3 my-4 text-xs text-slate-400 leading-relaxed" style="background:rgba(255,255,255,0.02); border:1px solid rgba(255, 255, 255, 0.07); border-radius:8px; padding:12px 14px; font-size:11px; color:#94A3B8; line-height:1.5; margin:18px 0 6px;">
      <strong class="text-slate-300" style="color:#CBD5E1;">⚠️ Notice:</strong> If you did not create this account, please ignore this email or contact 
      <a href="mailto:${BRAND.supportEmail}" class="text-[#00B4D8]" style="color:#00B4D8;">${BRAND.supportEmail}</a>.
    </div>
  </div>`;

  return buildBase(content);
}

/* ═══════════════════════════════════════════════════════════
   ② TECHNICIAN WELCOME EMAIL (Tailwind CSS, <12KB)
═══════════════════════════════════════════════════════════ */
export function technicianWelcomeEmail(arg1, arg2, arg3, arg4, arg5) {
  let FullName, email, experienceYears, city, verifyUrl;
  if (typeof arg1 === "object" && arg1 !== null) {
    ({ FullName, email, experienceYears, city, verifyUrl } = arg1);
  } else {
    FullName = arg1;
    email = arg2;
    experienceYears = arg3;
    city = arg4;
    verifyUrl = arg5;
  }

  const firstName = FullName?.split(" ")[0] || "Partner";

  const content = `
  ${renderHeader("PARTNER ONBOARDING")}

  <!-- Hero Section (Tailwind CSS) -->
  <div class="bg-gradient-to-br from-[#0F1F38]/90 to-[#0A1628]/95 px-7 py-6 text-center border-b border-white/5" style="padding:24px 28px 18px; background:linear-gradient(135deg, rgba(15, 31, 56, 0.85), rgba(10, 22, 40, 0.95)); border-bottom:1px solid rgba(255, 255, 255, 0.06); text-align:center;">
    <div class="inline-block px-3 py-1 bg-[#FF6B35]/15 rounded-full text-[10px] font-bold text-[#FF6B35] uppercase mb-2 tracking-wide" style="display:inline-block; padding:4px 10px; background:rgba(255,107,53,0.15); border-radius:100px; font-size:10px; font-weight:700; color:#FF6B35; text-transform:uppercase; margin-bottom:8px;">
      🛠️ Application Received
    </div>
    <h1 class="text-xl sm:text-2xl font-extrabold text-white leading-tight mb-2 tracking-tight" style="font-size:22px; font-weight:800; color:#FFFFFF; line-height:1.25; margin-bottom:8px;">
      Welcome, <span class="text-[#FF6B35]" style="color:#FF6B35;">${firstName}!</span>
    </h1>
    <p class="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md mx-auto" style="font-size:13px; color:#94A3B8; line-height:1.5;">
      Verify your email to unlock your <strong class="text-white" style="color:#FFFFFF;">FRRF Master Technician Portal</strong> and begin receiving nearby leads.
    </p>
  </div>

  <!-- Body Content (Tailwind CSS) -->
  <div class="p-6 sm:p-7" style="padding:26px 28px;">
    <!-- CTA Button -->
    <div class="text-center my-3 sm:my-5" style="text-align:center; margin:8px 0 20px;">
      <a
        href="${verifyUrl}"
        class="inline-block px-8 py-3.5 bg-gradient-to-r from-[#00B4D8] to-[#0096C7] text-[#070E1A] font-extrabold text-sm rounded-xl shadow-[0_8px_20px_-3px_rgba(0,180,216,0.35)] hover:shadow-cyan-400/50 hover:-translate-y-0.5 transition-all text-center no-underline tracking-wide"
        style="display:inline-block; padding:14px 36px; background:linear-gradient(135deg, #00B4D8 0%, #0096C7 100%); color:#070E1A !important; text-decoration:none; border-radius:10px; font-size:14px; font-weight:800; letter-spacing:0.3px; box-shadow:0 8px 20px -3px rgba(0, 180, 216, 0.35); text-align:center;"
        target="_blank"
      >
        🔧 &nbsp;Verify Email & Unlock Dashboard
      </a>
      <p class="text-xs text-slate-400 mt-2.5" style="font-size:11px; color:#94A3B8; margin-top:10px;">
        Link expires in <strong class="text-slate-200" style="color:#E2E8F0;">7 days</strong>.
      </p>
    </div>

    <!-- Partner Profile Card -->
    <div class="bg-[#0F1F38] border border-[#00B4D8]/20 rounded-xl p-4 sm:p-5 my-4" style="background:#0F1F38; border:1px solid rgba(0, 180, 216, 0.22); border-radius:12px; padding:18px 20px; margin:18px 0;">
      <div class="text-[11px] font-extrabold text-[#00B4D8] uppercase tracking-wider mb-2" style="font-size:11px; font-weight:800; color:#00B4D8; text-transform:uppercase; margin-bottom:8px;">
        🧑‍💼 Partner Profile
      </div>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td class="text-slate-400 text-xs font-semibold uppercase tracking-wider py-1.5" style="color:#94A3B8; font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.5px; padding:5px 0;">Full Name</td>
          <td class="text-white text-xs font-semibold py-1.5 text-right" style="color:#FFFFFF; font-size:13px; font-weight:600; padding:5px 0; text-align:right;">${FullName}</td>
        </tr>
        <tr>
          <td class="text-slate-400 text-xs font-semibold uppercase tracking-wider py-1.5" style="color:#94A3B8; font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.5px; padding:5px 0;">Email</td>
          <td class="text-[#00B4D8] text-xs font-semibold py-1.5 text-right" style="color:#00B4D8; font-size:13px; font-weight:600; padding:5px 0; text-align:right;">${email}</td>
        </tr>
        <tr>
          <td class="text-slate-400 text-xs font-semibold uppercase tracking-wider py-1.5" style="color:#94A3B8; font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.5px; padding:5px 0;">Location</td>
          <td class="text-white text-xs font-semibold py-1.5 text-right" style="color:#FFFFFF; font-size:13px; font-weight:600; padding:5px 0; text-align:right;">📍 ${city || "Operational Area"}</td>
        </tr>
        <tr>
          <td class="text-slate-400 text-xs font-semibold uppercase tracking-wider py-1.5" style="color:#94A3B8; font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.5px; padding:5px 0;">Experience</td>
          <td class="text-white text-xs font-semibold py-1.5 text-right" style="color:#FFFFFF; font-size:13px; font-weight:600; padding:5px 0; text-align:right;">⭐ ${experienceYears || 0} Year${(experienceYears || 0) !== 1 ? "s" : ""}</td>
        </tr>
      </table>
    </div>

    <!-- Metrics Box -->
    <div class="bg-[#070E1A] border border-white/10 rounded-xl p-3.5 my-4 text-center" style="background:#070E1A; border:1px solid rgba(255, 255, 255, 0.08); border-radius:12px; padding:14px 10px; margin:18px 0; text-align:center;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td width="33%">
            <div class="text-lg font-extrabold text-[#FF6B35] leading-tight" style="font-size:18px; font-weight:800; color:#FF6B35; line-height:1.2;">₹50k+</div>
            <div class="text-[9px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5" style="font-size:9px; font-weight:600; color:#94A3B8; text-transform:uppercase; letter-spacing:0.5px; margin-top:2px;">Monthly Pot.</div>
          </td>
          <td width="34%" style="border-left:1px solid rgba(255,255,255,0.08); border-right:1px solid rgba(255,255,255,0.08);">
            <div class="text-lg font-extrabold text-[#00B4D8] leading-tight" style="font-size:18px; font-weight:800; color:#00B4D8; line-height:1.2;">10-15</div>
            <div class="text-[9px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5" style="font-size:9px; font-weight:600; color:#94A3B8; text-transform:uppercase; letter-spacing:0.5px; margin-top:2px;">Jobs / Day</div>
          </td>
          <td width="33%">
            <div class="text-lg font-extrabold text-emerald-400 leading-tight" style="font-size:18px; font-weight:800; color:#10B981; line-height:1.2;">Weekly</div>
            <div class="text-[9px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5" style="font-size:9px; font-weight:600; color:#94A3B8; text-transform:uppercase; letter-spacing:0.5px; margin-top:2px;">Payouts</div>
          </td>
        </tr>
      </table>
    </div>

    <!-- Direct Link -->
    <div class="bg-white/[0.02] border border-dashed border-[#00B4D8]/30 rounded-lg p-2.5 my-3.5 break-all text-left" style="background:rgba(255,255,255,0.02); border:1px dashed rgba(0,180,216,0.3); border-radius:8px; padding:10px 12px; margin:14px 0; word-break:break-all;">
      <div class="text-[10px] font-bold text-[#00B4D8] uppercase mb-1" style="font-size:10px; font-weight:700; color:#00B4D8; text-transform:uppercase; margin-bottom:4px;">🔗 Direct Link:</div>
      <a href="${verifyUrl}" class="text-xs text-slate-400 underline hover:text-cyan-400" style="font-size:11px; color:#94A3B8; text-decoration:underline;">${verifyUrl}</a>
    </div>

    <!-- Notice -->
    <div class="bg-white/[0.02] border border-white/10 rounded-lg p-3 my-4 text-xs text-slate-400 leading-relaxed" style="background:rgba(255,255,255,0.02); border:1px solid rgba(255, 255, 255, 0.07); border-radius:8px; padding:12px 14px; font-size:11px; color:#94A3B8; line-height:1.5; margin:18px 0 6px;">
      <strong class="text-slate-300" style="color:#CBD5E1;">📞 Partner Support:</strong> Mon–Sat, 8 AM–9 PM. Email: 
      <a href="mailto:${BRAND.supportEmail}" class="text-[#00B4D8]" style="color:#00B4D8;">${BRAND.supportEmail}</a> or WhatsApp <strong class="text-slate-200" style="color:#E2E8F0;">${BRAND.emergencyPhone}</strong>.
    </div>
  </div>`;

  return buildBase(content);
}

/* ═══════════════════════════════════════════════════════════
   ③ LOGIN SUCCESS & SECURITY ALERT EMAIL (Tailwind CSS, <10KB)
═══════════════════════════════════════════════════════════ */
export function loginSuccessEmail(arg1, arg2, arg3, arg4) {
  let FullName, email, role, loginTime;
  if (typeof arg1 === "object" && arg1 !== null) {
    ({ FullName, email, role, loginTime } = arg1);
  } else {
    FullName = arg1;
    email = arg2;
    role = arg3;
    loginTime = arg4;
  }

  const isTechnician = role === "technician";
  const firstName = FullName?.split(" ")[0] || (isTechnician ? "Partner" : "Customer");
  const timeFormatted = loginTime || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  const content = `
  ${renderHeader(isTechnician ? "TECHNICIAN LOGIN ALERT" : "SECURITY SIGN-IN ALERT")}

  <!-- Hero Section (Tailwind CSS) -->
  <div class="bg-gradient-to-br from-[#0F1F38]/90 to-[#0A1628]/95 px-7 py-6 text-center border-b border-white/5" style="padding:24px 28px 18px; background:linear-gradient(135deg, rgba(15, 31, 56, 0.85), rgba(10, 22, 40, 0.95)); border-bottom:1px solid rgba(255, 255, 255, 0.06); text-align:center;">
    <div class="inline-block px-3 py-1 bg-[#00B4D8]/15 rounded-full text-[10px] font-bold text-[#00B4D8] uppercase mb-2 tracking-wide" style="display:inline-block; padding:4px 10px; background:rgba(0,180,216,0.15); border-radius:100px; font-size:10px; font-weight:700; color:#00B4D8; text-transform:uppercase; margin-bottom:8px;">
      🛡️ Successful Login
    </div>
    <h1 class="text-xl sm:text-2xl font-extrabold text-white leading-tight mb-2 tracking-tight" style="font-size:22px; font-weight:800; color:#FFFFFF; line-height:1.25; margin-bottom:8px;">
      Welcome Back, <span class="text-[#00B4D8]" style="color:#00B4D8;">${firstName}!</span>
    </h1>
    <p class="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md mx-auto" style="font-size:13px; color:#94A3B8; line-height:1.5;">
      A sign-in session was established for your <strong class="text-white" style="color:#FFFFFF;">FRRF Plumbing ${isTechnician ? "Partner" : "Customer"} Account</strong>.
    </p>
  </div>

  <!-- Body Content (Tailwind CSS) -->
  <div class="p-6 sm:p-7" style="padding:26px 28px;">
    <!-- Session Telemetry Card -->
    <div class="bg-[#0F1F38] border border-[#00B4D8]/20 rounded-xl p-4 sm:p-5 my-4" style="background:#0F1F38; border:1px solid rgba(0, 180, 216, 0.22); border-radius:12px; padding:18px 20px; margin:18px 0;">
      <div class="text-[11px] font-extrabold text-[#00B4D8] uppercase tracking-wider mb-2" style="font-size:11px; font-weight:800; color:#00B4D8; text-transform:uppercase; margin-bottom:8px;">
        🔒 Session Telemetry
      </div>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td class="text-slate-400 text-xs font-semibold uppercase tracking-wider py-1.5" style="color:#94A3B8; font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.5px; padding:5px 0;">Account</td>
          <td class="text-white text-xs font-semibold py-1.5 text-right" style="color:#FFFFFF; font-size:13px; font-weight:600; padding:5px 0; text-align:right;">${FullName}</td>
        </tr>
        <tr>
          <td class="text-slate-400 text-xs font-semibold uppercase tracking-wider py-1.5" style="color:#94A3B8; font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.5px; padding:5px 0;">Email</td>
          <td class="text-[#00B4D8] text-xs font-semibold py-1.5 text-right" style="color:#00B4D8; font-size:13px; font-weight:600; padding:5px 0; text-align:right;">${email}</td>
        </tr>
        <tr>
          <td class="text-slate-400 text-xs font-semibold uppercase tracking-wider py-1.5" style="color:#94A3B8; font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.5px; padding:5px 0;">Role</td>
          <td class="text-xs font-semibold py-1.5 text-right" style="color:${isTechnician ? "#FF6B35" : "#00B4D8"}; font-size:13px; font-weight:600; padding:5px 0; text-align:right;">${isTechnician ? "🔧 Master Plumber" : "🧑 Customer"}</td>
        </tr>
        <tr>
          <td class="text-slate-400 text-xs font-semibold uppercase tracking-wider py-1.5" style="color:#94A3B8; font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.5px; padding:5px 0;">Timestamp</td>
          <td class="text-white text-xs font-semibold py-1.5 text-right" style="color:#FFFFFF; font-size:13px; font-weight:600; padding:5px 0; text-align:right;">${timeFormatted} IST</td>
        </tr>
      </table>
    </div>

    <!-- CTA Button -->
    <div class="text-center my-4 sm:my-5" style="text-align:center; margin:18px 0 10px;">
      <a
        href="${BRAND.website}${isTechnician ? "/technician/dashboard" : "/booking"}"
        class="${isTechnician ? "inline-block px-8 py-3.5 bg-gradient-to-r from-[#00B4D8] to-[#0096C7] text-[#070E1A] font-extrabold text-sm rounded-xl shadow-[0_8px_20px_-3px_rgba(0,180,216,0.35)]" : "inline-block px-8 py-3.5 bg-gradient-to-r from-[#FF6B35] to-[#FA5A1E] text-white font-bold text-sm rounded-xl shadow-[0_8px_20px_-3px_rgba(255,107,53,0.45)]"} hover:-translate-y-0.5 transition-all text-center no-underline tracking-wide"
        style="display:inline-block; padding:14px 36px; background:${isTechnician ? "linear-gradient(135deg, #00B4D8 0%, #0096C7 100%)" : "linear-gradient(135deg, #FF6B35 0%, #FA5A1E 100%)"}; color:${isTechnician ? "#070E1A" : "#FFFFFF"} !important; text-decoration:none; border-radius:10px; font-size:14px; font-weight:700; text-align:center;"
      >
        ${isTechnician ? "🖥️ Open Dashboard" : "⚡ Book Plumber"} →
      </a>
    </div>

    <!-- Notice -->
    <div class="bg-white/[0.02] border-l-4 border-red-500 rounded-lg p-3 my-4 text-xs text-slate-400 leading-relaxed" style="background:rgba(255,255,255,0.02); border-left:3px solid #EF4444; border-radius:8px; padding:12px 14px; font-size:11px; color:#94A3B8; line-height:1.5;">
      <strong class="text-red-400" style="color:#EF4444;">🚨 Unrecognized sign-in?</strong> If you didn't initiate this, 
      reset your password immediately or email <a href="mailto:${BRAND.supportEmail}" class="text-[#00B4D8]" style="color:#00B4D8;">${BRAND.supportEmail}</a>.
    </div>
  </div>`;

  return buildBase(content);
}

/* ═══════════════════════════════════════════════════════════
   ④ RESET PASSWORD EMAIL (Tailwind CSS, <10KB)
═══════════════════════════════════════════════════════════ */
export function resetPasswordEmail(arg1, arg2, arg3, arg4) {
  let FullName, email, role, resetUrl;
  if (typeof arg1 === "object" && arg1 !== null) {
    ({ FullName, email, role, resetUrl } = arg1);
  } else {
    FullName = arg1;
    email = arg2;
    role = arg3;
    resetUrl = arg4;
  }

  const isTechnician = role === "technician";
  const firstName = FullName?.split(" ")[0] || (isTechnician ? "Partner" : "User");

  const content = `
  ${renderHeader("PASSWORD RECOVERY")}

  <!-- Hero Section (Tailwind CSS) -->
  <div class="bg-gradient-to-br from-[#0F1F38]/90 to-[#0A1628]/95 px-7 py-6 text-center border-b border-white/5" style="padding:24px 28px 18px; background:linear-gradient(135deg, rgba(15, 31, 56, 0.85), rgba(10, 22, 40, 0.95)); border-bottom:1px solid rgba(255, 255, 255, 0.06); text-align:center;">
    <div class="inline-block px-3 py-1 bg-[#FF6B35]/15 rounded-full text-[10px] font-bold text-[#FF6B35] uppercase mb-2 tracking-wide" style="display:inline-block; padding:4px 10px; background:rgba(255,107,53,0.15); border-radius:100px; font-size:10px; font-weight:700; color:#FF6B35; text-transform:uppercase; margin-bottom:8px;">
      🔒 Reset Authorization
    </div>
    <h1 class="text-xl sm:text-2xl font-extrabold text-white leading-tight mb-2 tracking-tight" style="font-size:22px; font-weight:800; color:#FFFFFF; line-height:1.25; margin-bottom:8px;">
      Reset Password, <span class="text-[#FF6B35]" style="color:#FF6B35;">${firstName}</span>
    </h1>
    <p class="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md mx-auto" style="font-size:13px; color:#94A3B8; line-height:1.5;">
      We received a request to reset the password for your <strong class="text-white" style="color:#FFFFFF;">FRRF Plumbing Account</strong>.
    </p>
  </div>

  <!-- Body Content (Tailwind CSS) -->
  <div class="p-6 sm:p-7" style="padding:26px 28px;">
    <!-- CTA Button -->
    <div class="text-center my-3 sm:my-5" style="text-align:center; margin:8px 0 16px;">
      <a
        href="${resetUrl}"
        class="inline-block px-8 py-3.5 bg-gradient-to-r from-[#FF6B35] to-[#FA5A1E] text-white font-bold text-sm rounded-xl shadow-[0_8px_20px_-3px_rgba(255,107,53,0.45)] hover:shadow-orange-500/50 hover:-translate-y-0.5 transition-all text-center no-underline tracking-wide"
        style="display:inline-block; padding:14px 36px; background:linear-gradient(135deg, #FF6B35 0%, #FA5A1E 100%); color:#FFFFFF !important; text-decoration:none; border-radius:10px; font-size:14px; font-weight:700; letter-spacing:0.3px; box-shadow:0 8px 20px -3px rgba(255, 107, 53, 0.45); text-align:center;"
        target="_blank"
      >
        🔑 &nbsp;Set New Secure Password
      </a>
      <p class="text-xs text-amber-400 mt-2.5 font-semibold" style="font-size:11px; color:#F59E0B; margin-top:10px; font-weight:600;">
        ⏳ Security link expires in <strong class="text-amber-300" style="color:#FDE68A;">1 hour</strong>.
      </p>
    </div>

    <!-- Summary Card -->
    <div class="bg-[#0F1F38] border border-[#00B4D8]/20 rounded-xl p-4 sm:p-5 my-4" style="background:#0F1F38; border:1px solid rgba(0, 180, 216, 0.22); border-radius:12px; padding:18px 20px; margin:18px 0;">
      <div class="text-[11px] font-extrabold text-[#00B4D8] uppercase tracking-wider mb-2" style="font-size:11px; font-weight:800; color:#00B4D8; text-transform:uppercase; margin-bottom:8px;">
        📋 Request Summary
      </div>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td class="text-slate-400 text-xs font-semibold uppercase tracking-wider py-1.5" style="color:#94A3B8; font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.5px; padding:5px 0;">Account</td>
          <td class="text-white text-xs font-semibold py-1.5 text-right" style="color:#FFFFFF; font-size:13px; font-weight:600; padding:5px 0; text-align:right;">${FullName}</td>
        </tr>
        <tr>
          <td class="text-slate-400 text-xs font-semibold uppercase tracking-wider py-1.5" style="color:#94A3B8; font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.5px; padding:5px 0;">Email</td>
          <td class="text-[#00B4D8] text-xs font-semibold py-1.5 text-right" style="color:#00B4D8; font-size:13px; font-weight:600; padding:5px 0; text-align:right;">${email}</td>
        </tr>
        <tr>
          <td class="text-slate-400 text-xs font-semibold uppercase tracking-wider py-1.5" style="color:#94A3B8; font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.5px; padding:5px 0;">Status</td>
          <td class="text-emerald-400 text-xs font-semibold py-1.5 text-right" style="color:#10B981; font-size:13px; font-weight:600; padding:5px 0; text-align:right;">Single-Use Token</td>
        </tr>
      </table>
    </div>

    <!-- Direct Link -->
    <div class="bg-white/[0.02] border border-dashed border-[#00B4D8]/30 rounded-lg p-2.5 my-3.5 break-all text-left" style="background:rgba(255,255,255,0.02); border:1px dashed rgba(0,180,216,0.3); border-radius:8px; padding:10px 12px; margin:14px 0; word-break:break-all;">
      <div class="text-[10px] font-bold text-[#00B4D8] uppercase mb-1" style="font-size:10px; font-weight:700; color:#00B4D8; text-transform:uppercase; margin-bottom:4px;">🔗 Direct Link:</div>
      <a href="${resetUrl}" class="text-xs text-slate-400 underline hover:text-cyan-400" style="font-size:11px; color:#94A3B8; text-decoration:underline;">${resetUrl}</a>
    </div>

    <!-- Notice -->
    <div class="bg-white/[0.02] border border-white/10 rounded-lg p-3 my-4 text-xs text-slate-400 leading-relaxed" style="background:rgba(255,255,255,0.02); border:1px solid rgba(255, 255, 255, 0.07); border-radius:8px; padding:12px 14px; font-size:11px; color:#94A3B8; line-height:1.5;">
      <strong class="text-slate-300" style="color:#CBD5E1;">⚠️ Didn't request this?</strong> Your password remains secure under our Work 1st Security Guard. 
      You can safely ignore this email.
    </div>
  </div>`;

  return buildBase(content);
}
