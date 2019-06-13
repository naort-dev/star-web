import styled from 'styled-components';

const StarViewStyled = styled.div`

`;

StarViewStyled.HeaderText = styled.h5`
  font-family: Gilroy-Regular;
  font-size: 24px;
  color: ${props => props.theme.orangePink};
  padding-right: 24px;
  text-align: center;
  strong {
    font-family: Gilroy-Medium;
  }
  @media(min-width: 832px) {
    color: ${props => props.theme.flatBlue};
  }
`;

StarViewStyled.VideoWrapper = styled.div`
  width: 195.7px;
  height: 301.9px;
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
