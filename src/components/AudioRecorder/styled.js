import styled from 'styled-components';

const AudioRecorderDiv= styled.div`
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
`;

AudioRecorderDiv.Button = styled.button`
width: 60px;
height: 60px;
background-color: white ;
margin-right: 5px;
padding: 5px 20px;
text-align: center;
color: white;
border-radius: 50%
border: 2px solid #ef6a58;
cursor: pointer;
background-image: url('../../assets/images/mic.svg');
background-size: 30px;
background-repeat: no-repeat;
background-position: center;
margin-top: 10px;
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
font-size: 24px;
color: #FF6C58;
font-family: Ubuntu-bold;
margin-bottom: 10px;
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
width: 60px;
height: 60px;
background-color: white ;
margin-right: 5px;
padding: 5px 20px;
text-align: center;
color: white;
border-radius: 50%
border: 2px solid #ef6a58;
cursor: pointer;
background-image: url('../../assets/images/mic-close.svg');
background-size: 30px;
background-repeat: no-repeat;
background-position: center;
margin-top: 10px;
`;

AudioRecorderDiv.Audio = styled.audio`
  width: 50%;
`;


export { AudioRecorderDiv };