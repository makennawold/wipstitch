import React from "react";
import { Link } from "react-router-dom";

export default function Menu({ menu, setMenu }) {
  return (
    <div className="menu-wrapper">
      {menu ? (
        <div className="menu">
          <div className="links-wrapper">
            <Link to="/" className="link" onClick={() => setMenu(!menu)}>
              Home
            </Link>
            <Link to="/lists" className="link" onClick={() => setMenu(!menu)}>
              Lists
            </Link>
            <Link to="/wips" className="link" onClick={() => setMenu(!menu)}>
              WIPs
            </Link>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
