import { Duration } from "luxon";
import React from "react";
import styled from "styled-components";

interface DurationSelectProps {
    label: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    value: number | string;
}

interface IntervalOption {
    value: number;
    displayText: string;
}

/* styles */
const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    margin-bottom: 0.5rem;
`;

// Generate interval options
const intervals: IntervalOption[] = [];
// 24 * 60 = 1440 minutes
for (let i = 0; i < 1441; i += 30) {
    const duration = Duration.fromObject({ minutes: i });
    const interval: IntervalOption = {
        value: i,
        displayText: duration.shiftTo("hours", "minutes").toHuman({
            unitDisplay: "short",
        }),
    };
    intervals.push(interval);
}

function DurationSelect({ label, onChange, value }: DurationSelectProps) {
    const getOptions = intervals.map(({ value: optionValue, displayText }) => (
        <option value={optionValue} key={optionValue}>
            {displayText}
        </option>
    ));
    const selectId = `duration-${label.replaceAll(" ", "")}`;

    return (
        <Container>
            <Label htmlFor="selectId">{label}</Label>
            <select value={value} id="selectId" onChange={onChange}>
                {getOptions}
            </select>
        </Container>
    );
}

export default DurationSelect;
