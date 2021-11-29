import React, { useContext } from "react";
import { FaSignOutAlt, FaBars } from "react-icons/fa";

import { UserContext } from "./context/UserContext";

export default function Navbar({ menu, setMenu }) {
  const { user, logout } = useContext(UserContext);

  return (
    <div className="navbar">
      <div className="menu-btn-wrapper">
        <FaBars onClick={() => setMenu(!menu)} />
      </div>
      <div className="wipstitch">wipstitch</div>
      <div className="user-container">
        <div className="username">{user}</div>
        <div className="logout-btn">
          <FaSignOutAlt onClick={logout} />
        </div>
      </div>
    </div>
  );
}
