import React from 'react';
import { Link } from 'react-router-dom';

const FeaturesSection = () => {
  const products = [
    {
      name: 'Thought Pro',
      features: [
        'Self-monitor stress, productivity and 10 other vital parameters',
        'Get personalized help in the form of interventions',
        'Primary & Secondary Interventions',
        'Secondary interventions – pro suggestions curated by mental health professionals',
        'Tertiary interventions – advanced suggestions and video-based guidance, one-on-one calls with mentors'
      ],
      downloadLink: 'https://play.google.com/store/apps/details?id=com.thoughtpro',
      pageLink: '/thoughtpro',
      color: 'primary',
      delay: '0'
    },
    {
      name: 'ThoughtPro B2B',
      features: [
        'Professional mental wellness platform for your enterprise',
        'Comprehensive mental health assessments for teams',
        'Get personalized help in the form of interventions',
        'Primary interventions – useful suggestions to tackle everyday issues',
        'Secondary interventions – pro suggestions curated by mental health professionals',
        'Tertiary interventions – advanced suggestions and video-based guidance, one-on-one calls with mental health professionals'
      ],
      downloadLink: 'https://play.google.com/store/apps/details?id=com.thoughtpro.b2b',
      pageLink: '/thoughtpro-b2b',
      color: 'primary',
      delay: '100'
    },
    // {
    //   name: 'Thought Healer',
    //   features: [
    //     'Monitor your most pressing mental health issues like depression, anxiety and 100+ others',
    //     'Track your EQ and personality disorders',
    //     'Get personalized help in the form of interventions',
    //     'Primary interventions – useful suggestions to tackle everyday issues',
    //     'Secondary interventions – pro suggestions curated by mental health professionals',
    //     'Tertiary interventions – advanced suggestions and video-based guidance, one-on-one calls with mental health professionals'
    //   ],
    //   downloadLink: '#',
    //   pageLink: '#',
    //   color: 'primary',
    //   delay: '100'
    // },
    {
      name: 'MiniMinds',
      features: [
        'Monitor your child\'s most pressing mental health issues like loneliness, exam stress and 50+ others',
        'Get personalized help in the form of interventions',
        'Primary interventions – useful suggestions to tackle everyday issues',
        'Secondary interventions – pro suggestions curated by mental health professionals',
        'Tertiary interventions – advanced suggestions and video-based guidance, one-on-one calls with mental health professionals'
      ],
      downloadLink: 'https://play.google.com/store/apps/details?id=com.syneptlabs.miniminds',
      pageLink: '/miniminds',
      color: 'primary',
      delay: '200'
    },
    {
      name: 'LES',
      features: [
        'Empowering neurodivergent learners with structured, evidence-based tools',
        'Specialized support for Dyslexia, Dyscalculia, Dysgraphia, and ADHD',
        'Multi-sensory learning activities and custom study checklists',
        'Integrated accessibility suite with Dyslexic font and high contrast modes',
        '100% Free educational resources for parents, educators, and schools'
      ],
      downloadLink: 'https://play.google.com/store/apps/details?id=com.syneptlabs.lesapp',
      pageLink: '/les',
      color: 'primary',
      delay: '250'
    },
    {
      name: 'HerMind',
      features: [
        'Monitor pressing female issues like PCOS/PCOD/post-partum depression',
        'Unrealistic beauty standards and body image concerns',
        'Get personalized help in the form of interventions',
        'Primary interventions – useful suggestions to tackle everyday issues',
        'Secondary interventions – pro suggestions curated by mental health professionals',
        'Tertiary interventions – advanced suggestions and video-based guidance, one-on-one calls with mental health professionals'
      ],
      downloadLink: 'https://play.google.com/store/apps/details?id=com.hermind',
      pageLink: '/hermind',
      color: 'secondary',
      comingSoon: true,
      delay: '300'
    }
  ];

  return (
    <section id="features" className="py-16 sm:py-20 md:py-24" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8 sm:mb-12 px-4" data-aos="fade-up">
          <span className="text-primary-500 font-medium text-sm sm:text-base">Feature</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            Our Products
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="relative border-2 border-primary-500 rounded-lg p-4 sm:p-6 shadow-sm"
              style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-primary)' }}
              data-aos="fade-up"
              data-aos-delay={product.delay}
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-primary-500 mb-3 sm:mb-4">
                {product.name}
              </h3>
              <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 text-sm sm:text-base">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-primary-500 mr-2 mt-1">✔️</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-2.5 mt-auto pt-2">
                {product.comingSoon ? (
                  <>
                    {/* Coming Soon — links to Play Store */}
                    <a
                      href={product.downloadLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/30 hover:-translate-y-0.5"
                      style={{ background: 'linear-gradient(135deg, #14b8a6 0%, #d946ef 100%)' }}
                    >
                      <span className="relative z-10 flex items-center gap-2 text-white">
                        {/* Play Store icon */}
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white flex-shrink-0"><path d="M3.18 23.76c.37.21.8.24 1.2.09l13.02-7.52-2.83-2.83-11.39 10.26zm-1.62-21.4a1.74 1.74 0 0 0-.06.49v17.3c0 .17.02.34.06.49l.07.07 9.69-9.69v-.23L1.49 2.3l-.07.06zm19.55 8.46-2.74-1.58-3.09 3.09 3.09 3.09 2.76-1.59a1.75 1.75 0 0 0 0-3.01zM4.38.15C3.98 0 3.55.03 3.18.24l.07.07 11.39 10.26 2.83-2.83L4.38.15z"/></svg>
                        Download
                      </span>
                      <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                    </a>
                    {/* Read More */}
                    <Link
                      to={product.pageLink}
                      onClick={() => window.scrollTo(0, 0)}
                      className="group w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold border-2 border-primary-500/70 text-primary-600 dark:text-primary-400 hover:bg-primary-500 hover:text-white hover:border-primary-500 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                    >
                      Explore
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </>
                ) : (
                  <>
                    {/* Download — gradient filled */}
                    <a
                      href={product.downloadLink}
                      target={product.downloadLink.startsWith('http') ? '_blank' : '_self'}
                      rel={product.downloadLink.startsWith('http') ? 'noopener noreferrer' : ''}
                      className="group relative w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/30 hover:-translate-y-0.5"
                      style={{ background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)' }}
                    >
                      <span className="relative z-10 flex items-center gap-2 text-white">
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white flex-shrink-0"><path d="M3.18 23.76c.37.21.8.24 1.2.09l13.02-7.52-2.83-2.83-11.39 10.26zm-1.62-21.4a1.74 1.74 0 0 0-.06.49v17.3c0 .17.02.34.06.49l.07.07 9.69-9.69v-.23L1.49 2.3l-.07.06zm19.55 8.46-2.74-1.58-3.09 3.09 3.09 3.09 2.76-1.59a1.75 1.75 0 0 0 0-3.01zM4.38.15C3.98 0 3.55.03 3.18.24l.07.07 11.39 10.26 2.83-2.83L4.38.15z"/></svg>
                        Download
                      </span>
                      <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                    </a>
                    {/* Read More — outlined glass */}
                    {product.pageLink !== '#' ? (
                      <Link
                        to={product.pageLink}
                        onClick={() => window.scrollTo(0, 0)}
                        className="group w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold border-2 border-primary-500/70 text-primary-600 dark:text-primary-400 hover:bg-primary-500 hover:text-white hover:border-primary-500 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                      >
                        Read More
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Link>
                    ) : (
                      <a
                        href="#"
                        className="group w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold border-2 border-primary-500/70 text-primary-600 dark:text-primary-400 hover:bg-primary-500 hover:text-white hover:border-primary-500 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                      >
                        Read More
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </a>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
