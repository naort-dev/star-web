import styled from 'styled-components';

const ListingStyled = styled.div`
  padding: 0 12px;
  @media(min-width: 832px) {
    padding: 0 17px;
  }
`;

ListingStyled.ContentHeader = styled.div`
  font-family: Gilroy-Regular;
  font-size: 16px;
  color: ${props => props.theme.twilight};
  @media(min-width: 832px) {
    font-size: 24px;
  }
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

ListingStyled.CommentsWrapper = ListingStyled.VideoItem.extend`
  display: flex;
  width: ${props => (props.visible ? '106px' : '0')};
  overflow: hidden;
  transition: all 0.3s;
  font-family: Gilroy-MediumItalic;
  font-size: 12px;
  color: ${props => props.theme.brownGrey};
  flex-direction: column;
  justify-content: space-evenly;
  .comments-inner {
    padding: 0 15px;
  }
  .comment-item {
    padding-bottom: 10px;
    display: block;
    &.empty-comment {
      white-space: nowrap;
    }
  }
  @media(min-width: 832px) {
    font-size: 19px;
    width: ${props => (props.visible ? '312px' : '0')};
    overflow: hidden;
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
  @media(min-width: 1280px) {
    padding-right: 32px;
  }
`;

ListingStyled.ContentSection = styled.div`
  margin-top: 20.6px;
`;

export default ListingStyled;
