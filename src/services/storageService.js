// // src/services/storageService.js

// const EMPLOYEES_KEY = 'employees';
// const TASKS_KEY = 'tasks';
// const USER_KEY = 'currentUser'; // For storing the mock logged-in user

// // --- Generic Helper Functions ---
// const getFromStorage = (key) => {
//   const item = localStorage.getItem(key);
//   return item ? JSON.parse(item) : null;
// };

// const saveToStorage = (key, data) => {
//   localStorage.setItem(key, JSON.stringify(data));
// };

// // --- User Simulation ---
// export const getMockUser = () => {
//   const item = localStorage.getItem(USER_KEY);
//   return item ? JSON.parse(item) : null; // Return null if no user is logged in
// };

// export const setMockUser = (user) => {
//   saveToStorage(USER_KEY, user);
// };

// export const clearMockUser = () => {
//   localStorage.removeItem(USER_KEY);
// };


// // --- Employee Specific Functions ---
// export const getAllEmployees = (initialData = []) => {
//   let employees = getFromStorage(EMPLOYEES_KEY);
//   if (!employees || employees.length === 0) {
//     employees = initialData; // Seed with initial data if empty
//     saveToStorage(EMPLOYEES_KEY, employees);
//   }
//   return employees;
// };

// export const getEmployeeById = (id) => {
//   const employees = getAllEmployees();
//   return employees.find(emp => emp.id === id) || null;
// };

// export const addEmployee = (employee) => {
//   const employees = getAllEmployees();
//   const newEmployee = { ...employee, id: 'emp_' + new Date().getTime() + Math.random().toString(16).slice(2) };
//   const updatedEmployees = [...employees, newEmployee];
//   saveToStorage(EMPLOYEES_KEY, updatedEmployees);
//   return newEmployee;
// };

// export const updateEmployee = (updatedEmployee) => {
//   let employees = getAllEmployees();
//   employees = employees.map(emp =>
//     emp.id === updatedEmployee.id ? { ...emp, ...updatedEmployee } : emp
//   );
//   saveToStorage(EMPLOYEES_KEY, employees);
//   return updatedEmployee;
// };

// export const deleteEmployee = (id) => {
//   let employees = getAllEmployees();
//   employees = employees.filter(emp => emp.id !== id);
//   saveToStorage(EMPLOYEES_KEY, employees);
//   return id; // Return the id of the deleted employee
// };

// // --- Task Specific Functions (You can add these similarly) ---
// export const getAllTasks = (initialData = []) => {
//    let tasks = getFromStorage(TASKS_KEY);
//   if (!tasks || tasks.length === 0 && initialData.length > 0) { // Only seed if initialData is provided and tasks are empty
//     tasks = initialData;
//     saveToStorage(TASKS_KEY, tasks);
//   } else if (!tasks) {
//     tasks = []; // Ensure tasks is an array if localStorage is empty and no initialData
//   }
//   return tasks;
// };

// export const getTaskById = (id) => { // <-- New Function
//   const tasks = getAllTasks();
//   return tasks.find(task => task.id === id) || null;
// };

// export const addTask = (task) => {
//   const tasks = getAllTasks();
//   const newTask = { ...task, id: 'task_' + new Date().getTime() + Math.random().toString(16).slice(2) };
//   const updatedTasks = [...tasks, newTask];
//   saveToStorage(TASKS_KEY, updatedTasks);
//   return newTask;
// };

// export const updateTask = (updatedTask) => {
//   let tasks = getAllTasks();
//   tasks = tasks.map(t =>
//     t.id === updatedTask.id ? { ...t, ...updatedTask } : t
//   );
//   saveToStorage(TASKS_KEY, tasks);
//   return updatedTask;
// };

// export const deleteTask = (id) => {
//   let tasks = getAllTasks();
//   tasks = tasks.filter(task => task.id !== id);
//   saveToStorage(TASKS_KEY, tasks);
//   return id;
// };


// src/services/storageService.js

const EMPLOYEES_KEY = 'employees';
const TASKS_KEY = 'tasks';
const USER_KEY = 'currentUser'; // For storing the mock logged-in user
const DYNAMIC_USERS_KEY = 'dynamicAppUsers'; // Key for dynamically created users

// --- Generic Helper Functions ---
const getFromStorage = (key) => {
  const item = localStorage.getItem(key);
  try {
    return item ? JSON.parse(item) : null;
  } catch (e) {
    console.error("Error parsing JSON from localStorage for key:", key, e);
    return null; // Return null or an appropriate default if parsing fails
  }
};

const saveToStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// --- User Simulation (currentUser - for session) ---
export const getMockUser = () => {
  return getFromStorage(USER_KEY);
};

