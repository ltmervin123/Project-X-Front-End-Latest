import React, { useState, useRef, useEffect } from "react";
import VerificationPreview from "../VerificationPreview/VerificationPreview";

const TRANSLATIONS = {
  English: {
    cameraVerification: "Camera Verification",
    switchToUpload: "Switch to Upload",
    switchToCamera: "Switch to Camera",
    enableCamera: "Enable Camera",
    allowCameraAccess: "Please allow camera access to continue",
    positionFace: "Position your face here",
    positionId: "Position your ID here",
    lightingTip:
      "Make sure your face and ID are clearly visible in good lighting",
    capture: "Capture",
    uploadPhoto: "Upload Photo",
    fileUploaded: "File uploaded: ",
    selectFile: "Select File",
    clear: "Clear",
    preview: "Preview",
    initializing: "Initializing camera...",
    loading: "Loading...",
    tryAgain: "Try Again",
    filePreviewAlt: "Uploaded",
    errors: {
      cameraPermissionDenied: "Camera permission denied. Please allow camera access.",
      noCameraFound: "No camera found on this device.",
      cameraInUse: "Camera is in use by another application. Please close other applications that might be using the camera.",
      videoError: "Error playing video stream",
      captureNotAvailable: "Camera not available for capture",
      captureFailed: "Failed to capture photo",
      videoNotAvailable: "Video element not available",
      genericError: "Cannot access camera: "
    }
  },
  Japanese: {
    cameraVerification: "カメラ認証",
    switchToUpload: "アップロードに切り替え",
    switchToCamera: "カメラに切り替え",
    enableCamera: "カメラを有効にする",
    allowCameraAccess: "続行するにはカメラへのアクセスを許可してください",
    positionFace: "ここに顔を配置してください",
    positionId: "ここにIDを配置してください",
    lightingTip: "顔とIDが十分な明るさで明確に見えることを確認してください",
    capture: "撮影",
    uploadPhoto: "写真をアップロード",
    fileUploaded: "アップロードされたファイル: ",
    selectFile: "ファイルを選択",
    clear: "クリア",
    preview: "プレビュー",
    initializing: "カメラを初期化中...",
    loading: "読み込み中...",
    tryAgain: "再試行",
    filePreviewAlt: "アップロード済み",
    errors: {
      cameraPermissionDenied: "カメラのアクセス許可が拒否されました。カメラへのアクセスを許可してください。",
      noCameraFound: "このデバイスにカメラが見つかりません。",
      cameraInUse: "カメラは他のアプリケーションで使用中です。カメラを使用している他のアプリケーションを閉じてください。",
      videoError: "ビデオストリームの再生エラー",
      captureNotAvailable: "カメラが撮影できません",
      captureFailed: "写真の撮影に失敗しました",
      videoNotAvailable: "ビデオ要素が利用できません",
      genericError: "カメラにアクセスできません: "
    }
  },
};

