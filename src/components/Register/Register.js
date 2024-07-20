import "./Register.scss";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
//=======LINKS============
import {registerNewUser} from '../../services/userService.js'
const Register = (props) => {
  //-------declear-state----------
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const defaultValidInput = {
    isValidEmail: true,
    isValidPhone: true,
    isValidPassword: true,
    isValidConfirmPassword: true
  }
  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput) //css
  //--------Validate Form-------------
  const isValidInput = () => {
    setObjCheckInput(defaultValidInput) //reset to true then check top -> bottom
    if (!email) {
      toast.error("Email is required");
      // console.log("Check before:",{...defaultValidInput}) //becasue we are checking object so we use {}
      setObjCheckInput({...defaultValidInput, isValidEmail:false}) //on the right used to overwrite the previous one
      // console.log("Check after",{...defaultValidInput, isValidEmail:false})
      return false;
    }
    let regx = /^\S+@\S+\.\S+$/; //checking regular email
    if (!regx.test(email)) {
      setObjCheckInput({...defaultValidInput, isValidEmail:false})
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!phone) {
      setObjCheckInput({...defaultValidInput, isValidPhone:false})
      toast.error("Phone is required");
      return false;
    }
    if (!username) {
      toast.error("username is required");
      return false;
    }
    if (!password) {
      setObjCheckInput({...defaultValidInput, isValidPassword:false})
      toast.error("Password is required");
      return false;
    }
    if (password !== confirmPassword) {
      setObjCheckInput({...defaultValidInput, isValidConfirmPassword:false})
      toast.error("Confirm password does not match");
      return false;
    }
    return true;
  };
  //-------handleRegister-----------
  const handleRegister = async () => {
    let check = isValidInput(); 
    // let userData = { email, phone, username, password }; //shortcut object declaration
    if (check === true) {
        let response = await registerNewUser(email,phone,username,password) //link from services (just get data)
        let serverData = response.data;
        if (+serverData.EC === 0){ //+ 
          toast.success(serverData.EM);
          navigateLg("/login"); 
        } else {
          toast.error(serverData.EM)
        }
  };
  }
  //------Navigating Link----------
  let navigateLg = useNavigate();
  const handleNavLogin = () => {
    navigateLg("/login");
  };
  //-------FETCH API--------
  // useEffect(() => {
  //   // const fetchData = async () => {
  //   //   try {
  //   //     const response = await axios.get("http://localhost:1176/api/test-api");
  //   //     console.log("Check data:", response.data); // Access the actual data from the response
  //   //   } catch (error) {
  //   //     console.error("Error fetching data:", error); // Handle errors gracefully, log error details
  //   //   }
  //   // };

  //   // fetchData(); // Immediately call the function to fetch data
  //   axios.post("http://localhost:1176/api/v1/register", {
  //     email,phone,username,password
  //   })
  // }, [])
  return (
    <div className="register-container">
      <div className="container">
        {/* sometimes we just edit css for father */}
        <div className="row px-3 px-sm-0">
          {/* d-none d-sm-block block left on small devices*/}
          <div className="content-left col-12 d-none col-sm-7 d-sm-block">
            <div className="brand">QUOC NHU'S FULLSTACK</div>
            <div className="detail">No pain - No gain</div>
          </div>
          {/* big device 12 items, sm 5items */}
          <div className="content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3">
            {/* show logo when less than sm */}
            <div className="brand d-sm-none">QUOC NHU'S FULLSTACK</div>
            <div className="form-group">
              <lable>Email:</lable>
              <input
                type="text"
                className={objCheckInput.isValidEmail ? "form-control" : 'form-control is-invalid'}
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="form-group">
              <lable>Phone number:</lable>
              <input
                type="text"
                className={objCheckInput.isValidPhone ? "form-control" : 'form-control is-invalid'}
                placeholder="Enter your phone number"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>
            <div className="form-group">
              <lable>Username:</lable>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="form-group">
              <lable>Enter password:</lable>
              <input
                type="password"
                className={objCheckInput.isValidPassword ? "form-control" : 'form-control is-invalid'}
                placeholder="Enter password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>{" "}
            <div className="form-group">
              <lable>Re-enter password:</lable>
              <input
                type="password"
                className={objCheckInput.isValidConfirmPassword ? "form-control" : 'form-control is-invalid'}
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              className="btn btn-primary"
              onClick={() => handleRegister()}
            >
              Register
            </button>
            <span className="text-center">
              <a href="#" className="forgot-password">
                Having an account already!
              </a>
            </span>
            {/* hr to make a line */}
            <hr />
            <button
              className="btn btn-success"
              onClick={() => handleNavLogin()}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
