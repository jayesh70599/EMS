// src/pages/MyTasksPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext'; // LS-based AuthContext
import { getAllTasks, updateTask } from '../services/storageService'; // LS services

const MyTasksPage = () => {
  const { currentUser } = useAuth();
  const [myTasks, setMyTasks] = useState([]);
  const [error, setError] = useState(null);
  // isLoading can be used for a general refresh button, not critical for initial LS load
  const [isLoading, setIsLoading] = useState(false); 
  const [updatingTaskId, setUpdatingTaskId] = useState(null); // To show loading on specific task status update

  const loadMyTasks = useCallback(() => {
    setIsLoading(true); // Indicate activity, e.g., for refresh button
    setError(null);
    if (currentUser && currentUser.role === 'employee' && currentUser.employeeId) {
      const allSystemTasks = getAllTasks(); // Synchronous LS call
      const assignedTasks = allSystemTasks.filter(task => task.assignedTo === currentUser.employeeId);
      setMyTasks(assignedTasks);
    } else {
      setMyTasks([]); // Clear tasks if no valid employee user
    }
    setIsLoading(false);
  }, [currentUser]);

  useEffect(() => {
    loadMyTasks();
  }, [loadMyTasks]); // Re-run if currentUser changes (e.g., on login/logout)

  const handleStatusChange = (taskId, newStatus) => {
    const taskToUpdate = myTasks.find(task => task.id === taskId);
    if (taskToUpdate) {
      setUpdatingTaskId(taskId); // Indicate which task is being updated
      setError(null);
      
      // The data to update in localStorage. updateTask expects the full updated object.
      const updatedTaskDetails = { ...taskToUpdate, status: newStatus };
      const success = updateTask(taskId, updatedTaskDetails); // Synchronous LS call

      if (success) {
        // Update local state to reflect change immediately for better UX
        setMyTasks(prevTasks =>
          prevTasks.map(task =>
            task.id === taskId ? { ...task, status: newStatus } : task
          )
        );
      } else {
        setError("Failed to update task status. Please try again or refresh.");
        // If update failed, the local state might be out of sync with LS.
        // A full reload via loadMyTasks() could be an option here too.
      }
      setUpdatingTaskId(null);
    }
  };

  // Helper functions for badge colors
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
    // This should ideally be handled by ProtectedRoute, but good as a fallback.
    return (
      <div className="bg-white p-6 rounded-lg shadow-md mt-10">
        <p className="text-gray-600 text-center">Please log in as an employee to view your tasks.</p>
      </div>
    );
  }
  
  // Initial loading state (though LS is fast, good for consistency if there was a brief calculation)
  // if (isLoading && myTasks.length === 0 && !error) { // Check error to avoid showing loading on error
  //    return <p className="text-center text-gray-600 mt-10 p-4">Loading your tasks...</p>;
  // }


  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">My Assigned Tasks (LocalStorage)</h2>
        <button 
            onClick={loadMyTasks} 
            disabled={isLoading}
            className="text-sm bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded disabled:opacity-50"
        >
            {isLoading ? 'Refreshing...' : 'Refresh Tasks'}
        </button>
      </div>

      {error && <p className="text-red-500 bg-red-100 p-3 rounded-md text-sm mb-4">{error}</p>}

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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">Update Status</th>
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
                      disabled={updatingTaskId === task.id} // Disable while this specific task is updating
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md disabled:opacity-70"
                    >
                      <option value="To Do">To Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Review">Review</option>
                      <option value="Completed">Completed</option>
                    </select>
                    {updatingTaskId === task.id && <p className="text-xs text-blue-500 mt-1">Updating...</p>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600 mt-4">You have no tasks assigned to you at the moment.</p>
      )}
    </div>
  );
};

export default MyTasksPage;