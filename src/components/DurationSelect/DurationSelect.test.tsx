import React from "react";
import {
    fireEvent,
    getByLabelText,
    render,
    screen,
} from "@testing-library/react";
import DurationSelect from "./DurationSelect";

test("renders without crashing", () => {
    render(
        <DurationSelect label="select label" value="" onChange={() => {}} />
    );
    expect(screen.getByText("select label")).toBeInTheDocument();
});

test("displays dropdown option 8 hours and 30 mins", () => {
    render(
        <DurationSelect label="select label" value="" onChange={() => {}} />
    );
    expect(screen.getByText("8 hr, 30 min")).toBeDefined();
});

test("displays dropdown option 0 hours", () => {
    render(
        <DurationSelect label="select label" value="" onChange={() => {}} />
    );
    expect(screen.getByText("0 hr, 0 min")).toBeDefined();
});

test("displays dropdown option 24 hours", () => {
    render(
        <DurationSelect label="select label" value="" onChange={() => {}} />
    );
    expect(screen.getByText("24 hr, 0 min")).toBeDefined();
});

test("selects initial passed value from the dropdown", () => {
    render(
        <DurationSelect label="select label" value="150" onChange={() => {}} />
    );
    expect(screen.getByDisplayValue("2 hr, 30 min")).toBeDefined();
});

test("invokes passed onChange handler", () => {
    const onChangeMock = jest.fn();
    render(
        <DurationSelect label="duration" value="" onChange={onChangeMock} />
    );
    fireEvent.change(screen.getByLabelText("duration"), {
        target: { value: "6 hr, 0 min" },
    });

    expect(onChangeMock).toHaveBeenCalled();
});
