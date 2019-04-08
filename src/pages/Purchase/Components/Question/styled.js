import styled from 'styled-components';

export const Layout = styled.section`
  height: 100%;
  padding: 20px 80px;
  display: flex;
`;

export const VideoContainer = styled.section`
  width: 269px;
  height: 415px;
  border-radius: 23px;
  background-color: #e3e3e3;
  margin-bottom: 60px;
`;

export const QuestionContainer = styled.section`
  padding-left: 40px;
  padding-top: 10px;
  h1 {
    font-family: Gilroy-Bold;
    font-size: 18px;
    color: #46829a;
  }
  button {
    margin-top: 40px;
    width: 224px;
    height: 60px;
  }
`;

export const QuestionWrapper = styled.section`
  display: flex;
  max-width: 220px;
  padding-top: 20px;
  svg {
    margin-top: 2px;
    color: #ff6c58;
  }
`;

export const QuestionTag = styled.span`
  font-family: Gilroy-Bold;
  font-size: 14px;
  line-height: 1.57;
  color: #7c7c7c;
  padding-left: 15px;
`;
