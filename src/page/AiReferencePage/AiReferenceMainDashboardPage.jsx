import { Row, Col } from "react-bootstrap";
import Header from "../../components/AiReference/Header";
import Sidebar from "../../components/AiReference/Sidebar";
import PopupGuide from "../../components/AiReference/PopupGuide";
import Maindashboard from "../../components/AiReference/Maindashboard/Maindashboard";
import TranslationDropdown from "../../components/AiReference/TranslationDropdown";
import "../../styles/AiReferenceStyles/AiReferenceMaindashboard.css";

function AiReferenceMainDashboardPage() {
  const isAuthenticated = sessionStorage.getItem("authenticated") || false;

  return (
    <>
      <Header />
      <div className="MockMaindashboard-container ">
        <Row>
          <Col md={2} className="p-0 MockSidebar">
            <Sidebar />
          </Col>
          <Col md={10} className="p-3">
            <Maindashboard />
            <TranslationDropdown />
          </Col>
        </Row>
      </div>
      {isAuthenticated && <PopupGuide introKey="mainDashboard" />}
    </>
  );
}

export default AiReferenceMainDashboardPage;
