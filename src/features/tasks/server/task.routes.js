import express from 'express';
import { taskController } from './task.controller.js';

const router = express.Router();

// Base endpoint: /api/tasks
router.route('/')
  .get(taskController.getTasks)
  .post(taskController.createTask);

router.route('/:id')
  .get(taskController.getTask)
  .put(taskController.updateTask)
  .delete(taskController.deleteTask);

router.patch('/:id/toggle', taskController.toggleTask);

export default router;
