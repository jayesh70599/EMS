// src/pages/EmployeeListPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
// import { Link } from 'react-router-dom'; // Link not needed if no actions
import { getAllEmployees } from '../services/storageService'; // LS service using seedData

const EmployeeListPage = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  // isLoading can be for a refresh button, not critical for initial LS load


  useEffect(() => {
    const loadedEmployees = getAllEmployees(); 
    setEmployees(loadedEmployees);
  }, []);

  const filteredEmployees = employees.filter(employee =>
    (employee.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (employee.department?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (employee.position?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">Employee Directory </h2>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, department, position..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {filteredEmployees.length === 0 && (
        <p className="text-gray-600 mt-4">
          No employees found. {searchTerm && 'Try adjusting your search.'}
        </p>
      )}

      {filteredEmployees.length > 0 && (
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                {/* Actions column removed as there are no add/edit/delete actions */}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.startDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeeListPage;