import styled from 'styled-components';
import { media } from '../../styles/mediaQueries';

const CommentStyled = styled.div`
  display: inline-block;
`;

CommentStyled.Container = styled.div`
  display: flex;
  ${props => !props.receive && `
    flex-direction: row-reverse;
  `}
`;

CommentStyled.ProfileImage = styled.span`
  width: 40px;
  height: 40px;
  display: block;
  border-radius: 50%;
  background: ${props => (props.profileImage ? `url(${props.profileImage})` : 'url(assets/images/profile.png)')};
  background-repeat:no-repeat;
  background-position: center;
  background-size:cover;
`;
CommentStyled.Comment = styled.span`
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.16);
  background-color: ${props => props.visible ? '#ffffff' : '#f6f6f6'};
  padding: 10px 8px 18px 15px;
  border-radius: 10px;
  max-width: 228px;
  position: relative;
  min-width: 121px;
  .hidden-header {
    display: block;
    text-align: center;
    color: #999;
    font-size: 12px;
    font-family: Gilroy-Bold;
  }
  ${props => (props.receive ? `
    border-top-left-radius: 0;
    margin-left: 15.2px;
  ` : `
    border-top-right-radius: 0;
    margin-right: 15.2px;
  `)}
  .comment {
    font-family: Gilroy-Light;
    font-size: 14px;
    color: #3c3c3c;
    display: block;
    line-height: 18px;
    overflow: hidden;
    .text-bold {
      font-family: Gilroy-Medium;
      font-size: 14px;
      &.user-name {
        margin-right: 5px;
      }
    }
    &.reaction {
      display: flex;
      justify-content: space-between;
    }
    &.tip {
      .text-bold {
        font-size: 16px;
      }
    }
    .rating {
      font-size: 17px;
      label {
        padding: 0;
      }
    }
    .action-button {
      width: 118px;
      height: 34px;
      min-width: auto;
      padding: 6px;
      min-height: auto;
      font-size: 12px;
      ${media.mobileScreen} {
        width: 65px;
      }
    }
    .text-description {
      font-family: Gilroy-Light;
      font-size: 12px;
      display: block;
    }
    .title {
      font-family: Gilroy-Regular;
      font-size: 14px;
      display: block;
    }
  }
  .comment-footer {
    display: flex;
    margin-top: 6px;
    justify-content: space-between;
    align-items: center;
    position: relative;
    ${media.webView} {
      position: absolute;
      bottom: 6px;
      left: 15px;
      right: 8px;
    }
    .more-action-root {
      width: 10px;
      height: 10px;
      .more-action-icon {
        width: 10px;
        height: 10px;
        min-width: auto;
        border: none;
      }
    }
    .time {
      font-family: Gilroy-Regular;
      font-size: 10px;
      color: #797979;
    }
  }
`;
export default CommentStyled;
