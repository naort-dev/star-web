import React from 'react';
import SvgStyled from './styled';

export default class PathDrawer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pathData: '',
    };
    this.pathDesktop = `M 60 0 v 610
    c 2 35 50 30 50 30
    h 450
    c 35 0 33 30 33 30
    v 300
    c -10 25 -20 20 -20 20
    h -200
    c -40 0 -40 40 -40 40
    v 480`;
    this.pathIpad = `M 60 0 v 600
    c 2 35 50 30 50 30
    h 300
    c 35 0 30 30 30 30
    v 330
    c -10 25 -20 20 -20 20
    h -200
    c -40 0 -35 40 -35 40
    v 600`;
  }

  componentDidMount() {
    this.togglePathData();
    window.addEventListener('resize', this.togglePathData);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.togglePathData);
  }

  togglePathData = () => {
    let { pathData } = this.state;
    if (document.body.getBoundingClientRect().width >= 1280) {
      pathData = this.pathDesktop;
    } else if (document.body.getBoundingClientRect().width >= 864) {
      pathData = this.pathIpad;
    }
    this.setState({ pathData });
  }

  render() {
    const { pathData } = this.state;
    return (
      <SvgStyled version="1" xmlns="http://www.w3.org/2000/svg">
        <g className="flow-path">
          <path d={pathData} />
        </g>
      </SvgStyled>
    );
  }
}
