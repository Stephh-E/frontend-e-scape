import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import App from "./src/App";
import { UserAuthContextProvider } from "./src/contexts/UserAuthContextProvider";
import { MemoryRouter } from "react-router-dom";

test("Renders the App component", () => {
    render(
    <MemoryRouter initialEntries={["/signup"]}>
        <UserAuthContextProvider>
            < App />
        </UserAuthContextProvider>
    </MemoryRouter>
    );

    const mainPageHeader = screen.getByText(/Create new Account/i);
    expect(mainPageHeader).toBeInTheDocument();

});

test("Render App component with JWT on display", async () => {
    render (
        <MemoryRouter>
            <UserAuthContextProvider>
                < App />
            </UserAuthContextProvider>
        </MemoryRouter>
    );

    const jwtHeading = screen.getByTestId("jwt-header");
    expect(jwtHeading).toHaveTextContent("No JWT available");
    expect(jwtHeading).not.toBeEmptyDOMElement();

    // Find the sign-up button
    const signUpButton = screen.getByText("Sign up a user");

    // Setup a user
    const user = userEvent.setup();

    // Click on the sign-up button
    await user.click(signUpButton);

    console.log("Jwt Heading content: " + jwtHeading.textContent);
    // Check the JWT heading for a JWT
    expect(jwtHeading).not.toHaveTextContent("");
})