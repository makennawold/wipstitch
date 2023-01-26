import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import {
  FaCheck,
  FaEdit,
  FaTimes,
  FaPlusCircle,
  FaTrashAlt,
  FaArrowLeft,
  FaPlus,
} from "react-icons/fa";
import NewWip from "../wips/NewWip";

export default function Wip() {
  const {
    wipsData,
    getWipsData,
    user,
    selectedWip,
    setSelectedWip,
    getWiptasks,
    wiptasks,
    editWipMode,
    setEditWipMode,
    setSelectedWiptask,
  } = useContext(UserContext);

  const [publicStatus, setPublicStatus] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [name, setName] = useState("");

  const createWiptasks = () => {
    return wiptasks.map((item) => {
      return (
        <Link
          to="/wiptask"
          key={item}
          className="wiptask"
          onClick={() => setSelectedWiptask(item)}
        >
          <FaEdit style={{ paddingRight: "10px" }} />
          {item.task_name}
        </Link>
      );
    });
  };

  useEffect(() => {
    getWiptasks(selectedWip.id);
  }, []);
  return (
    <div className="wip-wrapper">
      {editWipMode == "newWip" ? (
        <NewWip />
      ) : (
        <div className="wip-card">
          <Link to="/wips" className="back-button">
            <FaArrowLeft /> back
          </Link>
          <div className="wip-name-wrapper">
            <div className="wip-name">{selectedWip.wip_name}</div>
            <div className="mode-buttons-wrapper">
              {editWipMode == "viewWip" ? (
                <FaEdit onClick={() => setEditWipMode("editWip")} />
              ) : (
                <FaCheck onClick={() => setEditWipMode("viewWip")} />
              )}

              <Link to="/lists" className="delete-button">
                <FaTrashAlt style={{ color: "black" }} />
              </Link>
            </div>
          </div>
          <div className="wiptasks-wrapper">
            {wiptasks.length == 0 ? (
              <div>try making some wip tasks!</div>
            ) : (
              createWiptasks()
            )}
            <Link
              to="/wiptask"
              className="new-wiptask-button"
              onClick={() => setEditWipMode("newWip")}
            >
              <FaPlusCircle />
              <div>new task</div>
            </Link>
          </div>
          {console.log(wiptasks, "wiptasks are")}
        </div>
      )}
    </div>
  );
}
