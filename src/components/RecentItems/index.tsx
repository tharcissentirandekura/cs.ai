
interface RecentItem {
    id: string;
    title: string;
    timestamp: string;
    active?: boolean;
  }
  
  const recentItems: RecentItem[] = [
    { id: '1', title: 'Not yet implemented', timestamp: 'Just now', active: true },
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