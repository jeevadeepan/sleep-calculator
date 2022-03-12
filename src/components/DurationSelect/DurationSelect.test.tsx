import React from "react";
import { render, screen } from "@testing-library/react";
import DurationSelect from "./DurationSelect";

test("renders without crashing", () => {
    render(<DurationSelect />);
    expect(screen.getByText("DurationSelect")).toBeInTheDocument();
});
