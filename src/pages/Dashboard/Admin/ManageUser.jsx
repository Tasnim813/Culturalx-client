import React, { useEffect, useState } from 'react';

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users
  useEffect(() => {
    fetch('https://cultural-server.vercel.app/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center mt-10 animate-pulse text-[#0F3D2E]">Loading users...</p>;
  }

  return (
    <div className="p-6 bg-[#F6FDF9] min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#0F3D2E]">
        All Users
      </h2>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-[#d1e7dd]">
        <table className="min-w-full text-sm text-left">
          
          {/* Table Head */}
          <thead className="bg-[#0F3D2E] text-white uppercase text-xs">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Address</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="border-b hover:bg-[#e6f4ea] transition"
              >
                <td className="px-4 py-3 text-gray-700">{index + 1}</td>

                {/* User Info */}
                <td className="px-4 py-3 flex items-center gap-3">
                  <img
                    src={user.image}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover border border-[#145A32]"
                  />
                  <span className="font-medium text-[#0F3D2E]">{user.name}</span>
                </td>

                <td className="px-4 py-3 text-gray-700">{user.email}</td>

                <td className="px-4 py-3 text-gray-600">
                  {user.address || 'N/A'}
                </td>

                {/* Role */}
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      user.role === 'admin'
                        ? 'bg-[#d1f2e3] text-[#0F3D2E]'
                        : 'bg-[#e6f4ea] text-[#145A32]'
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                {/* Status */}
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      user.status === 'active'
                        ? 'bg-[#d1f2e3] text-[#0F3D2E]'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default ManageUser;