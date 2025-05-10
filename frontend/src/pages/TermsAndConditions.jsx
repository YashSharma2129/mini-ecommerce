import React from 'react';
import Layout from '../components/Layout';

const TermsAndConditions = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
        
        <div className="space-y-6 text-gray-600">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Introduction</h2>
            <p>Welcome to Mini E-commerce. By accessing and using this website, you accept and agree to be bound by the terms and conditions set forth below.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Use License</h2>
            <p>Permission is granted to temporarily download one copy of the materials (information or software) on Mini E-commerce's website for personal, non-commercial transitory viewing only.</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>This is the grant of a license, not a transfer of title</li>
              <li>You may not modify or copy the materials</li>
              <li>You may not use the materials for any commercial purpose</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Disclaimer</h2>
            <p>The materials on Mini E-commerce's website are provided on an 'as is' basis. Mini E-commerce makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Limitations</h2>
            <p>In no event shall Mini E-commerce or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Mini E-commerce's website.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Accuracy of Materials</h2>
            <p>The materials appearing on Mini E-commerce's website could include technical, typographical, or photographic errors. Mini E-commerce does not warrant that any of the materials on its website are accurate, complete, or current.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Links</h2>
            <p>Mini E-commerce has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Mini E-commerce of the site.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Modifications</h2>
            <p>Mini E-commerce may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">8. Governing Law</h2>
            <p>These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default TermsAndConditions;
