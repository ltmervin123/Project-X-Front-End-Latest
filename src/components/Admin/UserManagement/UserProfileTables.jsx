import React, { useMemo } from 'react';

const UserProfileTables = ({
  searchQuery,
  showStatusOptions,
  showActionOptions,
  setShowStatusOptions,
  setShowActionOptions,
  currentPage,
  setCurrentPage,
  itemsPerPage
}) => {
  const users = [
    {
      name: "John Smith",
      email: "john.smith@example.com",
      role: "Admin",
      status: "Active",
      lastLogin: "2023-07-20",
      actions: { canEdit: true, canDelete: true, canView: true }
    },
    {
      name: "Jane Doe",
      email: "jane.doe@example.com",
      role: "User",
      status: "Inactive",
      lastLogin: "2023-07-19",
      actions: { canEdit: true, canDelete: false, canView: true }
    },
    {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      role: "User",
      status: "Active",
      lastLogin: "2023-07-18",
      actions: { canEdit: false, canDelete: false, canView: true }
    },
    {
      name: "Bob Brown",
      email: "bob.brown@example.com",
      role: "Admin",
      status: "Banned",
      lastLogin: "2023-07-17",
      actions: { canEdit: true, canDelete: true, canView: true }
    },
    {
      name: "Charlie Green",
      email: "charlie.green@example.com",
      role: "User",
      status: "Active",
      lastLogin: "2023-07-16",
      actions: { canEdit: false, canDelete: false, canView: true }
    },
    {
      name: "Diana Prince",
      email: "diana.prince@example.com",
      role: "User",
      status: "Inactive",
      lastLogin: "2023-07-15",
      actions: { canEdit: true, canDelete: false, canView: true }
    },
    {
      name: "Ethan Hunt",
      email: "ethan.hunt@example.com",
      role: "Admin",
      status: "Active",
      lastLogin: "2023-07-14",
      actions: { canEdit: true, canDelete: true, canView: true }
    },
    {
      name: "Fiona Glenanne",
      email: "fiona.glenanne@example.com",
      role: "User",
      status: "Active",
      lastLogin: "2023-07-13",
      actions: { canEdit: false, canDelete: false, canView: true }
    },
    {
      name: "George Costanza",
      email: "george.costanza@example.com",
      role: "User",
      status: "Inactive",
      lastLogin: "2023-07-12",
      actions: { canEdit: true, canDelete: false, canView: true }
    },
    {
      name: "Hannah Montana",
      email: "hannah.montana@example.com",
      role: "Admin",
      status: "Active",
      lastLogin: "2023-07-11",
      actions: { canEdit: true, canDelete: true, canView: true }
    },
    {
      name: "Ian Malcolm",
      email: "ian.malcolm@example.com",
      role: "User",
      status: "Active",
      lastLogin: "2023-07-10",
      actions: { canEdit: false, canDelete: false, canView: true }
    },
    {
      name: "Jade Green",
      email: "jade.green@example.com",
      role: "User",
      status: "Inactive",
      lastLogin: "2023-07-09",
      actions: { canEdit: true, canDelete: false, canView: true }
    },
    {
      name: "Kyle Reese",
      email: "kyle.reese@example.com",
      role: "Admin",
      status: "Active",
      lastLogin: "2023-07-08",
      actions: { canEdit: true, canDelete: true, canView: true }
    },
    {
      name: "Laura Croft",
      email: "laura.croft@example.com",
      role: "User",
      status: "Active",
      lastLogin: "2023-07-07",
      actions: { canEdit: false, canDelete: false, canView: true }
    },
    {
      name: "Mike Wazowski",
      email: "mike.wazowski@example.com",
      role: "User",
      status: "Inactive",
      lastLogin: "2023-07-06",
      actions: { canEdit: true, canDelete: false, canView: true }
    },
    {
      name: "Nina Williams",
      email: "nina.williams@example.com",
      role: "Admin",
      status: "Active",
      lastLogin: "2023-07-05",
      actions: { canEdit: true, canDelete: true, canView: true }
    },
    {
      name: "Oliver Queen",
      email: "oliver.queen@example.com",
      role: "User",
      status: "Active",
      lastLogin: "2023-07-04",
      actions: { canEdit: false, canDelete: false, canView: true }
    },
    {
      name: "Pam Beesly",
      email: "pam.beesly@example.com",
      role: "User",
      status: "Inactive",
      lastLogin: "2023-07-03",
      actions: { canEdit: true, canDelete: false, canView: true }
    },
    {
      name: "Quagmire",
      email: "quagmire@example.com",
      role: "Admin",
      status: "Active",
      lastLogin: "2023-07-02",
      actions: { canEdit: true, canDelete: true, canView: true }
    },
    {
      name: "Rachel Green",
      email: "rachel.green@example.com",
      role: "User",
      status: "Active",
      lastLogin: "2023-07-01",
      actions: { canEdit: false, canDelete: false, canView: true }
    },
    {
      name: "Steve Rogers",
      email: "steve.rogers@example.com",
      role: "User",
      status: "Inactive",
      lastLogin: "2023-06-30",
      actions: { canEdit: true, canDelete: false, canView: true }
    },
    {
      name: "Tony Stark",
      email: "tony.stark@example.com",
      role: "Admin",
      status: "Active",
      lastLogin: "2023-06-29",
      actions: { canEdit: true, canDelete: true, canView: true }
    },
    {
      name: "Uma Thurman",
      email: "uma.thurman@example.com",
      role: "User",
      status: "Active",
      lastLogin: "2023-06-28",
      actions: { canEdit: false, canDelete: false, canView: true }
    },
    {
      name: "Vin Diesel",
      email: "vin.diesel@example.com",
      role: "User",
      status: "Inactive",
      lastLogin: "2023-06-27",
      actions: { canEdit: true, canDelete: false, canView: true }
    },
    {
      name: "Will Smith",
      email: "will.smith@example.com",
      role: "Admin",
      status: "Active",
      lastLogin: "2023-06-26",
      actions: { canEdit: true, canDelete: true, canView: true }
    },
    {
      name: "Xena Warrior",
      email: "xena.warrior@example.com",
      role: "User",
      status: "Active",
      lastLogin: "2023-06-25",
      actions: { canEdit: false, canDelete: false, canView: true }
    },
    {
      name: "Yoda",
      email: "yoda@example.com",
      role: "User",
      status: "Inactive",
      lastLogin: "2023-06-24",
      actions: { canEdit: true, canDelete: false, canView: true }
    },
    {
      name: "Zorro",
      email: "zorro@example.com",
      role: "Admin",
      status: "Active",
      lastLogin: "2023-06-23",
      actions: { canEdit: true, canDelete: true, canView: true }
    }
  ];

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUsers, currentPage, itemsPerPage]);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) =>
      Math.min(prev + 1, Math.ceil(filteredUsers.length / itemsPerPage))
    );
  };

  const StatusOptionsMenu = ({ index }) => (
    <div className="action-option-status " style={{ zIndex: 1000 }}>
      <div className="d-flex flex-column gap-2">
        <button>Warn</button>
        <button>Banned</button>
        <button>Force Logout</button>
      </div>
    </div>
  );

  const ViewDetailsMenu = ({ index, user }) => (
    <div className="action-option-action" style={{ zIndex: 1000 }}>
      <div className="d-flex flex-column gap-2">
        <button>Edit User</button>
        <button>Reset Password</button>
        <button>Delete User</button>
      </div>
    </div>
  );

  return (
    <div className="user-table-container bg-white shadow p-3 mb-4">
      <table className="mb-0">
        <thead>
          <tr>

            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th className="text-center">Status</th>
            <th>Last Login</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.length !== 0 ? (
            paginatedUsers.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className="position-relative">
                  <div className="d-flex align-items-center justify-content-center gap-2">
                    <span style={{
                      color: user.status === "Active" ? "#319F43" : "#FF0000",
                    }}>
                      {user.status}
                    </span>
                    <button 
                      className="btn-status p-0 position-relative"
                      onClick={() => setShowStatusOptions(showStatusOptions === index ? null : index)}
                    >
                      <svg width="4" height="14" viewBox="0 0 4 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 14C3.10457 14 4 13.1046 4 12C4 10.8954 3.10457 10 2 10C0.89543 10 0 10.8954 0 12C0 13.1046 0.89543 14 2 14Z" fill="black"/>
                        <path d="M2 9C3.10457 9 4 8.10457 4 7C4 5.89543 3.10457 5 2 5C0.89543 5 0 5.89543 0 7C0 8.10457 0.89543 9 2 9Z" fill="black"/>
                        <path d="M2 4C3.10457 4 4 3.10457 4 2C4 0.89543 3.10457 0 2 0C0.89543 0 0 0.89543 0 2C0 3.10457 0.89543 4 2 4Z" fill="black"/>
                      </svg>
                      {showStatusOptions === index && <StatusOptionsMenu index={index} />}
                    </button>
                  </div>
                </td>
                <td>{user.lastLogin}</td>
                <td className="d-flex justify-content-center align-items-center">
                  <div className="d-flex align-items-center gap-2 position-relative">
                    <button className="btn-view-details d-flex align-items-center gap-1">
                      View Details
                    </button>
                    <button 
                      className="btn-status p-0 position-relative"
                      onClick={() => setShowActionOptions(showActionOptions === index ? null : index)}
                    >
                      <svg width="4" height="14" viewBox="0 0 4 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 14C3.10457 14 4 13.1046 4 12C4 10.8954 3.10457 10 2 10C0.89543 10 0 10.8954 0 12C0 13.1046 0.89543 14 2 14Z" fill="black"/>
                        <path d="M2 9C3.10457 9 4 8.10457 4 7C4 5.89543 3.10457 5 2 5C0.89543 5 0 5.89543 0 7C0 8.10457 0.89543 9 2 9Z" fill="black"/>
                        <path d="M2 4C3.10457 4 4 3.10457 4 2C4 0.89543 3.10457 0 2 0C0.89543 0 0 0.89543 0 2C0 3.10457 0.89543 4 2 4Z" fill="black"/>
                      </svg>
                      {showActionOptions === index && <ViewDetailsMenu index={index} user={user} />}
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="d-flex company-prev-next-btn-control justify-content-center align-items-center gap-3 mt-3">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M0.371133 5.62144L6.08746 0.0244005L7.48647 1.45323L2.48456 6.35077L7.3821 11.3527L5.95327 12.7517L0.356225 7.03536C0.170741 6.84587 0.0681127 6.59047 0.0709085 6.32532C0.0737042 6.06017 0.181695 5.80698 0.371133 5.62144Z" fill="#F46A05"/>
          </svg>
        </button>
        <span>{currentPage}</span>
        <button onClick={handleNextPage} disabled={currentPage === Math.ceil(filteredUsers.length / itemsPerPage)}>
          <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M7.14131 7.071L1.48431 12.728L0.0703125 11.314L5.02031 6.364L0.0703125 1.414L1.48431 0L7.14131 5.657C7.32878 5.84453 7.4341 6.09884 7.4341 6.364C7.4341 6.62916 7.32878 6.88347 7.14131 7.071Z" fill="#F46A05"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default UserProfileTables;
