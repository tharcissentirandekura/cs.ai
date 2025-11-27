import { ModelManager } from '@cs.ai/sdk';
import type { Model } from '@cs.ai/sdk';
import { useState, useEffect } from 'react';

/**
 * For my case, thisis the only file we need but if you are running other models, u can add them 
 * @returns 
 */
export function LocalModels() {
  const [localModels, setLocalModels] = useState<Model[]>([]);

  useEffect(() => {
    const manager = new ModelManager([
      {
        id: 'ollama-3.2',
        name: 'Ollama 3.2',
        provider: 'local',
        description: 'Local Ollama model',
        version: '3.2',
      },
      {
        id: 'optoss',
        name: 'Optoss',
        provider: 'local',
        description: 'Local Optoss model',
      },
      {
        id: 'mistral',
        name: 'Mistral',
        provider: 'local',
        description: 'Local Mistral model',
      },
    ]);

    setLocalModels(manager.getLocalModels());
  }, []);

  return (
    <div className="mb-4">
      <div className="p-3 rounded border border-primary bg-primary bg-opacity-10">
        <h6 className="fw-semibold mb-3 text-primary">Oberlin CS local hosted Model</h6>
        <div className="small text-muted">
          {localModels.length > 0 ? (
            <ul className="mb-0">
              {localModels.map((model) => (
                <li key={model.id} className="mb-1">
                  {model.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mb-0">No local models available</p>
          )}
        </div>
      </div>
    </div>
  );
}