import styled from 'styled-components';

const AvatarContainer = styled.div`
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


AvatarContainer.CropperWrapper = styled.div`
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

AvatarContainer.CropperButton = styled.div`
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
AvatarContainer.CloseButton = styled.input`
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-left: 10px;
  cursor: pointer;
  border: none;
  background: url('assets/images/close-icon-orange.svg') no-repeat;
`;
AvatarContainer.ImageWrapper = styled.div`
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

AvatarContainer.FeaturedImage = styled.div`
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

AvatarContainer.FirstImage = styled.div`
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

AvatarContainer.SecondImage = styled.div`
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

AvatarContainer.AvatarContainer = styled.div`
width: 100%;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
text-align:center;

@media(min-width: 768px) {
  left: 0;
  right: 0;
  justify-content: left;
  flex-direction: row;
}
@media(min-width: 1025px){
}
`;

AvatarContainer.HeadingWrapper = styled.div`
  display: inline-block;
  
  @media(min-width:768px){
    margin-left: 20px;
  }
`;

AvatarContainer.Avatar = styled.span`
 width: 100px;
 height: 100px;
 display: inline-block;
 border-radius: 50%;
 background: url('assets/images/blank-avatar.svg') no-repeat center;
 ${props => props.image != null && ({
    border: '2px solid #333333',
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
AvatarContainer.FeaturedText = styled.div`
font-size: 16px;
font-family: Ubuntu-bold
margin-top: 2%;

@media(min-width:768px){
  font-size: 16px;
}

@media(min-width:1025px){
font-size: 16px;
}
`;
AvatarContainer.CaptionText = styled.div`
font-size: 14px;
font-family: Ubuntu-light;
@media(min-width:768px){
  font-size: 15px;
}
@media(min-width:1025px){
  font-size: 16px;
}
`;

AvatarContainer.loaderWrapper = styled.div`
position: fixed;
top: 0;
z-index: 10;
left: 0;
right: 0;
bottom: 0;
background-color: rgba(0,0,0, 0.3);
`;

AvatarContainer.Image = styled.img`
 height: 100%;
 width: 100%;
 object-fit: contain;
 @media(min-width:768px){
  object-fit: cover;
 }
`;

AvatarContainer.FullScreenUploadWrapper = styled.div`
    position: relative;
    overflow: hidden;
    display: inline-block;
    width: 100%;
    height: 100%;
  }
`;

AvatarContainer.FullScreenUploadButton = styled.button`
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


AvatarContainer.FullScreenUploadInput = styled.input`
    font-size: 100px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    height: 100%;
    width: 100%;
`;


AvatarContainer.ErrorMessage = styled.span`
color:  red;
font-size: 16px;
`;

AvatarContainer.ErrorText = styled.span`
 color: red;
 position: absolute;
 bottom: 20px;
 font-size: 14px;
`;

AvatarContainer.CropperWrapper = styled.div`
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

AvatarContainer.CropperButton = styled.div`
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

export { AvatarContainer };
