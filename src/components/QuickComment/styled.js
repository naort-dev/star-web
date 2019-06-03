import styled from 'styled-components';
import Popover from '@material-ui/core/Popover';

const CommentStyled = styled.span`
  width: 40px;
  height: 40px;
  display: inline-block;
`;

CommentStyled.CommentIcon = styled.span`
  width: 100%;
  height: 100%;
  min-width: 20px;
  min-height: 20px;
  border-radius: 50%;
  background: ${props => props.showList ? props.theme.flatBlue : '#fff'};
  color: ${props => props.showList ? '#fff' : props.theme.flatBlue};
  display: block;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  svg {
    transform: rotateZ(32deg);
  }
  .quick-arrow {
    position: absolute;
    display: ${props => props.showList ? 'block' : 'none'};
    content: '';
    top: -5px;
    left: -3px;
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-top: 15px solid #fff;
    z-index: 9999;
  }
`;

CommentStyled.Popover = styled(Popover)`
  .paper-root {
    overflow: initial;
    box-shadow: none;
    background: transparent;
  }
`;

CommentStyled.OptionWrapper = styled.div`
  position: relative;
  padding: 10px 35px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.16);
  bottom: 3px;
  .option-title {
    font-size: 12px;
    font-family: Gilroy-Regular;
  }
  .comment-list {
    .comment-item {
      padding: 7px;
      border-radius: 60px;
      font-family: Gilroy-Medium;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background-color: ${props => props.theme.veryLightPinkTwo};
      color: ${props => props.theme.flatBlue};
      margin-bottom: 10px;
    }
  }
`;

export default CommentStyled;