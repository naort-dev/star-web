import styled from 'styled-components';

const ListingStyled = styled.ul`
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  background: ${props => props.theme.white};
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
  max-width: 33.3%;
  padding-bottom: 35px;
  @media(min-width: 1280px) {
    max-width: 20%;
  }
`;

export default ListingStyled;
