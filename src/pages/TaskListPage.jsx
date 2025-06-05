// src/pages/TaskListPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getAllTasks, deleteTask, getAllEmployees } from '../services/storageService'; // LS services

const TaskListPage = () => {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // For button states/refresh action

  const loadTasksAndEmployees = useCallback(() => {
    setIsLoading(true);
    setError('');
    // These are synchronous calls to localStorage
    const loadedTasks = getAllTasks();
    const loadedEmployees = getAllEmployees(); // Employees are from seedData via service
    setTasks(loadedTasks);
    setEmployees(loadedEmployees);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadTasksAndEmployees();
  }, [loadTasksAndEmployees]);

  const getEmployeeNameById = (employeeId) => {
    if (!employees || employees.length === 0) return 'Loading...'; // Should be quick with LS
    const employee = employees.find(emp => emp.id === employeeId);
    return employee ? employee.name : 'Unassigned or N/A';
  };

  const handleDelete = (taskId, taskTitle) => {
    if (window.confirm(`Are you sure you want to delete task: "${taskTitle}"?`)) {
      setIsLoading(true); // Indicate operation
      setError('');
      const success = deleteTask(taskId); // Synchronous LS call
      if (success) {
        loadTasksAndEmployees(); // Re-fetch to update list
      } else {
        setError(`Failed to delete task: "${taskTitle}". Task not found or error.`);
      }
      setIsLoading(false);
    }
  };

  const filteredTasks = tasks.filter(task =>
    (task.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (task.description?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (getEmployeeNameById(task.assignedTo)?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

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

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">Manage All Tasks (LocalStorage)</h2>
        <div className="space-x-2">
            <button
                onClick={loadTasksAndEmployees}
                disabled={isLoading}
                className="bg-green-500 hover:bg-green-600 text-white text-sm py-2 px-3 rounded disabled:opacity-50"
            >
                {isLoading ? 'Refreshing...' : 'Refresh List'}
            </button>
            <Link to="/admin/tasks/add">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add New Task
            </button>
            </Link>
        </div>
      </div>

      {error && <p className="text-red-500 bg-red-100 p-3 rounded-md text-sm mb-4">{error}</p>}

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search tasks by title, description, assignee..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {filteredTasks.length === 0 && !error && (
         <p className="text-gray-600 mt-4">
          No tasks found. {searchTerm ? 'Try adjusting your search.' : 'Add a new task!'}
        </p>
      )}

      {filteredTasks.length > 0 && (
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID (LS)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTasks.map((task) => (
                <tr key={task.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{task.title}</div>
                    <div className="text-xs text-gray-500 truncate max-w-xs">{task.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getEmployeeNameById(task.assignedTo)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.dueDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(task.status)}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityBadgeColor(task.priority)}`}>
                        {task.priority}
                     </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-400">{task.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link to={`/admin/tasks/edit/${task.id}`} className="text-indigo-600 hover:text-indigo-900 mr-3">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(task.id, task.title)}
                      className="text-red-600 hover:text-red-900 disabled:opacity-50"
                      disabled={isLoading}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TaskListPage;