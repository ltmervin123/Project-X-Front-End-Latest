import React from 'react';
import { Card } from 'react-bootstrap';

const interviews = [
  { category: 'INFORMATION TECHNOLOGY', type: 'UI/EX MOCK INTERVIEW', date: '10 / 28 / 24 | 10:00 A.M', result: '7.5/10' },
  { category: 'INFORMATION TECHNOLOGY', type: 'UI/EX MOCK INTERVIEW', date: '10 / 25 / 24 | 9:00 A.M ', result: '5/10' },
  { category: 'INFORMATION TECHNOLOGY', type: 'UI/EX MOCK INTERVIEW', date: '10 / 24 / 24 | 12:00 P.M', result: '8.5/10' },
];

const Summary = () => {
  return (
    <Card className="summary-card d-flex">
      <Card.Title>Summary</Card.Title>
      <Card.Text>
        Mock Interview History
        </Card.Text>
        <div className="activity-results-container d-flex">
          <div className="activity-container text-center d-flex">
            <p>Activity</p>
            {interviews.map((interview, index) => (
              <div className="activity-card" key={index}>
                <p className="category-name">{interview.category}</p>
                <p className="type-of-interview">{interview.type}</p>
                <p className="date-of-interview">{interview.date}</p>
              </div>
            ))}
          </div>
          <div className="results-container text-center d-flex">
            <p>Results</p>
            {interviews.map((interview, index) => (
              <p className='result-of-interview d-flex align-items-center' key={index}>
                {interview.result}
              </p>
            ))}
          </div>
        </div>
          <div className="subcription-reminder-container d-flex align-items-center">
            <div className="line-color-orange"></div>
            <div className="subcription-reminder-container d-flex align-items-center">
            <div className="subcription-reminder" style={{ position: 'relative' }}>
              <div className="warning">!</div>
              <p className='sub-reminder-text'>Subscription Reminder</p>
              <p className='text-center'>
                Your subscription is valid for 10 days. Be sure to make the most of it!
              </p>
            </div>
            </div>

          </div>
        <div className="summary-avatar-img-bg"></div>
      
    </Card>
  );
};

export default Summary;
