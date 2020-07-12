import React from "react";
import logo from "./logo.svg";
import "./App.css";

import ErrorBoundary from "./Components/ErrorBoundary";

import CountryList from "./Components/CountryList/index.js";

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <CountryList />
      </ErrorBoundary>
    </div>
  );
}

export default App;
