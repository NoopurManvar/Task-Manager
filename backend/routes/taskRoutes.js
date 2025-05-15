  import express from 'express';
  import {
    createTask, getTasks, updateTask, deleteTask, restoreTask
  } from '../controllers/taskController.js';
  import protect from '../middleware/authMiddleware.js';

  const router = express.Router();


  router.post('/', protect, createTask);      // needs auth
  router.get('/', protect, getTasks);         // needs auth
  router.put('/:id', protect, updateTask);    // needs auth
  router.delete('/:id', protect, deleteTask); // needs auth
  router.patch('/restore/:id', protect, restoreTask); // needs auth


  export default router;
