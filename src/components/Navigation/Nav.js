import React from "react";
import { NavLink } from "react-router-dom";
import "./Nav.scss"; // Import your CSS file for styling (optional)

const Nav = () => {
  return (
    <div className="topnav d-flex justify-content-between">
      <div className="left-nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/news">News</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>
    </div>
  );
};

export default Nav;
