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
      
      <main className="py-24 bg-dark-900 dark:bg-dark-950">
        <div className="max-w-3xl mx-auto bg-dark-800 dark:bg-dark-700 p-10 rounded-2xl shadow-xl">
          
          {/* Page heading */}
          <h1 className="text-5xl font-extrabold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-400">
            Privacy Policy
          </h1>
          <p className="text-center text-gray-400 mb-8">
            Effective Date: 11-06-2025<br />
            Company Name: Synept Labs Pvt Ltd<br />
            Email: <a href="mailto:connect@thoughthealer.org" className="text-primary-400 hover:underline">connect@thoughthealer.org</a>
          </p>
          {/* Divider */}
          <div className="h-px bg-gray-700 mb-10"></div>
          
          {/* Policy content */}
          <div className="space-y-8">
            <section className="space-y-8 text-gray-300 leading-relaxed">

              <p>
                At <strong>Thought Healer Pvt. Ltd.</strong>, your privacy is not merely a legal obligation — it is a responsibility grounded in trust. When you choose to share your thoughts, emotions, and personal experiences with us through ThoughtPro, MiniMinds, HerMind, or ThoughtPro B2B, you are placing meaningful trust in our platform. This Privacy Policy explains how we collect, use, safeguard, and manage your information when you access our services.
              </p>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">Information We Collect</h2>
                <p>
                  When you use our services, we may collect personal information such as your name, email address, phone number, date of birth, and payment details. For users registering under MiniMinds, we may also collect parent or guardian information where legally required.
                </p>
                <p>
                  As a mental health service provider, you may choose to share sensitive personal information including emotional concerns, therapy session details, medical background, or mental health history. Such information is collected solely to provide safe, effective, and personalized support — and, where required, only with your explicit consent.
                </p>
                <p>
                  We may also automatically collect certain technical information such as IP address, device type, browser details, session timestamps, and basic usage data. This helps us improve the functionality, performance, and security of our platform.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">How We Use Your Information</h2>
                <p>
                  Your information is used to deliver therapy and mental wellness services, match you with appropriate professionals, manage appointments, process payments, enhance user experience, and comply with applicable legal requirements. We do not sell your personal information to third parties. Your data is used only for legitimate service-related and operational purposes.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">Confidentiality and Ethical Standards</h2>
                <p>
                  Confidentiality is central to our practice. All therapy sessions and communications are treated with strict confidentiality in accordance with professional ethical standards. However, confidentiality may be legally limited in certain circumstances, including situations involving imminent risk of harm to you or others, suspected abuse or neglect of a minor or vulnerable individual, or where disclosure is required by law or court order. Outside of such limited situations, your information remains private and protected.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">Data Protection and Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to safeguard your information. These include encrypted communications where applicable, secure cloud storage, controlled internal access, and secure payment processing through trusted third-party providers. While we use industry-standard security practices, no digital system can guarantee absolute security.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">Data Retention</h2>
                <p>
                  We retain your information only for as long as necessary to provide services and comply with legal and professional record-keeping obligations applicable to mental health services. After the required retention period, your data is securely deleted or anonymized.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">Corporate Wellness Programs</h2>
                <p>
                  If you access our services through a corporate wellness or B2B program, we may provide anonymized and aggregated usage reports to the organization. These reports never include personal therapy details or any identifiable information about individual users.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">Children and Minors</h2>
                <p>
                  For users under the age of 18 accessing MiniMinds, parental or guardian consent is required. We take special care to ensure children's information is handled in accordance with applicable child data protection laws.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">Your Rights</h2>
                <p>
                  Depending on applicable law, you may have the right to access your information, request corrections, withdraw consent, request deletion, or restrict certain processing activities. To exercise your rights, please contact us at 
                  <a href="mailto:legal@thoughthealer.com" className="text-primary-400 hover:underline"> legal@thoughthealer.com</a>.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">International Access</h2>
                <p>
                  If you access our services from outside India, your information may be processed in India or other jurisdictions where our service providers operate. We ensure that appropriate safeguards are implemented to protect your data during such transfers.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">Emergency Situations</h2>
                <p>
                  Our services are not designed for emergency situations. If you are experiencing a mental health crisis or medical emergency, please contact local emergency services or a crisis helpline immediately rather than relying solely on our platform.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">Policy Updates</h2>
                <p>
                  We may update this Privacy Policy from time to time to reflect legal, operational, or service-related changes. When significant changes are made, we will notify you via email or platform notifications. Continued use of our services after updates constitutes acceptance of the revised policy.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">Contact Us</h2>
                <p>
                  If you have any questions regarding this Privacy Policy or how your data is handled, you may contact Thought Healer Pvt. Ltd. at 
                  <a href="mailto:legal@thoughthealer.com" className="text-primary-400 hover:underline"> legal@thoughthealer.com</a> 
                  or 
                  <a href="mailto:support@thoughthealer.com" className="text-primary-400 hover:underline"> support@thoughthealer.com</a>.
                </p>
              </div>

              <p>
                By using our services, you acknowledge that you have read, understood, and agreed to this Privacy Policy and consent to the collection and use of your information as described above.
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
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
