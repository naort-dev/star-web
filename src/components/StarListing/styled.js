import styled from 'styled-components';

const ListingStyled = styled.ul`
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  background: ${props => props.theme.white};
`;

ListingStyled.Content = styled.li`
  display: inline-block;
  padding-top: 46px;
  padding-right: 10px;
  @media(min-width: 1280px) {
    max-width: 20%;
  }
`;

export default ListingStyled;
