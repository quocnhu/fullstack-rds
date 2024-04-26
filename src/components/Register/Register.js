import "./Register.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
const Register = (props) => {
  //-------declear-state----------
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //--------Validate Form-------------
  const isValidInput = () => {
    if (!email) {
      toast.error("Email is required");
      return false;
    }
    if (!phone) {
      toast.error("Phone is required");
      return false;
    }
    if (!username) {
      toast.error("username is required");
      return false;
    }
    if (!password) {
      toast.error("Password is required");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Confirmed password is required");
      return false;
    }
    let regx = /^\S+@\S+\.\S+$/; //checking regular email
    if (!regx.test(email)) {
      toast.error("Please enter a valid email address");
    }
    return true;
  };
  //-------handleRegister-----------
  const handleRegister = () => {
    let check = isValidInput(); //this v is decleared here but never used
    let userData = { email, phone, username, password }; //shortcut object declaration
    console.log(userData);
  };

  //------Navigating Link----------
  let navigateLg = useNavigate();
  const handleNavLogin = () => {
    navigateLg("/login");
  };
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
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="form-group">
              <lable>Phone number:</lable>
              <input
                type="text"
                className="form-control"
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
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>{" "}
            <div className="form-group">
              <lable>Re-enter password:</lable>
              <input
                type="password"
                className="form-control"
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
