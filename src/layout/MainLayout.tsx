import { LeftSidebar } from './LeftSidebar';
import { ContentLayout } from './ContentLayout';
import { RightSidebar } from './RightSidebar';

export const MainLayout = () => {
    return (
      <div className="d-flex vh-100 overflow-hidden">
        <LeftSidebar />
        <ContentLayout />
        <RightSidebar />
      </div>
    );
  }