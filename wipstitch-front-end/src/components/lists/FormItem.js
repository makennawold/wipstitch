import React, { useContext, useState, useEffect } from "react";

import { FaTimes, FaEdit } from "react-icons/fa";

export default function FormItem({ itemValue, updateItems, id, deleteItem }) {
  const [itemData, setItemData] = useState(itemValue);
  return (
    <div className="list-item">
      <FaTimes onClick={() => deleteItem(itemData)} />
      <input
        value={itemData}
        onChange={(e) => {
          setItemData(e.target.value);
          updateItems(e.target.value, id);
        }}
      />
    </div>
  );
}

{
  /* <div className="list-item">
            <FaTimes />
            <input
            value={items[items.indexOf(item)]}
            onChange={(e) =>
                updateItems(e.target.value, items.indexOf(item))
            }
            />
        </div> */
}
