export function VisaFlowVisual() {
  return (
    <div
      className="visual visual-visa"
      aria-label="Abstract interface preview for a guided application product"
      role="img"
    >
      <div className="window-bar">
        <span />
        <span />
        <span />
        <small>Guided application</small>
      </div>
      <div className="visa-layout">
        <aside>
          <div className="avatar-mark">A</div>
          <i className="active" />
          <i />
          <i />
          <i />
          <b>72%</b>
        </aside>
        <div className="visa-content">
          <span className="mini-label">SECTION 04</span>
          <h3>Let’s check the details.</h3>
          <p>A calmer way through a complicated process.</p>
          <div className="form-row">
            <span />
            <span />
          </div>
          <div className="form-row form-row-short">
            <span />
            <span />
          </div>
          <div className="mock-button">
            Continue <span>→</span>
          </div>
        </div>
        <div className="helper-note">
          <i>✦</i>
          <span>Everything looks consistent.</span>
        </div>
      </div>
    </div>
  );
}

export function StudioVisual() {
  return (
    <div
      className="visual visual-studio"
      aria-label="Abstract interface preview for the AI insurance concierge"
      role="img"
    >
      <div className="studio-orbit orbit-one" />
      <div className="studio-orbit orbit-two" />
      <div className="studio-center">
        <span className="studio-spark">✦</span>
        <strong>
          Context in,
          <br />
          reply out.
        </strong>
      </div>
      <div className="floating-chip chip-one">
        <i /> Customer
      </div>
      <div className="floating-chip chip-two">
        <i /> Plan
      </div>
      <div className="floating-chip chip-three">
        <i /> Conversation
      </div>
      <span className="coordinate coordinate-a">12° 14′</span>
      <span className="coordinate coordinate-b">CONCIERGE 01</span>
    </div>
  );
}

export function DataVisual() {
  return (
    <div
      className="visual visual-data"
      aria-label="Gradly Links turns long URLs into branded links while saving about 400 dollars a month"
      role="img"
    >
      <div className="links-glow links-glow-one" aria-hidden="true" />
      <div className="links-glow links-glow-two" aria-hidden="true" />
      <div className="links-header" aria-hidden="true">
        <span className="links-mark">G</span>
        <span>Gradly Links</span>
      </div>
      <div className="links-workflow" aria-hidden="true">
        <div className="links-step links-source">
          <small>DESTINATION</small>
          <span>https://</span>
          <b>Paste a long URL…</b>
        </div>
        <span className="links-connector">↓</span>
        <div className="links-step links-result">
          <small>BRANDED LINK</small>
          <span>
            <strong>link.gradly.us</strong>
            <b>/whatever</b>
          </span>
          <i>Copy</i>
        </div>
      </div>
      <div className="links-footer" aria-hidden="true">
        <div>
          <small>REPLACES</small>
          <strong>Rebrandly</strong>
        </div>
        <div className="links-savings">
          <small>EST. SAVINGS</small>
          <strong>
            $400<span>/mo</span>
          </strong>
        </div>
      </div>
    </div>
  );
}

export function ClaimsVisual() {
  return (
    <div
      className="visual visual-claims"
      aria-label="A simple reimbursement app that turns a medical bill into an ACH payment"
      role="img"
    >
      <div className="claims-ambient claims-ambient-one" aria-hidden="true" />
      <div className="claims-ambient claims-ambient-two" aria-hidden="true" />

      <div className="claims-app" aria-hidden="true">
        <div className="claims-app-bar">
          <strong>Reimbursement</strong>
          <span>
            <i /> Secure
          </span>
        </div>
        <div className="claims-app-body">
          <section className="claims-intake">
            <span className="claims-eyebrow">NEW REQUEST</span>
            <h4>Send us your bill.</h4>
            <p>We’ll take it from here.</p>

            <div className="claims-upload">
              <span className="claims-upload-icon">↑</span>
              <div>
                <strong>Medical bill</strong>
                <small>PDF uploaded</small>
              </div>
              <b>Ready</b>
            </div>
            <div className="claims-bank">
              <span>Bank details</span>
              <strong>Added securely</strong>
            </div>
            <div className="claims-submit">
              Submit for review <span>→</span>
            </div>
          </section>

          <aside className="claims-journey">
            <span className="claims-eyebrow">WORKING IN THE BACKGROUND</span>
            <ol>
              <li className="is-complete">
                <i>✓</i>
                <span>
                  <b>Bill analyzed</b>
                  <small>Details captured</small>
                </span>
              </li>
              <li className="is-complete">
                <i>✓</i>
                <span>
                  <b>Eligibility checked</b>
                  <small>Reimbursement approved</small>
                </span>
              </li>
              <li className="is-current">
                <i>3</i>
                <span>
                  <b>ACH initiated</b>
                  <small>Payment is on its way</small>
                </span>
              </li>
            </ol>
          </aside>
        </div>
      </div>

      <div className="claims-payout" aria-hidden="true">
        <span className="claims-payout-check">✓</span>
        <div>
          <small>PAYMENT INITIATED</small>
          <strong>On the way.</strong>
          <p>Arrives in 1–2 business days.</p>
          <span className="claims-email">
            <i /> Email confirmation sent
          </span>
        </div>
      </div>
    </div>
  );
}

export function PlaygroundVisual() {
  return (
    <div
      className="visual visual-playground"
      aria-label="Abstract preview of small creative experiments"
      role="img"
    >
      <div className="playground-grid" />
      <div className="shape shape-arch" />
      <div className="shape shape-ball" />
      <div className="shape shape-pill">A—04</div>
      <p>
        Small ideas,
        <br />
        <em>made tangible.</em>
      </p>
    </div>
  );
}
