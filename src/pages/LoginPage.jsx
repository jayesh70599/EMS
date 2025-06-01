// // src/pages/LoginPage.jsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { predefinedUsers } from '../data/seedData';
// import { useAuth } from '../contexts/AuthContext';

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth(); // login function from context expects user ID
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleLogin = (e) => {
//     e.preventDefault();
//     setError(''); // Clear previous errors

//     if (!email || !password) {
//       setError('Please enter both email and password.');
//       return;
//     }

//     // Find user by email in our predefinedUsers
//     const userFound = predefinedUsers.find(user => user.email.toLowerCase() === email.toLowerCase());

//     if (!userFound) {
//       setError('User not found. Please check your email or register.'); // "register" is hypothetical here
//       return;
//     }

//     // Check if password matches (plaintext comparison - for simulation only!)
//     if (userFound.password !== password) {
//       setError('Incorrect password. Please try again.');
//       return;
//     }

//     // If email and password are correct, call the login function from AuthContext
//     // The login function in AuthContext currently expects the user's ID
//     const loggedInUser = login(userFound.id);

//     if (loggedInUser) {
//       // Redirect based on role after successful context update
//       if (loggedInUser.role === 'admin') {
//         navigate('/admin/dashboard');
//       } else {
//         navigate('/employee/dashboard');
//       }
//     } else {
//       // This case should ideally not be hit if userFound.id is valid
//       // and login function in AuthContext correctly finds the user by ID.
//       setError('Login failed after validation. Please try again.');
//     }
//   };

//   const inputClass = "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";
//   const labelClass = "block text-sm font-medium text-gray-700";

//   return (
//     <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
//       <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Login</h2>
//       <form onSubmit={handleLogin} className="space-y-6">
//         <div>
//           <label htmlFor="email" className={labelClass}>Email Address:</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className={inputClass}
//             required
//             autoComplete="email"
//           />
//         </div>
//         <div>
//           <label htmlFor="password" className={labelClass}>Password:</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className={inputClass}
//             required
//             autoComplete="current-password"
//           />
//         </div>
//         {error && <p className="text-red-500 text-xs text-center py-2">{error}</p>}
//         <div>
//           <button
//             type="submit"
//             className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           >
//             Sign In
//           </button>
//         </div>
//         <div className="text-xs text-gray-500 mt-4">
//             <p className="font-semibold">Demo Credentials:</p>
//             <ul className="list-disc list-inside">
//                 <li>Admin: admin@example.com / adminpassword</li>
//                 <li>Alice (Employee): alice@example.com / password123</li>
//                 <li>Bob (Employee): bob@example.com / password456</li>
//             </ul>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;


// src/pages/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { predefinedUsers } from '../data/seedData';
import { useAuth } from '../contexts/AuthContext';
import { getAllDynamicUsers } from '../services/storageService'; // To fetch dynamic users

const DEFAULT_PASSWORD_FOR_NEW_USERS_DISPLAY = "password123"; // For display consistency

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // login function from AuthContext
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [allLoginableUsers, setAllLoginableUsers] = useState([]);

  useEffect(() => {
    // Combine predefined users and dynamically created users for login check
    const dynamicUsers = getAllDynamicUsers();
    setAllLoginableUsers([...predefinedUsers, ...dynamicUsers]);
  }, []); // Load once on mount. For a real app, this might need to update if users are added/removed while on login page.

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    // Find user by email in the combined list
    const userFound = allLoginableUsers.find(user => user.email.toLowerCase() === email.toLowerCase());

    if (!userFound) {
      setError('User not found. Please check your email.');
      return;
    }

    // Check password (plaintext comparison - for simulation only!)
    if (userFound.password !== password) {
      setError('Incorrect password. Please try again.');
      return;
    }

    // If credentials are correct, call the login function from AuthContext,
    // which expects the user's unique ID.
    const loggedInUser = login(userFound.id);

    if (loggedInUser) {
      // Redirect based on role after successful context update
      if (loggedInUser.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/employee/dashboard');
      }
    } else {
      // This might happen if the userFound.id is somehow not in the AuthContext's user lists
      setError('Login failed after validation. Please try again or contact support.');
      console.error("Login failed: User ID not found by AuthContext's login function:", userFound.id);
    }
  };

  const inputClass = "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";
  const labelClass = "block text-sm font-medium text-gray-700";

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Login</h2>
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
        {error && <p className="text-red-500 text-xs text-center py-2">{error}</p>}
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign In
          </button>
        </div>
        <div className="text-xs text-gray-500 mt-4 pt-4 border-t border-gray-200">
            <p className="font-semibold">Demo Credentials:</p>
            <ul className="list-disc list-inside ml-4">
                <li>Admin: <code className="bg-gray-100 p-1 rounded">admin@example.com</code> / <code className="bg-gray-100 p-1 rounded">adminpassword</code></li>
                <li>Alice (Employee): <code className="bg-gray-100 p-1 rounded">alice@example.com</code> / <code className="bg-gray-100 p-1 rounded">password123</code></li>
                <li>Bob (Employee): <code className="bg-gray-100 p-1 rounded">bob@example.com</code> / <code className="bg-gray-100 p-1 rounded">password456</code></li>
                <li>Newly created employees: (their email) / <code className="bg-gray-100 p-1 rounded">{DEFAULT_PASSWORD_FOR_NEW_USERS_DISPLAY}</code></li>
            </ul>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

