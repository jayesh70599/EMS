// src/pages/HomePage.jsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext'; // LS-based AuthContext
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { currentUser } = useAuth();

  return (
    <div className="bg-white p-8 rounded-lg shadow-md text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Employee Management System</h1>
      <p className="text-lg text-gray-600 mb-6">
        Welcome to the EMS Portal (LocalStorage Version).
      </p>
      {currentUser ? (
        <div>
          <p className="mb-4">You are logged in as <span className="font-semibold">{currentUser.name || currentUser.email}</span> ({currentUser.role}).</p>
          {currentUser.role === 'admin' && (
            <Link to="/admin/dashboard">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                Go to Admin Dashboard
              </button>
            </Link>
          )}
          {currentUser.role === 'employee' && (
            <Link to="/employee/dashboard">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Go to My Dashboard
              </button>
            </Link>
          )}
        </div>
      ) : (
        <div>
          <p className="mb-4">Please log in to access the system features.</p>
          <Link to="/login">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Login
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;