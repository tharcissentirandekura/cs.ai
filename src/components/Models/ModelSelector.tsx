import type { Model } from '@cs.ai/sdk';

interface ModelSelectorProps {
  models: Model[];
  selectedModel: string;
  onModelChange: (modelId: string) => void;
}

export function ModelSelector({ models, selectedModel, onModelChange }: ModelSelectorProps) {
  return (
    <div className="mb-4">
      <label className="form-label fw-semibold">Select Model</label>
      <select
        className="form-select"
        value={selectedModel}
        onChange={(e) => onModelChange(e.target.value)}
      >
        {models.map((model) => (
          <option key={model.id} value={model.id}>
            {model.name}
          </option>
        ))}
      </select>
    </div>
  );
}