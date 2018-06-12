import styled from 'styled-components';

const ImageStackDiv = styled.div`
  background-color:white;
  padding: 10px 10px;
  height:100%;
  
 
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
  }
`;
ImageStackDiv.ExtraImagesLayout = styled.div`
  display:flex;
  justify-content: space-between;
  flex-direction: row;
  height: 50%;
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
  }
`;


export default ImageStackDiv;
