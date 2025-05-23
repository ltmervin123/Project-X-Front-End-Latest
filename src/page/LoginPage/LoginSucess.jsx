import React, { useEffect } from "react";
import "../../styles/Error.css";
import SuccessSection from "../../components/LoginSuccess/MessageSection";
import Header from "../../components/LoginFailed/Header";
import { useAuthContext } from "../../hook/useAuthContext";

function SuccessPage() {
  const { dispatch } = useAuthContext();
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const user = {
      token: urlParams.get("token"),
      name: urlParams.get("name"),
      id: urlParams.get("_id"),
      email: urlParams.get("email"),
      service: urlParams.get("service"),
    };

    if (user.token && user.name && user.id && user.email && user.service) {
      dispatch({ type: "LOGIN", payload: user });
    }

    // Remove query parameters from the URL
    const newURL = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, newURL);
  }, []);

  return (
    <>
      <div className="mock-background">
        <Header />
        <SuccessSection />

        <svg
          preserveAspectRatio="none"
          className="background-svg"
          viewBox="0 0 1927 1086"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_0_1)">
            <path
              d="M-7 1086.89V732.211C56.8184 678.211 170.137 780.893 218.819 838.984C256.865 881.939 390.638 953.612 621.366 896.666C852.094 839.72 940.868 999.757 956.413 1086.89H-7Z"
              fill="#F46A05"
            />
            <path
              d="M-7 1086.89V732.211C56.8184 678.211 170.137 780.893 218.819 838.984C256.865 881.939 390.638 953.612 621.366 896.666C852.094 839.72 940.868 999.757 956.413 1086.89H-7Z"
              stroke="#F46A05"
            />
          </g>
          <g filter="url(#filter1_d_0_1)">
            <path
              d="M1531.38 275.55C1580 -22.3705 1826.39 -26.6262 1952.09 8.17278L1952.09 877C1931.31 869.209 1877.29 840.539 1827.43 788.185C1777.57 735.831 1691.35 732.091 1654.48 736.766C1448.8 838.046 971.308 980.973 864.107 737.9C756.905 494.827 972.002 478.63 1073.28 501.483C1205.73 550.306 1482.77 573.47 1531.38 275.55Z"
              fill="#F46A05"
            />
            <path
              d="M1531.38 275.55C1580 -22.3705 1826.39 -26.6262 1952.09 8.17278L1952.09 877C1931.31 869.209 1877.29 840.539 1827.43 788.185C1777.57 735.831 1691.35 732.091 1654.48 736.766C1448.8 838.046 971.308 980.973 864.107 737.9C756.905 494.827 972.002 478.63 1073.28 501.483C1205.73 550.306 1482.77 573.47 1531.38 275.55Z"
              stroke="#F46A05"
            />
          </g>
          {/* Include the existing defs from your original SVG */}
        </svg>
      </div>
    </>
  );
}
export default SuccessPage;
