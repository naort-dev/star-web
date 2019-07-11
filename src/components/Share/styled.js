import styled from 'styled-components';

const ShareStyled = styled.div`
  .action-btn {
    min-width: auto;
    min-height: auto;
    font-size: 14px;
    width: 130px;
    height: 40px;
  }
`;

ShareStyled.List = styled.ul`
  padding: 12.3px;
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  max-width: 230px;
  justify-content: center;
  .list-item {
    color: ${props => props.theme.flatBlue};
    padding: 10px;
    .social-btn {
      cursor: pointer;
      outline: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      .icon {
        font-size: 19px;
      }
      .icon-text {
        font-size: 14px;
        font-family: Gilroy-Regular;
        display: block;
        margin-top: 9px;
      }
    }
  }
`;

export default ShareStyled;
