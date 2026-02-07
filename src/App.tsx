import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Player Pages
import { HomePage } from '@/pages/player/HomePage';
import { ApplicationPage } from '@/pages/player/ApplicationPage';
import { ChangelogPage } from '@/pages/player/ChangelogPage';
import { StatusPage } from '@/pages/player/StatusPage';

// Admin Pages
import { AdminDashboard } from '@/pages/admin/Dashboard';
import { AdminApplications } from '@/pages/admin/Applications';
import { AdminPlayers } from '@/pages/admin/Players';
import { AdminLogs } from '@/pages/admin/Logs';
import { AdminSettings } from '@/pages/admin/Settings';

// Layouts
import { PlayerLayout } from '@/layouts/PlayerLayout';
import { AdminLayout } from '@/layouts/AdminLayout';

import '@/styles/global.scss';

function App() {
  return (
    <Router basename="/regnum-panel">
      <Routes>
        {/* Player Routes */}
        <Route path="/" element={<PlayerLayout />}>
          <Route index element={<HomePage />} />
          <Route path="application" element={<ApplicationPage />} />
          <Route path="changelog" element={<ChangelogPage />} />
          <Route path="status" element={<StatusPage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="applications" element={<AdminApplications />} />
          <Route path="players" element={<AdminPlayers />} />
          <Route path="logs" element={<AdminLogs />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
