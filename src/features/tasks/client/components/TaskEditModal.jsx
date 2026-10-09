import React, { useState, useEffect } from 'react';
import { LucideIcon } from '../../../../shared/components/LucideIcon.jsx';
import { detectCategory } from '../utils/categoryDetector.js';
import './TaskEditModal.css';

export const TaskEditModal = ({ task, isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setCompleted(Boolean(task.completed));
      setError('');
    }
  }, [task]);

  if (!isOpen || !task) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Task title is required');
      return;
    }

    setIsSubmitting(true);
    setError('');

    // Automatically recalculate category based on the updated text
    const autoCategory = detectCategory(title, description);

    const result = await onSave(task.id || task._id, {
      title: title.trim(),
      description: description.trim(),
      category: autoCategory,
      completed
    });

    setIsSubmitting(false);

    if (result.success) {
      onClose();
    } else {
      setError(result.error || 'Failed to update task');
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-row">
            <LucideIcon name="Pencil" size={20} color="#2563EB" />
            <h3 className="modal-title">Edit Task</h3>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            <LucideIcon name="X" size={18} color="#94A3B8" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Title Field */}
          <div className="form-field">
            <label className="field-label">Title</label>
            <input
              type="text"
              className="modal-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
              required
            />
          </div>

          {/* Description Field */}
          <div className="form-field">
            <label className="field-label">Description (optional)</label>
            <textarea
              className="modal-textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task description"
            />
          </div>

          {/* Status Toggle */}
          <div className="form-field status-field-row">
            <label className="field-label">Status</label>
            <button
              type="button"
              className={`status-toggle-pill ${completed ? 'completed' : 'pending'}`}
              onClick={() => setCompleted(!completed)}
            >
              <LucideIcon
                name={completed ? 'CheckCircle2' : 'Clock'}
                size={16}
                color={completed ? '#16A34A' : '#D97706'}
              />
              <span>{completed ? 'Completed' : 'Pending'}</span>
            </button>
          </div>

          {error && (
            <div className="modal-error-alert">
              <LucideIcon name="AlertCircle" size={16} color="#EF4444" />
              <span>{error}</span>
            </div>
          )}

          {/* Actions */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn-modal-cancel"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-modal-save"
              disabled={isSubmitting}
            >
              <LucideIcon name="Check" size={16} color="#FFFFFF" strokeWidth={2.5} />
              <span>{isSubmitting ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
