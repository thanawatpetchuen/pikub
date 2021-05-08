import React from "react";
import { useRecoilValue } from "recoil";

import { Column, Row } from "../../components/Layout";
import Symbol from "../../components/Symbol";
import { symbolsState } from "../../recoil";

const Home = () => {
  const symbols = useRecoilValue(symbolsState)
  return (
    <Row>
      {symbols.map((s, i) => (
        <Column key={i}>
          <Symbol name={s} position={i} />
        </Column>
      ))}
    </Row>
  );
};

export default Home;
