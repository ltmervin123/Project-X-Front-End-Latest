import { React, useEffect, useState } from "react";
import { useAuthContext } from "../../hook/useAuthContext";

const Header = () => {
  const [currentDate, setCurrentDate] = useState("");
  const { user } = useAuthContext();

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    setCurrentDate(formattedDate);
  }, []);

  return (
    <div className="dashboard-header">
      {user ? (
        <>
          <h3>Hello, {user.name}</h3>
          <p>Today is {currentDate}</p>
        </>
      ) : (
        <>
          <h3>Hello, Guest</h3>
          <p>Today is {currentDate}</p>
        </>
      )}
    </div>
  );
};

export default Header;
