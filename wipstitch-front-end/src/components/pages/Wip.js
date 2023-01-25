import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";

export default function Wip() {
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

  const createWipTasks = () => {
    return wipTasks.map((item) => {
      // console.log("mapping", item);
      return <div>{item.task_name}</div>;
    });
  };

  useEffect(() => {
    getWipTasks(selectedWip.id);
  }, []);
  return (
    <div className="wip-wrapper">
      <div>hey from WIP</div>
      {selectedWip.wip_name}
      {createWipTasks()}
    </div>
  );
}
