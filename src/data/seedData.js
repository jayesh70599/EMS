// src/data/seedData.js

export const initialEmployees = [
  {
    id: 'emp_1',
    name: 'Alice Wonderland',
    position: 'Software Engineer',
    department: 'Technology',
    email: 'alice@example.com', // Using email for login
    phone: '123-456-7890',
    startDate: '2023-01-15',
  },
  {
    id: 'emp_2',
    name: 'Bob The Builder',
    position: 'Project Manager',
    department: 'Construction',
    email: 'bob@example.com', // Using email for login
    phone: '987-654-3210',
    startDate: '2022-11-20',
  },
  {
    id: 'emp_3',
    name: 'Carol Danvers',
    position: 'HR Specialist',
    department: 'Human Resources',
    email: 'carol@example.com', // Using email for login
    phone: '555-123-4567',
    startDate: '2024-03-01',
  }
];

// initialTasks remains the same, ensure assignedTo uses the employee IDs like 'emp_1'

export const initialTasks = [
  {
    id: 'task_1',
    title: 'Develop login page',
    description: 'Create the UI and basic logic for the login page.',
    assignedTo: 'emp_1',
    dueDate: '2025-06-10',
    status: 'To Do',
    priority: 'High',
  },
  {
    id: 'task_2',
    title: 'Client Meeting Prep',
    description: 'Prepare presentation slides for the upcoming client meeting.',
    assignedTo: 'emp_2',
    dueDate: '2025-06-05',
    status: 'In Progress',
    priority: 'Medium',
  },
];


// Updated Predefined Users with email and (simulated) password
export const predefinedUsers = [
  {
    id: 'user_admin',
    email: 'admin@example.com', // Changed username to email
    password: 'adminpassword', // Simulated password
    role: 'admin',
    name: 'Admin User',
  },
  {
    id: 'user_alice',
    email: 'alice@example.com', // Email matches employee record
    password: 'password123',  // Simulated password
    role: 'employee',
    employeeId: 'emp_1',
    name: 'Alice Wonderland', // Name can match employee name
  },
  {
    id: 'user_bob',
    email: 'bob@example.com',
    password: 'password456',
    role: 'employee',
    employeeId: 'emp_2',
    name: 'Bob The Builder',
  },
  {
    id: 'user_carol',
    email: 'carol@example.com',
    password: 'password789',
    role: 'employee',
    employeeId: 'emp_3',
    name: 'Carol Danvers',
  }
];