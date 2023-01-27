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
      return (
        <Link
          to="/wip"
          key={item.id}
          className={`wip ${item.id === setSelectedWip ? "selected" : ""}`}
          onClick={() => setSelectedWip(item)}
        >
          {item.wip_name}
        </Link>
      );
    });
  };

  useEffect(() => {
    getWipsData(user);
    setEditWipMode("viewWip");
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
          <div className="wips-grid">{createWips()}</div>
        )}
      </div>
    </div>
  );
}
