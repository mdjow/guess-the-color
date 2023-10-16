import { useContext } from "react";

import styled from "styled-components";
import { CheckCircleOutlined, HighlightOff } from "@mui/icons-material";

import { TableCell, TableRow, Table, TableBody, TableHeader } from "./Table";
import { calculateTextColor } from "../utils/calculateTextColor";
import { GameAnswer, GameContext } from "../context/gameContext";
import { ScoreEnum } from "../enum/score";

export const Sidebar = () => {
  const { state } = useContext(GameContext);

  const buildColorCells = (answer: GameAnswer) => {
    if (!answer.pick) {
      return (
        <TableCell colSpan={2}>
          <TimeOutBox>Time Out</TimeOutBox>
        </TableCell>
      );
    }
    if (answer.pick === answer.color) {
      return (
        <TableCell colSpan={2}>
          <ColorBox color={answer.pick} />
        </TableCell>
      );
    }

    return (
      <>
        <TableCell>
          <ColorBox color={answer.pick} />
        </TableCell>
        <TableCell>
          <ColorBox color={answer.color} />
        </TableCell>
      </>
    );
  };

  return (
    <SidebarWrapper>
      <Title> Current/Latest Game</Title>
      <Table>
        <TableHeader>
          <TableCell>Guessed color</TableCell>
          <TableCell>Correct color</TableCell>
          <TableCell>Score</TableCell>
        </TableHeader>
        <TableBody>
          {state?.answers.map((answer) => (
            <TableRow key={`${answer.pick}-${answer.color}`}>
              {buildColorCells(answer)}
              <TableCell>
                <Score>
                  {answer.score === ScoreEnum.SUCCESS ? (
                    <CheckCircleOutlined color="success" />
                  ) : (
                    <HighlightOff color="error" />
                  )}
                  {answer.score}
                </Score>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
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
  color?: string;
}

const ColorBox = styled.div<ColorBoxProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0.2rem;
  border-radius: var(--border-radius);
  background-color: ${(props) => props.color};

  &::after {
    content: "${(props) => props.color}";
    color: ${(props) => props.color && calculateTextColor(props.color)};
  }
`;

const TimeOutBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0.2rem;
  border-radius: var(--border-radius);
  border: 1px solid #e0e0e0;
`;

const Score = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-weight: 600;
`;
