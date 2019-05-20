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
  background-color: ${props => props.theme.flatBlue};
  font-family: Gilroy-SemiBold;
  font-size: 18px;
  padding: 20px 30px;
  border-radius: 30px;
  color: #fff;
  border: ${props => `1px solid ${props.theme.flatBlue}`};
  width: 242px;
  outline: none;
  cursor: pointer;
  :hover, :focus {
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.15);
  }
  @media(min-width: 375px) {
    width: 300px;
    font-size: 20px;
  }
`;

export default ButtonStyled;
