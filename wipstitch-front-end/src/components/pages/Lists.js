import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { FaCheck, FaEdit, FaTimes, FaPlusCircle } from "react-icons/fa";

import ReactiveCarousel from "../Carousel";

import useWindowDimensions from "../WindowDimensions";

export default function Lists() {
  const {
    user,
    listsData,
    setListsData,
    selectedItem,
    setSelectedItem,
    mode,
    setMode,
  } = useContext(UserContext);

  const [editMode, setEditMode] = useState("viewList");
  //viewList, editList, newList

  return (
    <div className="list-wrapper">
      <ReactiveCarousel itemClassName="carousel-item" data={listsData} />
      <div className="card-wrapper">
        {editMode == "viewList" ? <div>view list card</div> : null}
        {editMode == "editList" ? <div>edit list card</div> : null}
        {editMode == "newList" ? <div>new list card</div> : null}
      </div>

      <div className="card">
        <div className="title-wrapper">
          list title
          {editMode == "viewList" ? (
            <FaEdit onClick={() => setEditMode("editList")} />
          ) : (
            <FaCheck onClick={() => setEditMode("viewList")} />
          )}
        </div>
        <div>items</div>
      </div>
      <div className="new-list-card">
        <div className="input-wrapper">
          <div>title input</div>
          <div>items input</div>
        </div>
        <div className="button-wrapper">
          <div>submit button</div>
          <div>private slider</div>
        </div>
      </div>

      <div>welcome to lists</div>
    </div>
  );
}
