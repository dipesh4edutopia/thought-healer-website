import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

const lesSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'LES — Learning Enhancement Suite',
      applicationCategory: 'EducationalApplication',
      url: 'https://thoughthealer.org/les',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR', availability: 'https://schema.org/InStock' },
      description: 'Free multi-sensory learning tools for students with Dyslexia, ADHD, Dyscalculia, and Dysgraphia. Evidence-based support for parents and schools.',
      author: { '@type': 'Organization', name: 'ThoughtHealer' },
      audience: { '@type': 'Audience', audienceType: 'Students, Parents, Educators' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is LES?',
          acceptedAnswer: { '@type': 'Answer', text: 'LES (Learning Enhancement Suite) is a free tool from ThoughtHealer providing multi-sensory, evidence-based learning support for children with Dyslexia, ADHD, Dyscalculia, and Dysgraphia.' },
        },
        {
          '@type': 'Question',
          name: 'Is LES free to use?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes, LES is completely free. ThoughtHealer provides this tool at no cost to ensure every neurodivergent student has access to quality learning support.' },
        },
        {
          '@type': 'Question',
          name: 'Who is LES designed for?',
          acceptedAnswer: { '@type': 'Answer', text: 'LES is designed for students with learning differences including Dyslexia, ADHD, Dyscalculia, and Dysgraphia. It is also useful for parents, teachers, and schools looking for inclusive educational tools.' },
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://thoughthealer.org/' },
        { '@type': 'ListItem', position: 2, name: 'LES', item: 'https://thoughthealer.org/les' },
      ],
    },
  ],
};

