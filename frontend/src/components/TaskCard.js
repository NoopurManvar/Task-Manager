import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';

const TaskCard = ({ task, onTaskDelete, onStatusChange, onPriorityChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleStatusChange = (status) => {
    onStatusChange(task._id, status);
    setShowDropdown(false); // Hide dropdown after change
  };

  const handlePriorityChange = (priority) => {
    onPriorityChange(task._id, priority);
    setShowDropdown(false); // Hide dropdown after change
  };

  return (
    <div className="task-card">
      <div className="task-info">
        <h4>{task.title}</h4>
        <p>{task.description}</p>
        <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
      </div>
      
      <div className="task-actions">
        {/* Priority dropdown */}
        <div className="dropdown-container">
          <label>Priority:</label>
          <Dropdown onSelect={(priority) => handlePriorityChange(priority)}>
            <Dropdown.Toggle variant="link">
              {task.priority}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="low">Low</Dropdown.Item>
              <Dropdown.Item eventKey="medium">Medium</Dropdown.Item>
              <Dropdown.Item eventKey="high">High</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* Status dropdown */}
        <div className="dropdown-container">
          <label>Status:</label>
          <Dropdown onSelect={(status) => handleStatusChange(status)}>
            <Dropdown.Toggle variant="link">
              {task.status}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="active">Active</Dropdown.Item>
              <Dropdown.Item eventKey="completed">Completed</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* Delete button */}
        <button className="delete-button" style={{height:'35px', marginTop:'20px'}} onClick={() => onTaskDelete(task._id)}>Delete</button>
      </div>
    </div>
  );
};

export default TaskCard;
