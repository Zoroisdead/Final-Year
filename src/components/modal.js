import React from 'react';

const Modal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="modal">
      <div className="modalview">
        <h2>Are you sure you want to decline and delete this rental request?</h2>
        <button onClick={onConfirm} className="btn danger">Yes, Delete</button>
        <button onClick={onClose} className="btn cancel">Cancel</button>
      </div>
    </div>
  );
};

export default Modal;
