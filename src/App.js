import Nav from "./components/Navigation/Nav";
import {useState,useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Users from './components/ManageUsers/Users.js'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import _ from 'lodash'
const App = () => {
  const [account, setAccount] = useState({})
  useEffect(()=> {
    let session = sessionStorage.getItem('account')
    if(session) {
      setAccount(JSON.parse(session)) // change to object to import to useState
    }
  },[])
  return (
    <Router>
      <div className="app">
        {account && !_.isEmpty(account) && account.isAuthenticated && <Nav />}
        <Routes>
          {/* exact to fix */}
          <Route path="/" exact element={<div>Home = Hello world</div>} />
          <Route path="/news" element={<div> Hell ya</div>} />
          <Route path="/contact" element={<div>Ya Hell</div>} />
          <Route path="/about" element={<div>Ya Hell</div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<Users />} />
          <Route path="*" element={<div>404 not found</div>} />
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </Router>
  );
};

export default App;
