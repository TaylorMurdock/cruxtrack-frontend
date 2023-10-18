import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import NavBar from "./components/NavBar";
import Auth from "./components/Auth";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

// Define the props that can be passed to the App component
interface AppProps {
  onLogin?: (username: string) => void;
  onSignup?: () => void;
  onLogout?: () => void;
}

function App({ onLogin, onSignup, onLogout }: AppProps) {
  // Define the component's state variables
  const [authenticated, setAuthenticated] = useState(false); // Indicates if the user is authenticated
  const [loading, setLoading] = useState<boolean>(true); // Indicates if the app is loading
  const [username, setUsername] = useState(""); // Stores the username

  // Use the useEffect hook for side effects when the component mounts
  useEffect(() => {
    // Check if a token is stored in cookies
    const token = Cookies.get("token");
    const storedUsername = Cookies.get("username");

    if (token) {
      // Decode the token to check if it's still valid
      const decodedToken = jwt_decode(token) as { exp: number | undefined };
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp && decodedToken.exp > currentTime) {
        // If the token is valid, set authentication status to true and load the username from cookies
        setAuthenticated(true);
        if (storedUsername) {
          setUsername(storedUsername);
        }
      }
    }

    // Move setLoading(false) here to indicate that loading has completed
    setLoading(false);
  }, []);

  // Handle user logout
  const handleLogout = async () => {
    // Remove user-related data from cookies and set authentication status to false
    Cookies.remove("token");
    Cookies.remove("userId");
    Cookies.remove("username");
    setAuthenticated(false);

    if (onLogout) {
      onLogout(); // Call the provided onLogout function if available
    }
  };

  return (
    <Router>
      <div className="App">
        {/* Render the navigation bar with the ability to log out */}
        <NavBar onLogout={handleLogout} authenticated={authenticated} />

        {loading ? (
          <p>Loading...</p>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                authenticated ? (
                  <>
                    <Dashboard />{" "}
                    {/* Render the Dashboard component for authenticated users */}
                  </>
                ) : (
                  <>
                    <Auth
                      // Render the Auth component for unauthenticated users with login, signup, and logout options
                      onLogin={(username: string) => {
                        setAuthenticated(true);
                        setUsername(username);
                        if (onLogin) {
                          onLogin(username);
                        }
                      }}
                      onSignup={() => {
                        setAuthenticated(true);
                        if (onSignup) {
                          onSignup();
                        }
                      }}
                      onLogout={handleLogout}
                    />
                  </>
                )
              }
            />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
