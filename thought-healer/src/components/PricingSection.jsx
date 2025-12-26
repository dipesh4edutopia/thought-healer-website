import React, { useState } from 'react';

const PricingSection = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: 'Can I switch between plans?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will take effect at the start of your next billing cycle.'
    },
    {
      question: 'Is there a contract or commitment?',
      answer: 'No, all our plans are month-to-month with no long-term contracts. You can cancel at any time.'
    },
    {
      question: 'Are the therapy sessions in-person or virtual?',
      answer: 'All therapy sessions are conducted virtually through our secure platform. This allows for greater flexibility and accessibility.'
    }
  ];

  return (
    <section id="pricing" className="py-16 sm:py-20 md:py-24 relative overflow-hidden">
      {/* Pattern & blobs */}
      <div className="absolute inset-0 bg-neural-pattern bg-repeat opacity-5"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary-500/5 dark:bg-primary-400/5 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary-500/5 dark:bg-secondary-400/5 blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 px-4" data-aos="fade-up">
          <span className="text-primary-500 dark:text-primary-400 font-medium text-sm sm:text-base">Subscription Plans</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mt-2 mb-3 sm:mb-4 text-dark-900 dark:text-white">
            Choose Your <span className="gradient-text">Healing</span> Journey
          </h2>
          <p className="text-dark-600 dark:text-dark-300 text-base sm:text-lg">
            Select the plan that best fits your needs and start your journey to better mental health today.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mb-16 sm:mb-20">
          {/* Thought Pro */}
          <div className="relative flex flex-col h-full" data-aos="fade-up">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 dark:from-primary-400/20 dark:to-secondary-400/20 rounded-xl blur opacity-70"></div>
            <div className="relative bg-white/80 dark:bg-dark-800/50 backdrop-blur-sm rounded-xl border border-dark-200/50 dark:border-white/10 shadow-xl flex-1 flex flex-col">
              <div className="absolute top-0 inset-x-0 bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-primary-400 dark:to-secondary-400 text-white text-center py-2 text-sm font-medium rounded-t-xl">
                Thought Pro
              </div>
              <div className="p-6 sm:p-8 pt-12 flex-1">
                <div className="bg-primary-500/10 dark:bg-primary-400/10 rounded-lg w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-4 sm:mb-6">
                  <i className="fas fa-seedling text-primary-500 dark:text-primary-400 text-xl sm:text-2xl"></i>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-dark-900 dark:text-white mb-1">Thought Pro</h3>
                <p className="text-base sm:text-lg font-medium text-primary-500 mb-4 sm:mb-6">Free</p>
                <ul className="space-y-2 sm:space-y-3 text-dark-600 dark:text-dark-300 mb-6 sm:mb-8 text-xs sm:text-sm">
                  <li className="flex items-start">
                    <i className="fas fa-check mt-1 mr-3 text-primary-500 dark:text-primary-400"></i>
                    Self-monitor stress, productivity & 10 other vital parameters
                  </li>
                </ul>
                <h4 className="text-base sm:text-lg font-semibold text-dark-900 dark:text-white mb-2 sm:mb-3">Premium</h4>
                <ul className="space-y-2 sm:space-y-3 text-dark-600 dark:text-dark-300 mb-6 sm:mb-8 text-xs sm:text-sm">
                  <li className="flex items-start">
                    <i className="fas fa-check mt-1 mr-3 text-primary-500"></i>
                    All-in free access, 10+ Scans
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check mt-1 mr-3 text-primary-500"></i>
                    Primary & Secondary Interventions
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check mt-1 mr-3 text-primary-500"></i>
                    ₹299/Month or ₹999/Yr
                  </li>
                </ul>
                <h4 className="text-lg font-semibold text-dark-900 dark:text-white mb-3">Ultra</h4>
                <ul className="space-y-3 text-dark-600 dark:text-dark-300 text-sm">
                  <li className="flex items-start">
                    <i className="fas fa-check mt-1 mr-3 text-primary-500"></i>
                    100+ Scans, All Interventions
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check mt-1 mr-3 text-primary-500"></i>
                    ₹599/Month or ₹2599/Yr
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check mt-1 mr-3 text-primary-500"></i>
                    1-on-1 sessions (₹500-800)
                  </li>
                </ul>
              </div>
              <div className="p-6 sm:p-8 pt-0">
                <a href="/thoughtpro" className="block w-full py-2.5 sm:py-3 px-4 sm:px-6 text-center text-sm sm:text-base rounded-lg border-2 border-primary-500 text-primary-500 dark:text-primary-400 hover:bg-primary-500/10 transition-colors">
                  Get Started
                </a>
              </div>
            </div>
          </div>

          {/* ThoughtPro B2B */}
          <div className="relative flex flex-col h-full" data-aos="fade-up" data-aos-delay="100">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500/40 to-secondary-500/40 rounded-xl blur opacity-70"></div>
            <div className="relative bg-white/80 dark:bg-dark-800/50 backdrop-blur-sm rounded-xl border shadow-xl flex-1 flex flex-col">
              <div className="absolute top-0 inset-x-0 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-center py-2 text-sm font-medium rounded-t-xl">
                ThoughtPro B2B
              </div>
              <div className="p-6 sm:p-8 pt-12 flex-1">
                <div className="bg-primary-500/10 rounded-lg w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-4 sm:mb-6">
                  <i className="fas fa-building text-primary-500 text-xl sm:text-2xl"></i>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-dark-900 dark:text-white mb-2">ThoughtPro B2B</h3>
                <p className="text-base sm:text-lg font-medium text-primary-500 mb-4 sm:mb-6">Enterprise</p>
                <ul className="space-y-2 sm:space-y-3 text-dark-600 dark:text-dark-300 mb-6 sm:mb-8 text-xs sm:text-sm">
                  <li className="flex items-start">
                    <i className="fas fa-check mt-1 mr-3 text-primary-500"></i>
                    Comprehensive team assessments
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check mt-1 mr-3 text-primary-500"></i>
                    Real-time analytics dashboard
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check mt-1 mr-3 text-primary-500"></i>
                    Expert-led programs
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check mt-1 mr-3 text-primary-500"></i>
                    Enterprise-grade security
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check mt-1 mr-3 text-primary-500"></i>
                    Dedicated account manager
                  </li>
                </ul>
              </div>
              <div className="p-6 sm:p-8 pt-0">
                <a href="/thoughtpro-b2b" className="block w-full py-2.5 sm:py-3 px-4 sm:px-6 text-center text-sm sm:text-base rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:shadow-lg transition-all">
                  Contact Sales
                </a>
              </div>
            </div>
          </div>

          {/* Thought Healer - Commented out */}
          {/* <div className="relative flex flex-col h-full" data-aos="fade-up" data-aos-delay="100">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500/40 to-secondary-500/40 rounded-xl blur opacity-70"></div>
            <div className="relative bg-white/80 dark:bg-dark-800/50 backdrop-blur-sm rounded-xl border shadow-xl flex-1 flex flex-col">
              <div className="absolute top-0 inset-x-0 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-center py-2 text-sm font-medium rounded-t-xl">
                Thought Healer
              </div>
              <div className="p-6 sm:p-8 pt-12 flex-1">
                <div className="bg-secondary-500/20 rounded-lg w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-4 sm:mb-6">
                  <i className="fas fa-tree text-secondary-500 text-xl sm:text-2xl"></i>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-dark-900 dark:text-white mb-2">Thought Healer</h3>
                <p className="text-base sm:text-lg font-medium mb-4 sm:mb-6">Free</p>
                <ul className="space-y-2 sm:space-y-3 text-dark-600 dark:text-dark-300 mb-6 sm:mb-8 text-xs sm:text-sm">
                  <li className="flex items-start">
                    <i className="fas fa-check mt-1 mr-3 text-secondary-500"></i>
                    SOS services, 10 Scans
                  </li>
                </ul>
                <h4 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 dark:text-white">Premium</h4>
                <ul className="space-y-2 sm:space-y-3 text-dark-600 dark:text-dark-300 mb-6 sm:mb-8 text-xs sm:text-sm">
                  <li className="flex items-start">
                    <i className="fas fa-check mt-1 mr-3 text-secondary-500"></i>
                    All interventions, ₹299/Month
                  </li>
                </ul>
                <h4 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 dark:text-white">Ultra</h4>
                <ul className="space-y-2 sm:space-y-3 text-dark-600 dark:text-dark-300 text-xs sm:text-sm">
                  <li className="flex items-start">
                    <i className="fas fa-check mt-1 mr-3 text-secondary-500"></i>
                    100+ Scans, ₹599/Month
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check mt-1 mr-3 text-secondary-500"></i>
                    1-on-1 sessions
                  </li>
                </ul>
              </div>
              <div className="p-8 pt-0">
                <a href="#signup" className="block w-full py-3 px-6 text-center rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:shadow-lg transition-all">
                  Get Started
                </a>
              </div>
            </div>
          </div> */}

          {/* MiniMinds & HerMind - simplified version */}
          <div className="relative flex flex-col h-full" data-aos="fade-up" data-aos-delay="200">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-secondary-500/20 to-primary-500/20 rounded-xl blur opacity-70"></div>
            <div className="relative bg-white/80 dark:bg-dark-800/50 backdrop-blur-sm rounded-xl border shadow-xl flex-1 flex flex-col">
              <div className="absolute top-0 inset-x-0 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-center py-2 text-sm font-medium rounded-t-xl">
                MiniMinds
              </div>
              <div className="p-6 sm:p-8 pt-12 flex-1">
                <div className="bg-secondary-500/10 rounded-lg w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-4 sm:mb-6">
                  <i className="fas fa-building text-secondary-500 text-xl sm:text-2xl"></i>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-dark-900 dark:text-white mb-2">MiniMinds</h3>
                <p className="text-base sm:text-lg font-medium text-secondary-500 mb-4 sm:mb-6">Free</p>
                <p className="text-xs sm:text-sm text-dark-600 dark:text-dark-300 mb-3 sm:mb-4">Premium: ₹199/Month, Ultra: ₹299/Month</p>
                <ul className="space-y-2 text-dark-600 dark:text-dark-300 text-xs sm:text-sm">
                  <li className="flex items-start">
                    <i className="fas fa-check mt-1 mr-2 text-secondary-500"></i>
                    50+ Child mental health scans
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check mt-1 mr-2 text-secondary-500"></i>
                    All interventions included
                  </li>
                </ul>
              </div>
              <div className="p-6 sm:p-8 pt-0">
                <a href="/miniminds" className="block w-full py-2.5 sm:py-3 px-4 sm:px-6 text-center text-sm sm:text-base rounded-lg border-2 border-secondary-500 text-secondary-500 hover:bg-secondary-500/10 transition-colors">
                  Get Started
                </a>
              </div>
            </div>
          </div>

          <div className="relative flex flex-col h-full" data-aos="fade-up" data-aos-delay="300">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-secondary-500/20 to-primary-500/20 rounded-xl blur opacity-70"></div>
            <div className="relative bg-white/80 dark:bg-dark-800/50 backdrop-blur-sm rounded-xl border shadow-xl flex-1 flex flex-col">
              <div className="absolute top-0 inset-x-0 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-center py-2 text-sm font-medium rounded-t-xl">
                HerMind
              </div>
              <div className="p-6 sm:p-8 pt-12 flex-1">
                <div className="bg-secondary-500/10 rounded-lg w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-4 sm:mb-6">
                  <i className="fas fa-building text-secondary-500 text-xl sm:text-2xl"></i>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-dark-900 dark:text-white mb-2">HerMind</h3>
                <p className="text-base sm:text-lg font-medium text-secondary-500 mb-4 sm:mb-6">Free</p>
                <p className="text-xs sm:text-sm text-dark-600 dark:text-dark-300 mb-3 sm:mb-4">Premium: ₹99/Month, Ultra: ₹99/Month</p>
                <ul className="space-y-2 text-dark-600 dark:text-dark-300 text-xs sm:text-sm">
                  <li className="flex items-start">
                    <i className="fas fa-check mt-1 mr-2 text-secondary-500"></i>
                    Female-focused mental health
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check mt-1 mr-2 text-secondary-500"></i>
                    PCOS/PCOD support
                  </li>
                </ul>
              </div>
              <div className="p-8 pt-0">
                <a href="/hermind" className="block w-full py-3 px-6 text-center rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:shadow-lg transition-all">
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 sm:mt-20 max-w-3xl mx-auto px-4" data-aos="fade-up">
          <h3 className="text-xl sm:text-2xl font-semibold text-dark-900 dark:text-white mb-6 sm:mb-8 text-center">
            Frequently Asked Questions
          </h3>

          <div className="space-y-4 sm:space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="relative bg-white/80 dark:bg-dark-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-dark-200/50 dark:border-white/10 shadow-md"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex justify-between items-center w-full text-left"
                >
                  <h4 className="text-base sm:text-lg font-medium text-dark-900 dark:text-white pr-4">{faq.question}</h4>
                  <i className={`fas ${openFaq === index ? 'fa-minus text-primary-500' : 'fa-plus text-dark-400'}`}></i>
                </button>

                {openFaq === index && (
                  <div className="mt-3 sm:mt-4 text-sm sm:text-base text-dark-600 dark:text-dark-300">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
