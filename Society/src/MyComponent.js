import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MyComponent() {
  const handleClick = () => {
    toast.success('xx');
  };

  return (
    <div>
      <button onClick={handleClick}>Show Toast</button>
      <ToastContainer />
    </div>
  );
}
