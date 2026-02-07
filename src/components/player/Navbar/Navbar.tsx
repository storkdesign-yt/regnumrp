import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/shared/Button/Button';
import { CONFIG } from '@/config';
import './Navbar.scss';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'Strona Główna' },
    { to: '/application', label: 'Rekrutacja' },
    { to: '/changelog', label: 'Changelog' },
    { to: '/status', label: 'Status Podania' },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container">
        <div className="navbar__content">
          {/* Logo */}
          <Link to="/" className="navbar__logo">
            <i className="ri-shield-star-fill"></i>
            <span className="gradient-text">{CONFIG.SERVER_NAME}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="navbar__links">
            {navLinks.map(link => (
              <Link 
                key={link.to} 
                to={link.to} 
                className="navbar__link"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="navbar__actions">
            <Button
              variant="ghost"
              size="sm"
              icon="ri-discord-fill"
              onClick={() => window.open(CONFIG.SOCIAL.discord, '_blank')}
            >
              Discord
            </Button>
            <Link to="/admin">
              <Button variant="primary" size="sm">
                Panel Admin
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="navbar__mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <i className={isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="navbar__mobile-menu">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="navbar__mobile-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="navbar__mobile-actions">
              <Button
                variant="ghost"
                fullWidth
                icon="ri-discord-fill"
                onClick={() => window.open(CONFIG.SOCIAL.discord, '_blank')}
              >
                Discord
              </Button>
              <Link to="/admin">
                <Button variant="primary" fullWidth>
                  Panel Admin
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
