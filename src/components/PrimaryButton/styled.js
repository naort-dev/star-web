import styled from 'styled-components';

const ButtonStyled = styled.button`
  background-color: ${props => props.theme.flatBlue};
  font-family: Gilroy-Bold;
  font-size: 18px;
  padding: 20px 30px;
  border-radius: 30px;
  color: #fff;
  border: ${props => `1px solid ${props.theme.flatBlue}`};
  width: 242px;
  outline: none;
  :hover, :focus {
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.15);
  }
  @media(min-width: 375px) {
    width: 300px;
    font-size: 20px;
  }
`;

export default ButtonStyled;
