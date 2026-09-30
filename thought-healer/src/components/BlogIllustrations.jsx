import React from 'react';

// ── Blog 1: 7 Warning Signs of Workplace Burnout ───────────────────────────────
export const BurnoutIllustration = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="b1_bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0a1628" />
        <stop offset="50%" stopColor="#142342" />
        <stop offset="100%" stopColor="#0d1b2a" />
      </linearGradient>
      <linearGradient id="b1_glow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
      </linearGradient>
      <linearGradient id="b1_accent" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f43f5e" />
        <stop offset="100%" stopColor="#fb923c" />
      </linearGradient>
      <filter id="b1_blur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="30" />
      </filter>
    </defs>

    {/* Background */}
    <rect width="800" height="500" fill="url(#b1_bg)" />

    {/* Ambient Glows */}
    <circle cx="200" cy="150" r="180" fill="#14b8a6" opacity="0.15" filter="url(#b1_blur)" />
    <circle cx="600" cy="350" r="200" fill="#6366f1" opacity="0.12" filter="url(#b1_blur)" />

    {/* Grid Overlay */}
    <g opacity="0.05" stroke="#ffffff" strokeWidth="1">
      {[...Array(10)].map((_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 50} x2="800" y2={i * 50} />
      ))}
      {[...Array(16)].map((_, i) => (
        <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="500" />
      ))}
    </g>

    {/* Central Brain Wave Graph Card */}
    <rect x="150" y="80" width="500" height="340" rx="24" fill="#0f172a" fillOpacity="0.8" stroke="#1e293b" strokeWidth="2" />

    {/* Brain Icon Glow Circle */}
    <circle cx="400" cy="180" r="55" fill="url(#b1_glow)" opacity="0.2" />
    <circle cx="400" cy="180" r="42" fill="#0f172a" stroke="#14b8a6" strokeWidth="2" />
    
    {/* Brain Wave Lines */}
    <path d="M 220 280 Q 280 230 330 290 T 430 250 T 510 300 T 580 260" fill="none" stroke="url(#b1_glow)" strokeWidth="4" strokeLinecap="round" />
    <path d="M 220 310 Q 300 340 370 290 T 470 320 T 580 290" fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray="6 6" opacity="0.7" />

    {/* Floating Metrics / Badges */}
    <g transform="translate(180, 110)">
      <rect width="110" height="36" rx="18" fill="#1e293b" stroke="#14b8a6" strokeWidth="1" />
      <circle cx="20" cy="18" r="6" fill="#14b8a6" />
      <text x="35" y="22" fill="#e2e8f0" fontSize="11" fontFamily="sans-serif" fontWeight="bold">Fatigue 88%</text>
    </g>

    <g transform="translate(510, 110)">
      <rect width="110" height="36" rx="18" fill="#1e293b" stroke="#f43f5e" strokeWidth="1" />
      <circle cx="20" cy="18" r="6" fill="#f43f5e" />
      <text x="35" y="22" fill="#e2e8f0" fontSize="11" fontFamily="sans-serif" fontWeight="bold">Stress High</text>
    </g>

    <g transform="translate(480, 340)">
      <rect width="140" height="40" rx="20" fill="#14b8a6" opacity="0.2" stroke="#14b8a6" strokeWidth="1" />
      <text x="70" y="25" fill="#2dd4bf" fontSize="12" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Recovery Mode</text>
    </g>

    {/* Center Brain/Spark Icon */}
    <path d="M 390 170 C 390 160, 410 160, 410 170 C 415 175, 415 185, 410 190 C 405 195, 395 195, 390 190 Z" fill="#14b8a6" />
    <circle cx="400" cy="180" r="16" fill="none" stroke="#ffffff" strokeWidth="2" />
  </svg>
);

// ── Blog 2: 10 Science-Backed Strategies to Manage Workplace Stress ─────────────
export const StressManagementIllustration = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="b2_bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#082f49" />
        <stop offset="50%" stopColor="#0c4a6e" />
        <stop offset="100%" stopColor="#0369a1" />
      </linearGradient>
      <linearGradient id="b2_box" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#818cf8" />
      </linearGradient>
      <filter id="b2_blur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="35" />
      </filter>
    </defs>

    {/* Background */}
    <rect width="800" height="500" fill="url(#b2_bg)" />
    <circle cx="650" cy="150" r="160" fill="#38bdf8" opacity="0.2" filter="url(#b2_blur)" />
    <circle cx="150" cy="350" r="180" fill="#818cf8" opacity="0.2" filter="url(#b2_blur)" />

    {/* Box Breathing Diagram in Center */}
    <rect x="260" y="110" width="280" height="280" rx="32" fill="#0f172a" fillOpacity="0.85" stroke="url(#b2_box)" strokeWidth="3" />

    {/* Breathing Cycle Quad Markers */}
    <g fill="#38bdf8" fontSize="12" fontFamily="sans-serif" fontWeight="bold">
      <text x="400" y="85" textAnchor="middle">1. INHALE (4s)</text>
      <text x="575" y="255" textAnchor="start">2. HOLD (4s)</text>
      <text x="400" y="425" textAnchor="middle">3. EXHALE (4s)</text>
      <text x="225" y="255" textAnchor="end">4. HOLD (4s)</text>
    </g>

    {/* Glowing Animated-style Center Pulse */}
    <circle cx="400" cy="250" r="70" fill="url(#b2_box)" opacity="0.25" />
    <circle cx="400" cy="250" r="50" fill="#0f172a" stroke="#38bdf8" strokeWidth="3" />
    <circle cx="400" cy="250" r="12" fill="#38bdf8" />

    {/* Strategy Pill Floating Badges */}
    <g transform="translate(100, 140)">
      <rect width="130" height="38" rx="19" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="65" y="24" fill="#e0f2fe" fontSize="12" fontFamily="sans-serif" fontWeight="600" textAnchor="middle">#1 Stress Log</text>
    </g>

    <g transform="translate(570, 140)">
      <rect width="140" height="38" rx="19" fill="#0c4a6e" stroke="#818cf8" strokeWidth="1.5" />
      <text x="70" y="24" fill="#e0e7ff" fontSize="12" fontFamily="sans-serif" fontWeight="600" textAnchor="middle">#2 Time Blocking</text>
    </g>

    <g transform="translate(100, 320)">
      <rect width="140" height="38" rx="19" fill="#0c4a6e" stroke="#4ade80" strokeWidth="1.5" />
      <text x="70" y="24" fill="#dcfce7" fontSize="12" fontFamily="sans-serif" fontWeight="600" textAnchor="middle">#5 Sleep Reset</text>
    </g>

    <g transform="translate(570, 320)">
      <rect width="140" height="38" rx="19" fill="#0c4a6e" stroke="#f43f5e" strokeWidth="1.5" />
      <text x="70" y="24" fill="#ffe4e6" fontSize="12" fontFamily="sans-serif" fontWeight="600" textAnchor="middle">#8 Resilience</text>
    </g>
  </svg>
);

