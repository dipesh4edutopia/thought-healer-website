import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ThoughtProB2B = () => {
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
      icon: "🏢",
      title: "Enterprise Mental Wellness",
      description: "Comprehensive mental health assessments and personalized interventions designed specifically for your team and organizational needs."
    },
    {
      icon: "📈",
      title: "Real-time Analytics",
      description: "Monitor organizational wellness metrics with real-time dashboards and actionable insights to improve team mental health."
    },
    {
      icon: "🎓",
      title: "Expert-Led Programs",
      description: "Access professional programs and resources curated by mental health experts, tailored for corporate environments."
    },
    {
      icon: "🔒",
      title: "Enterprise-Grade Security",
      description: "All data is encrypted and protected under strict data privacy standards. Your team's information remains completely confidential."
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-dark-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-dark-900/90 backdrop-blur-xl border-b border-dark-200/50 dark:border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/assets/buisness.png"
                alt="ThoughtPro B2B Logo"
                className="w-8 h-8 rounded-lg object-contain"
                style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
              />
              <span className="text-xl font-bold text-dark-900 dark:text-white">ThoughtPro B2B</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <button onClick={() => navigate('/')} className="text-dark-700 dark:text-dark-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors font-semibold">Home</button>
              <a 
                href="#features" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }} 
                className="text-dark-700 dark:text-dark-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              >
                Features
              </a>
              <a 
                href="#benefits" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }} 
                className="text-dark-700 dark:text-dark-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              >
                Benefits
              </a>
              <a 
                href="#contact" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }} 
                className="text-dark-700 dark:text-dark-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              >
                Contact
              </a>
            </nav>
            <div className="flex items-center gap-3">
              <Link
                to="/thoughtpro-signin"
                className="hidden md:inline-flex text-white px-4 py-2 rounded-lg transition-all duration-300 items-center justify-center hover:scale-105 bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-primary-400 dark:to-secondary-400 shadow-lg"
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
                  className="block w-full text-left py-2.5 text-dark-900 dark:text-white font-semibold text-lg hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
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
                  className="block w-full text-left py-2.5 text-dark-900 dark:text-white font-medium text-base hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
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
                  className="block w-full text-left py-2.5 text-dark-900 dark:text-white font-medium text-base hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                >
                  Benefits
                </button>
                <button
                  onClick={() => {
                    setIsMobileOpen(false);
                    setTimeout(() => {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                  }}
                  className="block w-full text-left py-2.5 text-dark-900 dark:text-white font-medium text-base hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                >
                  Contact
                </button>
                <Link
                  to="/thoughtpro-signin"
                  onClick={() => setIsMobileOpen(false)}
                  className="block py-3 px-4 mt-2 text-center rounded-lg text-white font-semibold bg-gradient-to-r from-primary-500 to-secondary-500 hover:shadow-lg transition-all"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </>
        )}
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-dark-50 to-primary-50/30 dark:from-dark-900 dark:to-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-primary-500/10 rounded-full mb-6">
                <span className="text-primary-600 dark:text-primary-400 font-semibold">Enterprise Solution</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-dark-900 dark:text-white leading-tight">
                Welcome to <span className="gradient-text">ThoughtPro B2B</span>
              </h1>
              <p className="text-xl mb-4 text-dark-600 dark:text-dark-300">
                Professional Mental Wellness for Your Enterprise
              </p>
              <p className="text-lg mb-8 text-dark-600 dark:text-dark-300">
                Comprehensive mental health assessments and personalized interventions for your team
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://wa.me/917020037124?text=Hi,%20I%20would%20like%20to%20know%20more%20about%20ThoughtPro%20B2B%20for%20my%20organization"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 inline-flex items-center justify-center hover:scale-105 hover:shadow-2xl bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-primary-400 dark:to-secondary-400 shadow-lg"
                >
                  Get Started
                </a>
              </div>
            </div>
            <div className="relative">
              <img
                src="/assets/buisness.png"
                alt="ThoughtPro B2B - Enterprise Mental Wellness"
                className="w-full max-w-md mx-auto rounded-2xl object-contain transition-all duration-300 hover:scale-105 animate-float"
                style={{
                  border: isDark ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(94, 114, 228, 0.3)',
                  boxShadow: isDark
                    ? '0 20px 60px rgba(0,0,0,0.5), 0 8px 32px rgba(94, 114, 228, 0.2)'
                    : '0 20px 60px rgba(0,0,0,0.15), 0 8px 32px rgba(94, 114, 228, 0.3)'
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
              Enterprise Features
            </h2>
            <p className="text-xl text-dark-600 dark:text-dark-300 max-w-2xl mx-auto">
              Everything your organization needs for comprehensive mental wellness programs
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 rounded-xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 hover:shadow-xl transition-all duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-dark-900 dark:text-white">{feature.title}</h3>
                <p className="text-dark-600 dark:text-dark-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-dark-50 dark:bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4 text-dark-900 dark:text-white">
              Why Choose ThoughtPro B2B?
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-3 text-dark-900 dark:text-white">Data-Driven Insights</h3>
              <p className="text-dark-600 dark:text-dark-300">Track and measure organizational mental wellness with comprehensive analytics</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-3 text-dark-900 dark:text-white">Team Focused</h3>
              <p className="text-dark-600 dark:text-dark-300">Programs designed specifically for corporate teams and working professionals</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold mb-3 text-dark-900 dark:text-white">Secure & Compliant</h3>
              <p className="text-dark-600 dark:text-dark-300">Enterprise-grade security with full data privacy compliance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white dark:bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4 text-dark-900 dark:text-white">
              What Our Clients Say
            </h2>
            <p className="text-xl text-dark-600 dark:text-dark-300">
              Trusted by leading organizations worldwide
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-dark-800 p-6 rounded-xl shadow-lg border border-dark-200 dark:border-dark-700">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold">A</div>
                <div className="ml-4">
                  <h4 className="font-semibold text-dark-900 dark:text-white">Amit Verma</h4>
                  <p className="text-sm text-dark-600 dark:text-dark-300">HR Director, Tech Corp</p>
                </div>
              </div>
              <p className="text-dark-600 dark:text-dark-300">"ThoughtPro B2B transformed our employee wellness program. Team engagement improved by 40% in just 3 months."</p>
            </div>
            <div className="bg-white dark:bg-dark-800 p-6 rounded-xl shadow-lg border border-dark-200 dark:border-dark-700">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-secondary-500 flex items-center justify-center text-white font-bold">S</div>
                <div className="ml-4">
                  <h4 className="font-semibold text-dark-900 dark:text-white">Sneha Kapoor</h4>
                  <p className="text-sm text-dark-600 dark:text-dark-300">CEO, Growth Startup</p>
                </div>
              </div>
              <p className="text-dark-600 dark:text-dark-300">"The real-time analytics helped us identify stress patterns early. Productivity increased while burnout decreased significantly."</p>
            </div>
            <div className="bg-white dark:bg-dark-800 p-6 rounded-xl shadow-lg border border-dark-200 dark:border-dark-700">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold">R</div>
                <div className="ml-4">
                  <h4 className="font-semibold text-dark-900 dark:text-white">Rahul Singh</h4>
                  <p className="text-sm text-dark-600 dark:text-dark-300">CTO, Enterprise Solutions</p>
                </div>
              </div>
              <p className="text-dark-600 dark:text-dark-300">"Enterprise-grade security with exceptional support. Our 500+ employee team feels more supported than ever before."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-20 bg-dark-50 dark:bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-semibold mb-8 text-dark-900 dark:text-white">Trusted by Leading Organizations</h3>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            <div className="text-4xl">🏢</div>
            <div className="text-4xl">🏭</div>
            <div className="text-4xl">🏛️</div>
            <div className="text-4xl">🏗️</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-primary-500 to-secondary-500 dark:from-primary-600 dark:to-secondary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-6">
            Ready to Transform Your Workplace?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Contact us to learn how ThoughtPro B2B can support your organization's mental wellness
          </p>
          <div className="flex justify-center">
            <a
              href="https://wa.me/917020037124?text=Hi,%20I%20would%20like%20to%20know%20more%20about%20ThoughtPro%20B2B%20for%20my%20organization"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-primary-500 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 inline-flex items-center justify-center hover:scale-105 shadow-xl"
            >
              Contact Sales
            </a>
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
                  src="/assets/buisness.png"
                  alt="ThoughtPro B2B"
                  className="w-8 h-8 rounded-lg"
                />
                <span className="text-xl font-bold">ThoughtPro B2B</span>
              </div>
              <p className="text-dark-300 text-sm">
                Enterprise mental wellness platform powered by SyneptLabs cutting-edge technology.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-dark-300 text-sm">
                <li><a href="#features" className="hover:text-primary-500 transition-colors">Features</a></li>
                <li><a href="#benefits" className="hover:text-primary-500 transition-colors">Benefits</a></li>
                <li><Link to="/thoughtpro" className="hover:text-primary-500 transition-colors">ThoughtPro</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-dark-300 text-sm">
                <li><Link to="/" className="hover:text-primary-500 transition-colors">About</Link></li>
                <li><a href="#" className="hover:text-primary-500 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-primary-500 transition-colors">Terms</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-dark-300 text-sm">
                <li><a href="mailto:info@thoughhealer.org" className="hover:text-primary-500 transition-colors">Email Us</a></li>
                <li><a href="#" className="hover:text-primary-500 transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-dark-700 pt-8 text-center text-dark-400 text-sm">
            <p>&copy; 2025 ThoughtPro B2B by SyneptLabs. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ThoughtProB2B;
