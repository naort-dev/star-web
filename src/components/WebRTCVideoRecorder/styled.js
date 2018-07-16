import styled from 'styled-components';

const VideoRecorderDiv = styled.div`
  height: 30vh;
  width: 30vw;
  background-color: black
  @media(max-width:1024px){
    width: 100%;
    height: 100%
  }
`;

VideoRecorderDiv.Video = styled.video`
  height: 100%;
  width: 100%;
`;

VideoRecorderDiv.Button = styled.button`
  background-color: #fff; 
  color: #FF6C58;
  padding: 4px 30px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 10px;
  font-family: 'Ubuntu-Bold';
  outline:none;
  border-radius:5px;
  border: 2px solid #FF6C58;
`;


export default VideoRecorderDiv;
