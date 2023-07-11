import React from "react";
import Countdown from "react-countdown";
import styled from "styled-components";

const CountdownWrap = styled.div`
  text-align: center;
  font-size: 2vw;
  padding: 2.5vw;
  background: #f1ddae;
  color: black;
`;

const CountText = styled.div`
  font-size: 3vw;
  font-weight: bold;
`;

export default function CountDown() {
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <div>Minting is Now Live!</div>;
    }
    // Render a countdown
    return (
      <span>
        {hours}:{minutes}:{seconds}
      </span>
    );
  };

  return (
    <CountdownWrap>
      <div>Countdown Till Mint!</div>
      <CountText>
        <Countdown date={new Date(1631036400 * 1000)} renderer={renderer} />
      </CountText>
    </CountdownWrap>
  );
}
