import styled from 'styled-components';

const OrderStyled = styled.div`

`;

OrderStyled.HeaderText = styled.h5`
  font-family: Gilroy-Regular;
  font-size: 24px;
  color: ${props => props.theme.orangePink};
  padding-right: 24px;
  text-align: center;
  strong {
    font-family: Gilroy-Medium;
  }
  @media(min-width: 832px) {
    color: ${props => props.theme.flatBlue};
  }
`;

OrderStyled.Heading = styled.span`
  font-family: Gilroy-Regular;
  font-size: 24px;
  display: block;
  text-align: center;
  color: ${props => props.theme.flatBlue};
  margin: 30px 0;
  ${props => !props.starMode && `
    margin-top: 0;  
  `}
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
  .check-text {
    padding-top: 5px;
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
  .additional-info {
    display: table;
    padding-left: 11px;
    padding-top: 13px;
    font-family: Gilroy-Regular;
    font-size: 14px;
    color: ${props => props.theme.greyishBrown};
    @media(min-width: 832px) {
      padding-left: 43px;
    }
    .info-item {
      display: table-cell;
      &.title {
        white-space: nowrap;
      }
      &.value {
        padding-left: 10px;
      }
    }
  }
  .more-action-root {
    position: absolute;
    top: -12px;
    right: -30px;
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
  @media(mn-width: 832px) {
    padding: 0 85px;
  }
`;

export default OrderStyled;
