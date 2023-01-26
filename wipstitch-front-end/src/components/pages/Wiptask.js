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

export default function Wiptask() {
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
    selectedWiptask,
    setSelectedWiptask,
  } = useContext(UserContext);

  const [completed, setCompleted] = useState(false);
  const [taskName, setTaskName] = useState("");

  useEffect(() => {
    getWiptasks(selectedWip.id);
    setTaskName(selectedWiptask.task_name);
  }, []);
  return (
    <div className="wiptask-page">
      <div className="wiptask-wrapper">
        <div className="wiptask-card">
          <Link to="/wip" className="back-button">
            <FaArrowLeft /> back
          </Link>
          {taskName}
        </div>
      </div>
    </div>
  );
}
