
interface RecentItem {
    id: string;
    title: string;
    timestamp: string;
    active?: boolean;
  }
  
  const recentItems: RecentItem[] = [
    { id: '1', title: 'How Can I Help You?', timestamp: 'Just now', active: true },
    { id: '2', title: 'Bertrand Equilibrium Prices Cal...', timestamp: '2h ago' },
    { id: '3', title: 'Proposal Templates For Partici...', timestamp: '5h ago' },
    { id: '4', title: 'Major Updates: Search & Usabi...', timestamp: '1d ago' },
    { id: '5', title: 'Team Collaboration And Contri...', timestamp: '2d ago' },
  ];
  
  export function RecentItems() {
    return (
      <div className="mb-1">
        <h6 className="text-muted fw-semibold small text-uppercase">Recent</h6>
        <div className="overflow-auto">
          {recentItems.map((item) => (
            <div
              key={item.id}
              className={`p-1 rounded ${
                item.active ? 'bg-white shadow-sm' : ''
              }`}
              style={{ 
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (!item.active) {
                  e.currentTarget.style.backgroundColor = '#f0f0f0';
                }
              }}
              onMouseLeave={(e) => {
                if (!item.active) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <div className={`small ${item.active ? 'fw-semibold' : ''} m-2`}>
                {item.title}
              </div>
            </div>
          ))}
        </div>
        <div 
          className="mt-3 text-primary cursor-pointer fw-medium small pe-auto"
        >
          View all history
        </div>
      </div>
    );
  }