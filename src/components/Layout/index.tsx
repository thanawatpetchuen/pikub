import styled, { css, keyframes } from "styled-components";

interface IColumn {
  width?: number;
}

export const Column = styled.div<IColumn>`
  display: inline-block;
  width: ${({ width = 2 }) => 100 / width}%;
`;

export const Row = styled.div`
  width: 100%;
`;

const blink = keyframes`
  50% { border-color:gold ; }
`;

const blinkCSS = css`
  animation: ${blink} 1s infinite;
`;

interface IContainer {
  isBlink?: boolean;
}

export const Container = styled.div<IContainer>`
  // Border
  border: solid;
  border-color: white;
  border-radius: 5px;
  border-width: 2px;

  //
  padding: 5rem;
  margin: 1rem 0.5rem 1rem 0.5rem;

  ${({ isBlink }) => {
    if (isBlink) {
      return blinkCSS;
    }
  }}
`;
