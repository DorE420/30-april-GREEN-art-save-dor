import React from "react";

const DeletePopup = ({ show, onClose, onDelete }) => {
  if (!show) return null;

  return (
    <div className="delete-confirm-popup">
      <div className="delete-confirm-popup-content">
        <h3> האם אתה בטוח שאתה רוצה למחוק רכב זה </h3>
        <button onClick={onDelete}>כן</button>
        <button onClick={onClose}>לא</button>
      </div>
    </div>
  );
};

export default DeletePopup;
