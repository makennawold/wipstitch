import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

export default function Wips() {
  const {
    user,
    listsData,
    setListsData,
    selectedItem,
    setSelectedItem,
    mode,
    setMode,
    changeSelectedItem,
  } = useContext(UserContext);
  return (
    <div>
      <div>hey from WIPs</div>
    </div>
  );
}
