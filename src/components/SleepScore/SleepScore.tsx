import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../Button/Button";
import DurationSelect from "../DurationSelect/DurationSelect";
import ProgressRing from "../ProgressRing/ProgressRing";

enum PageStates {
    Initial,
    Loading,
    Error,
    Success,
}

const Container = styled.div`
    background-color: #101e71;
    display: flex;
    flex-direction: column;
    flex: 1;
    max-height: 80%;
    padding: 1rem;
    align-items: center;
    justify-content: space-around;
    > * {
        margin-bottom: 2rem;
    }
`;

const DurationContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
`;

const Title = styled.h2`
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
`;

function SleepScore() {
    const [bedDuration, setBedDuration] = useState("");
    const [asleepDuration, setAsleepDuration] = useState("");
    const [isDurationValid, setIsDurationValid] = useState(false);
    const [pageState, setPageState] = useState(PageStates.Initial);
    const [progressPercent, setProgressPercent] = useState(0);

    const onBedDurationChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setBedDuration(event.target.value);
    };

    const onAsleepDurationChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setAsleepDuration(event.target.value);
    };

    useEffect(() => {
        if (bedDuration !== "" && asleepDuration !== "") {
            setIsDurationValid(true);
        } else {
            setIsDurationValid(false);
        }
    }, [bedDuration, asleepDuration]);

    const onCalculateHandler = async () => {
        setPageState(PageStates.Loading);
        const score = Math.min(
            Math.round(
                100 * (parseInt(asleepDuration, 10) / parseInt(bedDuration, 10))
            ),
            100
        );
        try {
            const response = await fetch(
                "https://us-central1-fleet-radar-299112.cloudfunctions.net/mock-server",
                {
                    method: "POST",
                    body: JSON.stringify({ score }),
                    mode: "cors",
                }
            );

            if (response.ok) {
                setProgressPercent(score);
                setPageState(PageStates.Success);
            } else {
                setPageState(PageStates.Error);
            }
        } catch (err) {
            setPageState(PageStates.Error);
        }
    };

    return (
        <Container>
            <Title>YOUR SLEEP SCORE</Title>
            <DurationContainer>
                <DurationSelect
                    label="Duration in bed"
                    value={bedDuration}
                    onChange={onBedDurationChange}
                />
                <DurationSelect
                    label="Duration asleep "
                    value={asleepDuration}
                    onChange={onAsleepDurationChange}
                />
            </DurationContainer>
            <ProgressRing
                progressPercent={progressPercent}
                isInitial={pageState === PageStates.Initial}
                isError={pageState === PageStates.Error}
                isLoading={pageState === PageStates.Loading}
            />
            <Button
                label="Calculate"
                onClick={onCalculateHandler}
                disabled={!isDurationValid}
            />
        </Container>
    );
}

export default SleepScore;
