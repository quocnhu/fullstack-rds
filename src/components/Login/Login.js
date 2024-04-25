import './Login.scss'

const Login = (props) => {
    return (
        <div className="login-container mt-5">
            <div className="container">
                <div className="row">
                    {/* d-none d-sm-block block left on small devices*/}
                    <div className="content-left col-7 d-none d-sm-block">
                        <div className="brand">
                            QUOC NHU'S FULLSTACK
                        </div>
                        <div className="detail">
                            No pain - No gain
                        </div>
                    </div>
                    {/* big device 12 items, sm 5items */}
                    <div className="content-right col-12 col-sm-5 red d-flex flex-column py-3 gap-1">
                        <input type="text" className="form-control" placeholder="Enter your email"/>
                        <input type="password" className="form-control" placeholder="Enter your password"/>
                        <button className="btn btn-primary">Login</button>
                        <span className="text-center">Forgot your password?</span>
                        {/* hr to make a line */}
                        <hr />
                        <button className="btn btn-success">Create new account</button>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Login;