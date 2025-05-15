import React, { useState } from 'react';
import { createTask } from '../api';
import '../styles/TaskForm.css';

function TaskForm({ onClose, onTaskAdded }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    status: 'active',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await createTask(form, token);
    onClose();
    onTaskAdded();
  };

  return (
    <div className="form-overlay">
      <div className="task-form">
        <h3>Create New Task</h3>
        <form onSubmit={handleSubmit}>
          <input name="title" placeholder="Title" onChange={handleChange} required />
          <textarea name="description" placeholder="Description" onChange={handleChange} required />
          <input name="dueDate" type="date" onChange={handleChange} required />
          <select name="priority" onChange={handleChange}>
            <option value="high">High</option>
            <option value="medium" selected>Medium</option>
            <option value="low">Low</option>
          </select>
          <select name="status" onChange={handleChange}>
            <option value="active" selected>Active</option>
            <option value="completed">Completed</option>
          </select>
          <button type="submit" className="fancy-button">Add Task</button>
          </form>
        <button className="fancy-button cancel-button" onClick={onClose}>Cancel</button>

      </div>
    </div>
  );
}

export default TaskForm;
