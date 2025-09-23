import React, { useRef, useEffect, useState } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";

export default function ObjectDetection() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const captureCanvasRef = useRef(null); // for saving frames
  const [savedImages, setSavedImages] = useState([]);

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Error accessing webcam: ", err);
      }
    };

    const runDetection = async () => {
      const model = await cocoSsd.load(); // load pretrained model
      console.log("Model loaded ✅");

      setInterval(async () => {
        if (videoRef.current) {
          const predictions = await model.detect(videoRef.current);

          // Draw predictions
          const ctx = canvasRef.current.getContext("2d");
          ctx.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          );

          predictions.forEach((p) => {
            ctx.strokeStyle = "red";
            ctx.lineWidth = 2;
            ctx.strokeRect(...p.bbox);

            ctx.fillStyle = "red";
            ctx.font = "16px Arial";
            ctx.fillText(
              `${p.class} (${Math.round(p.score * 100)}%)`,
              p.bbox[0],
              p.bbox[1] > 20 ? p.bbox[1] - 5 : 20
            );
          });
        }
      }, 300); // detect every 300ms
    };

    startVideo();
    runDetection();
  }, []);

  // 📌 Function to capture frame & save image
  const captureImage = () => {
    const captureCanvas = captureCanvasRef.current;
    const ctx = captureCanvas.getContext("2d");

    // Draw current video frame to canvas
    ctx.drawImage(
      videoRef.current,
      0,
      0,
      captureCanvas.width,
      captureCanvas.height
    );

    // Convert to base64 image
    const imageUrl = captureCanvas.toDataURL("image/png");

    // Save to state (or send to backend)
    setSavedImages((prev) => [...prev, imageUrl]);
  };

  return (
    <div>
      <div style={{ position: "relative" }}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          width="640"
          height="480"
          style={{ position: "absolute" }}
        />
        <canvas
          ref={canvasRef}
          width="640"
          height="480"
          style={{ position: "absolute" }}
        />
      </div>

      {/* Controls */}
      <div style={{ display: "flex", marginTop: "10px" }}>
        <button onClick={captureImage}>📸 Capture Frame</button>
        {/* Hidden canvas for capture */}
        <canvas
          ref={captureCanvasRef}
          width="640"
          height="480"
          style={{ display: "none" }}
        />
      </div>

      {/* Show saved images */}
      <div style={{ marginTop: "20px" }}>
        <h3>Saved Frames</h3>
        {savedImages.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`capture-${i}`}
            width="200"
            style={{ margin: "5px" }}
          />
        ))}
      </div>
    </div>
  );
}
