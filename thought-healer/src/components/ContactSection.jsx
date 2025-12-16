import React, { useState } from 'react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900/50 to-dark-800/50 dark:from-dark-950/50 dark:to-dark-900/50"></div>

      {/* Animated wave effect */}
      <div className="absolute inset-x-0 top-0 h-40 overflow-hidden">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full transform rotate-180">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-white/5 dark:fill-white/5"></path>
        </svg>
      </div>

      {/* Animated gradient blobs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-primary-500/5 dark:bg-primary-400/5 blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-secondary-500/5 dark:bg-secondary-400/5 blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16" data-aos="fade-up">
          <span className="text-primary-500 dark:text-primary-400 font-medium">Get in Touch</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mt-2 mb-4 text-dark-900 dark:text-white">
            Start Your <span className="gradient-text">Healing</span> Journey Today
          </h2>
          <p className="text-dark-600 dark:text-dark-300 text-lg">
            Reach out to schedule a consultation or learn more about our services
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div data-aos="fade-right">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500/30 to-secondary-500/30 dark:from-primary-400/30 dark:to-secondary-400/30 rounded-xl blur opacity-70"></div>

              {/* Form card */}
              <div className="relative bg-white/80 dark:bg-dark-800/50 backdrop-blur-sm rounded-xl p-8 border border-dark-200/50 dark:border-white/10 shadow-xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name field */}
                  <div>
                    <label htmlFor="name" className="block text-dark-700 dark:text-dark-300 mb-2 font-medium">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <i className="fas fa-user text-dark-400 dark:text-dark-500"></i>
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 bg-white/5 dark:bg-dark-700/30 border border-white/10 rounded-lg focus:border-primary-500 dark:focus:border-primary-400 focus:outline-none text-dark-900 dark:text-white placeholder-dark-400 dark:placeholder-dark-500"
                        placeholder="Your name"
                      />
                    </div>
                  </div>

                  {/* Email field */}
                  <div>
                    <label htmlFor="email" className="block text-dark-700 dark:text-dark-300 mb-2 font-medium">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <i className="fas fa-envelope text-dark-400 dark:text-dark-500"></i>
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 bg-white/5 dark:bg-dark-700/30 border border-white/10 rounded-lg focus:border-primary-500 dark:focus:border-primary-400 focus:outline-none text-dark-900 dark:text-white placeholder-dark-400 dark:placeholder-dark-500"
                        placeholder="Your email"
                      />
                    </div>
                  </div>

                  {/* Subject field */}
                  <div>
                    <label htmlFor="subject" className="block text-dark-700 dark:text-dark-300 mb-2 font-medium">Subject</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <i className="fas fa-tag text-dark-400 dark:text-dark-500"></i>
                      </div>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 bg-white/5 dark:bg-dark-700/30 border border-white/10 rounded-lg focus:border-primary-500 dark:focus:border-primary-400 focus:outline-none text-dark-900 dark:text-white"
                      >
                        <option value="">Select a subject</option>
                        <option value="therapy">Therapy Services</option>
                        <option value="support">Support Groups</option>
                        <option value="digital">Digital Tools</option>
                        <option value="general">General Inquiry</option>
                      </select>
                    </div>
                  </div>

                  {/* Message field */}
                  <div>
                    <label htmlFor="message" className="block text-dark-700 dark:text-dark-300 mb-2 font-medium">Message</label>
                    <div className="relative">
                      <div className="absolute top-3 left-0 flex items-start pl-4 pointer-events-none">
                        <i className="fas fa-comment-alt text-dark-400 dark:text-dark-500"></i>
                      </div>
                      <textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 bg-white/5 dark:bg-dark-700/30 border border-white/10 rounded-lg focus:border-primary-500 dark:focus:border-primary-400 focus:outline-none text-dark-900 dark:text-white placeholder-dark-400 dark:placeholder-dark-500"
                        placeholder="Your message"
                      ></textarea>
                    </div>
                  </div>

                  {/* Submit button */}
                  <button type="submit" className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-primary-400 dark:to-secondary-400 w-full px-6 py-4 font-medium text-white shadow-lg transition-all duration-300">
                    <span className="relative z-10 flex items-center justify-center">
                      Send Message
                      <i className="fas fa-paper-plane ml-2 group-hover:translate-x-1 transition-transform"></i>
                    </span>
                    <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div data-aos="fade-left">
            {/* Contact info card */}
            <div className="relative mb-8">
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-secondary-500/30 to-primary-500/30 dark:from-secondary-400/30 dark:to-primary-400/30 rounded-xl blur opacity-70"></div>

              <div className="relative bg-white/80 dark:bg-dark-800/50 backdrop-blur-sm rounded-xl p-8 border border-dark-200/50 dark:border-white/10 shadow-xl">
                <h3 className="text-xl font-semibold mb-6 text-dark-900 dark:text-white">Contact Information</h3>

                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500/20 to-primary-500/5 dark:from-primary-400/20 dark:to-primary-400/5 flex items-center justify-center">
                        <i className="fas fa-map-marker-alt text-primary-500 dark:text-primary-400 text-xl"></i>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-dark-900 dark:text-white mb-1">Office Location</h4>
                      <p className="text-dark-600 dark:text-dark-300">
                        S 26/A Siddhivinayak Nagari, Krishna R-14 Pune, Nigdi,<br />
                        Yamunanagar, Pune-411044, Maharashtra
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-secondary-500/20 to-secondary-500/5 dark:from-secondary-400/20 dark:to-secondary-400/5 flex items-center justify-center">
                        <i className="fas fa-envelope text-secondary-500 dark:text-secondary-400 text-xl"></i>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-dark-900 dark:text-white mb-1">Email Us</h4>
                      <p className="text-dark-600 dark:text-dark-300">
                        <a href="mailto:connect@thoughthealer.org" className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                          connect@thoughthealer.org
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours card */}
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 dark:from-primary-400/20 dark:to-primary-400/5 rounded-xl blur opacity-70"></div>

              <div className="relative bg-white/80 dark:bg-dark-800/50 backdrop-blur-sm rounded-xl p-8 border border-dark-200/50 dark:border-white/10 shadow-xl">
                <h3 className="text-xl font-semibold mb-6 text-dark-900 dark:text-white">Office Hours</h3>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-dark-600 dark:text-dark-300">Monday - Friday</span>
                    <span className="text-dark-900 dark:text-white font-medium">9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dark-600 dark:text-dark-300">Saturday</span>
                    <span className="text-dark-900 dark:text-white font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dark-600 dark:text-dark-300">Sunday</span>
                    <span className="text-dark-900 dark:text-white font-medium">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
