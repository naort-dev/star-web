import styled from 'styled-components';

const GeneralStyled = styled.div`
  padding: 9px 20.5px;
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  .left-content {
    display: none;
  }
  @media(min-width: 832px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .left-content {
      display: inherit;
    }
  }
`;

GeneralStyled.Section = styled.div`
  display: flex;
  align-items: center;
  .close-icon {
    &:before {
      content: '';
      display: none;
      border: none;
    }
    svg {
      font-size: 22px;
    }
  }
  .view-action {
    color: ${props => props.theme.flatBlue};
    font-family: Gilroy-Medium;
    font-size: 14px;
    cursor: pointer;
  }
  .action-button {
    display: none;
    @media(min-width: 832px) {
      display: block;
      font-family: Gilroy-Medium;
      font-size: 14px;
      min-width: auto;
      width: 160px;
      padding: 5px 10px;
      min-height: auto;
      height: 40px;
    }
  }
`;
GeneralStyled.Description = styled.span`
  @media(min-width: 832px) {
    padding-left: 19.3px;
  }
`;

GeneralStyled.Details = styled.span`
  display: flex;
  margin-top: 8px;
  font-family: Gilroy-Medium;
  font-size: 14px;
  color: #b4b4b4;
  ${props => !props.isOpen && `
    margin: 0;
  `}
  .time {
    color: ${props => props.theme.brown};
    margin-right: 5px;
    .time-head {
      display: none;
      @media(min-width: 832px) {
        display: inline;
      }
    }
    &.expiring {
      color: #cc0000;
    }
  }
  .action {
    color: ${props => props.theme.flatBlue};
    margin-left: 5px;
    cursor: pointer;
    &:before {
      content: 'Make Video';
      display: block;
    }
  }
  @media(min-width: 832px) {
    margin-right: 21.3px;
    .action {
      &:before {
        content: 'View Details';
      }
    }
    .comment {
      margin-right: 39px;
    }
  }
`;
export default GeneralStyled;
