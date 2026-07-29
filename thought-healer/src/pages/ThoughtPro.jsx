import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

const thoughtProSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'ThoughtPro',
      applicationCategory: 'HealthApplication',
      operatingSystem: 'Android',
      url: 'https://thoughthealer.org/thoughtpro',
      downloadUrl: 'https://play.google.com/store/apps/details?id=com.thoughtpro',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR', availability: 'https://schema.org/InStock' },
      description: 'ThoughtPro monitors 12 vital mental health parameters including stress and productivity. Get expert interventions from licensed psychologists.',
      author: { '@type': 'Organization', name: 'ThoughtHealer' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is ThoughtPro?',
          acceptedAnswer: { '@type': 'Answer', text: 'ThoughtPro is a mental health monitoring app that tracks 12 vital parameters including stress and productivity, offering primary, secondary, and tertiary interventions by licensed professionals.' },
        },
        {
          '@type': 'Question',
          name: 'Is ThoughtPro free to use?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes, ThoughtPro has a free plan available on Google Play Store. Premium plans with advanced features and one-on-one counseling are also available.' },
        },
        {
          '@type': 'Question',
          name: 'How does ThoughtPro help with stress monitoring?',
          acceptedAnswer: { '@type': 'Answer', text: 'ThoughtPro monitors stress, productivity, and 10 other mental wellness parameters, providing personalized interventions curated by licensed mental health professionals.' },
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://thoughthealer.org/' },
        { '@type': 'ListItem', position: 2, name: 'ThoughtPro', item: 'https://thoughthealer.org/thoughtpro' },
      ],
    },
  ],
};

