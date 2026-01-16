import React from 'react';

function PrivacyPolicy() {
  return (
    <div className="w-full min-h-screen bg-white text-gray-800 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">
          Privacy Policy
        </h1>

        <p className="mb-4">
          This Privacy Policy explains how our agency collects, uses, and
          protects your information when you use our services. Our services
          include website development, app development, software development,
          Google Ads, Google Page Listing, video editing, graphic designing,
          WhatsApp marketing, CRM solutions, and social media marketing.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
        <p className="mb-4">
          We collect personal and business information necessary to deliver our
          services. This may include your name, email, phone number, business
          details, project content, and login credentials when required for
          service execution.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Data</h2>
        <p className="mb-4">
          We use the information you provide to:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Deliver and improve our services</li>
          <li>Communicate project updates</li>
          <li>Process payments and billing</li>
          <li>Provide customer support</li>
          <li>Optimize marketing and advertising services</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Protection</h2>
        <p className="mb-4">
          We take strong security measures to protect your data from unauthorized
          access, sharing, or misuse. Only authorized team members can access
          your project information.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Sharing of Information</h2>
        <p className="mb-4">
          We do not sell or share your information with third parties except:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>When required to complete your project (e.g., hosting providers)</li>
          <li>If legally required by government authorities</li>
          <li>With your permission</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Third-Party Services</h2>
        <p className="mb-4">
          Some services like Google Ads, hosting, domain providers, or CRM
          tools may collect their own data. We are not responsible for how third
          parties handle your information.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">6. Cookies & Tracking</h2>
        <p className="mb-4">
          Our website or marketing tools may use cookies to improve user
          experience, analyze traffic, and personalize services.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">7. Data Retention</h2>
        <p className="mb-4">
          We retain your data only as long as necessary to provide services,
          maintain legal compliance, or support account-related activities.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">8. Your Rights</h2>
        <p className="mb-4">
          You have the right to request:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Access to the data we hold</li>
          <li>Correction of inaccurate information</li>
          <li>Deletion of your personal data</li>
          <li>Restriction or objection to data processing</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">9. Updates to This Policy</h2>
        <p className="mb-8">
          We may update this Privacy Policy from time to time. Continued use of
          our services means you accept the updated policy.
        </p>

        <p className="text-gray-700">
          If you have any questions about our privacy practices, feel free to
          contact us.
        </p>
      </div>
    </div>
  );
}

export default Privacy;