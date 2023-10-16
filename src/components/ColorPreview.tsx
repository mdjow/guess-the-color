import styled from "styled-components";

interface ColorPreviewProps {
  color: string;
  started: boolean;
  onStart: () => void;
}

export const ColorPreview = ({
  color,
  started,
  onStart,
}: ColorPreviewProps) => (
  <ColorPreviewWrapper color={color}>
    {!started && <StartButton onClick={onStart}>Start</StartButton>}
  </ColorPreviewWrapper>
);

const ColorPreviewWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20rem;
  background-color: ${(props) => props.color};
`;

const StartButton = styled.button`
  font-size: 1.5rem;
  padding: 0.7rem 3rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  background-color: #fff;
  border: 1px solid #e0e0e0;
`;
