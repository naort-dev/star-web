import styled from 'styled-components';

const VideoRecorderDiv = styled.div`
  height: 100%;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media(min-width:1025px){
    width: 100%;
    height: 100%
  }
`;

VideoRecorderDiv.Video = styled.video`
  height: 70%;
  width: 100vw;
  object-fit:cover;
  @media(min-width:1025px){
    width: 50%;
    height: 50%
  }
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
