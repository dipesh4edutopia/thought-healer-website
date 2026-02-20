import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Disclaimer = () => {
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
            Disclaimer
          </h1>
          <p className="text-center text-gray-400 mb-8">
            Company Name: Synept Labs Pvt Ltd<br />
            Email: <a href="mailto:connect@thoughthealer.org" className="text-primary-400 hover:underline">connect@thoughthealer.org</a>
          </p>
          
          {/* Divider */}
          <div className="h-px bg-gray-700 mb-10"></div>
          
          {/* Disclaimer content */}
          <section className="space-y-8 text-gray-300 leading-relaxed">

            <p>
              <strong>Thought Healer Pvt. Ltd.</strong> is committed to supporting emotional well-being and mental health through structured digital services and access to licensed professionals. However, it is important to clearly understand the scope and limitations of what our platform provides.
            </p>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">Scope of Services</h2>
              <p>
                The services offered through ThoughtPro, MiniMinds, HerMind, and ThoughtPro B2B are designed to provide mental health support, guidance, and therapeutic engagement. These services are not a substitute for in-person medical diagnosis, psychiatric treatment, emergency care, or hospitalization.
              </p>
              <p>
                While therapists available through our platform are licensed professionals, the platform itself does not provide medical advice, prescribe medication, or guarantee specific clinical outcomes.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">Emergency Situations</h2>
              <p>
                If you are experiencing a medical emergency, psychiatric crisis, suicidal thoughts, or immediate risk of harm to yourself or others, you must seek immediate assistance from local emergency services, a nearby hospital, or a certified crisis helpline.
              </p>
              <p>
                Thought Healer does not provide crisis intervention services and cannot respond to emergency situations in real time. Your safety is paramount, and emergency circumstances require immediate in-person support.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">No Guarantee of Outcomes</h2>
              <p>
                The therapeutic process is collaborative, and outcomes vary from person to person. Progress depends on multiple factors, including individual participation, personal circumstances, and external influences beyond our control. We do not guarantee improvement, recovery, or specific results from therapy sessions or self-help tools provided through the platform.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">Informational Content</h2>
              <p>
                All information, articles, resources, and educational content available on the platform are provided for informational and educational purposes only. They are not intended to replace professional medical advice, diagnosis, or treatment from a qualified healthcare provider.
              </p>
              <p>
                You should always consult an appropriate medical or mental health professional regarding physical conditions, psychiatric concerns, medication adjustments, or complex clinical matters.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">Independent Clinical Judgment</h2>
              <p>
                Therapists providing services through Thought Healer operate independently in accordance with their professional licenses and ethical guidelines. Clinical decisions, treatment recommendations, and therapeutic approaches are the sole responsibility of the individual therapist.
              </p>
              <p>
                Thought Healer facilitates access to qualified professionals but does not control, supervise, or interfere with independent clinical judgment.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">Platform Availability</h2>
              <p>
                While we strive to ensure reliable and secure platform performance, we do not guarantee uninterrupted access, error-free operation, or compatibility across all devices, networks, or internet environments. Technical disruptions, connectivity issues, or third-party service interruptions may occur.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by applicable law, Thought Healer Pvt. Ltd. disclaims liability for any indirect, incidental, consequential, or special damages arising from the use of our services. By accessing or using the platform, you acknowledge that you do so voluntarily and at your own discretion.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">Acceptance of Disclaimer</h2>
              <p>
                By continuing to access or use our services, you confirm that you understand and accept this Disclaimer and the limitations outlined herein.
              </p>
            </div>

            <p>
              If you have any questions regarding the scope of our services, please contact us at 
              <a href="mailto:legal@thoughthealer.com" className="text-primary-400 hover:underline"> legal@thoughthealer.com</a> 
              before proceeding.
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

export default Disclaimer;
