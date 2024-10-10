import React, { useEffect, useState } from "react";
import { fetchAllUser,deleteUser } from "../../services/userService.js";
import ReactPaginate from 'react-paginate';
import ModalDelete from '../ManageUsers/ModalDelete.js'
import ModalUser from '../ManageUsers/ModalUser.js'
import "./Users.scss";
import {toast} from "react-toastify"
const Users = () => {
  const [listUsers, setListUsers] = useState([]);     
  const [filteredUsers, setFilteredUsers] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [currentLimit, setCurrentLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0); 
  const [searchTerm, setSearchTerm] = useState(""); 
  //===Modal Reactbootrap
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataModal,setDataModal] = useState({})
  //===Handle Pagination 
  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    try {
      const response = await fetchAllUser(currentPage, currentLimit);
      console.log("checking fetching data===>",response)
      if (response.data && response.data.EC === 0) {
        setListUsers(response.data.DT.users);      
        setFilteredUsers(response.data.DT.users);   
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

  //=======Handle deleting user
  const handleDeleteUser = async (user) => {
    try {
      setIsShowModalDelete(true)
      setDataModal(user)
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }
    const handleClose = () => {
      setIsShowModalDelete(false)
      setDataModal({})
    }
    const confirmDeleteUser = async () => {
        let response = await deleteUser(dataModal);
      if(response && response.data.EC === 0){
          toast.success(response.data.EM)
          fetchUsers(); // Fetch updated users after deletion
          setIsShowModalDelete(false)
      }else {
        toast.error(response.data.EM)
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
            <th className="text-center">No</th>
            <th className="text-center">Id</th>
            <th className="text-center">Email</th>
            <th className="text-center">Username</th>
            <th className="text-center">Group</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers && filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <tr key={user.id}>
                <td className="text-center">{(currentPage - 1) * currentLimit + index + 1}</td>
                <td className="text-center">{user.id}</td>
                <td className="text-center">{user.email}</td>
                <td className="text-center">{user.username}</td>
                <td className="text-center">{user.Group ? user.Group.name : 'No Group'}</td>
                <td className="d-flex justify-content-center gap-2">
                  <button className="btn btn-primary">Edit</button>
                  {/* user of map => pass to function */}
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
      <ModalDelete 
      show={isShowModalDelete}
      handleClose={handleClose}
      confirmDeleteUser={confirmDeleteUser}
      dataModal = {dataModal}
      />
      <ModalUser 
        title= {"Create new user"}
      />
    </div>
  );
};
export default Users;


