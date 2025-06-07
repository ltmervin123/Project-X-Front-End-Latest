import React from "react";
import { Row, Col, Carousel } from "react-bootstrap";
import KeyInsights from "../../assets/snappchecklanding/key-insights.svg";
import { useSnappcheckTranslation } from './hooks/snappcheckTranslation';

const KeyInsightsSection = () => {
    const { t, language } = useSnappcheckTranslation();

    const insights = [
        {
            title: t('keyInsightsTitle1'),
            content: t('keyInsightsContent1')
        },
        {
            title: t('keyInsightsTitle2'),
            content: t('keyInsightsContent2')
        },
        {
            title: t('keyInsightsTitle3'),
            content: t('keyInsightsContent3')
        },
        {
            title: t('keyInsightsTitle4'),
            content: t('keyInsightsContent4')
        },
        {
            title: t('keyInsightsTitle5'),
            content: t('keyInsightsContent5')
        }
    ];

    return (
        <section
        id="key-insights"
        className="snappcheck-key-insights-container d-flex align-items-center w-100">
            <Row className="w-100 snappcheck-left-content">
                <Col md={6}>
                    <h3 className="color-grey mb-2">{t('keyInsights')}</h3>
                    <h2 className="mb-4">
                        {language === 'English' ? (
                            t('referenceChecksHelpsUncover').split('Helps Uncover Blind Spots').map((part, index, array) => (
                                <React.Fragment key={index}>
                                    {part}
                                    {index < array.length - 1 && <span className="color-orange">Helps Uncover Blind Spots</span>}
                                </React.Fragment>
                            ))
                        ) : (
                            t('referenceChecksHelpsUncover').split('見落としを発見').map((part, index, array) => (
                                <React.Fragment key={index}>
                                    {part}
                                    {index < array.length - 1 && <span className="color-orange">見落としを発見</span>}
                                </React.Fragment>
                            ))
                        )}
                    </h2>
                </Col>
                <Col md={6}>
                </Col>

                <Row className="align-items-center w-100 p-0 pb-5">
                    <Col md={6} className="mb-4 mb-md-0">
                        <img
                            src={KeyInsights}
                            alt={t('keyInsights')}
                            className="rounded m-0"
                        />
                    </Col>

                    <Col md={6}>
                        <Carousel
                            indicators={true}
                            controls={true}
                            interval={5000}
                            className="key-insights-carousel"
                        >
                            {insights.map((insight, index) => (
                                <Carousel.Item key={index}>
                                    <div className="key-insight-card">
                                        <h4>{insight.title}</h4>
                                        <p>{insight.content}</p>
                                    </div>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </Col>
                </Row>
            </Row>
        </section>
    );
};

export default KeyInsightsSection; 