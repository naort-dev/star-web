import styled from 'styled-components';
import { Link } from 'react-router-dom';

const QuickViewStyled = styled.div`
  display: flex;
  padding-top: 19px;
`;

QuickViewStyled.VideoContainer = styled.div`
  width: 300.5px;
  height: 484.5px;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;

  &.image-only {
    align-items: flex-start;

    span {
      margin-top: 25px;
      width: 280px;
      height: 280px;
    }
  }
`;

QuickViewStyled.Content = styled.div`
  padding: 30px 25px 0;
  padding-right: 0;
  width: calc(100% - 300.5px);
`;

QuickViewStyled.Categories = styled.span`
  font-family: Gilroy-Light;
  color: ${props => props.theme.twilight};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  @media (min-width: 832px) {
    width: 80%;
    overflow: visible;
    white-space: normal !important;
    line-height: 20px;
  }
`;

QuickViewStyled.StarName = styled.span`
  font-family: Gilroy-Regular;
  display: block;
  color: ${props => props.theme.twilight};
`;

QuickViewStyled.Row = styled.div`
  margin-top: 19px;
`;

QuickViewStyled.Avatar = styled.span`
  border: none;
  border-radius: 50%;
  display: block;
  width: ${props => (props.size ? `${props.size}px` : '80px')};
  height: ${props => (props.size ? `${props.size}px` : '80px')};
  box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.16);
  background: ${props => (props.imageUrl ? `url(${props.imageUrl})` : 'url(assets/images/default-cover.jpg)')} no-repeat;
  background-position: center center;
  background-size: cover;
  position: relative;
`;

QuickViewStyled.HeartIcon = QuickViewStyled.Row.extend`
  font-size: 24px;
  color: ${props => props.theme.flatBlue};
  display: block;
  svg {
    cursor: pointer;
  }
`.withComponent('span');

QuickViewStyled.MiniDescription = QuickViewStyled.Row.extend`
  font-family: Gilroy-Regular;
  font-size: 19px;
  color: ${props => props.theme.flatBlue};
  display: inline-block;
`.withComponent(Link);

QuickViewStyled.SubHeader = QuickViewStyled.Row.extend`
  font-family: Gilroy-Light;
  font-size: 16px;
  color: ${props => props.theme.GreyishBrown};
  display: block;
`.withComponent('span');

QuickViewStyled.SubDescription = styled.span`
  font-family: Gilroy-Light;
  font-size: 24px;
  margin-top: 7px;
  display: block;
  color: ${props => props.theme.orangePink};
`;

QuickViewStyled.Description = styled.span`
  font-size: 24px;
  font-family: Gilroy-Light;
  padding-left: 19.3px;
  strong {
    font-family: Gilroy-medium;
  }
`;

QuickViewStyled.StarWrapper = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  pointer-events: none;
`;

QuickViewStyled.ActionBar = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 14px 31px;
  height: 111px;
  z-index: 2;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => (props.available ? props.theme.orangePink: props.theme.brownGrey)};
  ${props => props.available && `
    cursor: pointer;
  `}
`;

QuickViewStyled.ActionContent = styled.div`
  display: flex;
  max-width: ${props => (props.available ? 'calc(100% - 225px)' : '100%')};
  align-items: center;
`;

QuickViewStyled.ArrowWrapper = styled.div`
  padding-right: 9.9px;
  svg {
    font-size: 40px;
    color: #fff;
    &:nth-child(1) {
      opacity: 0.15;
    }
    &:nth-child(2) {
      opacity: 0.37;
    }
  }
`;

QuickViewStyled.ActionSection = styled.div`
  display: flex;
  align-items: center;
  .action-button {
    width: auto;
    background-color: #fff;
    border-color: #fff;
    min-width: auto;
    color: ${props => props.theme.flatBlue};
  }
`;

export default QuickViewStyled;
