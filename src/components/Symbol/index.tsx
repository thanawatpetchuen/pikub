import React, { useCallback } from "react";
import { ReadyState } from "react-use-websocket";
import { useRecoilState } from "recoil";
import useTicker from "../../hooks/useTicker";
import { SYMBOLS } from "../../model/symbol";
import { symbolsState } from "../../recoil";
import { getLocale } from "../../utils";
import { Column, Container } from "../Layout";
import Text from "../Text";

enum Color {
  DIED = '#D00000',
  NORMAL = 'white',
  ALERT = 'gold',
  CONNECTING = 'orange',
  GAINING = 'lightgreen'
}

interface ISymbol {
  name: string;
  position: number;
}

const ALERT_THRESHOLD = 30;

const Symbol = ({ position }: ISymbol) => {
  const [symbols, setSymbols] = useRecoilState(symbolsState)
  const symbol = symbols[position]

  const { currentMessage, connectionStatus } = useTicker(symbol);

  const condition =
    connectionStatus !== ReadyState.OPEN || currentMessage?.isFrozen === "true";
  const diedColor = condition ? Color.DIED : Color.NORMAL;

  const isConnecting = connectionStatus === ReadyState.CONNECTING;
  const thresholdTrigger = currentMessage?.percentChange >= ALERT_THRESHOLD;
  const isBlink = thresholdTrigger || isConnecting;
  const blinkColor = thresholdTrigger ? Color.ALERT : Color.CONNECTING;

  const handleClick = useCallback(async () => {
    try {
      const result = prompt('Enter symbol')
      if (result) {
        setSymbols((syms) => {
          const copy = syms.slice()
          copy[position] = result as SYMBOLS
          return copy
        })
      }
    } catch (err) {
      console.error(err)
    }
  }, [position, setSymbols])

  return (
    <Container style={{ borderColor: diedColor }} isBlink={isBlink} blinkColor={blinkColor} onClick={handleClick}>
      <Column>
        <Text fontSize="4rem">{symbol.toUpperCase()}</Text>
      </Column>
      <Column>
        <Text fontSize="6rem">{getLocale(currentMessage.last)}</Text>
      </Column>
      <Column>
        <Text
          color={currentMessage?.percentChange >= 0 ? Color.GAINING : Color.DIED}
        >
          {currentMessage?.percentChange}%
        </Text>
      </Column>
    </Container>
  );
};

export default Symbol;
