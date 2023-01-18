import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { FaPlusCircle } from "react-icons/fa";

import ReactiveCarousel from "../Carousel";
import ListEditorForm from "../lists/ListEditorForm";
import ListCreateForm from "../lists/ListCreateForm";

import useWindowDimensions from "../WindowDimensions";

export default function Lists() {
  //get props for selectLists functions/update
  return (
    <div className="list-wrapper">
      <div className="carousel-wrapper">carousel goes here</div>
      <div className="list-card">
        <div className="title-wrapper">
          list title
          <div>icon</div>
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
