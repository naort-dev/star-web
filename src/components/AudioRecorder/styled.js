import styled from 'styled-components';

const AudioRecorderDiv= styled.div`
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
`;

AudioRecorderDiv.Button= styled.button`
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
`;

AudioRecorderDiv.Label = styled.div`
font-size: 24px;
color: #FF6C58;
font-family: Ubuntu-bold;
margin-bottom: 10px;
`;



export { AudioRecorderDiv };