// ── Blog 3: Why Women Experience Burnout Differently ───────────────────────────
export const WomenBurnoutIllustration = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="b3_bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2e1065" />
        <stop offset="50%" stopColor="#4c1d95" />
        <stop offset="100%" stopColor="#701a75" />
      </linearGradient>
      <linearGradient id="b3_pink" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f43f5e" />
        <stop offset="100%" stopColor="#e879f9" />
      </linearGradient>
      <filter id="b3_blur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="40" />
      </filter>
    </defs>

    {/* Background */}
    <rect width="800" height="500" fill="url(#b3_bg)" />
    <circle cx="400" cy="220" r="180" fill="#e879f9" opacity="0.2" filter="url(#b3_blur)" />

    {/* Lotus / Wellness Central Shield */}
    <rect x="220" y="90" width="360" height="320" rx="32" fill="#1f1147" fillOpacity="0.85" stroke="#a855f7" strokeWidth="2.5" />

    {/* Lotus Petal Art */}
    <g transform="translate(400, 210)">
      {/* Central Petal */}
      <path d="M 0 -60 C 25 -20, 25 20, 0 50 C -25 20, -25 -20, 0 -60 Z" fill="url(#b3_pink)" opacity="0.9" />
      {/* Left Petal */}
      <path d="M -15 -45 C -45 -10, -35 30, -5 45 C 5 25, 0 -15, -15 -45 Z" fill="#f43f5e" opacity="0.75" />
      {/* Right Petal */}
      <path d="M 15 -45 C 45 -10, 35 30, 5 45 C -5 25, 0 -15, 15 -45 Z" fill="#e879f9" opacity="0.75" />
      {/* Base Stem Arc */}
      <path d="M -40 40 Q 0 65 40 40" stroke="#f472b6" strokeWidth="4" strokeLinecap="round" fill="none" />
    </g>

    {/* Emotional Labor & Mental Load Orbit Badges */}
    <g transform="translate(130, 130)">
      <rect width="140" height="38" rx="19" fill="#3b0764" stroke="#f472b6" strokeWidth="1.5" />
      <text x="70" y="24" fill="#fbcfe8" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Mental Load</text>
    </g>

    <g transform="translate(530, 130)">
      <rect width="140" height="38" rx="19" fill="#3b0764" stroke="#c084fc" strokeWidth="1.5" />
      <text x="70" y="24" fill="#f3e8ff" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Emotional Labor</text>
    </g>

    <g transform="translate(130, 330)">
      <rect width="140" height="38" rx="19" fill="#3b0764" stroke="#fb7185" strokeWidth="1.5" />
      <text x="70" y="24" fill="#ffe4e6" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Caregiving</text>
    </g>

    <g transform="translate(530, 330)">
      <rect width="140" height="38" rx="19" fill="#3b0764" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="70" y="24" fill="#e0f2fe" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">HerMind Recovery</text>
    </g>

    <text x="400" y="375" fill="#f472b6" fontSize="14" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle" letterSpacing="1">
      WOMEN'S MENTAL WELLBEING
    </text>
  </svg>
);

// ── Blog 4: Hormonal Mood Swings & Natural Management ─────────────────────────
export const HormonalMoodIllustration = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="b4_bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1e1b4b" />
        <stop offset="50%" stopColor="#31104b" />
        <stop offset="100%" stopColor="#4c0519" />
      </linearGradient>
      <linearGradient id="b4_wave1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#a855f7" />
      </linearGradient>
      <linearGradient id="b4_wave2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#34d399" />
      </linearGradient>
      <filter id="b4_blur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="35" />
      </filter>
    </defs>

    {/* Background */}
    <rect width="800" height="500" fill="url(#b4_bg)" />
    <circle cx="400" cy="200" r="160" fill="#ec4899" opacity="0.18" filter="url(#b4_blur)" />

    {/* Card Wrapper */}
    <rect x="140" y="80" width="520" height="340" rx="28" fill="#0f0926" fillOpacity="0.85" stroke="#818cf8" strokeWidth="2" />

    {/* Estrogen & Progesterone Sine Waves */}
    <path d="M 180 230 C 240 130, 320 310, 400 210 C 480 110, 560 300, 620 200" fill="none" stroke="url(#b4_wave1)" strokeWidth="4" strokeLinecap="round" />
    <path d="M 180 270 C 260 340, 330 160, 400 270 C 470 360, 550 170, 620 250" fill="none" stroke="url(#b4_wave2)" strokeWidth="3" strokeDasharray="8 6" strokeLinecap="round" />

    {/* Hormone Labels */}
    <g transform="translate(200, 115)">
      <circle cx="8" cy="8" r="6" fill="#ec4899" />
      <text x="22" y="12" fill="#f472b6" fontSize="12" fontFamily="sans-serif" fontWeight="bold">Estrogen Wave</text>
    </g>

    <g transform="translate(460, 115)">
      <circle cx="8" cy="8" r="6" fill="#38bdf8" />
      <text x="22" y="12" fill="#38bdf8" fontSize="12" fontFamily="sans-serif" fontWeight="bold">Progesterone Wave</text>
    </g>

    {/* Center Equilibrium Emblem */}
    <circle cx="400" cy="240" r="45" fill="#1e1b4b" stroke="#f472b6" strokeWidth="2.5" />
    <path d="M 385 240 Q 400 220 415 240 T 400 260" fill="none" stroke="#f472b6" strokeWidth="3" />

    {/* Bottom Natural Management Pills */}
    <g transform="translate(180, 350)">
      <rect width="130" height="34" rx="17" fill="#31104b" stroke="#a855f7" strokeWidth="1.5" />
      <text x="65" y="21" fill="#e9d5ff" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">15 Natural Tips</text>
    </g>

    <g transform="translate(335, 350)">
      <rect width="130" height="34" rx="17" fill="#31104b" stroke="#ec4899" strokeWidth="1.5" />
      <text x="65" y="21" fill="#fbcfe8" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Mood Tracker</text>
    </g>

    <g transform="translate(490, 350)">
      <rect width="130" height="34" rx="17" fill="#31104b" stroke="#34d399" strokeWidth="1.5" />
      <text x="65" y="21" fill="#d1fae5" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">HerMind App</text>
    </g>
  </svg>
);

