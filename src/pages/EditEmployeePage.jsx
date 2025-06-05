// // src/pages/EditEmployeePage.jsx
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import { getEmployeeById, updateEmployee } from '../services/storageService';

// const EditEmployeePage = () => {
//   const { employeeId } = useParams();
//   const navigate = useNavigate();

//   const [employee, setEmployee] = useState({
//     name: '',
//     position: '',
//     department: '',
//     email: '',
//     phone: '',
//     startDate: '',
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [notFound, setNotFound] = useState(false);

//   useEffect(() => {
//     if (employeeId) {
//       const existingEmployee = getEmployeeById(employeeId);
//       if (existingEmployee) {
//         setEmployee(existingEmployee);
//         setNotFound(false);
//       } else {
//         setNotFound(true);
//       }
//       setLoading(false);
//     }
//   }, [employeeId]);

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
//     updateEmployee({ ...employee, id: employeeId });
//     alert('Employee updated successfully!');
//     navigate('/admin/employees');
//   };

//   const inputClass = "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";
//   const labelClass = "block text-sm font-medium text-gray-700";


//   if (loading) {
//     return <p className="text-center text-gray-600 mt-10">Loading employee data...</p>;
//   }

//   if (notFound) {
//     return (
//       <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md text-center">
//         <h2 className="text-xl font-semibold text-red-600 mb-4">Employee Not Found</h2>
//         <p className="text-gray-600 mb-6">No employee exists with the ID: {employeeId}</p>
//         <Link to="/admin/employees">
//           <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//             Back to Employee List
//           </button>
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
//       <h2 className="text-2xl font-semibold text-gray-700 mb-6">Edit Employee: <span className="font-normal">{employee.name}</span></h2>
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
//           <input type="date" id="startDate" name="startDate" value={employee.startDate || ''} onChange={handleChange} className={inputClass} />
//         </div>
//         <div className="flex items-center justify-end space-x-3 pt-2">
//           <Link to="/admin/employees" className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-md text-sm font-medium border border-gray-300 hover:bg-gray-50">
//             Cancel
//           </Link>
//           <button
//             type="submit"
//             className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           >
//             Update Employee
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditEmployeePage;