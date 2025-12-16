import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import CardSection from '../components/CardSection';
import ServicesSection from '../components/ServicesSection';
import FeaturesSection from '../components/FeaturesSection';
import AboutSection from '../components/AboutSection';
import TeamSection from '../components/TeamSection';
import PricingSection from '../components/PricingSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="scroll-smooth">
      <Header />
      <HeroSection />
      <CardSection />
      <ServicesSection />
      <FeaturesSection />
      <AboutSection />
      <TeamSection />
      <PricingSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;
