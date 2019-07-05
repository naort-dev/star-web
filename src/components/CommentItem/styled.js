import styled from 'styled-components';
import { media } from '../../styles/mediaQueries';

const CommentStyled = styled.div`
  display: inline-block;
  width: 100%;
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
  padding: 10px 8px 10px 15px;
  border-radius: 10px;
  max-width: 228px;
  position: relative;
  min-width: 121px;
  width: 100%;
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
    ${media.mobileScreen} {
      margin-left: 7px;
    }
  ` : `
    border-top-right-radius: 0;
    margin-right: 15.2px;
  `)}
  .comment {
    font-family: Gilroy-Light;
    font-size: 12px;
    color: #3c3c3c;
    display: block;
    line-height: 18px;
    overflow: hidden;
    margin-bottom: 3px;
    .text-bold {
      font-family: Gilroy-SemiBold;
      font-size: 12px;
      &.user-name {
        margin-right: 5px;
      }
    }
    &.reaction {
      display: flex;
      .icon-heart {
        color: #ff3636;
        width: 27px;
        height: 23px;
        margin-right: 10px;
      }
      .action-button {
        margin-left: auto;
      }
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
      width: auto;
      height: 27px;
      min-width: auto;
      padding: 2px 23px;
      min-height: auto;
      font-size: 12px;
      line-height: 16px;
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
      font-size: 12px;
      display: block;
    }
  }
  .comment-footer {
    display: flex;
    margin-top: 6px;
    justify-content: space-between;
    align-items: center;
    position: relative;
    .more-action-root {
      width: 10px;
      height: 10px;
      margin-top: -7px;
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
