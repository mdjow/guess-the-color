import styled from "styled-components";

interface ColorOptionsProps {
  options: string[];
  disabled: boolean;
  onSelect: (color: string) => void;
}

export const ColorOptions = ({
  onSelect,
  options,
  disabled,
}: ColorOptionsProps) => (
  <ColorOptionsWrapper>
    {options.map((color, i) => (
      <Option
        key={i}
        onClick={() => onSelect(color)}
        color={color}
        disabled={disabled}
      >
        {color}
      </Option>
    ))}
  </ColorOptionsWrapper>
);

const ColorOptionsWrapper = styled.div`
  display: flex;
  gap: 0.3rem;
`;

const Option = styled.button`
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: var(--border-radius);
  cursor: pointer;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;

  &:hover:enabled {
    background-color: #eeeeee;
  }
`;