const CameraVerification = ({ setSelfie, submitIdUpload, submitting }) => {
  const [method, setMethod] = useState("camera");
  const [image, setImage] = useState(null);
  const [cameraAccess, setCameraAccess] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const canvasRef = useRef(null);

  const language = sessionStorage.getItem("preferred-language") || "English";

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  useEffect(() => {
    if (method === "camera") {
      startCamera();
    } else {
      stopCamera();
    }
  }, [method]);

  useEffect(() => {
    if (method === "camera" && !showPreview && cameraAccess) {
      drawCutouts();
    }
  }, [method, showPreview, cameraAccess]);

  const startCamera = async () => {
    setCameraError(null);
    setIsInitializing(true);

    try {
      stopCamera();

      const constraints = {
        video: {
          width: { ideal: 1280, min: 640 },
          height: { ideal: 720, min: 480 },
          facingMode: "user",
        },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;

        videoRef.current.onloadedmetadata = () => {
          setCameraAccess(true);
          setIsInitializing(false);
        };

        videoRef.current.onerror = (err) => {
          console.error("Video element error:", err);
          setCameraError(TRANSLATIONS[language].errors.videoError);
          setCameraAccess(false);
          setIsInitializing(false);
          stopCamera();
        };
      } else {
        throw new Error(TRANSLATIONS[language].errors.videoNotAvailable);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);

      if (err.name === "NotAllowedError") {
        setCameraError(TRANSLATIONS[language].errors.cameraPermissionDenied);
      } else if (err.name === "NotFoundError") {
        setCameraError(TRANSLATIONS[language].errors.noCameraFound);
      } else if (err.name === "NotReadableError") {
        setCameraError(TRANSLATIONS[language].errors.cameraInUse);
        setTimeout(() => {
          startCamera();
        }, 2000);
      } else {
        setCameraError(`${TRANSLATIONS[language].errors.genericError}${err.message}`);
      }

      setCameraAccess(false);
      setIsInitializing(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const handleMethodChange = () => {
    setMethod((prev) => {
      if (prev === "camera") {
        stopCamera();
        return "upload";
      }
      return "camera";
    });
  };

  const capturePhoto = () => {
    if (!videoRef.current || !streamRef.current) {
      setCameraError(TRANSLATIONS[language].errors.captureNotAvailable);
      return;
    }

    try {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");

      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);

      ctx.drawImage(videoRef.current, 0, 0);
      const imageData = canvas.toDataURL("image/png");
      setImage(imageData);
      stopCamera();
    } catch (err) {
      console.error("Error capturing photo:", err);
      setCameraError(TRANSLATIONS[language].errors.captureFailed);
    }
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
      setCameraError(null);
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

  useEffect(() => {
    drawCutouts();
  }, []);

  const drawCutouts = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
  
    const width = (canvas.width = 500);
    const height = (canvas.height = 280);  // Changed from 290 to 280
  
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, width, height);
  
    ctx.globalCompositeOperation = "destination-out";
  
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
  
    // Draw face ellipse
    ctx.beginPath();
    ctx.ellipse(faceX, faceY, faceRadiusX, faceRadiusY, 0, 0, Math.PI * 2);
    ctx.fill();
  
    const idBox = {
      width: 120,
      height: 70,
      topPercent: 60,
      leftPercent: 70,
    };
  
    const idX = (idBox.leftPercent / 100) * width;
    const idY = (idBox.topPercent / 100) * height;
    const radius = 10; // Border radius value
  
    // Draw ID box with rounded corners
    ctx.beginPath();
    ctx.moveTo(idX - idBox.width / 2 + radius, idY - idBox.height / 2);
    ctx.lineTo(idX + idBox.width / 2 - radius, idY - idBox.height / 2);
    ctx.arcTo(idX + idBox.width / 2, idY - idBox.height / 2, idX + idBox.width / 2, idY - idBox.height / 2 + radius, radius);
    ctx.lineTo(idX + idBox.width / 2, idY + idBox.height / 2 - radius);
    ctx.arcTo(idX + idBox.width / 2, idY + idBox.height / 2, idX + idBox.width / 2 - radius, idY + idBox.height / 2, radius);
    ctx.lineTo(idX - idBox.width / 2 + radius, idY + idBox.height / 2);
    ctx.arcTo(idX - idBox.width / 2, idY + idBox.height / 2, idX - idBox.width / 2, idY + idBox.height / 2 - radius, radius);
    ctx.lineTo(idX - idBox.width / 2, idY - idBox.height / 2 + radius);
    ctx.arcTo(idX - idBox.width / 2, idY - idBox.height / 2, idX - idBox.width / 2 + radius, idY - idBox.height / 2, radius);
    ctx.closePath();
    ctx.fill();
  
    ctx.globalCompositeOperation = "source-over";
  };

  const handlePreview = () => {
    setSelfie(image);
    setShowPreview(true);
  };

  const handleRetake = () => {
    setShowPreview(false);
    clearImage();
    setTimeout(drawCutouts, 0);
  };

  const handleSubmit = () => {
    submitIdUpload();
  };

  const renderCameraView = () => {
    if (isInitializing) {
      return (
        <div
          className="camera-initializing d-flex flex-column align-items-center justify-content-center"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10,
            background: "rgb(0, 0, 0)",
          }}
        >
          <div
            className="spinner-border text-primary mb-3"
            role="status"
            style={{ width: "5rem", height: "5rem" }}
          >
            <span className="visually-hidden">{TRANSLATIONS[language].loading}</span>
          </div>
          <p className="text-center text-white">{TRANSLATIONS[language].initializing}</p>
        </div>
      );
    }

    if (cameraError) {
      return (
        <div
          className="camera-error d-flex flex-column align-items-center justify-content-center"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgb(0, 0, 0)",
            zIndex: 10,
          }}
        >
          <svg
            width="48"
            height="44"
            viewBox="0 0 48 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M32.883 35.0949C33.737 34.1819 34.2845 33.0251 34.449 31.7859L43.779 35.9319C44.2357 36.1354 44.736 36.2215 45.2344 36.1824C45.7328 36.1434 46.2136 35.9803 46.633 35.7082C47.0524 35.436 47.3972 35.0634 47.6359 34.6241C47.8746 34.1848 47.9998 33.6928 48 33.1929V10.8069C47.9996 10.3073 47.8744 9.81575 47.6358 9.37683C47.3972 8.93791 47.0528 8.56551 46.6338 8.29343C46.2148 8.02136 45.7345 7.85823 45.2365 7.81884C44.7385 7.77945 44.2385 7.86506 43.782 8.06788L34.449 12.2139C34.2584 10.7711 33.5499 9.44687 32.4554 8.48767C31.361 7.52846 29.9553 6.99971 28.5 6.99988H12.816L32.883 35.0949ZM2.541 8.09488C1.75549 8.6491 1.11464 9.38395 0.672438 10.2376C0.230233 11.0912 -0.000386739 12.0385 4.86828e-07 12.9999V30.9999C4.86828e-07 32.5912 0.632142 34.1173 1.75736 35.2425C2.88258 36.3677 4.4087 36.9999 6 36.9999H23.184L2.541 8.09488ZM31.779 43.8699L1.779 1.86988L4.221 0.129883L34.221 42.1299L31.779 43.8699Z"
              fill="white"
            />
          </svg>

          <p className=" text-center my-3 px-4">{cameraError}</p>
          <button
            className=" px-3 py-1"
            style={{
              fontSize: "0.9rem",
              width: "auto",
              minWidth: "100px",
              maxWidth: "150px",
            }}
            onClick={() => {
              setCameraError(null);
              startCamera();
            }}
          >
            {TRANSLATIONS[language].tryAgain}
          </button>
        </div>
      );
    }

    if (!cameraAccess) {
      return (
        <div
          className="camera-request d-flex flex-column align-items-center justify-content-center"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgb(0, 0, 0)",
            zIndex: 10,
          }}
        >
          <button
            className="px-3 py-1"
            style={{
              fontSize: "0.9rem",
              width: "auto",
              minWidth: "100px",
              maxWidth: "150px",
            }}
            onClick={startCamera}
          >
            {TRANSLATIONS[language].enableCamera}
          </button>
          <p className="text-center text-white px-4">
            {TRANSLATIONS[language].allowCameraAccess}
          </p>
        </div>
      );
    }

    return null;
  };

  if (showPreview && image) {
    return (
      <VerificationPreview
        image={image}
        onRetake={handleRetake}
        onSubmit={handleSubmit}
        submitting={submitting}
      />
    );
  }

  return (
    <div className="d-flex justify-content-center w-100">

      <div className="camera-verification-container">
        <div className="d-flex justify-content-between w-100 mb-3">
          <b>{TRANSLATIONS[language].cameraVerification}</b>
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
                {TRANSLATIONS[language].switchToUpload}
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
                {TRANSLATIONS[language].switchToUpload}
              </>
            )}
          </button>
        </div>

        <div className="capture-area d-flex flex-column align-items-center">
          <div className="video-container">
          {renderCameraView()}
            <canvas ref={canvasRef} className="cutout-overlay" />

            <video
              ref={videoRef}
              autoPlay
              playsInline
              style={{ display: cameraAccess ? "block" : "none" }}
              onPlay={() => videoRef.current.play()}
            />

            <div className="overlay-frame">
              <div className="face-box">
                <span className="label">
                  {TRANSLATIONS[language].positionFace}
                </span>
              </div>
              <div className="id-box">
                <span className="label">
                  {TRANSLATIONS[language].positionId}
                </span>
              </div>
              <p className="tip">{TRANSLATIONS[language].lightingTip}</p>
            </div>
            {cameraAccess && (
              <button
                className="btn-capture mt-2"
                onClick={capturePhoto}
                disabled={!!image || method !== "camera"}
              >
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 31C25.1797 31 31 25.1797 31 18C31 10.8203 25.1797 5 18 5C10.8203 5 5 10.8203 5 18C5 25.1797 10.8203 31 18 31Z"
                    fill="white"
                  />
                  <path
                    d="M18 36C14.4399 36 10.9598 34.9443 7.99974 32.9665C5.03966 30.9886 2.73255 28.1774 1.37018 24.8883C0.00779915 21.5992 -0.348661 17.98 0.345873 14.4884C1.04041 10.9967 2.75474 7.78943 5.27208 5.27208C7.78943 2.75474 10.9967 1.04041 14.4884 0.345873C17.98 -0.348661 21.5992 0.00779915 24.8883 1.37018C28.1774 2.73255 30.9886 5.03966 32.9665 7.99974C34.9443 10.9598 36 14.4399 36 18C35.9946 22.7722 34.0964 27.3474 30.7219 30.7219C27.3474 34.0964 22.7722 35.9946 18 36ZM18 2.57144C14.9485 2.57144 11.9656 3.47631 9.42835 5.17162C6.89114 6.86693 4.91362 9.27654 3.74587 12.0957C2.57811 14.9149 2.27258 18.0171 2.86789 21.01C3.46321 24.0028 4.93263 26.7519 7.09036 28.9096C9.24808 31.0674 11.9972 32.5368 14.99 33.1321C17.9829 33.7274 21.0851 33.4219 23.9043 32.2541C26.7235 31.0864 29.1331 29.1089 30.8284 26.5717C32.5237 24.0344 33.4286 21.0515 33.4286 18C33.4238 13.9096 31.7968 9.98801 28.9044 7.09562C26.012 4.20323 22.0905 2.5762 18 2.57144Z"
                    fill="white"
                  />
                </svg>


              </button>
            )}
          </div>

          <div className="upload-section-container w-100 mt-3">
            <b>{TRANSLATIONS[language].uploadPhoto}</b>
            <div className="upload-section">
              {image ? (
                <div className="d-flex justify-content-between align-items-center w-100">
                  <div className="front-id-img-container d-flex align-items-center">
                    <img
                      src={image}
                      alt={TRANSLATIONS[language].filePreviewAlt}
                      style={{
                        maxWidth: "50px",
                        maxHeight: "50px",
                      }}
                    />
                    <p className="m-0">
                      {TRANSLATIONS[language].fileUploaded}
                      {shortenFileName(image.split(",")[1].substring(0, 20))}
                    </p>
                  </div>
                  <button
                    onClick={triggerFileInput}
                    disabled={method === "camera"}
                  >
                    {TRANSLATIONS[language].selectFile}
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
                    disabled={method === "camera"}
                  >
                    {TRANSLATIONS[language].selectFile}
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
          <div className="preview-controls d-flex gap-3 my-3 w-100 justify-content-center">
            <button
              className="btn-clear"
              onClick={clearImage}
              disabled={!image}
            >
              {TRANSLATIONS[language].clear}
            </button>
            <button
              className="btn-preview"
              onClick={handlePreview}
              disabled={!image}
            >
              {TRANSLATIONS[language].preview}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraVerification;
