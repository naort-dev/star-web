import styled from 'styled-components';

const ButtonStyled = styled.button`
  background-color: ${props => props.theme.flatBlue};
  font-family: Gilroy-Bold;
  font-size: 20px;
  padding: 20px 60px;
  border-radius: 30px;
  color: #fff;
  border: ${props => `1px solid ${props.theme.flatBlue}`};
  width: 300px;
  outline: none;
  :hover, :focus {
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.15);
  }
`;

export default ButtonStyled;
