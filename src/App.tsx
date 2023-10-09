// App.tsx

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import NavBar from "./components/NavBar";
import EntryDetails from "./components/Journal/EntryDetails";
import Auth from "./components/Auth";
import Cookies from "js-cookie";

interface AppProps {
  onLogin?: () => void;
  onSignup?: () => void;
  onLogout?: () => void;
}

function App({ onLogin, onSignup, onLogout }: AppProps) {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);

  const handleLogout = async () => {
    try {
      Cookies.remove("token");
      console.log("Logout successful: User logged out");
      setAuthenticated(false);
      if (onLogout) {
        onLogout();
      }
    } catch (error) {
      console.error("Logout error:", error);
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
            <Route
              path="/journal/:id"
              element={
                authenticated ? (
                  <EntryDetails />
                ) : (
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
