// src/pages/EditTaskPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getTaskById, updateTask, getAllEmployees } from '../services/storageService'; // LS services

const EditTaskPage = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: '',
    description: '',
    assignedTo: '',
    dueDate: '',
    status: 'To Do',
    priority: 'Medium',
  });
  const [originalTaskTitle, setOriginalTaskTitle] = useState('');
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // For button states during update
  const [isDataLoading, setIsDataLoading] = useState(true); // For initial data load (though LS is fast)
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [notFound, setNotFound] = useState(false);

  const loadEmployees = useCallback(() => {
    const loadedEmployees = getAllEmployees(); // Sync LS call (gets from seedData)
    setEmployees(loadedEmployees);
  }, []);

  useEffect(() => {
    setIsDataLoading(true);
    setError('');
    setSuccessMessage('');
    loadEmployees(); // Load employees for the dropdown

    if (!taskId) {
      setNotFound(true);
      setError('Task ID is missing from URL.');
      setIsDataLoading(false);
      return;
    }

    const existingTask = getTaskById(taskId); // Sync LS call

    if (existingTask) {
      setTask({
        title: existingTask.title || '',
        description: existingTask.description || '',
        assignedTo: existingTask.assignedTo || '',
        dueDate: existingTask.dueDate || '',
        status: existingTask.status || 'To Do',
        priority: existingTask.priority || 'Medium',
      });
      setOriginalTaskTitle(existingTask.title || 'Task');
      setNotFound(false);
    } else {
      setNotFound(true);
      setError(`Task with ID "${taskId}" not found in LocalStorage.`);
    }
    setIsDataLoading(false);
  }, [taskId, loadEmployees]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
    setError(''); // Clear error on input change
    setSuccessMessage(''); // Clear success message on input change
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

    const updated = updateTask(taskId, task); // Synchronous LS call

    if (updated) {
      setSuccessMessage(`Task "${task.title}" updated successfully!`);
      setOriginalTaskTitle(task.title); // Update title if name changed
      // Optionally navigate:
      // navigate('/admin/tasks');
    } else {
      // This might happen if updateTask returns null (e.g., task ID not found during update)
      setError('Failed to update task. Please ensure the task exists or try again.');
    }
    setIsLoading(false);
  };

  const inputClass = "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-50";
  const labelClass = "block text-sm font-medium text-gray-700";
  const selectClass = inputClass;

  if (isDataLoading) {
      return <p className="text-center text-gray-600 mt-10 p-4">Loading task data...</p>;
  }

  if (notFound) {
    return (
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md text-center mt-10">
        <h2 className="text-xl font-semibold text-red-600 mb-4">Task Not Found</h2>
        <p className="text-gray-600 mb-6">{error || `No task exists with the ID: ${taskId}`}</p>
        <Link to="/admin/tasks">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            &larr; Back to Task List
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">Edit Task: <span className="font-normal">{originalTaskTitle}</span> (LocalStorage)</h2>
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
           {employees.length === 0 && !isDataLoading && ( // Show if no employees loaded
            <p className="text-xs text-red-500 mt-1">No employees available for assignment.</p>
          )}
        </div>
        <div>
          <label htmlFor="dueDate" className={labelClass}>Due Date:</label>
          <input type="date" id="dueDate" name="dueDate" value={task.dueDate || ''} onChange={handleChange} className={inputClass} disabled={isLoading} />
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
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
            disabled={isLoading || (!!successMessage && !error)} // Disable if loading or success (and no new error)
          >
            {isLoading ? 'Updating Task...' : 'Update Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTaskPage;