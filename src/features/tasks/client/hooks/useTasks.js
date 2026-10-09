import { useState, useEffect, useCallback, useMemo } from 'react';
import { taskApi } from '../api/taskApi.js';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'pending' | 'completed'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Fetch tasks from API
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskApi.getTasks();
      setTasks(data || []);
    } catch (err) {
      console.error('Failed to load tasks:', err);
      setError(err.response?.data?.message || err.message || 'Unable to connect to server');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Create new task
  const addTask = async (taskData) => {
    try {
      setError(null);
      const created = await taskApi.createTask(taskData);
      setTasks((prev) => [created, ...prev]);
      return { success: true, task: created };
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to create task';
      setError(msg);
      return { success: false, error: msg };
    }
  };

  // Update existing task
  const updateTask = async (id, taskData) => {
    try {
      setError(null);
      const updated = await taskApi.updateTask(id, taskData);
      setTasks((prev) => prev.map((t) => (t.id === id || t._id === id ? updated : t)));
      return { success: true, task: updated };
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to update task';
      setError(msg);
      return { success: false, error: msg };
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      setError(null);
      await taskApi.deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id && t._id !== id));
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to delete task';
      setError(msg);
      return { success: false, error: msg };
    }
  };

  // Toggle completion
  const toggleTask = async (id) => {
    // Optimistic UI update
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id || t._id === id ? { ...t, completed: !t.completed } : t
      )
    );

    try {
      const updated = await taskApi.toggleTask(id);
      // Synchronize with server response
      setTasks((prev) =>
        prev.map((t) => (t.id === id || t._id === id ? updated : t))
      );
      return { success: true, task: updated };
    } catch (err) {
      // Revert on error
      fetchTasks();
      const msg = err.response?.data?.message || 'Failed to toggle status';
      setError(msg);
      return { success: false, error: msg };
    }
  };

  // Compute stats
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    return { total, completed, pending };
  }, [tasks]);

  // Filter tasks based on activeTab, searchQuery, and selectedCategory
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // Status filter
      if (activeTab === 'pending' && task.completed) return false;
      if (activeTab === 'completed' && !task.completed) return false;

      // Category filter
      if (selectedCategory !== 'All' && task.category?.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = task.title?.toLowerCase().includes(query);
        const matchesDesc = task.description?.toLowerCase().includes(query);
        const matchesCat = task.category?.toLowerCase().includes(query);
        return matchesTitle || matchesDesc || matchesCat;
      }

      return true;
    });
  }, [tasks, activeTab, searchQuery, selectedCategory]);

  return {
    tasks,
    filteredTasks,
    loading,
    error,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    stats,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTask
  };
};
