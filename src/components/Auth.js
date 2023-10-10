import React, { useState } from "react";
import Cookies from "js-cookie";

const apiUrl = "http://localhost:5000"; //backend URL

function AuthComponent({ onLogin, onSignup, onLogout }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Store JWT in cookies
      Cookies.set("token", data.token);

      // successful login
      console.log("Login successful: User logged in");

      // Call the login callback function
      onLogin();
    } catch (error) {
      // login error
      console.error("Login error:", error);
    }
  };

  const handleSignup = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      };

      const response = await fetch(`${apiUrl}/user/signup`, requestOptions);

      if (response.ok) {
        //  successful signup
        console.log("Signup successful: User registered");

        // Call the signup callback function
        onSignup();
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      //  signup error
      console.error("Signup error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      // Remove JWT from cookies
      Cookies.remove("token");

      //  successful logout

      console.log("Logout successful: User logged out");

      // Call the logout callback function
      onLogout();
    } catch (error) {
      //  logout error
      console.error("Logout error:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleSignup}>Signup</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default AuthComponent;
