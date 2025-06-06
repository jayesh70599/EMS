// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext'; // LS-based AuthContext
import ProtectedRoute from './components/auth/ProtectedRoute'; // This should still work

// Pages
//import HomePage from './pages/HomePage';
import EmployeeListPage from './pages/EmployeeListPage';
// AddEmployeePage and EditEmployeePage are removed as employees are static
import TaskListPage from './pages/TaskListPage';
import AddTaskPage from './pages/AddTaskPage';
import EditTaskPage from './pages/EditTaskPage';
import MyTasksPage from './pages/MyTasksPage';
import LoginPage from './pages/LoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import EmployeeDashboardPage from './pages/EmployeeDashboardPage';
// SignupPage is removed

// RootRedirector (can be defined here or imported if it's in a separate file)
// This component helps redirect logged-in users from the root path to their dashboard.
const RootRedirector = () => {
  const { currentUser } = useAuth();

  // if (!currentUser) {
  //   // This should ideally be caught by ProtectedRoute already,
  //   // but as a fallback if someone reaches here without currentUser.
  //   return <Navigate to="/login" replace />;
  // }

  return currentUser.role === 'admin'
    ? <Navigate to="/admin/dashboard" replace />
    : <Navigate to="/employee/dashboard" replace />;
};


const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clears LS and context state
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
  const { currentUser } = useAuth(); // loadingAuth is not used from LS-based AuthContext

  // Since loadingAuth is removed from context, we don't need the initial loading screen here.
  // The app will render based on the initial state of currentUser from localStorage.

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 text-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <ul className="flex space-x-4 items-center">
              <li><Link to="/" className="hover:bg-blue-700 px-3 py-2 rounded">Home</Link></li>
              {!currentUser && (
                <li><Link to="/login" className="hover:bg-blue-700 px-3 py-2 rounded">Login</Link></li>
                // Signup link is removed
              )}
              {currentUser?.role === 'admin' && (
                <>
                  <li className="font-semibold">Admin:</li>
                  <li><Link to="/admin/dashboard" className="hover:bg-blue-700 px-3 py-2 rounded">Dashboard</Link></li>
                  <li><Link to="/admin/employees" className="hover:bg-blue-700 px-3 py-2 rounded">View Employees</Link></li>
                  <li><Link to="/admin/tasks" className="hover:bg-blue-700 px-3 py-2 rounded">Manage Tasks</Link></li>
                </>
              )}
              {currentUser?.role === 'employee' && (
                <>
                  <li className="font-semibold">Employee:</li>
                  <li><Link to="/employee/dashboard" className="hover:bg-blue-700 px-3 py-2 rounded">Dashboard</Link></li>
                  <li><Link to="/employee/tasks" className="hover:bg-blue-700 px-3 py-2 rounded">My Tasks List</Link></li>
                </>
              )}
            </ul>
            {currentUser && (
              <div className="flex items-center space-x-2">
                <span className="text-sm">Welcome, {currentUser.name || currentUser.email}!</span>
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
                      ? <Navigate to="/admin/dashboard" replace />
                      : <Navigate to="/employee/dashboard" replace />)
              }
            />
            {/* Signup route is removed */}

            {/* Protected Routes - Common */}
            {/* <Route path="/" element={
              <ProtectedRoute>
                <RootRedirector />
              </ProtectedRoute>
            }/> */}

             <Route path="/" element={
              <ProtectedRoute>
                <RootRedirector />
              </ProtectedRoute>
            }/>

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboardPage /></ProtectedRoute>}/>
            <Route path="/admin/employees" element={<ProtectedRoute allowedRoles={['admin']}><EmployeeListPage /></ProtectedRoute>}/>
            <Route path="/admin/tasks" element={<ProtectedRoute allowedRoles={['admin']}><TaskListPage /></ProtectedRoute>}/>
            <Route path="/admin/tasks/add" element={<ProtectedRoute allowedRoles={['admin']}><AddTaskPage /></ProtectedRoute>}/>
            <Route path="/admin/tasks/edit/:taskId" element={<ProtectedRoute allowedRoles={['admin']}><EditTaskPage /></ProtectedRoute>}/>

            {/* Employee Routes */}
            <Route path="/employee/dashboard" element={<ProtectedRoute allowedRoles={['employee']}><EmployeeDashboardPage /></ProtectedRoute>}/>
            <Route path="/employee/tasks" element={<ProtectedRoute allowedRoles={['employee']}><MyTasksPage /></ProtectedRoute>}/>

            {/* Fallback Route for any other path */}
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