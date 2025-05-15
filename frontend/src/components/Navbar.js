import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from "../image/logo3.PNG";
import { Dropdown } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" />
        <div className="nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/tasks">Tasks</Link>
          <Link to="/trash">Trash</Link>
        </div>
      </div>

      <div className="navbar-right">
        <Dropdown align="end">
          <Dropdown.Toggle
            id="user-dropdown"
            style={{
              backgroundColor: 'black',
              border: 'none', // Remove border for cleaner look
            }}
          >
            <FaUserCircle size={30} />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </nav>
  );
}

export default Navbar;
