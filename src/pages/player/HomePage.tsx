import React from 'react';
import { Hero } from '@/components/player/Hero/Hero';
import { Card } from '@/components/shared/Card/Card';
import './HomePage.scss';

export const HomePage: React.FC = () => {
  const features = [
    {
      icon: 'ri-shield-check-line',
      title: 'Bezpieczeństwo',
      description: 'Zaawansowany system anty-cheat i aktywna moderacja 24/7'
    },
    {
      icon: 'ri-team-line',
      title: 'Społeczność',
      description: 'Przyjazna społeczność graczy i doświadczony team'
    },
    {
      icon: 'ri-gamepad-line',
      title: 'Rozgrywka',
      description: 'Unikalne eventy, misje i system rozwoju postaci'
    },
    {
      icon: 'ri-server-line',
      title: 'Stabilność',
      description: 'Najwyższa jakość serwerów i minimalne lagi'
    },
    {
      icon: 'ri-money-dollar-circle-line',
      title: 'Ekonomia',
      description: 'Zbalansowany system ekonomiczny i legalny biznes'
    },
    {
      icon: 'ri-car-line',
      title: 'Pojazdy',
      description: 'Setki pojazdów z możliwością tuningu i personalizacji'
    }
  ];

  return (
    <div className="home-page">
      <Hero />

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="features__header">
            <h2 className="gradient-text">Dlaczego Regnum?</h2>
            <p>Dołącz do najlepszej społeczności roleplay w Polsce</p>
          </div>

          <div className="features__grid">
            {features.map((feature, index) => (
              <Card key={index} hover className="feature-card">
                <div className="feature-card__icon">
                  <i className={feature.icon}></i>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats__grid">
            <div className="stat-item">
              <div className="stat-item__value gradient-text">5000+</div>
              <div className="stat-item__label">Aktywnych Graczy</div>
            </div>
            <div className="stat-item">
              <div className="stat-item__value gradient-text">100+</div>
              <div className="stat-item__label">Dedykowanego Teamu</div>
            </div>
            <div className="stat-item">
              <div className="stat-item__value gradient-text">99.9%</div>
              <div className="stat-item__label">Uptime Serwera</div>
            </div>
            <div className="stat-item">
              <div className="stat-item__value gradient-text">24/7</div>
              <div className="stat-item__label">Wsparcie Online</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
