import React from "react";
import { useDrag, useDrop } from "react-dnd";

const Image = ({
  id,
  src,
  index,
  onDrop,
  isSelected,
  onToggleImageSelection,
}) => {
  const [, drag] = useDrag({
    type: "IMAGE",
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: "IMAGE",
    hover: (item) => {
      if (item.index !== index) {
        onDrop(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <label className="form-label m-0 p-0" ref={(node) => drag(drop(node))}>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onToggleImageSelection(id)}
        className="absolute top-2 left-2 cursor-pointer"
      />
      <img src={src} className="img-fluid" alt={`Image ${id}`} />
    </label>
  );
};

export default Image;
