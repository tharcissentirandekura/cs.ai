import React, { useState } from 'react';
import { Navigation } from '../components/Navigation/index';
import { RecentItems } from '../components/RecentItems/index';

export const LeftSidebar = () => {
  const [isClosedBar, setIsClosedBar] = useState(false);

  const handleClose = (evt: React.MouseEvent) => {
    evt.preventDefault();
    evt.stopPropagation();
    setIsClosedBar(!isClosedBar);
  };

  return (
    <div className='left-side-bar vh-100'>
      <button 
        type="button"
        className='btn btn-xl'
        onClick={handleClose}
        aria-label="Toggle sidebar"
      >
        {isClosedBar ? '✕' : '☰'}
      </button>
      {!!isClosedBar && (
        <aside className="border-end bg-white p-3 vh-100 overflow-auto flex-shrink-0" style={{ width: '320px' }}>
          <Navigation />
          <RecentItems />
        </aside>
      )} 
    </div>
  );
};