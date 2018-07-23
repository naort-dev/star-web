import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';

const LoginContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 64px;
  @media(min-width: 1025px){
    flex-direction: row;
    padding-bottom: 0;
    overflow: hidden;
  }
`;
LoginContainer.wrapper = styled.div`
  height:100%;
  @media(min-width:1025px){
    height: 100vh;
    overflow:auto;
    background-color:white;
  }
  
`;

LoginContainer.CropperWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-height: 80%;
  @media(min-width: 768px) {
    width: 100%;
  }
  @media(min-width: 1025px) {
    width: 100%;
    height: auto;
    max-height: 100%;
  }
`;

LoginContainer.Cropper = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

LoginContainer.CropperButton = styled.div`
  background-color: white;
  margin-top: 10px;
  color: #FF6C58;
  padding: 4px 30px;
  text-align: center;
  -webkit-text-decoration: none;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  font-family: 'Ubuntu-Bold';
  outline: none;
  cursor: pointer;
  border-radius: 5px;
  border: 2px solid #FF6C58;
`;

Request.ComponentWrapperScroll = styled(Scrollbars)`
  .component-wrapper-scroll-wrapper {
    overflow: hidden !important;
    position: static !important;
    background: #fff;
    @media(min-width: 1025px) {
      overflow: scroll !important;
      position: absolute !important;
    }
  }
`;
LoginContainer.LeftSection = styled.div`
  width: 100%;
  height: 100%;
 

  @media(min-width: 1025px){
    width: 45%;
    padding: 0px 0px;
    position: relative;
    padding-bottom: 100px;
  }
`;
LoginContainer.RightSection = styled.div`
  width: 100%;
  margin-top: 40px;
  @media(min-width: 768px) {
    margin-bottom: 80px;
  }
  @media(min-width: 1025px){
    background-color:rgba(248, 248, 248, 1);
    width: 55%;
    display:flex;
    align-items: flex-start;
    justify-content: center;
    padding: 0px 0px;
    position: relative;
    padding: 30px 30px;
    flex-wrap: wrap;
    height: 100vh;
    padding-top: 13vh;
    margin-top: 0px;
  }
`;

LoginContainer.mutiSelectItemWrapper = styled.div`
  display: inline-block;
  border: 2px solid #FF6C58;
  padding: 5px;
  color: #FF6C58;
  border-radius: 20px;
  margin: 9px;
  font-size: 14px;
  @media(min-width: 1025px) {
    margin: 7.5px;
  }
`
LoginContainer.CloseButton = styled.input`
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-left: 10px;
  cursor: pointer;
  border: none;
  background: url('assets/images/close-icon-orange.svg') no-repeat;
`;
LoginContainer.ImageWrapper = styled.div`
display:flex;
align-items: center;
justify-content: space-between;
flex-wrap: wrap;

@media(min-width: 768px){
  justify-content: space-between;
  position: relative;
} 


  @media(min-width: 1025px){
    display:flex;
    align-items: flex-start;
    justify-content: space-around;
    padding: 0px 0px;
    position: relative;
    flex-wrap: wrap;
    width: 80%;
  }
`;

LoginContainer.FeaturedImage = styled.div`
 width: 100%;
 display: flex;
 justify-content: center;
 align-items: center;
 height: 175px;
 background-color: #cccccc;
@media(min-width: 768px){
  height: 365px; 
}

@media(min-width: 1025px){
 width: 98%;
 height: 50%;
 background-color: #cccccc;
 display: flex;
 justify-content: center;
 align-items: center;
 margin: 0 0;
 margin-bottom:10px;
}

`;

LoginContainer.FirstImage = styled.div`
width: 49vw;
display: flex;
justify-content: center;
align-items: center;
height: 175px;
margin: 10px 0px;
background-color: #cccccc;

@media(min-width: 768px){
   width: 49.5vw;
   height: 365px;  
}

@media(min-width: 1025px){
 width: 48%;
 height: 50%;
 display: flex;
 justify-content: center;
 align-items: center;
 margin:  0 0;
}
`;

LoginContainer.SecondImage = styled.div`
width: 49vw;
display: flex;
justify-content: center;
align-items: center;
height:175px;
background-color: #cccccc;
margin: 10px 0px;

@media(min-width: 768px){
  width: 49.5vw;  
  height: 365px;  
}

@media(min-width: 1025px){
 width: 48%;
 height: 50%;
 background-color: #cccccc;
 display: flex;
 justify-content: center;
 align-items: center;
 margin: 0 0;
}
`;

