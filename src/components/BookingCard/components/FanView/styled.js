import styled from 'styled-components';

const FanViewStyled = styled.div`
  padding: 0 30px;
  #comments-scroll-target {
    @media(max-width: 831px) {
      position: relative !important;
      margin: 0 !important;
      overflow: auto !important;
      height: auto !important;
    }
  }
  #comments-scroll-target > section {
    min-height: 265px;
    @media(max-width: 831px) {
      min-height: auto;
    }
  }
  @media(min-width: 832px) {
    height: 100%;
  }
`;

FanViewStyled.VideoWrapper = styled.div`
  width: 195.7px;
  height: 301.9px;
  position: relative;
  padding-top: ${props => (props.closeEnable ? '36px' : '')};
  .close-btn {
    top: 0;
    left: 0;
  }
  .player-icon-wrap {
    top: 50%;
    transform: translateY(-50%);
    bottom: unset;
  }
  .video-container {
    box-shadow: none;
  }
  @media(min-width: 832px) {
    width: 310.3px;
    height: 100%;
    min-height: 350px;
  }
`;

FanViewStyled.DetailWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 20px;
  ${props => props.isPublic && `
    order: 1;
    margin-bottom: 0;
  `}
  .more-action-root {
    display: none;
  }
  .detail-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .title {
    margin-right: 5px;
  }
  @media(min-width: 832px) {
    .more-action-root {
      display: block;
    }
  }
`;

FanViewStyled.CommentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .loader {
    height: 100%;
  }
  .comment-box {
    width: 100%;
  }
  ${props => props.isPublic && `
    order: 2;
    margin-bottom: 10px;
    .comment-box {
      .input-wrapper {
        height: 63px;
        border-radius: 13px;
        align-items: flex-end;
        .comment-icon {
          margin-bottom: 10px;
        }
      }
    }
  `}
  .quick-comment {
    border: 1px solid ${props => props.theme.brownGrey};
    border-radius: 50%;
    margin-top: 17px;
  }
`;

export default FanViewStyled;
