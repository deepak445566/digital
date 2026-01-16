import React from 'react';

function TermsAndConditions() {
  return (
    <div className="w-full min-h-screen bg-white text-gray-800 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">
          Terms & Conditions
        </h1>

        <p className="mb-4">
          Welcome to our agency. By using our services, you agree to the
          following Terms & Conditions. Please read them carefully before
          proceeding. Our services include website development, app development,
          software development, Google Ads, Google Page Listing, video editing,
          graphic designing, WhatsApp marketing, CRM solutions, and social media
          marketing.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Service Usage</h2>
        <p className="mb-4">
          Our services are provided on a project or subscription basis. By
          signing up, you confirm that all information you provide is accurate
          and you have permission to use any content you submit to us.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. Payments</h2>
        <p className="mb-4">
          All payments must be completed before project initiation unless
          otherwise agreed in writing. We are not responsible for delays caused
          by late payments or missing project details.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Project Delivery</h2>
        <p className="mb-4">
          Project timelines depend on client cooperation, required assets,
          approvals, and revisions. Any delay in providing necessary content may
          extend delivery timelines.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Revisions</h2>
        <p className="mb-4">
          Each service includes a limited number of revisions based on the
          selected package. Additional revisions may incur extra charges.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Ownership & Rights</h2>
        <p className="mb-4">
          Upon full payment, project deliverables become the client's property
          except third-party licensed assets, which remain subject to their
          respective licenses.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">6. Marketing Usage</h2>
        <p className="mb-4">
          We may showcase completed work in our portfolio unless the client
          requests otherwise in writing.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">7. Liability</h2>
        <p className="mb-4">
          We are not responsible for financial losses, ad performance changes,
          or platform policy violations caused by the client. Technical issues
          on third-party platforms are beyond our control.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">8. Termination</h2>
        <p className="mb-4">
          We reserve the right to terminate services if the client violates
          these terms, behaves abusively, or fails to make required payments.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">9. Updates to Terms</h2>
        <p className="mb-8">
          We may update these Terms & Conditions at any time. Continued use of
          our services indicates acceptance of updated terms.
        </p>

        <p className="text-gray-700">
          If you have any questions, please contact us.
        </p>
      </div>
    </div>
  );
}

export default Terms;