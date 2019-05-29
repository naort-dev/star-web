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
  transform: rotateZ(32deg);
  cursor: pointer;
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
  .option-title {
    font-size: 12px;
    font-family: Gilroy-Regular;
  }
  &:after {
    position: absolute;
    content: '';
    top: -15px;
    left: calc(50% - 10px);
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-bottom: 15px solid #fff;
  }
`;

export default CommentStyled;