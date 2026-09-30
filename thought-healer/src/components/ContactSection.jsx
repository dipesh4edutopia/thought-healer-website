import React, { useState } from 'react';

// ─── WhatsApp Configuration (100% Free) ───────────────────────────────────────
const WHATSAPP_NUMBER = '919422421316'; // Country code (91) + number (9422421316)

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'sent'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subjectLabel = formData.subject || 'General Inquiry';
    const text =
      `Hello ThoughtHealer! 👋\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Email:* ${formData.email}\n` +
      `*Subject:* ${subjectLabel}\n\n` +
      `*Message:*\n${formData.message}`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`, '_blank');

    setStatus('sent');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 relative overflow-hidden">
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
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 px-4" data-aos="fade-up">
          <span className="text-primary-500 dark:text-primary-400 font-medium text-sm sm:text-base">Get in Touch</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mt-2 mb-3 sm:mb-4 text-dark-900 dark:text-white">
            Start Your <span className="gradient-text">Healing</span> Journey Today
          </h2>
          <p className="text-dark-600 dark:text-dark-300 text-base sm:text-lg">
            Reach out to schedule a consultation or learn more about our services
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Form */}
          <div data-aos="fade-right">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500/30 to-secondary-500/30 dark:from-primary-400/30 dark:to-secondary-400/30 rounded-xl blur opacity-70"></div>

              {/* Form card */}
              <div className="relative bg-white/80 dark:bg-dark-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8 border border-dark-200/50 dark:border-white/10 shadow-xl">

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  {/* Name field */}
                  <div>
                    <label htmlFor="name" className="block text-dark-700 dark:text-dark-300 mb-2 font-medium text-sm sm:text-base">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 sm:pl-4 pointer-events-none">
                        <i className="fas fa-user text-dark-400 dark:text-dark-500"></i>
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white/5 dark:bg-dark-700/30 border border-white/10 rounded-lg focus:border-primary-500 dark:focus:border-primary-400 focus:outline-none text-dark-900 dark:text-white placeholder-dark-400 dark:placeholder-dark-500"
                        placeholder="Your name"
                      />
                    </div>
                  </div>

                  {/* Email field */}
                  <div>
                    <label htmlFor="email" className="block text-dark-700 dark:text-dark-300 mb-2 font-medium text-sm sm:text-base">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 sm:pl-4 pointer-events-none">
                        <i className="fas fa-envelope text-dark-400 dark:text-dark-500"></i>
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white/5 dark:bg-dark-700/30 border border-white/10 rounded-lg focus:border-primary-500 dark:focus:border-primary-400 focus:outline-none text-dark-900 dark:text-white placeholder-dark-400 dark:placeholder-dark-500"
                        placeholder="Your email"
                      />
                    </div>
                  </div>

                  {/* Subject field */}
                  <div>
                    <label htmlFor="subject" className="block text-dark-700 dark:text-dark-300 mb-2 font-medium text-sm sm:text-base">Subject</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 sm:pl-4 pointer-events-none">
                        <i className="fas fa-tag text-dark-400 dark:text-dark-500"></i>
                      </div>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white/5 dark:bg-dark-700/30 border border-white/10 rounded-lg focus:border-primary-500 dark:focus:border-primary-400 focus:outline-none text-dark-900 dark:text-white"
                      >
                        <option value="">Select a subject</option>
                        <option value="Therapy Services">Therapy Services</option>
                        <option value="Support Groups">Support Groups</option>
                        <option value="Digital Tools">Digital Tools</option>
                        <option value="General Inquiry">General Inquiry</option>
                      </select>
                    </div>
                  </div>

                  {/* Message field */}
                  <div>
                    <label htmlFor="message" className="block text-dark-700 dark:text-dark-300 mb-2 font-medium text-sm sm:text-base">Message</label>
                    <div className="relative">
                      <div className="absolute top-2.5 sm:top-3 left-0 flex items-start pl-3 sm:pl-4 pointer-events-none">
                        <i className="fas fa-comment-alt text-dark-400 dark:text-dark-500"></i>
                      </div>
                      <textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white/5 dark:bg-dark-700/30 border border-white/10 rounded-lg focus:border-primary-500 dark:focus:border-primary-400 focus:outline-none text-dark-900 dark:text-white placeholder-dark-400 dark:placeholder-dark-500"
                        placeholder="Your message"
                      ></textarea>
                    </div>
                  </div>

                  {/* Success message */}
                  {status === 'sent' && (
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400">
                      <i className="fas fa-check-circle text-xl flex-shrink-0"></i>
                      <p className="text-sm sm:text-base font-medium">
                        WhatsApp opened! Your message is ready to send. 🎉
                      </p>
                    </div>
                  )}

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="group relative overflow-hidden rounded-lg w-full px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-medium text-white shadow-lg transition-all duration-300"
                    style={{ background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)' }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-white flex-shrink-0">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Send via WhatsApp
                    </span>
                    <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div data-aos="fade-left">
            {/* Contact info card */}
            <div className="relative mb-6 sm:mb-8">
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-secondary-500/30 to-primary-500/30 dark:from-secondary-400/30 dark:to-primary-400/30 rounded-xl blur opacity-70"></div>

              <div className="relative bg-white/80 dark:bg-dark-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8 border border-dark-200/50 dark:border-white/10 shadow-xl">
                <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-dark-900 dark:text-white">Contact Information</h3>

                <div className="space-y-4 sm:space-y-6">
                  {/* WhatsApp */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3 sm:mr-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 fill-white">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-medium text-dark-900 dark:text-white mb-1">WhatsApp Us</h4>
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm sm:text-base text-green-600 dark:text-green-400 hover:underline font-medium"
                      >
                        +91 94224 21316
                      </a>
                      <p className="text-xs text-dark-400 dark:text-dark-500 mt-0.5">Tap to chat instantly</p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3 sm:mr-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-primary-500/20 to-primary-500/5 dark:from-primary-400/20 dark:to-primary-400/5 flex items-center justify-center">
                        <i className="fas fa-map-marker-alt text-primary-500 dark:text-primary-400 text-lg sm:text-xl"></i>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-medium text-dark-900 dark:text-white mb-1">Office Location</h4>
                      <p className="text-sm sm:text-base text-dark-600 dark:text-dark-300">
                        S 26/A Siddhivinayak Nagari, Krishna R-14 Pune, Nigdi,<br />
                        Yamunanagar, Pune-411044, Maharashtra
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3 sm:mr-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-secondary-500/20 to-secondary-500/5 dark:from-secondary-400/20 dark:to-secondary-400/5 flex items-center justify-center">
                        <i className="fas fa-envelope text-secondary-500 dark:text-secondary-400 text-lg sm:text-xl"></i>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-medium text-dark-900 dark:text-white mb-1">Email Us</h4>
                      <p className="text-sm sm:text-base text-dark-600 dark:text-dark-300">
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

              <div className="relative bg-white/80 dark:bg-dark-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8 border border-dark-200/50 dark:border-white/10 shadow-xl">
                <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-dark-900 dark:text-white">Office Hours</h3>

                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base">
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

                {/* Quick WhatsApp CTA */}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello! I\'d like to know more about ThoughtHealer services.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-center justify-center gap-2 w-full py-3 rounded-lg text-white text-sm font-medium transition-all duration-300 hover:opacity-90 hover:shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Chat on WhatsApp Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
