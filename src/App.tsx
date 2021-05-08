import React from "react";
import { RecoilRoot } from "recoil";

import { Background } from "./components/Background";
import Home from "./pages/Home";

import "./App.css";

const App = () => {
  return (
    <RecoilRoot>
      <Background>
        <Home />
      </Background>
    </RecoilRoot>
  );
};

export default App;
