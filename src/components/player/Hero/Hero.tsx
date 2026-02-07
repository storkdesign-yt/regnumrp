import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/shared/Button/Button';
import { useServerStatusStore } from '@/store';
import { CONFIG } from '@/config';
import './Hero.scss';

export const Hero: React.FC = () => {
  const { status } = useServerStatusStore();

  return (
    <section className="hero">
      <div className="hero__background">
        <div className="hero__gradient"></div>
      </div>

      <div className="container">
        <div className="hero__content">
          <div className="hero__badge">
            <i className="ri-fire-fill"></i>
            <span>Najlepszy Polski Serwer FiveM</span>
          </div>

          <h1 className="hero__title">
            Witaj w <span className="gradient-text">{CONFIG.SERVER_NAME}</span>
          </h1>

          <p className="hero__description">
            {CONFIG.SERVER_DESCRIPTION}
          </p>

          <div className="hero__server-status">
            <div className={`hero__status-indicator ${status.online ? 'hero__status-indicator--online' : ''}`}>
              <span className="hero__status-dot"></span>
              {status.online ? 'Online' : 'Offline'}
            </div>
            <div className="hero__players">
              <i className="ri-user-fill"></i>
              <span>{status.players} / {status.maxPlayers}</span>
            </div>
          </div>

          <div className="hero__actions">
            <Link to="/application">
              <Button variant="primary" size="lg" icon="ri-file-text-line">
                Złóż Podanie
              </Button>
            </Link>
            <Button 
              variant="secondary" 
              size="lg" 
              icon="ri-play-fill"
              onClick={() => navigator.clipboard.writeText(CONFIG.SERVER_IP)}
            >
              {CONFIG.SERVER_IP}
            </Button>
          </div>

          <div className="hero__socials">
            <a 
              href={CONFIG.SOCIAL.discord} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hero__social"
            >
              <i className="ri-discord-fill"></i>
            </a>
            <a 
              href={CONFIG.SOCIAL.tiktok} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hero__social"
            >
              <i className="ri-tiktok-fill"></i>
            </a>
            <a 
              href={CONFIG.SOCIAL.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hero__social"
            >
              <i className="ri-instagram-fill"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="hero__particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="hero__particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 10}s`
          }}></div>
        ))}
      </div>
    </section>
  );
};
