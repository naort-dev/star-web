import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dropdown from '../../../../components/Dropdown';
import Button from '../../../../components/PrimaryButton';
import { FlexCenter } from '../../../../styles/CommonStyled';
import RequestTemplates from '../../../../components/RequestTemplates';
import { Layout } from './styled';
import { getMobileOperatingSystem } from '../../../../utils/checkOS';

function FormContainer(props) {
  const { detailList } = { ...props };
  const [FormData, setFormData] = useState(props.bookingData);
  const optionsList = detailList.map(item => ({
    label: item.title,
    key: item.id,
  }));
  const isMobile = getMobileOperatingSystem();
  const [isDisabled, buttonDisabled] = useState(true);
  const [stepOne, validateStepOne] = useState(true);
  const [stepTwo, validateStepTwo] = useState(true);

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
    props.audio,
  );

  const onSelectOccasion = occasion => {
    let type;
    const result = props.detailList.filter(item => {
      if (item.id === occasion.key) {
        type = item.template_type;
        return item;
      }
    });
    setFormData({
      ...FormData,
      templateType: type,
      relationship: result ? result[0].relationships : [],
      eventName: result ? result[0].title : '',
      specification: '',
      userName: '',
      date: null,
      occasion,
    });
  };
  const nextButtonClick = () => {
    if (props.pageCount === PageDetailsArray.length - 1) {
      props.submitClick();
    } else {
      props.pageCountHandler(props.pageCount + 1);
    }
    props.updateBookingData(FormData);
  };

  const checkButtonDisabled = () => {
    if (FormData.user === 'someoneElse' && isMobile) {
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
    } else if (
      templateType === 3 ||
      templateType === 4 ||
      templateType === 5 ||
      templateType === 6 ||
      templateType === 7
    ) {
      validateFields([hostName !== '', specification !== '']);
    }
  };

  const validateOnSomeoneElseMobile = () => {
    const { hostName, specification, templateType } = {
      ...bookingData,
    };
    if (templateType === 1 || templateType === 2) {
      validateStepOne(![hostName !== ''].every(condition => condition));
      validateStepTwo(false);
    } else if (templateType === 6 || templateType === 7) {
      validateStepOne(
        ![hostName !== '', specification !== ''].every(condition => condition),
      );
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
  }, [FormData.hostName, FormData.specification, FormData.templateType]);

  return (
    <Layout>
      <FlexCenter>
        <Dropdown
          options={optionsList}
          selected={bookingData.occasion}
          labelKey="label"
          valueKey="key"
          placeHolder="What is the occasion?"
          className="custom"
          onChange={occasion => onSelectOccasion(occasion)}
        />
      </FlexCenter>
      <Layout.EventStep2>
        {PageDetailsArray.length > 0 ? PageDetailsArray[props.pageCount] : null}
      </Layout.EventStep2>
      <FlexCenter>
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
  audio: PropTypes.object.isRequired,
};

export default connect(
  state => ({
    bookingData: state.occasionList.bookingData
      ? state.occasionList.bookingData
      : {},
    user_name: state.userDetails.settings_userDetails.stageName,
    audio: state.audioRecorder.recorded,
  }),
  null,
)(FormContainer);
