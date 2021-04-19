import React from "react";
import { Column, Row } from "../../components/Layout";
import Symbol from "../../components/Symbol";
import { SYMBOLS } from "../../model/symbol";

const AVAILABLE_SYMBOLS = Object.values(SYMBOLS);

const Home = () => {
  return (
    <Row>
      {AVAILABLE_SYMBOLS.map((s, i) => (
        <Column key={i}>
          <Symbol name={s} />
        </Column>
      ))}
    </Row>
  );
};

export default Home;
