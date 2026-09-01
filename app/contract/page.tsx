"use client";

import "./contract.css";

export default function ContractPage() {
  return (
    <div className="contract-page">
      <div className="contract-paper">

        {/* Header */}
        <header className="contract-header">
          <img
            src="https://res.cloudinary.com/dp0wyn4dg/image/upload/f_auto,q_auto/v1762117640/log_ctyaz9.png"
            alt="Veyra Logo"
            className="contract-logo-img"
          />
          <h1 className="contract-title">Service Agreement</h1>
        </header>

        <div className="contract-body">

          {/* Section 1 */}
          <section className="contract-clause">
            <h2>1. Monthly Plan &mdash; $50/month</h2>
            <p className="clause-label">Includes:</p>
            <ul className="legal-list">
              <li>System support and maintenance.</li>
              <li>Fixing bugs and issues.</li>
              <li>Up to <strong>3 small edits</strong> per month.</li>
            </ul>
            <p className="clause-note">Any additional small edits beyond the 3 included will be charged at <strong>$20 per edit</strong>.</p>
          </section>

          {/* Section 2 */}
          <section className="contract-clause">
            <h2>2. Scope of Work</h2>
            <p className="clause-label">Included &mdash; Small Edits</p>
            <p className="clause-note">Small edits are simple changes that do not change how the system works.</p>
            <ul className="legal-list">
              <li>Updating prices, text, or existing data.</li>
              <li>Adding services or items within the current system.</li>
              <li>Small visual adjustments (minor UI changes).</li>
            </ul>
            <p className="clause-label">Not Included &mdash; Additional Work</p>
            <p className="clause-note">Any request that requires new development or changes how the system works.</p>
            <ul className="legal-list">
              <li>New features or pages.</li>
              <li>Workflow changes.</li>
              <li>Reports, automation, or integrations.</li>
              <li>Major design or structural changes.</li>
            </ul>
            <p className="clause-note"><strong>Additional work will be quoted separately and requires approval and full payment before starting.</strong></p>
            <p className="clause-note"><strong>The Developer determines whether a request is a small edit, a bug fix, or additional work.</strong></p>
          </section>

          {/* Section 3 */}
          <section className="contract-clause">
            <h2>3. Payment</h2>
            <ul className="legal-list">
              <li>Monthly fee is paid at the <strong>beginning of each month</strong>.</li>
              <li>Additional work must be paid <strong>in advance</strong>.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="contract-clause">
            <h2>4. Request Handling Time</h2>
            <ul className="legal-list">
              <li>Requests are typically reviewed and handled within <strong>24 hours</strong> of being received (during working days).</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="contract-clause">
            <h2>5. Duration</h2>
            <ul className="legal-list">
              <li>This agreement is valid for <strong>6 months</strong>.</li>
              <li>It can be updated or canceled at any time with agreement from both sides.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="contract-clause">
            <h2>6. Late Payment</h2>
            <ul className="legal-list">
              <li>If payment is delayed, the service may be paused until payment is completed.</li>
            </ul>
          </section>

          {/* Backup Disclaimer */}
          <section className="contract-clause contract-disclaimer">
            <h2>Backup &amp; Data Responsibility</h2>
            <ul className="legal-list">
              <li>Backup services are <strong>not included</strong> in this agreement.</li>
              <li>The Developer is not responsible for any data loss or recovery.</li>
              <li>If a backup service is needed, it must be arranged under a <strong>separate agreement</strong>.</li>
            </ul>
          </section>

          {/* Signatures */}
          <section className="contract-execution">
            <div className="signatures-wrapper">
              <div className="signature-column">
                <p className="sig-label-heading">Developer</p>
                <img src="/sig_transparent.png" alt="Developer Signature" className="sig-image" />
            
              </div>
              <div className="signature-column">
                <p className="sig-label-heading">Client</p>
              </div>
            </div>
          </section>

        </div>

      </div>

      {/* Print Button */}
      <div className="print-action-container">
        <button className="btn-print" onClick={() => window.print()}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 6 2 18 2 18 9"></polyline>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
            <rect x="6" y="14" width="12" height="8"></rect>
          </svg>
          Print
        </button>
      </div>
    </div>
  );
}
