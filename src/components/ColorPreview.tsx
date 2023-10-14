import styled from "styled-components";

type ColorPreviewProps = {
  color: string;
  started: boolean;
  onStart: () => void;
};

export const ColorPreview = (props: ColorPreviewProps) => (
  <ColorPreviewWrapper color={props.color}>
    {!props.started && <StartButton onClick={props.onStart}>Start</StartButton>}
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
  background-color: #fff;
  border: 1px solid #e0e0e0;
  font-size: 1.5rem;
  padding: 0.7rem 3rem;
  border-radius: 0.3rem;
  cursor: pointer;
`;
