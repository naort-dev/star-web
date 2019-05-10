import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StarDrawer from 'components/StarDrawer';
import Checkbox from 'components/Checkbox';
import Button from 'components/PrimaryButton';
import { FlexCenter } from 'styles/CommonStyled';
import {
  Layout,
  ScriptContainer,
  Script,
  FlexBoxCenter,
  TextAreaWrapper,
} from './styled';

class ScriptBuilder extends Component {
  constructor(props) {
    super(props);
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

  handleCheck = checked => {
    this.props.videoPrivateCheck(checked);
  };

  readyToPayment = () => {
    this.props.scriptSubmit();
  };

  submitClick = () => {
    if (this.props.isLoggedIn) {
      this.props.submitClick();
    } else {
      const payload = {
        celebrity: 106,
        occasion: this.props.bookingData.occasion.key,
        public_request: this.props.checked,
        from_audio_file: null,
        to_audio_file: null,
        request_details: {
          stargramto: this.props.bookingData.hostName,
          stargramfrom: this.props.bookingData.userName,
          relationship: this.props.bookingData.relationshipValue,
          date: this.props.bookingData.date,
        },
      };
      this.props.starsonaRequest(
        payload,
        this.props.checked,
        this.readyToPayment,
      );
    }
  };
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
            checked={this.props.checked}
          />
        </FlexBoxCenter>
        <FlexCenter>
          <Button
            onClick={this.submitClick}
            disabled={!this.props.checked}
            isDisabled={!this.props.checked}
          >
            Continue
          </Button>
        </FlexCenter>
      </Layout>
    );
  }
}

ScriptBuilder.propTypes = {
  submitClick: PropTypes.func,
  videoPrivateCheck: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  scriptSubmit: PropTypes.func.isRequired,
  starsonaRequest: PropTypes.func.isRequired,
  audio: PropTypes.object.isRequired,
  bookingData: PropTypes.object.isRequired,
};

ScriptBuilder.defaultProps = {
  submitClick: () => {},
};

export default connect(
  state => ({
    pageCount: state.occasionList.pageCount,
    isLoggedIn: state.session.isLoggedIn,
    bookingData: state.occasionList.bookingData
      ? state.occasionList.bookingData
      : {},
    audio: state.audioRecorder.recorded,
  }),
  null,
)(ScriptBuilder);
