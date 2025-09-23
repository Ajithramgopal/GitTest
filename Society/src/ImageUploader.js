import React, { useState } from "react";
import axios from "axios";

export default function ImageUploader() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = () => {
    if (!image) return alert("Please select an image");

    const formData = new FormData();
    formData.append("image", image);

    axios
      .post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("Upload success:", res.data);
        alert("Image uploaded successfully!");
      })
      .catch((err) => {
        console.error("Upload failed:", err);
      });
  };

  return (
    <div>
      <h2>Image Upload</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && <img src={preview} alt="Preview" width="150" />}
      <br />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
