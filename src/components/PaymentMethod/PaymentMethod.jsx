import React, { useState } from "react";
import "../../styles/PaymentMethod.css";
// payment icons
import Mastercard from "../../assets/paymentmethodicons/Mastercard.png";
import Visa from "../../assets/paymentmethodicons/Visa.png";
import AmericanExpress from "../../assets/paymentmethodicons/American Express.png";
import JCB from "../../assets/paymentmethodicons/JCB.png";
import Dinners from "../../assets/paymentmethodicons/Dinners.png";
import Stripes from "../../assets/paymentmethodicons/Stripes.png";
import Paypay from "../../assets/paymentmethodicons/Paypay.png";
import RakutenPay from "../../assets/paymentmethodicons/Rakuten Pay.png";
import Konbini from "../../assets/paymentmethodicons/Konbini.png";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";

function PaymentMethod() {
  const navigate = useNavigate();

  const handleReturnLandingPage = () => {
    navigate("/"); // This will navigate to the landing page
  };
  const paymentForms = [
    {
      name: "Pay with Mastercard",
      input: [
        { name: "Card Number", type: "text", placeholder: "1234567890123456" },
        { name: "Cardholder Name", type: "text", placeholder: "John Doe" },
        { name: "CVV", type: "text", placeholder: "123" }, // Moved CVV up
        { name: "Expiry Date", type: "text", placeholder: "MM/YY" }, // Moved Expiry Date down
      ],
    },
    {
      name: "Pay with Visa",
      input: [
        { name: "Card Number", type: "text", placeholder: "1234567890123456" },
        { name: "Cardholder Name", type: "text", placeholder: "John Doe" },
        { name: "CVV", type: "text", placeholder: "123" }, // Moved CVV up
        { name: "Expiry Date", type: "text", placeholder: "MM/YY" }, // Moved Expiry Date down
      ],
    },
    {
      name: "Pay with American Express",
      input: [
        { name: "Card Number", type: "text", placeholder: "1234567890123456" },
        { name: "Cardholder Name", type: "text", placeholder: "John Doe" },
        { name: "CVV", type: "text", placeholder: "123" }, // Moved CVV up
        { name: "Expiry Date", type: "text", placeholder: "MM/YY" }, // Moved Expiry Date down
      ],
    },
    {
      name: "Pay with JCB",
      input: [
        { name: "Card Number", type: "text", placeholder: "1234567890123456" },
        { name: "Cardholder Name", type: "text", placeholder: "John Doe" },
        { name: "CVV", type: "text", placeholder: "123" }, // Moved CVV up
        { name: "Expiry Date", type: "text", placeholder: "MM/YY" }, // Moved Expiry Date down
      ],
    },
    {
      name: "Pay with Diners",
      input: [
        { name: "Card Number", type: "text", placeholder: "1234567890123456" },
        { name: "Cardholder Name", type: "text", placeholder: "John Doe" },
        { name: "CVV", type: "text", placeholder: "123" }, // Moved CVV up
        { name: "Expiry Date", type: "text", placeholder: "MM/YY" }, // Moved Expiry Date down
      ],
    },
  ];
  const [selectedPayment, setSelectedPayment] = useState(paymentForms[1]);

  const handlePaymentChange = (paymentName) => {
    const newPayment = paymentForms.find((p) => p.name === paymentName);
    if (newPayment) setSelectedPayment(newPayment);
  };

  return (
    <>
      <div className="PaymentMethod-contentainer d-flex flex-column justify-content-center align-items-center">
        <div className="PaymentMethod-content ">
          <div className="PaymentMethod-btn-container mb-2">
            <button
              className="btn-back-to-landing d-flex gap-2 align-items-center"
              onClick={handleReturnLandingPage}
            >
              <svg
                width="27"
                height="16"
                viewBox="0 0 27 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.292893 8.70711C-0.0976314 8.31658 -0.0976315 7.68342 0.292892 7.2929L6.65685 0.928934C7.04738 0.53841 7.68054 0.538409 8.07107 0.928934C8.46159 1.31946 8.46159 1.95262 8.07107 2.34315L2.41421 8L8.07107 13.6569C8.46159 14.0474 8.46159 14.6805 8.07107 15.0711C7.68054 15.4616 7.04738 15.4616 6.65686 15.0711L0.292893 8.70711ZM27 9L1 9L1 7L27 7L27 9Z"
                  fill="white"
                />
              </svg>
              Back to Landing Page
            </button>
          </div>
          <Row className="PaymentMethod-row d-flex  justify-content-center  h-100 ">
            <Col
              md={6}
              className="PaymentMethod-col d-flex justify-content-center align-items-center flex-row "
            >
              <div className="PaymentMethod-select-payment-methods-container d-flex justify-content-start align-items-start flex-column ">
                <div className="select-payment-methods-content-header mb-3 w-100">
                  <h4 className="select-payment-methods-title">
                    Choose Your Payment Methods
                  </h4>
                </div>
                <Row className="select-payment-methods-content mb-5">
                  <div className="select-payment-methods-content-header-text w-100 d-flex flex-column">
                    <b>Credit/Debit Cards</b>
                    <small>Select your preferred card type.</small>
                  </div>
                  <div className="select-payment-methods-content-selections my-2 d-flex align-items-center justify-content-start gap-3 row-gap-4">
                    <button
                      className="payment-methods-btn box-show-044 d-flex flex-column justify-content-center align-items-center"
                      onClick={() => handlePaymentChange("Pay with Visa")}
                    >
                      <div>
                        <img src={Visa} alt="" />
                      </div>
                      VISA
                    </button>
                    <button
                      className="payment-methods-btn box-show-044 d-flex flex-column justify-content-center align-items-center"
                      onClick={() => handlePaymentChange("Pay with Mastercard")}
                    >
                      <div>
                        <img src={Mastercard} alt="" />
                      </div>
                      Mastercard
                    </button>

                    <button
                      className="payment-methods-btn box-show-044 d-flex flex-column justify-content-center align-items-center"
                      onClick={() =>
                        handlePaymentChange("Pay with American Express")
                      }
                    >
                      <div>
                        <img src={AmericanExpress} alt="" />
                      </div>
                      American Express
                    </button>
                    <button
                      className="payment-methods-btn box-show-044 d-flex flex-column justify-content-center align-items-center"
                      onClick={() => handlePaymentChange("Pay with JCB")}
                    >
                      <div>
                        <img src={JCB} alt="" />
                      </div>
                      JCB
                    </button>
                    <button
                      className="payment-methods-btn box-show-044 d-flex flex-column justify-content-center align-items-center"
                      onClick={() => handlePaymentChange("Pay with Diners")}
                    >
                      <div>
                        <img src={Dinners} alt="" />
                      </div>
                      Diners
                    </button>
                  </div>
                </Row>
                <Row className="select-payment-methods-content mb-5">
                  <div className="select-payment-methods-content-header-text w-100 d-flex flex-column">
                    <b>E-Wallets and Others</b>
                    <small>Select your preferred payment options.</small>
                  </div>
                  <div className="select-payment-methods-content-selections my-2 d-flex align-items-center justify-content-start gap-3 row-gap-4">
                    <button className="payment-methods-btn box-show-044 d-flex flex-column justify-content-center align-items-center">
                      <div>
                        <img src={Stripes} alt="" />
                      </div>
                      Stripes
                    </button>

                    <button className="payment-methods-btn box-show-044 d-flex flex-column justify-content-center align-items-center">
                      <div>
                        <img src={Paypay} alt="" />
                      </div>
                      Paypay
                    </button>

                    <button className="payment-methods-btn box-show-044 d-flex flex-column justify-content-center align-items-center">
                      <div>
                        <img className="RakutenPay" src={RakutenPay} alt="" />
                      </div>
                      Rakuten Pay
                    </button>
                    <button className="payment-methods-btn box-show-044 d-flex flex-column justify-content-center align-items-center">
                      <div>
                        <img src={Konbini} alt="" />
                      </div>
                      Konbini
                    </button>
                  </div>
                </Row>
              </div>
            </Col>
            <Col
              md={6}
              className="PaymentMethod-col d-flex justify-content-center align-items-start flex-column gap-2"
            >
              <div className="PaymentMethod-pay-form-container">
                <div className="PaymentMethod-pay-form-container-header mb-4">
                  <h4 className="PaymentMethod-pay-form-container-header-title">
                    {selectedPayment.name}
                  </h4>
                </div>
                <div className="pay-form-content-infput-field w-100 d-flex flex-column justify-content-center align-items-start">
                  <Form className="d-flex flex-column justify-content-start align-items-center">
                    {/* Card Number Field */}
                    <Form.Group className="form-group w-100 mb-3 my-0">
                      <Form.Label className="me-2" style={{ width: "150px" }}>
                        Card Number
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="1234567890123456"
                        autoComplete="off"
                        maxLength="19"
                        onInput={(e) =>
                          (e.target.value = e.target.value.replace(/\D/g, ""))
                        }
                      />
                    </Form.Group>

                    <Form.Group className="form-group w-100 mb-3 my-0">
                      <Form.Label className="me-2" style={{ width: "150px" }}>
                        Expiry Date
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="MM/YY"
                        autoComplete="off"
                        maxLength="7"
                        onInput={(e) => {
                          let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                          if (value.length > 2) {
                            value = value.slice(0, 2) + "/" + value.slice(2); // Auto-insert "/"
                          }
                          e.target.value = value.slice(0, 5); // Limit to MM/YY format
                        }}
                      />
                    </Form.Group>

                    <Form.Group className="form-group w-100 mb-3 my-0">
                      <Form.Label className="me-2" style={{ width: "150px" }}>
                        CVV
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="123"
                        autoComplete="off"
                        maxLength="3"
                        onInput={(e) =>
                          (e.target.value = e.target.value.replace(/\D/g, ""))
                        }
                      />
                    </Form.Group>

                    {/* Cardholder Name Field */}
                    <Form.Group className="form-group w-100 mb-4 my-0">
                      <Form.Label className="me-2" style={{ width: "150px" }}>
                        Cardholder Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="John Doe"
                        autoComplete="off"
                      />
                    </Form.Group>

                    <button className="btn-pay-now ">Pay Now</button>
                  </Form>
                </div>
              </div>
            </Col>
          </Row>{" "}
        </div>
      </div>
    </>
  );
}

export default PaymentMethod;
