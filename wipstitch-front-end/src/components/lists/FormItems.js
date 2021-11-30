import React, { useEffect, useState, useLayoutEffect } from "react";

import FormItem from "./FormItem";

export default function FormItems({
  items,
  deleteItem,
  editorMode,
  updateItems,
}) {
  const [upItems, setUpItems] = useState([]);

  const getItems = () => {
    console.log("this is getItems", items);
  };

  useEffect(() => {
    //   setUpItems(items);
    console.log("formitems firing");
  }, [items]);

  const formItems = () => {
    // const itemList = items.split(", ");
    return items.map((item) => {
      return (
        <div className="list-item-wrapper" key={items.indexOf(item)}>
          {editorMode === "edit" ? (
            <FormItem
              itemValue={item}
              updateItems={updateItems}
              id={items.indexOf(item)}
              deleteItem={deleteItem}
            />
          ) : (
            <div className="list-item">
              <span className="circle" />
              <div>{item}</div>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="form-items">
      <div>{items}</div>
      {formItems()}
    </div>
  );
}
