import styled from "styled-components";

interface CellProps {
  colSpan?: number;
}

export const Table = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid var(--border-color);
  font-weight: 600;
`;

export const TableBody = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const TableRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid var(--border-color);
`;

export const TableCell = styled.div<CellProps>`
  flex: ${(props) => props.colSpan ?? 1};
  text-align: center;
  padding: 0 0.5rem;
`;
