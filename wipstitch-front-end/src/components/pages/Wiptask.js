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
  FaRegSquare,
  FaRegCheckSquare,
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

  const updateWiptask = async (task_name, complete, id) => {
    const data = { task_name, completed };
    await fetch(`http://localhost:5000/wiptask/${id}`, {
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
    setTaskName(selectedWiptask.task_name);
    setCompleted(selectedWiptask.completed);
  }, []);
  return (
    <div className="wiptask-page">
      <div className="wiptask-wrapper">
        <div className="wiptask-card">
          <Link to="/wip" className="back-button">
            <FaArrowLeft /> back
          </Link>
          <div className="task-name-input">
            task name
            <input
              placeholder="separate your items by commas"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </div>
          <div className="completed-buttons-wrapper">
            <div className="box">
              {completed ? (
                <div>
                  <FaRegCheckSquare onClick={() => setCompleted(!completed)} />
                  completed
                </div>
              ) : (
                <div>
                  <FaRegSquare onClick={() => setCompleted(!completed)} />
                  not completed
                </div>
              )}
            </div>
          </div>
          <Link
            to="/wip"
            className="submit-button"
            onClick={() =>
              updateWiptask(taskName, completed, selectedWiptask.id)
            }
          >
            submit
          </Link>
        </div>
      </div>
    </div>
  );
}
