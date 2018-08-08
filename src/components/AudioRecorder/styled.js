import styled, {keyframes} from 'styled-components';

const AudioRecorderDiv = styled.div`
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
margin-top:1%;
`;

const ripple = keyframes`
0% {transform:scale(1); }
  75% {transform:scale(1.75); opacity:1;}
  100% {transform:scale(2); opacity:0;}
`;



AudioRecorderDiv.RippleButton = styled.button`
width: 30px;
height: 30px;
background-color: white ;
margin-right: 5px;
padding: 5px 14px;
text-align: center;
color: white;
border-radius: 50%
border: 2px solid #ef6a58;
cursor: pointer;
background-image: url('../../assets/images/mic.svg');
background-size: 17px;
background-repeat: no-repeat;
background-position: center;
margin-top: 10px;
position: relative;
&:before,
&:after {
  content:'';
  display:block;
  position:absolute;
  top:0; right:0; bottom:0; left:0;
  border-radius:50%;
  border:1px solid #FF6C58;
}

&:before {
  -webkit-animation: ${ripple} 2s linear infinite;
  animation: ${ripple} 2s linear infinite;
}
&:after {
  -webkit-animation: ${ripple} 2s linear 1s infinite;
  animation: ${ripple} 2s linear 1s infinite;
}
`;

AudioRecorderDiv.Button = styled.button`
width: 30px;
height: 30px;
background-color: white ;
margin-right: 5px;
padding: 5px 14px;
text-align: center;
color: white;
border-radius: 50%
border: 2px solid #ef6a58;
cursor: pointer;
background-image: url('../../assets/images/mic.svg');
background-size: 17px;
background-repeat: no-repeat;
background-position: center;
margin-top: 10px;
position: relative;
order: 1;
`;



AudioRecorderDiv.TextButton = styled.button`
min-width: 60px;
background-color: white ;
margin-right: 5px;
padding: 5px 20px;
text-align: center;
font-family: 'Ubuntu-Bold';
color: #FF6C58;
border: 2px solid #ef6a58;
cursor: pointer;
border-radius: 5px;
margin-top: 15px;
`;

AudioRecorderDiv.Label = styled.div`
font-size: 16px;
color: #FF6C58;
font-family: Ubuntu-bold;
margin-bottom: 10px;
@media(min-width:1025px){
  font-size: 24px;
}
`;

AudioRecorderDiv.UploadWrapper = styled.div`
    position: relative;
    overflow: hidden;
    display: inline-block;
    cursor: pointer;
  }
`;

AudioRecorderDiv.UploadInput = styled.input`
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

AudioRecorderDiv.CloseButton = styled.button`
width: 30px;
height: 30px;
background-color: white ;
margin-right: 5px;
padding: 5px 14px;
text-align: center;
color: white;
border-radius: 50%
border: 2px solid #ef6a58;
cursor: pointer;
background-image: url('../../assets/images/delete.svg');
background-size: 17px;
background-repeat: no-repeat;
background-position: center;
margin-top: 10px;
order: 2;
`;

AudioRecorderDiv.Audio = styled.audio`

  @media(min-width:1025px){
    width: 50%;
    margin-top: 10px;
  }
`;

AudioRecorderDiv.ControlWrapper = styled.div`
 display: flex;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

AudioRecorderDiv.PlayButton = styled.button`
width: 30px;
height: 30px;
background-color: white ;
margin-right: 5px;
padding: 5px 14px;
text-align: center;
color: white;
border-radius: 50%
border: 2px solid #ef6a58;
cursor: pointer;
background-image: url('../../assets/images/play.svg');
background-size: 17px;
background-repeat: no-repeat;
background-position: center;
margin-top: 10px;
order: 0;
`;

AudioRecorderDiv.PauseButton = styled.button`
width: 30px;
height: 30px;
background-color: white ;
margin-right: 5px;
padding: 5px 14px;
text-align: center;
color: white;
border-radius: 50%
border: 2px solid #ef6a58;
cursor: pointer;
background-image: url('../../assets/images/pause.svg');
background-size: 17px;
background-repeat: no-repeat;
background-position: center;
margin-top: 10px;
order: 0;
`;

export { AudioRecorderDiv };