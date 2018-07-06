import styled from 'styled-components';

const ImageStackDiv = styled.div`
  background-color:rgba(248, 248, 248, 1);
  padding: 10px 10px;
  height:100%;
  @media(min-width: 1025px) {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
 
`;
ImageStackDiv.FeatureImage = styled.div`
  width:100%;
  background-image: ${props => (props.imageUrl ? `url(${props.imageUrl})` : 'url(assets/images/default-cover.jpg)')};
  background-repeat:no-repeat;
  height:50%;
  background-position: center;
  margin-bottom:1%;
  @media(min-width: 1025px) {
    background-position: center center;
    background-size: cover;
    margin-bottom: 10px;
    max-width: 800px;
    max-height: 396px;
  }
`;
ImageStackDiv.ExtraImagesLayout = styled.div`
  display:flex;
  flex-direction: row;
  height: 50%;
  @media(min-width: 1025px) {
    width: 100%;
    max-width: 800px;
  }
`;
ImageStackDiv.ExtraImages1 = styled.div`
  width:50%;
  background-image: ${props => (props.imageUrl ? `url(${props.imageUrl})` : 'url(assets/images/default-cover.jpg)')};
  background-repeat:no-repeat;
  height:100%;
  padding-right:5px;
  background-position: center center;
  background-size: cover;
  margin-right:1%;
  @media(min-width: 1025px) {
    background-position: center center;
    background-size: cover;
    margin-right: 10px;
    max-width: 396px;
    max-height: 376px;
  }
`;
ImageStackDiv.ExtraImages2 = styled.div`
  width:50%;
  background-image: ${props => (props.imageUrl ? `url(${props.imageUrl})` : 'url(assets/images/default-cover.jpg)')};
  background-repeat:no-repeat;
  height:100%;
  background-position: center;
  @media(min-width: 1025px) {
    background-position: center center;
    background-size: cover;
    max-width: 396px;
    max-height: 376px;
  }
`;


export default ImageStackDiv;
