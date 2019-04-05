import React, { Component } from 'react';
import {
  Layout,
  ScriptContainer,
  Script,
  FlexBoxCenter,
  TextAreaWrapper,
} from './styled';
import StarDrawer from '../../../../components/StarDrawer';
import Checkbox from '../../../../components/Checkbox';
import Button from '../../../../components/PrimaryButton';
import { FlexCenter } from '../../../../styles/CommonStyled';

class ScriptBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = { open: true, stepCount: 1 };
    this.starDataSet1 = [
      {
        size: '28px',
        horizontal: '2%',
        vertical: '35px',
        rotation: '15deg',
        color: '#46829a',
      },
      {
        size: '22px',
        horizontal: '8%',
        vertical: '15px',
        rotation: '0deg',
        color: '#46829a',
      },
      {
        size: '15px',
        horizontal: '5%',
        vertical: '70px',
        rotation: '15deg',
        color: '#6dafc8',
      },
    ];
    this.starDataSet2 = [
      {
        size: '34px',
        horizontal: '94%',
        vertical: '35px',
        rotation: '0deg',
        color: '#46829a',
      },
      {
        size: '22px',
        horizontal: '92%',
        vertical: '10px',
        rotation: '30deg',
        color: '#46829a',
      },
      {
        size: '20px',
        horizontal: '89%',
        vertical: '70px',
        rotation: '15deg',
        color: '#46829a',
      },
    ];
  }

  handleCheck = value => {};
  render() {
    return (
      <Layout>
        <ScriptContainer>
          <section className="startWrapper">
            <StarDrawer starData={this.starDataSet1} />
          </section>
          <Script>
            “Your husband, Jonas, wanted me to wish Sarah an amazing birthday
            tomorrow!”
          </Script>
          <section className="startWrapper">
            <StarDrawer starData={this.starDataSet2} />
          </section>
        </ScriptContainer>
        <FlexBoxCenter>
          <p>
            Review this suggested script for the star. It will help them get the
            details right. The star will still add their own style and
            personalized spin. You can <span className="bluetext">go back</span>{' '}
            to edit it.
          </p>
        </FlexBoxCenter>
        <TextAreaWrapper>
          <textarea placeholder="Add any additional information that might be helpful to the star as nice to haver. It could be a funny quirk, why you’re such a big fan, a favorite movie/song or play they did…." />
        </TextAreaWrapper>
        <FlexBoxCenter>
          <Checkbox
            placeholder=" Make my video private"
            onChange={this.handleCheck}
            checked={false}
          />
        </FlexBoxCenter>
        <FlexCenter>
          <Button onClick={this.props.submitClick}>Continue</Button>
        </FlexCenter>
      </Layout>
    );
  }
}

export default ScriptBuilder;
