import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import { getTasks } from '../api';
import '../styles/Pages.css';
import Chart from 'chart.js/auto';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [completedCount, setCompletedCount] = useState(0); // Track completed task count
  const chartRef = useRef(null); // stores the chart instance

  // Update completed task count
  const updateCompletedCount = (change) => {
    setCompletedCount(prevCount => prevCount + change); // Update completed task count
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const data = await getTasks(token);
        console.log('Fetched tasks:', data); // ✅ check in console
        if (!Array.isArray(data)) {
          console.error('Expected tasks array, got:', data);
          setTasks([]); // fallback to empty list to avoid map/filter errors
          return;
        }
        setTasks(data);
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setTasks([]); // fallback so it doesn’t stay undefined
      }
    };
    fetchData();
  }, []);  

  // Chart rendering
  useEffect(() => {
    const ctx = document.getElementById('priorityChart');
    if (!ctx) return;

    // Destroy previous chart instance if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const counts = {
      high: tasks.filter(t => t.priority === 'high').length,
      medium: tasks.filter(t => t.priority === 'medium').length,
      low: tasks.filter(t => t.priority === 'low').length,
    };

    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['High', 'Medium', 'Low'],
        datasets: [{
          label: 'Priority Count',
          data: [counts.high, counts.medium, counts.low],
          backgroundColor: ['#f44336', '#ff9800', '#4caf50']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

  }, [tasks]); // Update chart whenever tasks change

  const total = tasks.length;
  const inProgress = tasks.filter(t => t.status === 'active').length;
  const completed = tasks.filter(t => t.status === 'completed').length;

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h2>Dashboard</h2>
        <div className="stats">
          <div className="card">Total Tasks: {total}</div>
          <div className="card">In Progress: {inProgress}</div>
          <div className="card">Completed: {completed}</div>
          </div>
        <div style={{ height: '400px' }}>
          <canvas id="priorityChart" width="400" height="200"></canvas>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
