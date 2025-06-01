// src/pages/AddTaskPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { addTask, getAllEmployees } from '../services/storageService';
import { initialEmployees } from '../data/seedData'; // For initial load if needed

const AddTaskPage = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: '',
    description: '',
    assignedTo: '', // Employee ID
    dueDate: '',
    status: 'To Do', // Default status
    priority: 'Medium', // Default priority
  });
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Load employees for the assignee dropdown
    const loadedEmployees = getAllEmployees(initialEmployees);
    setEmployees(loadedEmployees);
    // Set default assignedTo if employees exist
    if (loadedEmployees.length > 0 && !task.assignedTo) {
      setTask(prevTask => ({...prevTask, assignedTo: loadedEmployees[0].id}));
    }
  }, []); // Ran once on mount

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
    addTask(task);
    alert('Task added successfully!');
    navigate('/admin/tasks'); // Navigate back to the task list
  };

  const inputClass = "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";
  const labelClass = "block text-sm font-medium text-gray-700";
  const selectClass = inputClass; // Use same styling for select

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Add New Task</h2>
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
          <input type="date" id="dueDate" name="dueDate" value={task.dueDate} onChange={handleChange} className={inputClass} />
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskPage;