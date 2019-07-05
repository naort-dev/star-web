import styled from 'styled-components';

const GeneralStyled = styled.div`
  padding: 9px 20.5px;
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  position: relative;
  .left-content {
    display: none;
  }
  @media(min-width: 832px) {
    flex-direction: row;
    align-items: center;
    ${props => props.imageUrl && `
      padding: 23.8px 20.5px;
    `}
    justify-content: space-between;
    .left-content {
      display: inherit;
    }
  }
  @media(max-width: 1280px) and (min-width: 832px) {
    &.video-card {
      flex-direction: column;
      align-items: flex-start;

      & > div {
        span {
          padding-left: 0;
        }
      }
    }
  }
`;

GeneralStyled.Section = styled.div`
  display: flex;
  flex-direction: column;
  .cancel-heading {
    display: block;
    color: #fe6b57;
    font-size: 14px;
    font-family: Gilroy-Medium;
  }
  .profile-image {
    background: ${props => (props.imageUrl ? `url(${props.imageUrl})` : 'url(assets/images/default-cover.jpg)')} no-repeat;
    background-position: center center;
    background-size: cover;
    border-radius: 50%;
    width: 80px;
    height: 80px;
  } 
  .view-action {
    display: none;
    @media(min-width: 832px) {
      display: block;
      color: ${props => props.theme.flatBlue};
      font-family: Gilroy-Medium;
      font-size: 14px;
      cursor: pointer;
    }
  }
  .more-action-root {
    @media(max-width: 831px) {
      position: absolute;
      bottom: 5px;
      right: 3px;
      .more-action-icon {
        border: none;
      }
    }
  }
  .action-button {
    display: none;
    @media(min-width: 832px) {
      display: block;
      font-family: Gilroy-Medium;
      font-size: 14px;
      min-width: auto;
      margin-right: 10px;
      width: 160px;
      padding: 5px 10px;
      min-height: auto;
      height: 40px;
      &.share {
        width: 93px;
      }
    }
    @media(min-width: 832px) and (max-width: 1279px) {
      margin-top: 10px;
    }
  }
  @media(min-width: 832px) {
    align-items: center;
    flex-direction: row;
    .cancel-heading {
      display: none;
    }
  }
`;
GeneralStyled.Description = styled.span`
  .mini-title {
    display: block;
    font-family: Gilroy-Medium;
    font-size: 14px;
    color: #7e7e7e;
    .star-name {
      font-family: Gilroy-Bold;
    }
  }
  @media(min-width: 832px) {
    ${props => props.imageUrl && `
      padding-left: 19.3px;    
    `}
  }
`;

GeneralStyled.Details = styled.span`
  display: flex;
  margin-top: 8px;
  font-family: Gilroy-Medium;
  font-size: 14px;
  color:#6a6a6a;
  .time {
    color: ${props => props.theme.brown};
    margin-right: 5px;
    &.expiring {
      color: #cc0000;
    }
  }
  .share-root {
    margin-top: -4px;
  }
  .btn-links {
    color: ${props => props.theme.flatBlue};
    margin-right: 5px;
    cursor: pointer;
    padding: 0;
    border: 0;
    width: auto;
    height: auto;
    vertical-align: top;
    font-family: Gilroy-Medium;
    display: inline;
    outline: none;
    background: transparent;
    user-select: none;
    &:hover, &:focus {
      box-shadow: none;
    }
  }
  .action {
    color: ${props => props.theme.flatBlue};
    margin-left: 5px;
    cursor: pointer;
    &:before {
      content: 'View details';
      display: block;
    }
  }
  @media(min-width: 832px) {
    margin-right: 21.3px;

    .comment {
      margin-right: 39px;
    }
  }
`;
export default GeneralStyled;
