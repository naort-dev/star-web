import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from "lodash"
import PropTypes from 'prop-types';
import Dropdown from 'components/Dropdown';
import Button from 'components/PrimaryButton';
import { FlexCenter } from 'styles/CommonStyled';
import RequestTemplates from 'components/RequestTemplates';
import { getMobileOperatingSystem } from 'utils/checkOS';
import { Layout, TextArea } from './styled';

function FormContainer(props) {
  const { detailList } = { ...props };
  const [FormData, setFormData] = useState(props.bookingData);
  const optionsList = detailList.map(item => ({
    label: item.title,
    key: item.id,
  }));
  const isMobile = getMobileOperatingSystem();
  const [isDisabled, buttonDisabled] = useState(
    props.bookingData.scriptText === '',
  );
  const [stepOne, validateStepOne] = useState(true);
  const [stepTwo, validateStepTwo] = useState(true);
  const [otherSelected, setOtherSelected] = useState(
    props.bookingData.otherSelected,
  );
  const [scriptText, updateScriptText] = useState(props.bookingData.scriptText);

  const updateUserToMyself = () => {
    setFormData({
      ...FormData,
      user: 'Myself',
      enableAudioRecorder: true,
      hostName: props.user_name ? props.user_name : 'YOU',
      validSelf: true,
    });
  };

  const handleInputChange = (data, type) => {
    setFormData({
      ...FormData,
      enableAudioRecorder: true,
      [type]: data,
    });
    if (type === 'hostName') {
      props.resetRecording('for');
    } else if (type === 'userName') {
      props.resetRecording('from');
    }
  };

  const validateFields = fields => {
    const isValid = fields.every(condition => condition);
    buttonDisabled(!isValid);
  };

  const bookingData = FormData;
  const PageDetailsArray = RequestTemplates(
    FormData.templateType,
    bookingData,
    props.audioRecorder,
    props.saveAudioRecording,
    props.resetRecording,
    handleInputChange,
    updateUserToMyself,
    FormData.occasion.key,
  );

  const onSelectOccasion = occasion => {
    let type = null;
    let result = [];
    if (occasion.key !== 18 && occasion.label !== 'Other') {
      result = props.detailList.filter(item => {
        if (item.id === occasion.key) {
          type = item.template_type;
          return item;
        }
        return {};
      });
      setOtherSelected(false);
    } else {
      setOtherSelected(true);
    }

    const tempObj = {
      user: 'someoneElse',
      enableAudioRecorder: false,
      hostName: '',
      userName: '',
      relationshipValue: '',
      specification: '',
      date: null,
      eventName: '',
      validSelf: false,
      requestId: '',
    };
    setFormData({
      ...FormData,
      templateType: type,
      relationship: result.length ? result[0].relationships : [],
      occasion,
      ...tempObj,
    });
    updateScriptText('');
    buttonDisabled(true);
    props.updateBookingData({
      templateType: type,
      relationship: result.length ? result[0].relationships : [],
      ...tempObj,
    });
    props.pageCountHandler(0);
    props.clearAudio();
    props.audioRecordHandler({ recording: false, playing: false });
  };
  const nextButtonClick = () => {
    if (props.pageCount === PageDetailsArray.length - 1) {
      props.submitClick();
    } else if (otherSelected) {
      props.submitClick();
    } else {
      props.pageCountHandler(props.pageCount + 1);
    }
    props.updateBookingData({ ...FormData, scriptText, otherSelected });
  };

  const checkButtonDisabled = () => {
    if (FormData.user === 'someoneElse' && isMobile && !otherSelected) {
      if (props.pageCount === 0) {
        return stepOne;
      } else if (props.pageCount === 1) {
        return stepTwo;
      }
      return false;
    }
    return isDisabled;
  };

  const validateOnMyself = () => {
    const { hostName, specification, templateType } = {
      ...bookingData,
    };
    if (templateType === 1 || templateType === 2) {
      validateFields([hostName !== '']);
    } else if ([3, 4, 5, 6].includes(templateType)) {
      validateFields([hostName !== '', specification !== '']);
    } else if ([7].includes(templateType)) {
      validateFields([specification !== '']);
    }
  };

  const validateOnSomeoneElseMobile = () => {
    const { hostName, specification, templateType } = {
      ...bookingData,
    };
    if (templateType === 1 || templateType === 2) {
      validateStepOne(![hostName !== ''].every(condition => condition));
      validateStepTwo(false);
    } else if (templateType === 6) {
      validateStepOne(
        ![hostName !== '', specification !== ''].every(condition => condition),
      );
      validateStepTwo(false);
    } else if (templateType === 7) {
      validateStepOne(![specification !== ''].every(condition => condition));
      validateStepTwo(false);
    } else if (templateType === 3 || templateType === 4 || templateType === 5) {
      if (props.pageCount === 0) {
        validateStepOne(![hostName !== ''].every(condition => condition));
      } else if (props.pageCount === 1) {
        validateStepTwo(![specification !== ''].every(condition => condition));
      }
    }
  };

  const validationTypeCheck = () => {
    if (
      FormData.user === 'Myself' ||
      (FormData.user === 'someoneElse' && !isMobile)
    ) {
      validateOnMyself();
    } else if (FormData.user === 'someoneElse' && isMobile) {
      validateOnSomeoneElseMobile();
    }
  };

  useEffect(() => {
    validateOnMyself();
  }, [FormData.validSelf]);

  useEffect(() => {
    validationTypeCheck();
  }, [
      FormData.hostName,
      FormData.specification,
      FormData.templateType,
      props.pageCount,
    ]);

  const getScript = value => {
    updateScriptText(value);
    buttonDisabled(value === '');
  };

  return (
    <Layout className={`content-wrapper ${isEmpty(bookingData.occasion) && "occasion-wrapper"}`}>
      <FlexCenter className="dropdown-wrapper">
        <Dropdown
          options={optionsList}
          selected={bookingData.occasion}
          labelKey="label"
          valueKey="key"
          placeHolder="What is the occasion?"
          className="custom"
          classes={{ scrollbar: 'scroll-wrap' }}
          onChange={occasion => onSelectOccasion(occasion)}
        />
      </FlexCenter>
      <Layout.EventStep2>
        {PageDetailsArray.length > 0 ? PageDetailsArray[props.pageCount] : null}
        {otherSelected && (
          <TextArea>
            <textarea
              rows="5"
              value={scriptText}
              onChange={event => getScript(event.target.value)}
              placeholder="Enter script.."
              className="textarea"
            />
          </TextArea>
        )}
      </Layout.EventStep2>
      <FlexCenter className="button-wrapper">
        <Button
          className="continue-button"
          onClick={() => nextButtonClick()}
          disabled={checkButtonDisabled()}
          isDisabled={checkButtonDisabled()}
        >
          Continue
        </Button>
      </FlexCenter>
    </Layout>
  );
}

FormContainer.propTypes = {
  pageCount: PropTypes.number.isRequired,
  pageCountHandler: PropTypes.func.isRequired,
  bookingData: PropTypes.object.isRequired,
  audioRecorder: PropTypes.object.isRequired,
  saveAudioRecording: PropTypes.func.isRequired,
  resetRecording: PropTypes.func.isRequired,
  detailList: PropTypes.array.isRequired,
  submitClick: PropTypes.func.isRequired,
  updateBookingData: PropTypes.func.isRequired,
  clearAudio: PropTypes.func.isRequired,
  audioRecordHandler: PropTypes.func.isRequired,
};
FormContainer.defaultProps = {};

export default connect(
  state => ({
    bookingData: state.occasionList.bookingData,
    user_name: state.userDetails.settings_userDetails.stageName,
  }),
  null,
)(FormContainer);
