
import { useState, useEffect } from 'react';
// import { ModelManager } from '@cs.ai/sdk';
import type { Model } from '@cs.ai/sdk';

export function useModels() {
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>('tinydolphin');

  useEffect(() => {
    const allModels: Model[] = [
      {
        id: 'ollama-3.2',
        name: 'Ollama 3.2',
        provider: 'local',
        description: 'Local Ollama model',
        version: '3.2',
        modelName: 'llama3.2', // Actual Ollama model name
      },
      {
        id: 'optoss',
        name: 'Optoss',
        provider: 'local',
        description: 'Local Optoss model',
        modelName: 'optoss', // Update with actual model name
      },
      {
        id: 'mistral',
        name: 'Mistral',
        provider: 'local',
        description: 'Local Mistral model',
        modelName: 'mistral', // Update with actual model name
      },
            {
        id: 'tinydolphin',
        name: 'tinydolphin',
        provider: 'local',
        description: 'Local tinydolphin',
        modelName: 'tinydolphin', // Update with actual model name
      },
    ];
    setModels(allModels);
  }, []);

  const selectedModelData = models.find((m) => m.id === selectedModel) || null;

  return {
    models,
    selectedModel,
    selectedModelData,
    setSelectedModel,
  };
}