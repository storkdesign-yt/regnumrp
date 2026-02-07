import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/player/Navbar/Navbar';
import './PlayerLayout.scss';

export const PlayerLayout: React.FC = () => {
  return (
    <div className="player-layout">
      <Navbar />
      <main className="player-layout__main">
        <Outlet />
      </main>
      <footer className="player-layout__footer">
        <div className="container">
          <p>&copy; 2026 Regnum. Wszystkie prawa zastrzeżone.</p>
        </div>
      </footer>
    </div>
  );
};
