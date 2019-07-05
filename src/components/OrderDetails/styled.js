import styled from 'styled-components';

const OrderStyled = styled.div`
  height: ${props => props.starMode ? 'calc(100% - 100px)' : '100%'};
  ${props => props.isModal && `
    height: calc(100% - 214px);
  `}

  .checkbox-wrapper {
    display: flex;
    justify-content: center;
    padding-top: 13px;
    @media(max-width: 831px) {
      justify-content: flex-start;
      margin-left: 0;
    }
    .check-text {
      padding-top: 7px;
      font-size: 12px;
    }
  }
  .order-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

OrderStyled.HeaderText = styled.h5`
  font-family: Gilroy-Regular;
  font-size: 24px;
  color: ${props => props.theme.orangePink};
  padding-right: 24px;
  text-align: center;
  word-break: break-word;
  white-space: normal;
  word-wrap: break-word;
  font-weight: normal;
  strong {
    font-family: Gilroy-Medium;
    font-weight: normal;
  }
  @media(min-width: 832px) {
    color: ${props => props.theme.flatBlue};
    padding-right: 53px;
    margin-top: 11px;
  }
`;

OrderStyled.Heading = styled.span`
  font-family: Gilroy-Regular;
  font-size: 24px;
  display: block;
  text-align: center;
  color: ${props => props.theme.flatBlue};
  margin: 30px 0 10px;
  ${props => !props.starMode && `
    margin-top: 0;  
  `}
  @media(max-width: 831px) {
    font-size: 18px;
    color: #999;
    margin: 10px 0 10px;
  }
`;

OrderStyled.TextButton = styled.span`
  display: block;
  color: ${props => props.theme.flatBlue};
  cursor: pointer;
  font-size: 16px;
  font-family: Gilroy-Regular;
`;

OrderStyled.ColumnCenter = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 13px;
  @media(max-width: 831px) {
    justify-content: flex-start;
    margin-left: 10px;
  }
  .check-text {
    padding-top: 7px;
    font-size: 12px;
  }
`;

OrderStyled.DetailList = styled.ul`
  display: table;
  padding: 20px 0;
  .detail-item {
    display: table-row;
    padding: 10px 0;
    .detail-title {
      font-family: Gilroy-Regular;
      font-size: 14px;
      padding-bottom: 10px;
      display: table-cell;
      color: #b7b7b7;
    }
    .detail-value {
      font-family: Gilroy-Medium;
      font-size: 14px;
      color: #565657;
      display: table-cell;
      padding-left: 10px;
      line-height: 25px;
      .detail-comment {
        display: block;
      }
    }
  }
`;

OrderStyled.ScriptWrapper = styled.div`
  display: block;
  max-width: 520px;
  margin: 0 auto;
  position: relative;
  .script-wrapper {
    margin-bottom: 15px;
  }
  .script {
    color: #2f839d;
  }
  section:nth-child(2) {
    padding: 18px 30px;
  }
  ${props => props.isMoreActions && `
    padding-top: 28px;  
  `}
  .additional-info {
    display: flex;
    padding-left: 11px;
    padding-top: 13px;
    font-family: Gilroy-Regular;
    font-size: 14px;
    color: ${props => props.theme.greyishBrown};

    padding-left: 43px;
    display: flex;
    flex-direction: column;
    .title {
      margin-bottom: 5px;
    }
    @media(max-width: 831px) {
      padding: 0 20px;
    }
    .value {
      min-height: 85px;
      max-height: 85px;
      overflow: auto;
      padding-left: 0;
      margin-bottom: 5px;
      @media(max-width: 831px) {
        min-height: 20px;
      }
      &::-webkit-scrollbar {
        width: 5px;
        height: 8px;
        background-color: #aaa;
      }

      &::-webkit-scrollbar-thumb {
          background: #000; 
      }
    }
    @media(min-width: 832px) {
      padding-left: 43px;
      display: flex;
      flex-direction: column;
      .title {
        margin-bottom: 5px;
      }
    }
  }
  .more-action-root {
    position: absolute;
    top: 0;
    right: 12px;
    @media(min-width: 832px) {
      right: -30px;
    }
  }
  @media(min-width: 832px) {
    padding-top: 0;
  }
`;

OrderStyled.Details = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 44px;
  .star-action-btn {
    display: ${props => (props.starMode ? 'none' : 'block')};
    @media(min-width: 832px) {
      display: block;
    }
  }
  @media(max-width: 831px) {
    padding: 0 20px;
    align-items: center;
  }
`;

export default OrderStyled;
