import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <h4 className="text-center">All Right Reserved &copy; Harsh</h4>
      <p className="text-center mt-3">
        <Link to="/about">About</Link> |<Link to="/contact">Contact</Link> |
        <Link to="/polices">Privacy Police</Link>
      </p>
    </div>
  );
};

export default Footer;
