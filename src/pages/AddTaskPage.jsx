// src/pages/AddTaskPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { addTask, getAllEmployees } from '../services/storageService'; // LS services

const AddTaskPage = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: '',
    description: '',
    assignedTo: '', // Will store Employee ID from the static list
    dueDate: '',
    status: 'To Do', // Default status
    priority: 'Medium', // Default priority
  });
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // For button states during submission
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Load static employees for the dropdown
  const loadEmployees = useCallback(() => {
    const loadedEmployees = getAllEmployees(); // Synchronous call, gets from seedData
    setEmployees(loadedEmployees);
    // Optionally set a default assignee if the list is not empty
    // if (loadedEmployees.length > 0 && !task.assignedTo) {
    //   setTask(prevTask => ({ ...prevTask, assignedTo: loadedEmployees[0].id }));
    // }
  }, []); // No dependencies needed as getAllEmployees is stable for static data

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
    setError(''); // Clear error on change
    setSuccessMessage(''); // Clear success message on change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    if (!task.title || !task.assignedTo) {
      setError('Task Title and Assigned Employee are required.');
      setIsLoading(false);
      return;
    }

    const addedTask = addTask(task); // Synchronous LS call from storageService

    if (addedTask && addedTask.id) {
      setSuccessMessage(`Task "${addedTask.title}" added successfully with ID: ${addedTask.id}.`);
      // Reset form, perhaps keeping the selected assignee or clearing it
      setTask({
        title: '',
        description: '',
        assignedTo: employees.length > 0 ? '' : '', // Clear or default assignee
        dueDate: '',
        status: 'To Do',
        priority: 'Medium'
      });
      // Optionally navigate:
      // navigate('/admin/tasks');
    } else {
      setError('Failed to add task. An unexpected error occurred.');
    }
    setIsLoading(false);
  };

  const inputClass = "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-50";
  const labelClass = "block text-sm font-medium text-gray-700";
  const selectClass = inputClass;

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
       <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">Add New Task (LocalStorage)</h2>
        <Link to="/admin/tasks" className="text-sm text-blue-600 hover:text-blue-800">
          &larr; Back to Task List
        </Link>
      </div>

      {error && !successMessage && <p className="text-red-600 bg-red-100 p-3 rounded-md text-sm mb-4">{error}</p>}
      {successMessage && <p className="text-green-700 bg-green-100 p-3 rounded-md text-sm mb-4">{successMessage}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className={labelClass}>Title:</label>
          <input type="text" id="title" name="title" value={task.title} onChange={handleChange} className={inputClass} required disabled={isLoading} />
        </div>
        <div>
          <label htmlFor="description" className={labelClass}>Description:</label>
          <textarea id="description" name="description" value={task.description} onChange={handleChange} rows="3" className={inputClass} disabled={isLoading}></textarea>
        </div>
        <div>
          <label htmlFor="assignedTo" className={labelClass}>Assign To:</label>
          <select
            id="assignedTo"
            name="assignedTo"
            value={task.assignedTo}
            onChange={handleChange}
            className={selectClass}
            required
            disabled={isLoading || employees.length === 0}
          >
            <option value="">-- Select Employee --</option>
            {employees.map(emp => (
              <option key={emp.id} value={emp.id}>{emp.name} ({emp.email})</option>
            ))}
          </select>
          {employees.length === 0 && ( // Show if no employees are available (shouldn't happen if seedData is correct)
            <p className="text-xs text-red-500 mt-1">No employees available for assignment.</p>
          )}
        </div>
        <div>
          <label htmlFor="dueDate" className={labelClass}>Due Date:</label>
          <input type="date" id="dueDate" name="dueDate" value={task.dueDate} onChange={handleChange} className={inputClass} disabled={isLoading} />
        </div>
        <div>
          <label htmlFor="status" className={labelClass}>Status:</label>
          <select id="status" name="status" value={task.status} onChange={handleChange} className={selectClass} disabled={isLoading}>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Review">Review</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          <label htmlFor="priority" className={labelClass}>Priority:</label>
          <select id="priority" name="priority" value={task.priority} onChange={handleChange} className={selectClass} disabled={isLoading}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="flex items-center justify-end space-x-3 pt-2">
          <Link to="/admin/tasks" className={`px-4 py-2 rounded-md text-sm font-medium border border-gray-300 hover:bg-gray-50 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'text-gray-700'}`}>
            Cancel
          </Link>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
            disabled={isLoading || (employees.length === 0 && !error) || (!!successMessage && !error)}
          >
            {isLoading ? 'Adding Task...' : 'Add Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskPage;