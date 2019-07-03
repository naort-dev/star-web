import styled from 'styled-components';

const FanViewStyled = styled.div`
  padding: 0 30px;
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
    height: 439.6px;
  }
`;

FanViewStyled.DetailWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 20px;
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
  .quick-comment {
    border: 1px solid ${props => props.theme.brownGrey};
    border-radius: 50%;
    margin-top: 17px;
  }
`;

export default FanViewStyled;