LoginContainer.AvatarContainer = styled.div`
width: 100%;
display: flex;
justify-content: center;
align-items: center;
@media(min-width: 768px) {
  position: absolute;
  bottom: -64px;
  left: 0;
  right: 0;
  flex-direction: column;
}
@media(min-width: 1025px){
  bottom: -100px;
}
`;

LoginContainer.HeadingWrapper = styled.div`
  display: inline-block;
  margin-left: 20px;
`;

LoginContainer.Avatar = styled.span`
 width: 100px;
 height: 100px;
 display: inline-block;
 border-radius: 50%;
 background: url('assets/images/blank-avatar.svg') no-repeat center;
 ${props => props.image != null && ({
    border: "6px solid #333333",
    background: `url(${props.image}) no-repeat`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    objectFit: "contain"
  })
  }
  @media(min-width: 768px) {
    background: url('assets/images/avatar-grey.svg') no-repeat center;
  }
  @media(min-width: 1025px) {
    > div {
      height: 100%;
      input {
        right: 0;
      }
    }
  }
`;

LoginContainer.UploadWrapper = styled.div`
    position: relative;
    overflow: hidden;
    display: inline-block;
    ${props => props.type == "avatar" && ({
    height: "100%",
    width: "100%"

    })
    }
    
    @media(min-width: 768px) {
      width: 100%;
      height: auto;
      text-align: center;
    }
  }
`;

LoginContainer.UploadButton = styled.button`
background: url('assets/images/plus-icon.svg') no-repeat center;
color: black;
background-color: transparent;
cursor: pointer;
border: 0;
width: 40px;
height: 40px;
font-size: 20px;
font-weight: bold;
text-align: center;
height: 40px;
width: 40px;
@media(min-width: 768px){
  height: 40px;
  width: 40px;
}
`;


LoginContainer.UploadInput = styled.input`
    bottom: 0;
    position: absolute;
    left: 0;
    top: 0;
    cursor: pointer;
    opacity: 0;
    @media(min-width: 768px) {
      left: initial;
      right: 25%;
      width: 100%;
    }
  `;



LoginContainer.FirstLastNameWrapper = styled.div`
  display:flex;
  flex-direction: column;
  @media(min-width:768px){
    flex-direction:row;
    justify-content:space-between;
  }
`;
LoginContainer.FirstNameWrapper = styled.div`
  width:100%;
  @media(min-width:768px){
    width:49%
  }
`;
LoginContainer.LastNameWrapper = styled.div`
  width:100%;
  @media(min-width:768px){
    width:49%
  }
`;
LoginContainer.SocialMediaSignup = styled.div`
  text-align:center;
  @media(min-width:768px){
    padding: 5px 0;
    padding-bottom: 20px;  
  }
  @media(min-width: 1025px) {
    height: 100%;    
    padding: 5px 37px;
    padding-bottom: 69px;
  }

`;
LoginContainer.Container = styled.div`
  margin-top: 5%;
  margin-bottom: 2%;
  @media(min-width: 768px) {
    padding: 0 65px;
  }
  @media(min-width: 1025px) {
    padding: 0 20px;
  }
`;
LoginContainer.Heading = styled.div`
  font-family: 'Ubuntu-Bold';
  font-size: 25px;
  text-align: center;
  color: #FF6C58;
  
  @media(min-width:768px){
    font-size: 32px;
  }
  @media(min-width:1025px){
    font-size:32px;
  }
  @media(min-width:1920px){
    font-size:32px;
  }
  
`;

LoginContainer.HeadingSubText = styled.p`
  font-size: 16px;
  text-align: center;
  }
  
`;



LoginContainer.ButtonIcon = styled.img`
  
  width: 23px;
  height: 23px;
  
`;
LoginContainer.ButtonDiv = styled.div`
    width:100%;
    margin-bottom:8%;
`;
LoginContainer.SocialMediaMessage = styled.div`
  font-family: 'Ubuntu-Medium';
  font-size: 14px;
  text-align: center;
  color: #333333;
  margin-top:3%;
  margin-bottom:5%;
  @media(min-width:768px){
    font-size: 18px;
  }
  @media(min-width:1025px){
    font-size:14px;
  }
  @media(min-width:1920px){
    font-size:28px;
  }
`;
LoginContainer.Button = styled.button`
  padding: 12px 10px;
  outline:none;
  border: 2px solid rgba(51, 51, 51, 1); 
  background-color: white;
  margin-top: 6%;
  font-family: 'Ubuntu-Medium';
  font-size:16px;
  color: rgba(84, 84, 84, 1);
  width: 320px;
  text-align:center;
  border-radius: 2px;
  cursor: pointer;
  margin-right:8px;
  &:hover {
    color :#FF6C58;
    border-color:#FF6C58;
  }
  @media(min-width : 768px){
    font-size:16px;
    border: 2px solid #333333; 
    width: 180px;
  }
  @media(min-width: 1025px){
    padding: 9px 10px;
    font-size: 12px;
    width: 130px;
    
  }
`;
LoginContainer.FacebookContent = styled.span`
  position:relative;
  padding-left: 32px;
  width:100%;
  height:100%;
  display:block;
  &:before{
    content:'';
    position:absolute;
    left:0px;
    right:0;
    top:-6px;
    bottom:0;
    background: url( 'assets/images/icon_social_FB.svg' ) no-repeat left;
    padding: 10px;  
    height: 4px;
  }
  
`;
LoginContainer.GoogleContent = styled.span`
  position:relative;
  padding-left: 14px;
  width:100%;
  height:100%;
  display:block;
  &:before{
    content:'';
    position:absolute;
    left:0px;
    right:0;
    top:-6px;
    bottom:0;
    background: url( 'assets/images/icon_social_google-25x25.svg' ) no-repeat left;
    padding: 10px;  
    height: 4px;
    
  }
  
`;
LoginContainer.InstagramContent = styled.span`
  position:relative;
  padding-left: 32px;
  width:100%;
  height:100%;
  display:block;
  &:before{
    content:'';
    position:absolute;
    left:0px;
    right:0;
    top:-6px;
    bottom:0;
    background: url( 'assets/images/icon_social_insta.svg' ) no-repeat left;
    padding: 10px;  
    height: 4px;
    
  }
 
`;

LoginContainer.InputFieldsWrapper = styled.div`
  
@media(min-width:768px){
  padding: 0px 0px;
 
}
@media(min-width:1025px){
 
}
`;
LoginContainer.Ask = styled.div`
  padding: 25px 19px;
  height:100%;
  position:relative;
  @media(min-width:1025px){
    padding: 25px 48px;
  }
`;
LoginContainer.ErrorDiv = styled.div`
  height:10px;
  
`;
LoginContainer.ErrorMsg = styled.div`
  color:red;
  font-size: 12px;
  margin-top:4px;
  font-family: 'Ubuntu-light';
  text-align:left;
  ${props => !props.isError && ({
    color: "grey"
  })
  }
`;
LoginContainer.Label = styled.div`
  color:#333333;
  font-family: 'Ubuntu-Bold';
  font-size:16px;
  text-align:left;
  padding:10px 0;
  @media(min-width:768px){
    width:55%;
    display:flex;
    align-items:center;
    padding-right: 10px;
    padding-bottom:0px;
  }
  @media(min-width:1025px){
    width:69%;
  
  }
  @media(min-width:1920px){
    font-size:16px;
  }

`;
LoginContainer.InputArea = styled.textarea`
  font-family: 'Ubuntu-Regular';
  color: #333333;
  font-size:16px;
  text-align:left;
  outline:none;
  width: 100%;
  height: 60px;
  padding: 8px 8px;
  resize: none;
  background-color: white;
  border: 1px solid #d0d2d3;
  border-radius: 2px;
  @media(min-width:768px){
    margin-top:0;
    height:100px;
  }
  @media(min-width:1025px){
    margin-top:0;
    height:60px;
    font-size:13px;
  }
  @media(min-width:1920px){
    font-size:16px;
    height:60px;
  }
`;
LoginContainer.InputwrapperDiv = styled.div`
  @media(min-width:768px){
    margin-bottom:12%;
  }
  @media(min-width:1025px){
    margin-bottom: 8%;
  }
 
`;
LoginContainer.SectionHeading = styled.div`
  font-family: 'Ubuntu-Medium';
  font-size: 14px;
  text-align: center;
  color: #737373;
  margin-top:2%;
  @media(min-width:768px){
    font-size: 18px;
  }
  @media(min-width:1025px){
    font-size:14px;
  }
  @media(min-width:1920px){
    font-size:28px;
  }
`;
LoginContainer.Input = styled.input`
  font-family: 'Ubuntu-Regular';
  color: #333333;
  font-size:16px;
  text-align:left;
  outline:none;
  width: 100%;
  height: 40px;
  text-indent: 10px;
  background-color: white;
  border: 1px solid #d0d2d3;
  border-radius: 2px;
  @media(min-width:768px){
    margin-top:0;
    height:40px;
  }
  @media(min-width:1025px){
    margin-top:0;
    height:33px;
    font-size:13px;
  }
  @media(min-width:1920px){
    font-size:16px;
    height:40px;
  }
`;

