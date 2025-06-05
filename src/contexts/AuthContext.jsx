// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import {
    setCurrentUser as storeUserInLocalStorage,
    getCurrentUser as getUserFromLocalStorage,
    getAllLoginableUsers, // Gets users from seedData.predefinedUsers
    getEmployeeById // To fetch full employee details for the logged-in user
} from '../services/storageService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Initialize currentUser state from what's stored in localStorage
  const [currentUser, setCurrentUserInternal] = useState(() => getUserFromLocalStorage());

  // Wrapper for setCurrentUser to also update localStorage
  const setCurrentUserAndUpdateStorage = useCallback((userData) => {
    storeUserInLocalStorage(userData); // This handles null to remove from storage
    setCurrentUserInternal(userData);
  }, []);

  const login = useCallback((email, password) => {
    const allLoginableSeedUsers = getAllLoginableUsers(); // From seedData.predefinedUsers
    
    const foundSeedUser = allLoginableSeedUsers.find(
      (user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password
    );

    if (foundSeedUser) {
      let employeeDetails = null;
      // If the logged-in user is an employee and has an employeeId, fetch their full static profile
      if (foundSeedUser.role === 'employee' && foundSeedUser.employeeId) {
        employeeDetails = getEmployeeById(foundSeedUser.employeeId); // Fetches from seedData.initialEmployees
      }

      const userToStore = {
        uid: foundSeedUser.id, // The ID from the predefinedUsers entry
        email: foundSeedUser.email,
        // Use name from the detailed employee profile if available, otherwise from the seedUser entry
        name: employeeDetails ? employeeDetails.name : foundSeedUser.name,
        role: foundSeedUser.role,
        employeeId: foundSeedUser.employeeId || null, // The ID linking to initialEmployees
        // You could add more details from employeeDetails here if needed throughout the app
        // e.g., position: employeeDetails ? employeeDetails.position : null
      };
      
      setCurrentUserAndUpdateStorage(userToStore);
      return userToStore; // Return the constructed user object
    } else {
      // If login fails, ensure both context state and localStorage are cleared
      setCurrentUserAndUpdateStorage(null);
      return null; // Indicate login failure
    }
  }, [setCurrentUserAndUpdateStorage]);

  const logout = useCallback(() => {
    setCurrentUserAndUpdateStorage(null); // Clears context state and localStorage
  }, [setCurrentUserAndUpdateStorage]);

  // On initial load, ensure the state is definitely synced with localStorage.
  // This is mostly redundant if useState initializer works correctly, but adds robustness.
  useEffect(() => {
    const storedUser = getUserFromLocalStorage();
    if (storedUser) {
      // Potentially re-verify/re-construct user object if needed,
      // but for LS, just setting it should be fine.
      // This ensures that if AuthProvider re-mounts, state is consistent.
      setCurrentUserInternal(storedUser);
    }
  }, []);


  const value = {
    currentUser,
    login,
    logout,
    // loadingAuth is not needed for synchronous localStorage operations
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
