import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MiniMinds = () => {
  const navigate = useNavigate();
  const [isAnnual, setIsAnnual] = useState(false);
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
      icon: "🧠",
      title: "Monitor 50+ Mental Health Issues",
      description: "Track your child's most pressing mental health issues like loneliness, exam stress, anxiety, bullying, and 50+ others."
    },
    {
      icon: "🎯",
      title: "Personalized Interventions",
      description: "Get personalized help tailored to your child's specific needs and mental health challenges."
    },
    {
      icon: "💡",
      title: "Primary Interventions",
      description: "Useful, age-appropriate suggestions to tackle everyday issues and build emotional resilience."
    },
    {
      icon: "👨‍⚕️",
      title: "Secondary Interventions",
      description: "Pro suggestions curated by child psychologists and mental health professionals."
    },
    {
      icon: "🎥",
      title: "Tertiary Interventions",
      description: "Advanced suggestions with video-based guidance, interactive content, and one-on-one calls with mental health professionals."
    },
    {
      icon: "👨‍👩‍👧‍👦",
      title: "Parent-Child Support",
      description: "Tools and resources for parents to support their children's mental wellness journey effectively."
    }
  ];

  const mentalHealthIssues = [
    { name: "Loneliness", color: "bg-purple-500" },
    { name: "Exam Stress", color: "bg-blue-500" },
    { name: "Anxiety", color: "bg-red-500" },
    { name: "Bullying", color: "bg-orange-500" },
    { name: "Depression", color: "bg-indigo-500" },
    { name: "Social Pressure", color: "bg-pink-500" },
    { name: "Self-Esteem", color: "bg-green-500" },
    { name: "Sleep Issues", color: "bg-yellow-500" },
    { name: "Peer Pressure", color: "bg-teal-500" },
    { name: "Academic Stress", color: "bg-cyan-500" },
    { name: "Family Conflict", color: "bg-rose-500" },
    { name: "Body Image", color: "bg-violet-500" }
  ];

  const interventionLevels = [
    {
      level: "Primary",
      icon: "✔️",
      title: "Everyday Solutions",
      description: "Useful suggestions to tackle everyday issues",
      features: [
        "Age-appropriate tips and strategies",
        "Daily wellness activities",
        "Mood tracking and journaling",
        "Quick relaxation techniques"
      ],
      color: "from-green-400 to-green-600"
    },
    {
      level: "Secondary",
      icon: "✔️",
      title: "Professional Guidance",
      description: "Pro suggestions curated by mental health professionals",
      features: [
        "Expert-curated interventions",
        "Personalized action plans",
        "Cognitive behavioral techniques",
        "Progress monitoring tools"
      ],
      color: "from-blue-400 to-blue-600"
    },
    {
      level: "Tertiary",
      icon: "✔️",
      title: "Advanced Support",
      description: "Advanced suggestions, video-based guidance & one-on-one calls",
      features: [
        "Video-based guidance sessions",
        "One-on-one calls with professionals",
        "Crisis intervention support",
        "Family therapy resources"
      ],
      color: "from-purple-400 to-purple-600"
    }
  ];

  const testimonials = [
    {
      name: "Meera Patel",
      role: "Parent of 12-year-old",
      image: "https://placehold.co/60x60",
      text: "MiniMinds helped my daughter overcome exam anxiety. The interventions are easy to follow and really effective!"
    },
    {
      name: "Amit Sharma",
      role: "Parent of 10-year-old",
      image: "https://placehold.co/60x60",
      text: "The professional guidance feature is a lifesaver. We can address issues before they become serious."
    },
    {
      name: "Kavita Reddy",
      role: "Parent of 14-year-old",
      image: "https://placehold.co/60x60",
      text: "My son was struggling with loneliness. MiniMinds provided the tools we needed to help him connect and thrive."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-blue-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-dark-900/90 backdrop-blur-xl border-b border-dark-200/50 dark:border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🧠</span>
              </div>
              <span className="text-xl font-bold text-dark-900 dark:text-white">MiniMinds</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-8">
              <button onClick={() => navigate('/')} className="text-dark-600 dark:text-dark-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-bold">Home</button>
              <a href="#features" className="text-dark-600 dark:text-dark-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium">Features</a>
              <a href="#interventions" className="text-dark-600 dark:text-dark-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium">Interventions</a>
              <a href="#issues" className="text-dark-600 dark:text-dark-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium">Issues We Cover</a>
              <a href="#pricing" className="text-dark-600 dark:text-dark-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium">Pricing</a>
              <a href="#testimonials" className="text-dark-600 dark:text-dark-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium">Testimonials</a>
              <Link 
                to="/thoughtpro-signin"
                onClick={() => sessionStorage.setItem('productContext', 'miniminds')}
                className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all"
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
            </nav>
            <button 
              onClick={() => setIsMobileOpen(!isMobileOpen)} 
              className="md:hidden p-2 rounded-lg hover:bg-dark-200/50 dark:hover:bg-dark-700/50"
              aria-label="Toggle menu"
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

        {/* Mobile Menu */}
        {isMobileOpen && (
          <div className="md:hidden border-t border-dark-200/50 dark:border-white/10 bg-white dark:bg-dark-800 shadow-lg">
            <nav className="px-4 py-4 space-y-3">
              <button 
                onClick={() => { 
                  setIsMobileOpen(false); 
                  navigate('/'); 
                }} 
                className="block w-full text-left py-2.5 text-dark-900 dark:text-white hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-bold text-lg"
              >
                Home
              </button>
              <a href="#features" onClick={() => setIsMobileOpen(false)} className="block py-2.5 text-dark-900 dark:text-white hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium">Features</a>
              <a href="#interventions" onClick={() => setIsMobileOpen(false)} className="block py-2.5 text-dark-900 dark:text-white hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium">Interventions</a>
              <a href="#issues" onClick={() => setIsMobileOpen(false)} className="block py-2.5 text-dark-900 dark:text-white hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium">Issues We Cover</a>
              <a href="#pricing" onClick={() => setIsMobileOpen(false)} className="block py-2.5 text-dark-900 dark:text-white hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium">Pricing</a>
              <a href="#testimonials" onClick={() => setIsMobileOpen(false)} className="block py-2.5 text-dark-900 dark:text-white hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium">Testimonials</a>
              <Link 
                to="/thoughtpro-signin"
                className="block px-6 py-3 mt-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full font-semibold text-center hover:shadow-xl transition-all"
                onClick={() => {
                  setIsMobileOpen(false);
                  sessionStorage.setItem('productContext', 'miniminds');
                }}
              >
                Get Started
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-yellow-500/10 to-blue-500/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <div className="inline-block px-4 py-2 bg-orange-500/10 rounded-full mb-6">
                <span className="text-orange-600 dark:text-orange-400 font-semibold">Mental Health App for Children</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-900 dark:text-white mb-6 leading-tight">
                Support Your Child's 
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-yellow-500 to-blue-500">
                  Mental Wellness
                </span>
              </h1>
              <p className="text-lg md:text-xl text-dark-600 dark:text-dark-300 mb-8 leading-relaxed">
                Monitor, understand, and support your child's mental health with personalized interventions curated by professionals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/thoughtpro-signin"
                  onClick={() => sessionStorage.setItem('productContext', 'miniminds')}
                  className="px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all text-center"
                >
                  Start Free Trial
                </Link>
                <a 
                  href="#features"
                  className="px-8 py-4 bg-white dark:bg-dark-800 text-dark-900 dark:text-white rounded-full font-semibold text-lg hover:shadow-xl transition-all border border-dark-200 dark:border-dark-700 text-center"
                >
                  Learn More
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 flex items-center justify-center">
                <img 
                  src="/assets/miniminds_img.png" 
                  alt="MiniMinds - Think Better, Live Better" 
                  className="rounded-3xl shadow-2xl w-full max-w-md"
                />
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-yellow-500/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mental Health Issues Section */}
      <section id="issues" className="py-16 md:py-24 bg-white dark:bg-dark-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-900 dark:text-white mb-4">
              Monitor 50+ Mental Health Issues
            </h2>
            <p className="text-lg text-dark-600 dark:text-dark-300 max-w-2xl mx-auto">
              Track your child's most pressing mental health concerns with our comprehensive monitoring system
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {mentalHealthIssues.map((issue, index) => (
              <div 
                key={index}
                className={`px-4 py-2 ${issue.color} text-white rounded-full font-medium shadow-lg hover:scale-105 transition-transform`}
              >
                {issue.name}
              </div>
            ))}
            <div className="px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full font-medium shadow-lg">
              + 38 More Issues
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-900 dark:text-white mb-4">
              Comprehensive Child Mental Health Support
            </h2>
            <p className="text-lg text-dark-600 dark:text-dark-300 max-w-2xl mx-auto">
              Everything you need to support your child's mental wellness journey
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group p-8 bg-white dark:bg-dark-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-dark-200/50 dark:border-white/10 hover:scale-105"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-dark-600 dark:text-dark-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intervention Levels Section */}
      <section id="interventions" className="py-16 md:py-24 bg-white dark:bg-dark-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-900 dark:text-white mb-4">
              Three Levels of Care
            </h2>
            <p className="text-lg text-dark-600 dark:text-dark-300 max-w-2xl mx-auto">
              Progressive interventions designed to meet your child's needs at every stage
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {interventionLevels.map((intervention, index) => (
              <div 
                key={index}
                className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${intervention.color} opacity-90`}></div>
                <div className="relative p-8 text-white">
                  <div className="text-4xl mb-4">{intervention.icon}</div>
                  <div className="text-sm font-semibold mb-2 opacity-90">{intervention.level} Interventions</div>
                  <h3 className="text-2xl font-bold mb-3">{intervention.title}</h3>
                  <p className="mb-6 opacity-90">{intervention.description}</p>
                  <ul className="space-y-3">
                    {intervention.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start">
                        <span className="mr-2">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-900 dark:text-white mb-4">
              How MiniMinds Works
            </h2>
            <p className="text-lg text-dark-600 dark:text-dark-300 max-w-2xl mx-auto">
              Simple steps to support your child's mental wellness
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Monitor", desc: "Track mental health indicators", icon: "📊" },
              { step: "2", title: "Identify", desc: "Spot issues early", icon: "🔍" },
              { step: "3", title: "Intervene", desc: "Get personalized help", icon: "💡" },
              { step: "4", title: "Progress", desc: "Watch them thrive", icon: "🌟" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg">
                  {item.icon}
                </div>
                <div className="text-orange-600 dark:text-orange-400 font-bold text-xl mb-2">Step {item.step}</div>
                <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-dark-600 dark:text-dark-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 md:py-24 bg-white dark:bg-dark-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-900 dark:text-white mb-4">
              What Parents Say
            </h2>
            <p className="text-lg text-dark-600 dark:text-dark-300">
              Hear from parents who've transformed their children's mental health
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="p-8 bg-gradient-to-br from-white to-orange-50 dark:from-dark-800 dark:to-orange-900/20 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-dark-200/50 dark:border-white/10"
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-bold text-dark-900 dark:text-white">{testimonial.name}</div>
                    <div className="text-sm text-dark-600 dark:text-dark-300">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-dark-600 dark:text-dark-300 italic">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-24 bg-gradient-to-br from-orange-50/30 via-yellow-50/30 to-blue-50/30 dark:from-dark-800 dark:to-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-900 dark:text-white mb-4">
              Choose Your Child's Wellness Plan
            </h2>
            <p className="text-lg md:text-xl text-dark-600 dark:text-dark-300 max-w-2xl mx-auto mb-8">
              Start free and upgrade when ready for more comprehensive mental health support
            </p>
            <div className="flex items-center justify-center space-x-4">
              <span className={`${!isAnnual ? 'font-semibold text-dark-900 dark:text-white' : 'text-dark-600 dark:text-dark-400'}`}>Monthly</span>
              <button 
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative w-12 h-6 rounded-full transition-colors ${isAnnual ? 'bg-gradient-to-r from-orange-500 to-yellow-500' : 'bg-dark-300 dark:bg-dark-700'}`}
              >
                <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${isAnnual ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
              </button>
              <span className={`${isAnnual ? 'font-semibold text-dark-900 dark:text-white' : 'text-dark-600 dark:text-dark-400'}`}>Annual</span>
              <span className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">Save 67%</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white/80 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-dark-200/50 dark:border-white/10 hover:shadow-2xl transition-all">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4 text-dark-900 dark:text-white">Free</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-dark-900 dark:text-white">₹0</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span className="text-dark-700 dark:text-dark-300">Basic child mental health monitoring</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span className="text-dark-700 dark:text-dark-300">10+ mental health scans</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span className="text-dark-700 dark:text-dark-300">Basic tracking and insights</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span className="text-dark-700 dark:text-dark-300">Limited interventions</span>
                </li>
              </ul>
              <Link
                to="/miniminds-plans"
                className="block w-full py-3 rounded-lg font-semibold transition-all hover:scale-105 text-center border-2 border-orange-500 text-orange-600 hover:bg-orange-50 dark:hover:bg-dark-700"
              >
                Get Started Free
              </Link>
            </div>

            {/* Premium Plan */}
            <div className="bg-white/80 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border-2 border-orange-500 relative hover:shadow-2xl transition-all">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                  Most Popular
                </span>
              </div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4 text-dark-900 dark:text-white">Premium</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-dark-900 dark:text-white">₹{isAnnual ? 999 : 299}</span>
                  <span className="text-dark-600 dark:text-dark-300">{isAnnual ? '/year' : '/month'}</span>
                </div>
                {isAnnual && (
                  <p className="text-sm text-dark-500 dark:text-dark-400">
                    ₹{Math.round(999 / 12)}/month billed annually
                  </p>
                )}
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span className="text-dark-700 dark:text-dark-300">All Free features</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span className="text-dark-700 dark:text-dark-300">50+ child mental health scans</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span className="text-dark-700 dark:text-dark-300">Primary & Secondary interventions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span className="text-dark-700 dark:text-dark-300">Video tertiary content</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span className="text-dark-700 dark:text-dark-300">Detailed analytics & reports</span>
                </li>
              </ul>
              <Link
                to="/miniminds-plans"
                className="block w-full py-3 rounded-lg font-semibold transition-all hover:scale-105 text-center bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg"
              >
                Start Premium
              </Link>
            </div>

            {/* Ultra Plan */}
            <div className="bg-white/80 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-dark-200/50 dark:border-white/10 hover:shadow-2xl transition-all">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4 text-dark-900 dark:text-white">Ultra</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-dark-900 dark:text-white">₹{isAnnual ? 2599 : 599}</span>
                  <span className="text-dark-600 dark:text-dark-300">{isAnnual ? '/year' : '/month'}</span>
                </div>
                {isAnnual && (
                  <p className="text-sm text-dark-500 dark:text-dark-400">
                    ₹{Math.round(2599 / 12)}/month billed annually
                  </p>
                )}
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span className="text-dark-700 dark:text-dark-300">All Premium features</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span className="text-dark-700 dark:text-dark-300">Unlimited mental health scans</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span className="text-dark-700 dark:text-dark-300">All intervention levels</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span className="text-dark-700 dark:text-dark-300">Priority support</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span className="text-dark-700 dark:text-dark-300">1-on-1 sessions with child psychologists</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span className="text-dark-700 dark:text-dark-300">₹500-800 per session</span>
                </li>
              </ul>
              <Link
                to="/miniminds-plans"
                className="block w-full py-3 rounded-lg font-semibold transition-all hover:scale-105 text-center border-2 border-orange-500 text-orange-600 hover:bg-orange-50 dark:hover:bg-dark-700"
              >
                Go Ultra
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-yellow-500 to-blue-500 p-12 md:p-16 text-center shadow-2xl">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Start Supporting Your Child Today
              </h2>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of parents helping their children build better mental health
              </p>
              <Link 
                to="/thoughtpro-signin"
                onClick={() => sessionStorage.setItem('productContext', 'miniminds')}
                className="inline-block px-8 py-4 bg-white text-orange-600 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">🧠</span>
                </div>
                <span className="text-xl font-bold">MiniMinds</span>
              </div>
              <p className="text-dark-300 text-sm">
                Supporting children's mental wellness through personalized care and professional guidance.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2 text-dark-300 text-sm">
                <li><a href="#features" className="hover:text-orange-400 transition-colors">Features</a></li>
                <li><a href="#interventions" className="hover:text-orange-400 transition-colors">Interventions</a></li>
                <li><a href="#issues" className="hover:text-orange-400 transition-colors">Issues</a></li>
                <li><Link to="/thoughtpro-plans" className="hover:text-orange-400 transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-dark-300 text-sm">
                <li><Link to="/" className="hover:text-orange-400 transition-colors">About Us</Link></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Connect</h3>
              <ul className="space-y-2 text-dark-300 text-sm">
                <li><a href="#" className="hover:text-orange-400 transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-dark-700 pt-8 text-center text-dark-400 text-sm">
            <p>&copy; 2025 MiniMinds by SyneptLabs. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MiniMinds;
