import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Header from "../../components/AiReference/Header";
import Sidebar from "../../components/AiReference/Sidebar";
import Trashbin from "../../components/AiReference/TrashBin/Trashbin";
import PopupGuide from "../../components/AiReference/PopupGuide"; // Uncomment this line
import TranslationDropdown from "../../components/AiReference/TranslationDropdown";

import "../../styles/AiReferenceStyles/AiReferenceTrashbin.css";

function AiReferenceTrashBinPage() {
    const [showGuide, setShowGuide] = useState(true);

  return (
    <>
      <Header />
      <div className="MockMaindashboard-container h-100">
        <Row>
          <Col md={2} className="p-0 MockSidebar">
            <Sidebar />
          </Col>
          <Col md={10} className="p-3">
            <Trashbin />
            <TranslationDropdown />
          </Col>
        </Row>
      </div>
      {showGuide && <PopupGuide introKey="trashbin" />}{" "}
    </>
  );
}

export default AiReferenceTrashBinPage;
