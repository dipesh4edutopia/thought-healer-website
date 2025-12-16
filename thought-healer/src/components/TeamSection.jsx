import React from 'react';

const TeamSection = () => {
  const team = [
    {
      name: 'Dr. Sandeep Jagtap',
      role: 'Founder',
      image: '/Dr._Sandeep_Jagtap1-removebg-preview.png',
      delay: '0'
    },
    {
      name: 'Dr. Swati Jagtap',
      role: 'Founder',
      image: '/Dr._Swati_Jagtap-removebg-preview (1).png',
      imageClass: 'max-h-[115%]',
      delay: '100'
    },
    {
      name: 'Dr. Dipesh Walte',
      role: 'Founder',
      image: '/Dr_Dipesh_Walte_CanvaReady_300x256.png',
      delay: '200'
    },
    {
      name: 'Miss Prajakta Gosavi',
      role: 'Psychologist',
      image: '/Miss_Prajakta_Gosavi-removebg-preview.png',
      delay: '300'
    },
    {
      name: 'Miss Madhuri Solanki',
      role: 'Psychologist',
      image: '/Miss_Madhuri_Solanki-removebg-preview.png',
      delay: '400'
    },
    {
      name: 'Mrs Smita Gosavi',
      role: 'Psychologist',
      image: '/Untitled_design__2_-removebg-preview.png',
      imagePosition: 'object-[top_80]',
      delay: '500'
    }
  ];

  return (
    <section id="team" className="py-24 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-neural-pattern bg-repeat opacity-5"></div>

      {/* Animated gradient blobs */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full bg-primary-500/5 dark:bg-primary-400/5 blur-3xl"></div>
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-secondary-500/5 dark:bg-secondary-400/5 blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16" data-aos="fade-up">
          <span className="text-primary-500 dark:text-primary-400 font-medium">Our Experts</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mt-2 mb-4 text-dark-900 dark:text-white">
            Meet Our <span className="gradient-text">Professional</span> Team
          </h2>
          <p className="text-dark-600 dark:text-dark-300 text-lg">
            Our team of licensed mental health professionals is dedicated to providing you with the highest quality care
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {team.map((member, index) => (
            <div key={index} className="relative" data-aos="fade-up" data-aos-delay={member.delay}>
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500/30 to-secondary-500/30 dark:from-primary-400/30 dark:to-secondary-400/30 rounded-xl blur opacity-70"></div>

              <div className="relative bg-white/80 dark:bg-dark-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-dark-200/50 dark:border-white/10 shadow-xl">
                <div className={`h-64 flex items-center justify-center overflow-hidden ${member.imagePosition || ''}`}>
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className={`w-full h-full object-cover object-center ${member.imageClass || ''}`}
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-dark-900 dark:text-white mb-1">{member.name}</h3>
                  <p className={`${index % 2 === 0 ? 'text-primary-500 dark:text-primary-400' : 'text-secondary-500 dark:text-secondary-400'} font-medium mb-3`}>
                    {member.role}
                  </p>

                  <div className="flex space-x-3">
                    <a href="#" className="text-dark-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a href="#" className="text-dark-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                      <i className={`fab ${index === 1 ? 'fa-github' : index === 2 ? 'fa-instagram' : 'fa-twitter'}`}></i>
                    </a>
                    <a href="#" className="text-dark-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                      <i className="fas fa-envelope"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
