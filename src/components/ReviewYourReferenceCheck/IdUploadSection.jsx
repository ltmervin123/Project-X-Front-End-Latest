import React, { useState } from "react";
import CameraVerification from "../CameraVerification/CameraVerification";

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
      confidentialityDisclaimer: "Please rest assured that all information provided will be treated with the utmost confidentiality and handled in full compliance with our data protection policies.",
      proceed: "Proceed",
      documentVerification: "Document Verification",
      identificationDocument: "Identification Document"
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
      confidentialityDisclaimer: "提供された情報はすべて機密として扱われ、当社のデータ保護方針に完全に従って処理されることをご安心ください。",
      proceed: "進む",
      documentVerification: "本人確認書類",
      identificationDocument: "身分証明書"
    }
  };

  const [selectedIdType, setSelectedIdType] = useState("");
  const [showCamera, setShowCamera] = useState(false);

  const shortenFileName = (fileName) => {
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
  };

  // Handle change in the preferred ID dropdown
  const handleIdTypeChange = (event) => {
    setSelectedIdType(event.target.value);
  };

  const hasNoId = () => {
    return !frontIdFile || !backIdFile;
  };

  const handleProceed = () => {
    setShowCamera(true);
  };

  return (
    <div className="ReviewYourReferenceCheck-container d-flex flex-column align-items- justify-content-between w-100">
      {showCamera ? (
        <CameraVerification
          setSelfie={setSelfie}
          submitIdUpload={submitIdUpload}
          submitting={submitting}
        />
      ) : (
        <>
          <div className="w-100 d-flex justify-content-center align-items-center flex-column">
            <div className="preferred-id-container mb-3">
              <p>
                {translations[language].identificationDocument}
              </p>
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
                          <img
                            src={URL.createObjectURL(frontIdFile)}
                            alt="Front ID"
                            style={{
                              maxWidth: "50px",
                              maxHeight: "50px",
                            }}
                          />
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
                          <img
                            src={URL.createObjectURL(backIdFile)}
                            alt="Back ID"
                            style={{
                              maxWidth: "50px",
                              maxHeight: "50px",
                            }}
                          />
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
          </div>
          <div className="w-100 d-flex justify-content-center align-items-center flex-column">
            <div className="IdUploadSection-disclaimer d-flex gap-3 align-items-center justify-content-center">
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
            <div className="IdUploadSection-button-controls d-flex gap-3 my-3 w-100 justify-content-center">
              <button onClick={clearId} disabled={submitting || hasNoId()}>
                {translations[language].clear}
              </button>
              <button
                onClick={handleProceed}
                disabled={submitting || hasNoId()}
              >
                {translations[language].proceed}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default IdUploadSection;
