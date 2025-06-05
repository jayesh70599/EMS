// src/pages/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
// DEFAULT_COMMON_PASSWORD import removed as it's no longer used

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, currentUser } = useAuth(); // login from LS-based AuthContext
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // For button state

  // Redirect if user is already logged in
  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate('/employee/dashboard', { replace: true });
      }
    }
  }, [currentUser, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Please enter both email and password.');
      setIsLoading(false);
      return;
    }

    const loggedInUser = login(email, password); // This is a synchronous call now

    if (loggedInUser) {
      // Navigation is now primarily handled by the useEffect above
      // or by ProtectedRoute/App.jsx logic based on currentUser update
    } else {
      setError('Invalid email or password. Please try again.');
    }
    setIsLoading(false);
  };

  const inputClass = "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";
  const labelClass = "block text-sm font-medium text-gray-700";

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Login (LocalStorage Mode)</h2>
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label htmlFor="email" className={labelClass}>Email Address:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            required
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="password" className={labelClass}>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
            required
            autoComplete="current-password"
          />
        </div>
        {error && <p className="text-red-500 text-xs text-center py-1">{error}</p>}
        <div>
          <button
            disabled={isLoading}
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isLoading ? 'Logging in...' : 'Sign In'}
          </button>
        </div>
        <div className="text-xs text-gray-500 mt-4 pt-4 border-t border-gray-200">
            <p className="font-semibold">Demo Credentials (from seedData.js):</p>
            <ul className="list-disc list-inside ml-4">
                <li>Admin: <code className="bg-gray-100 p-1 rounded">admin@example.com</code> / <code className="bg-gray-100 p-1 rounded">adminpassword</code></li>
                <li>Alice: <code className="bg-gray-100 p-1 rounded">alice.fixed@example.com</code> / <code className="bg-gray-100 p-1 rounded">passwordalice</code></li>
                <li>Bob: <code className="bg-gray-100 p-1 rounded">bob.static@example.com</code> / <code className="bg-gray-100 p-1 rounded">passwordbob</code></li>
                <li>Carol: <code className="bg-gray-100 p-1 rounded">carol.immutable@example.com</code> / <code className="bg-gray-100 p-1 rounded">passwordcarol</code></li>
                {/* Hint for common password for new employees removed */}
            </ul>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;


