// Import necessary modules from the React library
import React from "react";
import ReactDOM from "react-dom";

// Import the CSS styles defined in the index.css file
import "./index.css";

// Import the main component of your application, which is likely defined in the App.js file
import App from "./App";

// Render the main component inside a <React.StrictMode> for development mode optimizations
ReactDOM.render(
  <React.StrictMode>
    {/* 
    The <App /> component is rendered here. It appears to have three prop functions:
    - onLogin: a function to handle user login
    - onSignup: a function to handle user signup
    - onLogout: a function to handle user logout
    In this example, each function is an empty arrow function.
    */}
    <App onLogin={() => {}} onSignup={() => {}} onLogout={() => {}} />
  </React.StrictMode>,
  // Attach the rendered content to the HTML element with the id "root"
  document.getElementById("root")
);
