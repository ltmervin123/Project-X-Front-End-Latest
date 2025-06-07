import React from "react";
import { Row, Col } from "react-bootstrap";
import Header from "../../components/Admin/Header";
import Sidebar from "../../components/Admin/Sidebar";
// import TranslationDropdown from "../../components/Admin/TranslationDropdown";
import "../../styles/AdminStyles/AnalyticsDashboardPage.css";

function AdminOperationAndLogPage() {
  return (
    <>
      <Header />
      <div className="MockMaindashboard-container ">
        <Row>
          <Col md={2} className="p-0 MockSidebar">
            <Sidebar />
          </Col>

          <Col md={10} className="p-3">
          {/* <TranslationDropdown /> */}
          </Col>
        </Row>
      </div>
    </>
  );
}

export default AdminOperationAndLogPage;
