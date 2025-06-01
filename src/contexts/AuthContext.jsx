// // src/contexts/AuthContext.jsx
// import React, { createContext, useState, useEffect, useContext } from 'react';
// import { getMockUser, setMockUser as storeUser, clearMockUser as removeUser } from '../services/storageService';
// import { predefinedUsers } from '../data/seedData'; // For login simulation

// const AuthContext = createContext(null);

// // export const AuthProvider = ({ children }) => {
// //   const [currentUser, setCurrentUser] = useState(getMockUser()); // Initialize from localStorage

// //   const login = (userIdToLogin) => {
// //     const user = predefinedUsers.find(u => u.id === userIdToLogin);
// //     if (user) {
// //       storeUser(user); // Save to localStorage
// //       setCurrentUser(user); // Update state
// //       return user; // Return user object on successful login
// //     }
// //     return null; // Return null if login fails
// //   };

// //   const logout = () => {
// //     removeUser(); // Clear from localStorage
// //     setCurrentUser(null); // Update state
// //   };

// //   // Optional: useEffect to listen to storage changes from other tabs (advanced)
// //   // useEffect(() => {
// //   //   const handleStorageChange = (event) => {
// //   //     if (event.key === 'currentUser') {
// //   //       setCurrentUser(getMockUser());
// //   //     }
// //   //   };
// //   //   window.addEventListener('storage', handleStorageChange);
// //   //   return () => {
// //   //     window.removeEventListener('storage', handleStorageChange);
// //   //   };
// //   // }, []);

// //   return (
// //     <AuthContext.Provider value={{ currentUser, login, logout }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // Custom hook to use the auth context
// // export const useAuth = () => {
// //   return useContext(AuthContext);
// // };

// // src/contexts/AuthContext.jsx
// // ...
// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(getMockUser());

//   const login = (userIdToLogin) => { // Expects the ID of the user
//     const user = predefinedUsers.find(u => u.id === userIdToLogin);
//     if (user) {
//       storeUser(user); // Save to localStorage
//       setCurrentUser(user); // Update state
//       return user;
//     }
//     return null;
//   };
//   // ... logout and provider ...

//   const logout = () => {
//     removeUser(); // Clear from localStorage
//     setCurrentUser(null); // Update state
//   };

//   // Optional: useEffect to listen to storage changes from other tabs (advanced)
//   // useEffect(() => {
//   //   const handleStorageChange = (event) => {
//   //     if (event.key === 'currentUser') {
//   //       setCurrentUser(getMockUser());
//   //     }
//   //   };
//   //   window.addEventListener('storage', handleStorageChange);
//   //   return () => {
//   //     window.removeEventListener('storage', handleStorageChange);
//   //   };
//   // }, []);

//   return (
//     <AuthContext.Provider value={{ currentUser, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };


// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { 
    getMockUser, 
    setMockUser as storeUserInLocalStorage, // Renamed for clarity
    clearMockUser as removeUserFromLocalStorage, // Renamed for clarity
    getAllDynamicUsers 
} from '../services/storageService';
import { predefinedUsers } from '../data/seedData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(getMockUser());
  const [combinedUserList, setCombinedUserList] = useState([]);

  // Function to load and combine all users (predefined + dynamic)
  const loadAndCombineUsers = useCallback(() => {
    const dynamicUsers = getAllDynamicUsers();
    const combined = [...predefinedUsers, ...dynamicUsers];
    setCombinedUserList(combined);
    return combined; // Return for immediate use if needed
  }, []); // Empty dependency array, this structure is stable

  useEffect(() => {
    loadAndCombineUsers();
    // This effect runs once on mount.
    // If dynamic users change, we need a way to trigger a reload of this list.
    // For this app's scope, a page reload or re-login after adding/deleting an employee
    // will refresh the dynamic user list from localStorage.
  }, [loadAndCombineUsers]);

  const login = (userIdToLogin) => {
    // Ensure combinedUserList is up-to-date, especially if login is called before useEffect runs fully
    // or if dynamic users could have changed without a component remount.
    const currentCombinedUsers = (combinedUserList.length > 0) ? combinedUserList : loadAndCombineUsers();
    
    const user = currentCombinedUsers.find(u => u.id === userIdToLogin);
    
    if (user) {
      storeUserInLocalStorage(user);
      setCurrentUser(user);
      return user;
    }
    
    console.warn("AuthContext: User not found with ID during login:", userIdToLogin);
    return null;
  };

  const logout = () => {
    removeUserFromLocalStorage();
    setCurrentUser(null);
  };

  // A function to explicitly refresh the user list if other parts of the app modify dynamicUsers
  // and an immediate update to AuthContext is needed without re-login.
  const refreshAuthUserList = useCallback(() => {
    loadAndCombineUsers();
  }, [loadAndCombineUsers]);


  return (
    <AuthContext.Provider value={{ currentUser, login, logout, refreshAuthUserList }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
