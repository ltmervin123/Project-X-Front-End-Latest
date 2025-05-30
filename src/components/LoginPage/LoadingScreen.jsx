import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import loading from "../../assets/loading.gif";
import { useSnappcheckTranslation } from "./Hooks/useTranslation";

const LoadingScreen = () => {
  const { t } = useSnappcheckTranslation();

  return (
    <Modal show={true} centered backdrop={true}>
      <Modal.Body className="text-center py-5 px-0">
        <img className="loadinganimation" src={loading} alt={t('LOADING')} />
        <span className="visually-hidden loading" style={{ color: "#f46a05" }}>
          {t('LOADING')}
        </span>

        <h4>{t('LOGGING_IN_MESSAGE')}</h4>
      </Modal.Body>
    </Modal>
  );
};

export default LoadingScreen;
