// import axios from 'axios'
import axios from '../setup/axios.js' //switch-case

const registerNewUser = (email,phone,username,password) => {
    return axios.post("/api/v1/register", {
        email,phone,username,password
      })
}

const loginUser = (valueLogin,password) => {
    return axios.post("/api/v1/login", {
        valueLogin, password
      })
}

const fetchAllUser = (currentPage,currentLimit) => { 
 return axios.get(`/api/v1/user/read?page=${currentPage}&limit=${currentLimit}`);
}


const createNewUser = (userData) => {
  return axios.post("/api/v1/user/create", {...userData});
};
const deleteUser = (user) => {
  return axios.delete("/api/v1/user/delete", {
    data: { id: user.id } // {user}
  });
};
const fetchGroup = () => {
  return axios.get("/api/v1/group/read");
}

const updateCurrentUser = (userData) => {
  return axios.put("/api/v1/user/update",{...userData});
}

export {registerNewUser, loginUser,fetchAllUser,deleteUser,createNewUser,fetchGroup,updateCurrentUser}

///api/v1/user/read?page=1&limit=20