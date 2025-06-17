import { useState } from "react";
import { Modal, Row, Col, Form } from "react-bootstrap";
import IntlTelInput from "intl-tel-input/react";
import "intl-tel-input/build/css/intlTelInput.css";
import Paypay from "../../../../assets/aireferencechecker/paypay.svg";
import Rakuten from "../../../../assets/aireferencechecker/rakuten.svg";
import Konbini from "../../../../assets/aireferencechecker/konbini.svg";
import PurchaseConfirmationPopUp from "./PurchaseConfirmationPopUp";

import "../../../../styles/AiReferenceStyles/AddCreditsPopUp.css";

const TRANSLATIONS = {
  English: {
    addCredits: "Add Credits to Your Account",
    currentBalance: "Current Balance",
    availableCredits: "Available reference check credits",
    remainingCredits: "Remaining credits",
    addCreditsLabel: "Add Credits",
    paymentMethod: "Payment Method",
    creditDebitCard: "Credit/Debit Card",
    supportedCards: "Stripes, Visa, Mastercard, American Express",
    eWalletsOther: "E-wallets & Other",
    supportedWallets: "Paypay, Rakuten Pay, Konbini",
    cardNumber: "Card Number",
    expiryDate: "Expiry Date",
    cvv: "CVV",
    cardholderName: "Cardholder Name",
    payWithPaypay: "Pay with Paypay",
    payWithRakuten: "Pay with Rakuten pay",
    payWithKonbini: "Pay with Konbini",
    paypayPhone: "PayPay Registered Phone Number",
    rakutenEmail: "Rakuten Account Email",
    phoneNumber: "Phone Number",
    fullName: "Full Name (as on ID)",
    emailForCode: "Email for Payment Code",
    preferredStore: "Preferred Convenience Store",
    transactionSummary: "Transaction Summary",
    currentCredits: "Current Credits",
    creditsToAdd: "Credits to Add",
    newCreditBalance: "New Credit Balance",
    cancel: "Cancel",
    purchaseCredits: "Purchase Credits",
    securePayment: "Secure Payment",
    securePaymentNotice:
      "Your payment information is encrypted and secure. We use industry-standard SSL encryption to protect your data.",
    credits: "credits",
  },
  Japanese: {
    addCredits: "アカウントにクレジットを追加",
    currentBalance: "現在の残高",
    availableCredits: "利用可能な照会チェッククレジット",
    remainingCredits: "残りのクレジット",
    addCreditsLabel: "クレジットを追加",
    paymentMethod: "支払方法",
    creditDebitCard: "クレジット/デビットカード",
    supportedCards: "Stripes、Visa、Mastercard、American Express",
    eWalletsOther: "電子マネー＆その他",
    supportedWallets: "PayPay、楽天ペイ、コンビニ",
    cardNumber: "カード番号",
    expiryDate: "有効期限",
    cvv: "セキュリティコード",
    cardholderName: "カード名義人",
    payWithPaypay: "PayPayで支払う",
    payWithRakuten: "楽天ペイで支払う",
    payWithKonbini: "コンビニで支払う",
    paypayPhone: "PayPay登録電話番号",
    rakutenEmail: "楽天アカウントメール",
    phoneNumber: "電話番号",
    fullName: "氏名（身分証明書通り）",
    emailForCode: "支払いコード用メール",
    preferredStore: "希望のコンビニ",
    transactionSummary: "取引概要",
    currentCredits: "現在のクレジット",
    creditsToAdd: "追加するクレジット",
    newCreditBalance: "新しいクレジット残高",
    cancel: "キャンセル",
    purchaseCredits: "クレジットを購入",
    securePayment: "安全な支払い",
    securePaymentNotice:
      "お客様の支払い情報は暗号化され、安全に保護されています。業界標準のSSL暗号化を使用してデータを保護しています。",
    credits: "クレジット",
  },
};