// ── Blog 5: Is Your Child's Anxiety Normal? (MiniMinds) ───────────────────────
export const MiniMindsAnxietyIllustration = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="b5_bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2a170a" />
        <stop offset="50%" stopColor="#43220f" />
        <stop offset="100%" stopColor="#190e06" />
      </linearGradient>
      <linearGradient id="b5_glow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#fbbf24" />
      </linearGradient>
      <filter id="b5_blur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="35" />
      </filter>
    </defs>

    {/* Background */}
    <rect width="800" height="500" fill="url(#b5_bg)" />
    <circle cx="400" cy="210" r="170" fill="#f97316" opacity="0.18" filter="url(#b5_blur)" />

    {/* Main Shield / Card Frame */}
    <rect x="180" y="80" width="440" height="340" rx="30" fill="#140b05" fillOpacity="0.85" stroke="#f97316" strokeWidth="2.5" />

    {/* Child & Parent Care Icon */}
    <circle cx="400" cy="190" r="55" fill="url(#b5_glow)" opacity="0.2" />
    <circle cx="400" cy="190" r="42" fill="#140b05" stroke="#f97316" strokeWidth="2" />
    
    {/* Star / Sparkle Symbols */}
    <path d="M 400 168 L 404 182 L 418 186 L 404 190 L 400 204 L 396 190 L 382 186 L 396 182 Z" fill="#fbbf24" />

    {/* Age Group Pill Badges */}
    <g transform="translate(100, 130)">
      <rect width="140" height="38" rx="19" fill="#43220f" stroke="#f97316" strokeWidth="1.5" />
      <text x="70" y="24" fill="#ffedd5" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Preschool (3–5y)</text>
    </g>

    <g transform="translate(560, 130)">
      <rect width="140" height="38" rx="19" fill="#43220f" stroke="#fbbf24" strokeWidth="1.5" />
      <text x="70" y="24" fill="#fef3c7" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">School-Age (6–12y)</text>
    </g>

    <g transform="translate(100, 320)">
      <rect width="140" height="38" rx="19" fill="#43220f" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="70" y="24" fill="#e0f2fe" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Teenagers (13–18y)</text>
    </g>

    <g transform="translate(560, 320)">
      <rect width="140" height="38" rx="19" fill="#43220f" stroke="#4ade80" strokeWidth="1.5" />
      <text x="70" y="24" fill="#dcfce7" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">MiniMinds Guide</text>
    </g>

    <text x="400" y="375" fill="#f97316" fontSize="14" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle" letterSpacing="1">
      CHILD ANXIETY & PARENTING
    </text>
  </svg>
);

// ── Blog 6: Understanding ADHD in Children (MiniMinds) ───────────────────────
export const MiniMindsAdhdIllustration = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="b6_bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1c1917" />
        <stop offset="50%" stopColor="#292524" />
        <stop offset="100%" stopColor="#0c0a09" />
      </linearGradient>
      <linearGradient id="b6_glow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ea580c" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
      <filter id="b6_blur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="35" />
      </filter>
    </defs>

    {/* Background */}
    <rect width="800" height="500" fill="url(#b6_bg)" />
    <circle cx="400" cy="220" r="170" fill="#ea580c" opacity="0.2" filter="url(#b6_blur)" />

    {/* Main Shield / Card Frame */}
    <rect x="180" y="80" width="440" height="340" rx="30" fill="#0c0a09" fillOpacity="0.85" stroke="#ea580c" strokeWidth="2.5" />

    {/* Brain Focus Orbit Diagram */}
    <circle cx="400" cy="200" r="60" fill="url(#b6_glow)" opacity="0.15" />
    <circle cx="400" cy="200" r="45" fill="#0c0a09" stroke="#ea580c" strokeWidth="2" strokeDasharray="6 4" />
    
    {/* Focus Target Center */}
    <circle cx="400" cy="200" r="12" fill="#f59e0b" />
    <circle cx="400" cy="200" r="22" fill="none" stroke="#f59e0b" strokeWidth="1.5" />

    {/* 3 Presentation Badges */}
    <g transform="translate(100, 140)">
      <rect width="140" height="38" rx="19" fill="#292524" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="70" y="24" fill="#e0f2fe" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Inattentive</text>
    </g>

    <g transform="translate(560, 140)">
      <rect width="140" height="38" rx="19" fill="#292524" stroke="#f472b6" strokeWidth="1.5" />
      <text x="70" y="24" fill="#fce7f3" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Hyperactive</text>
    </g>

    <g transform="translate(100, 310)">
      <rect width="140" height="38" rx="19" fill="#292524" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="70" y="24" fill="#fef3c7" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Combined</text>
    </g>

    <g transform="translate(560, 310)">
      <rect width="140" height="38" rx="19" fill="#292524" stroke="#4ade80" strokeWidth="1.5" />
      <text x="70" y="24" fill="#dcfce7" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Executive Function</text>
    </g>

    <text x="400" y="375" fill="#ea580c" fontSize="14" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle" letterSpacing="1">
      UNDERSTANDING ADHD IN KIDS
    </text>
  </svg>
);

// ── Blog 7: Helping Children Manage Big Emotions (MiniMinds) ──────────────────
export const MiniMindsEmotionsIllustration = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="b7_bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2c1407" />
        <stop offset="50%" stopColor="#461e0b" />
        <stop offset="100%" stopColor="#140802" />
      </linearGradient>
      <linearGradient id="b7_glow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#ef4444" />
      </linearGradient>
      <filter id="b7_blur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="35" />
      </filter>
    </defs>

    {/* Background */}
    <rect width="800" height="500" fill="url(#b7_bg)" />
    <circle cx="400" cy="210" r="170" fill="#f97316" opacity="0.2" filter="url(#b7_blur)" />

    {/* Main Shield / Card Frame */}
    <rect x="180" y="80" width="440" height="340" rx="30" fill="#140802" fillOpacity="0.85" stroke="#f97316" strokeWidth="2.5" />

    {/* Emotional Dial & Heart Emblem */}
    <circle cx="400" cy="195" r="55" fill="url(#b7_glow)" opacity="0.2" />
    <circle cx="400" cy="195" r="42" fill="#140802" stroke="#f97316" strokeWidth="2" />
    
    {/* Heart Symbol */}
    <path d="M 400 210 C 385 195, 375 185, 385 175 C 393 167, 400 177, 400 177 C 400 177, 407 167, 415 175 C 425 185, 415 195, 400 210 Z" fill="#ef4444" />

    {/* Emotion Regulation Badges */}
    <g transform="translate(100, 130)">
      <rect width="140" height="38" rx="19" fill="#461e0b" stroke="#f97316" strokeWidth="1.5" />
      <text x="70" y="24" fill="#ffedd5" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Validation</text>
    </g>

    <g transform="translate(560, 130)">
      <rect width="140" height="38" rx="19" fill="#461e0b" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="70" y="24" fill="#e0f2fe" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Belly Breathing</text>
    </g>

    <g transform="translate(100, 310)">
      <rect width="140" height="38" rx="19" fill="#461e0b" stroke="#a855f7" strokeWidth="1.5" />
      <text x="70" y="24" fill="#f3e8ff" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Calm Corner</text>
    </g>

    <g transform="translate(560, 310)">
      <rect width="140" height="38" rx="19" fill="#461e0b" stroke="#4ade80" strokeWidth="1.5" />
      <text x="70" y="24" fill="#dcfce7" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Coping Skills</text>
    </g>

    <text x="400" y="375" fill="#f97316" fontSize="14" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle" letterSpacing="1">
      MANAGING BIG EMOTIONS
    </text>
  </svg>
);

