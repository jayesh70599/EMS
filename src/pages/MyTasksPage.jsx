// src/pages/MyTasksPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getAllTasks, updateTask, getAllEmployees } from '../services/storageService';
import { initialTasks, initialEmployees } from '../data/seedData'; // For initial seeding

const MyTasksPage = () => {
  const { currentUser } = useAuth();
  const [myTasks, setMyTasks] = useState([]);
  const [allEmployees, setAllEmployees] = useState([]); // To get names, though less critical here

  useEffect(() => {
    // Seed initial data if necessary
    getAllEmployees(initialEmployees); // Ensures employees are seeded
    const allSystemTasks = getAllTasks(initialTasks); // Ensures tasks are seeded

    if (currentUser && currentUser.role === 'employee' && currentUser.employeeId) {
      const assignedTasks = allSystemTasks.filter(task => task.assignedTo === currentUser.employeeId);
      setMyTasks(assignedTasks);
    }
    const loadedEmployees = getAllEmployees(); // Load all employees for potential future use (e.g. seeing who else is on a task if extended)
    setAllEmployees(loadedEmployees);
  }, [currentUser]);

  const handleStatusChange = (taskId, newStatus) => {
    const taskToUpdate = myTasks.find(task => task.id === taskId);
    if (taskToUpdate) {
      const updatedTaskDetails = { ...taskToUpdate, status: newStatus };
      updateTask(updatedTaskDetails); // Update in localStorage
      // Update local state to reflect change immediately
      setMyTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId ? updatedTaskDetails : task
        )
      );
    }
  };

  // Helper function for status badge color (can be moved to a utils file later)
  const getStatusBadgeColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'to do': return 'bg-gray-200 text-gray-700';
      case 'in progress': return 'bg-yellow-200 text-yellow-700';
      case 'completed': return 'bg-green-200 text-green-700';
      case 'review': return 'bg-blue-200 text-blue-700';
      default: return 'bg-gray-100 text-gray-500';
    }
  };

  const getPriorityBadgeColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'low': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'high': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-500';
    }
  };


  if (!currentUser || currentUser.role !== 'employee') {
    // This page should ideally not be reachable if not an employee due to ProtectedRoute,
    // but this is a fallback.
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-600">You do not have access to this page.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">My Assigned Tasks</h2>
      {myTasks.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Update Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {myTasks.map((task) => (
                <tr key={task.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{task.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{task.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.dueDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityBadgeColor(task.priority)}`}>
                        {task.priority}
                     </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(task.status)}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <select
                      value={task.status}
                      onChange={(e) => handleStatusChange(task.id, e.target.value)}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      <option value="To Do">To Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Review">Review</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600 mt-4">You have no tasks assigned to you.</p>
      )}
    </div>
  );
};

export default MyTasksPage;