import styled from 'styled-components';

const TippingStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  .tipping-list {
    display: flex;
    margin-top: 10px;
    .tipping-item {
      padding: 10px;
      display: flex;
      cursor: pointer;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      border: solid 1px #cccccc;
      background-color: #ffffff;
      margin-right: 7px;
      font-family: Gilroy-Regular;
      font-size: 12px;
      color: #3c3c3c;
    }
  }
`;

export default TippingStyled;
