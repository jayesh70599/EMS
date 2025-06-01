// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute'; // <-- Import ProtectedRoute

// Pages
import HomePage from './pages/HomePage';
import EmployeeListPage from './pages/EmployeeListPage';
import AddEmployeePage from './pages/AddEmployeePage';
import EditEmployeePage from './pages/EditEmployeePage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import EmployeeDashboardPage from './pages/EmployeeDashboardPage';
import TaskListPage from './pages/TaskListPage';
import AddTaskPage from './pages/AddTaskPage';
import EditTaskPage from './pages/EditTaskPage';
import MyTasksPage from './pages/MyTasksPage';
import LoginPage from './pages/LoginPage';

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-700 text-white px-3 py-2 rounded text-sm"
    >
      Logout
    </button>
  );
};

function App() {
  const { currentUser } = useAuth();

//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-100">
//         <nav className="bg-blue-600 text-white p-4 shadow-md">
//           <div className="container mx-auto flex justify-between items-center">
//             <ul className="flex space-x-4 items-center">
//               <li><Link to="/" className="hover:bg-blue-700 px-3 py-2 rounded">Home</Link></li>
//               {!currentUser && (
//                 <li><Link to="/login" className="hover:bg-blue-700 px-3 py-2 rounded">Login</Link></li>
//               )}
//               {/* Dynamic links based on role are still useful for UI clarity */}
//               {currentUser?.role === 'admin' && (
//                 <>
//                   <li className="font-semibold">Admin:</li>
//                   <li><Link to="/admin/employees" className="hover:bg-blue-700 px-3 py-2 rounded">Manage Employees</Link></li>
//                   <li><Link to="/admin/tasks" className="hover:bg-blue-700 px-3 py-2 rounded">Manage Tasks</Link></li>
//                 </>
//               )}
//               {currentUser?.role === 'employee' && (
//                 <>
//                   <li className="font-semibold">Employee:</li>
//                   <li><Link to="/employee/tasks" className="hover:bg-blue-700 px-3 py-2 rounded">My Tasks</Link></li>
//                 </>
//               )}
//             </ul>
//             {currentUser && (
//               <div className="flex items-center space-x-2">
//                 <span className="text-sm">Welcome, {currentUser.name || currentUser.username}!</span>
//                 <LogoutButton />
//               </div>
//             )}
//           </div>
//         </nav>
//         <main className="container mx-auto p-4">
//           <Routes>
//             {/* Public Route */}
//             <Route path="/login" element={!currentUser ? <LoginPage /> : <Navigate to="/" />} />

//             {/* Protected Routes */}
//             <Route path="/" element={
//               <ProtectedRoute>
//                 <HomePage />
//               </ProtectedRoute>
//             }/>

//             {/* Admin Routes */}
//             <Route path="/admin/employees" element={
//               <ProtectedRoute allowedRoles={['admin']}>
//                 <EmployeeListPage />
//               </ProtectedRoute>
//             }/>
//             <Route path="/admin/employees/add" element={
//               <ProtectedRoute allowedRoles={['admin']}>
//                 <AddEmployeePage />
//               </ProtectedRoute>
//             }/>
//             <Route path="/admin/employees/edit/:employeeId" element={
//               <ProtectedRoute allowedRoles={['admin']}>
//                 <EditEmployeePage />
//               </ProtectedRoute>
//             }/>
//             <Route path="/admin/tasks" element={
//               <ProtectedRoute allowedRoles={['admin']}>
//                 <TaskListPage />
//               </ProtectedRoute>
//             }/>
//             <Route path="/admin/tasks/add" element={
//               <ProtectedRoute allowedRoles={['admin']}>
//                 <AddTaskPage />
//               </ProtectedRoute>
//             }/>
//             <Route path="/admin/tasks/edit/:taskId" element={
//               <ProtectedRoute allowedRoles={['admin']}>
//                 <EditTaskPage />
//               </ProtectedRoute>
//             }/>

//             {/* Employee Routes */}
//             <Route path="/employee/tasks" element={
//               <ProtectedRoute allowedRoles={['employee']}>
//                 <MyTasksPage />
//               </ProtectedRoute>
//             }/>
//             {/* Add other employee-specific routes here later, e.g., profile page */}

//             {/* Fallback for any other authenticated path not matched - redirect to home */}
//             {/* This can be more sophisticated with a 404 page specific for authenticated users */}
//             <Route path="*" element={
//               currentUser ? <Navigate to="/" replace /> : <Navigate to="/login" replace />
//             }/>
//           </Routes>
//         </main>
//       </div>
//     </Router>
//   );
// }

// export default App;

//  return (
//     <Router>
//       <div className="min-h-screen bg-gray-100">
//         <nav className="bg-blue-600 text-white p-4 shadow-md">
//           <div className="container mx-auto flex justify-between items-center">
//             <ul className="flex space-x-4 items-center">
//               <li><Link to="/" className="hover:bg-blue-700 px-3 py-2 rounded">Home</Link></li>
//               {!currentUser && (
//                 <li><Link to="/login" className="hover:bg-blue-700 px-3 py-2 rounded">Login</Link></li>
//               )}
//               {currentUser?.role === 'admin' && (
//                 <>
//                   <li className="font-semibold">Admin:</li>
//                   <li><Link to="/admin/dashboard" className="hover:bg-blue-700 px-3 py-2 rounded">Dashboard</Link></li> {/* <-- Link to Admin Dashboard */}
//                   <li><Link to="/admin/employees" className="hover:bg-blue-700 px-3 py-2 rounded">Manage Employees</Link></li>
//                   <li><Link to="/admin/tasks" className="hover:bg-blue-700 px-3 py-2 rounded">Manage Tasks</Link></li>
//                 </>
//               )}
//               {currentUser?.role === 'employee' && (
//                 <>
//                   <li className="font-semibold">Employee:</li>
//                   <li><Link to="/employee/tasks" className="hover:bg-blue-700 px-3 py-2 rounded">My Tasks</Link></li>
//                   {/* We can consider an Employee Dashboard link later */}
//                 </>
//               )}
//             </ul>
//             {currentUser && (
//               <div className="flex items-center space-x-2">
//                 <span className="text-sm">Welcome, {currentUser.name || currentUser.username}!</span>
//                 <LogoutButton />
//               </div>
//             )}
//           </div>
//         </nav>
//         <main className="container mx-auto p-4">
//           <Routes>
//             {/* Public Route */}
//             <Route path="/login" element={!currentUser ? <LoginPage /> : (currentUser.role === 'admin' ? <Navigate to="/admin/dashboard" /> : <Navigate to="/employee/tasks" />)} />

//             {/* Protected Routes - Common */}
//             <Route path="/" element={
//               <ProtectedRoute>
//                 {/* Redirect to role-specific dashboard if logged in, or show generic home */}
//                 {currentUser ? (currentUser.role === 'admin' ? <Navigate to="/admin/dashboard" /> : <Navigate to="/employee/tasks" />) : <HomePage />}
//               </ProtectedRoute>
//             }/>

//             {/* Admin Routes */}
//             <Route path="/admin/dashboard" element={
//               <ProtectedRoute allowedRoles={['admin']}>
//                 <AdminDashboardPage />
//               </ProtectedRoute>
//             }/>
//             <Route path="/admin/employees" element={
//               <ProtectedRoute allowedRoles={['admin']}>
//                 <EmployeeListPage />
//               </ProtectedRoute>
//             }/>
//             {/* ... other admin employee routes ... */}
//             <Route path="/admin/employees/add" element={ <ProtectedRoute allowedRoles={['admin']}><AddEmployeePage /></ProtectedRoute>}/>
//             <Route path="/admin/employees/edit/:employeeId" element={<ProtectedRoute allowedRoles={['admin']}><EditEmployeePage /></ProtectedRoute>}/>
//             <Route path="/admin/tasks" element={
//               <ProtectedRoute allowedRoles={['admin']}>
//                 <TaskListPage />
//               </ProtectedRoute>
//             }/>
//             {/* ... other admin task routes ... */}
//             <Route path="/admin/tasks/add" element={<ProtectedRoute allowedRoles={['admin']}><AddTaskPage /></ProtectedRoute>}/>
//             <Route path="/admin/tasks/edit/:taskId" element={<ProtectedRoute allowedRoles={['admin']}><EditTaskPage /></ProtectedRoute>}/>


//             {/* Employee Routes */}
//             <Route path="/employee/tasks" element={
//               <ProtectedRoute allowedRoles={['employee']}>
//                 <MyTasksPage />
//               </ProtectedRoute>
//             }/>

//             {/* Fallback for any other authenticated path not matched */}
//             <Route path="*" element={
//               currentUser ? (currentUser.role === 'admin' ? <Navigate to="/admin/dashboard" replace /> : <Navigate to="/employee/tasks" replace />) : <Navigate to="/login" replace />
//             }/>
//           </Routes>
//         </main>
//       </div>
//     </Router>
//   );
// }

// export default App;


 return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 text-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <ul className="flex space-x-4 items-center">
              {/* Consider if a generic "Home" link is still needed or if dashboards are the primary home */}
              {/* For now, keeping it, but it redirects */}
              <li><Link to="/" className="hover:bg-blue-700 px-3 py-2 rounded">Home</Link></li>
              {!currentUser && (
                <li><Link to="/login" className="hover:bg-blue-700 px-3 py-2 rounded">Login</Link></li>
              )}
              {currentUser?.role === 'admin' && (
                <>
                  <li className="font-semibold">Admin:</li>
                  <li><Link to="/admin/dashboard" className="hover:bg-blue-700 px-3 py-2 rounded">Dashboard</Link></li>
                  <li><Link to="/admin/employees" className="hover:bg-blue-700 px-3 py-2 rounded">Manage Employees</Link></li>
                  <li><Link to="/admin/tasks" className="hover:bg-blue-700 px-3 py-2 rounded">Manage Tasks</Link></li>
                </>
              )}
              {currentUser?.role === 'employee' && (
                <>
                  <li className="font-semibold">Employee:</li>
                  <li><Link to="/employee/dashboard" className="hover:bg-blue-700 px-3 py-2 rounded">Dashboard</Link></li> {/* <-- Link to Employee Dashboard */}
                  <li><Link to="/employee/tasks" className="hover:bg-blue-700 px-3 py-2 rounded">My Tasks List</Link></li>
                </>
              )}
            </ul>
            {currentUser && (
              <div className="flex items-center space-x-2">
                <span className="text-sm">Welcome, {currentUser.name || currentUser.username}!</span>
                <LogoutButton />
              </div>
            )}
          </div>
        </nav>
        <main className="container mx-auto p-4">
          <Routes>
            {/* Public Route: Login */}
            <Route path="/login" element={
                !currentUser 
                  ? <LoginPage /> 
                  : (currentUser.role === 'admin' 
                      ? <Navigate to="/admin/dashboard" /> 
                      : <Navigate to="/employee/dashboard" />)
              } 
            />

            {/* Root path redirects based on login status and role */}
            {/* <Route path="/" element={
              <ProtectedRoute>
                {currentUser.role === 'admin' 
                  ? <Navigate to="/admin/dashboard" /> 
                  : <Navigate to="/employee/dashboard" />}
              </ProtectedRoute>
            }/> */}
            <Route path="/" element={
              <ProtectedRoute>
                {/* Redirect to role-specific dashboard if logged in, or show generic home */}
                {currentUser ? (currentUser.role === 'admin' ? <Navigate to="/admin/dashboard" /> : <Navigate to="/employee/tasks" />) : <HomePage />}
              </ProtectedRoute>
            }/>



            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboardPage /></ProtectedRoute>}/>
            <Route path="/admin/employees" element={<ProtectedRoute allowedRoles={['admin']}><EmployeeListPage /></ProtectedRoute>}/>
            <Route path="/admin/employees/add" element={<ProtectedRoute allowedRoles={['admin']}><AddEmployeePage /></ProtectedRoute>}/>
            <Route path="/admin/employees/edit/:employeeId" element={<ProtectedRoute allowedRoles={['admin']}><EditEmployeePage /></ProtectedRoute>}/>
            <Route path="/admin/tasks" element={<ProtectedRoute allowedRoles={['admin']}><TaskListPage /></ProtectedRoute>}/>
            <Route path="/admin/tasks/add" element={<ProtectedRoute allowedRoles={['admin']}><AddTaskPage /></ProtectedRoute>}/>
            <Route path="/admin/tasks/edit/:taskId" element={<ProtectedRoute allowedRoles={['admin']}><EditTaskPage /></ProtectedRoute>}/>

            {/* Employee Routes */}
            <Route path="/employee/dashboard" element={
              <ProtectedRoute allowedRoles={['employee']}>
                <EmployeeDashboardPage />
              </ProtectedRoute>
            }/>
            <Route path="/employee/tasks" element={
              <ProtectedRoute allowedRoles={['employee']}>
                <MyTasksPage /> {/* This is now the detailed task list */}
              </ProtectedRoute>
            }/>

            {/* Fallback for any other authenticated path not matched */}
            <Route path="*" element={
              currentUser 
                ? (currentUser.role === 'admin' 
                    ? <Navigate to="/admin/dashboard" replace /> 
                    : <Navigate to="/employee/dashboard" replace />) 
                : <Navigate to="/login" replace />
            }/>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;