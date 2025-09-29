import React from "react";

export default function ImageUploader({
  images = [],
  onChange,
  label = "Upload Images",
  multiple = true,
}) {
  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    onChange(multiple ? [...images, ...files] : files.slice(0, 1));
  };

  // Remove selected image
  const handleRemove = (index) => {
    const updated = images.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={handleFileChange}
      />

      {/* Preview Images */}
      {images && images.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "10px",
            flexWrap: "wrap",
          }}
        >
          {images.map((file, index) => (
            <div
              key={index}
              style={{ position: "relative", display: "inline-block" }}
            >
              <img
                src={URL.createObjectURL(file)}
                alt={`preview-${index}`}
                width="40"
                height="40"
                style={{ objectFit: "cover", borderRadius: "8px" }}
              />
              <button
                type="button"
                onClick={() => handleRemove(index)}
                style={{
                  position: "absolute",
                  top: "-6px",
                  right: "-6px",
                  background: "transparent", // no background
                  border: "none", // no border
                  color: "red", // X color
                  fontSize: "18px", // bigger X
                  cursor: "pointer", // pointer cursor
                  lineHeight: "1",
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
