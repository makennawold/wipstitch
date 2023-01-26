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
          className={`wiptask ${item.completed == true ? "completed" : ""}`}
          onClick={() => setSelectedWiptask(item)}
        >
          {console.log(
            item,
            item.task_name,
            item.completed,
            "this is completed"
          )}
          <FaEdit style={{ paddingRight: "10px", marginLeft: "10px" }} />
          {item.task_name}
        </Link>
      );
    });
  };

  const updateWip = async (wip_name, public_status, completed, id) => {
    const data = { wip_name, public_status, completed };
    await fetch(`http://localhost:5000/wip/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "cors",
      },
      body: JSON.stringify(data),
    }).catch((error) => {
      console.log("error is:", error);
    });
    getWipsData(user);
    setEditWipMode("viewWip");
  };

  useEffect(() => {
    getWiptasks(selectedWip.id);
    setPublicStatus(selectedWip.public);
    setCompleted(selectedWip.completed);
    setName(selectedWip.wip_name);
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
            <div className="wip-name">
              {editWipMode == "viewWip" ? (
                <div>{selectedWip.wip_name}</div>
              ) : (
                <div className="name-input">
                  name
                  <input
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {console.log(selectedWip, "selected wip")}
                </div>
              )}
            </div>
            <div className="mode-buttons-wrapper">
              {editWipMode == "viewWip" ? (
                <FaEdit onClick={() => setEditWipMode("editWip")} />
              ) : (
                <Link to="/wips">
                  <FaCheck
                    onClick={() =>
                      updateWip(name, publicStatus, completed, selectedWip.id)
                    }
                  />
                </Link>
              )}

              <Link to="/lists" className="delete-button">
                <FaTrashAlt style={{ color: "black", paddingLeft: "10px" }} />
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
