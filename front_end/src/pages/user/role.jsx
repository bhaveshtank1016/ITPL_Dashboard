import React, { useState, useEffect, useCallback } from 'react';
import { API_URL } from "../../config";

const Role = () => {
  // State for the list
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. State for the "Add Role" modal and form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addError, setAddError] = useState(null);

  // Use useCallback to memoize the fetch function
  const fetchRoles = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError("User is not authenticated.");
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}rolesList`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new Error('Not authorized to view this page.');
        }
        throw new Error('Failed to fetch roles');
      }

      const data = await response.json();
      setRoles(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array as it doesn't depend on props or state

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]); // Depend on the memoized fetchRoles function

  // 2. Handler function for submitting the new role
  const handleAddRole = async (event) => {
    event.preventDefault(); // Prevent default form submission
    setIsSubmitting(true);
    setAddError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required.');
      }

      // Assume your API endpoint for adding a role is 'addRole'
      const response = await fetch(`${API_URL}addRole`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Important for sending JSON
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: newRoleName }) // Send the new role name in the body
      });

      if (!response.ok) {
        // You can add more specific error handling here based on API responses
        throw new Error('Failed to add the new role.');
      }
      
      // If successful:
      setIsModalOpen(false);  // Close the modal
      setNewRoleName('');     // Clear the input field
      await fetchRoles();       // Refresh the roles list to show the new role
      
    } catch (err) {
      setAddError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };


  if (loading) {
    return <div className="text-white p-4">Loading roles...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  return (
    <>
      <div className='bg-neutral-900 p-4 rounded-xl shadow-md mx-auto container text-sm'>
        <div className='flex justify-between'>
          <h2 className='text-white text-xl mb-4 font-bold'>Manage Roles</h2>
          {/* 3. Button to open the modal */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className='bg-blue-500 px-3 rounded-md hover:rounded-xl hover:bg-blue-600 duration-300 h-10'
          >
            Add Role
          </button>
        </div>
        <div className='overflow-x-auto pt-10'>
          <table className='w-full text-left'>
            <thead>
              <tr className='bg-neutral-800'>
                <th className='p-3 text-white'>S. No.</th>
                <th className='p-3 text-white'>Role Name</th>
              </tr>
            </thead>
            <tbody>
              {roles.length > 0 ? (
                roles.map((role, index) => (
                  <tr key={role._id} className='border-b border-neutral-700'>
                    <td className='p-3 text-white'>{index + 1}</td>
                    <td className='p-3 text-white'>{role.name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="p-3 text-center text-neutral-400">
                    No roles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. The Modal for adding a new role */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-neutral-800 p-6 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-white text-lg font-bold mb-4">Add a New Role</h3>
            <form onSubmit={handleAddRole}>
              <input
                type="text"
                value={newRoleName}
                onChange={(e) => setNewRoleName(e.target.value)}
                placeholder="Enter role name"
                className="w-full bg-neutral-700 text-white p-2 rounded mb-4"
                required
              />
              {addError && <p className="text-red-500 text-sm mb-4">{addError}</p>}
              <div className="flex justify-end space-x-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-neutral-600 text-white px-4 py-2 rounded hover:bg-neutral-500"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-blue-400 disabled:cursor-not-allowed hover:bg-blue-600"
                >
                  {isSubmitting ? 'Adding...' : 'Add Role'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Role;//authentication
//authrization
// 
