// src/services/storageService.js
import { initialEmployees, initialTasks, predefinedUsers as seedPredefinedUsers } from '../data/seedData';

// --- LocalStorage Keys ---
const TASKS_KEY = 'react_ems_tasks_ls'; // Suffix '_ls' to avoid collision if old keys exist
const CURRENT_USER_KEY = 'react_ems_currentUser_ls';

// --- Generic LocalStorage Helper Functions ---
const getFromStorage = (key) => {
  const item = localStorage.getItem(key);
  try {
    // If item is null or undefined, JSON.parse will throw error or return null.
    // If item is an empty string, it's not valid JSON.
    if (item === null || item === undefined || item === "") {
      return null;
    }
    return JSON.parse(item);
  } catch (e) {
    console.error("Error parsing JSON from localStorage for key:", key, e);
    // localStorage.removeItem(key); // Optional: remove corrupted item
    return null; // Return null if parsing fails or item is invalid
  }
};

const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error("Error saving to localStorage for key:", key, e);
  }
};

// --- Employee Management (Read-only from seedData.js) ---
export const getAllEmployees = () => {
  // Always return a fresh copy of the fixed list from seedData
  return [...initialEmployees];
};

export const getEmployeeById = (id) => {
  // Find from the fixed list in seedData
  return initialEmployees.find(emp => emp.id === id) || null;
};

// Functions for adding, updating, or deleting employees are removed
// as the employee list is now static and sourced from seedData.js.

// --- Task Management (Uses localStorage) ---
export const getAllTasks = () => {
  let tasks = getFromStorage(TASKS_KEY);
  // If localStorage is empty or not an array, seed it with initialTasks
  if (!Array.isArray(tasks)) {
    tasks = [...initialTasks]; // Use a copy of initialTasks for seeding
    saveToStorage(TASKS_KEY, tasks);
  }
  return tasks;
};

export const getTaskById = (id) => {
  const tasks = getAllTasks(); // Ensures tasks are loaded/seeded if necessary
  return tasks.find(task => task.id === id) || null;
};

export const addTask = (taskData) => {
  const tasks = getAllTasks(); // Ensures tasks are loaded/seeded
  const newTask = {
    ...taskData,
    // Generate a unique ID for the new task
    id: 'task' + new Date().getTime() + Math.random().toString(36).substring(2, 9),
  };
  const updatedTasks = [...tasks, newTask];
  saveToStorage(TASKS_KEY, updatedTasks);
  return newTask; // Return the newly created task with its ID
};

export const updateTask = (taskId, updatedData) => {
  let tasks = getAllTasks(); // Ensures tasks are loaded/seeded
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex > -1) {
    // Ensure the ID is not changed by updatedData and merge other fields
    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedData, id: taskId };
    saveToStorage(TASKS_KEY, tasks);
    return tasks[taskIndex]; // Return the updated task
  }
  console.warn(`Task with ID ${taskId} not found for update.`);
  return null; // Or throw an error
};

export const deleteTask = (taskId) => {
  let tasks = getAllTasks(); // Ensures tasks are loaded/seeded
  const initialLength = tasks.length;
  tasks = tasks.filter(task => task.id !== taskId);
  if (tasks.length < initialLength) {
    saveToStorage(TASKS_KEY, tasks);
    return true; // Indicate success
  }
  console.warn(`Task with ID ${taskId} not found for deletion.`);
  return false; // Indicate failure or task not found
};

// --- Simulated User Session Management (Uses localStorage) ---
export const getCurrentUser = () => {
  return getFromStorage(CURRENT_USER_KEY);
};

export const setCurrentUser = (userData) => {
  if (userData) {
    saveToStorage(CURRENT_USER_KEY, userData);
  } else {
    // If userData is null or undefined, remove the item from localStorage
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};

// --- Loginable Users (Read-only from seedData.js) ---
export const getAllLoginableUsers = () => {
  // Returns users defined in seedData.js for login purposes.
  // No dynamic user creation as admins cannot add employees.
  return [...seedPredefinedUsers];
};

// Dynamic user functions (addDynamicUser, getAllDynamicUsers) are removed
// as they were tied to the feature of admins adding new employees who could then log in.
// With a fixed employee list and predefined users, these are no longer needed.