// ── Blog 8: Dyslexia in Children (LES) ─────────────────────────────────────────
export const MiniMindsDyslexiaIllustration = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="b8_bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1e1b4b" />
        <stop offset="50%" stopColor="#2e1065" />
        <stop offset="100%" stopColor="#0f172a" />
      </linearGradient>
      <linearGradient id="b8_glow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="#6366f1" />
      </linearGradient>
      <filter id="b8_blur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="35" />
      </filter>
    </defs>

    {/* Background */}
    <rect width="800" height="500" fill="url(#b8_bg)" />
    <circle cx="400" cy="210" r="170" fill="#a855f7" opacity="0.2" filter="url(#b8_blur)" />

    {/* Main Shield / Card Frame */}
    <rect x="180" y="80" width="440" height="340" rx="30" fill="#0f172a" fillOpacity="0.85" stroke="#a855f7" strokeWidth="2.5" />

    {/* Book & Language Sound Icon */}
    <circle cx="400" cy="195" r="55" fill="url(#b8_glow)" opacity="0.2" />
    <circle cx="400" cy="195" r="42" fill="#0f172a" stroke="#a855f7" strokeWidth="2" />
    
    {/* Open Book Icon */}
    <path d="M 375 185 Q 400 175 400 195 Q 400 175 425 185 L 425 210 Q 400 200 400 215 Q 400 200 375 210 Z" fill="none" stroke="#c084fc" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

    {/* Literacy Badges */}
    <g transform="translate(100, 130)">
      <rect width="140" height="38" rx="19" fill="#2e1065" stroke="#a855f7" strokeWidth="1.5" />
      <text x="70" y="24" fill="#f3e8ff" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Phonics Support</text>
    </g>

    <g transform="translate(560, 130)">
      <rect width="140" height="38" rx="19" fill="#2e1065" stroke="#c084fc" strokeWidth="1.5" />
      <text x="70" y="24" fill="#fae8ff" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Multisensory</text>
    </g>

    <g transform="translate(100, 310)">
      <rect width="140" height="38" rx="19" fill="#2e1065" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="70" y="24" fill="#e0f2fe" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Structured Literacy</text>
    </g>

    <g transform="translate(560, 310)">
      <rect width="140" height="38" rx="19" fill="#2e1065" stroke="#4ade80" strokeWidth="1.5" />
      <text x="70" y="24" fill="#dcfce7" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">LES Platform</text>
    </g>

    <text x="400" y="375" fill="#c084fc" fontSize="14" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle" letterSpacing="1">
      LES DYSLEXIA & LITERACY GUIDE
    </text>
  </svg>
);

// ── Blog 9: 12 Signs of Learning Disabilities (LES) ───────────────────────────
export const LesLearningDisabilitiesIllustration = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="b9_bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1e1b4b" />
        <stop offset="50%" stopColor="#311042" />
        <stop offset="100%" stopColor="#0f172a" />
      </linearGradient>
      <linearGradient id="b9_glow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#c084fc" />
        <stop offset="100%" stopColor="#818cf8" />
      </linearGradient>
      <filter id="b9_blur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="35" />
      </filter>
    </defs>

    {/* Background */}
    <rect width="800" height="500" fill="url(#b9_bg)" />
    <circle cx="400" cy="210" r="170" fill="#a855f7" opacity="0.2" filter="url(#b9_blur)" />

    {/* Main Shield / Card Frame */}
    <rect x="180" y="80" width="440" height="340" rx="30" fill="#0f172a" fillOpacity="0.85" stroke="#a855f7" strokeWidth="2.5" />

    {/* Center Graduation Cap & Brain Emblem */}
    <circle cx="400" cy="195" r="55" fill="url(#b9_glow)" opacity="0.2" />
    <circle cx="400" cy="195" r="42" fill="#0f172a" stroke="#a855f7" strokeWidth="2" />
    
    {/* Cap & Puzzle Icon */}
    <path d="M 375 190 L 400 178 L 425 190 L 400 202 Z M 382 195 L 382 210 Q 400 218 418 210 L 418 195" fill="none" stroke="#e0e7ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

    {/* 4 Core Pillars Badges */}
    <g transform="translate(100, 130)">
      <rect width="140" height="38" rx="19" fill="#2e1065" stroke="#a855f7" strokeWidth="1.5" />
      <text x="70" y="24" fill="#f3e8ff" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">12 Warning Signs</text>
    </g>

    <g transform="translate(560, 130)">
      <rect width="140" height="38" rx="19" fill="#2e1065" stroke="#c084fc" strokeWidth="1.5" />
      <text x="70" y="24" fill="#fae8ff" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Early Intervention</text>
    </g>

    <g transform="translate(100, 310)">
      <rect width="140" height="38" rx="19" fill="#2e1065" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="70" y="24" fill="#e0f2fe" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Assessment Guide</text>
    </g>

    <g transform="translate(560, 310)">
      <rect width="140" height="38" rx="19" fill="#2e1065" stroke="#4ade80" strokeWidth="1.5" />
      <text x="70" y="24" fill="#dcfce7" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">LES Platform</text>
    </g>

    <text x="400" y="375" fill="#c084fc" fontSize="14" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle" letterSpacing="1">
      LEARNING DISABILITIES GUIDE
    </text>
  </svg>
);

