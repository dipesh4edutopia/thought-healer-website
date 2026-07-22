import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark-900 dark:bg-dark-950 text-white py-12 sm:py-14 md:py-16 relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-neural-pattern bg-repeat opacity-5"></div>

      {/* Subtle glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-primary-500/5 dark:bg-primary-400/5 blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-10 md:mb-12">
          {/* Company Info */}
          <div data-aos="fade-up">
            <div className="mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-display font-bold mb-2">
                <span className="gradient-text">Thought</span>Healer
              </h3>
              <p className="text-dark-400 text-sm">
                Pioneering mental wellness through innovative technology and compassionate care.
              </p>
            </div>

            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-primary-500 hover:border-primary-500 transition-all duration-300">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-primary-500 hover:border-primary-500 transition-all duration-300">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-primary-500 hover:border-primary-500 transition-all duration-300">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-primary-500 hover:border-primary-500 transition-all duration-300">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div data-aos="fade-up" data-aos-delay="100">
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="text-dark-400 hover:text-primary-400 transition-colors duration-300 flex items-center group">
                  <i className="fas fa-chevron-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-dark-400 hover:text-primary-400 transition-colors duration-300 flex items-center group">
                  <i className="fas fa-chevron-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>
                  About Us
                </a>
              </li>
              <li>
                <a href="#team" className="text-dark-400 hover:text-primary-400 transition-colors duration-300 flex items-center group">
                  <i className="fas fa-chevron-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>
                  Our Team
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-dark-400 hover:text-primary-400 transition-colors duration-300 flex items-center group">
                  <i className="fas fa-chevron-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>
                  Pricing
                </a>
              </li>
              <li>
                <a href="#contact" className="text-dark-400 hover:text-primary-400 transition-colors duration-300 flex items-center group">
                  <i className="fas fa-chevron-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div data-aos="fade-up" data-aos-delay="200">
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Our Products</h4>
            <ul className="space-y-3">
              <li>
                <a href="/thoughtpro" className="text-dark-400 hover:text-primary-400 transition-colors duration-300 flex items-center group">
                  <i className="fas fa-chevron-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>
                  ThoughtPro
                </a>
              </li>
              <li>
                <a href="/thoughtpro-b2b" className="text-dark-400 hover:text-primary-400 transition-colors duration-300 flex items-center group">
                  <i className="fas fa-chevron-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>
                  ThoughtPro B2B
                </a>
              </li>
              {/* <li>
                <a href="#" className="text-dark-400 hover:text-primary-400 transition-colors duration-300 flex items-center group">
                  <i className="fas fa-chevron-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>
                  Thought Healer
                </a>
              </li> */}
              <li>
                <a href="/miniminds" className="text-dark-400 hover:text-primary-400 transition-colors duration-300 flex items-center group">
                  <i className="fas fa-chevron-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>
                  MiniMinds
                </a>
              </li>
              <li>
                <a href="/hermind" className="text-dark-400 hover:text-primary-400 transition-colors duration-300 flex items-center group">
                  <i className="fas fa-chevron-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>
                  HerMind
                </a>
              </li>
              <li>
                <a href="/les" className="text-teal-400 hover:text-teal-300 font-semibold transition-colors duration-300 flex items-center group">
                  <i className="fas fa-chevron-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>
                  LES (Learning Enhancement)
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div data-aos="fade-up" data-aos-delay="300">
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/terms-and-conditions" className="text-dark-400 hover:text-primary-400 transition-colors duration-300 flex items-center group">
                  <i className="fas fa-chevron-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-dark-400 hover:text-primary-400 transition-colors duration-300 flex items-center group">
                  <i className="fas fa-chevron-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-dark-400 hover:text-primary-400 transition-colors duration-300 flex items-center group">
                  <i className="fas fa-chevron-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-dark-400 hover:text-primary-400 transition-colors duration-300 flex items-center group">
                  <i className="fas fa-chevron-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <p className="text-dark-400 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} ThoughtHealer. All rights reserved.
            </p>

            {/* Additional Links */}
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-dark-400 hover:text-primary-400 transition-colors duration-300">
                Support
              </a>
              <a href="#" className="text-dark-400 hover:text-primary-400 transition-colors duration-300">
                Help Center
              </a>
              <a href="#contact" className="text-dark-400 hover:text-primary-400 transition-colors duration-300">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
