import "./Register.scss";
const Register = (props) => {
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
              />
            </div>
            <div className="form-group">
              <lable>Phone number:</lable>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your phone number"
              />
            </div>
            <div className="form-group">
              <lable>Username:</lable>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
              />
            </div>
            <div className="form-group">
              <lable>Enter password:</lable>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
              />
            </div>
            <div className="form-group">
              <lable>Re-enter password:</lable>
              <input
                type="password"
                className="form-control"
                placeholder="Re-enter password"
              />
            </div>

            <button className="btn btn-primary">Register</button>
            <span className="text-center">
              <a href="#" className="forgot-password">
                Having an account already!
              </a>
            </span>
            {/* hr to make a line */}
            <hr />
            <button className="btn btn-success">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
