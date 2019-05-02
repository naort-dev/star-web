import styled from 'styled-components';

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
`;

ActionStyled.AvatarWrapper = styled.div`
  padding-right: 19.3px;
`;

ActionStyled.DescriptionWrapper = styled.div`
  width: calc(100% - 50px);
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
`;

export default ActionStyled;
