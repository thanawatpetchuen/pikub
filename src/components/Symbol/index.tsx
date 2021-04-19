import React from "react";
import { ReadyState } from "react-use-websocket";
import useTicker from "../../hooks/useTicker";
import { Column, Container } from "../Layout";
import Text from "../Text";

const getLocale = (amount: number): string => {
  return amount ? amount.toLocaleString("th-TH") : "0";
};

interface ISymbol {
  name: string;
}

const ALERT_THRESHOLD = 30;

const Symbol = ({ name }: ISymbol) => {
  const { currentMessage, connectionStatus } = useTicker(name);
  const condition =
    connectionStatus !== ReadyState.OPEN || currentMessage?.isFrozen === "true";
  const diedColor = condition ? "#D00000" : "white";

  const isBlink = currentMessage?.percentChange >= ALERT_THRESHOLD;

  return (
    <Container style={{ borderColor: diedColor }} isBlink={isBlink}>
      <Column>
        <Text fontSize="4rem">{name.toUpperCase()}</Text>
      </Column>
      <Column>
        <Text fontSize="6rem">{getLocale(currentMessage.last)}</Text>
      </Column>
      <Column>
        <Text
          color={currentMessage?.percentChange >= 0 ? "lightgreen" : "#D00000"}
        >
          {currentMessage?.percentChange}%
        </Text>
      </Column>
    </Container>
  );
};

export default Symbol;
