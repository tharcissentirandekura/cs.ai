import type { Model } from '@cs.ai/sdk';

interface ModelInfoProps {
  model: Model | null;
}

export function ModelInfo({ model }: ModelInfoProps) {
  if (!model) {
    return (
      <div className="p-3 rounded bg-light border">
        <h6 className="fw-semibold mb-2">How to use it</h6>
        <p className="small text-muted mb-0" style={{ lineHeight: '1.5' }}>
          Select a model from the dropdown above to see information and usage instructions.
        </p>
      </div>
    );
  }

  return (
    <div className="p-3 rounded bg-light border">
      <h6 className="fw-semibold mb-2">How to use it</h6>
      <div className="small text-muted" style={{ lineHeight: '1.6' }}>
        <p className="mb-2">
          <strong>Model:</strong> {model.name}
        </p>
        {model.description && <p className="mb-2">{model.description}</p>}
        <p className="mb-1">
          <strong>Provider:</strong> {model.provider}
        </p>
        {model.version && (
          <p className="mb-0">
            <strong>Version:</strong> {model.version}
          </p>
        )}
      </div>
    </div>
  );
}