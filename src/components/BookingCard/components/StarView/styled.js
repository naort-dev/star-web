import styled from 'styled-components';

const StarViewStyled = styled.div`

`;

StarViewStyled.VideoWrapper = styled.div`
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
    height: 492.6px;
  }
`;

StarViewStyled.DetailWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  .title {
    display: block;
  }
`;

StarViewStyled.CommentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .loader {
    height: 100%;
  }
  .comment-box {
    width: calc(100% - 60px);
  }
  .quick-comment {
    border: 1px solid ${props => props.theme.brownGrey};
    border-radius: 50%;
    margin-top: 17px;
  }
`;

export default StarViewStyled;
