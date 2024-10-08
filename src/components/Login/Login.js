import "./Login.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../services/userService.js";
//===========Navigating============
const Login = (props) => {
  let navigate = useNavigate();
  const handleCreateAccount = () => {
    navigate("/register");
  };
  //=========State Managment==========
  const [valueLogin, setValueLogin] = useState("");
  const [password, setPassword] = useState("");
  const defaultObjValidInput = {
    isValidValueLogin: true,
    isValidPassword: true,
  };
  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);
  //=========handle login ==============
  const handleLogin = async () => {
    setObjValidInput(defaultObjValidInput);
    if (!valueLogin) {
      setObjValidInput({ ...defaultObjValidInput, isValidValueLogin: false });
      toast.error("Please enter your username or phone number");
      return; //helping you to exit (no value)
    }
    if (!password) {
      setObjValidInput({ ...defaultObjValidInput, isValidPassword: false });
      toast.error("Please enter your password");
      return;
    }
    //=========Get data from backend ===============
    let response = await loginUser(valueLogin, password);
    if (response && response.data && +response.data.EC === 0) {
      //success
      toast.success(response.data.EM);
      let data = {
        isAuthenticated: true,
        token: "fake token",
      };
      sessionStorage.setItem("account", JSON.stringify(data));
      navigate("/users");
      // force to be reloaded (this ueffect can not run because children change father does not change)
      window.location.reload();
    }
    if (response && response.data && +response.data.EC !== 0) {
      //error
      toast.error(response.data.EM);
    }
  };
  //=========Handle keyPress===============
  const handleKeyPress = (event) => {
    if (event.code === "Enter" && event.keyCode === 13) {
      handleLogin();
    }
  };
  //if it has a session will be pushed to /
  useEffect(() => {
    let session = sessionStorage.getItem("account"); 
    if (session) {
      navigate("/");
    }
  }, []);
  return (
    <div className="login-container">
      <div className="container">
        {/* sometimes we just edit css for father */}
        <div className="row px-3 px-sm-0">
          {/* d-none d-sm-block block left on small devices*/}
          <div className="content-left col-12 d-none col-sm-7 d-sm-block">
            <div className="brand">QUOC NHU'S FULLSTACK</div>
            <div className="detail">
              No pain - No gain, learning technology that will open your mindset
            </div>
          </div>
          {/* big device 12 items, sm 5items */}
          <div className="content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3">
            {/* show logo when less than sm */}
            <div className="brand d-sm-none">QUOC NHU'S FULLSTACK</div>
            <input
              type="text"
              className={
                objValidInput.isValidValueLogin
                  ? "form-control"
                  : "is-invalid form-control"
              }
              placeholder="Enter email or phone number"
              value={valueLogin}
              onChange={(event) => {
                setValueLogin(event.target.value);
              }}
              onKeyDown={(event) => handleKeyPress(event)}
            />
            <input
              type="password"
              className={
                objValidInput.isValidPassword
                  ? "form-control"
                  : "is-invalid form-control"
              }
              placeholder="Enter your password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              onKeyDown={(event) => handleKeyPress(event)}
            />
            <button className="btn btn-primary" onClick={() => handleLogin()}>
              LOGIN
            </button>
            {/* <span className="text-center">
              <a href="#" className="forgot-password">
                Forgot your password?
              </a>
            </span> */}
            {/* hr to make a line */}
            <hr />
            <button
              className="btn btn-success"
              onClick={() => handleCreateAccount()}
            >
              Create new account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
