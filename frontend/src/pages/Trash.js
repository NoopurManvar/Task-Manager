import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getTasks, updateTask } from '../api';
import '../styles/Tasks.css';

function Trash({ updateCompletedCount }) {
  const [completedTasks, setCompletedTasks] = useState([]);

  const fetchCompletedTasks = async () => {
    const token = localStorage.getItem('token');
    const allTasks = await getTasks(token);
    
    const filtered = allTasks.filter(
      (task) => task.status === 'completed' && !task.isDeleted
    );
    
    setCompletedTasks(filtered);
  };

  const handleRestore = async (taskId) => {
    const token = localStorage.getItem('token');
    await updateTask(taskId, { status: 'active' }, token);
    fetchCompletedTasks(); // update list
  };

  const handlePermanentlyDelete = async (taskId) => {
    const token = localStorage.getItem('token');
    await updateTask(taskId, { isDeleted: true }, token);
    setCompletedTasks(prev => prev.filter(task => task._id !== taskId));
  };
  

  useEffect(() => {
    fetchCompletedTasks();
  }, []);

  return (
    <>
      <Navbar />
      <div className="tasks-container">
        <h2 style={{marginLeft:'20px', marginTop:'20px'}}>Trash</h2>
        <div className="task-list">
          {completedTasks.map(task => (
            <div className="task-card" key={task._id}>
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
              <p>Priority: {task.priority}</p>
              <button onClick={() => handleRestore(task._id)}>Restore</button>
              <button onClick={() => handlePermanentlyDelete(task._id)}>Permanently Delete</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Trash;
