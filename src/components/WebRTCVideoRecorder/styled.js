import styled from 'styled-components';

const VideoRecorderDiv = styled.div`
  height: 301px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column-reverse;
  @media(min-width:1025px){
    width: 100%;
    height: 400px;
  }
  @media(min-width:768px){
    width: 100%;
    height: 400px;
  }
`;

VideoRecorderDiv.VideoContainer = styled.div`
  height: 250px;
  width: 100%;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  @media(min-width:768px){
    width: 100%;
    height: 300px
  }
  @media(min-width:1025px){
    height: 80%;
    width: 80%;
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
  margin: 10px 5px;
  background-color: #fff; 
  color: #FF6C58;
  padding: 4px 30px;
  height: 30px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  font-family: 'Ubuntu-Bold';
  outline:none;
  border-radius:5px;
  background-image: url('../../assets/images/rec-icon.svg');
  background-size: 30px;
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  cursor: pointer;
  ${props => props.stop && ({
    backgroundImage: 'url(../../assets/images/pause.svg)',
    backgroundSize: '20px',
  })
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
height: 30px;
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
border: 1px solid #FF6C58;
background-image: url('../../assets/images/upload.svg');
background-size: 30px;
background-repeat: no-repeat;
background-position: center;
border: none;
cursor: pointer

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
    width:160px;
    height:28px;
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
    color: #FFFFFF;
    font-family: 'Ubuntu-Regular';
    text-align: center;
  `;

  VideoRecorderDiv.Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  `;

  VideoRecorderDiv.Icon = styled.div`
  position: absolute;
  top: 10%;
  left: 85%;
  background: url('assets/images/video-record.gif') no-repeat;
  background-size: cover;
  background-position: center center;
  height: 30px;
  width: 30px;
  `

  VideoRecorderDiv.StopRecorderText = styled.div`
  font-size: 18px;
  color: #FF6C58;
  font-family: 'Ubuntu-Regular';
  text-align: center;
  `;

export default VideoRecorderDiv;