// ── Blog 10: Dyscalculia Explained (LES) ──────────────────────────────────────
export const LesDyscalculiaIllustration = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="b10_bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1e1b4b" />
        <stop offset="50%" stopColor="#3b0764" />
        <stop offset="100%" stopColor="#0f172a" />
      </linearGradient>
      <linearGradient id="b10_glow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#e879f9" />
        <stop offset="100%" stopColor="#818cf8" />
      </linearGradient>
      <filter id="b10_blur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="35" />
      </filter>
    </defs>

    {/* Background */}
    <rect width="800" height="500" fill="url(#b10_bg)" />
    <circle cx="400" cy="210" r="170" fill="#c084fc" opacity="0.2" filter="url(#b10_blur)" />

    {/* Main Shield / Card Frame */}
    <rect x="180" y="80" width="440" height="340" rx="30" fill="#0f172a" fillOpacity="0.85" stroke="#c084fc" strokeWidth="2.5" />

    {/* Center Math Symbols & Abacus Emblem */}
    <circle cx="400" cy="195" r="55" fill="url(#b10_glow)" opacity="0.2" />
    <circle cx="400" cy="195" r="42" fill="#0f172a" stroke="#c084fc" strokeWidth="2" />
    
    {/* Math Symbols Icon (+ - x =) */}
    <path d="M 388 185 H 412 M 400 173 V 197 M 388 210 H 412 M 388 218 H 412" stroke="#f0abfc" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

    {/* 4 Pillars Badges */}
    <g transform="translate(100, 130)">
      <rect width="140" height="38" rx="19" fill="#3b0764" stroke="#c084fc" strokeWidth="1.5" />
      <text x="70" y="24" fill="#fae8ff" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Number Sense</text>
    </g>

    <g transform="translate(560, 130)">
      <rect width="140" height="38" rx="19" fill="#3b0764" stroke="#e879f9" strokeWidth="1.5" />
      <text x="70" y="24" fill="#fdf4ff" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Visual Manipulatives</text>
    </g>

    <g transform="translate(100, 310)">
      <rect width="140" height="38" rx="19" fill="#3b0764" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="70" y="24" fill="#e0f2fe" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Math Anxiety Support</text>
    </g>

    <g transform="translate(560, 310)">
      <rect width="140" height="38" rx="19" fill="#3b0764" stroke="#4ade80" strokeWidth="1.5" />
      <text x="70" y="24" fill="#dcfce7" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">LES Platform</text>
    </g>

    <text x="400" y="375" fill="#f0abfc" fontSize="14" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle" letterSpacing="1">
      DYSCALCULIA & MATH LEARNING
    </text>
  </svg>
);

// ── New: ADHD & Focus Illustration ─────────────────────────────────────────────
export const AdhdFocusIllustration = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="adhd_bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1e1b4b" />
        <stop offset="50%" stopColor="#0f172a" />
        <stop offset="100%" stopColor="#2e1065" />
      </linearGradient>
      <linearGradient id="adhd_glow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#a855f7" />
      </linearGradient>
      <filter id="adhd_blur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="35" />
      </filter>
    </defs>
    <rect width="800" height="500" fill="url(#adhd_bg)" />
    <circle cx="220" cy="180" r="170" fill="#f59e0b" opacity="0.18" filter="url(#adhd_blur)" />
    <circle cx="580" cy="320" r="180" fill="#a855f7" opacity="0.2" filter="url(#adhd_blur)" />

    <rect x="160" y="80" width="480" height="340" rx="28" fill="#0f172a" fillOpacity="0.88" stroke="#f59e0b" strokeWidth="2" strokeOpacity="0.6" />
    
    <circle cx="400" cy="190" r="55" fill="url(#adhd_glow)" opacity="0.15" />
    <circle cx="400" cy="190" r="44" fill="#0f172a" stroke="#f59e0b" strokeWidth="2.5" />
    <circle cx="400" cy="190" r="18" fill="#f59e0b" opacity="0.3" />
    <circle cx="400" cy="190" r="8" fill="#f59e0b" />
    <path d="M 400 135 V 147 M 400 233 V 245 M 345 190 H 357 M 443 190 H 455" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />

    <path d="M 210 290 C 270 230, 310 330, 370 270 S 450 240, 500 290 S 550 250, 590 280" fill="none" stroke="url(#adhd_glow)" strokeWidth="3.5" strokeLinecap="round" />
    
    <g transform="translate(100, 120)">
      <rect width="145" height="36" rx="18" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="1.5" />
      <circle cx="20" cy="18" r="6" fill="#f59e0b" />
      <text x="35" y="22" fill="#fef3c7" fontSize="11" fontFamily="sans-serif" fontWeight="bold">Executive Function</text>
    </g>
    <g transform="translate(555, 120)">
      <rect width="145" height="36" rx="18" fill="#1e1b4b" stroke="#a855f7" strokeWidth="1.5" />
      <circle cx="20" cy="18" r="6" fill="#a855f7" />
      <text x="35" y="22" fill="#f3e8ff" fontSize="11" fontFamily="sans-serif" fontWeight="bold">Dopamine Balance</text>
    </g>
    <g transform="translate(100, 340)">
      <rect width="145" height="36" rx="18" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="72" y="23" fill="#e0f2fe" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Task Initiation</text>
    </g>
    <g transform="translate(555, 340)">
      <rect width="145" height="36" rx="18" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
      <text x="72" y="23" fill="#d1fae5" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Focus Flow</text>
    </g>
    <text x="400" y="375" fill="#f59e0b" fontSize="13" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle" letterSpacing="1.5">
      ADHD & ATTENTION SCIENCE
    </text>
  </svg>
);

// ── New: Anxiety & Calm Illustration ───────────────────────────────────────────
export const AnxietyCalmIllustration = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="anx_bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0c4a6e" />
        <stop offset="50%" stopColor="#082f49" />
        <stop offset="100%" stopColor="#042f2e" />
      </linearGradient>
      <linearGradient id="anx_wave" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#2dd4bf" />
      </linearGradient>
      <filter id="anx_blur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="35" />
      </filter>
    </defs>
    <rect width="800" height="500" fill="url(#anx_bg)" />
    <circle cx="200" cy="200" r="160" fill="#0284c7" opacity="0.2" filter="url(#anx_blur)" />
    <circle cx="600" cy="300" r="180" fill="#0d9488" opacity="0.22" filter="url(#anx_blur)" />

    <rect x="160" y="80" width="480" height="340" rx="28" fill="#0f172a" fillOpacity="0.85" stroke="#38bdf8" strokeWidth="2" strokeOpacity="0.5" />
    
    <circle cx="400" cy="180" r="50" fill="url(#anx_wave)" opacity="0.2" />
    <circle cx="400" cy="180" r="36" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
    <path d="M 390 180 C 390 173, 410 173, 410 180 C 410 187, 390 187, 390 180" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />

    <path d="M 210 270 Q 280 230 350 270 T 490 270 T 590 270" fill="none" stroke="url(#anx_wave)" strokeWidth="4" strokeLinecap="round" />
    <path d="M 210 300 Q 280 280 350 300 T 490 300 T 590 300" fill="none" stroke="#2dd4bf" strokeWidth="2" strokeDasharray="5 5" opacity="0.7" />

    <g transform="translate(100, 120)">
      <rect width="145" height="36" rx="18" fill="#082f49" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="72" y="23" fill="#e0f2fe" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Nervous System Reset</text>
    </g>
    <g transform="translate(555, 120)">
      <rect width="145" height="36" rx="18" fill="#042f2e" stroke="#2dd4bf" strokeWidth="1.5" />
      <text x="72" y="23" fill="#ccfbf1" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Vagus Stimulation</text>
    </g>
    <g transform="translate(100, 340)">
      <rect width="145" height="36" rx="18" fill="#0f172a" stroke="#818cf8" strokeWidth="1.5" />
      <text x="72" y="23" fill="#e0e7ff" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Cortisol Regulation</text>
    </g>
    <g transform="translate(555, 340)">
      <rect width="145" height="36" rx="18" fill="#0f172a" stroke="#34d399" strokeWidth="1.5" />
      <text x="72" y="23" fill="#d1fae5" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Serenity Response</text>
    </g>
    <text x="400" y="375" fill="#38bdf8" fontSize="13" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle" letterSpacing="1.5">
      ANXIETY & SOMATIC REGULATION
    </text>
  </svg>
);

