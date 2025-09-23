import React from "react";
import ReactDOM from "react-dom";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div style={overlay}>
      <div style={modal}>
        {children}
        <button onClick={onClose} style={closeBtn}>
          Close
        </button>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modal = {
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  width: "1000px",
};

const closeBtn = {
  marginTop: "10px",
  padding: "5px 10px",
};
