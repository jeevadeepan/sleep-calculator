import React from "react";
import { render, screen } from "@testing-library/react";
import SleepScore from "./SleepScore";

test("renders without crashing", () => {
    render(<SleepScore />);
    expect(screen.getByText("YOUR SLEEP SCORE")).toBeInTheDocument();
});
