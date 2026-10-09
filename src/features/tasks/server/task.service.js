import { Task } from './task.model.js';

export const taskService = {
  /**
   * Retrieve tasks with optional search, status filtering, and sorting
   */
  async getAllTasks({ search, status, category } = {}) {
    const filter = {};

    if (status === 'completed') {
      filter.completed = true;
    } else if (status === 'pending') {
      filter.completed = false;
    }

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      filter.$or = [{ title: searchRegex }, { description: searchRegex }];
    }

    return await Task.find(filter).sort({ createdAt: -1 });
  },

  /**
   * Find a single task by ID
   */
  async getTaskById(id) {
    return await Task.findById(id);
  },

  /**
   * Create a new task
   */
  async createTask(data) {
    const task = new Task({
      title: data.title,
      description: data.description || '',
      category: data.category || 'General',
      completed: Boolean(data.completed)
    });
    return await task.save();
  },

  /**
   * Update an existing task
   */
  async updateTask(id, data) {
    const updatePayload = {};
    if (data.title !== undefined) updatePayload.title = data.title;
    if (data.description !== undefined) updatePayload.description = data.description;
    if (data.category !== undefined) updatePayload.category = data.category;
    if (data.completed !== undefined) updatePayload.completed = data.completed;

    return await Task.findByIdAndUpdate(id, updatePayload, {
      new: true,
      runValidators: true
    });
  },

  /**
   * Delete a task by ID
   */
  async deleteTask(id) {
    return await Task.findByIdAndDelete(id);
  },

  /**
   * Delete all tasks (for clearing/resetting)
   */
  async deleteAllTasks() {
    return await Task.deleteMany({});
  },

  /**
   * Toggle task completion state
   */
  async toggleTaskStatus(id) {
    const task = await Task.findById(id);
    if (!task) return null;
    task.completed = !task.completed;
    return await task.save();
  }
};
