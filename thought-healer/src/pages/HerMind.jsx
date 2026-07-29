import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

const herMindSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'HerMind',
      applicationCategory: 'HealthApplication',
      operatingSystem: 'Android',
      url: 'https://thoughthealer.org/hermind',
      description: 'HerMind is a mental health app tailored for women, addressing PCOS, PCOD, postpartum depression, body image, and holistic wellness.',
      author: { '@type': 'Organization', name: 'ThoughtHealer' },
      audience: { '@type': 'Audience', audienceType: 'Women' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://thoughthealer.org/' },
        { '@type': 'ListItem', position: 2, name: 'HerMind', item: 'https://thoughthealer.org/hermind' },
      ],
    },
  ],
};

const HerMind = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem('th-theme');
      if (saved === 'dark') return true;
      if (saved === 'light') return false;
      return true;
    } catch {
      return true;
    }
  });
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('th-theme', isDark ? 'dark' : 'light');
    } catch {}
  }, [isDark]);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') setIsMobileOpen(false);
    }
    if (isMobileOpen) {
      document.addEventListener('keydown', onKeyDown);
    }
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isMobileOpen]);

  const features = [
    {
      icon: "🌸",
      title: "PCOS/PCOD Support",
      description: "Specialized monitoring and interventions for managing PCOS, PCOD, and related hormonal health concerns with personalized guidance."
    },
    {
      icon: "💝",
      title: "Postpartum Care",
      description: "Comprehensive support for postpartum depression and maternal mental health with expert-curated resources and interventions."
    },
    {
      icon: "✨",
      title: "Body Image & Self-Love",
      description: "Navigate unrealistic beauty standards and body image concerns with empowering interventions focused on self-acceptance."
    },
    {
      icon: "🧘‍♀️",
      title: "Women's Wellness",
      description: "Holistic mental health support addressing unique challenges faced by women, with personalized interventions at every level."
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-dark-950">
      <SEOHead
        title="HerMind — Women's Mental Health & Wellness App | ThoughtHealer"
        description="HerMind supports women's mental health including PCOS, PCOD, postpartum depression and body image concerns. Personalized interventions tailored for women by licensed professionals."
        canonical="https://thoughthealer.org/hermind"
        schema={herMindSchema}
      />
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-dark-900/90 backdrop-blur-xl border-b border-dark-200/50 dark:border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/assets/hermind.png"
                alt="HerMind Logo"
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">HerMind</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <button onClick={() => navigate('/')} className="text-dark-700 dark:text-dark-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors font-semibold">Home</button>
              <a 
                href="#features" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }} 
                className="text-dark-700 dark:text-dark-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
              >
                Features
              </a>
              <a 
                href="#benefits" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }} 
                className="text-dark-700 dark:text-dark-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
              >
                Benefits
              </a>
              <a 
                href="#support" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('support')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }} 
                className="text-dark-700 dark:text-dark-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
              >
                Support
              </a>
            </nav>
            <div className="flex items-center gap-3">
              <Link
                to="/signup"
                className="hidden md:inline-flex text-white px-4 py-2 rounded-lg transition-all duration-300 items-center justify-center hover:scale-105 bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg"
              >
                Get Started
              </Link>
              <button
                onClick={() => setIsDark(!isDark)}
                className="theme-toggle"
                aria-label="Toggle dark mode"
              >
                <span className="sr-only">Toggle dark mode</span>
              </button>
              <button
                aria-label="Open menu"
                className="md:hidden p-2 rounded-lg transition-all duration-300 hover:scale-105 bg-dark-100 dark:bg-dark-800"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/30 dark:bg-black/60"
              onClick={() => setIsMobileOpen(false)}
            />
            <div className="md:hidden bg-white dark:bg-dark-800 backdrop-blur-xl border-t border-dark-200/50 dark:border-white/10 shadow-lg relative z-50">
              <div className="px-4 pb-4 pt-2 space-y-3">
                <Link
                  to="/"
                  onClick={() => {
                    setIsMobileOpen(false);
                    window.scrollTo(0, 0);
                  }}
                  className="block w-full text-left py-2.5 text-dark-900 dark:text-white font-semibold text-lg hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
                >
                  Home
                </Link>
                <button
                  onClick={() => {
                    setIsMobileOpen(false);
                    setTimeout(() => {
                      document.getElementById('features')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                  }}
                  className="block w-full text-left py-2.5 text-dark-900 dark:text-white font-medium text-base hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
                >
                  Features
                </button>
                <button
                  onClick={() => {
                    setIsMobileOpen(false);
                    setTimeout(() => {
                      document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                  }}
                  className="block w-full text-left py-2.5 text-dark-900 dark:text-white font-medium text-base hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
                >
                  Benefits
                </button>
                <button
                  onClick={() => {
                    setIsMobileOpen(false);
                    setTimeout(() => {
                      document.getElementById('support')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                  }}
                  className="block w-full text-left py-2.5 text-dark-900 dark:text-white font-medium text-base hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
                >
                  Support
                </button>
                <Link
                  to="/signup"
                  onClick={() => setIsMobileOpen(false)}
                  className="block py-3 px-4 mt-2 text-center rounded-lg text-white font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg transition-all"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </>
        )}
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 dark:from-dark-900 dark:via-purple-900/20 dark:to-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-purple-500/10 rounded-full mb-6">
                <span className="text-purple-600 dark:text-purple-400 font-semibold">Women's Mental Wellness</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-dark-900 dark:text-white leading-tight">
                Welcome to <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">HerMind</span>
              </h1>
              <p className="text-xl mb-4 text-dark-600 dark:text-dark-300">
                Your Safe Space for Mental Wellness
              </p>
              <p className="text-lg mb-8 text-dark-600 dark:text-dark-300">
                Monitor pressing female issues like PCOS/PCOD, postpartum depression, body image concerns, and get personalized interventions tailored for you
              </p>
              <div className="flex justify-center sm:justify-start">
                <button
                  disabled
                  className="text-white px-10 py-4 rounded-lg text-lg font-semibold inline-flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg opacity-75 cursor-not-allowed"
                >
                  Coming Soon
                </button>
              </div>
            </div>
            <div className="relative">
              <img
                src="/assets/hermind.png"
                alt="HerMind - Women's Mental Wellness"
                className="w-full max-w-md mx-auto rounded-2xl object-contain transition-all duration-300 hover:scale-105 animate-float"
                style={{
                  border: isDark ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(168, 85, 247, 0.3)',
                  boxShadow: isDark
                    ? '0 20px 60px rgba(0,0,0,0.5), 0 8px 32px rgba(168, 85, 247, 0.2)'
                    : '0 20px 60px rgba(0,0,0,0.15), 0 8px 32px rgba(168, 85, 247, 0.3)'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4 text-dark-900 dark:text-white">
              Specialized Care for Women
            </h2>
            <p className="text-xl text-dark-600 dark:text-dark-300 max-w-2xl mx-auto">
              Comprehensive support addressing the unique mental health challenges women face
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 border border-purple-200 dark:border-purple-700 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-dark-900 dark:text-white">{feature.title}</h3>
                <p className="text-dark-600 dark:text-dark-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interventions Section */}
      <section id="benefits" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-dark-900 dark:to-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4 text-dark-900 dark:text-white">
              Three Levels of Support
            </h2>
            <p className="text-xl text-dark-600 dark:text-dark-300 max-w-2xl mx-auto">
              Get the right level of help when you need it
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-dark-800 p-8 rounded-xl shadow-lg border-t-4 border-purple-400">
              <div className="text-5xl mb-4">💡</div>
              <h3 className="text-2xl font-semibold mb-3 text-dark-900 dark:text-white">Primary</h3>
              <p className="text-dark-600 dark:text-dark-300 mb-4">Useful suggestions to tackle everyday issues and maintain mental wellness</p>
              <ul className="space-y-2 text-dark-600 dark:text-dark-300">
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">✓</span>
                  <span>Daily tips & exercises</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">✓</span>
                  <span>Self-care routines</span>
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-dark-800 p-8 rounded-xl shadow-lg border-t-4 border-pink-400">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-semibold mb-3 text-dark-900 dark:text-white">Secondary</h3>
              <p className="text-dark-600 dark:text-dark-300 mb-4">Professional suggestions curated by mental health experts</p>
              <ul className="space-y-2 text-dark-600 dark:text-dark-300">
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">✓</span>
                  <span>Expert-curated content</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">✓</span>
                  <span>Specialized programs</span>
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-dark-800 p-8 rounded-xl shadow-lg border-t-4 border-purple-600">
              <div className="text-5xl mb-4">🌟</div>
              <h3 className="text-2xl font-semibold mb-3 text-dark-900 dark:text-white">Tertiary</h3>
              <p className="text-dark-600 dark:text-dark-300 mb-4">Advanced guidance with video content and one-on-one professional support</p>
              <ul className="space-y-2 text-dark-600 dark:text-dark-300">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">✓</span>
                  <span>Video-based guidance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">✓</span>
                  <span>Professional consultations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Support Areas Section */}
      <section id="support" className="py-20 bg-white dark:bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4 text-dark-900 dark:text-white">
              We Understand Your Journey
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🩺</div>
              <h3 className="text-xl font-semibold mb-3 text-dark-900 dark:text-white">Hormonal Health</h3>
              <p className="text-dark-600 dark:text-dark-300">Support for PCOS, PCOD, and hormonal imbalances affecting mental wellness</p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">👶</div>
              <h3 className="text-xl font-semibold mb-3 text-dark-900 dark:text-white">Maternal Mental Health</h3>
              <p className="text-dark-600 dark:text-dark-300">Postpartum depression, pregnancy anxiety, and new mother support</p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">💪</div>
              <h3 className="text-xl font-semibold mb-3 text-dark-900 dark:text-white">Body Confidence</h3>
              <p className="text-dark-600 dark:text-dark-300">Navigate beauty standards and build genuine self-acceptance</p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">💼</div>
              <h3 className="text-xl font-semibold mb-3 text-dark-900 dark:text-white">Work-Life Balance</h3>
              <p className="text-dark-600 dark:text-dark-300">Managing professional pressures and personal life demands</p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">❤️</div>
              <h3 className="text-xl font-semibold mb-3 text-dark-900 dark:text-white">Relationships</h3>
              <p className="text-dark-600 dark:text-dark-300">Healthy boundaries, communication, and emotional wellness</p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🌈</div>
              <h3 className="text-xl font-semibold mb-3 text-dark-900 dark:text-white">Self-Care</h3>
              <p className="text-dark-600 dark:text-dark-300">Prioritizing yourself without guilt or judgment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white dark:bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4 text-dark-900 dark:text-white">
              Stories from Our Community
            </h2>
            <p className="text-xl text-dark-600 dark:text-dark-300">
              Real experiences from women on their wellness journey
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 p-6 rounded-xl shadow-lg border border-purple-200 dark:border-purple-700">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">M</div>
                <div className="ml-4">
                  <h4 className="font-semibold text-dark-900 dark:text-white">Meera Patel</h4>
                  <p className="text-sm text-dark-600 dark:text-dark-300">New Mother, 28</p>
                </div>
              </div>
              <p className="text-dark-600 dark:text-dark-300">"HerMind helped me navigate postpartum depression. The support and resources were exactly what I needed during my darkest days."</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 p-6 rounded-xl shadow-lg border border-purple-200 dark:border-purple-700">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold">D</div>
                <div className="ml-4">
                  <h4 className="font-semibold text-dark-900 dark:text-white">Divya Sharma</h4>
                  <p className="text-sm text-dark-600 dark:text-dark-300">PCOS Warrior, 32</p>
                </div>
              </div>
              <p className="text-dark-600 dark:text-dark-300">"Finally found a platform that understands PCOS struggles. The personalized interventions made managing my symptoms so much easier."</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 p-6 rounded-xl shadow-lg border border-purple-200 dark:border-purple-700">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">A</div>
                <div className="ml-4">
                  <h4 className="font-semibold text-dark-900 dark:text-white">Ananya Reddy</h4>
                  <p className="text-sm text-dark-600 dark:text-dark-300">Working Professional, 35</p>
                </div>
              </div>
              <p className="text-dark-600 dark:text-dark-300">"HerMind's body positivity interventions changed my life. I finally feel comfortable in my own skin after years of struggle."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-dark-900 dark:to-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-semibold mb-8 text-dark-900 dark:text-white">Supporting Women Across All Life Stages</h3>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-70">
            <div className="text-4xl">👩‍💼</div>
            <div className="text-4xl">👩‍🎓</div>
            <div className="text-4xl">🤰</div>
            <div className="text-4xl">👩‍👧</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-6">
            Start Your Wellness Journey Today
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of women taking control of their mental health with HerMind
          </p>
          <div className="flex justify-center">
            <button
              disabled
              className="bg-white text-purple-600 px-10 py-4 rounded-lg text-lg font-semibold inline-flex items-center justify-center shadow-xl opacity-75 cursor-not-allowed"
            >
              Coming Soon
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img
                  src="/assets/hermind.png"
                  alt="HerMind Logo"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">HerMind</span>
              </div>
              <p className="text-dark-300 text-sm">
                Empowering women's mental wellness with personalized care and support.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-dark-300 text-sm">
                <li><a href="#features" className="hover:text-purple-400 transition-colors">PCOS/PCOD Support</a></li>
                <li><a href="#features" className="hover:text-purple-400 transition-colors">Postpartum Care</a></li>
                <li><a href="#features" className="hover:text-purple-400 transition-colors">Body Image</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-dark-300 text-sm">
                <li><a href="#support" className="hover:text-purple-400 transition-colors">Support Areas</a></li>
                <li><a href="#benefits" className="hover:text-purple-400 transition-colors">Interventions</a></li>
                <li><Link to="/" className="hover:text-purple-400 transition-colors">About</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-dark-300 text-sm">
                <li><a href="mailto:connect@thoughthealer.org" className="hover:text-purple-400 transition-colors">Email Support</a></li>
                <li><Link to="/privacy-policy" className="hover:text-purple-400 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms-and-conditions" className="hover:text-purple-400 transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-dark-700 pt-8 text-center text-dark-400 text-sm">
            <p>&copy; {new Date().getFullYear()} HerMind by ThoughtHealer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HerMind;
