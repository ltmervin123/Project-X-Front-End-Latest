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
      cameraPermissionDenied:
        "Camera permission denied. Please allow camera access.",
      noCameraFound: "No camera found on this device.",
      cameraInUse:
        "Camera is in use by another application. Please close other applications that might be using the camera.",
      videoError: "Error playing video stream",
      captureNotAvailable: "Camera not available for capture",
      captureFailed: "Failed to capture photo",
      videoNotAvailable: "Video element not available",
      genericError: "Cannot access camera: ",
    },
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
      cameraPermissionDenied:
        "カメラのアクセス許可が拒否されました。カメラへのアクセスを許可してください。",
      noCameraFound: "このデバイスにカメラが見つかりません。",
      cameraInUse:
        "カメラは他のアプリケーションで使用中です。カメラを使用している他のアプリケーションを閉じてください。",
      videoError: "ビデオストリームの再生エラー",
      captureNotAvailable: "カメラが撮影できません",
      captureFailed: "写真の撮影に失敗しました",
      videoNotAvailable: "ビデオ要素が利用できません",
      genericError: "カメラにアクセスできません: ",
    },
  },
};

const CameraVerification = React.forwardRef(
  (
    {
      setSelfie,
      submitIdUpload,
      submitting,
      setIsInitializing,
      setCameraError,
      isInitializing,
      cameraError,
      setSelfieImage,
      setIsRetry,
      isRetry,
      handleImageCapture,
    },
    ref
  ) => {
    const [method, setMethod] = useState("camera");
    const [image, setImage] = useState(null);
    const [cameraAccess, setCameraAccess] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const canvasRef = useRef(null);

    const language = sessionStorage.getItem("selectedLanguage") || "English";

    useEffect(() => {
      return () => {
        stopCamera();
        setSelfieImage(null);
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

    //Runs when the component mounts and when the isRetry prop changes
    useEffect(() => {
      if (isRetry) {
        handleRetake();
      }
    }, [isRetry]);

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
          setCameraError(
            `${TRANSLATIONS[language].errors.genericError}${err.message}`
          );
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
        setSelfie(imageData);
        setSelfieImage(imageData);
        setIsRetry(false);
        handleImageCapture(imageData);
        stopCamera();
      } catch (err) {
        console.error("Error capturing photo:", err);
        setCameraError(TRANSLATIONS[language].errors.captureFailed);
      }
    };

    const clearImage = () => {
      setImage(null);
      if (method === "camera") {
        setCameraError(null);
        startCamera();
      }
    };

    React.useImperativeHandle(
      ref,
      () => ({
        clearImage: () => {
          setImage(null);
          if (method === "camera") {
            setCameraError(null);
            startCamera();
          }
        },
      }),
      [method]
    );

    const drawCutouts = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");

      const width = (canvas.width = 600);
      const height = (canvas.height = 340); // Changed from 290 to 280

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
      ctx.arcTo(
        idX + idBox.width / 2,
        idY - idBox.height / 2,
        idX + idBox.width / 2,
        idY - idBox.height / 2 + radius,
        radius
      );
      ctx.lineTo(idX + idBox.width / 2, idY + idBox.height / 2 - radius);
      ctx.arcTo(
        idX + idBox.width / 2,
        idY + idBox.height / 2,
        idX + idBox.width / 2 - radius,
        idY + idBox.height / 2,
        radius
      );
      ctx.lineTo(idX - idBox.width / 2 + radius, idY + idBox.height / 2);
      ctx.arcTo(
        idX - idBox.width / 2,
        idY + idBox.height / 2,
        idX - idBox.width / 2,
        idY + idBox.height / 2 - radius,
        radius
      );
      ctx.lineTo(idX - idBox.width / 2, idY - idBox.height / 2 + radius);
      ctx.arcTo(
        idX - idBox.width / 2,
        idY - idBox.height / 2,
        idX - idBox.width / 2 + radius,
        idY - idBox.height / 2,
        radius
      );
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
      handleImageCapture(null);
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
              <span className="visually-hidden">
                {TRANSLATIONS[language].loading}
              </span>
            </div>
            <p className="text-center text-white">
              {TRANSLATIONS[language].initializing}
            </p>
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
                fillRule="evenodd"
                clipRule="evenodd"
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

    return (
      <>
        {showPreview && image ? (
          <VerificationPreview
            image={image}
            onRetake={handleRetake}
            onSubmit={handleSubmit}
            submitting={submitting}
          />
        ) : (
          <div className="camera-verification-container">
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
                {image ? (
                  <div className="preview-image-container">
                    <img src={image} alt="Captured" />
                    <div className="preview-buttons">
                      <button
                        className="btn-try-again"
                        onClick={clearImage}
                        disabled={!image}
                      >
                        {TRANSLATIONS[language].tryAgain}
                      </button>
                      {image && (
                        <button className="btn-done" onClick={handlePreview}>
                          {TRANSLATIONS[language].preview}
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
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
                )}
                {cameraAccess && !image && (
                  <button
                    className="btn-capture mt-2"
                    onClick={capturePhoto}
                    disabled={!!image}
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
            </div>
          </div>
        )}
      </>
    );
  }
);

export default CameraVerification;
