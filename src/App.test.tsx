import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(
    <App
      onLogin={() => {}} // Add your authentication functions here
      onSignup={() => {}} // Add your authentication functions here
      onLogout={() => {}} // Add your authentication functions here
    />
  );
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
