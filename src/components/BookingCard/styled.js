import styled from 'styled-components';

const BookingStyled = styled.div`

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
  @media(min-width: 832px) {
    justify-content: flex-start;
    width: auto;
    padding-right: 30.8px;
  }
`;

BookingStyled.RightSection = styled.div`
  padding-top: 27.9px;
  @media(min-width: 832px) {
    flex: 1;
    padding-top: 0;
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
