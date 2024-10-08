import React, { useEffect, useState } from "react";
import { fetchAllUser,deleteUser } from "../../services/userService.js";
import ReactPaginate from 'react-paginate';
import "./Users.scss";
import {toast} from "react-toastify"
const Users = () => {
  const [listUsers, setListUsers] = useState([]);       // All fetched users
  const [filteredUsers, setFilteredUsers] = useState([]); // Users after filtering (for search)
  const [currentPage, setCurrentPage] = useState(1); 
  const [currentLimit, setCurrentLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0); 
  const [searchTerm, setSearchTerm] = useState(""); // To store search term

  // Fetch users when the component mounts or when the page changes
  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    try {
      const response = await fetchAllUser(currentPage, currentLimit);
      console.log("checking fetching data===>",response)
      if (response.data && response.data.EC === 0) {
        setListUsers(response.data.DT.users);       // Store all users
        setFilteredUsers(response.data.DT.users);   // Initially, set filtered users same as all users
        setTotalPages(response.data.DT.totalPages);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Handle search input (by name or email)
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    // Filter the list of users based on name or email
    const filtered = listUsers.filter(user =>
      user.username.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value)
    );

    setFilteredUsers(filtered); // Update the filtered users state
  };

  // Handle page click for pagination
  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1; // ReactPaginate returns zero-based index
    setCurrentPage(selectedPage);
  };

  // Handle deleting user
  const handleDeleteUser = async (user) => {
    // console.log("event data ===>",user)
    try {
      let response = await deleteUser(user);
      // console.log("Check response", response);
      if(response && response.data.EC === 0){
          toast.success(response.data.EM)
          fetchUsers(); // Fetch updated users after deletion
      }else {
        toast.error(response.data.EM)
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }
  return (
    <div className="container">
      <div className="user-header">
          <h3>User Table</h3>
          <div>
            {/* <button className="btn btn-success">Refresh</button> */}
            <button className="btn btn-primary">Add User</button>
          </div>
      </div>

      {/* Search input */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={handleSearch} // Update search term and filter users
          className="form-control"
        />
      </div>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Id</th>
            <th>Email</th>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers && filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <tr key={user.id}>
                <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>
                  <button className="btn btn-primary">Edit</button>
                  <button className="btn btn-danger" onClick={()=>handleDeleteUser(user)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No users found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 0 && (
        <ReactPaginate
          previousLabel={"< Previous"}
          nextLabel={"Next >"}
          breakLabel={"..."}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
        />
      )}
    </div>
  );
};
export default Users;


