import styled from 'styled-components';

const Heading = styled.span`
  margin-top: 20px;
  padding: 0 30px;
  font-family: Gilroy-SemiBold;
  font-size: 34px;
  line-height: 40px;
  text-align: center;
  color: ${props => props.theme.twilight};
  display: block;
  margin-bottom: 40px;
  @media(min-width: 375px) {
    font-size: 43px;
    line-height: 50px;
  }
`;

const ButtonWrapper = styled.span`
  display: block;
  margin: 10.5px 0;
`;

export { Heading, ButtonWrapper };
