import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import NavBar from "./components/NavBar";
import Auth from "./components/Auth";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode"; // Import JWT decoding library

interface AppProps {
  onLogin?: () => void;
  onSignup?: () => void;
  onLogout?: () => void;
}

function App({ onLogin, onSignup, onLogout }: AppProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      const decodedToken = jwt_decode(token) as { exp: number | undefined };
      const currentTime = Date.now() / 1000; // Convert to seconds

      // Check if the token is not expired
      if (decodedToken.exp && decodedToken.exp > currentTime) {
        setAuthenticated(true);
      }
    }

    setLoading(false);
  }, []);

  const handleLogout = async () => {
    // Remove JWT from cookies
    Cookies.remove("token");
    setAuthenticated(false);

    if (onLogout) {
      onLogout();
    }
  };

  return (
    <Router>
      <div className="App">
        <NavBar onLogout={handleLogout} />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                authenticated ? (
                  <>
                    <Dashboard />
                    <p>Authenticated</p>
                  </>
                ) : (
                  <>
                    <Auth
                      onLogin={() => {
                        setAuthenticated(true);
                        if (onLogin) {
                          onLogin();
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
                    <p>Not Authenticated</p>
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
