import React, { useEffect, useState } from "react";
import axios from "axios";

export default function FileList() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/files")
      .then((res) => setFiles(res.data))
      .catch((err) => console.error(err));
  }, []);
  console.log("dis", files);

  return (
    <div>
      <h2>Uploaded Files</h2>
      <ul>
        {files.map((file: any) => (
          <li key={file.id}>
            {/* show image if it's an image */}
            {file.file_path.match(/\.(jpg|jpeg|png|gif)$/i) ? (
              <img
                src={`http://localhost:5000/${file.file_path}`}
                alt="uploaded"
                width="150"
              />
            ) : (
              <a
                href={`http://localhost:5000/${file.file_path}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {file.file_path}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
