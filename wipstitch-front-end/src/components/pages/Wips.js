import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";

export default function Wips() {
  const {
    wipsData,
    getWipsData,
    user,
    selectedWip,
    setSelectedWip,
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
    <div>
      <div>hey from WIPs</div>
      {createWips()}
      {selectedWip.wip_name}
    </div>
  );
}
