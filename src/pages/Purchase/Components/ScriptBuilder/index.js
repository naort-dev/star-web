import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isPlainObject } from 'lodash';
import Checkbox from 'components/Checkbox';
import Button from 'components/PrimaryButton';
import { FlexCenter } from 'styles/CommonStyled';
import { ScriptGenerator } from 'components/ScriptGenerator';
import Script from 'components/Script';
import { Layout, FlexBoxCenter, TextAreaWrapper } from './styled';

class ScriptBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = { script: '' };
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

  componentDidMount() {
    this.props.headerUpdate('Ok…how does this suggested script sound?');
    const {
      hostName,
      userName,
      occasion,
      date,
      specification,
      templateType,
      user,
      relationshipValue,
    } = this.props.bookingData;
    const relationship = isPlainObject(relationshipValue)
      ? relationshipValue.title
      : relationshipValue;

    const script = ScriptGenerator({
      templateType,
      forName: hostName.charAt(0).toUpperCase() + hostName.slice(1),
      fromName: userName.charAt(0).toUpperCase() + userName.slice(1),
      relationship: relationship.toLowerCase(),
      date,
      occasion: occasion.label.toLowerCase(),
      someOneElse: user !== 'Myself',
      specification: specification.toLowerCase(),
      occasionKey: occasion.key,
      responseTime: this.props.responseTime,
    });
    this.setState({ script });
  }
  getAudioFile = key => {
    if (this.props.audio[key] !== null) {
      return new File(
        [this.props.audio[key].recordedBlob],
        'recorded-name.webm',
      );
    }
    return null;
  };

  readyToPayment = () => {
    this.props.loaderAction(false);
    this.props.submitClick();
  };

  handleCheck = checked => {
    this.props.videoPrivateCheck(checked);
  };

  submitClick = () => {
    if (!this.props.isLoggedIn) {
      this.props.scriptSubmit();
    } else {
      const payload = {
        starDetail: {
          id: this.props.userDetails.id,
        },
        selectedValue: this.props.bookingData.occasion.key,
        public_request: this.props.checked,
        from_audio_file: this.getAudioFile('from'),
        to_audio_file: this.getAudioFile('for'),
        type: this.props.category,
        requestRelationshipData: this.props.bookingData.relationshipValue,
        stargramto: this.props.bookingData.hostName,
        stargramfrom: this.props.bookingData.userName,
        date: this.props.bookingData.date,
        importantinfo: this.props.importantInfo,
        booking_statement: this.state.script,
      };
      this.props.loaderAction(true);
      this.props.starsonaRequest(
        payload,
        this.props.checked,
        this.readyToPayment,
      );
    }
  };
  render() {
    return (
      <Layout className="content-wrapper">
        <Script
          scriptText={this.props.bookingData.scriptText}
          script={this.state.script}
        />
        <FlexBoxCenter>
          <p>
            Review this suggested script for the star. It will help them get the
            details right. The star will still add their own style and
            personalized spin. You can{' '}
            <span
              className="bluetext"
              onClick={this.props.goBack}
              role="presentation"
            >
              go back
            </span>{' '}
            to edit it.
          </p>
        </FlexBoxCenter>
        <TextAreaWrapper>
          <textarea
            value={this.props.importantInfo}
            onChange={event => this.props.infoChange(event.target.value)}
            placeholder="Add any additional information that might be helpful to the star as nice to haver. It could be a funny quirk, why you’re such a big fan, a favorite movie/song or play they did…."
          />
        </TextAreaWrapper>
        <FlexBoxCenter className="private-checkbox">
          <Checkbox
            placeholder=" Make my video private"
            onChange={this.handleCheck}
            checked={this.props.checked}
          />
        </FlexBoxCenter>
        <FlexCenter className="button-wrapper">
          <Button onClick={this.submitClick} className="continue-button">Continue</Button>
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
  goBack: PropTypes.func.isRequired,
  userDetails: PropTypes.object.isRequired,
  category: PropTypes.number.isRequired,
  headerUpdate: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  importantInfo: PropTypes.string,
  infoChange: PropTypes.func.isRequired,
  responseTime: PropTypes.string,
};

ScriptBuilder.defaultProps = {
  submitClick: () => {},
  importantInfo: '',
  responseTime: '',
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
