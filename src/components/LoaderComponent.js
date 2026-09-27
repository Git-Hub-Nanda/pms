import React from "react";
import loader from "../images/loader.gif";

function Loading() {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="loader-container">
          <img
            style={{ width: "30%" }}
            src={loader}
            className="App-logo"
            alt="logo"
          />
        </div>
      </div>
    </div>
  );
}

export default Loading;
