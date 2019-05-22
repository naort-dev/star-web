import styled from 'styled-components';

const disabledStyles = (isDisabled) => {
  if (isDisabled) {
    return `
      opacity: 0.3;
      pointer-events: none;
    `;
  }
};

const ButtonStyled = styled.button`
  ${props => disabledStyles(props.isDisabled)};
  background-color: ${props => props.secondary ? '#fff' : props.theme.flatBlue};
  font-family: Gilroy-SemiBold;
  font-size: ${props => props.bold ? '20px' : '16px'};
  padding: 6px 14px;
  color: ${props => props.secondary ? props.theme.flatBlue : '#fff'};
  max-width: 100%;
  border: ${props => `1px solid ${props.theme.flatBlue}`};
  min-width: 86.6px;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  :hover, :focus {
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.15);
  }
`;

export default ButtonStyled;
