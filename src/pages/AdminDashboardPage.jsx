// src/pages/AdminDashboardPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getAllEmployees, getAllTasks } from '../services/storageService'; // LS services

// StatCard component (can be a common component)
const StatCard = ({ title, value, linkTo, bgColor = 'bg-blue-500', textColor = 'text-white', linkText = "View Details" }) => (
  <div className={`p-6 rounded-lg shadow-lg ${bgColor} ${textColor}`}>
    <h3 className="text-xl font-semibold">{title}</h3>
    <p className="text-3xl font-bold mt-2">{value}</p>
    {linkTo && (
      <Link to={linkTo} className="mt-4 inline-block text-sm hover:underline">
        {linkText} &rarr;
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
  // isLoading can be used for a refresh button's state
  const [isLoading, setIsLoading] = useState(false);

  const loadDashboardStats = useCallback(() => {
    setIsLoading(true);
    const employees = getAllEmployees(); // Gets from seedData via service
    const tasks = getAllTasks(); // Gets from localStorage, seeds if empty

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
    setIsLoading(false);
  }, [])

  useEffect(() => {
    loadDashboardStats();
  }, [loadDashboardStats]); // No dependencies needed as getAllEmployees is stable for static data

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">Admin Dashboard</h1>
        <button 
            onClick={loadDashboardStats} 
            disabled={isLoading}
            className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm py-2 px-3 rounded disabled:opacity-50"
        >
            {isLoading ? 'Refreshing...' : 'Refresh Stats'}
        </button>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Employees"
          value={stats.totalEmployees}
          linkTo="/admin/employees"
          bgColor="bg-indigo-500"
          linkText="View Employee Directory"
        />
        <StatCard
          title="Total Tasks"
          value={stats.totalTasks}
          linkTo="/admin/tasks"
          bgColor="bg-teal-500"
          linkText="Manage Tasks"
        />
        {/* You can add more summary cards here if needed */}
      </div>

      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Task Status Overview</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="To Do" value={stats.tasksToDo} bgColor="bg-gray-400" textColor="text-gray-800" />
          <StatCard title="In Progress" value={stats.tasksInProgress} bgColor="bg-yellow-400" textColor="text-yellow-800" />
          <StatCard title="In Review" value={stats.tasksInReview} bgColor="bg-sky-400" textColor="text-sky-800" />
          <StatCard title="Completed" value={stats.tasksCompleted} bgColor="bg-green-500" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          {/* Add Employee button is removed as employees are static */}
          <Link to="/admin/tasks/add">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg">
              Add New Task
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;