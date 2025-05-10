import React from 'react';
import Layout from '../components/Layout';

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        
        <div className="space-y-6 text-gray-600">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Information We Collect</h2>
            <p>At Mini E-commerce, we collect information to provide better services to our users. We collect information in the following ways:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Information you provide to us (name, email address, billing information)</li>
              <li>Information we get from your use of our services</li>
              <li>Information from your interactions with our website</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">2. How We Use Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Provide our services</li>
              <li>Maintain and improve our services</li>
              <li>Develop new services</li>
              <li>Protect Mini E-commerce and our users</li>
              <li>Personalize your experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Information Security</h2>
            <p>We work hard to protect Mini E-commerce and our users from unauthorized access to or unauthorized alteration, disclosure, or destruction of information we hold. In particular:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>We encrypt our services using SSL</li>
              <li>We review our information collection, storage, and processing practices</li>
              <li>We restrict access to personal information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Information Sharing</h2>
            <p>We do not share personal information with companies, organizations, or individuals outside of Mini E-commerce except in the following cases:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>With your consent</li>
              <li>For external processing</li>
              <li>For legal reasons</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Cookie Policy</h2>
            <p>We use cookies and similar technologies to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Remember your preferences</li>
              <li>Understand how you interact with our services</li>
              <li>Improve your experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Object to our use of your information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Changes</h2>
            <p>Our Privacy Policy may change from time to time. We will post any privacy policy changes on this page and, if the changes are significant, we will provide a more prominent notice.</p>
          </section>

          <section className="mt-8">
            <p className="text-sm">Last updated: May 10, 2025</p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
