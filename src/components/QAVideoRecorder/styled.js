import styled from 'styled-components';

const VideoRecorderDiv = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column-reverse;
  @media(min-width:1025px){
    width: 100%;
    height: 100%;
  }
  @media(min-width:768px){
    width: 100%;
    height: 100%;
  }
`;

VideoRecorderDiv.UploadContainer = styled.div`
  height: 100%;
  width: 100%;
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
    height: 100%;
  }
`;

VideoRecorderDiv.VideoContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  background-color: rgba(0,0,0,0.8);
  justify-content: center;
  align-items: center;
  position: relative;
  @media(min-width:768px){
    width: 100%;
    height: 100%;
  }
  @media(min-width:1025px){
    height: 100%;
    width: 100%;
  }

`;

VideoRecorderDiv.Video = styled.video`
  height: 100%;
  width: 100%;
  object-fit: fill;
  background-color: black;
  @media(min-width:1025px){
    width: 100%;
    height: 100%
  }
`;

VideoRecorderDiv.Button = styled.button`
  margin: 10px 5px;
  background-color: green; 
  color: #FF6C58;
  height: 50px;
  width: 50px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  font-family: 'Ubuntu-Bold';
  outline:none;
  border-radius: 100%;
  background-image: url('../../assets/images/video-recorder.svg');
  background-size: 30px;
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  cursor: pointer;
  margin-right: 30px;
  @media(min-width:768px){
    height: 60px;
    width: 60px;
    background-size: 20px;
  }
  @media(min-width: 1920px) {
    height: 100px;
    width: 100px;
    background-size: 50px;
  };
  ${props => props.stop && ({
    backgroundColor: '#FF0000',
    marginRight: 0,
  })}
`;

VideoRecorderDiv.RerecordButton = styled.button`
  margin: 10px 20px;
  background-color: #FF0000; 
  color: #FF6C58;
  height: 50px;
  width: 50px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  position: relative;
  font-size: 14px;
  font-family: 'Ubuntu-Bold';
  outline:none;
  border-radius: 100%;
  background-image: url('../../assets/images/close-white.svg');
  background-size: 20px;
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  cursor: pointer;
  &:hover {
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: block;
      background: rgba(0,0,0,0.1);
      border-radius: 50%;
    }
  }
  @media(min-width:768px){
    height: 60px;
    width: 60px;
    background-size: 20px;
  }
  @media(min-width: 1920px) {
    height: 100px;
    width: 100px;
    background-size: 40px;
  }
`;

VideoRecorderDiv.ControlButton = styled.button`
  background-color: #0000007a; 
  color: #FF6C58;
  height: 50px;
  width: 50px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  font-family: 'Ubuntu-Bold';
  outline:none;
  border-radius: 100%;
  background-size: 20px;
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  cursor: pointer;
  position: absolute;
  left: 50%;
  top: 50%;
  background-image: ${props => (props.paused ? "url('../../assets/images/icon-play.svg')" : "url('../../assets/images/pause-button.svg')")};
  transform: translate(-50%, -50%);
  @media(min-width:768px){
    height: 50px;
    width: 50px;
    background-size: 20px;
  }
  @media(min-width: 1920px) {
    height: 100px;
    width: 100px;
    background-size: 40px;
  } 
`;

VideoRecorderDiv.SubmitButton = styled.button`
  margin: 10px 20px;
  background-color: green; 
  color: #FF6C58;
  height: 50px;
  width: 50px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  position: relative;
  font-family: 'Ubuntu-Bold';
  outline:none;
  border-radius: 100%;
  background-image: url('../../assets/images/checked-white.svg');
  background-size: 30px;
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  cursor: pointer;
  &:hover {
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: block;
      background: rgba(0,0,0,0.1);
      border-radius: 50%;
    }
  }
  @media(min-width:768px){
    height: 60px;
    width: 60px;
    background-size: 20px;
  }
  @media(min-width: 1920px) {
    height: 100px;
    width: 100px;
    background-size: 50px;
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
margin-top: 50%;
text-align: center;
color: #FF6C58;


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
margin: 10px 0px;
height: 50px;
width: 50px;
background-color: #000;
color: #FF6C58;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 14px;
font-family: 'Ubuntu-Bold';
outline:none;
border-radius: 100%;
background-image: url('../../assets/images/upload.png');
background-size: 100% 100%;
background-repeat: no-repeat;
border: none;
cursor: pointer;
@media(min-width: 768px){
  height: 60px;
  width: 60px;
}
@media(min-width: 1920px) {
  height: 100px;
  width: 100px;
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
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
  width: 100%;
  height: 100%;
  margin-top: 10px;
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
    color: #FFF;
    font-family: 'Ubuntu-Regular';
    padding: 0 10px;
    text-align: center;
    width: 100%;
  `;

VideoRecorderDiv.Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0 10px;
  position: absolute;
  line-height: 41px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-image: linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,0));
`;

VideoRecorderDiv.UploadTextWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0 10px;
  margin-top: 14px;
  top:0px;
  left: 0;
  right: 0;
  position: absolute;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

VideoRecorderDiv.IndicationText = styled.div`
  position: absolute;
  top: 5%;
  right: 20px;
  color: #FF0000;
`;

VideoRecorderDiv.StopRecorderText = styled.div`
  font-size: 18px;
  color: #FF6C58;
  font-family: 'Ubuntu-Regular';
  text-align: center;
`;

VideoRecorderDiv.ControlWrapper = styled.div`
  width: 100%;
  height: 90%;
`;

VideoRecorderDiv.UploadControlWrapper = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

  VideoRecorderDiv.ActionButton = styled.div`
  display: flex;
  width: 100%;
  height: 10%;
  position: absolute;
  align-items: center;
  justify-content: center;
  bottom: 10%;
  `;

  VideoRecorderDiv.UploadActionButton = styled.div`
  margin-top: 10px;
  display: flex;
  width: 100%;
  height: 10%;
  align-items: center;
  justify-content: center;
  `;

  VideoRecorderDiv.RecordInfoButton = styled.div`
  color: #fff;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  `

  VideoRecorderDiv.VideoHeading = styled.div`
  font-family: 'Ubuntu-bold';
  color: #fff;
  font-size: 24px;
  height: 35%;
  `;

  
  VideoRecorderDiv.UploadHeading = styled.div`
  font-family: 'Ubuntu-bold';
  color: #fff;
  font-size: 24px;
  height: 35%;
  top: 5%;
  position: absolute;
  `;

export default VideoRecorderDiv;
