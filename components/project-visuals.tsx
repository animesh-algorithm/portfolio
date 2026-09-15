export function VisaFlowVisual() {
  return (
    <div className="visual visual-visa" aria-label="Abstract interface preview for a guided application product" role="img">
      <div className="window-bar"><span /><span /><span /><small>Guided application</small></div>
      <div className="visa-layout">
        <aside>
          <div className="avatar-mark">A</div>
          <i className="active" /><i /><i /><i />
          <b>72%</b>
        </aside>
        <div className="visa-content">
          <span className="mini-label">SECTION 04</span>
          <h3>Let’s check the details.</h3>
          <p>A calmer way through a complicated process.</p>
          <div className="form-row"><span /><span /></div>
          <div className="form-row form-row-short"><span /><span /></div>
          <div className="mock-button">Continue <span>→</span></div>
        </div>
        <div className="helper-note"><i>✦</i><span>Everything looks consistent.</span></div>
      </div>
    </div>
  );
}

export function StudioVisual() {
  return (
    <div className="visual visual-studio" aria-label="Abstract interface preview for the AI insurance concierge" role="img">
      <div className="studio-orbit orbit-one" />
      <div className="studio-orbit orbit-two" />
      <div className="studio-center">
        <span className="studio-spark">✦</span>
        <strong>Context in,<br />reply out.</strong>
      </div>
      <div className="floating-chip chip-one"><i /> Customer</div>
      <div className="floating-chip chip-two"><i /> Plan</div>
      <div className="floating-chip chip-three"><i /> Conversation</div>
      <span className="coordinate coordinate-a">12° 14′</span>
      <span className="coordinate coordinate-b">CONCIERGE 01</span>
    </div>
  );
}

export function DataVisual() {
  return (
    <div className="visual visual-data" aria-label="Abstract interface preview for Gradly operations infrastructure" role="img">
      <div className="data-title"><span>Weekly pulse</span><b>•••</b></div>
      <div className="data-metric"><strong>2,418</strong><span>records in motion</span></div>
      <div className="bars" aria-hidden="true">
        {[42, 58, 51, 72, 68, 86, 62, 91, 78, 96, 82, 100].map((height, index) => (
          <i key={index} style={{ "--height": `${height}%` } as React.CSSProperties} />
        ))}
      </div>
      <div className="data-footer"><span><i /> Automated</span><span>Updated just now</span></div>
    </div>
  );
}

export function PlaygroundVisual() {
  return (
    <div className="visual visual-playground" aria-label="Abstract preview of small creative experiments" role="img">
      <div className="playground-grid" />
      <div className="shape shape-arch" />
      <div className="shape shape-ball" />
      <div className="shape shape-pill">A—04</div>
      <p>Small ideas,<br /><em>made tangible.</em></p>
    </div>
  );
}
