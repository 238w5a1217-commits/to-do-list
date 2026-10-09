import React, { useState } from 'react';
import { LucideIcon } from '../../../../shared/components/LucideIcon.jsx';
import { detectCategory } from '../utils/categoryDetector.js';
import './TaskForm.css';

export const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setValidationError('Please enter a task title');
      return;
    }

    setValidationError('');
    setIsSubmitting(true);

    // 100% Automatic category detection without any manual selection options
    const autoCategory = detectCategory(title, description);

    const result = await onAddTask({
      title: title.trim(),
      description: description.trim(),
      category: autoCategory,
      completed: false
    });

    setIsSubmitting(false);

    if (result.success) {
      setTitle('');
      setDescription('');
    } else {
      setValidationError(result.error || 'Failed to create task');
    }
  };

  return (
    <div className="task-form-card">
      <div className="task-form-header">
        <h2 className="task-form-title">Add New Task</h2>
      </div>

      <form onSubmit={handleSubmit} className="task-form">
        <div className="task-form-row">
          {/* Title Input with FileText Icon */}
          <div className="input-group title-group">
            <div className="input-icon">
              <LucideIcon name="FileText" size={18} color="#94A3B8" />
            </div>
            <input
              type="text"
              className="task-input"
              placeholder="Task title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (validationError) setValidationError('');
              }}
              disabled={isSubmitting}
            />
          </div>

          {/* Description Input with AlignLeft Icon */}
          <div className="input-group desc-group">
            <div className="input-icon">
              <LucideIcon name="AlignLeft" size={18} color="#94A3B8" />
            </div>
            <input
              type="text"
              className="task-input"
              placeholder="Task description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          {/* Add Task Primary Button */}
          <button
            type="submit"
            className="btn-add-task"
            disabled={isSubmitting}
          >
            <LucideIcon name="Plus" size={18} color="#FFFFFF" strokeWidth={2.5} />
            <span>{isSubmitting ? 'Adding...' : 'Add Task'}</span>
          </button>
        </div>

        {validationError && (
          <div className="form-error-banner">
            <LucideIcon name="AlertCircle" size={16} color="#EF4444" />
            <span>{validationError}</span>
          </div>
        )}
      </form>
    </div>
  );
};