const LES = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [persona, setPersona] = useState('parents');
  const [accessibilityMode, setAccessibilityMode] = useState('normal'); // normal, dyslexic, highContrast
  const [audioPlaying, setAudioPlaying] = useState(false);
  
  // Theme state synced with global localStorage & themeChange event
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem('th-theme');
      if (saved === 'light') return false;
      if (saved === 'dark') return true;
      return document.documentElement.classList.contains('dark');
    } catch {
      return true;
    }
  });

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleThemeChange = () => {
      const saved = localStorage.getItem('th-theme');
      if (saved === 'light') {
        setIsDark(false);
      } else if (saved === 'dark') {
        setIsDark(true);
      } else {
        setIsDark(document.documentElement.classList.contains('dark'));
      }
    };

    handleThemeChange();
    window.addEventListener('themeChange', handleThemeChange);
    window.addEventListener('storage', handleThemeChange);
    return () => {
      window.removeEventListener('themeChange', handleThemeChange);
      window.removeEventListener('storage', handleThemeChange);
    };
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    const root = document.documentElement;
    if (nextDark) {
      root.classList.add('dark');
      localStorage.setItem('th-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('th-theme', 'light');
    }
    window.dispatchEvent(new Event('themeChange'));
  };

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') setIsMobileOpen(false);
    }
    if (isMobileOpen) {
      document.addEventListener('keydown', onKeyDown);
    }
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isMobileOpen]);

  const learningDifferences = [
    {
      id: 'dyslexia',
      category: 'reading',
      title: 'Dyslexia Support',
      icon: '📖',
      color: 'from-amber-500 to-orange-600',
      badge: 'Reading & Decoding',
      shortDesc: 'Phonological awareness, multi-sensory reading exercises, and daily read-aloud routines.',
      details: [
        'Multi-Sensory Learning (Visual, Auditory, Kinesthetic, Tactile)',
        'Daily Phonics & Sight Words Practice',
        'Text-to-Speech & Audiobook Integration',
        'Dyslexia-friendly Font Customization'
      ]
    },
    {
      id: 'dyscalculia',
      category: 'math',
      title: 'Dyscalculia Solution',
      icon: '🔢',
      color: 'from-blue-500 to-cyan-600',
      badge: 'Numbers & Math Sense',
      shortDesc: 'Concrete-to-Abstract math learning, anxiety reduction strategies, and practical real-life math games.',
      details: [
        'Concrete → Pictorial → Abstract Learning Flow',
        'Visual Math Grids & Interactive Number Lines',
        'Math Anxiety Reduction Exercises',
        'Real-life Budgeting & Time Reading Practice'
      ]
    },
    {
      id: 'dysgraphia',
      category: 'writing',
      title: 'Dysgraphia Assistance',
      icon: '✍️',
      color: 'from-emerald-500 to-teal-600',
      badge: 'Writing & Motor Control',
      shortDesc: 'Fine motor skill strengthening, tripod pencil grip guidance, and voice-to-text dictation tools.',
      details: [
        'Fine Motor Skill & Finger Strength Workouts',
        'Pencil Grip Correction & Guided Tracing',
        'Voice-to-Text Dictation Assistants',
        'Content-first Writing Worksheets'
      ]
    },
    {
      id: 'dyspraxia',
      category: 'motor',
      title: 'Dyspraxia (DCD) Care',
      icon: '🏃‍♂️',
      color: 'from-purple-500 to-indigo-600',
      badge: 'Motor Coordination',
      shortDesc: 'Motor planning exercises, spatial awareness routines, and daily living activity guides.',
      details: [
        'Gross & Fine Motor Skill Training',
        'Occupational Therapy Routine Planners',
        'Spatial Awareness & Balance Games',
        'Self-care & Dressing Accommodations'
      ]
    },
    {
      id: 'attention',
      category: 'focus',
      title: 'Attention & Focus (ADHD)',
      icon: '🎯',
      color: 'from-rose-500 to-pink-600',
      badge: 'Executive Function',
      shortDesc: 'Pomodoro study timers, structured routines, physical activity breaks, and positive reinforcement.',
      details: [
        'Custom Pomodoro Work/Break Intervals',
        'Distraction-free Study Space Checklist',
        'Visual Step-by-step Task Checklists',
        'Positive Reinforcement & Reward Trackers'
      ]
    },
    {
      id: 'auditory',
      category: 'auditory',
      title: 'Auditory Processing (APD)',
      icon: '🎧',
      color: 'from-teal-500 to-cyan-700',
      badge: 'Listening & Speech',
      shortDesc: 'Speech discrimination games, visual instruction supplements, and classroom seating guides.',
      details: [
        'Sound Discrimination & Blending Games',
        'Visual Cue Cards alongside Verbal Tasks',
        'Audiobook Retelling Activities',
        'Classroom Accommodations Request Drafts'
      ]
    }
  ];

  const filteredDifferences = activeTab === 'all'
    ? learningDifferences
    : learningDifferences.filter(item => item.category === activeTab);

  const testimonials = [
    {
      name: "Dr. Ananya Sharma",
      role: "Child Psychologist & Special Educator",
      quote: "LES provides a remarkably structured approach for parents dealing with Dyslexia and Dyscalculia. The multi-sensory techniques are grounded in validated clinical practices.",
      avatar: "👩‍⚕️"
    },
    {
      name: "Rajesh & Priya Verma",
      role: "Parents of a 9-year-old with ADHD",
      quote: "The visual task checklists and Pomodoro focus routines completely transformed our homework time. Our son's anxiety dropped significantly within 3 weeks.",
      avatar: "👨‍👩‍👦"
    },
    {
      name: "Meera Nair",
      role: "Senior Special Needs Coordinator",
      quote: "Generating formal classroom accommodation letters through LES saved us weeks of manual paperwork and helped us support 30+ neurodivergent students seamlessly.",
      avatar: "👩‍🏫"
    }
  ];

  const handleAudioDemo = () => {
    if (audioPlaying) {
      setAudioPlaying(false);
      window.speechSynthesis?.cancel();
    } else {
      setAudioPlaying(true);
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance("Welcome to LES. Learning Enhancement Solution empowers every child with custom learning strategies tailored for Dyslexia, Dyscalculia, and ADHD. Completely free for all parents and educators.");
        utterance.rate = 0.9;
        utterance.onend = () => setAudioPlaying(false);
        utterance.onerror = () => setAudioPlaying(false);
        window.speechSynthesis.speak(utterance);
      } else {
        setTimeout(() => setAudioPlaying(false), 3000);
      }
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      accessibilityMode === 'highContrast' 
        ? 'bg-black text-yellow-300 font-mono'
        : 'bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans'
    } ${accessibilityMode === 'dyslexic' ? 'font-serif tracking-wide leading-relaxed' : ''}`}>
      <SEOHead
        title="LES — Free Learning Tools for Dyslexia, ADHD & Neurodivergent Students"
        description="Free multi-sensory learning tools for students with Dyslexia, ADHD, Dyscalculia and Dysgraphia. Evidence-based support for parents, teachers and schools. 100% free by ThoughtHealer."
        canonical="https://thoughthealer.org/les"
        schema={lesSchema}
      />
      
      {/* Accessibility Quick Ribbon */}
      <div className="bg-teal-900 dark:bg-teal-950 border-b border-teal-700/50 py-2 px-4 text-xs text-teal-100 dark:text-teal-200">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-teal-300">♿ Accessibility Suite Preview:</span>
            <span>Customize layout mode for optimal readability</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setAccessibilityMode('normal')}
              className={`px-2.5 py-1 rounded text-xs transition ${accessibilityMode === 'normal' ? 'bg-teal-600 text-white font-bold' : 'bg-teal-800/80 hover:bg-teal-700 text-teal-200'}`}
            >
              Standard
            </button>
            <button
              onClick={() => setAccessibilityMode('dyslexic')}
              className={`px-2.5 py-1 rounded text-xs transition ${accessibilityMode === 'dyslexic' ? 'bg-teal-600 text-white font-bold' : 'bg-teal-800/80 hover:bg-teal-700 text-teal-200'}`}
            >
              📖 Dyslexic Friendly Font
            </button>
            <button
              onClick={() => setAccessibilityMode('highContrast')}
              className={`px-2.5 py-1 rounded text-xs transition ${accessibilityMode === 'highContrast' ? 'bg-yellow-400 text-black font-bold' : 'bg-teal-800/80 hover:bg-teal-700 text-teal-200'}`}
            >
              ⚡ High Contrast
            </button>
          </div>
        </div>
      </div>

      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-500/20 text-xl font-bold text-white">
                🎓
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 dark:from-teal-400 dark:via-emerald-300 dark:to-cyan-400 bg-clip-text text-transparent">
                  LES
                </span>
                <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-900/80 text-teal-800 dark:text-teal-300 border border-teal-300 dark:border-teal-700/50">
                  100% Free Open Platform
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition">Features</a>
              <a href="#solutions" className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition">Learning Solutions</a>
              <a href="#accessibility" className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition">Accessibility Suite</a>
              <a href="#testimonials" className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition">Expert Endorsements</a>
            </nav>

            {/* Theme Toggle & Free Access CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-yellow-400 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-base hover:scale-105 transition"
                title={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
              >
                {isDark ? '☀️' : '🌙'}
              </button>

              <a
                href="https://play.google.com/store/apps/details?id=com.syneptlabs.lesapp"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl border-2 border-teal-500 text-teal-600 dark:text-teal-400 font-semibold text-sm hover:bg-teal-50 dark:hover:bg-teal-900/30 transition transform hover:scale-105"
              >
                <span>📲</span>
                <span>Download App</span>
              </a>

              <a
                href="#solutions"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white text-sm font-semibold shadow-lg shadow-teal-500/25 transition transform hover:-translate-y-0.5"
              >
                Explore Free App →
              </a>
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center space-x-2">
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-yellow-400 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-base"
              >
                {isDark ? '☀️' : '🌙'}
              </button>
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-3">
            <a href="#features" onClick={() => setIsMobileOpen(false)} className="block py-2 text-slate-700 dark:text-slate-300 hover:text-teal-600">Features</a>
            <a href="#solutions" onClick={() => setIsMobileOpen(false)} className="block py-2 text-slate-700 dark:text-slate-300 hover:text-teal-600">Learning Solutions</a>
            <a href="#accessibility" onClick={() => setIsMobileOpen(false)} className="block py-2 text-slate-700 dark:text-slate-300 hover:text-teal-600">Accessibility</a>
            <a href="#testimonials" onClick={() => setIsMobileOpen(false)} className="block py-2 text-slate-700 dark:text-slate-300 hover:text-teal-600">Expert Endorsements</a>
            <div className="pt-2 space-y-2">
              <a
                href="https://play.google.com/store/apps/details?id=com.syneptlabs.lesapp"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileOpen(false)}
                className="w-full block py-2.5 text-center text-teal-600 dark:text-teal-400 border-2 border-teal-500 rounded-xl font-semibold hover:bg-teal-50 dark:hover:bg-teal-900/30 transition"
              >
                📲 Download App
              </a>
              <a href="#solutions" onClick={() => setIsMobileOpen(false)} className="w-full block py-2.5 text-center text-white bg-gradient-to-r from-teal-500 to-emerald-600 rounded-xl font-semibold">
                Explore Free App →
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-16 sm:pb-28 overflow-hidden bg-gradient-to-b from-slate-100 via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-100 dark:bg-teal-950/80 border border-teal-300 dark:border-teal-700/60 text-teal-800 dark:text-teal-300 text-xs sm:text-sm font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>100% Free Special Educational Support</span>
              </div>
              
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                Empowering Every <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 dark:from-teal-400 dark:via-emerald-300 dark:to-cyan-400 bg-clip-text text-transparent">
                  Neurodivergent Learner
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal">
                Structured, evidence-based learning strategies for children with <strong>Dyslexia, Dyscalculia, Dysgraphia, Dyspraxia, and ADHD</strong>. 
                <span className="block mt-1 font-semibold text-teal-700 dark:text-teal-400">Completely free for all parents, special educators, and schools — no login or subscription required.</span>
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href="#solutions"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white font-bold text-base shadow-xl shadow-teal-500/25 transition transform hover:-translate-y-0.5 text-center"
                >
                  Browse Free Learning Modules →
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.syneptlabs.lesapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl border-2 border-teal-500 text-teal-600 dark:text-teal-400 font-bold text-base hover:bg-teal-50 dark:hover:bg-teal-900/20 transition transform hover:-translate-y-0.5 text-center flex items-center justify-center space-x-2"
                >
                  <span>📲</span>
                  <span>Download App</span>
                </a>
                <button
                  onClick={handleAudioDemo}
                  className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-teal-500 font-semibold text-base transition flex items-center justify-center space-x-2 shadow-sm"
                >
                  <span>{audioPlaying ? '🔊 Stop Audio Sample' : '🎧 Listen to Audio Reader Demo'}</span>
                </button>
              </div>

              {/* Quick Metrics */}
              <div className="pt-6 border-t border-slate-300 dark:border-slate-800/80 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-teal-600 dark:text-teal-400">10+</div>
                  <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Learning Differences</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">100% Free</div>
                  <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">No Login Required</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-cyan-600 dark:text-cyan-400">Bi-Lingual</div>
                  <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">English & Hindi</div>
                </div>
              </div>
            </div>

            {/* Right Interactive Mockup / Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md bg-white dark:bg-gradient-to-b dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-2xl shadow-xl dark:shadow-2xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center text-xl font-bold">
                      🧩
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-base">LES Learning Companion</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Open Access Dashboard</p>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold border border-emerald-300 dark:border-emerald-800">
                    Free Access
                  </span>
                </div>

                {/* Sample Activity Card */}
                <div className="bg-slate-50 dark:bg-slate-900/90 rounded-xl p-4 border border-slate-200 dark:border-slate-700/60 space-y-3">
                  <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>Active Topic: <strong>Dyslexia Reading</strong></span>
                    <span className="text-teal-600 dark:text-teal-400 font-medium">Daily Goal: 15 min</span>
                  </div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                    "Multi-Sensory Phonics Practice: Sound Matching"
                  </div>
                  <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                    <div className="flex items-center space-x-2">
                      <span className="text-teal-600 dark:text-teal-400">✓</span>
                      <span>Visual: Flashcards with high contrast text</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-emerald-600 dark:text-emerald-400">✓</span>
                      <span>Kinesthetic: Air-tracing / Finger-tracing letter sounds</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-cyan-600 dark:text-cyan-400">✓</span>
                      <span>Auditory: Text-to-speech audio pronunciation</span>
                    </div>
                  </div>
                </div>

                {/* Persona Switcher Preview */}
                <div className="space-y-2">
                  <label className="text-xs text-slate-500 dark:text-slate-400 font-medium">Select Persona Guidance:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setPersona('parents')}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold transition ${persona === 'parents' ? 'bg-teal-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                    >
                      👨‍👩‍👧 For Parents
                    </button>
                    <button
                      onClick={() => setPersona('educators')}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold transition ${persona === 'educators' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                    >
                      👩‍🏫 For Educators
                    </button>
                  </div>
                </div>

                {/* Persona Info Box */}
                <div className="p-3 rounded-lg bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/40 text-xs text-teal-900 dark:text-teal-200">
                  {persona === 'parents' ? (
                    <p>💡 <strong>Parent Mode:</strong> Daily home exercise guides, emotional support, and math/reading anxiety reduction tools.</p>
                  ) : (
                    <p>🎓 <strong>Educator Mode:</strong> IEP goal integration, classroom seating accommodation templates, and progress logs.</p>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Learning Differences Grid */}
      <section id="solutions" className="py-16 sm:py-24 bg-white dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
            <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-teal-600 dark:text-teal-400">
              Specialized Modules
            </h2>
            <p className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Comprehensive Support for Neurodivergent Needs
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              Each learning difference requires targeted interventions. LES breaks down complex psychological guidelines into easy daily actions.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {['all', 'reading', 'math', 'writing', 'motor', 'focus', 'auditory'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold capitalize transition ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-lg'
                    : 'bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab === 'all' ? 'All Modules' : tab}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDifferences.map(item => (
              <div
                key={item.id}
                className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500/50 rounded-2xl p-6 transition duration-300 transform hover:-translate-y-1 flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center text-2xl text-white shadow-md`}>
                      {item.icon}
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-teal-700 dark:text-teal-300 border border-slate-300 dark:border-slate-700">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4">{item.shortDesc}</p>

                  <ul className="space-y-2 mb-6">
                    {item.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start text-xs text-slate-700 dark:text-slate-300">
                        <span className="text-teal-600 dark:text-teal-400 mr-2 font-bold">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#accessibility"
                  className="w-full py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-teal-600 hover:text-white text-slate-800 dark:text-slate-200 text-xs font-semibold text-center transition block"
                >
                  View {item.title} Strategies →
                </a>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Accessibility Suite Showcase */}
      <section id="accessibility" className="py-16 sm:py-24 bg-slate-100 dark:bg-slate-900 border-t border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/60 text-xs font-semibold">
                <span>Inclusive Technology Suite</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                Built from Ground Up for Maximum Accessibility
              </h2>
              <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Children with learning differences often face digital barriers. LES provides integrated tools that adapt text, audio, and visual contrast to each learner's comfortable perception zone.
              </p>

              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-start space-x-4 shadow-sm">
                  <div className="text-2xl">🔤</div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">OpenDyslexic Font Engine</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Specially weighted font bottoms that prevent letter rotation and confusion for readers with dyslexia.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-start space-x-4 shadow-sm">
                  <div className="text-2xl">🗣️</div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">Voice-to-Text & Text-to-Speech</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Allows children to listen to exercise instructions or speak out their essay ideas effortlessly.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-start space-x-4 shadow-sm">
                  <div className="text-2xl">📄</div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">School Accommodations Generator</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Instantly creates printable recommendation letters for teachers requesting extra test time or calculator permissions.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white dark:bg-gradient-to-br dark:from-slate-950 dark:to-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 sm:p-8 shadow-xl">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center justify-between">
                <span>Interactive Tool Simulator</span>
                <span className="text-xs text-teal-600 dark:text-teal-400 font-mono">LES Free Suite</span>
              </h3>

              <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                  Sample Classroom Passages
                </div>

                <div className={`p-4 rounded-xl transition ${
                  accessibilityMode === 'highContrast'
                    ? 'bg-black text-yellow-300 font-mono border-2 border-yellow-400'
                    : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-sans border border-slate-200 dark:border-slate-700'
                } ${accessibilityMode === 'dyslexic' ? 'font-serif tracking-widest leading-loose text-emerald-800 dark:text-emerald-200' : ''}`}>
                  <p className="text-xs sm:text-sm">
                    "Dyslexia does not define a child's intelligence. With multi-sensory techniques, audiobooks, and structured phonics, every child can excel."
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <button
                    onClick={() => setAccessibilityMode(accessibilityMode === 'dyslexic' ? 'normal' : 'dyslexic')}
                    className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold"
                  >
                    Toggle Dyslexia Font
                  </button>
                  <button
                    onClick={() => setAccessibilityMode(accessibilityMode === 'highContrast' ? 'normal' : 'highContrast')}
                    className="px-3 py-1.5 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-bold"
                  >
                    Toggle High Contrast
                  </button>
                  <button
                    onClick={handleAudioDemo}
                    className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold"
                  >
                    {audioPlaying ? '⏹️ Pause Read-Aloud' : '▶️ Read Passage Aloud'}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 sm:py-24 bg-white dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-teal-600 dark:text-teal-400">
              Trusted Endorsements
            </h2>
            <p className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              What Experts and Parents Say
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((item, idx) => (
              <div key={idx} className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 flex flex-col justify-between shadow-sm">
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
                  "{item.quote}"
                </p>
                <div className="flex items-center space-x-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <div className="text-3xl">{item.avatar}</div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.name}</h4>
                    <p className="text-xs text-teal-600 dark:text-teal-400">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA Banner */}
      <footer className="py-12 bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 text-center space-y-4 transition-colors">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Ready to enhance your child's learning journey?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Join thousands of parents and educators turning learning differences into superpowers with LES. 100% Free forever.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#solutions"
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-bold text-sm shadow-xl shadow-teal-500/25"
            >
              Explore Free Modules Today
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.syneptlabs.lesapp"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-xl border-2 border-teal-500 text-teal-600 dark:text-teal-400 font-bold text-sm hover:bg-teal-50 dark:hover:bg-teal-900/20 transition flex items-center space-x-2"
            >
              <span>📲</span>
              <span>Download App on Google Play</span>
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LES;
