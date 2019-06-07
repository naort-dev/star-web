import styled from 'styled-components';

const ListingStyled = styled.div`
  padding: 0 12px;
  max-width: 362px;
  margin: 0 auto;
  @media (min-width: 0px) and (max-width: 831px) {
    .video-wrap {
      .play-button {
        @media (max-width: 1280px) {
          width: 36px;
          height: 36px;
          font-size: 16px;
        }
        @media (max-width: 832px) {
          margin-bottom: 9px;
        }
      }
    }
    .latest-video {
      li {
        &:nth-child(3n) {
          padding-right: 0;
        }
      }
    }
    .latest-response {
      li {
        &:nth-child(3n) {
          padding-right: 0;
        }
      }
    }
  }
  @media (min-width: 832px) and (max-width: 1279px) {
    max-width: 100%;
    padding: 0 17px;
    .latest-video {
      margin-top: 12.6px;
      li {
        margin-right: calc((100% - (209px * 3))/2);
        padding-right: 0;
        &:nth-child(3n) {
          margin-right: 0;
        }
        &.show-more {
          margin-right: 0;
        }
      }
    }
    .latest-response {
      margin-top: 12.6px;
      li {
        margin-right: calc((100% - (209px * 3))/2);
        padding-right: 0;
        &:nth-child(3n) {
          margin-right: 0;
        }
        &.show-more {
          margin-right: 0;
        }
      }
    }
  }
  @media (min-width: 1280px) {
    max-width: 100%;
    padding: 0 17px;
    .latest-video {
      margin-top: 13.6px;
      li {
        margin-right: calc((100% - (209px * 5))/4);
        padding-right: 0;
        &:nth-child(5n) {
          margin-right: 0;
        }
        &.show-more {
          margin-right: 0;
        }
      }
    }
    .latest-response {
      margin-top: 13.6px;
      li {
        margin-right: calc((100% - (209px * 5))/4);
        padding-right: 0;
        &:nth-child(5n) {
          margin-right: 0;
        }
        &.show-more {
          margin-right: 0;
        }
      }
    }
  }
`;

ListingStyled.ContentHeader = styled.div`
  font-family: Gilroy-Light;
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
    width: 209px;
    height: 263px;
  }
`;

ListingStyled.VideoItemWrapper = styled.div`

`;

ListingStyled.CommentsWrapper = ListingStyled.VideoItem.extend`
  display: flex;
  width: ${props => (props.visible ? '0' : '0')};
  overflow: hidden;
  transition: all 0.3s;
  font-family: Gilroy-MediumItalic;
  font-size: 12px;
  color: ${props => props.theme.brownGrey};
  flex-direction: column;
  justify-content: space-evenly;
  .comments-inner {
    padding: 0 15px;
    @media(min-width: 832px) {
      padding: 0 33px;
    }
    @media(min-width: 1280px) {
      
    }
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
    width: ${props => (props.visible ? '344px' : '0')};
    overflow: hidden;
  }
  @media(min-width: 1280px) {
    width: ${props => (props.visible ? '312px' : '0')};
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
    margin-top: -16px;
    span {
      cursor: pointer;
    }
  }
  @media(min-width: 1280px) {
    padding-right: 32px;
  }
`;

ListingStyled.ContentSection = styled.div`
  margin-top: 7.6px
  &.response-wrapper {
    margin-top: 40.6px;
    margin-bottom: 40px;
    @media(max-width: 831px) {
      margin-top: 7.6px
    }
  }
  @media(min-width: 832px) {
    margin-top: 56px;
  }
  @media(min-width: 1280px) {
    margin-top: 49px;
  }
`;

export default ListingStyled;
