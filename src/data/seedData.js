// // src/data/seedData.js

// // --- FIXED EMPLOYEE LIST ---
// export const initialEmployees = [
//   {
//     id: 'emp_fixed_1',
//     name: 'Alice Fixed',
//     position: 'Senior Developer',
//     department: 'Engineering',
//     email: 'alice.fixed@example.com',
//     phone: '111-222-3333',
//     startDate: '2022-01-10',
//   },
//   {
//     id: 'emp_fixed_2',
//     name: 'Bob Static',
//     position: 'Lead QA',
//     department: 'Quality Assurance',
//     email: 'bob.static@example.com',
//     phone: '444-555-6666',
//     startDate: '2021-06-15',
//   },
//   {
//     id: 'emp_fixed_3',
//     name: 'Carol Immutable',
//     position: 'UI/UX Designer',
//     department: 'Design',
//     email: 'carol.immutable@example.com',
//     phone: '777-888-9999',
//     startDate: '2022-09-01',
//   },
// ];

// // --- INITIAL TASKS (for seeding localStorage if empty) ---
// // Ensure 'assignedTo' uses IDs from 'initialEmployees'
// export const initialTasks = [
//   {
//     id: 'task_ls_1',
//     title: 'Finalize UI for Employee Directory',
//     description: 'Review and confirm the UI for the static employee list.',
//     assignedTo: 'emp_fixed_3', // Carol Immutable
//     dueDate: '2025-07-15',
//     status: 'To Do',
//     priority: 'High',
//   },
//   {
//     id: 'task_ls_2',
//     title: 'Test Task Management with LocalStorage',
//     description: 'Verify all CRUD operations for tasks using LocalStorage.',
//     assignedTo: 'emp_fixed_2', // Bob Static
//     dueDate: '2025-07-20',
//     status: 'In Progress',
//     priority: 'Medium',
//   },
//   {
//     id: 'task_ls_3',
//     title: 'Document LocalStorage Data Structure',
//     description: 'Write down the structure for tasks and users in LocalStorage.',
//     assignedTo: 'emp_fixed_1', // Alice Fixed
//     dueDate: '2025-07-25',
//     status: 'To Do',
//     priority: 'Low',
//   },
// ];

// // --- PREDEFINED USERS FOR LOGIN (Sole source for login credentials) ---
// // This also defines the link between a loginable user and their fixed employee profile.
// export const predefinedUsers = [
//   {
//     id: 'user_admin_main', // Unique ID for this user entry
//     email: 'admin@example.com', // Admin email
//     password: 'adminpassword',   // Plaintext, for simulation only!
//     role: 'admin',
//     name: 'Admin User (System)', // Name for display
//     employeeId: null, // Admin might not have a corresponding entry in initialEmployees
//   },
//   {
//     id: 'user_alice_login',
//     email: 'alice.fixed@example.com',   // Must match an email in initialEmployees
//     password: 'passwordalice',          // Plaintext, for simulation
//     role: 'employee',
//     employeeId: 'emp_fixed_1',          // Must match an ID in initialEmployees
//     name: 'Alice Fixed',                // Should match name in initialEmployees for consistency
//   },
//   {
//     id: 'user_bob_login',
//     email: 'bob.static@example.com',    // Match an email in initialEmployees
//     password: 'passwordbob',
//     role: 'employee',
//     employeeId: 'emp_fixed_2',          // Match an ID in initialEmployees
//     name: 'Bob Static',
//   },
//   {
//     id: 'user_carol_login',
//     email: 'carol.immutable@example.com', // Match an email in initialEmployees
//     password: 'passwordcarol',
//     role: 'employee',
//     employeeId: 'emp_fixed_3',            // Match an ID in initialEmployees
//     name: 'Carol Immutable',
//   }
// ];

// // Note: DEFAULT_COMMON_PASSWORD is no longer needed as admins don't create new employees/users.


// src/data/seedData.js

