import React from 'react';
import Node from './components/Node/Node';
import styled from "styled-components";
import classes from "./components/Node/Node.module.scss";


const AppContainer = styled.div`
  height: 100vh;
  background-color: #202124;


`;
const Canvas = styled.div`
    position: relative;

    z-index: 1;
`;
const Wrapper = styled.div`
  position: absolute;
  justify-content: flex-start;
  align-items: flex-end;
  left: 50px;
  bottom: -600px;
`;


function App() {
  return (
    <AppContainer>
      <Canvas>
        <Wrapper>
          <Node></Node>
        </Wrapper>
      </Canvas>
    </AppContainer>
  );
}

export default App;
