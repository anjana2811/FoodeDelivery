import React from "react";
import "./Footer.css";

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <span>© {new Date().getFullYear()} Food Zone. All rights reserved.</span>
    </div>
  </footer>
);

export default Footer;
