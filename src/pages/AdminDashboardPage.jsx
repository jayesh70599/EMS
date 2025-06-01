// src/pages/AdminDashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllEmployees, getAllTasks } from '../services/storageService';
import { initialEmployees, initialTasks } from '../data/seedData'; // For initial seeding

// A simple card component for displaying stats
const StatCard = ({ title, value, linkTo, bgColor = 'bg-blue-500', textColor = 'text-white' }) => (
  <div className={`p-6 rounded-lg shadow-lg ${bgColor} ${textColor}`}>
    <h3 className="text-xl font-semibold">{title}</h3>
    <p className="text-3xl font-bold mt-2">{value}</p>
    {linkTo && (
      <Link to={linkTo} className="mt-4 inline-block text-sm hover:underline">
        View Details &rarr;
      </Link>
    )}
  </div>
);

const AdminDashboardPage = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalTasks: 0,
    tasksToDo: 0,
    tasksInProgress: 0,
    tasksCompleted: 0,
    tasksInReview: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ensure data is seeded if localStorage is empty
    const employees = getAllEmployees(initialEmployees);
    const tasks = getAllTasks(initialTasks);

    const tasksToDo = tasks.filter(task => task.status?.toLowerCase() === 'to do').length;
    const tasksInProgress = tasks.filter(task => task.status?.toLowerCase() === 'in progress').length;
    const tasksCompleted = tasks.filter(task => task.status?.toLowerCase() === 'completed').length;
    const tasksInReview = tasks.filter(task => task.status?.toLowerCase() === 'review').length;

    setStats({
      totalEmployees: employees.length,
      totalTasks: tasks.length,
      tasksToDo,
      tasksInProgress,
      tasksCompleted,
      tasksInReview,
    });
    setLoading(false);
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600 mt-10">Loading dashboard data...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">Admin Dashboard</h1>

      {/* Key Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Employees"
          value={stats.totalEmployees}
          linkTo="/admin/employees"
          bgColor="bg-indigo-500"
        />
        <StatCard
          title="Total Tasks"
          value={stats.totalTasks}
          linkTo="/admin/tasks"
          bgColor="bg-teal-500"
        />
        {/* You can add more summary cards here if needed */}
      </div>

      {/* Task Status Breakdown */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Task Status Overview</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="To Do" value={stats.tasksToDo} bgColor="bg-gray-400" textColor="text-gray-800" />
          <StatCard title="In Progress" value={stats.tasksInProgress} bgColor="bg-yellow-400" textColor="text-yellow-800" />
           <StatCard title="In Review" value={stats.tasksInReview} bgColor="bg-sky-400" textColor="text-sky-800" />
          <StatCard title="Completed" value={stats.tasksCompleted} bgColor="bg-green-500" />
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link to="/admin/employees/add">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg">
              Add New Employee
            </button>
          </Link>
          <Link to="/admin/tasks/add">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg">
              Add New Task
            </button>
          </Link>
        </div>
      </div>

      {/* You could add more sections like "Recent Activity" or "Pending Approvals" if the app grows */}
    </div>
  );
};

export default AdminDashboardPage;