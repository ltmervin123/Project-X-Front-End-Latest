import { FaSearch, FaEdit } from "react-icons/fa";

const CustomQuestion = ({
  TRANSLATIONS,
  language,
  showTooltip,
  searchQuery,
  setSearchQuery,
  setIsModalOpen,
  setIsHRHatchFormatPopupOpen,
  questionSets,
  formatDate,
  handleSetClick,
  flippedState,
  selectedSet,
  setSelectedQuestionSet,
  setIsEditModalOpen,
  setSelectedQuestionSetId,
  setIsDeleteModalOpen,
  setShowTooltip,
}) => {
  return (
    <>
      <div className="d-flex justify-content-between">
        <div>
          <div className="AiReference-table-title">
            <h4 className="mb-0 d-flex gap-2 align-items-center">
              {TRANSLATIONS[language].customQuestionnaire}
              <div className="position-relative d-flex">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <path
                    d="M9 11C9 11.2652 8.89464 11.5196 8.70711 11.7071C8.51957 11.8946 8.26522 12 8 12C7.73478 12 7.48043 11.8946 7.29289 11.7071C7.10536 11.5196 7 11.2652 7 11C7 10.7348 7.10536 10.4804 7.29289 10.2929C7.48043 10.1054 7.73478 10 8 10C8.26522 10 8.51957 10.1054 8.70711 10.2929C8.89464 10.4804 9 10.7348 9 11ZM7.5 4C6.83696 4 6.20107 4.26339 5.73223 4.73223C5.26339 5.20107 5 5.83696 5 6.5H7C7 6.36739 7.05268 6.24021 7.14645 6.14645C7.24021 6.05268 7.36739 6 7.5 6H8.146C8.2321 6.00004 8.31566 6.02917 8.38313 6.08265C8.45061 6.13614 8.49803 6.21086 8.51771 6.29468C8.53739 6.3785 8.52818 6.46651 8.49156 6.54444C8.45495 6.62237 8.39309 6.68564 8.316 6.724L7 7.382V9H9V8.618L9.211 8.512C9.69063 8.27189 10.0752 7.87692 10.3024 7.39105C10.5296 6.90517 10.5862 6.35683 10.463 5.8348C10.3398 5.31276 10.044 4.8476 9.62346 4.51461C9.20296 4.18162 8.68238 4.0003 8.146 4H7.5Z"
                    fill="#F46A05"
                  />
                  <path
                    d="M0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8ZM8 2C7.21207 2 6.43185 2.15519 5.7039 2.45672C4.97595 2.75825 4.31451 3.20021 3.75736 3.75736C3.20021 4.31451 2.75825 4.97595 2.45672 5.7039C2.15519 6.43185 2 7.21207 2 8C2 8.78793 2.15519 9.56815 2.45672 10.2961C2.75825 11.0241 3.20021 11.6855 3.75736 12.2426C4.31451 12.7998 4.97595 13.2417 5.7039 13.5433C6.43185 13.8448 7.21207 14 8 14C9.5913 14 11.1174 13.3679 12.2426 12.2426C13.3679 11.1174 14 9.5913 14 8C14 6.4087 13.3679 4.88258 12.2426 3.75736C11.1174 2.63214 9.5913 2 8 2Z"
                    fill="#F46A05"
                  />
                </svg>
                {showTooltip && (
                  <span className="job-tooltip-text">
                    {TRANSLATIONS[language].manageTrackQuestions}
                  </span>
                )}
              </div>
            </h4>
            <p className="mb-1">
              {TRANSLATIONS[language].yourTailoredQuestions}
            </p>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex align-items-center search-candidate">
              <div className="search-wrapper position-relative">
                <input
                  type="text"
                  placeholder={TRANSLATIONS[language].searchQuestionSets}
                  className="form-control ps-4 pe-5"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} // Add this line
                />
                <FaSearch className="search-icon position-absolute top-50 end-0 translate-middle-y" />
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex flex-column gap-3 justify-content-center">
          <button
            className="btn-create-new-candidate d-flex align-items-center justify-content-center gap-1"
            onClick={() => setIsModalOpen(true)} // Open modal when clicked
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 37 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M27.7487 20.0384H20.0404V27.7467C20.0404 28.1556 19.8779 28.5477 19.5888 28.8369C19.2997 29.126 18.9076 29.2884 18.4987 29.2884C18.0898 29.2884 17.6977 29.126 17.4086 28.8369C17.1195 28.5477 16.957 28.1556 16.957 27.7467V20.0384H9.2487C8.83982 20.0384 8.44769 19.876 8.15858 19.5869C7.86946 19.2977 7.70703 18.9056 7.70703 18.4967C7.70703 18.0879 7.86946 17.6957 8.15858 17.4066C8.44769 17.1175 8.83982 16.9551 9.2487 16.9551H16.957V9.24674C16.957 8.83787 17.1195 8.44574 17.4086 8.15662C17.6977 7.8675 18.0898 7.70508 18.4987 7.70508C18.9076 7.70508 19.2997 7.8675 19.5888 8.15662C19.8779 8.44574 20.0404 8.83787 20.0404 9.24674V16.9551H27.7487C28.1576 16.9551 28.5497 17.1175 28.8388 17.4066C29.1279 17.6957 29.2904 18.0879 29.2904 18.4967C29.2904 18.9056 29.1279 19.2977 28.8388 19.5869C28.5497 19.876 28.1576 20.0384 27.7487 20.0384Z"
                fill="white"
              />
            </svg>
            {TRANSLATIONS[language].createYourOwnQuestionnaire}
          </button>
          {/* New Button for Editing HR-Hatch Formats */}
          <button
            className="btn-edit-hr-hatch-formats d-flex align-items-center justify-content-center gap-1"
            onClick={() => setIsHRHatchFormatPopupOpen(true)} // Open the HR-Hatch Format popup
          >
            <FaEdit />
            {TRANSLATIONS[language].customizeHRHatchFormat}
          </button>
        </div>
      </div>

      <div className="AiReference-Question-Sets-Container">
        {questionSets.length > 0 &&
          questionSets
            .filter((item) =>
              item.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((item) =>
              item.hrHatchCustomQuestionsFormat ? (
                <div className="question-set-container border mb-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="question-set-info">
                      <h5>{item.name}</h5>
                      <p className="d-flex">
                        <span className="color-orange">
                          {item.questions.reduce(
                            (acc, group) => acc + group.questions.length,
                            0
                          )}{" "}
                          {TRANSLATIONS[language].questions}
                        </span>
                        &nbsp;• {TRANSLATIONS[language].lastUpdated}:{" "}
                        {formatDate(item.updatedAt)}
                      </p>
                    </div>
                    <div className="d-flex justify-content-end gap-5 question-controls">
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
                      <p className="w-100 d-flex justify-content-between pb-2">
                        {item.description}{" "}
                        <div className="d-flex justify-content-center gap-3">
                          <svg
                            className="icon"
                            width="20"
                            height="auto"
                            viewBox="0 0 29 27"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={() => {
                              setSelectedQuestionSet(item);
                              setIsEditModalOpen(true);
                            }}
                          >
                            <path
                              d="M3.11233 19.8163L1.56641 26L7.7501 24.4541L25.6612 6.54302C26.2408 5.96321 26.5664 5.17693 26.5664 4.35708C26.5664 3.53724 26.2408 2.75096 25.6612 2.17115L25.3953 1.90525C24.8154 1.32562 24.0292 1 23.2093 1C22.3895 1 21.6032 1.32562 21.0234 1.90525L3.11233 19.8163Z"
                              stroke="#1877F2"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M3.11233 19.8163L1.56641 26L7.7501 24.4541L23.2093 8.99488L18.5716 4.35712L3.11233 19. 8163Z"
                              fill="#1877F2"
                            />
                          </svg>

                          <svg
                            width="18"
                            height="20"
                            viewBox="0 0 30 34"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={() => {
                              setSelectedQuestionSetId(item._id);
                              setIsDeleteModalOpen(true);
                            }}
                          >
                            <path
                              d="M5.86408 33.6667C4.93769 33.6667 4.14533 33.3368 3.48699 32.6771C2.82866 32.0174 2.4988 31.2264 2.49741 30.3042V4.5H1.45574C1.15991 4.5 0.912688 4.4 0.714077 4.2C0.515466 4 0.415466 3.75208 0.414077 3.45625C0.412688 3.16042 0.512688 2.91319 0.714077 2.71458C0.915466 2.51597 1.16269 2.41667 1.45574 2.41667H8.74741C8.74741 1.98611 8.90713 1.61111 9.22658 1.29167C9.54602 0.972222 9.92102 0.8125 10.3516 0.8125H19.6432C20.0738 0.8125 20.4488 0.972222 20.7682 1.29167C21.0877 1.61111 21.2474 1.98611 21.2474 2.41667H28.5391C28.8349 2.41667 29.0821 2.51667 29.2807 2.71667C29.4794 2.91667 29.5794 3.16458 29.5807 3.46042C29.5821 3.75625 29.4821 4.00347 29.2807 4.20208C29.0794 4.40069 28.8321 4.5 28.5391 4.5H27.4974V30.3021C27.4974 31.2271 27.1676 32.0187 26.5078 32.6771C25.8481 33.3354 25.0564 33.6653 24.1328 33.6667H5.86408ZM25.4141 4.5H4.58074V30.3021C4.58074 30.6757 4.70088 30.9826 4.94116 31.2229C5.18144 31.4632 5.48908 31.5833 5.86408 31.5833H24.1328C24.5064 31.5833 24.8134 31.4632 25.0537 31.2229C25.2939 30.9826 25.4141 30.6757 25.4141 30.3021V4.5ZM11.4724 27.4167C11.7682 27.4167 12.0162 27.3167 12.2162 27.1167C12.4162 26.9167 12.5155 26.6694 12.5141 26.375V9.70833C12.5141 9.4125 12.4141 9.16528 12.2141 8.96667C12.0141 8.76806 11.7662 8.66806 11.4703 8.66667C11.1745 8.66528 10.9273 8.76528 10.7287 8.96667C10.53 9.16806 10.4307 9.41528 10.4307 9.70833V26.375C10.4307 26.6708 10.5307 26.9181 10.7307 27.1167C10.9307 27.3167 11.178 27.4167 11.4724 27.4167ZM18.5245 27.4167C18.8203 27.4167 19.0675 27.3167 19.2662 27.1167C19.4648 26.9167 19.5641 26.6694 19.5641 26.375V9.70833C19.5641 9.4125 19.4641 9.16528 19.2641 8.96667C19.0641 8.76667 18.8169 8.66667 18.5224 8.66667C18.2266 8.66667 17.9787 8.76667 17.7787 8.96667C17.5787 9.16667 17.4794 9.41389 17.4807 9.70833V26.375C17.4807 26.6708 17.5807 26.9181 17.7807 27.1167C17.9807 27.3153 18.2287 27.4153 18.5245 27.4167Z"
                              fill="#686868"
                            />
                          </svg>
                        </div>
                      </p>

                      {item.questions.map((questionData, index) => (
                        <div key={index}>
                          <strong>{questionData.category}</strong>
                          <ul>
                            {questionData.questions.map((question, qIndex) => (
                              <li key={qIndex}>{question}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div
                  key={item._id}
                  className={`question-set-container border mb-3`}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="question-set-info">
                      <h5>{item.name}</h5>
                      <p className="d-flex">
                        <span className="color-orange">
                          {item.questions.length}{" "}
                          {TRANSLATIONS[language].questions}
                        </span>
                        &nbsp;• {TRANSLATIONS[language].lastUpdated}:{" "}
                        {formatDate(item.updatedAt)}
                      </p>
                    </div>
                    <div className="d-flex justify-content-end gap-5 question-controls">
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
                      <p className="w-100 d-flex justify-content-between pb-2">
                        {item.description}{" "}
                        <div className="d-flex justify-content-center gap-3">
                          <svg
                            className="icon"
                            width="20"
                            height="auto"
                            viewBox="0 0 29 27"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={() => {
                              setSelectedQuestionSet(item);
                              setIsEditModalOpen(true);
                            }}
                          >
                            <path
                              d="M3.11233 19.8163L1.56641 26L7.7501 24.4541L25.6612 6.54302C26.2408 5.96321 26.5664 5.17693 26.5664 4.35708C26.5664 3.53724 26.2408 2.75096 25.6612 2.17115L25.3953 1.90525C24.8154 1.32562 24.0292 1 23.2093 1C22.3895 1 21.6032 1.32562 21.0234 1.90525L3.11233 19.8163Z"
                              stroke="#1877F2"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M3.11233 19.8163L1.56641 26L7.7501 24.4541L23.2093 8.99488L18.5716 4.35712L3.11233 19. 8163Z"
                              fill="#1877F2"
                            />
                          </svg>

                          <svg
                            width="18"
                            height="20"
                            viewBox="0 0 30 34"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={() => {
                              setSelectedQuestionSetId(item._id);
                              setIsDeleteModalOpen(true);
                            }}
                          >
                            <path
                              d="M5.86408 33.6667C4.93769 33.6667 4.14533 33.3368 3.48699 32.6771C2.82866 32.0174 2.4988 31.2264 2.49741 30.3042V4.5H1.45574C1.15991 4.5 0.912688 4.4 0.714077 4.2C0.515466 4 0.415466 3.75208 0.414077 3.45625C0.412688 3.16042 0.512688 2.91319 0.714077 2.71458C0.915466 2.51597 1.16269 2.41667 1.45574 2.41667H8.74741C8.74741 1.98611 8.90713 1.61111 9.22658 1.29167C9.54602 0.972222 9.92102 0.8125 10.3516 0.8125H19.6432C20.0738 0.8125 20.4488 0.972222 20.7682 1.29167C21.0877 1.61111 21.2474 1.98611 21.2474 2.41667H28.5391C28.8349 2.41667 29.0821 2.51667 29.2807 2.71667C29.4794 2.91667 29.5794 3.16458 29.5807 3.46042C29.5821 3.75625 29.4821 4.00347 29.2807 4.20208C29.0794 4.40069 28.8321 4.5 28.5391 4.5H27.4974V30.3021C27.4974 31.2271 27.1676 32.0187 26.5078 32.6771C25.8481 33.3354 25.0564 33.6653 24.1328 33.6667H5.86408ZM25.4141 4.5H4.58074V30.3021C4.58074 30.6757 4.70088 30.9826 4.94116 31.2229C5.18144 31.4632 5.48908 31.5833 5.86408 31.5833H24.1328C24.5064 31.5833 24.8134 31.4632 25.0537 31.2229C25.2939 30.9826 25.4141 30.6757 25.4141 30.3021V4.5ZM11.4724 27.4167C11.7682 27.4167 12.0162 27.3167 12.2162 27.1167C12.4162 26.9167 12.5155 26.6694 12.5141 26.375V9.70833C12.5141 9.4125 12.4141 9.16528 12.2141 8.96667C12.0141 8.76806 11.7662 8.66806 11.4703 8.66667C11.1745 8.66528 10.9273 8.76528 10.7287 8.96667C10.53 9.16806 10.4307 9.41528 10.4307 9.70833V26.375C10.4307 26.6708 10.5307 26.9181 10.7307 27.1167C10.9307 27.3167 11.178 27.4167 11.4724 27.4167ZM18.5245 27.4167C18.8203 27.4167 19.0675 27.3167 19.2662 27.1167C19.4648 26.9167 19.5641 26.6694 19.5641 26.375V9.70833C19.5641 9.4125 19.4641 9.16528 19.2641 8.96667C19.0641 8.76667 18.8169 8.66667 18.5224 8.66667C18.2266 8.66667 17.9787 8.76667 17.7787 8.96667C17.5787 9.16667 17.4794 9.41389 17.4807 9.70833V26.375C17.4807 26.6708 17.5807 26.9181 17.7807 27.1167C17.9807 27.3153 18.2287 27.4153 18.5245 27.4167Z"
                              fill="#686868"
                            />
                          </svg>
                        </div>
                      </p>
                      <ul>
                        {item.questions.map((question, qIndex) => (
                          <li key={qIndex}>{question}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )
            )}
        {questionSets.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        ).length === 0 && <b>No questions found</b>}
      </div>
    </>
  );
};

export default CustomQuestion;
