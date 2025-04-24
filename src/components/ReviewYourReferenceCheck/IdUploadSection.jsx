import React, { useState } from "react";
import CameraVerificationPopUp from "../CameraVerification/CameraVerificationPopUp";
import VerificationPreviewPopUp from "../VerificationPreviewPopUp/VerificationPreviewPopUp";

const IdUploadSection = ({
  frontIdFile,
  backIdFile,
  handleFrontIdSelect,
  handleBackIdSelect,
  clearFrontId,
  clearBackId,
  submitIdUpload,
  submitting,
  setSelfie,
}) => {
  const language = sessionStorage.getItem("preferred-language") || "English";

  const translations = {
    English: {
      preferredId: "Preferred ID",
      selectId: "Select ID",
      passport: "Passport",
      driversLicense: "Driver's License",
      nationalId: "National ID",
      uploadYourId: "Upload Your ID",
      frontIdPage: "Front ID page",
      fileUploaded: "File uploaded: {fileName}",
      clear: "Clear",
      submit: "Submit",
      submitting: "Submitting...",
      selectFile: "Select File",
      backIdPage: "Back ID page",
      confidentialityDisclaimer:
        "Please rest assured that all information provided will be treated with the utmost confidentiality and handled in full compliance with our data protection policies.",
      proceed: "Proceed",
      documentVerification: "Document Verification",
      identificationDocument: "Identification Document",
      cameraVerification: "Camera Verification",
      takePhoto: "Take a photo",
      or: "OR",
    },
    Japanese: {
      preferredId: "優先ID",
      selectId: "IDを選択",
      passport: "パスポート",
      driversLicense: "運転免許証",
      nationalId: "国民ID",
      uploadYourId: "IDをアップロード",
      frontIdPage: "IDの前面ページ",
      fileUploaded: "アップロードされたファイル: {fileName}",
      clear: "クリア",
      submit: "送信",
      submitting: "送信中...",
      selectFile: "ファイルを選択",
      backIdPage: "IDの裏面ページ",
      confidentialityDisclaimer:
        "提供された情報はすべて機密として扱われ、当社のデータ保護方針に完全に従って処理されることをご安心ください。",
      proceed: "進む",
      documentVerification: "本人確認書類",
      identificationDocument: "身分証明書",
      cameraVerification: "カメラ認証",
      takePhoto: "写真を撮る",
      or: "または",
    },
  };

  const [selectedIdType, setSelectedIdType] = useState("");
  const [showCameraPopup, setShowCameraPopup] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showPreviewPopup, setShowPreviewPopup] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null); // Add this state

  const shortenFileName = (fileName) => {
    if (!fileName) return '';
    if (typeof fileName === 'string' && fileName.startsWith('data:')) {
      return 'captured_image.jpg';
    }
    if (fileName.length > 12) {
      const extension = fileName.split(".").pop();
      return `${fileName.substring(0, 8)}....${extension}`;
    }
    return fileName;
  };

  // Function to trigger the file input click
  const triggerFrontFileInput = () => {
    document.getElementById("frontIdInput").click();
  };

  // Function to trigger the back file input click
  const triggerBackFileInput = () => {
    document.getElementById("backIdInput").click();
  };

  // Function to clear the front ID file
  const clearId = () => {
    clearFrontId();
    clearBackId();
    setCapturedImage(null);
    setUploadedImage(null);
    setSelectedOption(null);
  };

  // Handle change in the preferred ID dropdown
  const handleIdTypeChange = (event) => {
    setSelectedIdType(event.target.value);
  };

  const hasNoId = () => {
    return !frontIdFile || !backIdFile;
  };

  const hasNoVerification = () => {
    return !capturedImage && !uploadedImage;
  };

  const handleSubmit = () => {
    // Revise ang save condition ani
  };

  const handleCaptureComplete = (image) => {
    setCapturedImage(image);
    setShowCameraPopup(false);
    setSelectedOption('camera');
  };

  const handleVerificationFileUpload = (event) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
          setShowPreviewPopup(true);
          setSelectedOption('upload');
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handlePreviewRetake = () => {
    setShowPreviewPopup(false);
    setPreviewImage(null);
  };

  const handlePreviewSubmit = () => {
    setUploadedImage(previewImage);
    setSelfie(previewImage);
    setShowPreviewPopup(false);
  };

  return (
    <div className="ReviewYourReferenceCheck-container d-flex flex-column align-items- justify-content-between w-100">
      <>
        <div className="w-100 d-flex justify-content-center align-items-center flex-column">
          <div className="preferred-id-container mb-3">
            <p>{translations[language].identificationDocument}</p>
            <select
              name="preferred-id"
              id="preferred-id"
              className="mb-3 form-select"
              value={selectedIdType}
              onChange={handleIdTypeChange}
            >
              <option value="">{translations[language].selectId}</option>
              <option value="Passport">
                {translations[language].passport}
              </option>
              <option value="Driver's License">
                {translations[language].driversLicense}
              </option>
              <option value="National ID">
                {translations[language].nationalId}
              </option>
            </select>
          </div>

          <div className="upload-id-container">
            <div className="d-flex gap-4">
              <div className="front-id-container mb-3 w-100 ">
                <p>{translations[language].frontIdPage}</p>

                <div className="d-flex justify-content-between w-100">
                  {frontIdFile ? (
                    <div className="d-flex justify-content-between align-items-center w-100">
                      <div className="front-id-img-container d-flex align-items-center ">
                        <p className="m-0">
                          {translations[language].fileUploaded.replace(
                            "{fileName}",
                            shortenFileName(frontIdFile.name)
                          )}
                        </p>{" "}
                      </div>
                      <button
                        onClick={triggerFrontFileInput}
                        disabled={!selectedIdType}
                      >
                        {translations[language].selectFile}
                      </button>
                      <input
                        type="file"
                        id="frontIdInput"
                        accept="image/*"
                        onChange={handleFrontIdSelect}
                        style={{ display: "none" }} // Hide the file input
                      />
                    </div>
                  ) : (
                    <>
                      <div className="front-id-img-container d-flex"></div>
                      <button
                        onClick={triggerFrontFileInput}
                        disabled={!selectedIdType}
                      >
                        {translations[language].selectFile}
                      </button>
                      <input
                        type="file"
                        id="frontIdInput"
                        accept="image/*"
                        onChange={handleFrontIdSelect}
                        style={{ display: "none" }} // Hide the file input
                      />
                    </>
                  )}
                </div>
              </div>

              <div className="back-id-container mb-3 w-100">
                <p>{translations[language].backIdPage}</p>
                <div className="d-flex justify-content-between w-100">
                  {backIdFile ? (
                    <div className="d-flex justify-content-between align-items-center w-100">
                      <div className="back-id-img-container d-flex align-items-center ">
                        <p className="m-0">
                          {translations[language].fileUploaded.replace(
                            "{fileName}",
                            shortenFileName(backIdFile.name)
                          )}
                        </p>
                      </div>
                      <button
                        onClick={triggerBackFileInput}
                        disabled={!selectedIdType}
                      >
                        {translations[language].selectFile}
                      </button>
                      <input
                        type="file"
                        id="backIdInput"
                        accept="image/*"
                        onChange={handleBackIdSelect}
                        style={{ display: "none" }} // Hide the file input
                      />
                    </div>
                  ) : (
                    <>
                      <div className="back-id-img-container d-flex"></div>
                      <button
                        onClick={triggerBackFileInput}
                        disabled={!selectedIdType}
                      >
                        {translations[language].selectFile}
                      </button>
                      <input
                        type="file"
                        id="backIdInput"
                        accept="image/*"
                        onChange={handleBackIdSelect}
                        style={{ display: "none" }} // Hide the file input
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="camera-verification-option-container mb-3">
            <p className="mb-3">{translations[language].cameraVerification}</p>
            <div className="row d-flex align-items-center">
              <div className="col-md-5 text-center">
                <div className="take-a-photo-container">
                  <svg
                    width="62"
                    height="56"
                    viewBox="0 0 62 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M30.8932 16.6667C38.9141 16.6667 45.3307 23.0833 45.3307 31.1042C45.3307 39.125 38.9141 45.5417 30.8932 45.5417C22.8724 45.5417 16.4557 39.125 16.4557 31.1042C16.4557 23.0833 22.8724 16.6667 30.8932 16.6667ZM30.8932 19.875C27.9151 19.875 25.0589 21.0581 22.953 23.1639C20.8471 25.2698 19.6641 28.126 19.6641 31.1042C19.6641 34.0823 20.8471 36.9385 22.953 39.0444C25.0589 41.1503 27.9151 42.3333 30.8932 42.3333C33.8714 42.3333 36.7276 41.1503 38.8334 39.0444C40.9393 36.9385 42.1224 34.0823 42.1224 31.1042C42.1224 28.126 40.9393 25.2698 38.8334 23.1639C36.7276 21.0581 33.8714 19.875 30.8932 19.875ZM10.0391 7.04167H16.4557L22.8724 0.625H38.9141L45.3307 7.04167H51.7474C54.3001 7.04167 56.7483 8.05573 58.5533 9.86076C60.3583 11.6658 61.3724 14.114 61.3724 16.6667V45.5417C61.3724 48.0944 60.3583 50.5425 58.5533 52.3476C56.7483 54.1526 54.3001 55.1667 51.7474 55.1667H10.0391C7.48635 55.1667 5.0382 54.1526 3.23316 52.3476C1.42812 50.5425 0.414063 48.0944 0.414062 45.5417V16.6667C0.414063 14.114 1.42812 11.6658 3.23316 9.86076C5.0382 8.05573 7.48635 7.04167 10.0391 7.04167ZM24.1878 3.83333L17.7711 10.25H10.0391C8.33726 10.25 6.70515 10.926 5.50179 12.1294C4.29843 13.3328 3.6224 14.9649 3.6224 16.6667V45.5417C3.6224 47.2435 4.29843 48.8756 5.50179 50.0789C6.70515 51.2823 8.33726 51.9583 10.0391 51.9583H51.7474C53.4492 51.9583 55.0813 51.2823 56.2847 50.0789C57.488 48.8756 58.1641 47.2435 58.1641 45.5417V16.6667C58.1641 14.9649 57.488 13.3328 56.2847 12.1294C55.0813 10.926 53.4492 10.25 51.7474 10.25H44.0153L37.5986 3.83333H24.1878Z" fill="black" />
                  </svg>

                  {capturedImage ? (
                    <div className="d-flex align-items-center justify-content-center">
                      <p >
                        {translations[language].fileUploaded.replace(
                          "{fileName}",
                          shortenFileName(
                            capturedImage.name || "captured_image.jpg"
                          )
                        )}
                      </p>
                    </div>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={() => setShowCameraPopup(true)}
                      disabled={selectedOption === 'upload' || capturedImage || submitting || hasNoId()}
                    >
                      {translations[language].takePhoto}
                    </button>
                  )}
                </div>
              </div>
              <div className="col-md-2 text-center d-flex align-items-center justify-content-center or-container position-relative">
                <div>
                  <span>{translations[language].or}</span>
                </div>
              </div>
              <div className="col-md-5 text-center">
                <div className="take-a-photo-container">
                  <svg
                    width="61"
                    height="55"
                    viewBox="0 0 61 55"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M59.0277 30.7777V17.1462C59.0277 13.1292 57.4038 9.27667 54.5133 6.43621C51.6229 3.59575 47.7025 2 43.6148 2H17.4129C13.3251 2 9.40481 3.59575 6.51433 6.43621C3.62385 9.27667 2 13.1292 2 17.1462V38.3508C2 40.3399 2.39867 42.3094 3.17324 44.147C3.94781 45.9847 5.08311 47.6544 6.51433 49.0608C9.40481 51.9013 13.3251 53.497 17.4129 53.497H36.7098"
                      stroke="black"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M2.79688 42.8943L11.2431 33.2007C12.3524 32.1181 13.8082 31.4454 15.3642 31.2963C16.9202 31.1473 18.4808 31.5311 19.7819 32.3829C21.083 33.2346 22.6436 33.6184 24.1996 33.4694C25.7556 33.3203 27.2114 32.6476 28.3206 31.565L35.503 24.5068C37.5668 22.4719 40.2992 21.2238 43.2127 20.9852C46.1261 20.7466 49.0311 21.5331 51.4091 23.2043L59.0231 28.9901M18.2098 22.2046C18.8817 22.2006 19.5463 22.0666 20.1656 21.8103C20.7849 21.5539 21.3467 21.1801 21.8191 20.7104C22.2914 20.2406 22.6649 19.684 22.9183 19.0724C23.1717 18.4608 23.3001 17.8061 23.296 17.1458C23.292 16.4854 23.1556 15.8323 22.8947 15.2238C22.6338 14.6152 22.2535 14.0631 21.7755 13.599C21.2974 13.1348 20.7311 12.7678 20.1087 12.5187C19.4863 12.2697 18.8201 12.1436 18.1481 12.1476C16.791 12.1556 15.4927 12.6931 14.5388 13.6418C13.585 14.5905 13.0537 15.8727 13.0619 17.2064C13.07 18.54 13.617 19.8159 14.5824 20.7532C15.5478 21.6906 16.8526 22.2127 18.2098 22.2046Z"
                      stroke="black"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M51.1953 36.8359V51.9821"
                      stroke="black"
                      stroke-width="3"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                    />
                    <path
                      d="M58.2617 43.2126L52.1983 37.2541C52.0665 37.124 51.9099 37.0208 51.7375 36.9504C51.565 36.88 51.3801 36.8438 51.1934 36.8438C51.0066 36.8438 50.8217 36.88 50.6492 36.9504C50.4768 37.0208 50.3202 37.124 50.1884 37.2541L44.125 43.2126"
                      stroke="black"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>

                  {uploadedImage ? (
                    <div className="d-flex flex-column align-items-center justify-content-center">

                      <p >
                        {translations[language].fileUploaded.replace(
                          "{fileName}",
                          typeof uploadedImage === 'string' ? 'captured_image.jpg' : shortenFileName(uploadedImage.name)
                        )}
                      </p>
                    </div>
                  ) : (
                    <button
                      className="btn btn-secondary"
                      onClick={handleVerificationFileUpload}
                      disabled={selectedOption === 'camera' || uploadedImage || submitting || hasNoId()}
                    >
                      {translations[language].selectFile}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-100 d-flex justify-content-center align-items-center flex-column">
          <div className="IdUploadSection-disclaimer d-flex gap-3 align-items-center justify-content-start">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 15C10.2833 15 10.521 14.904 10.713 14.712C10.905 14.52 11.0007 14.2827 11 14V10C11 9.71667 10.904 9.47933 10.712 9.288C10.52 9.09667 10.2827 9.00067 10 9C9.71733 8.99933 9.48 9.09533 9.288 9.288C9.096 9.48067 9 9.718 9 10V14C9 14.2833 9.096 14.521 9.288 14.713C9.48 14.905 9.71733 15.0007 10 15ZM10 7C10.2833 7 10.521 6.904 10.713 6.712C10.905 6.52 11.0007 6.28267 11 6C10.9993 5.71733 10.9033 5.48 10.712 5.288C10.5207 5.096 10.2833 5 10 5C9.71667 5 9.47933 5.096 9.288 5.288C9.09667 5.48 9.00067 5.71733 9 6C8.99933 6.28267 9.09533 6.52033 9.288 6.713C9.48067 6.90567 9.718 7.00133 10 7ZM10 20C8.61667 20 7.31667 19.7373 6.1 19.212C4.88334 18.6867 3.825 17.9743 2.925 17.075C2.025 16.1757 1.31267 15.1173 0.788001 13.9C0.263335 12.6827 0.000667933 11.3827 1.26582e-06 10C-0.000665401 8.61733 0.262001 7.31733 0.788001 6.1C1.314 4.88267 2.02633 3.82433 2.925 2.925C3.82367 2.02567 4.882 1.31333 6.1 0.788C7.318 0.262667 8.618 0 10 0C11.382 0 12.682 0.262667 13.9 0.788C15.118 1.31333 16.1763 2.02567 17.075 2.925C17.9737 3.82433 18.6863 4.88267 19.213 6.1C19.7397 7.31733 20.002 8.61733 20 10C19.998 11.3827 19.7353 12.6827 19.212 13.9C18.6887 15.1173 17.9763 16.1757 17.075 17.075C16.1737 17.9743 15.1153 18.687 13.9 19.213C12.6847 19.739 11.3847 20.0013 10 20Z"
                fill="#F46A05"
              />
            </svg>
            {translations[language].confidentialityDisclaimer}
          </div>
          <div className="IdUploadSection-button-controls d-flex gap-3 mt-3 w-100 justify-content-center">
            <button onClick={clearId} disabled={submitting || hasNoId()}>
              {translations[language].clear}
            </button>
            <button onClick={handleSubmit} disabled={submitting || hasNoId() || hasNoVerification()}>
              {translations[language].submit}
            </button>
          </div>
        </div>
      </>

      <CameraVerificationPopUp
        isOpen={showCameraPopup}
        onClose={() => setShowCameraPopup(false)}
        setSelfie={setSelfie}
        submitIdUpload={(image) => handleCaptureComplete(image)}
        submitting={submitting}
      />

      {showPreviewPopup && (
        <VerificationPreviewPopUp
          isOpen={showPreviewPopup}
          onClose={() => setShowPreviewPopup(false)}
          image={previewImage}
          onRetake={handlePreviewRetake}
          onSubmit={handlePreviewSubmit}
          submitting={submitting}
        />
      )}
    </div>
  );
};

export default IdUploadSection;
