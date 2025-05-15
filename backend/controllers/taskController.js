import Task from '../models/Task.js';

export const createTask = async (req, res) => {
  const task = await Task.create({ ...req.body, userId: req.userId });
  res.status(201).json(task);
};

export const getTasks = async (req, res) => {
  console.log('🔒 Protected Route - User ID:', req.userId); // add this
  const tasks = await Task.find({ userId: req.userId });
  res.json(tasks);
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update task' });
  }
};


export const deleteTask = async (req, res) => {
  await Task.findByIdAndUpdate(req.params.id, { status: 'completed' });
  res.json({ message: 'Task marked as completed' });
};

export const restoreTask = async (req, res) => {
  await Task.findByIdAndUpdate(req.params.id, { status: 'active' });
  res.json({ message: 'Task restored' });
};
