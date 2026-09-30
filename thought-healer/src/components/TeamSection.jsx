import React from 'react';

const TeamSection = () => {
  const team = [
    {
      name: 'Dr. Sandeep Jagtap',
      role: 'Founder',
      qualification: 'MD DPM — Psychiatry',
      description: 'Consultant Psychiatrist & Director, Aastha Hospital Chinchwad and Director, Prerana Rehabilitation. With 20+ years of experience in clinical practice and research in the field of psychiatry.',
      image: '/Dr._Sandeep_Jagtap.png',
      delay: '0'
    },
    {
      name: 'Dr. Swati Jagtap',
      role: 'Founder',
      qualification: 'MS DOMS — Ophthalmology',
      description: 'Ophthalmologist & Dementia Rehabilitation Expert. Director, Jagtap Eye Hospital and Director, Prerana Rehabilitation Center.',
      image: '/Dr._Swati_Jagtap.png',
      imageClass: 'max-h-[115%]',
      delay: '100'
    },
    {
      name: 'Dr. Dipesh Walte',
      role: 'Chief Thought Healer & Founder',
      qualification: 'Innovator | 15 Patents Published | Founder, Brainchain',
      description: 'Serial entrepreneur building mental healthcare with a paradigm shift. Post-AGI thinker crafting frameworks for a future-ready world. Passionate about EdTech, Neuroscience & Social Entrepreneurship. Collaborating with PCCOE on patent-worthy innovations. Chief Thought Healer at Synept — ideas are his superpower.',
      image: '/Dr_Dipesh_Walte.png',
      delay: '200'
    },
    {
      name: 'Miss Prajakta Gosavi',
      role: 'Psychologist',
      qualification: 'Masters of Arts - Clinical Psychology',
      description: 'A knowledgeable and qualified Practicing Counselling Psychologist with a proven track record of success in conducting comprehensive psychological evaluations, developing customized treatment plans, and providing professional individual and group psychotherapy to those in need.',
      image: '/Miss_Prajakta_Gosavi-removebg-preview.png',
      delay: '300'
    },
    {
      name: 'Miss Madhuri Solanki',
      role: 'Psychologist',
      qualification: 'M.A. — Clinical Psychology',
      description: 'Clinical Psychologist specializing in De-addiction Counselling, Tobacco Cessation & Adult Mental Health. Skilled in Individual & Group Counselling, Motivational Interviewing and Relapse Prevention.',
      image: '/Miss_Madhuri_Solanki-removebg-preview.png',
      delay: '400'
    },
    {
      name: 'Mrs Smita Gosavi',
      role: 'Psychologist',
      qualification: 'M.A. Psychology | PGCCC (NIMH Pune) | CRR No. A24147 — Rehabilitation Psychologist',
      description: 'Expert in clinical assessment of mental disorders including Major & Minor Psychiatric Disorders, Childhood & Adolescent Psychological, Behavioural and Academic Problems, Community Mental Health, Intellectual Disability, Autism Spectrum Disorder, ADHD, and Psychometry & Testing.',
      image: '/Untitled_design__2_-removebg-preview.png',
      imagePosition: 'object-[top_80]',
      delay: '500'
    }
  ];

  return (
    <section id="team" className="py-16 sm:py-20 md:py-24 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-neural-pattern bg-repeat opacity-5"></div>

      {/* Animated gradient blobs */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full bg-primary-500/5 dark:bg-primary-400/5 blur-3xl"></div>
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-secondary-500/5 dark:bg-secondary-400/5 blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 px-4" data-aos="fade-up">
          <span className="text-primary-500 dark:text-primary-400 font-medium text-sm sm:text-base">Our Experts</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mt-2 mb-3 sm:mb-4 text-dark-900 dark:text-white">
            Meet Our <span className="gradient-text">Professional</span> Team
          </h2>
          <p className="text-dark-600 dark:text-dark-300 text-base sm:text-lg">
            Our team of licensed mental health professionals is dedicated to providing you with the highest quality care
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {team.map((member, index) => (
            <div key={index} className="relative" data-aos="fade-up" data-aos-delay={member.delay}>
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500/30 to-secondary-500/30 dark:from-primary-400/30 dark:to-secondary-400/30 rounded-xl blur opacity-70"></div>

              <div className="relative bg-white/80 dark:bg-dark-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-dark-200/50 dark:border-white/10 shadow-xl">
                <div className={`h-56 sm:h-64 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-dark-700 dark:to-dark-800 flex items-center justify-center overflow-hidden ${member.imagePosition || ''}`}>
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="400"
                    className={`w-full h-full object-contain ${member.imageClass || ''}`}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div class="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-2xl font-bold">' + member.name.charAt(0) + '</div>';
                    }}
                  />
                </div>

                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-dark-900 dark:text-white mb-1">{member.name}</h3>
                  <p className={`${index % 2 === 0 ? 'text-primary-500 dark:text-primary-400' : 'text-secondary-500 dark:text-secondary-400'} font-medium mb-1`}>
                    {member.role}
                  </p>
                  {member.qualification && (
                    <p className="text-xs font-semibold text-dark-500 dark:text-dark-400 uppercase tracking-wide mb-3">
                      {member.qualification}
                    </p>
                  )}
                  {member.description && (
                    <p className="text-sm text-dark-600 dark:text-dark-300 leading-relaxed">
                      {member.description}
                    </p>
                  )}
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
