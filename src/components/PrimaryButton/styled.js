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
  font-size: 18px;
  padding: 16px 30px;
  border-radius: 30px;
  color: ${props => props.secondary ? props.theme.flatBlue : '#fff'};
  max-width: 100%;
  border: ${props => `1px solid ${props.theme.flatBlue}`};
  width: 242px;
  outline: none;
  cursor: pointer;
  :hover, :focus {
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.15);
  }
  &:active {
    color: #fff;
    background-color: ${props => props.theme.greyishBrown};
    border-color: ${props => props.theme.greyishBrown};
  }
  @media(min-width: 375px) {
    width: 300px;
    font-size: 20px;
  }
`;

export default ButtonStyled;
