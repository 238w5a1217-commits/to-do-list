import { taskService } from './task.service.js';

export const taskController = {
  /**
   * GET /api/tasks
   */
  async getTasks(req, res, next) {
    try {
      const { search, status, category } = req.query;
      const tasks = await taskService.getAllTasks({ search, status, category });
      res.status(200).json({
        success: true,
        count: tasks.length,
        data: tasks
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * GET /api/tasks/:id
   */
  async getTask(req, res, next) {
    try {
      const task = await taskService.getTaskById(req.params.id);
      if (!task) {
        return res.status(404).json({
          success: false,
          message: 'Task not found'
        });
      }
      res.status(200).json({
        success: true,
        data: task
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * POST /api/tasks
   */
  async createTask(req, res, next) {
    try {
      const { title, description, category, completed } = req.body;

      if (!title || title.trim() === '') {
        return res.status(400).json({
          success: false,
          message: 'Task title is required'
        });
      }

      const newTask = await taskService.createTask({
        title: title.trim(),
        description: description ? description.trim() : '',
        category,
        completed
      });

      res.status(201).json({
        success: true,
        message: 'Task created successfully',
        data: newTask
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * PUT /api/tasks/:id
   */
  async updateTask(req, res, next) {
    try {
      const { id } = req.params;
      const { title, description, category, completed } = req.body;

      if (title !== undefined && title.trim() === '') {
        return res.status(400).json({
          success: false,
          message: 'Task title cannot be empty'
        });
      }

      const updated = await taskService.updateTask(id, {
        title: title !== undefined ? title.trim() : undefined,
        description: description !== undefined ? description.trim() : undefined,
        category,
        completed
      });

      if (!updated) {
        return res.status(404).json({
          success: false,
          message: 'Task not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Task updated successfully',
        data: updated
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * DELETE /api/tasks/:id
   */
  async deleteTask(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = await taskService.deleteTask(id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: 'Task not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Task deleted successfully',
        data: { id }
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * PATCH /api/tasks/:id/toggle
   */
  async toggleTask(req, res, next) {
    try {
      const { id } = req.params;
      const toggled = await taskService.toggleTaskStatus(id);

      if (!toggled) {
        return res.status(404).json({
          success: false,
          message: 'Task not found'
        });
      }

      res.status(200).json({
        success: true,
        message: `Task marked as ${toggled.completed ? 'completed' : 'pending'}`,
        data: toggled
      });
    } catch (error) {
      next(error);
    }
  }
};
