import styled from 'styled-components';

const ListingStyled = styled.ul`
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 10px 0;
`;

ListingStyled.Content = styled.div`
  margin-bottom: 22px;
  display: flex;
  ${props => props.sentComment && `
    justify-content: flex-end;
  `}
  &:last-child {
    margin-bottom: 0;
  }
`;

export default ListingStyled;
