import styled from 'styled-components';

const ListingStyled = styled.ul`
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 10px 0;
`;

ListingStyled.Content = styled.li`
  margin-bottom: 22px;
  &:last-child {
    margin-bottom: 0;
  }
`;

ListingStyled.NoDataText = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-family: Gilroy-Medium;
`;

export default ListingStyled;
