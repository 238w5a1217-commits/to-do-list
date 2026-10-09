import React from 'react';
import { LucideIcon } from './LucideIcon.jsx';
import { useTheme } from '../theme/ThemeContext.jsx';
import './Sidebar.css';

export const Sidebar = ({ activeTab, onSelectTab, counts = {}, isOpen, onClose }) => {
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { id: 'all', label: 'All Tasks', icon: 'LayoutDashboard', count: counts.total },
    { id: 'pending', label: 'Pending', icon: 'Clock', count: counts.pending },
    { id: 'completed', label: 'Completed', icon: 'CheckCircle2', count: counts.completed }
  ];

  const handleTabClick = (tabId) => {
    onSelectTab(tabId);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="sidebar-mobile-backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={`app-sidebar ${isOpen ? 'sidebar-mobile-open' : ''}`} aria-label="Main Navigation">
        {/* Brand Header */}
        <div className="sidebar-brand">
          <div className="brand-logo-group">
            <div className="brand-logo-box">
              <LucideIcon name="Check" size={20} color="#FFFFFF" strokeWidth={3} />
            </div>
            <span className="brand-title">My Tasks</span>
          </div>

          {/* Close button on mobile */}
          <button
            type="button"
            className="sidebar-close-btn"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <LucideIcon name="X" size={20} color="#64748B" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                className={`nav-item-btn ${isActive ? 'active' : ''}`}
                onClick={() => handleTabClick(item.id)}
              >
                <div className="nav-item-content">
                  <LucideIcon
                    name={item.icon}
                    size={20}
                    className={`nav-icon ${isActive ? 'icon-active' : ''}`}
                  />
                  <span className="nav-label">{item.label}</span>
                </div>
                {item.count !== undefined && item.count > 0 && (
                  <span className={`nav-badge ${isActive ? 'badge-active' : ''}`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Theme Switcher Footer */}
        <div className="sidebar-footer">
          <div className="theme-toggle-row" onClick={toggleTheme} role="button" tabIndex={0}>
            <div className="theme-label-group">
              <LucideIcon
                name={theme === 'dark' ? 'Moon' : 'Sun'}
                size={18}
                className="theme-icon"
              />
              <span className="theme-text">
                {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
              </span>
            </div>

            <div className={`theme-switch-pill ${theme === 'light' ? 'pill-active' : ''}`}>
              <span className="theme-switch-knob" />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
