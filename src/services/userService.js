import axios from 'axios'

const registerNewUser = (email,phone,username,password) => {
    return axios.post("http://localhost:1176/api/v1/register", {
        email,phone,username,password
      })
}

export {registerNewUser}