// ── New: Panic & Heart Regulation Illustration ─────────────────────────────────
export const PanicHeartIllustration = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="panic_bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4c0519" />
        <stop offset="50%" stopColor="#0f172a" />
        <stop offset="100%" stopColor="#111827" />
      </linearGradient>
      <linearGradient id="ecg_grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f43f5e" />
        <stop offset="50%" stopColor="#fb923c" />
        <stop offset="100%" stopColor="#2dd4bf" />
      </linearGradient>
      <filter id="panic_blur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="35" />
      </filter>
    </defs>
    <rect width="800" height="500" fill="url(#panic_bg)" />
    <circle cx="240" cy="200" r="160" fill="#f43f5e" opacity="0.18" filter="url(#panic_blur)" />
    <circle cx="560" cy="280" r="180" fill="#2dd4bf" opacity="0.18" filter="url(#panic_blur)" />

    <rect x="160" y="80" width="480" height="340" rx="28" fill="#0f172a" fillOpacity="0.88" stroke="#f43f5e" strokeWidth="2" strokeOpacity="0.5" />
    
    <circle cx="400" cy="170" r="46" fill="#f43f5e" opacity="0.15" />
    <circle cx="400" cy="170" r="34" fill="#0f172a" stroke="#f43f5e" strokeWidth="2.5" />
    <path d="M 390 165 C 385 158, 375 160, 375 168 C 375 178, 400 188, 400 188 C 400 188, 425 178, 425 168 C 425 160, 415 158, 410 165 Z" fill="#f43f5e" />

    {/* ECG wave: rapid spiked to rhythmic gentle sinus */}
    <path d="M 200 270 H 260 L 270 230 L 285 310 L 300 240 L 315 285 L 330 270 H 390 Q 420 250 450 270 T 510 270 H 600" fill="none" stroke="url(#ecg_grad)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

    <g transform="translate(100, 120)">
      <rect width="145" height="36" rx="18" fill="#4c0519" stroke="#f43f5e" strokeWidth="1.5" />
      <text x="72" y="23" fill="#ffe4e6" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Sympathetic Surge</text>
    </g>
    <g transform="translate(555, 120)">
      <rect width="145" height="36" rx="18" fill="#042f2e" stroke="#2dd4bf" strokeWidth="1.5" />
      <text x="72" y="23" fill="#ccfbf1" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Heart Pacing Return</text>
    </g>
    <g transform="translate(100, 340)">
      <rect width="145" height="36" rx="18" fill="#0f172a" stroke="#fb923c" strokeWidth="1.5" />
      <text x="72" y="23" fill="#ffedd5" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Safe Reality Anchors</text>
    </g>
    <g transform="translate(555, 340)">
      <rect width="145" height="36" rx="18" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="72" y="23" fill="#e0f2fe" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Slow Diaphragmatic</text>
    </g>
    <text x="400" y="375" fill="#fb7185" fontSize="13" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle" letterSpacing="1.5">
      PANIC & PHYSICAL SYMPTOM PROTOCOLS
    </text>
  </svg>
);

// ── New: Depression & Mood Recovery Illustration ────────────────────────────────
export const DepressionRecoveryIllustration = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="dep_bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1e1b4b" />
        <stop offset="50%" stopColor="#090d16" />
        <stop offset="100%" stopColor="#172554" />
      </linearGradient>
      <linearGradient id="sunrise_glow" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="60%" stopColor="#818cf8" />
        <stop offset="100%" stopColor="#fbbf24" />
      </linearGradient>
      <filter id="dep_blur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="35" />
      </filter>
    </defs>
    <rect width="800" height="500" fill="url(#dep_bg)" />
    <circle cx="200" cy="300" r="160" fill="#4338ca" opacity="0.2" filter="url(#dep_blur)" />
    <circle cx="600" cy="180" r="180" fill="#f59e0b" opacity="0.18" filter="url(#dep_blur)" />

    <rect x="160" y="80" width="480" height="340" rx="28" fill="#0f172a" fillOpacity="0.88" stroke="#6366f1" strokeWidth="2" strokeOpacity="0.5" />
    
    <circle cx="400" cy="180" r="50" fill="url(#sunrise_glow)" opacity="0.2" />
    <circle cx="400" cy="180" r="38" fill="#0f172a" stroke="#818cf8" strokeWidth="2.5" />
    <circle cx="400" cy="180" r="14" fill="#fbbf24" />

    {/* Upward recovery trajectory curve */}
    <path d="M 210 320 C 270 310, 330 300, 390 260 S 490 200, 590 160" fill="none" stroke="url(#sunrise_glow)" strokeWidth="4" strokeLinecap="round" />
    <circle cx="590" cy="160" r="7" fill="#fbbf24" />

    <g transform="translate(100, 120)">
      <rect width="145" height="36" rx="18" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
      <text x="72" y="23" fill="#e0e7ff" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Behavioral Activation</text>
    </g>
    <g transform="translate(555, 120)">
      <rect width="145" height="36" rx="18" fill="#451a03" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="72" y="23" fill="#fef3c7" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Neuroplastic Ascent</text>
    </g>
    <g transform="translate(100, 340)">
      <rect width="145" height="36" rx="18" fill="#0f172a" stroke="#a78bfa" strokeWidth="1.5" />
      <text x="72" y="23" fill="#ede9fe" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Cognitive Reframing</text>
    </g>
    <g transform="translate(555, 340)">
      <rect width="145" height="36" rx="18" fill="#0f172a" stroke="#34d399" strokeWidth="1.5" />
      <text x="72" y="23" fill="#d1fae5" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Safe Micro-Steps</text>
    </g>
    <text x="400" y="375" fill="#a5b4fc" fontSize="13" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle" letterSpacing="1.5">
      DEPRESSION & MOOD RECOVERY
    </text>
  </svg>
);

