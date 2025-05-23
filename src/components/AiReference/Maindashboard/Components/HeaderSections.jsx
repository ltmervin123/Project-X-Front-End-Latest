import { Row, Col } from "react-bootstrap";

export default function HeaderSections({
  labels,
  setAddJob,
  isStartReferenceCheckVisible,
}) {
  return (
    <>
      <div>
        <h3 className="mb-0">{labels.Dashboard}</h3>
        <p className="mb-2">{labels.ManageTrackResponse} </p>
      </div>
      <div className="d-flex justify-content-start mb-3 w-100">
        <Row className="w-100">
          <Col
            md={6}
            className={`start-reference-check-container fade-in ${
              isStartReferenceCheckVisible ? "visible" : ""
            }`}
          >
            <button
              className="btn-start-reference-check d-flex align-items-center justify-content-center px-4 gap-3 "
              onClick={setAddJob}
            >
              {labels.StartReferenceCheck}{" "}
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.39847 2.59891C9.611 2.38645 9.89922 2.26709 10.1997 2.26709C10.5003 2.26709 10.7885 2.38645 11.001 2.59891L16.101 7.69891C16.3135 7.91145 16.4328 8.19966 16.4328 8.50018C16.4328 8.8007 16.3135 9.08892 16.101 9.30145L11.001 14.4014C10.7873 14.6079 10.501 14.7221 10.2038 14.7195C9.90666 14.717 9.62241 14.5978 9.41228 14.3876C9.20215 14.1775 9.08296 13.8933 9.08038 13.5961C9.07779 13.2989 9.19203 13.0127 9.39847 12.7989L12.4664 9.63351H1.69974C1.39916 9.63351 1.11089 9.51411 0.898352 9.30157C0.685811 9.08903 0.566406 8.80076 0.566406 8.50018C0.566406 8.1996 0.685811 7.91133 0.898352 7.69879C1.11089 7.48625 1.39916 7.36685 1.69974 7.36685H12.4664L9.39847 4.20145C9.18601 3.98892 9.06665 3.7007 9.06665 3.40018C9.06665 3.09966 9.18601 2.81145 9.39847 2.59891Z"
                  fill="white"
                />
              </svg>
            </button>
            <i className="w-100 text-center my-1">" {labels.ClickToStart} "</i>
          </Col>
          <Col md={6} className="p-0"></Col>
        </Row>
      </div>
    </>
  );
}
