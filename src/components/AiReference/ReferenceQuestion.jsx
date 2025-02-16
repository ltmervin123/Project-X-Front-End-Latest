import React, { use, useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa"; // icons for edit, delete, and dropdown
import AddNewSetsQuestionPopUp from "./AddNewSetsQuestionPopUp";
import logo from "../../assets/logo.png"; // Adjust the path to your logo image
import axios from "axios";

const ReferenceQuestion = () => {
  const API = process.env.REACT_APP_API_URL;
  const [selectedSet, setSelectedSet] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeButton, setActiveButton] = useState("Custom Sets"); // Default to 'Custom Sets'
  const [flippedState, setFlippedState] = useState({});
  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const [questionSets, setQuestionSets] = useState(
    JSON.parse(localStorage.getItem("questions")) || []
  );

  const formatDate = (date) => {
    return date.split("T")[0]; // Extract only YYYY-MM-DD
  };

  const fetchCustomReferenceQuestions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const id = user?.id;
      const token = user?.token;
      const URL = `${API}/api/ai-referee/company-reference-questions/get-reference-questions/${id}`;
      const reponse = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.setItem("questions", JSON.stringify(reponse.data.questions));
      setQuestionSets(reponse.data.questions);
    } catch (error) {
      console.error(error);
    }
  };

  const reFetchUpdatedQuestions = async () => {
    try {
      const { id, token } = JSON.parse(localStorage.getItem("user"));
      const URL = `${API}/api/ai-referee/company-reference-questions/get-reference-questions/${id}`;
      const reponse = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //delete the old questions from local storage
      localStorage.removeItem("questions");
      //set the new questions to local storage
      localStorage.setItem("questions", JSON.stringify(reponse.data.questions));
      setQuestionSets(reponse.data.questions);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteQuestionSet = async (questionId) => {
    try {
      const { id, token } = JSON.parse(localStorage.getItem("user"));
      const companyId = id;
      const URL = `${API}/api/ai-referee/company-reference-questions/delete-reference-questions/${questionId}/${companyId}`;
      const reponse = await axios.delete(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (reponse.status === 200) {
        reFetchUpdatedQuestions();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (questionSets.length === 0) {
        await fetchCustomReferenceQuestions();
      }
    };

    fetchData();
  }, []);

  const handleSetClick = (index) => {
    setSelectedSet(index === selectedSet ? null : index);
    setFlippedState((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // Toggle the flipped state for the clicked set
    }));
  };

  // HR-HATCH Format Data
  const hrHatchFormats = [
    {
      title: "General Level",
      description: "Standard questions suitable for most positions",
      questionCount: 10,
      svg: (
        <svg
          width="42"
          height="28"
          viewBox="0 0 42 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M28.8345 13.9101C32.424 13.9101 35.349 10.7288 35.349 6.85803C35.349 3.03126 32.439 0 28.8345 0C25.26 0 22.3193 3.07604 22.3193 6.88788C22.3342 10.7437 25.26 13.9101 28.8345 13.9101ZM11.4615 14.2399C14.568 14.2399 17.1165 11.4639 17.1165 8.05799C17.1165 4.72674 14.598 2.04099 11.4615 2.04099C8.355 2.04099 5.7915 4.77226 5.8065 8.08784C5.8215 11.4795 8.355 14.2399 11.4615 14.2399ZM28.8345 11.6445C26.6325 11.6445 24.747 9.54378 24.747 6.88788C24.747 4.27601 26.6025 2.26636 28.8345 2.26636C31.0815 2.26636 32.9212 4.2469 32.9212 6.85728C32.9212 9.51393 31.0665 11.6445 28.8345 11.6445ZM11.4615 12.0042C9.62175 12.0042 8.0535 10.249 8.0535 8.08784C8.0535 5.97223 9.606 4.27675 11.4615 4.27675C13.3612 4.27675 14.8845 5.94238 14.8845 8.05799C14.8845 10.249 13.3162 12.0042 11.4615 12.0042ZM3.0765 28H14.9152C14.1907 27.5948 13.6328 26.6941 13.7385 25.7792H2.7C2.3985 25.7792 2.24775 25.6598 2.24775 25.374C2.24775 21.6532 6.51525 18.1719 11.4472 18.1719C13.347 18.1719 15.051 18.6219 16.5142 19.4771C16.9996 18.8657 17.5739 18.3297 18.2183 17.8868C16.2728 16.6108 13.9357 15.9511 11.4472 15.9511C5.12775 15.9511 0 20.5121 0 25.509C0 27.1747 1.02525 28 3.0765 28ZM19.3635 28H38.3055C40.8083 28 42 27.25 42 25.5993C42 21.6681 37.008 15.9802 28.8345 15.9802C20.6452 15.9802 15.654 21.6681 15.654 25.5993C15.654 27.25 16.845 28 19.3635 28ZM18.6398 25.7344C18.2475 25.7344 18.0817 25.6299 18.0817 25.3143C18.0817 22.8531 21.912 18.2473 28.8345 18.2473C35.742 18.2473 39.5715 22.8531 39.5715 25.3143C39.5715 25.6292 39.4215 25.7344 39.0285 25.7344H18.6398Z"
            fill="#319F43"
          />
        </svg>
      ),
    },
    {
      title: "Management Level",
      description: "Questions tailored for managerial and leadership roles",
      questionCount: 10,
      svg: (
        <svg
          width="29"
          height="28"
          viewBox="0 0 29 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M26.3148 6.44067H21.4587C21.3169 4.68611 20.5224 3.04936 19.233 1.85598C17.9437 0.662587 16.254 0 14.5 0C12.746 0 11.0563 0.662587 9.76697 1.85598C8.47761 3.04936 7.68305 4.68611 7.54134 6.44067H2.68519C1.97303 6.44067 1.29004 6.7246 0.786473 7.22999C0.282903 7.73539 0 8.42085 0 9.13559V25.3051C0 26.0198 0.282903 26.7053 0.786473 27.2107C1.29004 27.7161 1.97303 28 2.68519 28H26.3148C27.027 28 27.71 27.7161 28.2135 27.2107C28.7171 26.7053 29 26.0198 29 25.3051V9.13559C29 8.42085 28.7171 7.73539 28.2135 7.22999C27.71 6.7246 27.027 6.44067 26.3148 6.44067ZM14.5 3.20677C15.4039 3.20686 16.2775 3.53382 16.9608 4.12775C17.644 4.72167 18.0912 5.54279 18.2203 6.44067H10.7797C10.9088 5.54279 11.356 4.72167 12.0392 4.12775C12.7225 3.53382 13.5961 3.20686 14.5 3.20677ZM25.7778 24.7661H3.22222V9.67457H7.51852V11.2915C7.51852 11.7204 7.68826 12.1316 7.9904 12.4349C8.29254 12.7381 8.70234 12.9085 9.12963 12.9085C9.55692 12.9085 9.96672 12.7381 10.2689 12.4349C10.571 12.1316 10.7407 11.7204 10.7407 11.2915V9.67457H18.2593V11.2915C18.2593 11.7204 18.429 12.1316 18.7311 12.4349C19.0333 12.7381 19.4431 12.9085 19.8704 12.9085C20.2977 12.9085 20.7075 12.7381 21.0096 12.4349C21.3117 12.1316 21.4815 11.7204 21.4815 11.2915V9.67457H25.7778V24.7661Z"
            fill="#1877F2"
          />
        </svg>
      ),
    },
    {
      title: "Executive Level",
      description: "In-depth questions for senior executive positions",
      questionCount: 10,
      svg: (
        <svg
          width="33"
          height="28"
          viewBox="0 0 33 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M13.075 9.32936L16.5 3.90128L19.925 9.32936C20.0422 9.51516 20.1967 9.67508 20.3789 9.79915C20.5612 9.92323 20.7673 10.0088 20.9844 10.0505C21.2015 10.0923 21.425 10.0893 21.6409 10.0418C21.8568 9.99427 22.0605 9.90323 22.2393 9.77434L29.5935 4.47582L26.7693 19.1697C26.7486 19.2768 26.691 19.3734 26.6062 19.4429C26.5215 19.5125 26.415 19.5507 26.3049 19.5509H6.69693C6.58657 19.5511 6.47959 19.5131 6.39447 19.4435C6.30934 19.374 6.25141 19.2771 6.23066 19.1697L3.4065 4.47394L10.7607 9.77247C10.9395 9.90104 11.143 9.99183 11.3587 10.0392C11.5744 10.0865 11.7976 10.0894 12.0145 10.0477C12.2314 10.0059 12.4373 9.92048 12.6194 9.79658C12.8015 9.67268 12.9559 9.51301 13.0731 9.32748M17.8647 0.7507C17.7199 0.520996 17.5185 0.331565 17.2794 0.200236C17.0403 0.0689074 16.7715 0 16.4981 0C16.2247 0 15.9558 0.0689074 15.7168 0.200236C15.4777 0.331565 15.2763 0.520996 15.1315 0.7507L11.3634 6.72703L2.56115 0.384571C1.38031 -0.465972 -0.244053 0.553554 0.0307813 1.973L3.43683 19.6973C3.58156 20.4487 3.98638 21.1265 4.5815 21.6139C5.17662 22.1013 5.92476 22.3677 6.69693 22.3673H26.3049C27.0771 22.3672 27.8249 22.1003 28.4197 21.6126C29.0145 21.1248 29.4189 20.4469 29.5631 19.6955L32.9692 1.973C33.244 0.553554 31.6216 -0.467849 30.4407 0.384571L21.6365 6.72703L17.8647 0.7507ZM5.12753 25.1836C4.75051 25.1836 4.38894 25.332 4.12234 25.5961C3.85575 25.8602 3.70598 26.2183 3.70598 26.5918C3.70598 26.9653 3.85575 27.3235 4.12234 27.5876C4.38894 27.8516 4.75051 28 5.12753 28H27.8724C28.2495 28 28.611 27.8516 28.8776 27.5876C29.1442 27.3235 29.294 26.9653 29.294 26.5918C29.294 26.2183 29.1442 25.8602 28.8776 25.5961C28.611 25.332 28.2495 25.1836 27.8724 25.1836H5.12753Z"
            fill="#F8BD00"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="MockMainDashboard-content d-flex flex-column gap-2">
      <div>
        <h3>Reference Question</h3>
        <p>Manage your reference request</p>
      </div>
      <div className="d-flex justify-content-center align-items-center button-controls-question gap-5 mb-3">
        <button
          className={`btn-custome-sets ${
            activeButton === "Custom Sets" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("Custom Sets")} // Show custom sets
        >
          Custom Sets
        </button>
        <button
          className={`btn-hrhatch-formats ${
            activeButton === "HR-HATCH Formats" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("HR-HATCH Formats")} // Show HR-HATCH Formats
        >
          HR-HATCH Formats
        </button>
      </div>

      <div className="AiReference-question-container position-relative">
        {activeButton === "HR-HATCH Formats" ? (
          <>
            <div className="AiReference-table-title">
              <h4>
                <img src={logo} alt="Logo" width="125" height="19" />
                Question Formats
              </h4>
              <p>Standardized question sets provided by HR-Hatch</p>
            </div>
            <div className="d-flex justify-content-around align-items-center h-100 gap-3 hr-hatch-card-container">
              {hrHatchFormats.map((format, index) => (
                <div
                  key={index}
                  className="hr-hatch-card d-flex justify-content-center align-items-center flex-column border"
                >
                  <h5>
                    {format.title} {format.svg}
                  </h5>
                  <p>{format.description}</p>
                  <small>{format.questionCount} questions</small>
                  <br />
                  <button className="btn-view-questions mb-3">
                    View Questions
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="AiReference-table-title">
              <h4>Custom Question Sets</h4>
              <p>Your tailored reference check questions</p>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex align-items-center search-candidates">
                <div className="search-wrapper position-relative">
                  <input
                    type="text"
                    placeholder="Search request..."
                    className="form-control ps-4 pe-5"
                  />
                  <FaSearch className="search-icon position-absolute top-50 end-0 translate-middle-y" />
                </div>
              </div>
              <button
                className="btn-create-new-candidate d-flex align-items-center justify-content-center gap-1"
                onClick={() => setIsModalOpen(true)} // Open modal when clicked
              >
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 37 37"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M27.7487 20.0384H20.0404V27.7467C20.0404 28.1556 19.8779 28.5477 19.5888 28.8369C19.2997 29.126 18.9076 29.2884 18.4987 29.2884C18.0898 29.2884 17.6977 29.126 17.4086 28.8369C17.1195 28.5477 16.957 28.1556 16.957 27.7467V20.0384H9.2487C8.83982 20.0384 8.44769 19.876 8.15858 19.5869C7.86946 19.2977 7.70703 18.9056 7.70703 18.4967C7.70703 18.0879 7.86946 17.6957 8.15858 17.4066C8.44769 17.1175 8.83982 16.9551 9.2487 16.9551H16.957V9.24674C16.957 8.83787 17.1195 8.44574 17.4086 8.15662C17.6977 7.8675 18.0898 7.70508 18.4987 7.70508C18.9076 7.70508 19.2997 7.8675 19.5888 8.15662C19.8779 8.44574 20.0404 8.83787 20.0404 9.24674V16.9551H27.7487C28.1576 16.9551 28.5497 17.1175 28.8388 17.4066C29.1279 17.6957 29.2904 18.0879 29.2904 18.4967C29.2904 18.9056 29.1279 19.2977 28.8388 19.5869C28.5497 19.876 28.1576 20.0384 27.7487 20.0384Z"
                    fill="white"
                  />
                </svg>
                New Question Sets
              </button>
            </div>
            <div className="AiReference-Question-Sets-Container">
              {/* Question Set Container for Custom Sets */}
              {questionSets && questionSets.length > 0 ? (
                questionSets
                  .slice()
                  .reverse()
                  .map((item) => (
                    <div
                      key={item._id}
                      className="question-set-container border mb-3"
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="question-set-info">
                          <h5>{item.name}</h5>
                          <p className="d-flex">
                            <p className="color-orange">
                              {item.questions.length} questions
                            </p>
                            &nbsp;• Last updated: {formatDate(item.updatedAt)}
                          </p>
                        </div>
                        <div className="d-flex justify-content-end gap-5 question-controls">
                          {/* Existing Edit/Delete/Dropdown Icons */}
                          <div className="d-flex justify-content-center gap-3">
                            <a href="#">
                              <svg
                                className="icon"
                                width="29"
                                height="27"
                                viewBox="0 0 29 27"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M3.11233 19.8163L1.56641 26L7.7501 24.4541L25.6612 6.54302C26.2408 5.96321 26.5664 5.17693 26.5664 4.35708C26.5664 3.53724 26.2408 2.75096 25.6612 2.17115L25.3953 1.90525C24.8154 1.32562 24.0292 1 23.2093 1C22.3895 1 21.6032 1.32562 21.0234 1.90525L3.11233 19.8163Z"
                                  stroke="#1877F2"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M3.11233 19.8163L1.56641 26L7.7501 24.4541L23.2093 8.99488L18.5716 4.35712L3.11233 19.8163Z"
                                  fill="#1877F2"
                                />
                              </svg>
                            </a>
                            {/* <a href="#">
                              <svg
                                className="icon"
                                width="28"
                                height="30"
                                viewBox="0 0 28 30"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M5.25 30C4.2875 30 3.46384 29.6739 2.779 29.0217C2.09417 28.3694 1.75117 27.5844 1.75001 26.6667V5C1.25417 5 0.838839 4.84 0.504006 4.52C0.169173 4.2 0.0011727 3.80444 6.03447e-06 3.33333C-0.00116063 2.86222 0.166839 2.46667 0.504006 2.14667C0.841172 1.82667 1.25651 1.66667 1.75001 1.66667H8.75C8.75 1.19444 8.918 0.798889 9.254 0.48C9.59 0.161111 10.0053 0.00111111 10.5 0H17.5C17.9958 0 18.4117 0.16 18.7477 0.48C19.0837 0.8 19.2512 1.19556 19.25 1.66667H26.25C26.7458 1.66667 27.1617 1.82667 27.4977 2.14667C27.8337 2.46667 28.0012 2.86222 28 3.33333C27.9988 3.80444 27.8308 4.20055 27.496 4.52167C27.1612 4.84278 26.7458 5.00222 26.25 5V26.6667C26.25 27.5833 25.9076 28.3683 25.2227 29.0217C24.5379 29.675 23.7137 30.0011 22.75 30H5.25ZM10.5 23.3333C10.9958 23.3333 11.4118 23.1733 11.7478 22.8533C12.0838 22.5333 12.2512 22.1378 12.25 21.6667V10C12.25 9.52778 12.082 9.13222 11.746 8.81333C11.41 8.49444 10.9947 8.33444 10.5 8.33333C10.0053 8.33222 9.59 8.49222 9.254 8.81333C8.918 9.13444 8.75 9.53 8.75 10V21.6667C8.75 22.1389 8.918 22.535 9.254 22.855C9.59 23.175 10.0053 23.3344 10.5 23.3333ZM17.5 23.3333C17.9958 23.3333 18.4117 23.1733 18.7477 22.8533C19.0837 22.5333 19.2512 22.1378 19.25 21.6667V10C19.25 9.52778 19.082 9.13222 18.746 8.81333C18.41 8.49444 17.9947 8.33444 17.5 8.33333C17.0053 8.33222 16.59 8.49222 16.254 8.81333C15.918 9.13444 15.75 9.53 15.75 10V21.6667C15.75 22.1389 15.918 22.535 16.254 22.855C16.59 23.175 17.0053 23.3344 17.5 23.3333Z"
                                  fill="#686868"
                                />
                              </svg>
                            </a> */}
                            {/* Delete button */}
                            <svg
                              className="icon"
                              width="28"
                              height="30"
                              viewBox="0 0 28 30"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              onClick={() => handleDeleteQuestionSet(item._id)}
                            >
                              <path
                                d="M5.25 30C4.2875 30 3.46384 29.6739 2.779 29.0217C2.09417 28.3694 1.75117 27.5844 1.75001 26.6667V5C1.25417 5 0.838839 4.84 0.504006 4.52C0.169173 4.2 0.0011727 3.80444 6.03447e-06 3.33333C-0.00116063 2.86222 0.166839 2.46667 0.504006 2.14667C0.841172 1.82667 1.25651 1.66667 1.75001 1.66667H8.75C8.75 1.19444 8.918 0.798889 9.254 0.48C9.59 0.161111 10.0053 0.00111111 10.5 0H17.5C17.9958 0 18.4117 0.16 18.7477 0.48C19.0837 0.8 19.2512 1.19556 19.25 1.66667H26.25C26.7458 1.66667 27.1617 1.82667 27.4977 2.14667C27.8337 2.46667 28.0012 2.86222 28 3.33333C27.9988 3.80444 27.8308 4.20055 27.496 4.52167C27.1612 4.84278 26.7458 5.00222 26.25 5V26.6667C26.25 27.5833 25.9076 28.3683 25.2227 29.0217C24.5379 29.675 23.7137 30.0011 22.75 30H5.25ZM10.5 23.3333C10.9958 23.3333 11.4118 23.1733 11.7478 22.8533C12.0838 22.5333 12.2512 22.1378 12.25 21.6667V10C12.25 9.52778 12.082 9.13222 11.746 8.81333C11.41 8.49444 10.9947 8.33444 10.5 8.33333C10.0053 8.33222 9.59 8.49222 9.254 8.81333C8.918 9.13444 8.75 9.53 8.75 10V21.6667C8.75 22.1389 8.918 22.535 9.254 22.855C9.59 23.175 10.0053 23.3344 10.5 23.3333ZM17.5 23.3333C17.9958 23.3333 18.4117 23.1733 18.7477 22.8533C19.0837 22.5333 19.2512 22.1378 19.25 21.6667V10C19.25 9.52778 19.082 9.13222 18.746 8.81333C18.41 8.49444 17.9947 8.33444 17.5 8.33333C17.0053 8.33222 16.59 8.49222 16.254 8.81333C15.918 9.13444 15.75 9.53 15.75 10V21.6667C15.75 22.1389 15.918 22.535 16.254 22.855C16.59 23.175 17.0053 23.3344 17.5 23.3333Z"
                                fill="#686868"
                              />
                            </svg>
                          </div>

                          <button
                            className="dropdown-toggle-q-sets border-0"
                            onClick={() => handleSetClick(item._id)}
                          >
                            <svg
                              className={
                                flippedState[item._id] ? "dropdown-flipped" : ""
                              }
                              width="28"
                              height="17"
                              viewBox="0 0 28 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12.1349 15.5181L0.390163 3.02874L3.51196 0.0930747L13.7889 11.0216L24.7174 0.744645L27.653 3.86644L15.1636 15.6112C14.7496 16.0004 14.198 16.2092 13.63 16.1918C13.062 16.1743 12.5243 15.932 12.1349 15.5181Z"
                                fill="#686868"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      {selectedSet === item._id && (
                        <div className="dropdown-content-q-sets mt-3">
                          <p>{item.description}</p>
                          <ul>
                            {item.questions.map((question, qIndex) => (
                              <li key={qIndex}>{question}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))
              ) : (
                <div>No questions found</div>
              )}
            </div>
          </>
        )}
      </div>

      {/* AddNewSetsQuestionPopUp Modal */}
      {isModalOpen && (
        <AddNewSetsQuestionPopUp
          onClose={() => setIsModalOpen(false)} // Close modal
          reFetchUpdatedQuestions={reFetchUpdatedQuestions} // Refetch questions after adding
        />
      )}
    </div>
  );
};

export default ReferenceQuestion;