// ── New: Sleep Health & Insomnia Illustration ──────────────────────────────────
export const SleepHealthIllustration = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sleep_bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#020617" />
        <stop offset="50%" stopColor="#0f172a" />
        <stop offset="100%" stopColor="#064e3b" />
      </linearGradient>
      <linearGradient id="moon_glow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#34d399" />
      </linearGradient>
      <filter id="sleep_blur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="35" />
      </filter>
    </defs>
    <rect width="800" height="500" fill="url(#sleep_bg)" />
    <circle cx="220" cy="180" r="160" fill="#06b6d4" opacity="0.18" filter="url(#sleep_blur)" />
    <circle cx="580" cy="300" r="180" fill="#10b981" opacity="0.2" filter="url(#sleep_blur)" />

    <rect x="160" y="80" width="480" height="340" rx="28" fill="#0f172a" fillOpacity="0.88" stroke="#10b981" strokeWidth="2" strokeOpacity="0.5" />
    
    <circle cx="400" cy="180" r="50" fill="url(#moon_glow)" opacity="0.15" />
    <circle cx="400" cy="180" r="38" fill="#0f172a" stroke="#10b981" strokeWidth="2.5" />
    {/* Crescent Moon */}
    <path d="M 405 165 C 395 168, 390 178, 393 188 C 396 198, 407 203, 417 199 C 412 201, 404 200, 399 194 C 394 188, 395 178, 405 165 Z" fill="#6ee7b7" />

    {/* Delta Sleep Wave Line */}
    <path d="M 210 280 C 270 240, 330 320, 390 280 S 510 240, 590 280" fill="none" stroke="url(#moon_glow)" strokeWidth="3.5" strokeLinecap="round" />

    <g transform="translate(100, 120)">
      <rect width="145" height="36" rx="18" fill="#064e3b" stroke="#34d399" strokeWidth="1.5" />
      <text x="72" y="23" fill="#d1fae5" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Circadian Alignment</text>
    </g>
    <g transform="translate(555, 120)">
      <rect width="145" height="36" rx="18" fill="#082f49" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="72" y="23" fill="#e0f2fe" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Night Mind Quiet</text>
    </g>
    <g transform="translate(100, 340)">
      <rect width="145" height="36" rx="18" fill="#0f172a" stroke="#6ee7b7" strokeWidth="1.5" />
      <text x="72" y="23" fill="#ecfdf5" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Delta Wave Rest</text>
    </g>
    <g transform="translate(555, 340)">
      <rect width="145" height="36" rx="18" fill="#0f172a" stroke="#22d3ee" strokeWidth="1.5" />
      <text x="72" y="23" fill="#cffafe" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Sleep Architecture</text>
    </g>
    <text x="400" y="375" fill="#6ee7b7" fontSize="13" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle" letterSpacing="1.5">
      SLEEP SCIENCE & INSOMNIA RECOVERY
    </text>
  </svg>
);

// ── New: Overthinking & Intrusive Thoughts Illustration ────────────────────────
export const OverthinkingIllustration = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ot_bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1e1b4b" />
        <stop offset="50%" stopColor="#0f172a" />
        <stop offset="100%" stopColor="#311042" />
      </linearGradient>
      <linearGradient id="clarity_grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#d946ef" />
        <stop offset="50%" stopColor="#818cf8" />
        <stop offset="100%" stopColor="#38bdf8" />
      </linearGradient>
      <filter id="ot_blur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="35" />
      </filter>
    </defs>
    <rect width="800" height="500" fill="url(#ot_bg)" />
    <circle cx="220" cy="220" r="160" fill="#d946ef" opacity="0.18" filter="url(#ot_blur)" />
    <circle cx="580" cy="280" r="170" fill="#38bdf8" opacity="0.18" filter="url(#ot_blur)" />

    <rect x="160" y="80" width="480" height="340" rx="28" fill="#0f172a" fillOpacity="0.88" stroke="#d946ef" strokeWidth="2" strokeOpacity="0.5" />
    
    <circle cx="400" cy="180" r="50" fill="url(#clarity_grad)" opacity="0.18" />
    <circle cx="400" cy="180" r="38" fill="#0f172a" stroke="#d946ef" strokeWidth="2.5" />
    
    {/* Unraveling knot into straight beam */}
    <path d="M 210 280 Q 240 240 280 290 T 350 250 T 420 280 L 590 280" fill="none" stroke="url(#clarity_grad)" strokeWidth="3.5" strokeLinecap="round" />

    <g transform="translate(100, 120)">
      <rect width="145" height="36" rx="18" fill="#311042" stroke="#d946ef" strokeWidth="1.5" />
      <text x="72" y="23" fill="#fae8ff" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Cognitive Defusion</text>
    </g>
    <g transform="translate(555, 120)">
      <rect width="145" height="36" rx="18" fill="#082f49" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="72" y="23" fill="#e0f2fe" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Thought Unhooking</text>
    </g>
    <g transform="translate(100, 340)">
      <rect width="145" height="36" rx="18" fill="#0f172a" stroke="#c084fc" strokeWidth="1.5" />
      <text x="72" y="23" fill="#f3e8ff" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Worry Observation</text>
    </g>
    <g transform="translate(555, 340)">
      <rect width="145" height="36" rx="18" fill="#0f172a" stroke="#34d399" strokeWidth="1.5" />
      <text x="72" y="23" fill="#d1fae5" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Mental Clarity</text>
    </g>
    <text x="400" y="375" fill="#f0abfc" fontSize="13" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle" letterSpacing="1.5">
      OVERTHINKING & INTRUSIVE THOUGHTS
    </text>
  </svg>
);

// ── New: Therapy & Clinical Treatment Illustration ─────────────────────────────
export const TherapyIllustration = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="th_bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#064e3b" />
        <stop offset="50%" stopColor="#0f172a" />
        <stop offset="100%" stopColor="#083344" />
      </linearGradient>
      <linearGradient id="th_glow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#06b6d4" />
      </linearGradient>
      <filter id="th_blur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="35" />
      </filter>
    </defs>
    <rect width="800" height="500" fill="url(#th_bg)" />
    <circle cx="220" cy="190" r="160" fill="#10b981" opacity="0.18" filter="url(#th_blur)" />
    <circle cx="580" cy="300" r="170" fill="#06b6d4" opacity="0.18" filter="url(#th_blur)" />

    <rect x="160" y="80" width="480" height="340" rx="28" fill="#0f172a" fillOpacity="0.88" stroke="#10b981" strokeWidth="2" strokeOpacity="0.5" />
    
    <circle cx="400" cy="180" r="50" fill="url(#th_glow)" opacity="0.18" />
    <circle cx="400" cy="180" r="38" fill="#0f172a" stroke="#10b981" strokeWidth="2.5" />
    
    {/* Compassionate dialogue speech waves */}
    <path d="M 385 170 C 385 162, 405 162, 405 170 C 405 178, 385 186, 385 190" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="400" cy="200" r="2.5" fill="#34d399" />

    <path d="M 220 280 C 270 250, 330 310, 400 270 S 520 250, 580 280" fill="none" stroke="url(#th_glow)" strokeWidth="3.5" strokeLinecap="round" />

    <g transform="translate(100, 120)">
      <rect width="145" height="36" rx="18" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
      <text x="72" y="23" fill="#d1fae5" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Therapeutic Alliance</text>
    </g>
    <g transform="translate(555, 120)">
      <rect width="145" height="36" rx="18" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
      <text x="72" y="23" fill="#cffafe" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Evidence-Based CBT</text>
    </g>
    <g transform="translate(100, 340)">
      <rect width="145" height="36" rx="18" fill="#0f172a" stroke="#2dd4bf" strokeWidth="1.5" />
      <text x="72" y="23" fill="#ccfbf1" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Psychology Insights</text>
    </g>
    <g transform="translate(555, 340)">
      <rect width="145" height="36" rx="18" fill="#0f172a" stroke="#86efac" strokeWidth="1.5" />
      <text x="72" y="23" fill="#f0fdf4" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Clinical Guidance</text>
    </g>
    <text x="400" y="375" fill="#34d399" fontSize="13" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle" letterSpacing="1.5">
      THERAPY, COUNSELING & CARE
    </text>
  </svg>
);

