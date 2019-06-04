import styled from 'styled-components';
import { Card } from 'styles/CommonStyled';
import { HeadingBold } from '../../styled';

const CompletedStyled = Card.extend`
  display: inline-block;
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
  .details-header {
    display: flex;
    justify-content: space-between;
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
    margin-top: 4.8px;
    display: block;
    font-size: 14px;
    ${HeadingBold} {
      font-size: 14px;
    }
  }
`;

export default CompletedStyled;
