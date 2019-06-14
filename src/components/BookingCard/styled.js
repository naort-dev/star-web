import styled from 'styled-components';

const BookingStyled = styled.div`
  @media(min-width: 832px) {
    transition: transform 1s;
    transform-style: preserve-3d;
    height: 100%;
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
  display: block;
  text-align: center;
  color: ${props => props.theme.flatBlue};
  margin: 30px 0;
`;

BookingStyled.Booking = styled.div`
  @media(min-width: 832px) {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
`;

BookingStyled.OrderWrapper = styled.div`
  @media(min-width: 832px) {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
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
  padding-right: 24px;
  text-align: center;
  strong {
    font-family: Gilroy-Medium;
  }
  @media(min-width: 832px) {
    color: ${props => props.theme.flatBlue};
  }
`;


BookingStyled.Layout = styled.div`
  display: flex;
  padding-top: 15.2px;
  flex-direction: column;
  padding-bottom: 10px;
  @media(min-width: 832px) {
    flex-direction: row;
    padding-top: 55.2px;
  }
`;

BookingStyled.LeftSection = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  flex-direction: column;
  ${BookingStyled.OrderText} {
    display: none;
  }
  @media(min-width: 832px) {
    justify-content: flex-start;
    width: auto;
    padding-right: 30.8px;
    ${BookingStyled.OrderText} {
      display: block;
    }
  }
`;

BookingStyled.RightSection = styled.div`
  padding-top: 27.9px;
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
  @media(min-width: 832px) {
    height: 342px;
  }
`;

export default BookingStyled;
