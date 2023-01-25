import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

import { FaPlus } from "react-icons/fa";

export default function Wips() {
  const {
    wipsData,
    getWipsData,
    user,
    selectedWip,
    setSelectedWip,
    setEditWipMode,
  } = useContext(UserContext);

  const createWips = () => {
    return wipsData.map((item) => {
      // console.log("mapping", item);
      return <div onClick={() => setSelectedWip(item)}>{item.wip_name}</div>;
    });
  };

  useEffect(() => {
    getWipsData(user);
  }, []);
  return (
    <div className="wips-page">
      <div className="wips-wrapper">
        <div className="title-card">
          <div className="page-title">my wips</div>
          <Link
            to="/wip"
            className="new-wips-button"
            onClick={() => setEditWipMode("newWip")}
          >
            <FaPlus /> new wip
          </Link>
        </div>
        {wipsData.length == 0 ? (
          <div style={{ paddingTop: "50px" }}>try making a wip!</div>
        ) : (
          createWips()
        )}

        {selectedWip.wip_name}
      </div>
    </div>
  );
}
