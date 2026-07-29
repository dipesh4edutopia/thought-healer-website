import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';

const Cookies = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-800 via-dark-900 to-black">
      <SEOHead
        title="Cookie Policy | ThoughtHealer"
        description="ThoughtHealer Cookie Policy. Learn about how ThoughtHealer uses cookies and similar tracking technologies across its mental wellness apps and website."
        canonical="https://thoughthealer.org/cookies"
      />
      <Header />
      
      <main className="py-24 bg-dark-900 dark:bg-dark-950">
        <div className="max-w-3xl mx-auto bg-dark-800 dark:bg-dark-700 p-10 rounded-2xl shadow-xl">
          
          {/* Page heading */}
          <h1 className="text-5xl font-extrabold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-400">
            Cookies Policy
          </h1>
          <p className="text-center text-gray-400 mb-8">
            Company Name: Synept Labs Pvt Ltd<br />
            Email: <a href="mailto:connect@thoughthealer.org" className="text-primary-400 hover:underline">connect@thoughthealer.org</a>
          </p>
          
          {/* Divider */}
          <div className="h-px bg-gray-700 mb-10"></div>
          
          {/* Cookie content */}
          <section className="space-y-8 text-gray-300 leading-relaxed">

            <p>
              At <strong>Thought Healer Pvt. Ltd.</strong>, your trust matters deeply to us. Just as we are committed to protecting what you share in therapy, we are equally careful about how we handle the small pieces of information collected when you visit our website or use our platforms — including ThoughtPro, MiniMinds, HerMind, and ThoughtPro B2B. This Cookie Policy explains how and why we use cookies and similar technologies across our services.
            </p>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">What Are Cookies?</h2>
              <p>
                Cookies are small text files stored on your device when you access a website or application. They help our platform recognize your device, remember your preferences, and improve overall functionality. Cookies do not give us access to your device beyond what is necessary to provide and enhance our services.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">How We Use Cookies</h2>
              <p>
                We use cookies primarily to ensure that our platform operates smoothly and securely. Certain cookies are essential for core functionality, including secure login, session stability, fraud prevention, and secure payment processing. Without these essential cookies, parts of our services may not function properly.
              </p>
              <p>
                We may also use cookies to understand how visitors interact with our platform. This allows us to improve user experience, identify technical issues, strengthen security, and optimize performance. Information collected through these cookies may include browser type, device type, IP address, pages visited, session duration, and general usage patterns. This data is generally aggregated and does not directly identify you as an individual.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">Third-Party Cookies</h2>
              <p>
                In some cases, we may use trusted third-party service providers such as analytics platforms or payment processors, who may place cookies on your device. These providers operate under their own privacy and security standards, and we require them to implement appropriate safeguards when handling data.
              </p>
              <p>
                Thought Healer does not sell your personal information to advertisers and does not use cookies for intrusive tracking or behavioral advertising related to therapy sessions.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">What Cookies Do Not Store</h2>
              <p>
                Therapy session content, chat communications, clinical records, and any confidential mental health information are never stored in cookies.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">Your Choices and Controls</h2>
              <p>
                You can manage or disable cookies through your browser settings. Most browsers allow you to delete existing cookies, block future cookies, or receive notifications when cookies are being placed. Please note that disabling essential cookies may affect certain features of our platform, including secure login and access to services.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">Legal Compliance and Consent</h2>
              <p>
                Where required under applicable law, including the Digital Personal Data Protection Act, 2023 (India), we obtain your consent before placing non-essential cookies on your device. By continuing to use our website or services after being informed about our cookie practices, you consent to the use of cookies as described in this Policy.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">Updates to This Policy</h2>
              <p>
                We may update this Cookie Policy from time to time to reflect changes in technology, legal requirements, or platform functionality. Significant updates will be communicated through our website or application.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">Contact Us</h2>
              <p>
                If you have questions about how cookies are used or how your data is handled, please contact us at 
                <a href="mailto:legal@thoughthealer.com" className="text-primary-400 hover:underline"> legal@thoughthealer.com</a>.
              </p>
            </div>

            <p className="italic text-gray-400">
              At Thought Healer, privacy is not just compliance — it is part of the care we provide.
            </p>

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

export default Cookies;
