import React from 'react';
import { TaskCard } from './TaskCard.jsx';
import { TaskEmptyState } from './TaskEmptyState.jsx';
import { LucideIcon } from '../../../../shared/components/LucideIcon.jsx';
import './TaskList.css';

export const TaskList = ({
  tasks,
  loading,
  error,
  activeTab,
  searchQuery,
  onResetFilter,
  onToggleStatus,
  onEdit,
  onDelete,
  onRetry
}) => {
  if (loading) {
    return (
      <div className="task-loading-grid">
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <div key={idx} className="task-card-skeleton">
            <div className="skeleton-header">
              <div className="skeleton-box icon-skeleton" />
              <div className="skeleton-box badge-skeleton" />
            </div>
            <div className="skeleton-box title-skeleton" />
            <div className="skeleton-box desc-skeleton" />
            <div className="skeleton-footer">
              <div className="skeleton-box date-skeleton" />
              <div className="skeleton-box btn-skeleton" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="task-error-state">
        <LucideIcon name="AlertCircle" size={32} color="#EF4444" />
        <h3 className="error-title">Failed to load tasks</h3>
        <p className="error-message">{error}</p>
        <button type="button" className="btn-retry" onClick={onRetry}>
          <LucideIcon name="RefreshCw" size={16} />
          <span>Retry</span>
        </button>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <TaskEmptyState
        activeTab={activeTab}
        searchQuery={searchQuery}
        onResetFilter={onResetFilter}
      />
    );
  }

  return (
    <div className="tasks-cards-grid">
      {tasks.map((task) => (
        <TaskCard
          key={task.id || task._id}
          task={task}
          onToggleStatus={onToggleStatus}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
