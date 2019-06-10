import styled from 'styled-components';

const BookingStyled = styled.div`

`;

BookingStyled.Layout = styled.div`
  display: flex;
  padding-top: 15.2px;
  flex-direction: column;
`;

BookingStyled.LeftSection = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

BookingStyled.RightSection = styled.div`
  padding-top: 27.9px;
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

export default BookingStyled;
