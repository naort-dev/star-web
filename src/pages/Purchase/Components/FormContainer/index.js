import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Dropdown from '../../../../components/Dropdown';
import Button from '../../../../components/PrimaryButton';
import { FlexCenter } from '../../../../styles/CommonStyled';
import RequestTemplates from '../../../../components/RequestTemplates';
import { Layout } from './styled';
import { getMobileOperatingSystem } from '../../../../utils/checkOS';

function FormContainer(props) {
  const { detailList } = { ...props };
  const [FormData, setFormData] = useState({
    templateType: null,
    relationship: [],
    user: 'someoneElse',
    enableAudioRecorder: false,
    hostName: '',
    userName: '',
    relationshipValue: '',
    specification: '',
    date: null,
    eventName: '',
    validSelf: false,
  });
  const optionsList = detailList.map(item => ({
    label: item.title,
    key: item.id,
  }));
  const isMobile = getMobileOperatingSystem();
  const [isDisabled, buttonDisabled] = useState(true);
  const [stepOne, validateStepOne] = useState(true);
  const [stepTwo, validateStepTwo] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line
    validateOnMyself();
  }, [FormData.validSelf]);

  const validationTypeCheck = () => {
    if (
      FormData.user === 'Myself' ||
      (FormData.user === 'someoneElse' && !isMobile)
    ) {
      // eslint-disable-next-line
      validateOnMyself();
    } else if (FormData.user === 'someoneElse' && isMobile) {
      // eslint-disable-next-line
      validateOnSomeoneElseMobile();
    }
  };

  useEffect(() => {
    validationTypeCheck();
  }, [FormData.hostName, FormData.specification, FormData.templateType]);

  const validateOnMyself = () => {
    const { hostName, specification, templateType } = {
      // eslint-disable-next-line
      ...bookingData,
    };
    if (templateType === 1 || templateType === 2) {
      // eslint-disable-next-line
      validateFields([hostName !== '']);
    } else if (
      templateType === 3 ||
      templateType === 4 ||
      templateType === 5 ||
      templateType === 6 ||
      templateType === 7
    ) {
      // eslint-disable-next-line
      validateFields([hostName !== '', specification !== '']);
    }
  };

  const validateOnSomeoneElseMobile = () => {
    const { hostName, specification, templateType } = {
      // eslint-disable-next-line
      ...bookingData,
    };
    if (templateType === 1 || templateType === 2) {
      // eslint-disable-next-line
      validateStepOne(![hostName !== ''].every(condition => condition));
      validateStepTwo(false);
    } else if (templateType === 6 || templateType === 7) {
      // eslint-disable-next-line
      validateFields([hostName !== '', specification !== '']);
    } else if (templateType === 3 || templateType === 4 || templateType === 5) {
      if (props.pageCount === 0) {
        validateStepOne(![hostName !== ''].every(condition => condition));
      } else if (props.pageCount === 1) {
        validateStepTwo(![specification !== ''].every(condition => condition));
      }
    }
  };

  const updateUserToMyself = () => {
    setFormData({
      ...FormData,
      user: 'Myself',
      enableAudioRecorder: true,
      hostName: 'BBB',
      validSelf: true,
    });
  };

  const handleInputChange = (data, type) => {
    setFormData({
      ...FormData,
      enableAudioRecorder: true,
      [type]: data,
    });
  };

  const bookingData = {
    templateType: props.bookingData.occasionType
      ? props.bookingData.occasionType
      : FormData.templateType,
    relationship: FormData.relationship,
    user: FormData.user,
    enableAudioRecorder: FormData.enableAudioRecorder,
    handleInputChange,
    eventName: props.bookingData.eventName
      ? props.bookingData.eventName
      : FormData.eventName,
    hostName: props.bookingData.hostName
      ? props.bookingData.hostName
      : FormData.hostName,
    userName: props.bookingData.userName
      ? props.bookingData.userName
      : FormData.userName,
    relationshipValue: FormData.relationshipValue,
    specification: props.bookingData.specification
      ? props.bookingData.specification
      : FormData.specification,
    date: props.bookingData.date
      ? moment(props.bookingData.date)
      : FormData.date,
    updateUserToMyself,
  };

  const validateFields = fields => {
    const isValid = fields.every(condition => condition);
    buttonDisabled(!isValid);
  };

  const PageDetailsArray = RequestTemplates(
    FormData.templateType,
    bookingData,
    props.audioRecorder,
    props.saveAudioRecording,
    props.resetRecording,
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
    });
  };
  const nextButtonClick = () => {
    if (props.pageCount === PageDetailsArray.length - 1) {
      props.submitClick();
    } else {
      props.pageCountHandler(props.pageCount + 1);
    }
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
  return (
    <Layout>
      <FlexCenter>
        <Dropdown
          options={optionsList}
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
};

export default FormContainer;
