import React, { Component } from 'react';
import { Layout, ScriptContainer, Script, FlexBoxCenter } from './styled';
import StarDrawer from '../../../../components/StarDrawer';

class ScriptBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = { open: true, stepCount: 1 };
    this.starData = [
      {
        size: '28px',
        horizontal: '15px',
        vertical: '35px',
        rotation: '0deg',
        color: '#46829a',
      },
      {
        size: '22px',
        horizontal: '40px',
        vertical: '15px',
        rotation: '30deg',
        color: '#46829a',
      },
      {
        size: '15px',
        horizontal: '30px',
        vertical: '70px',
        rotation: '15deg',
        color: '#6dafc8',
      },

      {
        size: '34px',
        horizontal: '480px',
        vertical: '35px',
        rotation: '0deg',
        color: '#46829a',
      },
      {
        size: '22px',
        horizontal: '475px',
        vertical: '15px',
        rotation: '30deg',
        color: '#46829a',
      },
      {
        size: '20px',
        horizontal: '462px',
        vertical: '70px',
        rotation: '15deg',
        color: '#46829a',
      },
    ];
  }

  state = {};
  render() {
    return (
      <Layout>
        <ScriptContainer>
          <StarDrawer starData={this.starData} />
          <Script>
            “Your husband, Jonas, wanted me to wish Sarah an amazing birthday
            tomorrow!”
          </Script>
        </ScriptContainer>
        <FlexBoxCenter>
          <p>
            Review this suggested script for the star. It will help them get the
            details right. The star will still add their own style and
            personalized spin. You can <span className="bluetext">go back</span>{' '}
            to edit it.
          </p>
        </FlexBoxCenter>
      </Layout>
    );
  }
}

export default ScriptBuilder;
