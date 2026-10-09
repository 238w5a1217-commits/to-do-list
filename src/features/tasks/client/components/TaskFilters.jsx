import React from 'react';
import { LucideIcon } from '../../../../shared/components/LucideIcon.jsx';
import './TaskFilters.css';

export const TaskFilters = ({
  activeTab,
  onSelectTab,
  stats,
  searchQuery,
  onSearchChange
}) => {
  return (
    <div className="task-filters-bar">
      {/* Status Pills Row */}
      <div className="filter-pills-group" role="tablist">
        {/* All Tasks */}
        <button
          role="tab"
          aria-selected={activeTab === 'all'}
          className={`filter-pill-btn ${activeTab === 'all' ? 'active-all' : ''}`}
          onClick={() => onSelectTab('all')}
        >
          <LucideIcon
            name="LayoutGrid"
            size={16}
            color={activeTab === 'all' ? '#FFFFFF' : '#475569'}
          />
          <span>All Tasks ({stats.total})</span>
        </button>

        {/* Pending */}
        <button
          role="tab"
          aria-selected={activeTab === 'pending'}
          className={`filter-pill-btn ${activeTab === 'pending' ? 'active-pending' : ''}`}
          onClick={() => onSelectTab('pending')}
        >
          <LucideIcon
            name="Clock"
            size={16}
            color={activeTab === 'pending' ? '#D97706' : '#64748B'}
          />
          <span>Pending ({stats.pending})</span>
        </button>

        {/* Completed */}
        <button
          role="tab"
          aria-selected={activeTab === 'completed'}
          className={`filter-pill-btn ${activeTab === 'completed' ? 'active-completed' : ''}`}
          onClick={() => onSelectTab('completed')}
        >
          <LucideIcon
            name="CheckCircle2"
            size={16}
            color={activeTab === 'completed' ? '#16A34A' : '#64748B'}
          />
          <span>Completed ({stats.completed})</span>
        </button>
      </div>

      {/* Search Input on the right */}
      <div className="search-input-wrapper">
        <div className="search-icon">
          <LucideIcon name="Search" size={17} color="#94A3B8" />
        </div>
        <input
          type="text"
          className="search-input"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchQuery && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={() => onSearchChange('')}
            title="Clear search"
          >
            <LucideIcon name="X" size={14} color="#94A3B8" />
          </button>
        )}
      </div>
    </div>
  );
};
