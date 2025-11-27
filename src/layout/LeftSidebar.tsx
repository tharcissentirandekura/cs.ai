
import { Navigation } from '../components/Navigation/index';
import { RecentItems } from '../components/RecentItems/index';

export const LeftSidebar = () => {
  return (
    <aside className="border-end bg-light p-4 d-flex flex-column vh-100 overflow-auto flex-shrink-0" >
      <Navigation />
      <RecentItems />
    </aside>
  );
};