// // src/pages/AddEmployeePage.jsx
// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { addEmployee } from '../services/storageService';

// const AddEmployeePage = () => {
//   const navigate = useNavigate();
//   const [employee, setEmployee] = useState({
//     name: '',
//     position: '',
//     department: '',
//     email: '',
//     phone: '',
//     startDate: '',
//   });
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEmployee((prevEmployee) => ({
//       ...prevEmployee,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!employee.name || !employee.position || !employee.department || !employee.email) {
//       setError('Name, Position, Department, and Email are required.');
//       return;
//     }
//     setError('');
//     addEmployee(employee);
//     alert('Employee added successfully!');
//     navigate('/admin/employees');
//   };

//   const inputClass = "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";
//   const labelClass = "block text-sm font-medium text-gray-700";

//   return (
//     <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
//       <h2 className="text-2xl font-semibold text-gray-700 mb-6">Add New Employee</h2>
//       {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label htmlFor="name" className={labelClass}>Name:</label>
//           <input type="text" id="name" name="name" value={employee.name} onChange={handleChange} className={inputClass} required />
//         </div>
//         <div>
//           <label htmlFor="position" className={labelClass}>Position:</label>
//           <input type="text" id="position" name="position" value={employee.position} onChange={handleChange} className={inputClass} required />
//         </div>
//         <div>
//           <label htmlFor="department" className={labelClass}>Department:</label>
//           <input type="text" id="department" name="department" value={employee.department} onChange={handleChange} className={inputClass} required />
//         </div>
//         <div>
//           <label htmlFor="email" className={labelClass}>Email:</label>
//           <input type="email" id="email" name="email" value={employee.email} onChange={handleChange} className={inputClass} required />
//         </div>
//         <div>
//           <label htmlFor="phone" className={labelClass}>Phone:</label>
//           <input type="tel" id="phone" name="phone" value={employee.phone} onChange={handleChange} className={inputClass} />
//         </div>
//         <div>
//           <label htmlFor="startDate" className={labelClass}>Start Date:</label>
//           <input type="date" id="startDate" name="startDate" value={employee.startDate} onChange={handleChange} className={inputClass} />
//         </div>
//         <div className="flex items-center justify-end space-x-3">
//            <Link to="/admin/employees" className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-md text-sm font-medium">
//             Cancel
//           </Link>
//           <button
//             type="submit"
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           >
//             Add Employee
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddEmployeePage;


// src/pages/AddEmployeePage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { addEmployee, addDynamicUser } from '../services/storageService';

// Define a default password for newly created users for this simulation
const DEFAULT_PASSWORD_FOR_NEW_USERS = "password123";

const AddEmployeePage = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: '',
    position: '',
    department: '',
    email: '',
    phone: '',
    startDate: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
    setError(''); // Clear error when user starts typing
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!employee.name || !employee.position || !employee.department || !employee.email) {
      setError('Name, Position, Department, and Email are required.');
      return;
    }
    // Basic email format check
    if (!/\S+@\S+\.\S+/.test(employee.email)) {
        setError('Please enter a valid email address.');
        return;
    }

    // 1. Add the employee record
    const newEmployeeWithId = addEmployee(employee); // This function now returns the employee with generated ID

    if (newEmployeeWithId && newEmployeeWithId.id) {
      // 2. Create a corresponding dynamic user for login
      const newDynamicUserData = {
        id: 'user_' + newEmployeeWithId.id, // Create a unique user ID, e.g., prefixed employee ID
        email: newEmployeeWithId.email,
        password: DEFAULT_PASSWORD_FOR_NEW_USERS,
        role: 'employee', // New users are employees by default
        name: newEmployeeWithId.name,
        employeeId: newEmployeeWithId.id, // Link to the employee record
      };
      addDynamicUser(newDynamicUserData);

      setSuccessMessage(
        `Employee "${newEmployeeWithId.name}" added successfully!\nLogin credentials:\nEmail: ${newEmployeeWithId.email}\nPassword: ${DEFAULT_PASSWORD_FOR_NEW_USERS}`
      );
      // Clear form fields
      setEmployee({ name: '', position: '', department: '', email: '', phone: '', startDate: ''});
      
      // Optionally navigate after a delay
      // setTimeout(() => {
      //   navigate('/admin/employees');
      // }, 7000); // Increased delay for reading credentials
    } else {
      setError('Failed to add employee. Please try again.');
    }
  };

  const inputClass = "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";
  const labelClass = "block text-sm font-medium text-gray-700";

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Add New Employee</h2>
      {error && <p className="text-red-600 bg-red-100 p-3 rounded-md text-sm mb-4">{error}</p>}
      {successMessage && (
        <div className="text-green-700 bg-green-100 p-3 rounded-md text-sm mb-4 whitespace-pre-line">
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className={labelClass}>Name:</label>
          <input type="text" id="name" name="name" value={employee.name} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label htmlFor="position" className={labelClass}>Position:</label>
          <input type="text" id="position" name="position" value={employee.position} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label htmlFor="department" className={labelClass}>Department:</label>
          <input type="text" id="department" name="department" value={employee.department} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Email:</label>
          <input type="email" id="email" name="email" value={employee.email} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>Phone:</label>
          <input type="tel" id="phone" name="phone" value={employee.phone} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label htmlFor="startDate" className={labelClass}>Start Date:</label>
          <input type="date" id="startDate" name="startDate" value={employee.startDate} onChange={handleChange} className={inputClass} />
        </div>
        <div className="flex items-center justify-end space-x-3 pt-2">
          <Link to="/admin/employees" className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-md text-sm font-medium border border-gray-300 hover:bg-gray-50">
            Cancel
          </Link>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={!!successMessage && !error} // Disable if success message is shown and no new error
          >
            Add Employee
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployeePage;
