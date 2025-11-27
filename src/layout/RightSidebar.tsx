
import { LocalModels } from '../components/Models/LocalModels';
import { ModelSelector } from '../components/Models/ModelSelector';
import { ModelInfo } from '../components/Models/ModelInfo';
import { useModels } from '../hooks/useModels';

export const RightSidebar = () => {
  const { models, selectedModel, selectedModelData, setSelectedModel } = useModels();

  return (
    <aside className="border-start bg-white p-3 vh-100 overflow-auto flex-shrink-0" style={{ width: '320px' }}>
      <LocalModels />
      <ModelSelector
        models={models}
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
      />
      <ModelInfo model={selectedModelData} />
    </aside>
  );
};