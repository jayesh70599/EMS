// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import {
    setCurrentUser as storeUserInLocalStorage,
    getCurrentUser as getUserFromLocalStorage,
    getAllLoginableUsers,
    getEmployeeById 
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

  
  useEffect(() => {
    const storedUser = getUserFromLocalStorage();
    if (storedUser) {    
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
