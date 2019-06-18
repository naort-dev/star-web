import styled from 'styled-components';

const StarViewStyled = styled.div`

`;

StarViewStyled.VideoWrapper = styled.div`
  width: 195.7px;
  height: 301.9px;
  .player-icon-wrap {
    top: 50%;
    transform: translateY(-50%);
    bottom: unset;
  }
  .video-container {
    box-shadow: none;
  }
  @media(min-width: 832px) {
    width: 319.3px;
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
  .comment-box {
    width: calc(100% - 60px);
  }
  .quick-comment {
    border: 1px solid ${props => props.theme.brownGrey};
    border-radius: 50%;
  }
`;

export default StarViewStyled;
