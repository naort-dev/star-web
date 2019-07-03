import styled from 'styled-components';
import { FlexBoxSB } from 'styles/CommonStyled';
import { CardContainer, LeftContent } from '../../styled';


const StarStyled = CardContainer.extend`
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 18px;
  position: relative;
  .card-description {
    display: none;
  }
  .heading {
    .activity {
      display: inline-block;
      vertical-align: middle;
      &.desktop {
        display: none;
      }
      &.mobile {
        padding-top: 4px;
      }
    }
  }
  .icons {
    margin-right: 10px;
    font-size: 19px;
    diaplay: inline-block;
    vertical-align: middle;
    color: ${props => props.theme.orangePink};
    &.icon-comment {
      transform: rotateY(180deg);
    }
    &.icon-rating {
      font-size: 22px;
      margin-right: 6px;
      @media(min-width: 832px) {
        font-size: 24px;
      }
    }
    &.icon-heart {
      color: #ff3636;
      font-size: 23px;
    }
    &.icon-tip {
      width: 23px;
      height: 23px;
      display: inline-block;
      background: #ff6c58;
      border-radius: 50%;
      color: #fff;
      font-size: 14px;
      text-align: center;
      padding-top: 4px;
      font-family: Gilroy-Regular;
    }
  }
  @media(min-width: 1280px) {
    flex-direction: row;
    align-items: center;
    padding-top: 18px;
    .description-wrapper {
      padding-left: 19.3px;
      padding-right: 19.3px;
      .heading {
        display: flex;
        align-items: center;
        .activity {
          &.mobile {
            display: none;
          }
          &.desktop {
            display: block;
          }
        }
      }
    }
    .card-description {
      display: initial;
      margin-top: 9px;
    }
  }
  @media(min-width: 832px) and (max-width: 1280px){
    .description-wrapper {
      .heading {
        margin-bottom: 15px;

        & + span {
          margin-bottom: 15px;
        }
      }
    }
  }
`;

StarStyled.LeftWrapper = styled.div`
  display: flex;
`;

StarStyled.UserImage = LeftContent.extend`
  display: none;
  background: ${props => (props.imageUrl ? `url(${props.imageUrl})` : 'url(assets/images/default-cover.jpg)')} no-repeat;
  background-position: center center;
  background-size: cover;
  ${props => props.starMode ? `
    border-radius: 8px;
  ` : `
    width: 80px;
    height: 80px;
    border-radius: 50%;
  `}
  @media(min-width: 1280px) {
    display: block;
  }
`;

StarStyled.CommentContainer = FlexBoxSB.extend`
  margin-top: 12.2px;
  justify-content: flex-start;
  @media(max-width: 831px) {
    align-items: center;
  }
  .action-text {
    font-family: Gilroy-Medium;
    font-size: 14px;
    color: ${props => props.theme.flatBlue};
    cursor: pointer;
    position: absolute;
    right: 14px;
    top: 15px;
    @media(max-width: 832px) {
      top: 13px;
    }
  }
  .comment-section {
    min-height: 73px;
    width: 209px;
    overflow: hidden;
    @media(max-width: 831px) {
      min-height: auto;
    }
  }
  .divider {
    width: 0;
    height: 71px;
    display: block;
    position: relative;
    border-left: 1px solid #d1d1d1;
    margin-left: 28px;
    .quick-comment-root {
      width: 28px;
      height: 28px;
      position: absolute;
      left: -15px;
      top: 22px;
      box-shadow: 0 3px 5px 0 rgba(0,0,0,0.06);
      border: solid 1px #e3e3e3;
      border-radius: 50%;
      font-size: 11px;  
    }
  }
  @media(min-width: 832px) {
    margin-top: 0;
    align-items: center;
    flex: 0 0 30%;
    .comment-section {
      width: 224px;
    }
  }
  @media(min-width: 832px) and (max-width: 1280px) {
    .comment-section {
      width: 400px;
      max-width: 100%;
    }
    .action-text {
      right: 19px;
      top: 15px;
    }
  }
  @media(min-width: 1280px) {
    .comment-section {
      width: 267px;
      max-width: 100%;
    }
    .action-text {
      position: static;
      margin-left: 24px;
    }
  }
`;

export default StarStyled;
