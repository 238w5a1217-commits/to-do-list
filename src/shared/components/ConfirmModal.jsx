import React from 'react';
import { LucideIcon } from './LucideIcon.jsx';
import './ConfirmModal.css';

export const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Delete', isDangerous = true }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-icon-box">
          <LucideIcon name="AlertCircle" size={26} color="#EF4444" />
        </div>
        <h3 className="confirm-title">{title}</h3>
        <p className="confirm-message">{message}</p>

        <div className="confirm-actions">
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button
            type="button"
            className={`btn-confirm ${isDangerous ? 'btn-danger' : 'btn-primary'}`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
