import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';

const TermsAndConditions = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-800 via-dark-900 to-black">
      <SEOHead
        title="Terms and Conditions | ThoughtHealer"
        description="ThoughtHealer Terms and Conditions. Read the terms governing your use of ThoughtPro, MiniMinds, HerMind, and LES apps by Synept Lab Private Limited."
        canonical="https://thoughthealer.org/terms-and-conditions"
      />
      <Header />
      
      <main className="py-24 bg-dark-900 dark:bg-dark-950">
        <div className="max-w-3xl mx-auto bg-dark-800 dark:bg-dark-700 p-10 rounded-2xl shadow-xl">
          
          {/* Heading */}
          <h1 className="text-5xl font-extrabold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-400">
            Terms &amp; Conditions
          </h1>
          <p className="text-center text-gray-400 mb-8">
            Company Name: Synept Labs Pvt Ltd<br />
            Email: <a href="mailto:connect@thoughthealer.org" className="text-primary-400 hover:underline">connect@thoughthealer.org</a>
          </p>
          
          {/* Divider */}
          <div className="h-px bg-gray-700 mb-10"></div>
          
          {/* Terms content */}
          <section className="space-y-10 text-gray-300 leading-relaxed text-justify">

            <div>
              <p>
                Welcome to <span className="text-white font-semibold">Thought Healer</span>. By accessing or using our services, including ThoughtPro, MiniMinds, HerMind, and ThoughtPro B2B, you are entering into a legally binding agreement with Thought Healer Pvt. Ltd. These Terms and Conditions explain the rules, responsibilities, and boundaries that guide how our platform works. If you do not agree with these Terms, we respectfully ask that you do not use our services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3">Our Services</h2>
              <p>
                Thought Healer provides online mental health and wellness support through licensed professionals and structured digital tools. ThoughtPro is designed for adults seeking therapy and counseling support. MiniMinds offers mental health services for children and adolescents and requires verified parental or legal guardian consent. HerMind focuses on women's mental health, including pregnancy and postpartum care. ThoughtPro B2B provides structured corporate mental wellness programs to organizations, where employers may receive anonymized and aggregated reports but never access to individual therapy conversations.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3">Eligibility & Accounts</h2>
              <p>
                To use our services, you must be at least 18 years old, or have proper parental or guardian consent in the case of MiniMinds. You agree to provide accurate and complete information during registration and to keep your login credentials secure. You are responsible for all activity that occurs under your account. If you suspect unauthorized access, you must notify us immediately.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3">Emergency Disclaimer</h2>
              <p>
                Our platform is designed to provide structured mental health support; however, it is not a substitute for emergency medical care. If you are experiencing suicidal thoughts, psychiatric emergencies, or immediate risk of harm to yourself or others, you must contact local emergency services, visit the nearest hospital, or reach out to a certified crisis helpline. Thought Healer does not provide crisis intervention or emergency response services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3">Therapist Relationship</h2>
              <p>
                A therapist-client relationship is formed only when you attend your first scheduled session with a licensed professional. Therapists operate in accordance with their professional licensing standards and ethical codes. While we facilitate access to professionals, clinical decisions, diagnoses, and treatment recommendations remain the responsibility of the individual therapist. You may request to change therapists at any time, and therapists may discontinue services if clinically appropriate or if these Terms are violated.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3">Confidentiality & Privacy</h2>
              <p>
                Confidentiality is central to our work. Therapy sessions and communications are treated with strict privacy and protected under applicable professional standards and data protection laws. However, confidentiality may be lawfully broken if there is imminent risk of harm, suspected abuse or neglect, a court order, or other legal obligation. Additional details regarding data handling are available in our Privacy Policy.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3">Subscriptions & Payments</h2>
              <p>
                Our services may be offered through subscriptions, individual session purchases, or corporate arrangements. Subscription plans may renew automatically unless cancelled before the renewal date. All fees are payable in Indian Rupees unless otherwise stated. We reserve the right to update pricing with appropriate notice. Payments are processed securely through third-party payment providers. Refunds, where applicable, are governed by our refund policy and applicable law.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3">Account Termination</h2>
              <p>
                You may cancel your subscription in accordance with our cancellation process. Cancellation becomes effective at the end of the current billing cycle. We reserve the right to suspend or terminate accounts if these Terms are violated, fraudulent behavior occurs, harassment toward therapists or staff happens, or security risks are detected. Termination does not eliminate outstanding payment obligations.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3">Acceptable Use</h2>
              <p>
                You agree to behave respectfully and lawfully. You must not share login credentials, record therapy sessions without consent, reverse engineer the platform, introduce malicious software, misuse services for illegal purposes, or resell access. Violations may result in termination and possible legal action.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3">Intellectual Property</h2>
              <p>
                All content on the platform, including text, branding, software, therapeutic materials, and design elements, is owned by Thought Healer Pvt. Ltd. or licensed to us. You are granted a limited personal license for individual use only. Unauthorized copying or commercial use is prohibited.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3">Limitation of Liability</h2>
              <p>
                Services are provided on an "as is" and "as available" basis. We cannot guarantee uninterrupted access or specific therapeutic outcomes. To the fullest extent permitted by law, Thought Healer shall not be liable for indirect or consequential damages. Total liability shall not exceed the amount paid in the preceding twelve months.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3">Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless Thought Healer Pvt. Ltd., its directors, employees, therapists, and affiliates from claims arising from misuse of services, violation of these Terms, or infringement of third-party rights.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3">Data Protection</h2>
              <p>
                We process personal data in accordance with applicable laws, including the Digital Personal Data Protection Act, 2023. You may have rights relating to access, correction, withdrawal of consent, or grievance redressal, as detailed in our Privacy Policy.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3">Dispute Resolution</h2>
              <p>
                We encourage informal resolution first. If unresolved, disputes shall be resolved through arbitration under the Arbitration and Conciliation Act, 1996, with jurisdiction in Pune, Maharashtra, India. These Terms are governed by the laws of India.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3">Updates to Terms</h2>
              <p>
                We may update these Terms from time to time. Continued use of services after updates indicates acceptance of revised Terms.
              </p>
            </div>

            <div>
              <p className="font-semibold text-white mt-6">
                By using Thought Healer's services, you confirm that you have read, understood, and agreed to these Terms and Conditions.
              </p>
              <p className="mt-4">
                For questions, contact:
                <a href="mailto:legal@thoughthealer.com" className="text-primary-400 hover:underline"> legal@thoughthealer.com</a> 
                or 
                <a href="mailto:support@thoughthealer.com" className="text-primary-400 hover:underline"> support@thoughthealer.com</a>
              </p>
            </div>

          </section>

          {/* Back to Home */}
          <div className="text-center pt-8 border-t border-dark-600 mt-10">
            <Link 
              to="/" 
              className="inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors duration-300"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsAndConditions;
