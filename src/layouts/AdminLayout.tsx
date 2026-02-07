import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store';
import { CONFIG } from '@/config';
import './AdminLayout.scss';

export const AdminLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user } = useAuthStore();
  const location = useLocation();

  const menuItems = [
    { path: '/admin', icon: 'ri-dashboard-line', label: 'Dashboard', exact: true },
    { path: '/admin/applications', icon: 'ri-file-list-3-line', label: 'Podania' },
    { path: '/admin/players', icon: 'ri-user-line', label: 'Gracze' },
    { path: '/admin/logs', icon: 'ri-history-line', label: 'Logi' },
    { path: '/admin/settings', icon: 'ri-settings-3-line', label: 'Ustawienia' },
  ];

  const isActive = (path: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${isSidebarOpen ? 'admin-sidebar--open' : ''}`}>
        <div className="admin-sidebar__header">
          <Link to="/" className="admin-sidebar__logo">
            <i className="ri-shield-star-fill"></i>
            <span className="gradient-text">{CONFIG.SERVER_NAME}</span>
          </Link>
        </div>

        <nav className="admin-sidebar__nav">
          {menuItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`admin-sidebar__item ${isActive(item.path, item.exact) ? 'admin-sidebar__item--active' : ''}`}
            >
              <i className={item.icon}></i>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="admin-sidebar__footer">
          {user && (
            <div className="admin-sidebar__user">
              <img 
                src={`https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.png`}
                alt={user.username}
                className="admin-sidebar__avatar"
              />
              <div className="admin-sidebar__user-info">
                <div className="admin-sidebar__username">{user.username}</div>
                <div className="admin-sidebar__role">{user.role}</div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="admin-main">
        <header className="admin-header">
          <button 
            className="admin-header__toggle"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <i className="ri-menu-line"></i>
          </button>

          <div className="admin-header__actions">
            <Link to="/" className="admin-header__btn">
              <i className="ri-home-line"></i>
              <span>Wróć do strony</span>
            </Link>
          </div>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
