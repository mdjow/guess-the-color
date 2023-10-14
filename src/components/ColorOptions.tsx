import styled from "styled-components";

type ColorOptionsProps = {
  options: string[];
  onSelect: (color: string) => void;
};

export const ColorOptions = (props: ColorOptionsProps) => (
  <ColorOptionsWrapper>
    {props.options.map((color, i) => (
      <Option key={i} onClick={() => props.onSelect(color)} color={color}>
        {color}
      </Option>
    ))}
  </ColorOptionsWrapper>
);

const ColorOptionsWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Option = styled.button`
  width: 100%;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 0.3rem;
  padding: 1rem;
  cursor: pointer;
`;
