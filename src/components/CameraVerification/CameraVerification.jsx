import React, { useState, useRef, useEffect } from "react";
import VerificationPreview from "../VerificationPreview/VerificationPreview";

const CameraVerification = () => {
  const [method, setMethod] = useState("camera"); // 'camera' or 'upload'
  const [image, setImage] = useState(null);
  const [cameraAccess, setCameraAccess] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    if (method === "camera") {
      startCamera();
    }
  }, [method]);

  useEffect(() => {
    if (method === "camera" && !showPreview) {
      drawCutouts();
    }
  }, [method, showPreview]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraAccess(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setCameraAccess(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const handleMethodChange = () => {
    setMethod((prev) => {
      if (prev === "camera") {
        stopCamera();
        return "upload";
      }
      startCamera();
      return "camera";
    });
  };

  const capturePhoto = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    
    // Flip the image horizontally
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    
    ctx.drawImage(videoRef.current, 0, 0);
    const imageData = canvas.toDataURL("image/jpeg");
    setImage(imageData);
    stopCamera();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImage(null);
    if (method === "camera") {
      startCamera();
    }
  };

  const shortenFileName = (fileName) => {
    if (fileName.length > 12) {
      const extension = fileName.split(".").pop();
      return `${fileName.substring(0, 8)}....${extension}`;
    }
    return fileName;
  };

  const triggerFileInput = () => {
    document.getElementById("photo-upload").click();
  };

  const canvasRef = useRef(null);

  useEffect(() => {
    drawCutouts();
  }, []);

  const drawCutouts = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const width = (canvas.width = 440); // Same as .video-container width
    const height = (canvas.height = 250); // Same as .video-container height

    // Fill entire canvas with semi-transparent black
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, width, height);

    ctx.globalCompositeOperation = "destination-out";

    // 👉 FACE CUTOUT
    const faceBox = {
      width: 120,
      height: 160,
      topPercent: 45,
      leftPercent: 30,
    };

    const faceX = (faceBox.leftPercent / 100) * width;
    const faceY = (faceBox.topPercent / 100) * height;
    const faceRadiusX = faceBox.width / 2;
    const faceRadiusY = faceBox.height / 2;

    ctx.beginPath();
    ctx.ellipse(faceX, faceY, faceRadiusX, faceRadiusY, 0, 0, Math.PI * 2);
    ctx.fill();

    // 👉 ID CUTOUT
    const idBox = {
      width: 120,
      height: 70,
      topPercent: 60,
      leftPercent: 70,
    };

    const idX = (idBox.leftPercent / 100) * width;
    const idY = (idBox.topPercent / 100) * height;

    ctx.beginPath();
    ctx.rect(
      idX - idBox.width / 2,
      idY - idBox.height / 2,
      idBox.width,
      idBox.height
    );
    ctx.fill();

    // Reset mode
    ctx.globalCompositeOperation = "source-over";
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleRetake = () => {
    setShowPreview(false);
    clearImage();
    // Allow time for the canvas to be ready
    setTimeout(drawCutouts, 0);
  };

  const handleSubmit = () => {
    // Handle submission logic here
    console.log('Submitting verification...');
  };

  if (showPreview && image) {
    return (
      <VerificationPreview
        image={image}
        onRetake={handleRetake}
        onSubmit={handleSubmit}
      />
    );
  }

  return (
    <div className="d-flex justify-content-center w-100">
      <div className="camera-verification-container">
        <div className="d-flex justify-content-between w-100 mb-3">
          {" "}
          <b>Camera Verification</b>
          <button
            className={` d-flex gap-2 align-items-center  ${
              method === "camera" ? "btn-switch-upload" : " btn-switch-camera"
            }`}
            onClick={handleMethodChange}
          >
            {method === "camera" ? (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 15.575C1.45 15.575 0.979333 15.3793 0.588 14.988C0.196666 14.5967 0.000666667 14.1257 0 13.575V11.575C0 11.2917 0.0960001 11.0543 0.288 10.863C0.48 10.6717 0.717333 10.5757 1 10.575C1.28267 10.5743 1.52033 10.6703 1.713 10.863C1.90567 11.0557 2.00133 11.293 2 11.575V13.575H14V11.575C14 11.2917 14.096 11.0543 14.288 10.863C14.48 10.6717 14.7173 10.5757 15 10.575C15.2827 10.5743 15.5203 10.6703 15.713 10.863C15.9057 11.0557 16.0013 11.293 16 11.575V13.575C16 14.125 15.8043 14.596 15.413 14.988C15.0217 15.38 14.5507 15.5757 14 15.575H2ZM7 3.42502L5.125 5.30002C4.925 5.50002 4.68767 5.59601 4.413 5.58801C4.13833 5.58001 3.90067 5.47568 3.7 5.27501C3.51667 5.07502 3.42067 4.84168 3.412 4.57502C3.40333 4.30835 3.49933 4.07502 3.7 3.87502L7.3 0.275015C7.4 0.175015 7.50833 0.104348 7.625 0.0630151C7.74167 0.0216818 7.86667 0.000682051 8 1.53848e-05C8.13333 -0.000651282 8.25833 0.0203484 8.375 0.0630151C8.49167 0.105682 8.6 0.176348 8.7 0.275015L12.3 3.87502C12.5 4.07502 12.596 4.30835 12.588 4.57502C12.58 4.84168 12.484 5.07502 12.3 5.27501C12.1 5.47501 11.8627 5.57935 11.588 5.58801C11.3133 5.59668 11.0757 5.50068 10.875 5.30002L9 3.42502V10.575C9 10.8583 8.904 11.096 8.712 11.288C8.52 11.48 8.28267 11.5757 8 11.575C7.71733 11.5743 7.48 11.4783 7.288 11.287C7.096 11.0957 7 10.8583 7 10.575V3.42502Z"
                    fill="white"
                  />
                </svg>
                Switch to Upload
              </>
            ) : (
              <>
                <svg
                  width="20"
                  height="18"
                  viewBox="0 0 20 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 3.00002H15.72L15.4 2.00002C15.1926 1.41325 14.8077 0.905525 14.2989 0.547183C13.7901 0.18884 13.1824 -0.0023769 12.56 2.23036e-05H7.44C6.81155 0.00119801 6.19933 0.199705 5.68977 0.567528C5.1802 0.93535 4.79901 1.45391 4.6 2.05002L4.28 3.05002H3C2.20435 3.05002 1.44129 3.36609 0.87868 3.9287C0.316071 4.49131 0 5.25437 0 6.05002V14.05C0 14.8457 0.316071 15.6087 0.87868 16.1713C1.44129 16.734 2.20435 17.05 3 17.05H17C17.7956 17.05 18.5587 16.734 19.1213 16.1713C19.6839 15.6087 20 14.8457 20 14.05V6.05002C20.0066 5.65187 19.9339 5.25638 19.7862 4.88661C19.6384 4.51684 19.4184 4.1802 19.1392 3.89631C18.86 3.61241 18.527 3.38695 18.1597 3.23307C17.7924 3.07919 17.3982 2.99997 17 3.00002ZM18 14C18 14.2652 17.8946 14.5196 17.7071 14.7071C17.5196 14.8947 17.2652 15 17 15H3C2.73478 15 2.48043 14.8947 2.29289 14.7071C2.10536 14.5196 2 14.2652 2 14V6.00002C2 5.73481 2.10536 5.48045 2.29289 5.29292C2.48043 5.10538 2.73478 5.00002 3 5.00002H5C5.21807 5.0114 5.43386 4.9511 5.61443 4.82831C5.795 4.70552 5.93042 4.527 6 4.32002L6.54 2.68002C6.60709 2.4814 6.7349 2.30889 6.90537 2.18686C7.07584 2.06484 7.28036 1.99948 7.49 2.00002H12.61C12.8196 1.99948 13.0242 2.06484 13.1946 2.18686C13.3651 2.30889 13.4929 2.4814 13.56 2.68002L14.1 4.32002C14.1642 4.51077 14.2844 4.67771 14.445 4.79903C14.6055 4.92035 14.799 4.9904 15 5.00002H17C17.2652 5.00002 17.5196 5.10538 17.7071 5.29292C17.8946 5.48045 18 5.73481 18 6.00002V14ZM10 5.00002C9.20887 5.00002 8.43552 5.23462 7.77772 5.67414C7.11992 6.11367 6.60723 6.73838 6.30448 7.46929C6.00173 8.20019 5.92252 9.00446 6.07686 9.78038C6.2312 10.5563 6.61216 11.269 7.17157 11.8284C7.73098 12.3879 8.44372 12.7688 9.21964 12.9232C9.99556 13.0775 10.7998 12.9983 11.5307 12.6955C12.2616 12.3928 12.8864 11.8801 13.3259 11.2223C13.7654 10.5645 14 9.79115 14 9.00002C14 7.93916 13.5786 6.92174 12.8284 6.1716C12.0783 5.42145 11.0609 5.00002 10 5.00002ZM10 11C9.60444 11 9.21776 10.8827 8.88886 10.663C8.55996 10.4432 8.30362 10.1308 8.15224 9.76539C8.00087 9.39994 7.96126 8.9978 8.03843 8.60984C8.1156 8.22188 8.30608 7.86551 8.58579 7.58581C8.86549 7.3061 9.22186 7.11562 9.60982 7.03845C9.99778 6.96128 10.3999 7.00089 10.7654 7.15226C11.1308 7.30364 11.4432 7.55998 11.6629 7.88888C11.8827 8.21778 12 8.60446 12 9.00002C12 9.53045 11.7893 10.0392 11.4142 10.4142C11.0391 10.7893 10.5304 11 10 11Z"
                    fill="white"
                  />
                </svg>
                Switch to Camera
              </>
            )}
          </button>
        </div>

        <div className="capture-area d-flex flex-column align-items-center">

          <div className="video-container">
          {!cameraAccess && (
            <div className="camera-request">
              <button onClick={startCamera}>Enable Camera</button>
              <p>Please allow camera access to continue</p>

            </div>
          )}
            <canvas ref={canvasRef} className="cutout-overlay" />

            <video
              ref={videoRef}
              autoPlay
              playsInline
              style={{ display: cameraAccess ? "block" : "none" }}
              onPlay={() => videoRef.current.play()}
            />
            {/* ✅ Overlay frame */}
            <div className="overlay-frame">
              <div className="face-box">
                <span className="label">Position your face here</span>
              </div>
              <div className="id-box">
                <span className="label">Position your ID here</span>
              </div>
              <p className="tip">
                Make sure your face and ID are clearly visible in good lighting
              </p>
            </div>
          </div>
          {cameraAccess && (
            <button 
              className="btn-capture mt-2" 
              onClick={capturePhoto}
              disabled={!!image || method !== 'camera'} // Disable if image exists or method is not camera
            >
              Capture
            </button>
          )}
          <div className="upload-section-container w-100">
            <b>Upload Photo</b>
            <div className="upload-section">
              {image ? (
                <div className="d-flex justify-content-between align-items-center w-100">
                  <div className="front-id-img-container d-flex align-items-center">
                    <img
                      src={image}
                      alt="Uploaded"
                      style={{
                        maxWidth: "50px",
                        maxHeight: "50px",
                      }}
                    />
                    <p className="m-0">
                      File uploaded: {shortenFileName(image.split(',')[1].substring(0, 20))}
                    </p>
                  </div>
                  <button 
                    onClick={triggerFileInput}
                    disabled={method === 'camera'} // Disable if method is camera
                  >
                    Select File
                  </button>
                  <input
                    type="file"
                    id="photo-upload"
                    accept="image/*"
                    onChange={handleFileUpload}
                    style={{ display: "none" }}
                  />
                </div>
              ) : (
                <div className="d-flex justify-content-between w-100">
                  <div className="front-id-img-container d-flex"></div>
                  <button 
                    onClick={triggerFileInput}
                    disabled={method === 'camera'} // Disable if method is camera
                  >
                    Select File
                  </button>
                  <input
                    type="file"
                    id="photo-upload"
                    accept="image/*"
                    onChange={handleFileUpload}
                    style={{ display: "none" }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="preview-section">
          {/* <img src={image} alt="Captured" /> */}
          <div className="preview-controls d-flex gap-3 my-3 w-100 justify-content-center">
            <button 
              className="btn-clear" 
              onClick={clearImage}
              disabled={!image} // Disable if no image
            >
              Clear
            </button>
            <button 
              className="btn-preview"
              onClick={handlePreview}
              disabled={!image} // Disable if no image
            >
              Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraVerification;
