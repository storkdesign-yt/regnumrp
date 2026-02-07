import React, { useEffect } from 'react';
import { Card } from '@/components/shared/Card/Card';
import { useDashboardStatsStore, useApplicationsStore } from '@/store';
import './Dashboard.scss';

export const AdminDashboard: React.FC = () => {
  const { stats } = useDashboardStatsStore();
  const { applications } = useApplicationsStore();

  // Mock data for demo
  useEffect(() => {
    // This would normally fetch from API
  }, []);

  const statCards = [
    {
      icon: 'ri-file-list-line',
      label: 'Wszystkie Podania',
      value: stats?.totalApplications || 0,
      color: '#3b82f6'
    },
    {
      icon: 'ri-time-line',
      label: 'Oczekujące',
      value: stats?.pendingApplications || 0,
      color: '#eab308'
    },
    {
      icon: 'ri-check-line',
      label: 'Zaakceptowane',
      value: stats?.acceptedApplications || 0,
      color: '#22c55e'
    },
    {
      icon: 'ri-close-line',
      label: 'Odrzucone',
      value: stats?.rejectedApplications || 0,
      color: '#ef4444'
    },
  ];

  const recentApplications = applications.slice(0, 5);

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h1>Dashboard</h1>
        <p>Witaj w panelu administracyjnym Regnum</p>
      </div>

      {/* Stats Grid */}
      <div className="dashboard__stats">
        {statCards.map((stat, index) => (
          <Card key={index} className="stat-card" hover>
            <div className="stat-card__icon" style={{ color: stat.color }}>
              <i className={stat.icon}></i>
            </div>
            <div className="stat-card__content">
              <div className="stat-card__value">{stat.value}</div>
              <div className="stat-card__label">{stat.label}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Applications */}
      <Card className="dashboard__recent">
        <div className="dashboard__recent-header">
          <h2>Ostatnie Podania</h2>
          <a href="/admin/applications" className="dashboard__view-all">
            Zobacz wszystkie <i className="ri-arrow-right-line"></i>
          </a>
        </div>

        {recentApplications.length > 0 ? (
          <div className="applications-list">
            {recentApplications.map(app => (
              <div key={app.id} className="application-item">
                <div className="application-item__user">
                  <div className="application-item__name">{app.username}</div>
                  <div className="application-item__faction">{app.faction}</div>
                </div>
                <div className={`application-item__status application-item__status--${app.status}`}>
                  {app.status === 'pending' && 'Oczekujące'}
                  {app.status === 'accepted' && 'Zaakceptowane'}
                  {app.status === 'rejected' && 'Odrzucone'}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="dashboard__empty">
            <i className="ri-inbox-line"></i>
            <p>Brak ostatnich podań</p>
          </div>
        )}
      </Card>
    </div>
  );
};
