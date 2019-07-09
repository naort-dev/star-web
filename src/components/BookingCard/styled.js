import styled from 'styled-components';

const BookingStyled = styled.div`
  height: ${props => (props.starMode ? '100vh' : 'calc(100vh - 214px)')};
  .scrollbar-content {
    position: static !important;
  }
  @media(min-width: 832px) {
    transition: transform 0.5s ease;
    transform-style: preserve-3d;
    height: ${props => (props.starMode ? '100%' : 'calc(100% - 214px)')};
    position: relative;
    .scrollbar-content {
      position: absolute !important;
    }
    ${props => !props.starMode && `
      position: relative;
    `}
    ${props => props.showDetails && `
      transform: rotateY(180deg);
    `}
  }
`;

BookingStyled.Wrapper = styled.div`
  .close-btn {
    z-index: 1;
  }
  @media(min-width: 832px) {
    height: 100%;
  }
`;

BookingStyled.Heading = styled.span`
  display: block;
  font-family: Gilroy-Regular;
  font-size: 24px;
  display: ${props => (props.starMode ? 'block' : 'none')};
  text-align: center;
  color: ${props => props.theme.flatBlue};
  margin: 30px 0 10px;
  @media(max-width: 831px) {
    font-size: 18px;
    color: #999;
    margin: 10px 0 10px;
  }
`;

BookingStyled.Booking = styled.div`
  display: ${props => !props.starMode && props.showDetails ? 'none' : 'block'};
  @media(min-width: 832px) {
    height: 100%;
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 5;
    height: auto;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
`;

BookingStyled.OrderWrapper = styled.div`
  display: ${props => props.starMode || props.showDetails ? 'block' : 'none'};
  @media(min-width: 832px) {
    height: 100%;
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 10;
    height: auto;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    transform: rotateY(180deg);
    background: #fff;
  }
`;

BookingStyled.OrderText = styled.span`
  font-family: Gilroy-SemiBold;
  font-size: 14px;
  color: ${props => props.theme.flatBlue};
  cursor: pointer;
  margin-top: 20px;
  text-align: center;
  display: ${props => (props.starMode ? 'none' : 'block')};
  @media(min-width: 832px) {
    display: block;
  }
`;

BookingStyled.HeaderText = styled.h5`
  font-family: Gilroy-Regular;
  font-size: 24px;
  color: ${props => props.theme.orangePink};
  padding: 0 24px;
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


BookingStyled.Layout = styled.div`
  display: flex;
  padding-top: 15.2px;
  flex-direction: column;
  padding-bottom: 10px;
  @media(min-width: 832px) {
    flex-direction: row;
    padding-top: ${props => (props.starMode ? '40px' : '0')};
    height: 100%;
  }
  @media screen and (min-width: 832px) and (max-height: 720px) {
    padding-top: ${props => (props.starMode ? '20px' : '0')};
  }
`;

BookingStyled.LeftSection = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  flex-direction: column;
  .more-action-root {
    display: flex;
    width: 100%;
    justify-content: flex-end;
  }
  ${BookingStyled.OrderText} {
    display: none;
  }
  @media(min-width: 832px) {
    justify-content: flex-start;
    width: auto;
    padding-right: 30.8px;
    .more-action-root {
      display: none;
    }
    ${BookingStyled.OrderText} {
      display: block;
    }
    .star-name {
      display: flex;
      justify-content: flex-start;
      margin-top: 10px;
      width: 100%;
      font-family: Avenir-Medium;
      font-size: 20px;
      color: ${props => props.theme.twilight};
    }
  }
`;

BookingStyled.RightSection = styled.div`
  padding-top: 27.9px;
  display: flex;
  flex-direction: column;
  ${BookingStyled.OrderText} {
    display: ${props => (props.starMode ? 'none' : 'block')};
  }
  @media(min-width: 832px) {
    flex: 1;
    padding-top: 0;
    ${BookingStyled.OrderText} {
      display: none;
    }
  }
`;

BookingStyled.title = styled.span`
  font-family: Gilroy-Regular;
  font-size: 14px;
  color: #b7b7b7;
`;

BookingStyled.Description = styled.span`
  font-family: Gilroy-Medium;
  font-size: 14px;
  color: #565657;
`;

BookingStyled.CommentList = styled.div`
  ${props => props.isPublic && `
    order: 3;
  `}
  @media screen and (min-width: 832px) {
    height: ${props => (props.starMode ? '342px' : '335px')};
    flex: 1;
  }
  @media screen and (min-width: 832px) and (max-height: 720px) {
    height: ${props => (props.starMode ? '342px' : '275px')};
  }
`;

export default BookingStyled;
