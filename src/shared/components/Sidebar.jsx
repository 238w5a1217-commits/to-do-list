import React from 'react';
import { LucideIcon } from './LucideIcon.jsx';
import { useTheme } from '../theme/ThemeContext.jsx';
import './Sidebar.css';

export const Sidebar = ({ activeTab, onSelectTab, counts = {} }) => {
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { id: 'all', label: 'All Tasks', icon: 'LayoutDashboard', count: counts.total },
    { id: 'pending', label: 'Pending', icon: 'Clock', count: counts.pending },
    { id: 'completed', label: 'Completed', icon: 'CheckCircle2', count: counts.completed }
  ];

  return (
    <aside className="app-sidebar" aria-label="Main Navigation">
      {/* Brand Header */}
      <div className="sidebar-brand">
        <div className="brand-logo-box">
          <LucideIcon name="Check" size={20} color="#FFFFFF" strokeWidth={3} />
        </div>
        <span className="brand-title">My Tasks</span>
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`nav-item-btn ${isActive ? 'active' : ''}`}
              onClick={() => onSelectTab(item.id)}
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
  );
};
