// src/pages/EditTaskPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getTaskById, updateTask, getAllEmployees } from '../services/storageService';
import { initialEmployees } from '../data/seedData'; // For initial load if needed

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
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    // Load employees for the assignee dropdown
    const loadedEmployees = getAllEmployees(initialEmployees);
    setEmployees(loadedEmployees);

    if (taskId) {
      const existingTask = getTaskById(taskId);
      if (existingTask) {
        setTask(existingTask);
        setNotFound(false);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    }
  }, [taskId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title || !task.assignedTo) {
      setError('Task Title and Assigned Employee are required.');
      return;
    }
    setError('');
    updateTask({ ...task, id: taskId }); // Ensure ID is passed for update
    alert('Task updated successfully!');
    navigate('/admin/tasks');
  };

  const inputClass = "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";
  const labelClass = "block text-sm font-medium text-gray-700";
  const selectClass = inputClass;

  if (loading) {
    return <p className="text-center text-gray-600 mt-10">Loading task data...</p>;
  }

  if (notFound) {
    return (
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-xl font-semibold text-red-600 mb-4">Task Not Found</h2>
        <p className="text-gray-600 mb-6">No task exists with the ID: {taskId}</p>
        <Link to="/admin/tasks">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Back to Task List
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Edit Task: <span className="font-normal">{task.title}</span></h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className={labelClass}>Title:</label>
          <input type="text" id="title" name="title" value={task.title} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label htmlFor="description" className={labelClass}>Description:</label>
          <textarea id="description" name="description" value={task.description} onChange={handleChange} rows="3" className={inputClass}></textarea>
        </div>
        <div>
          <label htmlFor="assignedTo" className={labelClass}>Assign To:</label>
          <select id="assignedTo" name="assignedTo" value={task.assignedTo} onChange={handleChange} className={selectClass} required>
            <option value="">-- Select Employee --</option>
            {employees.map(emp => (
              <option key={emp.id} value={emp.id}>{emp.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="dueDate" className={labelClass}>Due Date:</label>
          <input type="date" id="dueDate" name="dueDate" value={task.dueDate || ''} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label htmlFor="status" className={labelClass}>Status:</label>
          <select id="status" name="status" value={task.status} onChange={handleChange} className={selectClass}>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Review">Review</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          <label htmlFor="priority" className={labelClass}>Priority:</label>
          <select id="priority" name="priority" value={task.priority} onChange={handleChange} className={selectClass}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="flex items-center justify-end space-x-3 pt-2">
           <Link to="/admin/tasks" className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-md text-sm font-medium border border-gray-300 hover:bg-gray-50">
            Cancel
          </Link>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTaskPage;