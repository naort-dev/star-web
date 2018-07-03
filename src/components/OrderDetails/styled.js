import styled, { keyframes } from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';

const OrderStyled = styled.div`
  width: 100%;
  height: 100%;
`;

OrderStyled.Header = styled.div`
  display:flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 56px;
  box-shadow: 0px 1px 0px 0px #333333;
`;

OrderStyled.DesktopHeader = styled.div`
  display: none;
  @media(min-width: 1025px) {
    display: block;
  }
`;

OrderStyled.HeaderNavigation = styled.span`
  background-image: url( 'assets/images/icon_back_40a.svg' );
  background-repeat: no-repeat;
  background-position: center;
  border:none;
  padding:20px;
  background-size: 26px;
  background-color:white;
  cursor: pointer;
  outline:none;
  position: absolute;
  left: 0;
`;

OrderStyled.HeaderTitle = styled.span`
  font-family: 'Ubuntu-Bold';
  font-size : 15px;
  @media(min-width:1920px){
    font-size:16px;
  }
`;

OrderStyled.ContentWrapper = styled.div`
  height: calc(100vh - 56px);
  @media (min-width: 1025px) {
    background-color: rgb(248, 248, 248);
  }
`;
OrderStyled.VideoContentWrapper = styled.div`
  width: 100%;
  height: 200px;
  @media(min-width: 1025px) {
    width: ${props => (props.width ? props.width: '100%')};
    height: ${props => (props.height ? props.height: '100%')};
    max-width: 640px;
    max-height: 480px;
  }
`;

OrderStyled.DownloadVideo = styled.span`
  background-color: #fff; 
  color: #FF6C58;
  padding: 4px 30px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size:14px;
  font-family: 'Ubuntu-Medium';
  outline:none;
  border-radius:5px;
  border: 2px solid #FF6C58;
  cursor: pointer;
  &:disabled{
    color: #222;
    border: 2px solid #222;
  }
`;

OrderStyled.leftContent = styled.div`
  padding: 10px 16px;
  @media(min-width: 1025px) {
    width: 40%;
    background-color: #fff;
    height: 100%;
    padding: 27px 42px;
  }
  @media(min-width: 1920px) {
    padding-top: 48px;
  }
`;
OrderStyled.scrollWrapper = styled(Scrollbars)`
  .order-details-scroll-wrapper {
    overflow: hidden !important;
    position: static !important;
    @media(min-width: 1025px) {
      overflow: scroll !important;
      position: absolute !important;
    }
  }
`;
OrderStyled.rightContent = styled.div`
  text-align: center;
  @media(min-width: 1025px) {
    width: 60%;
    float: right;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 58px 0;
    flex-direction: column;
  }
`;

OrderStyled.VideoDetails = styled.div`
  margin-top: 20px;
`;

OrderStyled.CloseButton = styled.span`
  display: none;
  @media(min-width: 1025px) {
    position: absolute;
    top: 16px;
    right: 18px;
    cursor: pointer;
    display: inline-block;
    width: 30px;
    height: 30px;
    background: url('assets/images/close-icon-orange.svg') no-repeat;
    background-size: cover;
    background-position: center center;
    right: 50px;
    width: 24px;
    height: 24px;
  }
`;

OrderStyled.MainTitle = styled.span`
  display: block;
  margin: 10px 0;
  color: #FF6C58;
  text-align: center;
  font-size: 18px;
  @media(min-width: 1025px) {
    margin: 44px 0;
  }
`;
OrderStyled.ProfileImageWrapper = styled.div`
  width: 100%;
  text-align: center;
  @media(min-width: 1025px) {
    padding-bottom: 40px;
    border-bottom: 1px solid #333333;
  }
`;
OrderStyled.ProfileImage = styled.span`
  border-radius: 50%;
  display: inline-block;
  background-image: ${props => props.imageUrl ? 'url('+props.imageUrl+')' : 'url(assets/images/profile.png)'};
  background-repeat:no-repeat;
  background-position: center;
  background-size:cover;
  height:50px;
  border: solid 2px #FFFFFF;
  box-shadow: 2px 2px 9px #4f4f4f;
  width:50px;
  position: relative;
  top: 8px;
  @media(min-width: 768px) {
    width: 48px;
    height: 48px;
  }
  @media(min-width: 1025px) {
    height:100px;
    width:100px;
  }
`;
OrderStyled.StarName = styled.h4`
  font-size: 18px;
  color: #FF6C58;
  margin-top: 15px;
  font-family: 'Ubuntu-Bold';
  @media(min-width: 1025px) {
    font-size: 26px;
    margin-top: 25px;
  }
`;
OrderStyled.StarProfessions = styled.div`
  display: block;
  text-align: center;
`;
OrderStyled.DetailsWrapper = styled.ul`
  margin-top: 15px;
`;
OrderStyled.DetailsItem = styled.li`
  display: table;
  width: 100%;
  padding: 10px 0;
`;
OrderStyled.DetailsTitle = styled.span`
  display: table-cell;
  font-family: 'Ubuntu-Bold';
  width: 50%;
`;
OrderStyled.DetailsValue = styled.span`
  display: table-cell;
  width: 50%;
`;
export default OrderStyled;
