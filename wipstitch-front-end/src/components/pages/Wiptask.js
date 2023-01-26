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
    getWipTasks,
    wipTasks,
    editWipMode,
    setEditWipMode,
  } = useContext(UserContext);

  const [publicStatus, setPublicStatus] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    getWipTasks(selectedWip.id);
  }, []);
  return <div className="wiptask-wrapper"></div>;
}
