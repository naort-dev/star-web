import styled from 'styled-components';
import { Card } from 'styles/CommonStyled';
import { HeadingBold } from '../../styled';

const CompletedStyled = Card.extend`
  display: inline-block;
  position: relative;
  .favorite-icon {
    display: block;
    color: ${props => props.isFavorite ? props.theme.orangePink : '#fff'};
    font-size: 28px;
    position: absolute;
    top: 22.2px;
    left: 20px;
    cursor: pointer;
  }
  @media(min-width: 832px) {
    .favorite-icon {
      top: 20.2px;
      left: initial;
      right: 18.3px;
    }
  }
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
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

CompletedStyled.IconWrapper = styled.span`
  color: ${props => props.theme.orangePink}
  display: block;
  visibility: ${props => (props.visible ? 'initial' : 'hidden')};
  margin-right: 10px;
  cursor: pointer;
  &.comment {
    .comment-icon {
      transform: rotateY(180deg);
      font-size: 26px;
    }
  }
  &.tip {
    padding: 5px 9.5px;
    border-radius: 10px;
    font-family: Gilroy-Medium;
    font-size: 10px;
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
    padding: 5px 9.5px;
    text-transform: uppercase;
    .reaction-icon {
      margin-right: 6.5px;
      display: block;
    }
  }
  @media(min-width: 832px) {
    margin-right: 0;
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
      font-size: 12px;
      margin-top: 6px;
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
  }
  @media(min-width: 832px) {
    margin-bottom: 71.2px;
    padding: 10px;
    .action-section {
      left: 10px;
      right: 10px;
    }
  }
`;

export default CompletedStyled;
