// src/pages/TaskListPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllTasks, deleteTask, getAllEmployees } from '../services/storageService';
import { initialTasks } from '../data/seedData';
import { initialEmployees } from '../data/seedData'; // Needed to map employee names

const TaskListPage = () => {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]); // To map employee ID to name
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Seed with initialTasks if localStorage is empty
    const loadedTasks = getAllTasks(initialTasks);
    setTasks(loadedTasks);
    // Load employees to display names instead of IDs
    const loadedEmployees = getAllEmployees(initialEmployees);
    setEmployees(loadedEmployees);
  }, []);

  const getEmployeeNameById = (employeeId) => {
    const employee = employees.find(emp => emp.id === employeeId);
    return employee ? employee.name : 'Unassigned';
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(id);
      setTasks(getAllTasks()); // Refresh task list
    }
  };

  const filteredTasks = tasks.filter(task =>
    (task.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (task.description?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (getEmployeeNameById(task.assignedTo)?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  // Helper function to determine badge color based on status
  const getStatusBadgeColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'to do':
        return 'bg-gray-200 text-gray-700';
      case 'in progress':
        return 'bg-yellow-200 text-yellow-700';
      case 'completed':
        return 'bg-green-200 text-green-700';
      case 'review':
        return 'bg-blue-200 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-500';
    }
  };
   const getPriorityBadgeColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'low':
        return 'bg-green-100 text-green-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'high':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-500';
    }
  };


  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">Manage All Tasks</h2>
        <Link to="/admin/tasks/add">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add New Task
          </button>
        </Link>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search tasks by title, description, assignee..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {filteredTasks.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link to={`/admin/tasks/edit/${task.id}`} className="text-indigo-600 hover:text-indigo-900 mr-3">
                      Edit
                    </Link> {/* Edit Task page to be created later */}
                    <button onClick={() => handleDelete(task.id)} className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600 mt-4">No tasks found. {searchTerm && 'Try adjusting your search.'}</p>
      )}
    </div>
  );
};

export default TaskListPage;