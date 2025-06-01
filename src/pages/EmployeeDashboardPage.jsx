// src/pages/EmployeeDashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getAllTasks } from '../services/storageService';
import { initialTasks } from '../data/seedData'; // For initial seeding

// Reusable StatCard component (can be moved to a common components folder later)
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

const EmployeeDashboardPage = () => {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({
    totalAssignedTasks: 0,
    tasksToDo: 0,
    tasksInProgress: 0,
    tasksCompleted: 0,
    tasksInReview: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser && currentUser.role === 'employee' && currentUser.employeeId) {
      const allSystemTasks = getAllTasks(initialTasks); // Ensure tasks are seeded
      const employeeTasks = allSystemTasks.filter(task => task.assignedTo === currentUser.employeeId);

      const tasksToDo = employeeTasks.filter(task => task.status?.toLowerCase() === 'to do').length;
      const tasksInProgress = employeeTasks.filter(task => task.status?.toLowerCase() === 'in progress').length;
      const tasksCompleted = employeeTasks.filter(task => task.status?.toLowerCase() === 'completed').length;
      const tasksInReview = employeeTasks.filter(task => task.status?.toLowerCase() === 'review').length;

      setStats({
        totalAssignedTasks: employeeTasks.length,
        tasksToDo,
        tasksInProgress,
        tasksCompleted,
        tasksInReview,
      });
    }
    setLoading(false);
  }, [currentUser]);

  if (loading) {
    return <p className="text-center text-gray-600 mt-10">Loading dashboard data...</p>;
  }

  if (!currentUser || currentUser.role !== 'employee') {
    // Should be handled by ProtectedRoute, but as a fallback
    return <p className="text-center text-red-500 mt-10">Access Denied.</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">My Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Assigned Tasks"
          value={stats.totalAssignedTasks}
          linkTo="/employee/tasks"
          bgColor="bg-purple-500"
          linkText="View My Tasks"
        />
        {/* You can add more summary cards relevant to the employee */}
      </div>

      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">My Task Status Overview</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="To Do" value={stats.tasksToDo} bgColor="bg-gray-400" textColor="text-gray-800" />
          <StatCard title="In Progress" value={stats.tasksInProgress} bgColor="bg-yellow-400" textColor="text-yellow-800" />
          <StatCard title="In Review" value={stats.tasksInReview} bgColor="bg-sky-400" textColor="text-sky-800" />
          <StatCard title="Completed" value={stats.tasksCompleted} bgColor="bg-green-500" />
        </div>
      </div>

      {/* Quick link to full task list */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Quick Access</h2>
        <Link to="/employee/tasks">
          <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg text-lg">
            View All My Tasks
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EmployeeDashboardPage;