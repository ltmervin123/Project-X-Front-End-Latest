import React, { useEffect, useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import axios from "axios";

function CompareResumes() {
    const uploadedDocData = JSON.parse(localStorage.getItem("rfoUploadedDocxData"));
    const [docData, setDocData] = useState();
    const [isExpanded, setIsExpanded] = useState(false);
    const [uploadedDocxData, setUploadedDocxData] = useState(null); // Fixed variable name
    const SERVER_URL = process.env.REACT_APP_API_URL;
    const userStr = localStorage.getItem("user");
    const userData = userStr ? JSON.parse(userStr) : null;
    const token = userData?.token;
    const log = console.log;
    log("uploadedDocData", uploadedDocData);
    
    // Set uploadedDocxData state if it's not already set
    // useEffect(() => {
    //     if (uploadedDocData && !uploadedDocxData) {
    //         setUploadedDocxData(uploadedDocData);
    //     }
    // }, [uploadedDocData, uploadedDocxData]);
    // log("test:", 2);

    // useEffect(() => {
    //     const fetchOriginalResume = async () => {
    //         if (!uploadedDocxData || !uploadedDocxData.data || !uploadedDocxData.data._id) {
    //             log("uploadedDocxData not ready yet.");
    //             return;
    //         }
    //         log("test:", 2);

    //         log("Fetching document for ID:", uploadedDocxData.data._id);
    //         try {
    //             // const fileName = uploadedDocData.data.url.split('/').pop();
    //             // ${uploadedDocxData.data.url}
    //             // "C:\Users\Jay Li\Desktop\hr hatch\PROJEC-X\Back-end\uploads\67adf5b7ddef3e38582b9f22-1740885738821-Resume (1).docx"
    //             // axios.get(`${SERVER_URL}/file-url/67adf5b7ddef3e38582b9f22-1740885738821-Resume (1).docx`)
    //             // .then((response) => {
    //             //     log("response." , response);
    //             //     setDocData(response.data.fileUrl); // Set the generated file URL
    //             // })
    //             // .catch((error) => {
    //             //     console.error("Error fetching document:", error);
    //             // });
    //             // const { fileUrl } = response.data;
    //             // setDocData(fileUrl);


    //             const response = await axios.get(
    //                 `${SERVER_URL}/api/resume-fit-optimizer/get-document/${uploadedDocxData.data._id}`,
    //                 {
    //                     responseType: "blob",
    //                     headers: {
    //                         Authorization: `Bearer ${token}`,
    //                     },
    //                 }
    //             );
    //             log("response", response);
                
    //             // ✅ Debug: Check if response is a Blob
    //             console.log("Response Data:", response.data);
    //             console.log("Response Headers:", response.headers);

    //             if (response.data instanceof Blob) {
    //                 const url = URL.createObjectURL(response.data);
    //                 log("Generated Blob URL:", url);
                    
    //                 // Extract filename from Content-Disposition header
    //                 const contentDisposition = response.headers["content-disposition"];
    //                 let filename = "document"; // Default filename
    //                 if (contentDisposition) {
    //                     const filenameMatch = contentDisposition.match(/filename="(.+)"/);
    //                     if (filenameMatch && filenameMatch[1]) {
    //                         filename = filenameMatch[1];
    //                     }
    //                 }

    //                 // Extract file type (MIME type)
    //                 const fileType = response.data.type;
    //                 let fileExtension = "unknown";

    //                 if (fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"){
    //                     fileExtension = "docx";
    //                 } else if (fileType === "application/msword"){
    //                     fileExtension = "doc";
    //                 } else if (fileType === "application/pdf"){
    //                     fileExtension = "pdf";
    //                 }

    //                 setDocData([{
    //                     uri: "https://www2.hu-berlin.de/stadtlabor/wp-content/uploads/2021/12/sample3.docx",
    //                     fileType: fileExtension,
    //                     fileName: filename,
    //                 }]);
    //             } else {
    //                 console.error("Response is not a Blob:", response.data);
    //             }

    //             // const blob = new Blob([response.data], {
    //             //     type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    //             // });

    //             // const reader = new FileReader();
    //             // reader.readAsDataURL(response.data);
    //             // reader.onload = () => {
    //             //     window.open(reader.result);
    //             //     log("reader.result", reader.result);
    //             //     setDocData(reader.result); // Fixed setDocData usage
    //             // };
    //             // reader.onerror = () => {
    //             //     console.error("Failed to load the file");
    //             // };
    //             // log("response", response);
    //             // const url = URL.createObjectURL(response.data);
    //             // console.log("Generated Blob URL:", url);
    //             // window.open(url, "_blank");
    //             // setDocData(url);

    //         } catch (error) {
    //             console.error("Error fetching original resume:", error);
    //         }
    //     };

    //     if (!docData) {
    //         fetchOriginalResume();
    //         log("test :", docData);
    //     }
    //     log("test :", docData);
    // }, [uploadedDocxData, SERVER_URL, token, docData]);

    const expandResume = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="ResumeFitOptimizer-container d-flex flex-column gap-2">
            <div className="compareresumes-container d-flex justify-content-center align-items-center flex-column gap-3">
                <Row className=" compareresumes-resume-content w-100 d-flex gap-3 px-4">
                    <Col className="compareresumes-content-resume-original">
                    <div className="compareresumes-content-resume-original-header">
                        <h5>Original Resume</h5>
                    </div>
                    <div className="compareresumes-content-resume-original-content">
                        {/* {docData ? (
                            <div className={`resume-original-content-container ${isExpanded ? "expanded" : ""}`}>
                                <DocViewer
                                    documents={docData}
                                    pluginRenderers={DocViewerRenderers}
                                    style={{ height: "100%", width: "100%" }}
                                    config={{
                                        header: {
                                            disableHeader: false, // Set to true if you want to remove the entire header
                                            disableFileName: false, // Hide file name
                                            // retainZoomLevel: false, // Keep zoom level persistent
                                        },
                                        zoom: {
                                            disableZoom: true, // Disable zoom buttons
                                            disableWheelZoom: false, // Allow zoom with scroll wheel
                                        },
                                        fullscreen: {
                                            disableFullscreen: true, // Disable the full-screen button
                                        },
                                        theme: {
                                            primary: "#007bff", // Customize primary theme color
                                            secondary: "#6c757d", // Customize secondary color
                                            text_primary: "#000000", // Text color
                                            text_secondary: "#ffffff", // Secondary text color
                                            disableThemeToggle: true, // Hide theme toggle button
                                        },
                                    }}
                                    
                                />
                                <Button
                                    className="expand-button"
                                    onClick={expandResume}
                                >
                                    <svg width="20" height="20" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M675 500V675H500" stroke="black" stroke-width="50" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M659.062 659.016L475 475" stroke="black" stroke-width="50" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M125 300V125H300" stroke="black" stroke-width="50" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M140.938 140.984L325 325" stroke="black" stroke-width="50" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M500 125H675V300" stroke="black" stroke-width="50" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M659.016 140.938L475 325" stroke="black" stroke-width="50" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M300 675H125V500" stroke="black" stroke-width="50" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M140.984 659.062L325 475" stroke="black" stroke-width="50" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </Button>
                            </div>
                            
                        ) : (
                            <p>Loading document...</p>
                        )} */}
                        <div className={`resume-original-content-container ${isExpanded ? "expanded" : ""}`}>
                            <DocViewer
                                documents={[{
                                    uri: "https://www2.hu-berlin.de/stadtlabor/wp-content/uploads/2021/12/sample3.docx",
                                    fileType: "docx",
                                    fileName: "sample3",
                                }]}
                                pluginRenderers={DocViewerRenderers}
                                style={{ height: "100%", width: "100%" }}
                                config={{
                                    header: {
                                        disableHeader: false, // Set to true if you want to remove the entire header
                                        disableFileName: false, // Hide file name
                                        // retainZoomLevel: false, // Keep zoom level persistent
                                    },
                                    zoom: {
                                        disableZoom: true, // Disable zoom buttons
                                        disableWheelZoom: false, // Allow zoom with scroll wheel
                                    },
                                    fullscreen: {
                                        disableFullscreen: true, // Disable the full-screen button
                                    },
                                    theme: {
                                        primary: "#007bff", // Customize primary theme color
                                        secondary: "#6c757d", // Customize secondary color
                                        text_primary: "#000000", // Text color
                                        text_secondary: "#ffffff", // Secondary text color
                                        disableThemeToggle: true, // Hide theme toggle button
                                    },
                                }}
                                
                            />
                            <Button
                                className="expand-button"
                                onClick={expandResume}
                            >
                                <svg width="20" height="20" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M675 500V675H500" stroke="black" stroke-width="50" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M659.062 659.016L475 475" stroke="black" stroke-width="50" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M125 300V125H300" stroke="black" stroke-width="50" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M140.938 140.984L325 325" stroke="black" stroke-width="50" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M500 125H675V300" stroke="black" stroke-width="50" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M659.016 140.938L475 325" stroke="black" stroke-width="50" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M300 675H125V500" stroke="black" stroke-width="50" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M140.984 659.062L325 475" stroke="black" stroke-width="50" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </Button>
                        </div>

                    </div>
                    </Col>
                    <Col  className="compareresumes-content-resume-optimized">
                    <div className="compareresumes-content-resume-optimized-header">
                        <h5>Optimized Resume</h5>
                    </div>
                    <div className="compareresumes-content-resume-optimized-content"></div>
                    </Col>
                </Row>
                <Row className="compareresumes-btn-content d-flex justify-content-around align-items-center flex-row gap-2 w-100">
                    <Col className="px-3">
                    <div className="compareresumes-container-btn d-flex justify-content-between align-items-center ">
                        <button
                            className="btn-cancel-optimizer btn-primary"
                            onClick={() => {
                                window.location.href =
                                "/ResumeFitOptimizer/ExpandResume";
                            }}
                        >
                        Expand Resume
                        </button>
                        <button
                            className="btn-save-export btn-primary"
                            onClick={() => {
                                window.location.href =
                                "/ResumeFitOptimizer/SaveAndExportResumes";
                            }}
                        >
                        Save and Export
                        </button>
                    </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default CompareResumes;