const ThoughtPro = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('Premium');
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
  const [pricingPlans, setPricingPlans] = useState([
    {
      name: "Free",
      price: { monthly: 0, annual: 0 },
      features: [
        "Self-monitor stress, productivity & 10 other vital parameters",
        "Basic tracking and insights",
        "Limited interventions"
      ],
      cta: "Get Started Free",
      popular: false
    }
  ]);
  const [loading, setLoading] = useState(true);

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
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://thoughtprob2c.thoughthealer.org/api/subscriptions/plans');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success && result.data && result.data.data) {
          const apiPlans = result.data.data;
          const transformedPlans = transformApiPlans(apiPlans);
          setPricingPlans(prev => [prev[0], ...transformedPlans]); // Keep Free plan, add API plans
        }
      } catch (err) {
        console.error('Error fetching plans:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const transformApiPlans = (apiPlans) => {
    const planTypes = {};
    
    apiPlans.forEach(plan => {
      const type = plan.plan_type.toLowerCase();
      if (!planTypes[type]) {
        planTypes[type] = { monthly: null, yearly: null };
      }
      
      const isYearly = plan.validity_days >= 365;
      if (isYearly) {
        planTypes[type].yearly = plan;
      } else {
        planTypes[type].monthly = plan;
      }
    });
    
    return Object.keys(planTypes).map(type => {
      const isPremium = type === 'premium';
      const monthly = planTypes[type].monthly;
      const yearly = planTypes[type].yearly;
      
      return {
        name: type.charAt(0).toUpperCase() + type.slice(1),
        price: {
          monthly: monthly ? Math.round(monthly.price_inr) : 0,
          annual: yearly ? Math.round(yearly.price_inr) : 0
        },
        originalPrice: {
          monthly: monthly ? Math.round(monthly.price_inr * 2.5) : 0,
          annual: yearly ? Math.round(yearly.price_inr * 2.5) : 0
        },
        features: isPremium
          ? [
              "All Free features",
              "10+ Advanced Scans",
              "Primary & Secondary Interventions",
              "Video Tertiary Content",
              "Detailed analytics"
            ]
          : [
              "All Premium features",
              "100+ Advanced Scans",
              "Priority support",
              "1-on-1 sessions with professionals",
              "₹500-800 per session"
            ],
        cta: isPremium ? "Start Premium" : "Go Ultra",
        popular: isPremium
      };
    });
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

  const features = [
    {
      icon: "📊",
      title: "Self-Monitor 16 Vital Parameters",
      description: "Track stress, productivity, mood, sleep quality, and 12 other essential mental health indicators with precision."
    },
    {
      icon: "🎯",
      title: "Personalized Interventions",
      description: "Get tailored recommendations and actionable insights based on your unique mental health profile and patterns."
    },
    {
      icon: "💡",
      title: "Primary Interventions",
      description: "Receive useful, evidence-based suggestions to tackle everyday mental health challenges and improve wellbeing."
    },
    {
      icon: "👨‍⚕️",
      title: "Professional Guidance",
      description: "Access pro suggestions curated by licensed mental health professionals for deeper support."
    },
    {
      icon: "🤝",
      title: "One-on-One Mentoring",
      description: "Connect with qualified mental health mentors for personalized support and guidance."
    },
    {
      icon: "🎮",
      title: "Gamification & Rewards",
      description: "Earn points, unlock achievements, and level up your mental wellness journey with engaging challenges and milestones."
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Software Engineer",
      image: "https://placehold.co/60x60",
      text: "ThoughtHealer Pro helped me identify stress patterns I never noticed. The interventions are practical and really work!"
    },
    {
      name: "Rajesh Kumar",
      role: "Marketing Manager",
      image: "https://placehold.co/60x60",
      text: "The professional guidance feature is amazing. It's like having a therapist in my pocket."
    },
    {
      name: "Anita Patel",
      role: "Student",
      image: "https://placehold.co/60x60",
      text: "The productivity tracking helped me optimize my study schedule. My grades improved significantly!"
    }
  ];

  return (
    <div className="min-h-screen bg-dark-100 dark:bg-dark-900">
      <SEOHead
        title="ThoughtPro — Monitor Stress & Mental Health App | ThoughtHealer"
        description="ThoughtPro monitors 12 vital mental health parameters including stress and productivity. Get expert interventions from licensed psychologists. Download free on Android."
        canonical="https://thoughthealer.org/thoughtpro"
        schema={thoughtProSchema}
      />
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-dark-900/90 backdrop-blur-xl border-b border-dark-200/50 dark:border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/assets/thoughtpro_logo.png"
                alt="ThoughtPro Logo"
                className="w-8 h-8 rounded-lg object-contain"
                style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
              />
              <span className="text-xl font-bold text-dark-900 dark:text-white">ThoughtPro</span>
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
                href="#clients" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('clients')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }} 
                className="text-dark-700 dark:text-dark-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              >
                Clients
              </a>
              <a 
                href="#pricing" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }} 
                className="text-dark-700 dark:text-dark-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              >
                Pricing
              </a>
              <a 
                href="#testimonials" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }} 
                className="text-dark-700 dark:text-dark-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              >
                Reviews
              </a>
            </nav>
            <div className="flex items-center gap-3">
              <Link
                to="/thoughtpro-signin"
                className="hidden md:inline-flex text-white px-4 py-2 rounded-lg transition-all duration-300 items-center justify-center hover:scale-105 bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-primary-400 dark:to-secondary-400 shadow-lg"
              >
                Login
              </Link>
              <a
                href="https://play.google.com/store/apps/details?id=com.thoughtpro"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex text-dark-900 dark:text-white px-4 py-2 rounded-lg border border-dark-300 dark:border-dark-600 transition-all duration-300 items-center justify-center hover:scale-105 hover:border-primary-500"
              >
                Download App
              </a>
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
                onClick={() => setIsMobileOpen(v => !v)}
              >
                <div className="w-5 h-0.5 bg-dark-900 dark:bg-white mb-1"></div>
                <div className="w-5 h-0.5 bg-dark-900 dark:bg-white mb-1"></div>
                <div className="w-5 h-0.5 bg-dark-900 dark:bg-white"></div>
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
                      document.getElementById('clients')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                  }}
                  className="block w-full text-left py-2.5 text-dark-900 dark:text-white font-medium text-base hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                >
                  Clients
                </button>
                <button
                  onClick={() => {
                    setIsMobileOpen(false);
                    setTimeout(() => {
                      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                  }}
                  className="block w-full text-left py-2.5 text-dark-900 dark:text-white font-medium text-base hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                >
                  Pricing
                </button>
                <button
                  onClick={() => {
                    setIsMobileOpen(false);
                    setTimeout(() => {
                      document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                  }}
                  className="block w-full text-left py-2.5 text-dark-900 dark:text-white font-medium text-base hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                >
                  Reviews
                </button>
                <Link
                  to="/thoughtpro-signin"
                  onClick={() => setIsMobileOpen(false)}
                  className="block py-3 px-4 mt-2 text-center rounded-lg text-white font-semibold bg-gradient-to-r from-primary-500 to-secondary-500 hover:shadow-lg transition-all"
                >
                  Login
                </Link>
                <a
                  href="https://play.google.com/store/apps/details?id=com.thoughtpro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-2.5 text-dark-900 dark:text-white font-medium text-base hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                >
                  Download App
                </a>
              </div>
            </div>
          </>
        )}
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-dark-50 to-primary-50/30 dark:from-dark-900 dark:to-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-display font-bold mb-6 text-dark-900 dark:text-white">
                Healing the world, one thought at a time with 
                <span className="gradient-text"> ThoughtPro</span>
              </h1>
              <p className="text-xl mb-8 text-dark-600 dark:text-dark-300">
                Monitor stress, productivity, and 10+ other vital mental health parameters. 
                Get evidence-based interventions from licensed mental health professionals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://play.google.com/store/apps/details?id=com.thoughtpro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 inline-flex items-center justify-center hover:scale-105 hover:shadow-2xl bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-primary-400 dark:to-secondary-400 shadow-lg"
                >
                  Download Free
                </a>
                <a 
                  href="#features" 
                  className="border-2 border-primary-500 dark:border-primary-400 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 inline-flex items-center justify-center hover:scale-105 text-primary-500 dark:text-primary-400 bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm"
                >
                  Read More
                </a>
              </div>
            </div>
            <div className="relative">
              <img
                src="/assets/thoughtpro_logo.png"
                alt="ThoughtPro App Logo"
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
              Comprehensive Mental Health Support
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-dark-600 dark:text-dark-300">
              From basic self-monitoring to professional guidance, ThoughtPro provides 
              evidence-based digital mental health solutions for comprehensive wellness support.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/80 dark:bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-dark-200/50 dark:border-white/10 shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-dark-900 dark:text-white">{feature.title}</h3>
                <p className="text-dark-600 dark:text-dark-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intervention Levels */}
      <section className="py-20 bg-gradient-to-br from-primary-50/30 to-secondary-50/30 dark:from-dark-900 dark:to-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4 text-dark-900 dark:text-white">
              Three Levels of Support
            </h2>
            <p className="text-xl text-dark-600 dark:text-dark-300">
              Progressive intervention system designed to meet you where you are
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Primary */}
            <div className="bg-white/80 dark:bg-dark-800/50 backdrop-blur-sm rounded-xl p-8 border border-secondary-500/50 dark:border-secondary-400/50 shadow-xl">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 bg-gradient-to-br from-secondary-500 to-primary-500 dark:from-secondary-400 dark:to-primary-400 shadow-lg">
                <span className="font-bold text-white">1°</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-dark-900 dark:text-white">Primary Interventions</h3>
              <p className="mb-6 text-dark-600 dark:text-dark-300">
                Useful suggestions to tackle everyday issues. Quick, actionable tips 
                for immediate relief and daily mental health maintenance.
              </p>
              <ul className="space-y-2 text-sm text-dark-600 dark:text-dark-300">
                <li>✓ Daily wellness tips</li>
                <li>✓ Stress management techniques</li>
                <li>✓ Productivity boosters</li>
              </ul>
            </div>

            {/* Secondary */}
            <div className="bg-white/80 dark:bg-dark-800/50 backdrop-blur-sm rounded-xl p-8 border-2 border-primary-500 dark:border-primary-400 shadow-2xl">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 bg-gradient-to-br from-primary-500 to-yellow-500 dark:from-primary-400 dark:to-yellow-400 shadow-lg">
                <span className="font-bold text-white">2°</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-dark-900 dark:text-white">Secondary Interventions</h3>
              <p className="mb-6 text-dark-600 dark:text-dark-300">
                Pro suggestions curated by mental health professionals. 
                Evidence-based strategies for deeper mental health support.
              </p>
              <ul className="space-y-2 text-sm text-dark-600 dark:text-dark-300">
                <li>✓ Professional-grade techniques</li>
                <li>✓ Cognitive behavioral strategies</li>
                <li>✓ Advanced coping mechanisms</li>
              </ul>
            </div>

            {/* Tertiary */}
            <div className="bg-white/80 dark:bg-dark-800/50 backdrop-blur-sm rounded-xl p-8 border border-yellow-500 shadow-xl">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 bg-gradient-to-br from-yellow-500 to-yellow-600 shadow-lg">
                <span className="font-bold text-white">3°</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-dark-900 dark:text-white">Tertiary Interventions</h3>
              <p className="mb-6 text-dark-600 dark:text-dark-300">
                Advanced suggestions with video-based guidance and one-on-one 
                calls with qualified mental health mentors.
              </p>
              <ul className="space-y-2 text-sm text-dark-600 dark:text-dark-300">
                <li>✓ Video guidance sessions</li>
                <li>✓ Personal mentor calls</li>
                <li>✓ Customized treatment plans</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white dark:bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4 text-dark-900 dark:text-white">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-dark-600 dark:text-dark-300">
              See how ThoughtPro is transforming mental health journeys
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/80 dark:bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-dark-200/50 dark:border-white/10 shadow-xl">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-dark-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-sm text-dark-600 dark:text-dark-300">{testimonial.role}</p>
                  </div>
                </div>
                <p className="italic text-dark-700 dark:text-dark-300">"{testimonial.text}"</p>
                <div className="mt-4 text-yellow-400">★★★★★</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section id="clients" className="py-20 bg-dark-50 dark:bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4 text-dark-900 dark:text-white">Our Clients</h2>
            <p className="text-xl text-dark-600 dark:text-dark-300">Partners who trust ThoughtPro</p>
          </div>
          <div className="flex items-center justify-center gap-12 flex-wrap">
            <img src="/assets/nokasa.png" alt="NoKasa" className="h-10 opacity-80 hover:opacity-100 transition-opacity" />
            <img src="/assets/sptronics.png" alt="SPtronics" className="h-10 opacity-80 hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-primary-50/30 to-secondary-50/30 dark:from-dark-800 dark:to-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4 text-dark-900 dark:text-white">
              Choose Your Mental Health Journey
            </h2>
            <p className="text-xl md:text-xl mb-8 text-dark-600 dark:text-dark-300 max-w-2xl mx-auto">
              Start free and upgrade when ready for more comprehensive mental health support
            </p>
            <div className="flex items-center justify-center space-x-4">
              <span className={`${!isAnnual ? 'font-semibold text-dark-900 dark:text-white' : 'text-dark-600 dark:text-dark-400'}`}>Monthly</span>
              <button 
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative w-12 h-6 rounded-full transition-colors ${isAnnual ? 'bg-gradient-to-r from-primary-500 to-secondary-500' : 'bg-dark-300 dark:bg-dark-700'}`}
              >
                <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${isAnnual ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
              </button>
              <span className={`${isAnnual ? 'font-semibold text-dark-900 dark:text-white' : 'text-dark-600 dark:text-dark-400'}`}>Annual</span>
              <span className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">Save 60%</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`bg-white/80 dark:bg-dark-800/50 backdrop-blur-sm rounded-xl p-8 relative ${
                  plan.popular 
                    ? 'border-2 border-primary-500 dark:border-primary-400 shadow-2xl' 
                    : 'border border-dark-200/50 dark:border-white/10 shadow-xl'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4 text-dark-900 dark:text-white">{plan.name}</h3>
                  <div className="mb-4">
                    <div className="flex flex-col items-center">
                      {plan.originalPrice && (plan.originalPrice.monthly > 0 || plan.originalPrice.annual > 0) && (
                        <span className="text-lg text-gray-500 dark:text-gray-400 line-through mb-1">
                          ₹{isAnnual ? plan.originalPrice.annual : plan.originalPrice.monthly}
                        </span>
                      )}
                      <div>
                        <span className="text-4xl font-bold text-dark-900 dark:text-white">
                          ₹{isAnnual ? plan.price.annual : plan.price.monthly}
                        </span>
                        <span className="text-dark-600 dark:text-dark-300">
                          {isAnnual ? '/year' : '/month'}
                        </span>
                      </div>
                      {plan.originalPrice && (plan.originalPrice.monthly > 0 || plan.originalPrice.annual > 0) && (
                        <span className="text-sm text-green-600 dark:text-green-400 font-semibold mt-2">
                          60% OFF
                        </span>
                      )}
                    </div>
                  </div>
                  {isAnnual && plan.price.annual > 0 && (
                    <p className="text-sm text-dark-600 dark:text-dark-300">
                      ₹{Math.round(plan.price.annual / 12)}/month billed annually
                    </p>
                  )}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      <span className="text-dark-700 dark:text-dark-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                {plan.name === 'Free' ? (
                  <a 
                    href="https://play.google.com/store/apps/details?id=com.thoughtpro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block w-full py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 text-center ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg' 
                        : 'border-2 border-primary-500 text-primary-500 hover:bg-primary-50 dark:hover:bg-dark-700'
                    }`}
                  >
                    {plan.cta}
                  </a>
                ) : (
                  <Link
                    to="/thoughtpro-signin"
                    className={`block w-full py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 text-center ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg' 
                        : 'border-2 border-primary-500 text-primary-500 hover:bg-primary-50 dark:hover:bg-dark-700'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-primary-600 dark:to-secondary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-6">
            Start Your Mental Health Journey Today
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands who are already improving their mental wellbeing with ThoughtPro
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://play.google.com/store/apps/details?id=com.thoughtpro"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-primary-500 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 inline-flex items-center justify-center hover:scale-105 shadow-xl"
            >
              Download Free App
            </a>
            <a
              href="https://wa.me/917020037124?text=I%20want%20to%20know%20more"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 inline-flex items-center justify-center hover:scale-105 hover:bg-white/10"
            >
              Schedule Demo
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-50 dark:bg-dark-950 text-dark-900 dark:text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 md:grid-cols-4 gap-8">
            <div className="col-span-3 md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <img
                  src="/assets/thoughtpro_logo.png"
                  alt="ThoughtPro Logo"
                  className="w-8 h-8 rounded-lg object-contain"
                />
                <span className="text-xl font-display font-bold">ThoughtPro</span>
              </div>
              <p className="text-dark-600 dark:text-dark-300">
                Supporting your journey towards emotional well-being with compassion, understanding, and innovative technology.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-dark-600 dark:text-dark-300">
                <li><a href="#features" className="hover:text-primary-500 transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-primary-500 transition-colors">Pricing</a></li>
                <li><a href="https://play.google.com/store/apps/details?id=com.thoughtpro" target="_blank" rel="noopener noreferrer" className="hover:text-primary-500 transition-colors">Download</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-dark-600 dark:text-dark-300">
                <li><a href="#" className="hover:text-primary-500 transition-colors">Help Center</a></li>
                <li><a href="https://wa.me/917020037124?text=I%20want%20to%20know%20more" target="_blank" rel="noopener noreferrer" className="hover:text-primary-500 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary-500 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-dark-600 dark:text-dark-300">
                <li><a href="#" className="hover:text-primary-500 transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-primary-500 transition-colors">LinkedIn</a></li>
                <li><a href="https://www.instagram.com/thought__healer/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-500 transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-dark-200 dark:border-dark-800 mt-8 pt-8 text-center text-dark-600 dark:text-dark-400">
            <p>&copy; {new Date().getFullYear()} ThoughtPro by ThoughtHealer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ThoughtPro;
