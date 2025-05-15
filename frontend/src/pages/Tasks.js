import React, { useEffect, useState } from 'react';
import { getTasks, updateTask, deleteTask } from '../api';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm'; // ✅ Make sure this exists
import Navbar from '../components/Navbar';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false); // ✅ Show/hide form

  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    const data = await getTasks(token);
    setTasks(data.filter(task => task.status === 'active'));
  };

  const handleTaskDelete = async (taskId) => {
    const token = localStorage.getItem('token');
    await deleteTask(taskId, token);
    fetchTasks();
  };

  const handleStatusChange = async (taskId, status) => {
    const token = localStorage.getItem('token');
    await updateTask(taskId, { status }, token);
    fetchTasks();
  };

  const handlePriorityChange = async (taskId, priority) => {
    const token = localStorage.getItem('token');
    await updateTask(taskId, { priority }, token);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="tasks-container">
        <div className="task-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{marginLeft:'20px', marginTop:'20px'}}>Your Tasks</h2>
          <button onClick={() => setShowForm(true)} style={{marginRight:'40px', marginTop:'20px'}}>+ Create Task</button>
        </div>

        {showForm && (
          <TaskForm
            onClose={() => setShowForm(false)}
            onTaskAdded={fetchTasks}
          />
        )}

        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onTaskDelete={handleTaskDelete}
            onStatusChange={handleStatusChange}
            onPriorityChange={handlePriorityChange}
          />
        ))}
      </div>
    </div>
  );
}

export default Tasks;
