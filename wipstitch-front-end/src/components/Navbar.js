import React, { useContext } from "react";
import { FaSignOutAlt, FaBars, FaUserAlt } from "react-icons/fa";

import { UserContext } from "./context/UserContext";

export default function Navbar({ menu, setMenu }) {
  const { user, logout } = useContext(UserContext);

  return (
    <div className="navbar">
      <FaBars onClick={() => setMenu(!menu)} />
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
