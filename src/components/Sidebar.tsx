import styled from "styled-components";

import { Cell, Row, Table } from "./Table";
import { calculateTextColor } from "../utils/calculateTextColor";

export const Sidebar = () => {
  return (
    <SidebarWrapper>
      <Title> Current/Latest Game</Title>
      <Table>
        <Row>
          <Cell>Guessed color</Cell>
          <Cell>Correct color</Cell>
          <Cell>Score</Cell>
        </Row>
        <Row>
          <Cell>
            <ColorBox color={"#FFBA5C"} />
          </Cell>
          <Cell>
            <ColorBox color={"blue"} />
          </Cell>
          <Cell>
            <Score>-1</Score>
          </Cell>
        </Row>
        <Row>
          <Cell colspan={2}>
            <ColorBox color={"#F86DD0"} />
          </Cell>
          <Cell>
            <Score>-1</Score>
          </Cell>
        </Row>
        <Row>
          <Cell>
            <ColorBox color={"#FFFFF"} />
          </Cell>
          <Cell>
            <ColorBox color={"#000000"} />
          </Cell>
          <Cell>
            <Score>-1</Score>
          </Cell>
        </Row>
      </Table>
    </SidebarWrapper>
  );
};

const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 20rem;
  border-right: 1px solid var(--border-color);
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
`;

interface ColorBoxProps {
  color: string;
}

const ColorBox = styled.div<ColorBoxProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0.2rem;
  background-color: ${(props) => props.color};
  border-radius: var(--border-radius);

  &::after {
    content: "${(props) => props.color}";
    color: ${(props) => calculateTextColor(props.color)};
  }
`;

const Score = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
