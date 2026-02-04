import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TermsAndConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-800 via-dark-900 to-black">
      <Header />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Terms & Conditions
            </h1>
            <p className="text-dark-300 text-lg">
              Last Updated: February 4, 2026
            </p>
          </div>

          {/* Content */}
          <div className="bg-dark-700/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 space-y-8">
            
            {/* Agreement */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
              <p className="text-dark-300 leading-relaxed">
                By accessing and using Thought Healer's services, including ThoughtPro, MiniMinds, and HerMind platforms ("Services"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms, please do not use our Services. These Terms constitute a legally binding agreement between you and Thought Healer Pvt. Ltd.
              </p>
            </section>

            {/* Services Description */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Services Description</h2>
              
              <h3 className="text-xl font-semibold text-primary-400 mb-3 mt-4">2.1 ThoughtPro</h3>
              <p className="text-dark-300 leading-relaxed">
                Online mental health counseling and therapy services for adults, including individual therapy sessions, group therapy, and self-help resources.
              </p>

              <h3 className="text-xl font-semibold text-primary-400 mb-3 mt-4">2.2 MiniMinds</h3>
              <p className="text-dark-300 leading-relaxed">
                Specialized mental health services for children and adolescents, requiring parental or guardian consent for users under 18 years of age.
              </p>

              <h3 className="text-xl font-semibold text-primary-400 mb-3 mt-4">2.3 HerMind</h3>
              <p className="text-dark-300 leading-relaxed">
                Dedicated mental health support services focusing on women's mental health, including pregnancy, postpartum, and women-specific issues.
              </p>

              <h3 className="text-xl font-semibold text-primary-400 mb-3 mt-4">2.4 ThoughtPro B2B</h3>
              <p className="text-dark-300 leading-relaxed">
                Corporate mental wellness programs and employee assistance programs for organizations.
              </p>
            </section>

            {/* Eligibility */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Eligibility and Registration</h2>
              <p className="text-dark-300 leading-relaxed mb-3">
                To use our Services, you must:
              </p>
              <ul className="list-disc list-inside text-dark-300 space-y-2 ml-4">
                <li>Be at least 18 years old (or have parental consent for MiniMinds)</li>
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Not impersonate any person or entity</li>
                <li>Not use the Services if you have been previously banned</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
              <p className="text-dark-300 leading-relaxed mt-3">
                You are responsible for all activities that occur under your account. Notify us immediately of any unauthorized use of your account.
              </p>
            </section>

            {/* Not Emergency Services */}
            <section className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-red-400 mb-4">4. Not for Emergency Situations</h2>
              <p className="text-dark-300 leading-relaxed mb-3">
                <strong className="text-white">IMPORTANT:</strong> Our Services are NOT designed for emergency situations or crisis intervention.
              </p>
              <p className="text-dark-300 leading-relaxed mb-3">
                If you are experiencing a medical or psychiatric emergency, including thoughts of harming yourself or others, immediately:
              </p>
              <ul className="list-disc list-inside text-dark-300 space-y-2 ml-4">
                <li>Call emergency services (911 or your local emergency number)</li>
                <li>Go to the nearest emergency room</li>
                <li>Contact a suicide prevention hotline</li>
                <li>Contact your local crisis center</li>
              </ul>
              <p className="text-dark-300 leading-relaxed mt-3">
                Do not use our Services for urgent matters requiring immediate attention.
              </p>
            </section>

            {/* Professional Relationship */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Professional Relationship</h2>
              <p className="text-dark-300 leading-relaxed mb-3">
                Our licensed therapists and psychologists provide professional mental health services subject to the following:
              </p>
              <ul className="list-disc list-inside text-dark-300 space-y-2 ml-4">
                <li>A therapist-client relationship is established upon your first session</li>
                <li>All therapists are licensed professionals in their respective jurisdictions</li>
                <li>Therapists adhere to their professional code of ethics and standards</li>
                <li>The therapist-client relationship is professional and confidential</li>
                <li>You have the right to change therapists at any time</li>
                <li>Therapists may terminate services if clinically appropriate or if you violate these Terms</li>
              </ul>
            </section>

            {/* Confidentiality */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Confidentiality and Privacy</h2>
              <p className="text-dark-300 leading-relaxed mb-3">
                We maintain strict confidentiality standards:
              </p>
              <ul className="list-disc list-inside text-dark-300 space-y-2 ml-4">
                <li>Your therapy sessions and communications are confidential</li>
                <li>Information is protected under applicable privacy laws and professional ethics</li>
                <li>We may break confidentiality only when legally required or to prevent harm</li>
                <li>Session recordings (if any) are encrypted and securely stored</li>
                <li>Please refer to our Privacy Policy for complete information</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-primary-400 mb-3 mt-4">6.1 Exceptions to Confidentiality</h3>
              <p className="text-dark-300 leading-relaxed mb-3">
                Confidentiality may be broken in the following situations:
              </p>
              <ul className="list-disc list-inside text-dark-300 space-y-2 ml-4">
                <li>Imminent danger to yourself or others</li>
                <li>Suspected abuse or neglect of a child, elderly person, or vulnerable adult</li>
                <li>Court order or legal requirement</li>
                <li>With your written consent</li>
                <li>For quality assurance and supervision (with identifying information removed)</li>
              </ul>
            </section>

            {/* Payment and Subscriptions */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Payment Terms and Subscriptions</h2>
              
              <h3 className="text-xl font-semibold text-primary-400 mb-3">7.1 Subscription Plans</h3>
              <p className="text-dark-300 leading-relaxed mb-3">
                Our Services are available through various subscription plans:
              </p>
              <ul className="list-disc list-inside text-dark-300 space-y-2 ml-4">
                <li>Monthly subscriptions renew automatically unless cancelled</li>
                <li>Annual subscriptions provide discounted rates</li>
                <li>Pricing is subject to change with 30 days' notice</li>
                <li>All fees are in Indian Rupees (INR) unless otherwise stated</li>
                <li>Promotional codes and discounts have specific terms and expiration dates</li>
              </ul>

              <h3 className="text-xl font-semibold text-primary-400 mb-3 mt-4">7.2 Payment Processing</h3>
              <ul className="list-disc list-inside text-dark-300 space-y-2 ml-4">
                <li>We accept major credit/debit cards and UPI payments</li>
                <li>Payment information is processed securely through third-party payment processors</li>
                <li>You authorize us to charge your payment method for subscription fees</li>
                <li>Failed payments may result in service suspension</li>
                <li>You are responsible for all applicable taxes</li>
              </ul>

              <h3 className="text-xl font-semibold text-primary-400 mb-3 mt-4">7.3 Refund Policy</h3>
              <p className="text-dark-300 leading-relaxed mb-3">
                Our refund policy is as follows:
              </p>
              <ul className="list-disc list-inside text-dark-300 space-y-2 ml-4">
                <li>Full refund available within 7 days of first subscription purchase if no sessions used</li>
                <li>Pro-rated refunds may be available for unused sessions (at our discretion)</li>
                <li>No refunds for partially used subscription periods after 7 days</li>
                <li>Refund requests must be submitted to <a href="mailto:support@thoughthealer.com" className="text-primary-400 hover:underline">support@thoughthealer.com</a></li>
                <li>Refunds are processed within 10-15 business days</li>
              </ul>
            </section>

            {/* Cancellation */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Cancellation and Termination</h2>
              
              <h3 className="text-xl font-semibold text-primary-400 mb-3">8.1 Your Right to Cancel</h3>
              <p className="text-dark-300 leading-relaxed mb-3">
                You may cancel your subscription at any time:
              </p>
              <ul className="list-disc list-inside text-dark-300 space-y-2 ml-4">
                <li>Cancel through your account settings or contact support</li>
                <li>Cancellation takes effect at the end of the current billing period</li>
                <li>You retain access to Services until the end of the paid period</li>
                <li>Download your data before cancellation (if needed)</li>
              </ul>

              <h3 className="text-xl font-semibold text-primary-400 mb-3 mt-4">8.2 Our Right to Terminate</h3>
              <p className="text-dark-300 leading-relaxed mb-3">
                We may suspend or terminate your access if:
              </p>
              <ul className="list-disc list-inside text-dark-300 space-y-2 ml-4">
                <li>You violate these Terms</li>
                <li>You engage in fraudulent or illegal activities</li>
                <li>You harass or threaten our staff or therapists</li>
                <li>Your account shows signs of unauthorized access</li>
                <li>For any other reason at our sole discretion</li>
              </ul>
            </section>

            {/* User Conduct */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Acceptable Use and User Conduct</h2>
              <p className="text-dark-300 leading-relaxed mb-3">
                You agree NOT to:
              </p>
              <ul className="list-disc list-inside text-dark-300 space-y-2 ml-4">
                <li>Share your account credentials with others</li>
                <li>Use the Services for any illegal purpose</li>
                <li>Harass, abuse, or threaten therapists or other users</li>
                <li>Upload viruses, malware, or malicious code</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Record sessions without explicit consent</li>
                <li>Share confidential information of others</li>
                <li>Use automated systems or bots to access Services</li>
                <li>Reverse engineer or copy our platform</li>
                <li>Resell or redistribute our Services</li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. Intellectual Property Rights</h2>
              <p className="text-dark-300 leading-relaxed mb-3">
                All content and materials on our platform are owned by Thought Healer or licensed to us:
              </p>
              <ul className="list-disc list-inside text-dark-300 space-y-2 ml-4">
                <li>Platform design, code, and functionality are our proprietary property</li>
                <li>Therapeutic resources, articles, and tools are copyrighted</li>
                <li>Trademarks and logos are protected</li>
                <li>You may not copy, modify, or distribute our content without permission</li>
                <li>User-generated content remains your property, but you grant us a license to use it</li>
              </ul>
            </section>

            {/* Disclaimer of Warranties */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">11. Disclaimer of Warranties</h2>
              <p className="text-dark-300 leading-relaxed mb-3">
                <strong className="text-white">SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE":</strong>
              </p>
              <ul className="list-disc list-inside text-dark-300 space-y-2 ml-4">
                <li>We do not guarantee uninterrupted or error-free service</li>
                <li>We do not warrant specific outcomes from therapy</li>
                <li>Technical issues may occasionally occur</li>
                <li>Therapist availability is not guaranteed</li>
                <li>We make no warranties regarding cure or treatment efficacy</li>
              </ul>
              <p className="text-dark-300 leading-relaxed mt-3">
                While our therapists are licensed professionals, results may vary. Therapy is a collaborative process and outcomes depend on many factors including your active participation.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">12. Limitation of Liability</h2>
              <p className="text-dark-300 leading-relaxed mb-3">
                To the maximum extent permitted by law:
              </p>
              <ul className="list-disc list-inside text-dark-300 space-y-2 ml-4">
                <li>We are not liable for indirect, incidental, or consequential damages</li>
                <li>Our total liability is limited to the fees you paid in the past 12 months</li>
                <li>We are not liable for third-party service failures</li>
                <li>We are not liable for data loss due to technical issues</li>
                <li>You use the Services at your own risk</li>
              </ul>
            </section>

            {/* Indemnification */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">13. Indemnification</h2>
              <p className="text-dark-300 leading-relaxed">
                You agree to indemnify and hold harmless Thought Healer, its affiliates, therapists, employees, and partners from any claims, damages, losses, or expenses (including legal fees) arising from your use of Services, violation of these Terms, or infringement of any third-party rights.
              </p>
            </section>

            {/* Dispute Resolution */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">14. Dispute Resolution and Governing Law</h2>
              
              <h3 className="text-xl font-semibold text-primary-400 mb-3">14.1 Informal Resolution</h3>
              <p className="text-dark-300 leading-relaxed">
                If you have a dispute, please contact us first at <a href="mailto:support@thoughthealer.com" className="text-primary-400 hover:underline">support@thoughthealer.com</a>. We will attempt to resolve the matter informally.
              </p>

              <h3 className="text-xl font-semibold text-primary-400 mb-3 mt-4">14.2 Arbitration</h3>
              <p className="text-dark-300 leading-relaxed">
                Any disputes that cannot be resolved informally shall be resolved through binding arbitration in accordance with the Arbitration and Conciliation Act, 1996, in [Your City], India.
              </p>

              <h3 className="text-xl font-semibold text-primary-400 mb-3 mt-4">14.3 Governing Law</h3>
              <p className="text-dark-300 leading-relaxed">
                These Terms are governed by the laws of India. You consent to the exclusive jurisdiction of courts in [Your City], India.
              </p>
            </section>

            {/* Modifications */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">15. Modifications to Terms</h2>
              <p className="text-dark-300 leading-relaxed">
                We reserve the right to modify these Terms at any time. We will notify you of material changes via email or through the platform. Your continued use of Services after changes constitutes acceptance of the modified Terms. If you do not agree to the changes, you may cancel your subscription.
              </p>
            </section>

            {/* Severability */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">16. Severability and Waiver</h2>
              <p className="text-dark-300 leading-relaxed">
                If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force. Our failure to enforce any right or provision does not constitute a waiver of such right or provision.
              </p>
            </section>

            {/* Entire Agreement */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">17. Entire Agreement</h2>
              <p className="text-dark-300 leading-relaxed">
                These Terms, together with our Privacy Policy and any other legal notices published on the platform, constitute the entire agreement between you and Thought Healer regarding the Services.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">18. Contact Us</h2>
              <p className="text-dark-300 leading-relaxed mb-3">
                For questions about these Terms, please contact us:
              </p>
              <div className="bg-dark-800/50 rounded-lg p-6 space-y-2">
                <p className="text-white"><strong>Email:</strong> <a href="mailto:legal@thoughthealer.com" className="text-primary-400 hover:underline">legal@thoughthealer.com</a></p>
                <p className="text-white"><strong>Support:</strong> <a href="mailto:support@thoughthealer.com" className="text-primary-400 hover:underline">support@thoughthealer.com</a></p>
                <p className="text-white"><strong>Phone:</strong> +91 1234567890</p>
                <p className="text-white"><strong>Address:</strong> Thought Healer Pvt. Ltd., [Your Address]</p>
              </div>
            </section>

            {/* Acknowledgment */}
            <section className="bg-primary-500/10 border border-primary-500/30 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-primary-400 mb-4">19. Acknowledgment</h2>
              <p className="text-dark-300 leading-relaxed">
                BY USING OUR SERVICES, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS AND CONDITIONS. IF YOU DO NOT AGREE, PLEASE DO NOT USE OUR SERVICES.
              </p>
            </section>

            {/* Back to Home */}
            <div className="text-center pt-8 border-t border-dark-600">
              <Link 
                to="/" 
                className="inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors duration-300"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsAndConditions;
