import React, { useState, useEffect, useRef } from "react"; // Ensure useState is imported
import "../../styles/ViewRequest.css";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function ViewRequest({ referenceId, token }) {
  const reportRef = useRef();

  const API = process.env.REACT_APP_API_URL;
  const [fetchingRefence, setFetchingReference] = useState(false);
  const [error, setError] = useState("");
  const [referenceData, setReferenceData] = useState(null);
  const [downloading, saveDownloading] = useState(false);
  // Updated questions and categories
  const updatedQuestions = [
    {
      category: "Relationship",
      questions: [
        {
          id: 1,
          text: "How do you know (candidate’s name), and how long have you worked together?",
          originalAnswer:
            "I worked with the candidate for 2 years as their direct supervisor.",
          enhancedAnswer:
            "I have had the pleasure of working with the candidate for over 2 years, where I directly supervised their work and witnessed their growth and dedication.",
        },
      ],
    },
    {
      category: "Job Responsibilities and Performance",
      questions: [
        {
          id: 2,
          text: "Can you describe (candidate’s name) main responsibilities in his/her previous role?",
          originalAnswer:
            "The candidate was responsible for project management and client communication.",
          enhancedAnswer:
            "In their previous role, the candidate was in charge of overseeing multiple projects, managing client relationships, and ensuring timely delivery of services.",
        },
        {
          id: 3,
          text: "How would you rate (candidate’s name) performance in his/her role, and why?",
          originalAnswer:
            "I would rate the candidate's performance as excellent.",
          enhancedAnswer:
            "I would rate the candidate's performance as outstanding, consistently exceeding expectations in all aspects of their role, from client interactions to project completion.",
        },
        {
          id: 4,
          text: "What do you consider to be (candidate’s name) key strengths?",
          originalAnswer:
            "The candidate has strong communication and organizational skills.",
          enhancedAnswer:
            "The candidate’s key strengths lie in their exceptional communication abilities and organizational prowess, enabling them to manage complex tasks with ease.",
        },
        {
          id: 5,
          text: "What areas, if any, do you think the (candidate’s name) could further develop or improve?",
          originalAnswer:
            "The candidate could work on being less perfectionistic at times.",
          enhancedAnswer:
            "While the candidate demonstrates exceptional work ethic, they could focus on reducing their tendency to overanalyze and spending extra time on tasks to ensure efficiency.",
        },
      ],
    },
    {
      category: "Skills and Competencies",
      questions: [
        {
          id: 6,
          text: "How would you describe (candidate’s name) communication skills?",
          originalAnswer:
            "The candidate has great communication skills, both written and verbal.",
          enhancedAnswer:
            "The candidate excels in both written and verbal communication, consistently conveying ideas clearly and effectively in all interactions.",
        },
        {
          id: 7,
          text: "How well does (candidate’s name) work with colleagues or in a team?",
          originalAnswer:
            "They work very well with colleagues, always being a team player.",
          enhancedAnswer:
            "The candidate is an excellent team player, collaborating seamlessly with colleagues, offering support, and fostering a positive work environment.",
        },
        {
          id: 8,
          text: "How would you describe their attention to detail in their work?",
          originalAnswer:
            "The candidate pays great attention to detail and ensures accuracy in their work.",
          enhancedAnswer:
            "The candidate's meticulous attention to detail is evident in their work, ensuring accuracy and a high standard in every task they complete.",
        },
      ],
    },
    {
      category: "Work Ethic and Behavior",
      questions: [
        {
          id: 9,
          text: "How would you describe (candidate’s name) attitude and professionalism?",
          originalAnswer:
            "The candidate is very professional and positive in their attitude.",
          enhancedAnswer:
            "The candidate exhibits a positive, professional attitude, approaching challenges with a can-do mindset and always maintaining a high standard of professionalism.",
        },
        {
          id: 10,
          text: "How did they handle feedback and criticism?",
          originalAnswer:
            "The candidate is open to feedback and takes it constructively.",
          enhancedAnswer:
            "The candidate is highly receptive to feedback, viewing it as an opportunity for growth and consistently improving based on constructive criticism.",
        },
        {
          id: 11,
          text: "Did they show initiative and a willingness to learn?",
          originalAnswer:
            "Yes, the candidate is always eager to learn and take on new challenges.",
          enhancedAnswer:
            "The candidate is proactive, always seeking new learning opportunities and demonstrating a strong initiative to take on challenges with enthusiasm.",
        },
      ],
    },
    {
      category: "Closing Questions",
      questions: [
        {
          id: 12,
          text: "If given the opportunity, would you work with or rehire this (candidate’s name)?",
          originalAnswer: "Yes, I would definitely rehire the candidate.",
          enhancedAnswer:
            "Without a doubt, I would rehire the candidate in a heartbeat, as they consistently proved to be a valuable asset to the team.",
        },
        {
          id: 13,
          text: "Is there anything else you believe we should know about the (candidate’s name)?",
          originalAnswer: "No, I think all important points have been covered.",
          enhancedAnswer:
            "The candidate is a dedicated, hardworking individual with a positive attitude, and I believe they will excel in any role they undertake.",
        },
      ],
    },
  ];

  // State to manage the editing status and enhanced answers
  const [editedAnswers, setEditedAnswers] = useState(
    updatedQuestions.reduce((acc, category) => {
      category.questions.forEach((question) => {
        acc[question.id] = question.enhancedAnswer;
      });
      return acc;
    }, {})
  );

  // Handle the change in the enhanced answer (for editing)
  const handleEnhancedAnswerChange = (e, id) => {
    setEditedAnswers((prev) => ({
      ...prev,
      [id]: e.target.value,
    }));
  };

  const fetchReferenceByReferenceId = async () => {
    try {
      setFetchingReference(true);
      const URL = `${API}/api/ai-referee/company-request-reference//get-reference/${referenceId}`;
      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setReferenceData(response.data.referenceDetails);
      }
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          "An error occurred while fetching reference"
      );
    } finally {
      setFetchingReference(false);
    }
  };

  function formatDate(date) {
    const newDate = new Date(date);
    return newDate.toDateString();
  }

  function formatter(letter) {
    if (!letter) {
      return "";
    }
    return letter.charAt(0).toUpperCase() + letter.slice(1);
  }

  function formatCategories(letter) {
    switch (letter) {
      case "relationship":
        return "Relationship";
      case "jobResponsibilitiesAndPerformance":
        return "Job Responsibilities and Performance";
      case "skillAndCompetencies":
        return "Skills and Competencies";
      case "workEhticAndBevaior":
        return "Work Ethic and Behavior";
      case "closingQuestions":
        return "Closing Questions";
      case "strategicLeadershipAndVision":
        return "Strategic Leadership and Vision";
      case "businessImpactAndResults":
        return "Business Impact and Results";
      case "teamLeadershipAndOrganizationalDevelopment":
        return "Team Leadership and Organizational Development";
      case "decisionMakingAndProblemSolving":
        return "Decision Making and Problem Solving";
      case "innovationAndGrowth":
        return "Innovation and Growth";
      case "leadershipAndManagementSkills":
        return "Leadership and Management Skills";
      default:
        return "Not Available";
    }
  }

  // const downloadPDF = async () => {
  //   saveDownloading(true);
  //   const input = reportRef.current;
  //   const canvas = await html2canvas(input, { scale: 2 }); // Higher scale for better quality
  //   const imgData = canvas.toDataURL("image/png");

  //   const pdf = new jsPDF("p", "mm", "a4");
  //   const imgWidth = 190;
  //   const imgHeight = (canvas.height * imgWidth) / canvas.width;

  //   pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
  //   pdf.save(
  //     `${referenceData?.referenceRequestId?.candidate}-reference-report.pdf`
  //   ); // Save with candidate name
  //   saveDownloading(false);
  // };

  // const downloadPDF = async () => {
  //   saveDownloading(true);
  //   const input = reportRef.current;

  //   // Capture the element as an image with better quality
  //   const canvas = await html2canvas(input, {
  //     scale: 3, // Higher scale improves quality
  //     useCORS: true, // Ensures external images load correctly
  //     backgroundColor: null,
  //   });

  //   const imgData = canvas.toDataURL("image/jpeg", 0.8); // Use JPEG with compression for smaller file size

  //   // Initialize PDF
  //   const pdf = new jsPDF("p", "mm", "a4");
  //   const pdfWidth = pdf.internal.pageSize.getWidth();
  //   const pdfHeight = pdf.internal.pageSize.getHeight();

  //   const imgWidth = pdfWidth - 20; // Leave some margins
  //   const imgHeight = (canvas.height * imgWidth) / canvas.width;

  //   let y = 10; // Start position for first page

  //   // If content is taller than a single A4 page, split into multiple pages
  //   if (imgHeight > pdfHeight - 20) {
  //     let position = 0;

  //     while (position < canvas.height) {
  //       const section = canvas
  //         .getContext("2d")
  //         .getImageData(
  //           0,
  //           position,
  //           canvas.width,
  //           pdfHeight * (canvas.width / pdfWidth)
  //         );
  //       const tempCanvas = document.createElement("canvas");
  //       tempCanvas.width = canvas.width;
  //       tempCanvas.height = section.height;
  //       tempCanvas.getContext("2d").putImageData(section, 0, 0);

  //       const sectionData = tempCanvas.toDataURL("image/jpeg", 0.8);
  //       pdf.addImage(sectionData, "JPEG", 10, y, imgWidth, pdfHeight - 20);

  //       position += pdfHeight * (canvas.width / pdfWidth);
  //       if (position < canvas.height) pdf.addPage();
  //     }
  //   } else {
  //     pdf.addImage(imgData, "JPEG", 10, y, imgWidth, imgHeight);
  //   }

  //   pdf.save(
  //     `${referenceData?.referenceRequestId?.candidate}-reference-report.pdf`
  //   );
  //   saveDownloading(false);
  // };

  const downloadPDF = async () => {
    saveDownloading(true);
    const input = reportRef.current;

    // Capture the element as an image with better quality
    const canvas = await html2canvas(input, {
      scale: 3, // Higher scale improves quality
      useCORS: true, // Ensures external images load correctly
      allowTaint: false, // Prevents CORS issues
      backgroundColor: "#ffffff", // Set background explicitly to white
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.8); // Use JPEG with compression for smaller file size

    // Initialize PDF
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pdfWidth - 20; // Leave some margins
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let y = 10; // Start position for first page

    // If content is taller than a single A4 page, split into multiple pages
    if (imgHeight > pdfHeight - 20) {
      let position = 0;

      while (position < canvas.height) {
        const section = canvas
          .getContext("2d")
          .getImageData(
            0,
            position,
            canvas.width,
            pdfHeight * (canvas.width / pdfWidth)
          );

        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = canvas.width;
        tempCanvas.height = section.height;
        tempCanvas.getContext("2d").putImageData(section, 0, 0);

        const sectionData = tempCanvas.toDataURL("image/jpeg", 0.8);
        pdf.addImage(sectionData, "JPEG", 10, y, imgWidth, pdfHeight - 20);

        position += pdfHeight * (canvas.width / pdfWidth);
        if (position < canvas.height) pdf.addPage();
      }
    } else {
      pdf.addImage(imgData, "JPEG", 10, y, imgWidth, imgHeight);
    }

    pdf.save(
      `${referenceData?.referenceRequestId?.candidate}-reference-report.pdf`
    );
    saveDownloading(false);
  };

  // const getBase64ImageFromURL = async (url) => {
  //   const response = await fetch(url, { mode: "cors" });
  //   const blob = await response.blob();
  //   return new Promise((resolve) => {
  //     const reader = new FileReader();
  //     reader.onloadend = () => resolve(reader.result);
  //     reader.readAsDataURL(blob);
  //   });
  // };

  // const downloadPDF = async () => {
  //   saveDownloading(true);
  //   const input = reportRef.current;

  //   // Convert the signature image to Base64
  //   const signatureImageURL = referenceData?.signatureImageURL || "";
  //   let signatureBase64 = "";

  //   if (signatureImageURL) {
  //     try {
  //       signatureBase64 = await getBase64ImageFromURL(signatureImageURL);
  //     } catch (error) {
  //       console.error("Failed to load signature image:", error);
  //     }
  //   }

  //   // Generate Canvas
  //   const canvas = await html2canvas(input, {
  //     scale: 3,
  //     useCORS: true,
  //     allowTaint: true,
  //     backgroundColor: null,
  //   });

  //   const imgData = canvas.toDataURL("image/jpeg", 0.8);
  //   const pdf = new jsPDF("p", "mm", "a4");
  //   const pdfWidth = pdf.internal.pageSize.getWidth();
  //   const pdfHeight = pdf.internal.pageSize.getHeight();
  //   const imgWidth = pdfWidth - 20;
  //   const imgHeight = (canvas.height * imgWidth) / canvas.width;
  //   let y = 10;

  //   pdf.addImage(imgData, "JPEG", 10, y, imgWidth, imgHeight);

  //   // If signature image exists, add it separately to ensure it is rendered correctly
  //   if (signatureBase64) {
  //     pdf.addImage(signatureBase64, "PNG", 10, y + imgHeight + 10, 50, 30); // Adjust size & position as needed
  //   }

  //   pdf.save(
  //     `${referenceData?.referenceRequestId?.candidate}-reference-report.pdf`
  //   );
  //   saveDownloading(false);
  // };

  //fetching reference when the component mounts
  useEffect(() => {
    const fetchingRefenceWhenRender = async () => {
      await fetchReferenceByReferenceId();
    };

    fetchingRefenceWhenRender();
  }, []);

  useEffect(() => {
    console.log(referenceData);
  }, [referenceData]);

  if (fetchingRefence) {
    return (
      <div className="MockMainDashboard-content d-flex flex-column gap-2">
        <h3>Loading Reference Request...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="MockMainDashboard-content d-flex flex-column gap-2">
        <h3>{error}</h3>
      </div>
    );
  }

  return (
    <div className="MockMainDashboard-content d-flex flex-column gap-2">
      <div className="ViewRequest-container">
        <div ref={reportRef}>
          <h4 className="color-orange mb-2">
            {referenceData?.questionFormat || "Not Available"}
          </h4>
          <p className="mb-2">
            <b>Position: </b>
            <span>
              {referenceData?.referenceRequestId?.position || "Not Available"}
            </span>
          </p>
          <p className="mb-2">
            <b>Candidate Name: </b>
            <span>
              {referenceData?.referenceRequestId?.candidate || "Not Available"}
            </span>
          </p>
          <p className="mb-2">
            <b>Referee Name: </b>
            <span>
              {referenceData?.referenceRequestId?.refereeName ||
                "Not Available"}
            </span>
          </p>
          <p className="mb-2">
            <b>Referee Title: </b>
            <span>{referenceData?.refereeTitle || "Not Available"}</span>
          </p>
          {/* <p className="mb-2">
            <b>Company Name: </b>
            <span>[Insert Company Name]</span>
          </p> */}
          <p className="mb-2">
            <b>Relationship to Candidate: </b>
            <span>
              {formatter(referenceData?.refereeRelationshipWithCandidate)}
            </span>
          </p>
          <p className="mb-2">
            <b>Dates Worked Together: </b>

            <span>
              {/* From {"Not Available"} to {"Not Available"} */}
              {"Not Available"}
            </span>
          </p>

          <div className="my-4">
            {referenceData?.referenceQuestion.map((item) => (
              <div>
                <h5 className="color-gray">
                  {formatCategories(item.category)}
                </h5>
                {item.questions.map((question, index) => (
                  <div>
                    <div className="d-flex w-100">
                      <p>
                        <b>Question {index + 1}: </b>

                        {question}
                      </p>
                    </div>

                    <h6 className="color-gray">Normalized Answer:</h6>

                    <div className="EnchanceAns-container mb-4">
                      <p>{item.answers[index]}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <p className="signature-verif-title color-orange mb-2">
            SIGNATURE AND VERIFICATION
          </p>
          <img
            className="signature-feild"
            src={referenceData?.signatureImageURL || ""}
            alt="Signature here..."
          />

          <p className="mb-2">
            <b>Referee Name: </b>
            <span>
              {referenceData?.referenceRequestId?.refereeName ||
                "Not Available"}
            </span>
          </p>
          <p className=" mb-2">
            <b>Date:</b>
            <span> {formatDate(referenceData?.createdAt)}</span>
          </p>
        </div>

        <div className="d-flex justify-content-center">
          <button onClick={downloadPDF} disabled={downloading}>
            {downloading ? "Downloading..." : "Download Reference Report"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewRequest;
