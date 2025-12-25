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
      name: 'Thought Healer',
      features: [
        'Monitor your most pressing mental health issues like depression, anxiety and 100+ others',
        'Track your EQ and personality disorders',
        'Get personalized help in the form of interventions',
        'Primary interventions – useful suggestions to tackle everyday issues',
        'Secondary interventions – pro suggestions curated by mental health professionals',
        'Tertiary interventions – advanced suggestions and video-based guidance, one-on-one calls with mental health professionals'
      ],
      downloadLink: '#',
      pageLink: '#',
      color: 'primary',
      delay: '100'
    },
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
      name: 'herMind',
      features: [
        'Monitor pressing female issues like PCOS/PCOD/post-partum depression',
        'Unrealistic beauty standards and body image concerns',
        'Get personalized help in the form of interventions',
        'Primary interventions – useful suggestions to tackle everyday issues',
        'Secondary interventions – pro suggestions curated by mental health professionals',
        'Tertiary interventions – advanced suggestions and video-based guidance, one-on-one calls with mental health professionals'
      ],
      downloadLink: '#',
      pageLink: '#',
      color: 'secondary',
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
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
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <a
                  href={product.downloadLink}
                  target={product.downloadLink.startsWith('http') ? '_blank' : '_self'}
                  rel={product.downloadLink.startsWith('http') ? 'noopener noreferrer' : ''}
                  className="flex-1 bg-primary-500 text-white py-2 rounded-lg text-center text-sm sm:text-base hover:bg-primary-600 transition-colors"
                >
                  Download
                </a>
                {product.pageLink !== '#' ? (
                  <Link
                    to={product.pageLink}
                    onClick={() => window.scrollTo(0, 0)}
                    className="flex-1 border-2 border-primary-500 text-primary-500 py-2 rounded-lg text-center text-sm sm:text-base hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                  >
                    Read More
                  </Link>
                ) : (
                  <a
                    href="#"
                    className="flex-1 border-2 border-primary-500 text-primary-500 py-2 rounded-lg text-center text-sm sm:text-base hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                  >
                    Read More
                  </a>
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
