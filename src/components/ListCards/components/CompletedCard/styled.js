import styled from 'styled-components';
import { Card } from 'styles/CommonStyled';
import { HeadingBold } from '../../styled';

const CompletedStyled = Card.extend`
  display: inline-block;
  position: relative;
`;

CompletedStyled.Container = styled.div`
  padding: 14.1px 15.6px;
  display: flex;
  width: 100%;
  @media(min-width: 832px) {
    flex-direction: column;
    padding: 0;
    width: 100%;
  }
`;

CompletedStyled.ProfilePic = styled.span`
  background: ${props => (props.imageUrl ? `url(${props.imageUrl})` : 'url(assets/images/default-cover.jpg)')} no-repeat;
  background-position: center center;
  background-size: cover;
  border-radius: 13px;
  width: 90px;
  height: 145.6px;
  display: inline-block;
  @media(min-width: 832px) {
    width: 100%;
    height: 220px;
  }
`;

CompletedStyled.DetailsWrapper = styled.div`
  padding-left: 16.7px;
  flex: 1;
  margin-bottom: 84.9px;
  .details-header {
    display: flex;
    justify-content: space-between;
    padding-top: 6.7px;
    .date {
      font-family: Gilroy-Medium;
      font-size: 14px;
    }
    .rating {
      padding: 0;
      font-size: 19px;
    }
  }
  .description {
    color: ${props => props.theme.flatBlue};
    font-family: Gilroy-Regular;
    margin-top: 17.3px;
    display: block;
    font-size: 14px;
    ${HeadingBold} {
      font-size: 14px;
    }
  }
  .action-section {
    position: absolute;
    bottom: 15.6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      color: ${props => props.theme.orangePink}
      display: block;
      margin-right: 10px;
      cursor: pointer;
      &.comment {
        .comment-icon {
          transform: rotateY(180deg);
          font-size: 26px;
        }
      }
      &.tip {
        width: 23.3px;
        height: 23.3px;
        border-radius: 50%;
        font-family: Gilroy-Medium;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: ${props => props.theme.orangePink};
        color: #fff;
      }
      &.reaction {
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: Gilroy-Bold;
        font-size: 10px;
        background-color: ${props => props.theme.orangePink};
        color: #fff;
        border-radius: 60px;
        padding: 7px;
        .reaction-icon {
          margin-right: 6.5px;
          display: block;
        }
      }
    }
  }
  @media(min-width: 832px) {
    margin-bottom: 71.2px;
    padding: 10px;
    .action-section {
      left: 10px;
      right: 10px;
      .icon {
        margin-right: 0;
      }
    }
  }
`;

export default CompletedStyled;
