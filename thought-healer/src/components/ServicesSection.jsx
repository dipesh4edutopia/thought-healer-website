import React from 'react';

const ServicesSection = () => {
  const services = [
    {
      icon: 'fa-brain',
      title: 'Cognitive Therapy',
      description: 'Our evidence-based cognitive therapy approaches help rewire thought patterns and build resilience through personalized treatment plans.',
      gradient: 'from-primary-500 to-secondary-500',
      iconBg: 'from-primary-500/20 to-primary-500/5',
      iconColor: 'text-primary-500',
      hoverColor: 'group-hover:text-primary-500',
      hoverBorder: 'group-hover:border-primary-500/0',
      delay: '0'
    },
    {
      icon: 'fa-mobile-alt',
      title: 'Digital Wellness',
      description: 'Access our suite of digital mental health tools, including mood tracking, guided meditations, and AI-powered personalized exercises.',
      gradient: 'from-secondary-500 to-primary-500',
      iconBg: 'from-secondary-500/20 to-secondary-500/5',
      iconColor: 'text-secondary-500',
      hoverColor: 'group-hover:text-secondary-500',
      hoverBorder: 'group-hover:border-secondary-500/0',
      delay: '100'
    },
    {
      icon: 'fa-users',
      title: 'Community Support',
      description: 'Join our facilitated support groups to connect with others facing similar challenges in a safe, supportive virtual environment.',
      gradient: 'from-primary-500 to-secondary-500',
      iconBg: 'from-primary-500/20 to-secondary-500/5',
      iconColor: 'text-primary-500',
      hoverColor: 'group-hover:text-primary-500',
      hoverBorder: 'group-hover:border-primary-500/0',
      delay: '200'
    }
  ];

  return (
    <section id="services" className="py-16 sm:py-20 md:py-24 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-neural-pattern bg-repeat opacity-5"></div>

      {/* Animated gradient blobs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-primary-500/5 dark:bg-primary-400/5 blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-secondary-500/5 dark:bg-secondary-400/5 blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16" data-aos="fade-up">
          <span className="text-primary-500 dark:text-primary-400 font-medium"></span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mt-2 mb-3 sm:mb-4 text-dark-900 dark:text-white px-4">
            Welcome to Our Synept Labs
          </h2>
          <p className="text-dark-600 dark:text-dark-300 text-base sm:text-lg px-4">
            The founders of Synept Labs serendipitously found out that tech mainly software and AI could help solve the raging issue of Mental healthcare faster.
            Through Multiple discussions and iterations they came up with Thought Healer, Thought Pro and Miniminds blueprint that suits the respective target audience.
            Their mission is to provide affordable mental healthcare for all and free mental healthcare for the most weaker sections of the society.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group" 
              data-aos="fade-up" 
              data-aos-delay={service.delay}
            >
              <div className="relative overflow-hidden rounded-2xl transition-all duration-500">
                {/* Hover glow effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${service.gradient} dark:from-primary-400 dark:to-secondary-400 rounded-2xl blur opacity-0 group-hover:opacity-70 transition duration-300`}></div>

                <div className={`relative h-full bg-white/5 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 transition-all duration-300 ${service.hoverBorder}`}>
                  {/* Icon with gradient background */}
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.iconBg} dark:${service.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <i className={`fas ${service.icon} ${service.iconColor} dark:${service.iconColor} text-2xl`}></i>
                  </div>

                  <h3 className={`text-xl font-semibold mb-3 text-dark-900 dark:text-white ${service.hoverColor} dark:${service.hoverColor} transition-colors`}>
                    {service.title}
                  </h3>

                  <p className="text-dark-600 dark:text-dark-300 mb-6">
                    {service.description}
                  </p>

                  {/* Animated line */}
                  <div className={`w-12 h-0.5 bg-primary-500/30 dark:bg-primary-400/30 group-hover:w-full transition-all duration-300 mb-4`}></div>

                  <a href="#" className={`inline-flex items-center ${service.iconColor} dark:${service.iconColor} font-medium group-hover:translate-x-2 transition-transform duration-300`}>
                    Learn more <i className="fas fa-arrow-right ml-2 text-sm"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
