import React, { useState } from "react";
import Cookies from "js-cookie";

const apiUrl = "http://localhost:5000"; // Backend URL

function AuthComponent({ onLogin, onSignup, onLogout }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch(`${apiUrl}/user/login`, {
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
      Cookies.set("token", `Bearer ${data.token}`);
      Cookies.set("userId", data.userId);

      // Successful login
      console.log("Login successful: User logged in");

      // Check if the token is correctly formatted
      const token = Cookies.get("token");
      const tokenParts = token.split(" ");
      if (tokenParts.length === 2 && tokenParts[0] === "Bearer") {
        console.log("Token is correctly formatted.");
      } else {
        console.error("Token is incorrectly formatted.");
      }

      // Call the login callback function
      onLogin();
    } catch (error) {
      // Login error
      console.error("Login error:", error);
    }
  };

  const handleSignup = async () => {
    if (!username || !password) {
      console.error("Username and password are required.");
      return;
    }

    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      };

      const response = await fetch(`${apiUrl}/user/signup`, requestOptions);

      if (response.ok) {
        // Successful signup
        console.log("Signup successful: User registered");

        // Extract the JWT token from the response and set it in a cookie
        const data = await response.json();
        Cookies.set("token", `Bearer ${data.token}`);
        Cookies.set("userId", data.userId);

        // Call the signup callback function (optional)
        onSignup();

        // Automatically log in the user (optional)
        handleLogin();
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      // Signup error
      console.error("Signup error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      // Remove JWT and user ID from cookies
      Cookies.remove("token");
      Cookies.remove("userId");

      // Successful logout
      console.log("Logout successful: User logged out");

      // Call the logout callback function
      onLogout();
    } catch (error) {
      // Logout error
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
