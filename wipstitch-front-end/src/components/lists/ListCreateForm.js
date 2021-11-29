import React, { useContext, useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";

export default function ListCreateForm({ data, selectedItem, createList }) {
  const [formTitle, setFormTitle] = useState("");
  const [formItems, setFormItems] = useState("");
  const [formPublic, setFormPublic] = useState(true);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!formTitle) {
      alert("please fill all fields");
      return;
    }
    if (!formItems) {
      alert("please fill all fields");
      return;
    }

    createList(formTitle, formItems, formPublic);
  };

  return (
    <div className="list-editor">
      state ? new list or list editor selected item should check for if its
      selecting new list or selecting an id, new list could be id of 0 since the
      lists won't get that new list
      <form className="list-editor-form" onSubmit={onSubmit}>
        <div>
          <input
            type="text"
            placeholder="title..."
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="type your items separated by commas ex: popsicle, ice cream, fudge bar"
            value={formItems}
            onChange={(e) => setFormItems(e.target.value)}
          />
        </div>
        <div>
          <input type="submit" />
          <div className="checkbox">
            {formPublic ? "public" : "private"}
            <div
              className={`check ${formPublic ? "public" : "private"}`}
              onClick={() => {
                setFormPublic(!formPublic);
              }}
            >
              {formPublic ? "" : <FaCheck />}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
