// src/api.js
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const registerUser = (data) => API.post('/users/register', data);

  // src/api.js
export const loginUser = async (data) => {
  try {
    const response = await API.post('/users/login', data);
    return response.data; // Make sure to return response.data, not just response
  } catch (err) {
    console.error('Login failed:', err);
    throw err; // Re-throw error for further handling in the component
  }
};

  export const getTasks = (token) =>
    API.get('/tasks', {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => res.data); // ✅ VERY IMPORTANT
  
export const createTask = (task, token) =>
  API.post('/tasks', task, {
    headers: { Authorization: `Bearer ${token}` },
  });
// src/api.js

// Update task status (active to completed or vice versa)
export const updateTask = async (taskId, updatedData, token) => {
  try {
    const response = await API.put(`/tasks/${taskId}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // Return updated task data
  } catch (err) {
    console.error('Failed to update task:', err);
    throw err; // Re-throw error for further handling in the component
  }
};


// Delete task permanently from the database
// src/api.js

// Permanently delete a task using axios instead of fetch
export const deleteTask = async (id, token) => {
  try {
    const response = await API.delete(`/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to delete task:', error.response?.data || error.message);
    throw new Error('Failed to delete task');
  }
};