const AddCreditsPopUp = ({ onClose, currentBalance = 0 }) => {
  const language = sessionStorage.getItem("preferred-language") || "English";
  const [creditsToAdd, setCreditsToAdd] = useState(5);
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState({
    card: false,
    other: false,
  });
  const [activeWallet, setActiveWallet] = useState("paypay");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethods((prev) => ({
      ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}),
      [method]: !prev[method],
    }));
  };

  const handlePurchaseCredits = () => {
    setShowConfirmation(true);
  };

  const handleConfirmPurchase = () => {
    console.log("Purchase confirmed:", creditsToAdd);
    setShowConfirmation(false);
    onClose();
  };

  return (
    <>
      <Modal
        show={true}
        centered
        backdrop="static"
        className="custom-modal-add-credits"
        keyboard={false}
      >
        <Modal.Body>
          <Form onSubmit={(e) => e.preventDefault()}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="mb-0 d-flex gap-2 align-items-center justify-content-center" style={{ fontSize: "18px" }}>
                <div className="job-icon">
                  <svg
                    width="14"
                    height="10"
                    viewBox="0 0 14 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.5 0C1.10218 0 0.720644 0.158035 0.43934 0.43934C0.158035 0.720644 0 1.10218 0 1.5V2H14V1.5C14 1.10218 13.842 0.720644 13.5607 0.43934C13.2794 0.158035 12.8978 0 12.5 0H1.5Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14 4H0V8.5C0 8.89782 0.158035 9.27936 0.43934 9.56066C0.720644 9.84196 1.10218 10 1.5 10H12.5C12.8978 10 13.2794 9.84196 13.5607 9.56066C13.842 9.27936 14 8.89782 14 8.5V4ZM2 7.25C2 7.05109 2.07902 6.86032 2.21967 6.71967C2.36032 6.57902 2.55109 6.5 2.75 6.5H3.25C3.44891 6.5 3.63968 6.57902 3.78033 6.71967C3.92098 6.86032 4 7.05109 4 7.25C4 7.44891 3.92098 7.63968 3.78033 7.78033C3.63968 7.92098 3.44891 8 3.25 8H2.75C2.55109 8 2.36032 7.92098 2.21967 7.78033C2.07902 7.63968 2 7.44891 2 7.25ZM5.75 6.5C5.55109 6.5 5.36032 6.57902 5.21967 6.71967C5.07902 6.86032 5 7.05109 5 7.25C5 7.44891 5.07902 7.63968 5.21967 7.78033C5.36032 7.92098 5.55109 8 5.75 8H8.25C8.44891 8 8.63968 7.92098 8.78033 7.78033C8.92098 7.63968 9 7.44891 9 7.25C9 7.05109 8.92098 6.86032 8.78033 6.71967C8.63968 6.57902 8.44891 6.5 8.25 6.5H5.75Z"
                      fill="white"
                    />
                  </svg>
                </div>
                {TRANSLATIONS[language].addCredits}
              </h4>
              <button className="btn-close" onClick={onClose} />
            </div>

            <Row className="g-4">
              <Col md={7} className="pe-md-4">
                <div className="credits-section mb-2">
                  <div className="current-balance mb-2">
                    <div className="d-flex justify-content-between">
                      <b>{TRANSLATIONS[language].currentBalance}</b>
                      <b className="color-orange">{currentBalance}</b>
                    </div>
                    <div className="d-flex justify-content-between">
                      <small className="text-muted">
                        {TRANSLATIONS[language].availableCredits}
                      </small>
                      <small className="text-muted">
                        {TRANSLATIONS[language].remainingCredits}
                      </small>
                    </div>
                  </div>
                  <div className="add-credits mb-2">
                    <Form.Label>
                      {TRANSLATIONS[language].addCreditsLabel}
                    </Form.Label>
                    <Form.Control
                      type="number"
                      value={creditsToAdd}
                      onChange={(e) => {
                        const value = e.target.value === '' ? '' : Number(e.target.value);
                        setCreditsToAdd(value);
                      }}
                      min="1"
                      className="mb-2"
                    />
                    <small className="text-muted">
                      {creditsToAdd || 0} {TRANSLATIONS[language].credits} = ¥{" "}
                      {((creditsToAdd || 0) * 3.2).toFixed(2)}
                    </small>
                  </div>
                </div>

                <div className="payment-method-section">
                  <Form.Label className="d-block mb-2">
                    {TRANSLATIONS[language].paymentMethod}
                  </Form.Label>
                  <div className="payment-options mb-2">
                    <div className="payment-option">
                      <Form.Check
                        type="checkbox"
                        id="card"
                        checked={selectedPaymentMethods.card}
                        onChange={() => handlePaymentMethodChange("card")}
                        label={
                          <>
                            {TRANSLATIONS[language].creditDebitCard}
                            <span className="text-muted small d-block">
                              {TRANSLATIONS[language].supportedCards}
                            </span>
                          </>
                        }
                        className="custom-checkbox"
                      />
                    </div>
                  </div>

                  {selectedPaymentMethods.card && (
                    <div className="credit-card-form mb-2">
                      <Form.Group className="mb-1">
                        <Form.Label>
                          {TRANSLATIONS[language].cardNumber}
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          maxLength="19"
                        />
                      </Form.Group>
                      <Row>
                        <Col>
                          <Form.Group className="mb-1">
                            <Form.Label>
                              {TRANSLATIONS[language].expiryDate}
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="MM/YY"
                              maxLength="5"
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group className="mb-1">
                            <Form.Label>
                              {TRANSLATIONS[language].cvv}
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="123"
                              maxLength="3"
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Form.Group>
                        <Form.Label>
                          {TRANSLATIONS[language].cardholderName}
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Cardholder Name"
                        />
                      </Form.Group>
                    </div>
                  )}

                  <div className="payment-options">
                    <div className="payment-option">
                      <Form.Check
                        type="checkbox"
                        id="other"
                        checked={selectedPaymentMethods.other}
                        onChange={() => handlePaymentMethodChange("other")}
                        label={
                          <>
                            {TRANSLATIONS[language].eWalletsOther}
                            <span className="text-muted small d-block">
                              {TRANSLATIONS[language].supportedWallets}
                            </span>
                          </>
                        }
                        className="custom-checkbox"
                      />
                    </div>
                  </div>

                  {selectedPaymentMethods.other && (
                    <>
                      <div className="wallet-buttons my-2">
                        <button
                          className={`wallet-btn ${
                            activeWallet === "paypay" ? "active" : ""
                          }`}
                          onClick={() => setActiveWallet("paypay")}
                        >
                          <img src={Paypay} alt="Paypay" />
                          {TRANSLATIONS[language].payWithPaypay}
                        </button>
                        <button
                          className={`wallet-btn ${
                            activeWallet === "rakuten" ? "active" : ""
                          }`}
                          onClick={() => setActiveWallet("rakuten")}
                        >
                          <img src={Rakuten} alt="Rakuten" />
                          {TRANSLATIONS[language].payWithRakuten}
                        </button>
                        <button
                          className={`wallet-btn ${
                            activeWallet === "konbini" ? "active" : ""
                          }`}
                          onClick={() => setActiveWallet("konbini")}
                        >
                          <img src={Konbini} alt="Konbini" />
                          {TRANSLATIONS[language].payWithKonbini}
                        </button>
                      </div>
                      <div className="e-wallet-form">
                        {activeWallet === "paypay" && (
                          <Form.Group className="form-group mb-2 w-100">
                            {" "}                            <Form.Label className="w-100">
                              {TRANSLATIONS[language].paypayPhone}
                            </Form.Label>
                            <IntlTelInput
                              containerClassName="intl-tel-input"
                              inputClassName="form-control"
                              preferredCountries={["jp"]}
                              initialCountry="jp"
                              onlyCountries={["jp"]}
                              format
                            />
                          </Form.Group>
                        )}

                        {activeWallet === "rakuten" && (
                          <Row>
                            <Col md={6}>
                              <div className="form-group mb-2">
                                <label>
                                  {TRANSLATIONS[language].rakutenEmail}
                                </label>
                                <input
                                  type="email"
                                  className="form-control"
                                  placeholder="email@example.com"
                                />
                              </div>
                            </Col>
                            <Col md={6}>
                              {" "}
                              <div className="form-group">                                <label>
                                  {TRANSLATIONS[language].phoneNumber}
                                </label>
                                <IntlTelInput
                                  containerClassName="intl-tel-input"
                                  inputClassName="form-control"
                                  preferredCountries={["jp"]}
                                  initialCountry="jp"
                                  onlyCountries={["jp"]}
                                  format
                                />
                              </div>
                            </Col>
                          </Row>
                        )}

                        {activeWallet === "konbini" && (
                          <Row>
                            <Col md={6}>
                              <div className="form-group mb-2">
                                <label>{TRANSLATIONS[language].fullName}</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter your full name"
                                />
                              </div>
                            </Col>
                            <Col md={6}>
                              {" "}
                              <div className="form-group mb-2">                                <label>
                                  {TRANSLATIONS[language].phoneNumber}
                                </label>
                                <IntlTelInput
                                  containerClassName="intl-tel-input"
                                  inputClassName="form-control"
                                  preferredCountries={["jp"]}
                                  initialCountry="jp"
                                  onlyCountries={["jp"]}
                                  format
                                />
                              </div>
                            </Col>
                            <Col md={6}>
                              <div className="form-group mb-2">
                                <label>
                                  {TRANSLATIONS[language].emailForCode}
                                </label>
                                <input
                                  type="email"
                                  className="form-control"
                                  placeholder="email@example.com"
                                />
                              </div>
                            </Col>
                            <Col md={6}>
                              <div className="form-group">
                                <label>
                                  {TRANSLATIONS[language].preferredStore}
                                </label>

                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="7-Eleven"
                                />
                              </div>
                            </Col>
                          </Row>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </Col>
              <Col
                md={5}
                className="ps-md-4 d-flex justify-content-between flex-column"
              >
                <div>
                  <label className="mb-2">
                    {TRANSLATIONS[language].transactionSummary}
                  </label>

                  <div className="transaction-summary mb-5 d-flex justify-content-between flex-column">
                    <div>
                      <div className="d-flex justify-content-between mb-2">
                        <span>{TRANSLATIONS[language].currentCredits}</span>
                        <span>
                          {currentBalance} {TRANSLATIONS[language].credits}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between mb-3 pb-3">
                        <span>{TRANSLATIONS[language].creditsToAdd}</span>
                        <span className="color-orange ">
                          {creditsToAdd || 0} {TRANSLATIONS[language].credits} (¥{" "}
                          {((creditsToAdd || 0) * 3.2).toFixed(2)} )
                        </span>
                      </div>
                      <div className=" d-flex justify-content-between  mb-5">
                        <span>{TRANSLATIONS[language].newCreditBalance}</span>
                        <span className="color-orange credit-total">
                          {currentBalance + (creditsToAdd || 0)}{" "}
                          {TRANSLATIONS[language].credits}
                        </span>
                      </div>
                    </div>
                    <div className="add-credit-button-controller d-flex gap-4 justify-content-center mt-5">
                      <button onClick={onClose}>
                        {TRANSLATIONS[language].cancel}
                      </button>
                      <button onClick={handlePurchaseCredits}>
                        {TRANSLATIONS[language].purchaseCredits}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="secure-payment-notice d-flex gap-2">
                  <div className="secure-payment-icon">
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 11 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.6278 6.9995C6.67117 6.63856 6.80536 6.2945 7.01782 5.9995H5.00423V4.9995H9.00141C9.3462 5.00172 9.68663 5.07719 10.0005 5.22V1.0005C10.0005 0.869095 9.97468 0.738964 9.92443 0.617548C9.87417 0.496132 9.80047 0.385812 9.70755 0.292894C9.61462 0.199975 9.5043 0.126282 9.38288 0.0760252C9.26146 0.0257686 9.13132 -6.52193e-05 8.99991 5.00172e-07H1.00105C0.869592 -0.000130964 0.739402 0.0256543 0.617922 0.0758814C0.496443 0.126109 0.386059 0.199792 0.293084 0.292717C0.200108 0.385641 0.126366 0.495984 0.0760763 0.617432C0.0257862 0.738881 -6.52922e-05 0.869052 5.0057e-07 1.0005V7.9995C-0.000131061 8.13099 0.0256719 8.26122 0.0759326 8.38272C0.126193 8.50423 0.199925 8.61463 0.292906 8.70761C0.385888 8.80058 0.496295 8.87431 0.617807 8.92457C0.739319 8.97483 0.86955 9.00063 1.00105 9.0005H5.99977V8.6C6.00254 8.39289 6.04816 8.1886 6.13378 8H2.99964V7L6.6278 6.9995ZM8.99991 3.9995H5.00273V2.9995H8.99991V3.9995ZM2.99964 0.9995H8.99991V1.9995H2.99964V0.9995ZM1.99409 7.9995H0.994046V6.9995H1.99409V7.9995ZM1.99409 1.9995H0.994046V0.9995H1.99409V1.9995ZM2.99664 2.9995H3.99668V3.9995H2.99664V2.9995ZM2.99814 5.9995V4.9995H3.99818V5.9995H2.99814ZM10.4 8V7.25C10.3609 6.90605 10.1966 6.58852 9.93837 6.35797C9.68014 6.12743 9.34608 6 8.99991 6C8.65374 6 8.31967 6.12743 8.06145 6.35797C7.80323 6.58852 7.63891 6.90605 7.59985 7.25V8C7.44418 8.01053 7.2976 8.07712 7.18727 8.18745C7.07695 8.29777 7.01035 8.44434 6.99982 8.6V10.35C7.00049 10.5137 7.06246 10.6713 7.17352 10.7916C7.28459 10.9119 7.43668 10.9863 7.59985 11H10.35C10.5137 10.9993 10.6713 10.9374 10.7916 10.8263C10.9119 10.7152 10.9863 10.5632 11 10.4V8.65C10.9993 8.48627 10.9374 8.32873 10.8263 8.20841C10.7152 8.0881 10.5631 8.01375 10.4 8ZM9.74994 8H8.24988V7.25C8.25454 7.1574 8.27788 7.06671 8.3185 6.98337C8.35913 6.90002 8.41619 6.82576 8.48625 6.76504C8.55632 6.70432 8.63794 6.65839 8.72621 6.63003C8.81449 6.60167 8.90759 6.59145 8.99991 6.6C9.09223 6.59145 9.18533 6.60167 9.2736 6.63003C9.36188 6.65839 9.4435 6.70432 9.51357 6.76504C9.58363 6.82576 9.64069 6.90002 9.68131 6.98337C9.72194 7.06671 9.74528 7.1574 9.74994 7.25V8Z"
                        fill="#F46A05"
                      />
                    </svg>
                  </div>

                  <div className="d-flex align-items-start flex-column mb-2">
                    <label>{TRANSLATIONS[language].securePayment}</label>

                    <p className="text-muted small mb-0">
                      {TRANSLATIONS[language].securePaymentNotice}
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>

      {showConfirmation && (
        <PurchaseConfirmationPopUp
          onClose={() => setShowConfirmation(false)}
          onConfirmPurchase={handleConfirmPurchase}
          creditsToAdd={creditsToAdd}
          amount={(creditsToAdd * 3.2).toFixed(2)}
        />
      )}
    </>
  );
};

export default AddCreditsPopUp;
