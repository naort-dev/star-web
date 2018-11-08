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
  color: ${props => props.overlay && '#fff'};
  @media(min-width: 768px) {
    display: ${props => (props.overlay ? 'block' : 'table')};
    padding: 3px 0;
  }
`;
VideoRecorderStyled.DetailsTitle = styled.span`
  font-family: 'Avenir-Light';
  width: ${props => (props.overlay ? '100%' : '40%')};
  display: inline-block;
  font-size: 12px;
  vertical-align: top;
  @media(min-width: 768px) {
    display: ${props => (props.overlay ? 'block' : 'table-cell')};
    width: ${props => (props.overlay ? '100%' : '20%')};
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
  width: ${props => (props.overlay ? '100%' : '60%')};
  display: inline-block;
  vertical-align: top;
  font-size: 12px;
  padding-left: ${props => (props.overlay ? '0' : '20px')};
  @media(min-width: 768px) {
    display: ${props => (props.overlay ? 'block' : 'table-cell')};
    width: ${props => (props.overlay ? '100%' : '80%')};
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
