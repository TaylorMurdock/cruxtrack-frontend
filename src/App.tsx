import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import NavBar from "./components/NavBar";
import Auth from "./components/Auth";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

interface AppProps {
  onLogin?: (username: string) => void;
  onSignup?: () => void;
  onLogout?: () => void;
}

function App({ onLogin, onSignup, onLogout }: AppProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = Cookies.get("token");
    const storedUsername = Cookies.get("username");

    if (token) {
      const decodedToken = jwt_decode(token) as { exp: number | undefined };
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp && decodedToken.exp > currentTime) {
        setAuthenticated(true);
        if (storedUsername) {
          setUsername(storedUsername);
        }
      }
    }

    // Move setLoading(false) here
    setLoading(false);
  }, []);

  const handleLogout = async () => {
    Cookies.remove("token");
    Cookies.remove("userId");
    Cookies.remove("username");
    setAuthenticated(false);

    if (onLogout) {
      onLogout();
    }
  };

  return (
    <Router>
      <div className="App">
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
                    <Dashboard />
                  </>
                ) : (
                  <>
                    <Auth
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
