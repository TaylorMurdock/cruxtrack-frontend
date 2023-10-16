import { useState } from "react";
import Cookies from "js-cookie";

import cruxtrackLoginBg from "../images/cruxtrackLoginBg.jpg";

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

      // Store JWT in cookies without the "Bearer" prefix
      Cookies.set("token", data.token);

      // Successful login
      console.log("Login successful: User logged in");

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
        Cookies.set("token", data.token);
        Cookies.set("username", username);

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

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${cruxtrackLoginBg})`, // Use the imported image
        backgroundSize: "cover",
      }}
    >
      <div className="bg-white p-8 rounded-xl shadow-md w-120 space-y-4">
        <h1 className="text-3xl font-semibold text-center text-green-600">
          Welcome Back
        </h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border-2 border-green-300 rounded px-4 py-3" // Adjust the padding here
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border-2 border-green-300 rounded px-4 py-3" // Adjust the padding here
        />
        <div className="flex justify-center">
          <button
            onClick={handleLogin}
            className="bg-gradient-to-r from-green-900 to-green-600 text-white hover:bg-gradient-to-r hover:from-yellow-700 hover:via-yellow-550 hover:to-yellow-400 rounded-md px-8 py-3 mr-8" // Adjust the padding here
          >
            Login
          </button>
          <button
            onClick={handleSignup}
            className="bg-gradient-to-r from-yellow-400 to-yellow-700 text-white hover:bg-gradient-to-r hover:from-green-600 hover:via-green-750 hover:to-green-900 rounded-md px-8 py-3" // Adjust the padding here
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthComponent;
