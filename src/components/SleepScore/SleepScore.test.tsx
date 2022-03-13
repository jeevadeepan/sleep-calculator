import fetchMock from "jest-fetch-mock";
import React from "react";
import {
    fireEvent,
    getByDisplayValue,
    render,
    screen,
    waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SleepScore from "./SleepScore";

const user = userEvent.setup();

const selectDuration = async (inBed: number, asleep: number) => {
    const durationDropdowns = screen.getAllByDisplayValue("0 hr, 0 min");
    await user.click(durationDropdowns[0]);
    fireEvent.change(durationDropdowns[0], {
        target: { value: inBed },
    });

    await user.click(durationDropdowns[1]);
    fireEvent.change(durationDropdowns[1], {
        target: { value: asleep },
    });
};

test("renders without crashing", () => {
    render(<SleepScore />);
    expect(screen.getByText("YOUR SLEEP SCORE")).toBeInTheDocument();
});

test("renders initial page state", () => {
    render(<SleepScore />);
    expect(
        screen.getByText("Select duration to calculate score")
    ).toBeInTheDocument();
});

test("calculate button is disabled when duration is not selected", () => {
    render(<SleepScore />);
    const calculateButton = screen.getByRole("button", { name: "Calculate" });
    expect(calculateButton).toBeInTheDocument();
    expect(calculateButton).toBeDisabled();
});

test("calculate button is enabled after durations are selected", async () => {
    render(<SleepScore />);
    const calculateButton = screen.getByRole("button", { name: "Calculate" });
    expect(calculateButton).toBeDisabled();
    await selectDuration(480, 600);

    expect(
        screen.getByRole("button", { name: "Calculate" })
    ).not.toBeDisabled();
});

test("displays loading text when score is being calculated", async () => {
    fetchMock.mockResponse(
        () =>
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("success");
                }, 2000);
            })
    );
    render(<SleepScore />);
    await selectDuration(480, 360);

    await waitFor(() => {
        expect(
            screen.getByRole("button", { name: "Calculate" })
        ).not.toBeDisabled();
    });
    await user.click(screen.getByRole("button", { name: "Calculate" }));
    expect(screen.getByText("Loading ...")).toBeInTheDocument();
});

test("computes and displays sleep score when calculate is clicked and API call succeeds", async () => {
    fetchMock.mockResponse("success");
    render(<SleepScore />);
    await selectDuration(480, 360);

    await waitFor(() => {
        expect(
            screen.getByRole("button", { name: "Calculate" })
        ).not.toBeDisabled();
    });
    await user.click(screen.getByRole("button", { name: "Calculate" }));
    await waitFor(
        () => {
            expect(screen.getByText("75%")).toBeInTheDocument();
        },
        {
            timeout: 2200,
        }
    );
});

test("displays error message when API call fails", async () => {
    fetchMock.mockReject(new Error("server error"));
    render(<SleepScore />);
    await selectDuration(720, 480);

    await waitFor(() => {
        expect(
            screen.getByRole("button", { name: "Calculate" })
        ).not.toBeDisabled();
    });
    await user.click(screen.getByRole("button", { name: "Calculate" }));
    await waitFor(() => {
        expect(
            screen.getByText("Unable to calculate score at this time!")
        ).toBeInTheDocument();
    });
});
