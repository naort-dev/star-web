import React from 'react';
import SvgStyled from './styled';

export default class PathDrawer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <SvgStyled>
        <g className="flow-path">
          <path
            d=""
          />
        </g>
      </SvgStyled>
    );
  }
}
