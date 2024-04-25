import "./Login.scss";
import { useNavigate } from "react-router-dom";
const Login = (props) => {
  let navigate = useNavigate();
  const handleCreateAccount = () => {
    navigate("/register");
  };
  return (
    <div className="login-container">
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
            <input
              type="text"
              className="form-control"
              placeholder="Enter your email"
            />
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
            />
            <button className="btn btn-primary">Register</button>
            <span className="text-center">
              <a href="#" className="forgot-password">
                Forgot your password?
              </a>
            </span>
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
