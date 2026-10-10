import React from 'react';
import { LucideIcon } from './LucideIcon.jsx';
import './Header.css';

export const Header = () => {
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
    </header>
  );
};
