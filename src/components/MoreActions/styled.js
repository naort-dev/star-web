import styled from 'styled-components';
import Popover from '@material-ui/core/Popover';

const MoreStyled = styled.div`
  
`;

MoreStyled.EllipsIcon = styled.span`
  width: 39px;
  height: 39px;
  min-width: 20px;
  min-height: 20px;
  border-radius: 50%;
  border: solid 1px #d1d1d1;
  color: #d3d3d3;
  display: block;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
`;

MoreStyled.Popover = styled(Popover)`
  .paper-root {
    margin-top: 10px;
    margin-left: 19px;
    overflow: visible;
    box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.16);
    border-radius: 10px;
    padding: 0 7px;
    padding-top: 0;
    &:before {
      content: '';
      position: absolute;
      top: -20px;
      right: 8px;
      border-bottom: 10px solid #fff;
      border-right: 10px solid transparent;
      border-left: 10px solid transparent;
      border-top: 10px solid transparent;
      z-index: 10;
    }
  }
`;

MoreStyled.Option = styled.span`
  display: block;
  margin: 15px;
`;

export default MoreStyled;
