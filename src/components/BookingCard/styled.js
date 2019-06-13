import styled from 'styled-components';

const BookingStyled = styled.div`

`;


BookingStyled.OrderText = styled.span`
  font-family: Gilroy-SemiBold;
  font-size: 14px;
  color: ${props => props.theme.flatBlue};
  cursor: pointer;
  display: block;
  margin-top: 20px;
  text-align: center;
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
    display: block;
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
