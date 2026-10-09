import React, { useState } from 'react';
import { Sidebar } from '../shared/components/Sidebar.jsx';
import { Header } from '../shared/components/Header.jsx';
import { ConfirmModal } from '../shared/components/ConfirmModal.jsx';
import { TaskForm } from '../features/tasks/client/components/TaskForm.jsx';
import { TaskFilters } from '../features/tasks/client/components/TaskFilters.jsx';
import { TaskList } from '../features/tasks/client/components/TaskList.jsx';
import { TaskEditModal } from '../features/tasks/client/components/TaskEditModal.jsx';
import { LucideIcon } from '../shared/components/LucideIcon.jsx';
import { useTasks } from '../features/tasks/client/hooks/useTasks.js';
import './App.css';

export function App() {
  const {
    filteredTasks,
    loading,
    error,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    stats,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTask
  } = useTasks();

  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleEditClick = (task) => {
    setEditingTask(task);
  };

  const handleDeleteClick = (task) => {
    setDeletingTask(task);
  };

  const handleConfirmDelete = async () => {
    if (deletingTask) {
      await deleteTask(deletingTask.id || deletingTask._id);
      setDeletingTask(null);
    }
  };

  return (
    <div className="app-layout">
      {/* Sidebar (desktop sticky & mobile off-canvas drawer) */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        counts={stats}
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />

      {/* Main Content Area on the right */}
      <main className="app-main-content">
        {/* Mobile Top Bar (visible only on mobile screens <= 768px) */}
        <div className="mobile-top-bar">
          <button
            type="button"
            className="mobile-hamburger-btn"
            onClick={() => setMobileNavOpen(true)}
            aria-label="Open Navigation"
          >
            <LucideIcon name="Menu" size={22} className="hamburger-icon" />
          </button>

          <div className="mobile-brand-title">
            <div className="mobile-brand-icon">
              <LucideIcon name="Check" size={16} color="#FFFFFF" strokeWidth={3} />
            </div>
            <span>My Tasks</span>
          </div>

          <div className="mobile-task-count-pill">
            {stats.total} Tasks
          </div>
        </div>

        <div className="main-container">
          {/* Top Greeting and Date Header */}
          <Header />

          {/* Add New Task Form Section */}
          <TaskForm onAddTask={addTask} />

          {/* Filter Pills and Search Row */}
          <TaskFilters
            activeTab={activeTab}
            onSelectTab={setActiveTab}
            stats={stats}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          {/* Tasks Grid */}
          <TaskList
            tasks={filteredTasks}
            loading={loading}
            error={error}
            activeTab={activeTab}
            searchQuery={searchQuery}
            onResetFilter={() => {
              setActiveTab('all');
              setSearchQuery('');
            }}
            onToggleStatus={toggleTask}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
            onRetry={fetchTasks}
          />
        </div>
      </main>

      {/* Edit Task Modal */}
      <TaskEditModal
        task={editingTask}
        isOpen={Boolean(editingTask)}
        onClose={() => setEditingTask(null)}
        onSave={updateTask}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deletingTask)}
        title="Delete Task"
        message={`Are you sure you want to delete "${deletingTask?.title}"? This action cannot be undone.`}
        confirmText="Delete Task"
        isDangerous={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingTask(null)}
      />
    </div>
  );
}

export default App;