// ── New: Emotional Health & Relationships Illustration ─────────────────────────
export const EmotionalHealthIllustration = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="eh_bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4c0519" />
        <stop offset="50%" stopColor="#0f172a" />
        <stop offset="100%" stopColor="#2e1065" />
      </linearGradient>
      <linearGradient id="eh_glow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f43f5e" />
        <stop offset="50%" stopColor="#fb7185" />
        <stop offset="100%" stopColor="#a855f7" />
      </linearGradient>
      <filter id="eh_blur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="35" />
      </filter>
    </defs>
    <rect width="800" height="500" fill="url(#eh_bg)" />
    <circle cx="220" cy="200" r="160" fill="#f43f5e" opacity="0.18" filter="url(#eh_blur)" />
    <circle cx="580" cy="280" r="170" fill="#a855f7" opacity="0.18" filter="url(#eh_blur)" />

    <rect x="160" y="80" width="480" height="340" rx="28" fill="#0f172a" fillOpacity="0.88" stroke="#fb7185" strokeWidth="2" strokeOpacity="0.5" />
    
    <circle cx="400" cy="180" r="50" fill="url(#eh_glow)" opacity="0.18" />
    <circle cx="400" cy="180" r="38" fill="#0f172a" stroke="#fb7185" strokeWidth="2.5" />
    
    {/* Heart balance icon */}
    <path d="M 390 175 C 385 168, 375 170, 375 178 C 375 188, 400 198, 400 198 C 400 198, 425 188, 425 178 C 425 170, 415 168, 410 175 Z" fill="#fb7185" />

    <path d="M 210 280 C 270 250, 330 300, 400 270 S 520 250, 590 280" fill="none" stroke="url(#eh_glow)" strokeWidth="3.5" strokeLinecap="round" />

    <g transform="translate(100, 120)">
      <rect width="145" height="36" rx="18" fill="#4c0519" stroke="#f43f5e" strokeWidth="1.5" />
      <text x="72" y="23" fill="#ffe4e6" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Emotional Resilience</text>
    </g>
    <g transform="translate(555, 120)">
      <rect width="145" height="36" rx="18" fill="#2e1065" stroke="#a855f7" strokeWidth="1.5" />
      <text x="72" y="23" fill="#f3e8ff" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Relational Healing</text>
    </g>
    <g transform="translate(100, 340)">
      <rect width="145" height="36" rx="18" fill="#0f172a" stroke="#fda4af" strokeWidth="1.5" />
      <text x="72" y="23" fill="#fff1f2" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Burnout Recovery</text>
    </g>
    <g transform="translate(555, 340)">
      <rect width="145" height="36" rx="18" fill="#0f172a" stroke="#c084fc" strokeWidth="1.5" />
      <text x="72" y="23" fill="#faf5ff" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Self-Compassion</text>
    </g>
    <text x="400" y="375" fill="#fda4af" fontSize="13" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle" letterSpacing="1.5">
      EMOTIONAL HEALTH & RELATIONSHIPS
    </text>
  </svg>
);

// ── New: Crisis Urgent Questions Illustration ──────────────────────────────────
export const CrisisSupportIllustration = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cr_bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#450a0a" />
        <stop offset="50%" stopColor="#0f172a" />
        <stop offset="100%" stopColor="#1e293b" />
      </linearGradient>
      <linearGradient id="cr_beacon" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="50%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#10b981" />
      </linearGradient>
      <filter id="cr_blur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="35" />
      </filter>
    </defs>
    <rect width="800" height="500" fill="url(#cr_bg)" />
    <circle cx="220" cy="180" r="160" fill="#ef4444" opacity="0.2" filter="url(#cr_blur)" />
    <circle cx="580" cy="300" r="170" fill="#10b981" opacity="0.18" filter="url(#cr_blur)" />

    <rect x="160" y="80" width="480" height="340" rx="28" fill="#0f172a" fillOpacity="0.9" stroke="#ef4444" strokeWidth="2" strokeOpacity="0.6" />
    
    <circle cx="400" cy="180" r="50" fill="url(#cr_beacon)" opacity="0.18" />
    <circle cx="400" cy="180" r="38" fill="#0f172a" stroke="#ef4444" strokeWidth="2.5" />
    
    {/* Safety Shield Icon */}
    <path d="M 400 160 L 415 168 V 185 C 415 195, 400 202, 400 202 C 400 202, 385 195, 385 185 V 168 Z" fill="#ef4444" />

    <path d="M 210 280 H 280 L 295 240 L 315 310 L 335 260 L 350 280 H 420 Q 470 260 520 280 H 590" fill="none" stroke="url(#cr_beacon)" strokeWidth="3.5" strokeLinecap="round" />

    <g transform="translate(100, 120)">
      <rect width="145" height="36" rx="18" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
      <text x="72" y="23" fill="#fee2e2" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">24/7 Lifeline Support</text>
    </g>
    <g transform="translate(555, 120)">
      <rect width="145" height="36" rx="18" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
      <text x="72" y="23" fill="#d1fae5" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Safe Reality Anchors</text>
    </g>
    <g transform="translate(100, 340)">
      <rect width="145" height="36" rx="18" fill="#0f172a" stroke="#fca5a5" strokeWidth="1.5" />
      <text x="72" y="23" fill="#fff1f2" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Immediate Safety</text>
    </g>
    <g transform="translate(555, 340)">
      <rect width="145" height="36" rx="18" fill="#0f172a" stroke="#34d399" strokeWidth="1.5" />
      <text x="72" y="23" fill="#ecfdf5" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Calm Regulation</text>
    </g>
    <text x="400" y="375" fill="#fca5a5" fontSize="13" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle" letterSpacing="1.5">
      CRISIS SUPPORT & IMMEDIATE CARE
    </text>
  </svg>
);









