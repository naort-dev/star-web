import styled from 'styled-components';

const SupportStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  @media(min-width: 1025px) {
    display: block;
  }
`;

SupportStyled.SmallHeading = styled.span`
  display: block;
  font-size: 18px;
  color: #FF6C58;
  font-family: Avenir-Bold;
  width: 100%;
  padding: 15px 10px 10px;
  border-bottom: 1px solid rgb(204, 204, 204);
  @media(min-width: 1025px) {
    font-size: 20px;
  }
`;

SupportStyled.SubHeading = styled.span`
  display: block;
  font-size: 18px;
  color: #FF6C58;
  font-family: 'Avenir-Bold';
`;

SupportStyled.Container = styled.div`
  padding: 10px;
  @media(min-width: 1025px) {
    padding-top: 50px;
  }
`;

SupportStyled.CenterSection = styled.div`
  order: 2;
  padding-top: 20px;
  @media(min-width: 768px) {
    padding-top: 0;
  }
  @media(min-width: 1025px) {
    width: 75%;
    display: inline-block;
  }
`;

SupportStyled.RightSection = styled.div`
  order: 1;
  padding: 10px;
  text-align: right;
  position: fixed;
  z-index: 2;
  width: 100%;
  background: #fff;
  right: 0;
  top: 60px;
  @media(min-width: 1025px) {
    top: 90px;
    width: 25%;
    padding: 0 10px;
    text-align: left;
    display: inline-block;
    vertical-align: top;
  }
`;

SupportStyled.BigHeading = styled.span`
  font-size: 20px;
  display: block;
  font-family: Avenir-Bold;
  @media(min-width: 1025px) {
    font-size: 22px;
  }
`;

SupportStyled.Description = styled.span`
  font-size: 14px;
  font-family: Avenir-Regular;
`;

SupportStyled.ControlWrapper = styled.div`
  padding: 10px 0;
`;

SupportStyled.ControlButton = styled.button`
  background-color: ${props => (props.alternate ? '#fff' : '#FF6C58')};
  color: ${props => (props.alternate ? '#FF6C58' : '#fff')};
  text-align: center;
  display: inline-block;
  font-size: 14px;
  font-family: ${props => (props.alternate ? 'Avenir-Regular' : 'Avenir-Bold')};
  cursor: pointer;
  padding: ${props => (props.alternate ? '10px 15px' : '10px 30px')};
  text-decoration: none;
  outline: none;
  border-radius: 5px;
  border: ${props => (props.alternate ? '1px solid #FF6C58' : '2px solid #FF6C58')};2px solid #FF6C58;
  border-image: initial;
  &:hover {
    background-color: ${props => (props.alternate ? '#fff' : '#FF3B21')};
  }
  &:disabled {
    background-color: #b6b6b6;
    color: #676767;
    border-color: #b6b6b6;
  }
`;

SupportStyled.InviteList = styled.div`

`;

SupportStyled.LoaderWrapper = styled.div`
  height: calc(100% - 95px);
  padding: 20px 16px;
  @media(min-width: 1025px) {
    height: calc(100% - 79px);
    padding: 20px 0;
  }
  @media(min-width: 1920px) {
    padding-top: 32px;
  }
`;

export default SupportStyled;
