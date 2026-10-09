import axios from 'axios';

// Create configured Axios instance
const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

export const taskApi = {
  /**
   * Fetch all tasks with optional filters
   * @param {Object} params { search, status, category }
   */
  async getTasks(params = {}) {
    const response = await apiClient.get('/tasks', { params });
    return response.data.data;
  },

  /**
   * Fetch a single task by ID
   */
  async getTask(id) {
    const response = await apiClient.get(`/tasks/${id}`);
    return response.data.data;
  },

  /**
   * Create a new task
   * @param {Object} taskData { title, description, category, completed }
   */
  async createTask(taskData) {
    const response = await apiClient.post('/tasks', taskData);
    return response.data.data;
  },

  /**
   * Update existing task by ID
   * @param {string} id
   * @param {Object} taskData
   */
  async updateTask(id, taskData) {
    const response = await apiClient.put(`/tasks/${id}`, taskData);
    return response.data.data;
  },

  /**
   * Delete a task by ID
   * @param {string} id
   */
  async deleteTask(id) {
    const response = await apiClient.delete(`/tasks/${id}`);
    return response.data;
  },

  /**
   * Toggle completed status of a task
   * @param {string} id
   */
  async toggleTask(id) {
    const response = await apiClient.patch(`/tasks/${id}/toggle`);
    return response.data.data;
  }
};
