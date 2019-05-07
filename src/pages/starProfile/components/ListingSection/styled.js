import styled from 'styled-components';

const ListingStyled = styled.div`
  padding: 0 12px;
  @media(min-width: 832px) {
    padding: 0 17px;
  }
`;

ListingStyled.ContentHeader = styled.div`
  font-family: Gilroy-Light;
  font-size: 16px;
  color: ${props => props.theme.twilight};
`;

ListingStyled.Content = styled.ul`
  margin-top: 11.6px;
  display: flex;
  flex-wrap: wrap;
`;

ListingStyled.VideoItem = styled.div`
  width: 106px;
  height: 150px;
  @media(min-width: 832px) {
    width: 201px;
    height: 263px;
  }
`;

ListingStyled.VideoItemWrapper = styled.div`

`;

ListingStyled.CommentsWrapper = styled.div`
  display: ${props => (props.visible ? 'block' : 'none')};
  padding: 0 15px;
  .comment-item {
    padding-bottom: 10px;
    display: block;
  }
`;

ListingStyled.ContentItem = styled.li`
  display: flex;
  padding-right: 10px;
  margin-bottom: 35px;
  &.show-more {
    padding: 0;
    margin: 0;
    width: 100%;
    justify-content: flex-end;
    font-size: 16px;
    font-family: Gilroy-Medium;
    color: ${props => props.theme.flatBlue};
    span {
      cursor: pointer;
    }
  }
`;

ListingStyled.ContentSection = styled.div`
  margin-top: 20.6px;
`;

export default ListingStyled;
