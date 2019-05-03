import styled from 'styled-components';
import StarProfileStyled from '../../styled';

const ActionStyled = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 10px 12px;
  height: 69px;
  z-index: 2;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => (props.available ? props.theme.orangePink: props.theme.brownGrey)};
  @media(min-width: 375px) {
    padding: 10px 31px;
  }
  @media(min-width: 832px) {
    height: 111px;
    padding: 0 65px;
  }
`;

ActionStyled.AvatarWrapper = styled.div`
  padding-right: 19.3px;
  ${StarProfileStyled.Avatar} {
    width: 48.6px;
    height: 48.6px;
  }
  @media(min-width: 832px) {
    ${StarProfileStyled.Avatar} {
      width: 80px;
      height: 80px;      
    }
  }
`;

ActionStyled.DescriptionWrapper = styled.div`
  width: calc(100% - 50px);
  @media(min-width: 832px) {
    width: calc(100% - 80px);
  }
`;

ActionStyled.Description = styled.span`
  font-family: Gilroy-Light;
  line-height: 24px;
  strong {
    font-family: Gilroy-medium;
  }
`;

ActionStyled.ActionContent = styled.div`
  display: flex;
  max-width: 100%;
  width: 100%;
  align-items: center;
  @media(min-width: 832px) {
    max-width: ${props => (props.available ? 'calc(100% - 256px)' : '100%')};
  }
`;

ActionStyled.ArrowWrapper = styled.div`
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

ActionStyled.ActionSection = styled.div`
  display: none;
  @media(min-width: 832px) {
    display: flex;
    align-items: center;
    .action-button {
      width: auto;
      background-color: #fff;
      border-color: #fff;
      color: ${props => props.theme.flatBlue};
    }
  }
`;

export default ActionStyled;