LoginContainer.PrivacyContent = styled.div`
  text-align:left;
  font-family: 'Ubuntu-Regular';
  font-size:12px;
  padding: 17px 35px;
  color: #707070;
  @media(min-width:768px){
    text-align:center;
  }
`;

LoginContainer.ImageStackLayout = styled.div`
  padding:32px 0;
  width:100%;
  height:100%;

`;
LoginContainer.FooterLayout = styled.div`
  padding: 0;
  @media(min-width:1025px){
    padding: 0px 40px;
    position: absolute;
    left: 0;
    right: 0;
    width: 45%;
    bottom: 0;
  }
  
`;
const HeaderSection = styled.div`
  padding: 3px 15px;
  display:flex;
  justify-content: space-between;
  align-items: center;
`;

HeaderSection.LogoImage = styled.img`
  width:100px;
  height:45px;
  @media(min-width:1025px){
    width:160px;
    height:60px;
  }
`;
HeaderSection.MiddleDiv = styled.div`
  font-family: 'Ubuntu-Bold';
  font-size : 13px;
  @media(min-width:1920px){
    font-size:16px;
  }
  

`;
HeaderSection.RightDiv = styled.button`
  background-color: #fff; 
  margin-right: 5px;
  color: #333333;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  font-family: 'Ubuntu-Medium';
  display: inline-block;
  font-size: 12px;
  cursor: pointer;
  outline:none;
  border: none;
`;

const FooterSection = styled.div`
  position:fixed;
  bottom: 0;
  background-color:#FFFFFF;
  z-index:1;
  width:100%;
  display:flex;
  padding:13px 12px;
  box-shadow: 0px 0px 12px 0px rgba(34, 34, 34, 0.4);
  @media(min-width:1025px){
   box-shadow:none;
   position: relative;
   padding: 26px 0px;
   border-top: 1px solid #222;
  }
  
`;
FooterSection.LeftSection = styled.div`
  display:none;
  text-align:left;
  @media(min-width:768px){
    display:block;
    width:50%;
  }
`;
FooterSection.Agreement = styled.div`
  text-align:left;
  color:rgba(112, 112, 112, 1);
  font-family: 'Ubuntu-Regular';
  font-size:12px;
`;

FooterSection.RightSection = styled.div`
  width:100%;
  text-align:right; 
  @media(min-width:768px){
    width:50%;
  }
`;
FooterSection.Button = styled.button`
background-color: #fff; 
color: #FF6C58;
padding: 4px 30px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size:14px;
font-family: 'Ubuntu-Bold';
outline:none;
cursor: pointer;
border-radius:5px;
border: 2px solid #FF6C58;
@media(min-width:1920px){
  font-size:20px;
`;

FooterSection.DisabledButton = styled.button`
background-color: white; 
color: grey;
padding: 4px 30px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size:14px;
font-family: 'Ubuntu-Bold';
outline:none;
cursor: pointer;
border-radius:5px;
border: 2px solid grey;
@media(min-width:1920px){
  font-size:20px;
}
`
LoginContainer.WrapsInput = styled.div`
  width:100%;
  .Select-multi-value-wrapper {
    padding: 9px;
    @media(min-width: 1025px) {
      padding: 7.5px;
    }
  }
  @media(min-width:768px){
    width:100%;
  }
  @media(min-width:1025){
    width:352px;
  }

`;
LoginContainer.GoogleWrapper = styled.div`
  display:none;
  
`;
LoginContainer.EmptyDiv = styled.div`
  display:none;
`;
LoginContainer.LoginDiv = styled.button`
  background-color: #fff; 
  margin-right: 5px;
  color: #007FAA;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  font-family: 'Ubuntu-Light';
  display: inline-block;
  font-size: 12px;
  cursor: pointer;
  outline:none;
  border: none;
  @media(min-width:1920px){
    font-size:16px;
  }
`;
LoginContainer.ShowPassword = styled.span`
  position:absolute;
  background-image: url( 'assets/images/icon_1pass_24a.svg' );
  background-repeat: no-repeat;
  background-position: center;
  background-size:19px;
  padding: 14px;
  right: 7px;
  top: 12px;
  cursor:pointer;
  @media(min-width:1025px){
    top:5px;
    padding: 12px;
  }
`;
LoginContainer.PasswordWrapper = styled.div`
  position:relative;
 
`;
LoginContainer.InputContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  height: 100%;

  @media(min-width:768px){
    width:90%;
    margin: 20px 20px;
  }
