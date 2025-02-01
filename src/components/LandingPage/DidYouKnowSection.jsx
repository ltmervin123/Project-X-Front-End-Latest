import React from "react";
import Bundle2Avatar from "../../assets/bundle-avatar2.png";

const DidYouKnowSection = () => {
    // Array of card data
    const cardsData = [
        {  content: "Did you know that Tracking your job application is crucial for staying organized, Specially when applying to multiple jobs?" },
        {  content: "Did you know that customizing your resume to align with the specific job you are applying for is crucial to your success?" },
        {  content: "Did you know that preparation can significantly increase your chances of passing job interviews and about 60%-75% more chances of landing your dream job?" },
        {  content: "Did you know that about 20% of employers skip reference checks for new hires? Of the 80% who conduct them, most admit they’ve reconsidered a candidate after speaking to references, and 30% have uncovered fake references. If you’re among the 20% who don’t check, it might be time to rethink your approach." },
    ];

    return (
        <div className="did-you-know-container d-flex align-items-center justify-content-center flex-column gap-3">
            <div className="d-flex align-items-center justify-content-center">
                <img src={Bundle2Avatar} alt="Did You Know Avatar" />
                <h1>DID YOU KNOW?</h1>
            </div>
            <div className="didyouknow-card-container d-flex flex-wrap justify-content-center gap-3">
                {cardsData.map((card, index) => (
                    <div
                        key={index}
                        className="card-didyouknow"
                        style={{
                            
                        }}
                    >
                        <div className="card-body" style={{ padding: "1em" }}>
                            <p className="card-text">{card.content}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="horizontal-gray-line"></div>
        </div>
    );
};

export default DidYouKnowSection;