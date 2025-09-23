import React, { useState } from "react";
import Modal from "./Modal";

export default function SomeComponent() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Show Modal</button>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <h2>Global Modal</h2>
        <div>
          <form>
            <label>name</label>
            <input type="text" />
            <br></br>
            <label>date</label>
            <input type="date" />
          </form>
        </div>
        <p>This modal works anywhere in your app.</p>
      </Modal>
    </>
  );
}
