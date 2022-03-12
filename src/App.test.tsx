import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders without crashing", () => {
    render(<App />);
    const pageTitle = screen.getByText("Sleep Calculator");
    expect(pageTitle).toBeInTheDocument();
});
