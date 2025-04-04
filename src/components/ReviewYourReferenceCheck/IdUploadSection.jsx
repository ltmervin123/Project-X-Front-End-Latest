import React, { useState } from "react";

const IdUploadSection = ({
  frontIdFile,
  handleFrontIdSelect,
  clearFrontId,
  submitIdUpload,
  submitting,
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
  },
};
  const [selectedIdType, setSelectedIdType] = useState("");

  // Function to trigger the file input click
  const triggerFrontFileInput = () => {
    document.getElementById("frontIdInput").click();
  };

  // Function to clear the front ID file
  const clearId = () => {
    clearFrontId();
  };

  // Handle change in the preferred ID dropdown
  const handleIdTypeChange = (event) => {
    setSelectedIdType(event.target.value);
  };

  const hasNoId = () => {
    return !frontIdFile;
  };

  return (
    <div className="ReviewYourReferenceCheck-container d-flex flex-column align-items-center justify-content-center w-100">
      <div className="preferred-id-container mb-3">
      <p>{translations[language].preferredId}</p>
<select
  name="preferred-id"
  id="preferred-id"
  className="mb-3 form-select"
  value={selectedIdType}
  onChange={handleIdTypeChange}
>
  <option value="">{translations[language].selectId}</option>
  <option value="Passport">{translations[language].passport}</option>
  <option value="Driver's License">{translations[language].driversLicense}</option>
  <option value="National ID">{translations[language].nationalId}</option>
</select>
      </div>

      <div className="upload-id-container">
      <p>{translations[language].uploadYourId}</p>


        <div className="front-id-container mb-3">
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
  {translations[language].fileUploaded.replace("{fileName}", frontIdFile.name)}
</p>                </div>
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

        
        <div className="back-id-container mb-3">
          {/* <p>Back ID page</p>
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
                  <p className="m-0">File uploaded: {backIdFile.name}</p>
                </div>
                <button
                  onClick={triggerBackFileInput}
                  disabled={!selectedIdType}
                >
                  Select File
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
                  Select File
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
          </div> */}
        </div>
       
      </div>

      <div className="IdUploadSection-button-controls d-flex gap-3 my-3 w-100 justify-content-center">
      <button onClick={clearId} disabled={submitting || hasNoId()}>
  {translations[language].clear}
</button>

<button onClick={submitIdUpload} disabled={submitting || hasNoId()}>
  {submitting ? translations[language].submitting : translations[language].submit}
</button>
      </div>
    </div>
  );
};

export default IdUploadSection;