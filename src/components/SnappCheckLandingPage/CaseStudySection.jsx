import React from "react";
import { Row, Carousel } from "react-bootstrap";
import { useSnappcheckTranslation } from './hooks/snappcheckTranslation';

const CaseStudySection = () => {
  const { t } = useSnappcheckTranslation();

  const testimonials = [
    {
      title: t('testimonial1Title'),
      content: t('testimonial1Content'),
      author: t('testimonial1Author'),
    },
    {
      title: t('testimonial2Title'),
      content: t('testimonial2Content'),
      author: t('testimonial2Author'),
    },
    {
      title: t('testimonial3Title'),
      content: t('testimonial3Content'),
      author: t('testimonial3Author'),
    },
  ];

  // Group testimonials into pairs
  const testimonialPairs = [];
  for (let i = 0; i < testimonials.length; i += 2) {
    testimonialPairs.push(testimonials.slice(i, i + 2));
  }

  return (
    <>
      {/* Hero Section Container */}
      <section
        id="case-study"
        className={
          "snappcheck-about-us-container d-flex align-items-center  w-100 "
        }
      >
        <Row className="w-100  snappcheck-left-content">
          <h2 className="mb-4">{t('caseStudyTitle')}</h2>
          <div className="d-flex justify-content-center">
          <Carousel
            indicators={false}
            controls={true}
            interval={5000}
            className="testimonial-carousel"
          >
            {testimonialPairs.map((pair, index) => (
              <Carousel.Item key={index}>
                <div className={`testimonial-container d-flex gap-4 ${pair.length === 1 ? 'justify-content-start' : 'justify-content-center'}`}>
                  {pair.map((testimonial, testimonialIndex) => (
                    <div key={testimonialIndex} className="testemony-card flex-grow-1">
                      <b className="color-blue">{testimonial.title}</b>
                      <div className="d-flex gap-2 mt-3">
                        <svg
                          width="30"
                          height="15"
                          viewBox="0 0 20 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.69729 2.0272C3.10029 0.681923 5.22329 0 8.00629 0H9.00629V2.49331L8.20229 2.63571C6.83229 2.87805 5.87929 3.35478 5.36929 4.05439C5.1031 4.43125 4.95217 4.86282 4.93129 5.3068H8.00629C8.2715 5.3068 8.52586 5.39998 8.71339 5.56585C8.90093 5.73172 9.00629 5.95669 9.00629 6.19126V12.3825C9.00629 13.3581 8.10929 14.1515 7.00629 14.1515H1.00629C0.741071 14.1515 0.486717 14.0583 0.299181 13.8924C0.111645 13.7265 0.00628783 13.5016 0.00628783 13.267V8.84466L0.00928785 6.2629C0.000287852 6.16473 -0.189712 3.83858 1.69729 2.0272ZM18.0063 14.1515H12.0063C11.7411 14.1515 11.4867 14.0583 11.2992 13.8924C11.1116 13.7265 11.0063 13.5016 11.0063 13.267V8.84466L11.0093 6.2629C11.0003 6.16473 10.8103 3.83858 12.6973 2.0272C14.1003 0.681923 16.2233 0 19.0063 0H20.0063V2.49331L19.2023 2.63571C17.8323 2.87805 16.8793 3.35478 16.3693 4.05439C16.1031 4.43125 15.9522 4.86282 15.9313 5.3068H19.0063C19.2715 5.3068 19.5259 5.39998 19.7134 5.56585C19.9009 5.73172 20.0063 5.95669 20.0063 6.19126V12.3825C20.0063 13.3581 19.1093 14.1515 18.0063 14.1515Z"
                            fill="#F46A05"
                          />
                        </svg>
                        <p>{testimonial.content}</p>
                      </div>
                      <b className="testimonial-company">{testimonial.author}</b>
                    </div>
                  ))}
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
          </div>
    
        </Row>
      </section>
    </>
  );
};

// Exporting CaseStudySection component
export default CaseStudySection;
