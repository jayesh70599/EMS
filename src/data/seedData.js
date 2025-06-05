// src/data/seedData.js

// --- FIXED EMPLOYEE LIST ---
export const initialEmployees = [
  {
    id: 'emp_fixed_1',
    name: 'Alice Fixed',
    position: 'Senior Developer',
    department: 'Engineering',
    email: 'alice.fixed@example.com',
    phone: '111-222-3333',
    startDate: '2022-01-10',
  },
  {
    id: 'emp_fixed_2',
    name: 'Bob Static',
    position: 'Lead QA',
    department: 'Quality Assurance',
    email: 'bob.static@example.com',
    phone: '444-555-6666',
    startDate: '2021-06-15',
  },
  {
    id: 'emp_fixed_3',
    name: 'Carol Immutable',
    position: 'UI/UX Designer',
    department: 'Design',
    email: 'carol.immutable@example.com',
    phone: '777-888-9999',
    startDate: '2022-09-01',
  },
];

// --- INITIAL TASKS (for seeding localStorage if empty) ---
// Ensure 'assignedTo' uses IDs from 'initialEmployees'
export const initialTasks = [
  {
    id: 'task_ls_1',
    title: 'Finalize UI for Employee Directory',
    description: 'Review and confirm the UI for the static employee list.',
    assignedTo: 'emp_fixed_3', // Carol Immutable
    dueDate: '2025-07-15',
    status: 'To Do',
    priority: 'High',
  },
  {
    id: 'task_ls_2',
    title: 'Test Task Management with LocalStorage',
    description: 'Verify all CRUD operations for tasks using LocalStorage.',
    assignedTo: 'emp_fixed_2', // Bob Static
    dueDate: '2025-07-20',
    status: 'In Progress',
    priority: 'Medium',
  },
  {
    id: 'task_ls_3',
    title: 'Document LocalStorage Data Structure',
    description: 'Write down the structure for tasks and users in LocalStorage.',
    assignedTo: 'emp_fixed_1', // Alice Fixed
    dueDate: '2025-07-25',
    status: 'To Do',
    priority: 'Low',
  },
];

// --- PREDEFINED USERS FOR LOGIN (Sole source for login credentials) ---
// This also defines the link between a loginable user and their fixed employee profile.
export const predefinedUsers = [
  {
    id: 'user_admin_main', // Unique ID for this user entry
    email: 'admin@example.com', // Admin email
    password: 'adminpassword',   // Plaintext, for simulation only!
    role: 'admin',
    name: 'Admin User (System)', // Name for display
    employeeId: null, // Admin might not have a corresponding entry in initialEmployees
  },
  {
    id: 'user_alice_login',
    email: 'alice.fixed@example.com',   // Must match an email in initialEmployees
    password: 'passwordalice',          // Plaintext, for simulation
    role: 'employee',
    employeeId: 'emp_fixed_1',          // Must match an ID in initialEmployees
    name: 'Alice Fixed',                // Should match name in initialEmployees for consistency
  },
  {
    id: 'user_bob_login',
    email: 'bob.static@example.com',    // Match an email in initialEmployees
    password: 'passwordbob',
    role: 'employee',
    employeeId: 'emp_fixed_2',          // Match an ID in initialEmployees
    name: 'Bob Static',
  },
  {
    id: 'user_carol_login',
    email: 'carol.immutable@example.com', // Match an email in initialEmployees
    password: 'passwordcarol',
    role: 'employee',
    employeeId: 'emp_fixed_3',            // Match an ID in initialEmployees
    name: 'Carol Immutable',
  }
];

// Note: DEFAULT_COMMON_PASSWORD is no longer needed as admins don't create new employees/users.