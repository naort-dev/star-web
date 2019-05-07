import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Dropdown from '../../../../components/Dropdown';
import Button from '../../../../components/PrimaryButton';
import { FlexCenter } from '../../../../styles/CommonStyled';
import RequestTemplates from '../../../../components/RequestTemplates';
import { Layout } from './styled';

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
    date: moment(),
    whatIsThisFor: false,
    whoIsfor: false,
    eventName: '',
    forWhat: '',
    eventTitleNM: '',
  });
  const optionsList = detailList.map(item => ({
    label: item.title,
    key: item.id,
  }));
  const [isDisabled, setisDisabled] = useState(false);
  const updateUserToMyself = () => {
    setFormData({
      ...FormData,
      user: 'Myself',
      enableAudioRecorder: true,
      hostName: 'BBB',
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
      : '',
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
    forWhat: props.bookingData.forWhat
      ? props.bookingData.forWhat
      : FormData.forWhat,
    eventTitleNM: props.bookingData.eventTitleNM
      ? props.bookingData.eventTitleNM
      : FormData.eventTitleNM,
    updateUserToMyself,
    whoIsfor: false,
    whatIsThisFor: false,
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
        type = item.type;
        return item;
      }
    });
    setFormData({
      ...FormData,
      templateType: type,
      relationship: result ? result[0].relationships : [],
      eventName: result ? result[0].title : '',
    });
  };
  const nextButtonClick = () => {
    props.pageCountHandler(props.pageCount + 1);
    if (props.pageCount === PageDetailsArray.length) {
      props.submitClick();
    }
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
          disabled={isDisabled}
          isDisabled={isDisabled}
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
