import React from 'react';

const AboutSection = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-neural-pattern bg-repeat opacity-5"></div>

      {/* Animated gradient blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary-500/5 dark:bg-primary-400/5 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary-500/5 dark:bg-secondary-400/5 blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Single-column, centered */}
        <div className="grid grid-cols-1 gap-12 items-center max-w-3xl mx-auto">
          {/* Content */}
          <div className="space-y-8" data-aos="fade-up">
            <div className="relative inline-block mb-4">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-primary-400 dark:to-secondary-400 rounded-lg blur opacity-75 animate-pulse-slow"></div>
              <span className="relative px-4 py-1.5 bg-primary-500 dark:bg-dark-800/50 backdrop-blur-sm rounded-lg text-white font-medium">
                Our Story
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 text-dark-900 dark:text-white">
              Pioneering <span className="gradient-text">Mental Wellness</span> Through Technology
            </h2>

            <p className="text-dark-600 dark:text-dark-300 text-lg leading-relaxed">
              ThoughtHealer was founded in 2018 by Dr. Sarah Johnson, a clinical psychologist with a vision to make mental healthcare more accessible, personalized, and effective through the thoughtful integration of technology and evidence-based practices.
            </p>

            <p className="text-dark-600 dark:text-dark-300 text-lg leading-relaxed">
              Our team of licensed mental health professionals and technology experts work together to create innovative solutions that address the unique challenges of mental health care in the digital age. We believe that technology, when used mindfully, can enhance the therapeutic experience and extend support beyond traditional session boundaries.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="relative bg-white/80 dark:bg-dark-800/30 backdrop-blur-sm rounded-xl p-4 border border-dark-200/50 dark:border-white/10 transition-all duration-300 hover:border-primary-500/30 dark:hover:border-primary-400/30">
                <div className="text-3xl font-bold text-primary-500 dark:text-primary-400 mb-1">5+</div>
                <div className="text-dark-600 dark:text-dark-300 text-sm">Licensed Therapists</div>
              </div>
              <div className="relative bg-white/80 dark:bg-dark-800/30 backdrop-blur-sm rounded-xl p-4 border border-dark-200/50 dark:border-white/10 transition-all duration-300 hover:border-secondary-500/30 dark:hover:border-secondary-400/30">
                <div className="text-3xl font-bold text-secondary-500 dark:text-secondary-400 mb-1">2+</div>
                <div className="text-dark-600 dark:text-dark-300 text-sm">Years of Innovation</div>
              </div>
              <div className="relative bg-white/80 dark:bg-dark-800/30 backdrop-blur-sm rounded-xl p-4 border border-dark-200/50 dark:border-white/10 transition-all duration-300 hover:border-primary-500/30 dark:hover:border-primary-400/30">
                <div className="text-3xl font-bold text-primary-500 dark:text-primary-400 mb-1">1</div>
                <div className="text-dark-600 dark:text-dark-300 text-sm">Patent Published</div>
              </div>
            </div>

            {/* Mission */}
            <div className="relative bg-white/80 dark:bg-dark-800/30 backdrop-blur-sm rounded-xl p-6 border border-dark-200/50 dark:border-white/10">
              <h3 className="text-xl font-semibold mb-3 text-dark-900 dark:text-white">Our Mission</h3>
              <p className="text-dark-600 dark:text-dark-300 leading-relaxed">
                To transform mental healthcare by creating accessible, personalized, and effective digital solutions that empower individuals on their journey toward emotional well-being.
              </p>
            </div>

            {/* CTA */}
            <div className="text-center">
              <a href="#team" className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-primary-400 dark:to-secondary-400 text-white font-medium rounded-full shadow-lg transition-all duration-300 hover:shadow-primary-500/25 dark:hover:shadow-primary-400/25 overflow-hidden">
                <span className="relative z-10">Meet Our Team</span>
                <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
