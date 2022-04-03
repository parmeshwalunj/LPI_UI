import React from "react";
import Data from "../Data";

const Thome = ({email, handleLogout}) => {
  return (
      <>
    <section className="hero">
      <nav>
        <h2>Welcome {email?(email):("")}</h2>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </section>
    <Data />
      </>
  );
};

export default Thome;
