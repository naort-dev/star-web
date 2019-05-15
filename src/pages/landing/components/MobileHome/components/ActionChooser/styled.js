import styled from 'styled-components';

const Heading = styled.span`
  margin-top: 10px;
  padding: 0 30px;
  font-family: Gilroy-SemiBold;
  font-size: 34px;
  line-height: 40px;
  text-align: center;
  color: ${props => props.theme.twilight};
  display: block;
  margin-bottom: 50px;
  max-width: 330px;
  @media(min-width: 375px) {
    font-size: 43px;
    line-height: 50px;
  }
`;

const ButtonWrapper = styled.span`
  display: block;
  margin: 10.5px 0;
  .button {
    padding: 18px 30px;
    border-radius: 35px;
    font-size: 18px;
  }
`;

export { Heading, ButtonWrapper };
