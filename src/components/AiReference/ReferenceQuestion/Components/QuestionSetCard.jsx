import React from 'react';
import './QuestionSetCard.css';

const QuestionSetCard = ({ 
  item, 
  isSelected, 
  onToggle, 
  onEdit, 
  onDelete, 
  flippedState,
  translations 
}) => {
  const formatDate = (date) => {
    return date.split("T")[0];
  };

  return (
    <div className="question-set-container border mb-3">
      <div className="d-flex justify-content-between align-items-center">
        <div className="question-set-info">
          <h5>{item.name}</h5>
          <p className="d-flex">
            <span className="color-orange">
              {item.hrHatchCustomQuestionsFormat 
                ? item.questions.reduce((acc, group) => acc + group.questions.length, 0)
                : item.questions.length} {translations.questions}
            </span>
            &nbsp;• {translations.lastUpdated}: {formatDate(item.updatedAt)}
          </p>
        </div>
        <div className="d-flex justify-content-end gap-5 question-controls">
          <button
            className="dropdown-toggle-q-sets border-0"
            onClick={onToggle}
          >
            <svg
              className={flippedState ? "dropdown-flipped" : ""}
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
      {isSelected && (
        <div className="dropdown-content-q-sets mt-3">
          <p className="w-100 d-flex justify-content-between pb-2">
            {item.description}
            <div className="d-flex justify-content-center gap-3">
              <button className="icon-button" onClick={onEdit}>
                <svg className="icon" width="20" height="auto" viewBox="0 0 29 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.11233 19.8163L1.56641 26L7.7501 24.4541L25.6612 6.54302C26.2408 5.96321 26.5664 5.17693 26.5664 4.35708C26.5664 3.53724 26.2408 2.75096 25.6612 2.17115L25.3953 1.90525C24.8154 1.32562 24.0292 1 23.2093 1C22.3895 1 21.6032 1.32562 21.0234 1.90525L3.11233 19.8163Z" stroke="#1877F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3.11233 19.8163L1.56641 26L7.7501 24.4541L23.2093 8.99488L18.5716 4.35712L3.11233 19.8163Z" fill="#1877F2"/>
                </svg>
              </button>
              <button className="icon-button" onClick={onDelete}>
                <svg width="18" height="20" viewBox="0 0 30 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.86408 33.6667C4.93769 33.6667 4.14533 33.3368 3.48699 32.6771C2.82866 32.0174 2.4988 31.2264 2.49741 30.3042V4.5H1.45574C1.15991 4.5 0.912688 4.4 0.714077 4.2C0.515466 4 0.415466 3.75208 0.414077 3.45625C0.412688 3.16042 0.512688 2.91319 0.714077 2.71458C0.915466 2.51597 1.16269 2.41667 1.45574 2.41667H8.74741C8.74741 1.98611 8.90713 1.61111 9.22658 1.29167C9.54602 0.972222 9.92102 0.8125 10.3516 0.8125H19.6432C20.0738 0.8125 20.4488 0.972222 20.7682 1.29167C21.0877 1.61111 21.2474 1.98611 21.2474 2.41667H28.5391C28.8349 2.41667 29.0821 2.51667 29.2807 2.71667C29.4794 2.91667 29.5794 3.16458 29.5807 3.46042C29.5821 3.75625 29.4821 4.00347 29.2807 4.20208C29.0794 4.40069 28.8321 4.5 28.5391 4.5H27.4974V30.3021C27.4974 31.2271 27.1676 32.0187 26.5078 32.6771C25.8481 33.3354 25.0564 33.6653 24.1328 33.6667H5.86408Z" fill="#686868"/>
                </svg>
              </button>
            </div>
          </p>
          {item.hrHatchCustomQuestionsFormat ? (
            item.questions.map((questionData, index) => (
              <div key={index}>
                <strong>{questionData.category}</strong>
                <ul>
                  {questionData.questions.map((question, qIndex) => (
                    <li key={qIndex}>{question}</li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <ul>
              {item.questions.map((question, qIndex) => (
                <li key={qIndex}>{question}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionSetCard;
