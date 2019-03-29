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
  @media(min-width: 1280px) {
    max-width: 100%;
  }
`;

ListingStyled.Content = styled.li`
  display: flex;
  justify-content: center;
  padding-top: 46px;
  padding-right: 10px;
  max-width: 33.3%;
  @media(min-width: 1280px) {
    max-width: 20%;
  }
`;

export default ListingStyled;
