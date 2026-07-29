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
import SEOHead from '../components/SEOHead';

const homeSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: 'ThoughtHealer',
  alternateName: 'SyneptLabs',
  url: 'https://thoughthealer.org',
  logo: 'https://thoughthealer.org/favicon.png',
  email: 'connect@thoughthealer.org',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Pune',
    addressRegion: 'Maharashtra',
    addressCountry: 'IN',
  },
  description:
    'Comprehensive mental health monitoring and wellness platform offering ThoughtPro, MiniMinds, HerMind, and LES applications.',
  medicalSpecialty: 'MentalHealth',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Mental Wellness Apps',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'SoftwareApplication', name: 'ThoughtPro' } },
      { '@type': 'Offer', itemOffered: { '@type': 'SoftwareApplication', name: 'MiniMinds' } },
      { '@type': 'Offer', itemOffered: { '@type': 'SoftwareApplication', name: 'HerMind' } },
      { '@type': 'Offer', itemOffered: { '@type': 'SoftwareApplication', name: 'LES' } },
    ],
  },
};

const Home = () => {
  return (
    <div className="scroll-smooth">
      <SEOHead
        title="ThoughtHealer — Mental Health & Wellness Platform"
        description="Discover digital mental wellness tools for individuals, children, and women. ThoughtPro, MiniMinds, HerMind & LES apps by ThoughtHealer, Pune, India."
        canonical="https://thoughthealer.org/"
        schema={homeSchema}
      />
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

