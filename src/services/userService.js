import axios from 'axios'

const registerNewUser = (email,phone,username,password) => {
    return axios.post("http://localhost:1176/api/v1/register", {
        email,phone,username,password
      })
}

const loginUser = (valueLogin,password) => {
    return axios.post("http://localhost:1176/api/v1/login", {
        valueLogin, password
      })
}

const fetchAllUser = (currentPage,currentLimit) => { 
 return axios.get(`http://localhost:1176/api/v1/user/read?page=${currentPage}&limit=${currentLimit}`);
}

const deleteUser = (user) => {
  return axios.delete("http://localhost:1176/api/v1/user/delete", {
    data: { id: user.id } // {user}
  });
};
const fetchGroup = () => {
  return axios.get("http://localhost:1176/api/v1/group/read");
}

export {registerNewUser, loginUser,fetchAllUser,deleteUser,fetchGroup}

//http://localhost:1176/api/v1/user/read?page=1&limit=20