`;
LoginContainer.ButtonWrapper = styled.div`
  margin-top:5%;
`;
LoginContainer.SignupLine = styled.div`
 
    display: block;
    font-family: 'Ubuntu-Medium';
    color:#7c7c7c;
    font-size: 12px;
    margin: 0;
    margin: 20px 20px;
    order: 1;
    span {
      display: inline-block;
    }
    &::before, &::after {
      content: '';
      display: inline-block;
      height: 1px;
      background-color: #ccc;
      vertical-align: middle;
      width: 50px;
      width: calc(50% - 69px);
    }
    &::before {
      margin-right: 10px;
    }
    &::after {
      margin-left: 10px;
    }
  
`;


LoginContainer.TextArea = styled.textarea`
 height: 100%;
 width: 80%;
`;



LoginContainer.InputContainer = styled.div`
 height: 80%;
 flex-direction: row;
 display: flex;
 align-items: flex-start;
 justify-content: center;
 width: 100%;
`;

LoginContainer.InputContainerWrapper = styled.div`
 height: 100%;
 flex-direction: column;
 display: flex;
 align-items: center;
 justify-content: center;
 width: 100%;
`;

LoginContainer.InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top:1%;
  @media(min-width:768px){
    flex-direction: row;
    align-items: flex-start;
    margin: 0px 120px;
    margin-top:5%;
  }
  @media(min-width: 1025px) {
    margin: 0px 0px;
    margin-top: 30px;
  }
  @media(min-width: 1920px) {
    margin: 0px 0px;
    margin-top: 50px;
  }
`;

LoginContainer.Input = styled.input`
  font-family: 'Ubuntu-Regular';
  color: #333333;
  font-size:16px;
  text-align:left;
  outline:none;
  width: 100%;
  height: 40px;
  text-indent: 10px;
  background-color: white;
  border: 1px solid #d0d2d3;
  border-radius: 2px;
  @media(min-width:768px){
    margin-top:0;
    height:40px;
  }
  @media(min-width:1025px){
    margin-top:0;
    height:33px;
    font-size:13px;
  }
  @media(min-width:1920px){
    font-size:16px;
    height:40px;
`;

LoginContainer.LabelContainer = styled.div`
height: 100%;
width: 30%;
display: flex;
align-items: flex-center;
justify-content: flex-start
`;

LoginContainer.RightContainer = styled.div`
height: 100%;
width: 70%;
display: flex;
align-items: flex-center;
justify-content: flex-end
`;

LoginContainer.ImageInner = styled.div`
height: 100%;
width: 100%;
flex-direction: column;
align-items: center;
justify-content: center;
display: flex;
position: relative;
`;
LoginContainer.FeaturedText = styled.div`
font-size: 16px;
font-family: Ubuntu-bold
margin-top: 2%;

@media(min-width:768px){
  font-size: 23px;
}

@media(min-width:1025px){
font-size: 24px;
}
`

LoginContainer.CaptionText = styled.div`
font-size: 14px;
font-family: Ubuntu-light;
@media(min-width:768px){
  font-size: 15px;
}
@media(min-width:1025px){
  font-size: 16px;
}
`;

LoginContainer.loaderWrapper = styled.div`
position: fixed;
top: 0;
z-index: 10;
left: 0;
right: 0;
bottom: 0;
background-color: rgba(0,0,0, 0.3);
`;

LoginContainer.Image = styled.img`
 height: 100%;
 width: 100%;
 object-fit: contain;
`;

LoginContainer.FullScreenUploadWrapper = styled.div`
    position: relative;
    overflow: hidden;
    display: inline-block;
    width: 100%;
    height: 100%;
  }
`;

LoginContainer.FullScreenUploadButton = styled.button`
border: 1px solid black;
color: black;
background-color: transparent;
border-radius: 60px;
font-size: 20px;
font-weight: bold;
text-align: center;
height: 100%;
width: 100%;
visibility: hidden;
`;


LoginContainer.FullScreenUploadInput = styled.input`
    font-size: 100px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    height: 100%;
    width: 100%;
  `;


LoginContainer.ErrorMessage = styled.span`
color:  red;
font-size: 16px;
`;

LoginContainer.ErrorText = styled.span`
 color: red;
 position: absolute;
 bottom: 20px;
 font-size: 14px;
`;




export { LoginContainer, HeaderSection, FooterSection };
