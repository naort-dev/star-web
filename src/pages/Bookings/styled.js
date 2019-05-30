import styled from 'styled-components';
import { media } from 'styles/mediaQueries';

const BookingsStyled = styled.div`
  padding: 20.7px 17.7px;
  .arrow {
    width: 14px;
    height: 28px;
    top: 110px;
    ${media.webView} {
      display: none;
    }
  }
`;

BookingsStyled.Header = styled.span`
  font-family: Gilroy-Light;
  font-size: 30px;
  color: ${props => props.theme.brownGrey};
`;

export default BookingsStyled;
