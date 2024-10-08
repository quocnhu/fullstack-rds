import { useEffect,useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Nav.scss"; // Import your CSS file for styling (optional)

const Nav = () => {
  const [isShow,setIsShow] = useState(true)
  let location = useLocation();
  useEffect(() => {
    //bug right here will be fixed in the future (using the url to hide nav)
    if(location.pathname === '/login' || location.pathname === '/'){
      setIsShow(false)
    }
  }, []);
  return (
    <>
    {isShow === true &&
    <div className="topnav d-flex justify-content-between">
      <div className="left-nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/project">Project</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>
    </div>
    }
    </>
  );
};

export default Nav;
