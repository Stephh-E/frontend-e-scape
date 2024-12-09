import { expect, test } from "vitest";
import '@testing-library/jest-dom';
import App from "./src/App";
import { render, screen } from "@testing-library/react"

test("Renders the App component", () => {
    render(<App />);
    const mainPageHeader = screen .getByText("Create new Account");
    expect(mainPageHeader).toBeInTheDocument();

});