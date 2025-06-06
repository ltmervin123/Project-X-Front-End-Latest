import React from "react";
import { Row, Col } from "react-bootstrap";
import { useSnappcheckTranslation } from "./hooks/snappcheckTranslation";

// WhySnappCheckSection functional component
const WhySnappCheckSection = () => {
    const { t, language } = useSnappcheckTranslation();

    const renderTitle = () => {
        const title = t('whySnappCheckTitle');
        const highlight = t('whySnappCheckTitleHighlight');
        
        if (title.includes(highlight)) {
            const parts = title.split(highlight);
            return (
                <>
                    {parts[0]}
                    <span className="color-orange">{highlight}</span>
                    {parts[1]}
                </>
            );
        }
        return title;
    };

    return (
        <>
            {/* Hero Section Container */}
            <section
                id="why-snappcheck"
                className={
                    "snappcheck-did-you-know-container d-flex align-items-center  w-100 "
                }
            >
                <Row className="w-100  snappcheck-left-content">
                <h3 className="color-grey mb-2">{t('whySnappCheck')}</h3>

                    <Col md="6">
                        <h2 className="mb-4">{renderTitle()}</h2>
                    </Col>
                    <Col md="6" >
                        
                    </Col>
                    <div className="why-snappcheck-card-container d-flex justify-content-between gap-4 mt-4">
                        <div className="why-snappcheck-card d-flex flex-column justify-content-between p-4 rounded-3 shadow-sm">
                            <h4 className="mb-3">{t('aiPoweredAnalysis')}</h4>
                            <p>{t('aiPoweredAnalysisDesc')}</p>
                        </div>
                        <div className="why-snappcheck-card d-flex flex-column justify-content-between p-4 rounded-3 shadow-sm">
                            <h4 className="mb-3">{t('culturalFitMatching')}</h4>
                            <p>{t('culturalFitMatchingDesc')}</p>
                        </div>
                        <div className="why-snappcheck-card d-flex flex-column justify-content-between p-4 rounded-3 shadow-sm">
                            <h4 className="mb-3">{t('fasterHiring')}</h4>
                            <p>{t('fasterHiringDesc')}</p>
                        </div>
                    </div>
                </Row>
            </section>
        </>
    );
};

// Exporting WhySnappCheckSection component
export default WhySnappCheckSection;
