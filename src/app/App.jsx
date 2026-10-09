import React, { useState } from 'react';
import { Sidebar } from '../shared/components/Sidebar.jsx';
import { Header } from '../shared/components/Header.jsx';
import { ConfirmModal } from '../shared/components/ConfirmModal.jsx';
import { TaskForm } from '../features/tasks/client/components/TaskForm.jsx';
import { TaskFilters } from '../features/tasks/client/components/TaskFilters.jsx';
import { TaskList } from '../features/tasks/client/components/TaskList.jsx';
import { TaskEditModal } from '../features/tasks/client/components/TaskEditModal.jsx';
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
      {/* Sidebar on the left */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        counts={stats}
      />

      {/* Main Content Area on the right */}
      <main className="app-main-content">
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
