import React from 'react';
import { LucideIcon } from '../../../../shared/components/LucideIcon.jsx';
import './TaskEmptyState.css';

export const TaskEmptyState = ({ activeTab, searchQuery, onResetFilter }) => {
  let title = 'No tasks found';
  let message = 'You have no tasks created yet. Use the form above to add your first task!';
  let icon = 'CheckSquare';

  if (searchQuery) {
    title = `No tasks matching "${searchQuery}"`;
    message = 'Try searching with different keywords or clear your search query.';
    icon = 'Search';
  } else if (activeTab === 'pending') {
    title = 'No pending tasks!';
    message = 'Great job! You have cleared all your pending tasks.';
    icon = 'CheckCircle2';
  } else if (activeTab === 'completed') {
    title = 'No completed tasks yet';
    message = 'Complete tasks by clicking on their status badge.';
    icon = 'Clock';
  }

  return (
    <div className="task-empty-state">
      <div className="empty-icon-circle">
        <LucideIcon name={icon} size={32} color="#3B82F6" />
      </div>
      <h3 className="empty-title">{title}</h3>
      <p className="empty-description">{message}</p>
      {(searchQuery || activeTab !== 'all') && (
        <button type="button" className="btn-empty-reset" onClick={onResetFilter}>
          Show All Tasks
        </button>
      )}
    </div>
  );
};
