import React, { useState } from "react";
import styled from "styled-components";
import DurationSelect from "../DurationSelect/DurationSelect";

const Container = styled.div`
    background-color: #101e71;
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 1rem;
`;

const Title = styled.h2`
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
`;

function SleepScore() {
    const [bedDuration, setBedDuration] = useState("");
    const onBedDurationChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setBedDuration(event.target.value);
    };

    return (
        <Container>
            <Title>YOUR SLEEP SCORE</Title>
            <DurationSelect
                label="Duration in bed"
                value={bedDuration}
                onChange={onBedDurationChange}
            />
        </Container>
    );
}

export default SleepScore;
