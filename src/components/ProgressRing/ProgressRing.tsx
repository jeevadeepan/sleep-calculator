import React from "react";
import styled from "styled-components";

interface ProgressRingProps {
    progressPercent: number;
    isLoading: boolean;
    isError: boolean;
    isInitial: boolean;
}

const StyledCircle = styled.circle`
    transition: stroke-dashoffset 0.5s;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
    mix-blend-mode: normal;
`;

const Container = styled.div`
    position: relative;
`;

const BackgroundRing = styled.svg`
    position: absolute;
    left: 0;
    top: 0;
`;

const StyledDisplayProgressText = styled.p`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 3rem;
`;

const StyledDisplayText = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    > p {
        max-width: 50%;
    }
`;

const ForegroundRing = styled.svg``;

function ProgressRing({
    progressPercent,
    isLoading,
    isError,
    isInitial,
}: ProgressRingProps) {
    const radius = 120;
    const stroke = 8;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset =
        circumference - (progressPercent / 100) * circumference;
    const progressText = `${progressPercent}%`;

    const getDisplayText = () => {
        if (isLoading) {
            return <StyledDisplayText>Loading ...</StyledDisplayText>;
        }
        if (isError) {
            return (
                <StyledDisplayText>
                    <p>Unable to calculate score at this time!</p>
                </StyledDisplayText>
            );
        }
        if (isInitial) {
            return (
                <StyledDisplayText>
                    <p>Select duration to calculate score</p>
                </StyledDisplayText>
            );
        }
        return (
            <StyledDisplayProgressText>
                {progressText}
            </StyledDisplayProgressText>
        );
    };

    return (
        <Container>
            <BackgroundRing height={radius * 2} width={radius * 2}>
                <StyledCircle
                    stroke="#0a1153"
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeDasharray={circumference + " " + circumference}
                    strokeLinecap="round"
                    style={{ strokeDashoffset: 1 }}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    strokeOpacity={0.4}
                />
            </BackgroundRing>
            <ForegroundRing height={radius * 2} width={radius * 2}>
                <StyledCircle
                    stroke="#FFFFFF"
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeDasharray={circumference + " " + circumference}
                    strokeLinecap="round"
                    style={{ strokeDashoffset }}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
            </ForegroundRing>
            {getDisplayText()}
        </Container>
    );
}

export default ProgressRing;
