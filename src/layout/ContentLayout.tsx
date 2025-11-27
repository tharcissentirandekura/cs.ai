
import { ChatContainer } from '../components/Chat/ChatContainer';
import { useModels } from '../hooks/useModels';

export function ContentLayout() {
  const { selectedModelData } = useModels();

  return (
    <div className="p-4 d-flex flex-column bg-white flex-grow-1 vh-100 overflow-hidden">
      <div className="flex-grow-1 d-flex flex-column overflow-hidden">
        {selectedModelData && <ChatContainer model={selectedModelData} />}
      </div>
    </div>
  );
}