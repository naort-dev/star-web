import styled from 'styled-components';

const ListingStyled = styled.ul`
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  max-width: 834px;
  padding-top: 30px;
  @media(min-width: 1280px) {
    max-width: 100%;
    padding-top: 30px;
  }
`;

ListingStyled.Content = styled.li`
  display: flex;
  justify-content: center;
  padding-right: 10px;
  padding-bottom: 35px;
  width: 40%;
  @media(min-width: 375px) {
    width: 33.3%;
    &:nth-of-type(3n+1) {
      justify-content: flex-start;
    }
    &:nth-of-type(3n) {
      justify-content: flex-end;
    }
  }
  @media(min-width: 1280px) {
    width: 20%;
    justify-content: center;
    &:nth-of-type(3n+1) {
      justify-content: center;
    }
    &:nth-of-type(3n) {
      justify-content: center;
    }
  }
`;

export default ListingStyled;
