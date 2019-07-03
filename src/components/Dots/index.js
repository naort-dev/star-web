import React from 'react';
import { times, random } from 'lodash';
import DotsStyled from './styled';

export default class DotsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullScreen: false,
    };
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    const { fullScreen } = this.state;
    if (fullScreen && document.body.getBoundingClientRect().width >= 834) {
      this.setState({ fullScreen: false });
    } else if (
      !fullScreen &&
      document.body.getBoundingClientRect().width < 834
    ) {
      this.setState({ fullScreen: true });
    }
  };

  renderSliderDots = () => {
    const DotsArray = times(this.props.dotsCount, random.bind(0, 100));
    const selectedDot = this.props.selectedDot ? this.props.selectedDot - 1 : 0;
    return DotsArray.map((item, index) => {
      return (
        <DotsStyled.SliderDots selected={selectedDot >= index} key={index} />
      );
    });
  };

  renderPopup = () => {
    return (
      <DotsStyled className={`dots-container ${this.props.className}`}>
        {this.renderSliderDots()}
      </DotsStyled>
    );
  };

  render() {
    return this.renderPopup();
  }
}
