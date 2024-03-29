import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import {
  FaTrashAlt,
  FaArrowLeft,
  FaRegSquare,
  FaRegCheckSquare,
} from "react-icons/fa";

export default function Wiptask() {
  const {
    getWipsData,
    user,
    selectedWip,
    getWiptasks,
    editWipMode,
    setEditWipMode,
    selectedWiptask,
    databaseURL,
  } = useContext(UserContext);

  const [completed, setCompleted] = useState(false);
  const [taskName, setTaskName] = useState("");

  const updateWiptask = async (task_name, completed, id) => {
    const data = { task_name, completed };
    await fetch(`${databaseURL}wiptask/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "cors",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        getWipsData(user);
        setEditWipMode("viewWip");
      })
      .catch((error) => {
        console.log("error is:", error);
      });
  };

  const createWiptask = async (task_name, completed, wip_id) => {
    const data = { task_name, completed, wip_id };
    await fetch(`${databaseURL}wiptask`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "cors",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        getWipsData(user);
        setEditWipMode("viewWip");
      })
      .catch((error) => {
        console.log("error is:", error);
      });
  };

  const deleteWiptask = async (id) => {
    await fetch(`${databaseURL}wiptask/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "cors",
      },
    })
      .then((response) => {
        getWipsData(user);
        setEditWipMode("viewWip");
      })
      .catch((error) => {
        console.log("error is:", error);
      });
  };

  useEffect(() => {
    getWiptasks(selectedWip.id);
    if (editWipMode == "newWip") {
      setCompleted(false);
    } else {
      setTaskName(selectedWiptask.task_name);
      setCompleted(selectedWiptask.completed);
    }
  }, []);
  return (
    <div className="wiptask-page">
      <div className="wiptask-wrapper">
        <div className="wiptask-card">
          <Link
            to="/wip"
            className="back-button"
            onClick={() => setEditWipMode("viewWip")}
          >
            <FaArrowLeft /> back
          </Link>
          <div className="name-wrapper">
            <div className="task-name-input">
              task name
              <input
                placeholder="title"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </div>
            {editWipMode == "newWip" ? null : (
              <Link to="/wip" onClick={() => deleteWiptask(selectedWiptask.id)}>
                <FaTrashAlt style={{ color: "black" }} />
              </Link>
            )}
          </div>
          <div className="completed-buttons-wrapper">
            <div className="box">
              {completed ? (
                <div className="completed-wrapper">
                  <FaRegCheckSquare onClick={() => setCompleted(!completed)} />
                  completed
                </div>
              ) : (
                <div className="completed-wrapper">
                  <FaRegSquare onClick={() => setCompleted(!completed)} />
                  not completed
                </div>
              )}
            </div>
          </div>
          <div className="wiptask-button-wrapper">
            {editWipMode == "newWip" ? (
              <Link
                to="/wip"
                className="submit-button"
                onClick={() =>
                  createWiptask(taskName, completed, selectedWip.id)
                }
              >
                submit
              </Link>
            ) : (
              <Link
                to="/wip"
                className="submit-button"
                onClick={() =>
                  updateWiptask(taskName, completed, selectedWiptask.id)
                }
              >
                submit
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
