import React from 'react';
import { LucideIcon } from './LucideIcon.jsx';
import './Header.css';

export const Header = () => {
  // Format current date nicely like "Jun 11, 2025"
  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  }).format(new Date());

  return (
    <header className="app-header">
      <div className="header-greeting-container">
        <div className="greeting-title-row">
          <h1 className="greeting-title">Hello!</h1>
          <div className="greeting-icon-wrapper" title="Productive Day!">
            <LucideIcon name="Sparkles" size={24} color="#F59E0B" />
          </div>
        </div>
        <p className="greeting-subtitle">Stay organized and get things done.</p>
      </div>

      <div className="header-date-badge" aria-label="Today's Date">
        <div className="date-icon-box">
          <LucideIcon name="Calendar" size={20} color="#2563EB" />
        </div>
        <div className="date-text-group">
          <span className="date-label">Today</span>
          <span className="date-value">{todayFormatted}</span>
        </div>
      </div>
    </header>
  );
};
