import React from 'react';
import ImageStackDiv from './styled';

export class ImageStack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      featureImage: {
        width: '100%',
        height: '50%',
      },
      extraImage: {
        width: '50%',
        height: '50%',
      },
    };
    this.featureImageRatio = (800 / 396);
  }
  componentDidMount() {
    this.setImagesHeight();
    window.addEventListener('resize', this.setImagesHeight);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setImagesHeight);
  }

  setImagesHeight = () => {
    if (this.imageStack) {
      const parentWidth = this.imageStack.parentNode.clientWidth - 20;
      const parentHeight = this.imageStack.parentNode.clientHeight - 20;
      let remainingheight = parentHeight / 2;
      let featureImageSize = {};
      let extraImageSize = {};
      featureImageSize.width = parentWidth;
      featureImageSize.height = parentWidth / this.featureImageRatio;
      if (featureImageSize.height >= remainingheight) {
        featureImageSize.height = remainingheight;
        featureImageSize.width = remainingheight * this.featureImageRatio;
      }
      extraImageSize.width = (featureImageSize.width / 2) - 5;
      extraImageSize.height = featureImageSize.width / 2;
      this.setState({ featureImage: featureImageSize, extraImage: extraImageSize });
    }
  }

  
  render() {
    const { props } = this;
    return (
      <ImageStackDiv innerRef={(node) => { this.imageStack = node; }}>
        <ImageStackDiv.FeatureImage
          style={{ width: this.state.featureImage.width, height: this.state.featureImage.height }}
          imageUrl={props.featureImage}
        />
        <ImageStackDiv.ExtraImagesLayout>
          <ImageStackDiv.ExtraImages1
            style={{ width: this.state.extraImage.width, height: this.state.extraImage.height }}
            imageUrl={props.imageList[0]}
          />
          <ImageStackDiv.ExtraImages2
            style={{ width: this.state.extraImage.width, height: this.state.extraImage.height }}
            imageUrl={props.imageList[1]}
          />
        </ImageStackDiv.ExtraImagesLayout>
      </ImageStackDiv>
    );
  }
}

