import React, { useState } from 'react';
import { LucideIcon } from '../../../../shared/components/LucideIcon.jsx';
import { getCategoryMeta } from '../utils/categoryDetector.js';
import './TaskCard.css';

export const TaskCard = ({ task, onToggleStatus, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);

  const categoryMeta = getCategoryMeta(task.category);

  // Format date nicely e.g., "Jun 10, 2025"
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  }).format(new Date(task.createdAt || Date.now()));

  const handleToggle = (e) => {
    e.stopPropagation();
    onToggleStatus(task.id || task._id);
  };

  return (
    <div className={`task-card ${task.completed ? 'task-completed-card' : ''}`}>
      {/* Top Header Row */}
      <div className="task-card-header">
        {/* Category Icon Box */}
        <div
          className="task-category-icon-box"
          style={{
            backgroundColor: categoryMeta.bg,
            color: categoryMeta.color
          }}
          title={`Category: ${categoryMeta.name}`}
        >
          <LucideIcon name={categoryMeta.iconName} size={22} color={categoryMeta.color} />
        </div>

        {/* Right side: Status Badge & 3-dots Menu */}
        <div className="task-card-header-actions">
          <button
            type="button"
            className={`task-status-badge ${task.completed ? 'status-completed' : 'status-pending'}`}
            onClick={handleToggle}
            title={`Click to mark as ${task.completed ? 'pending' : 'completed'}`}
          >
            <LucideIcon
              name={task.completed ? 'CheckCircle2' : 'Clock'}
              size={14}
              color={task.completed ? '#16A34A' : '#D97706'}
            />
            <span>{task.completed ? 'Completed' : 'Pending'}</span>
          </button>

          {/* 3-dots Menu */}
          <div className="task-menu-container">
            <button
              type="button"
              className="task-more-btn"
              onClick={() => setShowMenu(!showMenu)}
              aria-label="More options"
            >
              <LucideIcon name="MoreHorizontal" size={18} color="#94A3B8" />
            </button>

            {showMenu && (
              <div className="task-context-menu">
                <button
                  type="button"
                  className="context-menu-item"
                  onClick={() => {
                    setShowMenu(false);
                    onToggleStatus(task.id || task._id);
                  }}
                >
                  <LucideIcon
                    name={task.completed ? 'Clock' : 'CheckCircle2'}
                    size={16}
                    color={task.completed ? '#D97706' : '#16A34A'}
                  />
                  <span>Mark as {task.completed ? 'Pending' : 'Completed'}</span>
                </button>
                <button
                  type="button"
                  className="context-menu-item"
                  onClick={() => {
                    setShowMenu(false);
                    onEdit(task);
                  }}
                >
                  <LucideIcon name="Pencil" size={16} color="#2563EB" />
                  <span>Edit Task</span>
                </button>
                <button
                  type="button"
                  className="context-menu-item text-danger"
                  onClick={() => {
                    setShowMenu(false);
                    onDelete(task);
                  }}
                >
                  <LucideIcon name="Trash2" size={16} color="#EF4444" />
                  <span>Delete Task</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Task Content */}
      <div className="task-card-body">
        <h3 className={`task-card-title ${task.completed ? 'title-completed' : ''}`}>
          {task.title}
        </h3>
        {task.description && (
          <p className="task-card-description">{task.description}</p>
        )}
      </div>

      {/* Footer Row */}
      <div className="task-card-footer">
        {/* Date on the left */}
        <div className="task-date-info">
          <LucideIcon name="Calendar" size={15} color="#94A3B8" />
          <span className="task-date-text">{formattedDate}</span>
        </div>

        {/* Action Buttons on the right */}
        <div className="task-action-buttons">
          <button
            type="button"
            className="task-action-btn btn-edit"
            onClick={() => onEdit(task)}
            title="Edit Task"
            aria-label="Edit Task"
          >
            <LucideIcon name="Pencil" size={15} color="#2563EB" />
          </button>
          <button
            type="button"
            className="task-action-btn btn-delete"
            onClick={() => onDelete(task)}
            title="Delete Task"
            aria-label="Delete Task"
          >
            <LucideIcon name="Trash2" size={15} color="#EF4444" />
          </button>
        </div>
      </div>
    </div>
  );
};
