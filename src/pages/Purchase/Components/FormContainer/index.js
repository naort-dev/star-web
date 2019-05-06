import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Dropdown from '../../../../components/Dropdown';
import Button from '../../../../components/PrimaryButton';
import { FlexCenter } from '../../../../styles/CommonStyled';
import RequestTemplates from '../../../../components/RequestTemplates';
import { Layout } from './styled';

function FormContainer(props) {
  const { children, detailList } = { ...props };
  const [FormData, setFormData] = useState({
    templateType: null,
    relationship: [],
    user: 'someoneElse',
    enableAudioRecorder: false,
    hostName: '',
    userName: '',
    relationshipValue: '',
    specification: '',
    importantinfo: '',
    date: moment(),
    eventdetailName: '',
    whatIsThisFor: false,
    whoIsfor: false,
    eventName: '',
    forWhat: '',
  });
  const optionsList = detailList.map(item => ({
    label: item.title,
    key: item.id,
  }));
  const [pageCount, setpageCount] = useState(0);
  const [isDisabled, setisDisabled] = useState(true);
  const updateUserToMyself = () => {
    setFormData({
      ...FormData,
      user: 'Myself',
      enableAudioRecorder: true,
    });
  };
  const checkRequiredHostName = hostName => {
    if (hostName !== '') {
      setFormData({
        ...FormData,
        whoIsfor: true,
      });
      setisDisabled(!FormData.whoIsfor);
    }
  };
  const checkRequiredWhatIsThisFor = whatIsThisFor => {
    if (whatIsThisFor !== '') {
      setFormData({
        ...FormData,
        whatIsThisFor: true,
      });
      setisDisabled(!FormData.whoIsfor);
    }
  };
  const handleInputChange = (data, type) => {
    /*
      expected types:
      hostName,
      userName,
      relationshipValue,
      specification,
      importantinfo,
      date,
      eventdetailName
    */
    debugger;
    setFormData({
      ...FormData,
      enableAudioRecorder: true,
      [type]: data,
    });
  };
  const bookingData = {
    selectedValue: props.bookingData.selectedValue
      ? props.bookingData.selectedValue
      : '0', // for default state (choose one)
    templateType: props.bookingData.occasionType
      ? props.bookingData.occasionType
      : '',
    relationship: FormData.relationship,
    user: FormData.user,
    enableAudioRecorder: FormData.enableAudioRecorder,
    handleInputChange,
    checkRequiredHostName,
    checkRequiredWhatIsThisFor,
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
    importantinfo: props.bookingData.importantinfo
      ? props.bookingData.importantinfo
      : '',
    date: props.bookingData.date ? moment(props.bookingData.date) : moment(),
    eventdetailName: props.bookingData.eventdetailName
      ? props.bookingData.eventdetailName
      : '',
    forWhat: props.bookingData.forWhat
      ? props.bookingData.forWhat
      : FormData.forWhat,
    updateUserToMyself,
    whoIsfor: false,
    whatIsThisFor: false,
    whoIsfrom: false,
    eventTitle: false,
    eventDate: false,
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
    setpageCount(pageCount + 1);
    if (pageCount === PageDetailsArray.length) {
      props.submitClick();
    }
  };
  // const checkRequiredHostName = () => {
  //   let whoIsforValue;
  //   if (templateType === 7) {
  //     whoIsforValue = this.bookingData.hostName === '' ? true : false;
  //   } else {
  //     whoIsforValue = false;
  //   }
  //   this.bookingData.whoIsfor = whoIsforValue;
  //   return whoIsforValue;
  // };
  // const checkRequiredUserName = () => {
  //   const whoIsfromValue = this.bookingData.userName === '' ? true : false;
  //   this.bookingData.whoIsfrom = whoIsfromValue;
  //   return whoIsfromValue;
  // };
  // const checkRequiredTitle = () => {
  //   let eventTitleValue;
  //   if (this.state.templateType === 6) {
  //     eventTitleValue = this.state.eventdetailName === '' ? true : false;
  //   } else {
  //     eventTitleValue = false;
  //   }
  //   this.setState({ eventTitle: eventTitleValue });
  //   return eventTitleValue;
  // };
  // const checkRequiredDate = () => {
  //   const dateValue = this.state.date === '' ? true : false;
  //   this.setState({ eventDate: dateValue });
  //   return dateValue;
  // };
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
        {PageDetailsArray.length > 0 ? PageDetailsArray[pageCount] : null}
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
  getCategory: PropTypes.func,
  saveAudioRecording: PropTypes.func,
  resetRecording: PropTypes.func,
  bookingData: PropTypes.object,
  audioRecorder: PropTypes.object,
};

export default FormContainer;