// --- FIXED EMPLOYEE LIST (5 Employees) ---
export const initialEmployees = [
  {
    id: 'emp_101',
    name: 'Priya Sharma',
    position: 'Senior Software Engineer',
    department: 'Technology',
    email: 'priya.sharma@example.com',
    phone: '987-654-3210',
    startDate: '2022-08-15',
  },
  {
    id: 'emp_102',
    name: 'Amit Kumar',
    position: 'Project Manager',
    department: 'Management',
    email: 'amit.kumar@example.com',
    phone: '876-543-2109',
    startDate: '2021-05-20',
  },
  {
    id: 'emp_103',
    name: 'Sneha Reddy',
    position: 'UI/UX Designer',
    department: 'Design',
    email: 'sneha.reddy@example.com',
    phone: '765-432-1098',
    startDate: '2023-01-30',
  },
  {
    id: 'emp_104',
    name: 'Vikram Singh',
    position: 'QA Engineer',
    department: 'Quality Assurance',
    email: 'vikram.singh@example.com',
    phone: '654-321-0987',
    startDate: '2022-11-01',
  },
  {
    id: 'emp_105',
    name: 'Anjali Gupta',
    position: 'HR Manager',
    department: 'Human Resources',
    email: 'anjali.gupta@example.com',
    phone: '543-210-9876',
    startDate: '2020-02-18',
  },
];

// --- INITIAL TASKS (for seeding localStorage if empty) ---
// Ensure 'assignedTo' uses IDs from 'initialEmployees'
export const initialTasks = [
  {
    id: 'task_ls_1',
    title: 'Finalize Q3 Project Presentation',
    description: 'Compile all team slides for the quarterly review.',
    assignedTo: 'emp_102', // Amit Kumar
    dueDate: '2025-07-25',
    status: 'In Progress',
    priority: 'High',
  },
  {
    id: 'task_ls_2',
    title: 'Update User Profile Mockups',
    description: 'Incorporate new branding guidelines into the profile page design.',
    assignedTo: 'emp_103', // Sneha Reddy
    dueDate: '2025-07-30',
    status: 'To Do',
    priority: 'Medium',
  },
  {
    id: 'task_ls_3',
    title: 'Regression Testing for v2.5 Release',
    description: 'Complete the full regression testing suite for the upcoming release.',
    assignedTo: 'emp_104', // Vikram Singh
    dueDate: '2025-08-01',
    status: 'To Do',
    priority: 'High',
  },
  {
    id: 'task_ls_4',
    title: 'Code Review for New Auth Module',
    description: 'Perform a detailed code review on the new authentication module PR.',
    assignedTo: 'emp_101', // Priya Sharma
    dueDate: '2025-07-22',
    status: 'In Progress',
    priority: 'Medium',
  },
];

// --- PREDEFINED USERS FOR LOGIN (Sole source for login credentials) ---
// This defines the link between a loginable user and their fixed employee profile.
export const predefinedUsers = [
  {
    id: 'user_admin_main',
    email: 'admin@example.com',
    password: 'adminpassword',
    role: 'admin',
    name: 'Admin User',
    employeeId: null, // Admin does not have a corresponding entry in initialEmployees
  },
  {
    id: 'user_priya_login',
    email: 'priya.sharma@example.com',
    password: 'passwordPriya',
    role: 'employee',
    employeeId: 'emp_101', // Matches ID in initialEmployees
    name: 'Priya Sharma',
  },
  {
    id: 'user_amit_login',
    email: 'amit.kumar@example.com',
    password: 'passwordAmit',
    role: 'employee',
    employeeId: 'emp_102', // Matches ID in initialEmployees
    name: 'Amit Kumar',
  },
  {
    id: 'user_sneha_login',
    email: 'sneha.reddy@example.com',
    password: 'passwordSneha',
    role: 'employee',
    employeeId: 'emp_103', // Matches ID in initialEmployees
    name: 'Sneha Reddy',
  },
  {
    id: 'user_vikram_login',
    email: 'vikram.singh@example.com',
    password: 'passwordVikram',
    role: 'employee',
    employeeId: 'emp_104', // Matches ID in initialEmployees
    name: 'Vikram Singh',
  },
  {
    id: 'user_anjali_login',
    email: 'anjali.gupta@example.com',
    password: 'passwordAnjali',
    role: 'employee',
    employeeId: 'emp_105', // Matches ID in initialEmployees
    name: 'Anjali Gupta',
  }
];