export const setMockUser = (user) => {
  saveToStorage(USER_KEY, user);
};

export const clearMockUser = () => {
  localStorage.removeItem(USER_KEY);
};

// --- Dynamic User Management (for new employees who need to log in) ---
export const getAllDynamicUsers = (initialData = []) => {
  let users = getFromStorage(DYNAMIC_USERS_KEY);
  // Ensure users is an array, seed if empty and initialData is provided
  if (!Array.isArray(users)) {
    users = Array.isArray(initialData) && initialData.length > 0 ? initialData : [];
    saveToStorage(DYNAMIC_USERS_KEY, users);
  } else if (users.length === 0 && Array.isArray(initialData) && initialData.length > 0) {
    users = initialData;
    saveToStorage(DYNAMIC_USERS_KEY, users);
  }
  return users;
};

export const addDynamicUser = (userData) => {
  const users = getAllDynamicUsers();
  // UserData should include: id, email, password, role, name, employeeId
  const newUser = { ...userData };
  const updatedUsers = [...users, newUser];
  saveToStorage(DYNAMIC_USERS_KEY, updatedUsers);
  return newUser;
};

// --- Employee Specific Functions ---
export const getAllEmployees = (initialData = []) => {
  let employees = getFromStorage(EMPLOYEES_KEY);
  if (!Array.isArray(employees)) {
    employees = Array.isArray(initialData) && initialData.length > 0 ? initialData : [];
    saveToStorage(EMPLOYEES_KEY, employees);
  } else if (employees.length === 0 && Array.isArray(initialData) && initialData.length > 0) {
    employees = initialData;
    saveToStorage(EMPLOYEES_KEY, employees);
  }
  return employees;
};

export const getEmployeeById = (id) => {
  const employees = getAllEmployees();
  return employees.find(emp => emp.id === id) || null;
};

export const addEmployee = (employeeData) => {
  const employees = getAllEmployees();
  const newEmployeeId = 'emp_' + new Date().getTime() + Math.random().toString(36).substring(2, 10);
  const newEmployee = { ...employeeData, id: newEmployeeId };
  const updatedEmployees = [...employees, newEmployee];
  saveToStorage(EMPLOYEES_KEY, updatedEmployees);
  return newEmployee; // Return the full new employee object with its ID
};

export const updateEmployee = (updatedEmployee) => {
  let employees = getAllEmployees();
  employees = employees.map(emp =>
    emp.id === updatedEmployee.id ? { ...emp, ...updatedEmployee } : emp
  );
  saveToStorage(EMPLOYEES_KEY, employees);
  return updatedEmployee;
};

export const deleteEmployee = (employeeIdToDelete) => {
  let employees = getAllEmployees();
  employees = employees.filter(emp => emp.id !== employeeIdToDelete);
  saveToStorage(EMPLOYEES_KEY, employees);

  // Also delete the associated dynamic user
  let dynamicUsers = getAllDynamicUsers();
  dynamicUsers = dynamicUsers.filter(user => user.employeeId !== employeeIdToDelete);
  saveToStorage(DYNAMIC_USERS_KEY, dynamicUsers);

  return employeeIdToDelete;
};


// --- Task Specific Functions ---
export const getAllTasks = (initialData = []) => {
  let tasks = getFromStorage(TASKS_KEY);
   if (!Array.isArray(tasks)) {
    tasks = Array.isArray(initialData) && initialData.length > 0 ? initialData : [];
    saveToStorage(TASKS_KEY, tasks);
  } else if (tasks.length === 0 && Array.isArray(initialData) && initialData.length > 0) {
    tasks = initialData;
    saveToStorage(TASKS_KEY, tasks);
  }
  return tasks;
};

export const getTaskById = (id) => {
  const tasks = getAllTasks();
  return tasks.find(task => task.id === id) || null;
};

export const addTask = (taskData) => {
  const tasks = getAllTasks();
  const newTaskId = 'task_' + new Date().getTime() + Math.random().toString(36).substring(2, 10);
  const newTask = { ...taskData, id: newTaskId };
  const updatedTasks = [...tasks, newTask];
  saveToStorage(TASKS_KEY, updatedTasks);
  return newTask;
};

export const updateTask = (updatedTask) => {
  let tasks = getAllTasks();
  tasks = tasks.map(t =>
    t.id === updatedTask.id ? { ...t, ...updatedTask } : t
  );
  saveToStorage(TASKS_KEY, tasks);
  return updatedTask;
};

export const deleteTask = (taskIdToDelete) => {
  let tasks = getAllTasks();
  tasks = tasks.filter(task => task.id !== taskIdToDelete);
  saveToStorage(TASKS_KEY, tasks);
  return taskIdToDelete;
};
