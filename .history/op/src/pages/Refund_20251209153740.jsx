import React from 'react';

function Refund() {
  return (
    <div className="w-full min-h-screen bg-white text-gray-800 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">
          Refund Policy
        </h1>

        <p className="mb-4">
          Our agency follows a transparent and fair refund policy for all
          services including website development, app development, software
          development, Google Ads, Google Page Listing, video editing, graphic
          designing, WhatsApp marketing, CRM solutions, and social media
          marketing.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Advance Payment</h2>
        <p className="mb-4">
          All projects require an advance payment to begin. This advance amount
          is **non-refundable** as it is used to allocate resources and begin
          project planning.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. Refund Eligibility</h2>
        <p className="mb-4">
          Refunds may be considered only if:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>The project has not been started</li>
          <li>No resources, designs, or development work has been initiated</li>
        </ul>

        <p className="mb-4">
          Once work has started, no refund will be issued for the advance or any
          completed portion of the project.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Non-Refundable Services</h2>
        <p className="mb-4">
          The following services are **strictly non-refundable** due to their
          real-time nature:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Google Ads or any ad campaign management</li>
          <li>Social media marketing services</li>
          <li>WhatsApp marketing</li>
          <li>Video editing and graphic designing work already delivered</li>
          <li>CRM setup or monthly subscription services</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Project Delays</h2>
        <p className="mb-4">
          Delays caused by the client—such as late content, missing information,
          or slow approvals—do not qualify for refunds. Project timelines may be
          extended accordingly.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Exceptional Cases</h2>
        <p className="mb-4">
          In rare cases, partial refunds may be considered depending on:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Percentage of work completed</li>
          <li>Amount of time and resources spent</li>
          <li>Genuine technical issues from our side</li>
        </ul>

        <p className="mb-4">
          Such decisions are made solely at the discretion of the agency
          management.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">6. Refund Request Process</h2>
        <p className="mb-4">
          To request a refund, clients must email a written request including:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Project name</li>
          <li>Payment details</li>
          <li>Reason for requesting a refund</li>
        </ul>

        <p className="mb-8">
          We will review the request and respond within 5–7 business days.
        </p>

        <p className="text-gray-700">
          If you have any questions regarding our refund process, please contact
          us anytime.
        </p>
      </div>
    </div>
  );
}

export default Refund;