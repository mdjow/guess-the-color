import styled from "styled-components";

interface CellProps {
  colspan?: number;
}

export const Table = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid var(--border-color);
`;

export const Cell = styled.div<CellProps>`
  flex: ${(props) => props.colspan ?? 1};
  text-align: center;
  padding: 0 0.5rem;
`;
