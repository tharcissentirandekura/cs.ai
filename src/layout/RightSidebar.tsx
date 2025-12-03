
import { LocalModels } from '../components/Models/LocalModels';
import { ModelSelector } from '../components/Models/ModelSelector';
import { ModelInfo } from '../components/Models/ModelInfo';
import { useModels } from '../hooks/useModels';
import { useState } from 'react';

export const RightSidebar = () => {
  const { models, selectedModel, selectedModelData, setSelectedModel } = useModels();
  const [isClosedBar, setIsClosedBar] = useState(false);

  const handleClose = (evt: React.MouseEvent) => {
    evt.preventDefault();
    evt.stopPropagation();
    setIsClosedBar(!isClosedBar);
  };
  return (
    <div className='right-side-bar vh-100'>
      <button 
        type="button"
        className='btn btn-xl'
        onClick={handleClose}
        aria-label="Toggle sidebar"
      >
        {isClosedBar ? '✕' : '☰'}
      </button>
      {!!isClosedBar && (
        <aside className="border-start bg-white p-3 vh-100 overflow-auto flex-shrink-0" style={{ width: '320px' }}>
          <LocalModels />
          <ModelSelector
            models={models}
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
          />
          <ModelInfo model={selectedModelData} />
        </aside>
      )}
    </div>
  );
};