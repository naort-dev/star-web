import styled from 'styled-components';

const VideoRecorderStyled = styled.div`
  height: 100%;
  width: 100%;
  min-width: 200px;
`;

VideoRecorderStyled.DetailsItem = styled.li`
  display: block;
  width: 100%;
  padding: 3px 0;
  line-height: 20px;
  color: #fff;
  @media(min-width: 768px) {
    display: block;
    padding: 3px 0;
  }
`;
VideoRecorderStyled.DetailsTitle = styled.span`
  font-family: 'Avenir-Light';
  width: 100%;
  display: inline-block;
  font-size: 12px;
  vertical-align: top;
  @media(min-width: 768px) {
    display: block;
    width: 100%;
    font-size:13px;
    vertical-align: middle;
  }
  @media(min-width:1920px){
    font-size:16px;
  }
`;

VideoRecorderStyled.DetailsValue = styled.span`
  display: inline-block;
  font-family: 'Avenir-Light';
  width: 100%;
  display: inline-block;
  vertical-align: top;
  font-size: 12px;
  padding-left: 0;
  @media(min-width: 768px) {
    display: block;
    width: 100%;
    font-size:13px;
  }
  @media(min-width:1920px){
    font-size:16px;
  }
`;

VideoRecorderStyled.AudioIcon = styled.img`
  vertical-align: top;
  padding-left: 8px;
  width: 24px;
  cursor: pointer;
`;

export default VideoRecorderStyled;
