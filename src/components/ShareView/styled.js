import styled from 'styled-components';

const ShareStyled = styled.div`

`;

ShareStyled.Overlay = styled.span`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
  background-color: rgba(0,0,0,.6);
  @media(min-width: 1025px) {
    display: none;
  }
`;

ShareStyled.SocialMediaWrapper = styled.div`
  position: fixed;
  transition: 1s opacity ease-out;
  background: rgb(248, 248, 248);
  z-index: 11;
  left: 0;
  right: 0;
  bottom: 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  opacity: ${props => (props.visible ? 1 : 0)};
  display: ${props => (props.visible ? 'block' : 'none')};
  padding: ${props => (props.visible ? '10px 0' : '0')};
  @media(min-width: 1025px) {
    display: none;
  }
`;

ShareStyled.SocialHeading = styled.span`
  display: block;
  text-align: center;
  padding: 10px 5px;
  font-family: 'Avenir-Bold';
  font-size: 16px;
  border-bottom: 1px solid #CCCCCC;
`;

ShareStyled.Drawer = styled.span`
  width: 35px;
  height: 5px;
  display: block;
  background-color: #DADADA;
  margin: 0 auto;
  margin-top: 10px;
  border-radius: 6px;
`;

ShareStyled.Somenetwork = styled.div`
  vertical-align: top;
  display: block;
  padding: 8px 10px;
  display: flex;
  user-select: none;
  align-items: center;
  padding-left: ${props => (props.isCancel ? '51px' : '10px')};
  color: ${props => (props.isCancel ? '#006eae' : '#333333')};
  cursor: pointer;
  font-family: 'Avenir-Medium';
  .SocialMediaShareButton {
    display: flex;
    align-items: center;
    & > div {
      display: inline-block;
    }
  }
`;

ShareStyled.SocialTitle = styled.span`
  padding-left: 10px;
`;

ShareStyled.Copy = styled.span`
  width: ${props => (props.size ? `${props.size}px` : '32px')};
  height: ${props => (props.size ? `${props.size}px` : '32px')};
  display: block;
  background-image: url('../../assets/images/content_copy_48px.svg');
  background-repeat: no-repeat;
  background-color: #4a000d;
  background-position: center;
  border-radius: 32px;
  background-size: 64%;
`;

export default ShareStyled;
