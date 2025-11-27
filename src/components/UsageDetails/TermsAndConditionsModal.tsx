import { TermsAndConditionsContent } from ".";

interface TermsAndConditionsModalProps {
  show: boolean;
  onClose: () => void;
}

export function TermsAndConditionsModal({ show, onClose }: TermsAndConditionsModalProps) {
  if (!show) return null;

  return (
    <div
      className="modal show d-block"
      tabIndex={-1}
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={onClose}
    >
      <div className="modal-dialog modal-dialog-scrollable modal-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-bold">Terms and Conditions</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <TermsAndConditionsContent />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={onClose}>
              I Agree
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}