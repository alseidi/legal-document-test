import React from "react";
import DocumentDashboard from "./pages/DocumentDashboard";
import "./styles.css";

function App() {
  return (
    <div>
      <div>
        <img
          src="logo.png"
          alt="logo"
          className="logo"
        />
      </div>
      <DocumentDashboard />
    </div>
  );
}

export default App;
