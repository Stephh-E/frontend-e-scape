import { test, expect, vi, beforeEach } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./src/App";
import { UserAuthContextProvider } from "./src/contexts/UserAuthContextProvider";
import { MemoryRouter } from "react-router-dom";

test("Renders the App component", () => {
    render(
        <MemoryRouter>
            <UserAuthContextProvider>
                <App />
            </UserAuthContextProvider>
        </MemoryRouter>
    );

    // Check for the login button
    const loginButton = screen.getByRole("button", { name: /Login/i });
    expect(loginButton).toBeInTheDocument();
});

