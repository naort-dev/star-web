import React from 'react';
import SvgStyled from './styled';

export default class PathDrawer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
    this.svgNode = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('resize', this.drawPath);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.drawPath);
  }

  drawPath = () => {
    console.log('hi');
  }

  render() {
    return (
      <SvgStyled ref={this.svgNode}>
        <g id="flow-path">
          <path
            d=""
          />
        </g>
      </SvgStyled>
    );
  }
}
