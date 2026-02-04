import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
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
              Privacy Policy
            </h1>
            <p className="text-dark-300 text-lg">
              Last Updated: February 4, 2026
            </p>
          </div>

          {/* Content */}
          <div className="bg-dark-700/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 space-y-8">
            
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
              <p className="text-dark-300 leading-relaxed">
                Welcome to Thought Healer. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mental health services, including ThoughtPro, MiniMinds, and HerMind platforms.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-primary-400 mb-3 mt-4">2.1 Personal Information</h3>
              <p className="text-dark-300 leading-relaxed mb-3">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside text-dark-300 space-y-2 ml-4">
                <li>Full name, email address, and phone number</li>
                <li>Age, gender, and demographic information</li>
                <li>Payment and billing information</li>
                <li>Emergency contact details</li>
                <li>Health information and mental health history (when provided)</li>
              </ul>

              <h3 className="text-xl font-semibold text-primary-400 mb-3 mt-4">2.2 Session Information</h3>
              <p className="text-dark-300 leading-relaxed mb-3">
                When you participate in therapy sessions or use our services:
              </p>
              <ul className="list-disc list-inside text-dark-300 space-y-2 ml-4">
                <li>Session notes and recordings (with your consent)</li>
                <li>Communication between you and your therapist</li>
                <li>Assessment results and progress tracking data</li>
                <li>Appointment scheduling and attendance records</li>
              </ul>

              <h3 className="text-xl font-semibold text-primary-400 mb-3 mt-4">2.3 Technical Information</h3>
              <p className="text-dark-300 leading-relaxed mb-3">
                We automatically collect certain information when you use our platform:
              </p>
              <ul className="list-disc list-inside text-dark-300 space-y-2 ml-4">
                <li>Device information (IP address, browser type, operating system)</li>
                <li>Usage data (pages visited, time spent, features used)</li>
                <li>Cookies and similar tracking technologies</li>
                <li>Location data (if you grant permission)</li>
              </ul>
            </section>

            {/* How We Use Your Information */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
              <p className="text-dark-300 leading-relaxed mb-3">
                We use the collected information for the following purposes:
              </p>
              <ul className="list-disc list-inside text-dark-300 space-y-2 ml-4">
                <li>Providing and improving mental health services and therapy sessions</li>
                <li>Matching you with appropriate therapists and psychologists</li>
                <li>Processing payments and managing subscriptions</li>
                <li>Communicating with you about appointments, updates, and support</li>
                <li>Ensuring platform security and preventing fraud</li>
                <li>Conducting research and analysis to improve our services (anonymized data)</li>
                <li>Complying with legal obligations and regulatory requirements</li>
                <li>Sending promotional materials (only with your consent)</li>
              </ul>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
              <p className="text-dark-300 leading-relaxed mb-3">
                We implement industry-standard security measures to protect your information:
              </p>
              <ul className="list-disc list-inside text-dark-300 space-y-2 ml-4">
                <li>End-to-end encryption for all therapy sessions and communications</li>
                <li>Secure SSL/TLS connections for data transmission</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Restricted access to personal information (only authorized personnel)</li>
                <li>Secure data storage with encrypted databases</li>
                <li>Multi-factor authentication for sensitive operations</li>
                <li>Regular backup and disaster recovery procedures</li>
              </ul>
              <p className="text-dark-300 leading-relaxed mt-3">
                However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee absolute security.
              </p>
            </section>

            {/* Information Sharing */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Information Sharing and Disclosure</h2>
              <p className="text-dark-300 leading-relaxed mb-3">
                We do not sell your personal information. We may share your information only in the following circumstances:
              </p>
              
              <h3 className="text-xl font-semibold text-primary-400 mb-3 mt-4">5.1 With Your Consent</h3>
              <p className="text-dark-300 leading-relaxed">
                We may share information when you explicitly authorize us to do so.
              </p>

              <h3 className="text-xl font-semibold text-primary-400 mb-3 mt-4">5.2 With Healthcare Providers</h3>
              <p className="text-dark-300 leading-relaxed">
                Your information is shared with the therapists and psychologists providing your care, bound by professional confidentiality obligations.
              </p>

              <h3 className="text-xl font-semibold text-primary-400 mb-3 mt-4">5.3 Service Providers</h3>
              <p className="text-dark-300 leading-relaxed">
                We work with third-party service providers for payment processing, hosting, and analytics. These providers are contractually obligated to protect your information.
              </p>

              <h3 className="text-xl font-semibold text-primary-400 mb-3 mt-4">5.4 Legal Requirements</h3>
              <p className="text-dark-300 leading-relaxed mb-3">
                We may disclose information when required by law or in the following situations:
              </p>
              <ul className="list-disc list-inside text-dark-300 space-y-2 ml-4">
                <li>To comply with legal processes (subpoenas, court orders)</li>
                <li>To protect against harm or illegal activity</li>
                <li>In cases of imminent danger to self or others</li>
                <li>To protect our rights, property, or safety</li>
              </ul>

              <h3 className="text-xl font-semibold text-primary-400 mb-3 mt-4">5.5 Business Transfers</h3>
              <p className="text-dark-300 leading-relaxed">
                In the event of a merger, acquisition, or sale of assets, your information may be transferred. We will notify you before your information becomes subject to a different privacy policy.
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights and Choices</h2>
              <p className="text-dark-300 leading-relaxed mb-3">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-dark-300 space-y-2 ml-4">
                <li><strong className="text-white">Access:</strong> Request a copy of your personal information</li>
                <li><strong className="text-white">Correction:</strong> Update or correct inaccurate information</li>
                <li><strong className="text-white">Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
                <li><strong className="text-white">Portability:</strong> Receive your data in a structured, machine-readable format</li>
                <li><strong className="text-white">Opt-out:</strong> Unsubscribe from marketing communications</li>
                <li><strong className="text-white">Restrict Processing:</strong> Limit how we use your information</li>
                <li><strong className="text-white">Object:</strong> Object to processing based on legitimate interests</li>
              </ul>
              <p className="text-dark-300 leading-relaxed mt-3">
                To exercise these rights, please contact us at <a href="mailto:privacy@thoughthealer.com" className="text-primary-400 hover:underline">privacy@thoughthealer.com</a>.
              </p>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Cookies and Tracking Technologies</h2>
              <p className="text-dark-300 leading-relaxed mb-3">
                We use cookies and similar technologies to enhance your experience:
              </p>
              <ul className="list-disc list-inside text-dark-300 space-y-2 ml-4">
                <li><strong className="text-white">Essential Cookies:</strong> Required for platform functionality</li>
                <li><strong className="text-white">Analytics Cookies:</strong> Help us understand how you use our services</li>
                <li><strong className="text-white">Preference Cookies:</strong> Remember your settings and preferences</li>
                <li><strong className="text-white">Marketing Cookies:</strong> Deliver relevant advertisements (with consent)</li>
              </ul>
              <p className="text-dark-300 leading-relaxed mt-3">
                You can control cookies through your browser settings. However, disabling certain cookies may affect platform functionality.
              </p>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Children's Privacy</h2>
              <p className="text-dark-300 leading-relaxed">
                Our MiniMinds service is designed for children and adolescents. We take extra precautions to protect children's privacy and require parental consent for users under 18. Parents/guardians have the right to access, modify, or delete their child's information at any time.
              </p>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Data Retention</h2>
              <p className="text-dark-300 leading-relaxed">
                We retain your personal information for as long as necessary to provide our services and comply with legal obligations. Therapy session records are maintained according to professional and legal requirements, typically 7-10 years after your last session. When data is no longer needed, we securely delete or anonymize it.
              </p>
            </section>

            {/* International Data Transfers */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. International Data Transfers</h2>
              <p className="text-dark-300 leading-relaxed">
                Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy and applicable data protection laws.
              </p>
            </section>

            {/* Changes to Privacy Policy */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">11. Changes to This Privacy Policy</h2>
              <p className="text-dark-300 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. Your continued use of our services after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">12. Contact Us</h2>
              <p className="text-dark-300 leading-relaxed mb-3">
                If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-dark-800/50 rounded-lg p-6 space-y-2">
                <p className="text-white"><strong>Email:</strong> <a href="mailto:privacy@thoughthealer.com" className="text-primary-400 hover:underline">privacy@thoughthealer.com</a></p>
                <p className="text-white"><strong>Phone:</strong> +91 1234567890</p>
                <p className="text-white"><strong>Address:</strong> Thought Healer Pvt. Ltd., [Your Address]</p>
              </div>
            </section>

            {/* HIPAA Compliance */}
            <section className="border-t border-dark-600 pt-8">
              <h2 className="text-2xl font-bold text-white mb-4">13. HIPAA Compliance Notice</h2>
              <p className="text-dark-300 leading-relaxed">
                For users in applicable jurisdictions, we comply with HIPAA (Health Insurance Portability and Accountability Act) requirements. Protected Health Information (PHI) is handled with the utmost care and security. You may request a copy of our Notice of Privacy Practices for additional details on how we protect your health information.
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

export default PrivacyPolicy;
