import styled from 'styled-components';

const VideoRecorderDiv = styled.div`
  height: 80%;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media(min-width:1025px){
    width: 100%;
    height: 100%;
  }
  @media(min-width:768px){
    width: 100%;
    height: 90%;
  }
`;

VideoRecorderDiv.VideoContainer = styled.div`
  height: 90%;
  width: 100%;
  background-color: #333333;
  @media(min-width:768px){
    width: 100%;
    height: 90%;
  }
  @media(min-width:1025px){
    height: 40%;
    width: 60%;
  }

`;

VideoRecorderDiv.Video = styled.video`
  height: 100%;
  width: 100%;
  object-fit: contain;
  @media(min-width:1025px){
    width: 100%;
    height: 100%
  }
`;

VideoRecorderDiv.Button = styled.button`
  margin-top: 10px;
  background-color: #fff; 
  color: #FF6C58;
  padding: 4px 30px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  font-family: 'Ubuntu-Bold';
  outline:none;
  border-radius:5px;
  border: 2px solid #FF6C58;

  @media(max-width:1024px){
    position: fixed;
    top: 80vh;
  }

`;

VideoRecorderDiv.NoVideoContainer = styled.div`
  height: 90%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media(min-width:768px){
    width: 100%;
    height: 90%;
  }
  @media(min-width:1025px){
    height: 40%;
    width: 60%;
  }
  `;

VideoRecorderDiv.NoVideoText = styled.div`
font-family: 'Ubuntu-Bold';
font-size: 25px;
text-align: center;
color: #FF6C58;
margin-top:10%;

@media(min-width:768px){
  font-size: 32px;
}
@media(min-width:1025px){
  font-size:35px;
}
@media(min-width:1920px){
  font-size:38px;
}
`;

VideoRecorderDiv.NoVideoButton = styled.button`
  width:100%;
  max-width:364px;
  height:46px;
  background-color:white;
  color: #FF6C58;
  border: 3px solid #FF6C58; 
  border-radius:19px;
  font-size:16px;
  font-family: 'Ubuntu-Medium';
  box-shadow: -2px 6px 8px #FF6C58);
  margin-bottom:25px;
  outline:none;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    color :#FF6C58;
    border-color:#FF6C58;
  }
  @media(min-width: 768px){
    max-width:500px;
    height:60px;
    font-size:28px;
    margin-bottom:40px;
  }
  @media(min-width: 1025px){
    max-width:325px;
    height:53px;
    font-size:20px;
  }
  @media(min-width:1920px){
    max-width: 475px;
  }
`;


VideoRecorderDiv.UploadWrapper = styled.div`
    position: relative;
    overflow: hidden;
    display: inline-block;
    cursor: pointer;
  }
`;



VideoRecorderDiv.UploadInput = styled.input`
    font-size: 100px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
  `;

  VideoRecorderDiv.LoaderWrapper = styled.div`
  position: fixed;
  top: 0;
  z-index: 10;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0, 0.3);
  `;


  VideoRecorderDiv.InfoText = styled.div`
  font-size: 20px;
  color: #FFFFFF;
  font-family: 'Ubuntu-Medium';
  font-style: italic;
  text-align: center;
  `;


export default VideoRecorderDiv;
